import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Package, Users, DollarSign, CheckCircle, XCircle } from 'lucide-react';

const fmt = (v: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);

export default function AdminDashboard() {
  const { profile, session } = useAuth();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'users' | 'affiliates'>('orders');

  useEffect(() => {
    if (!session || profile?.role !== 'admin') {
      navigate('/dashboard'); // Kick out non-admins
      return;
    }
    fetchData();
  }, [session, profile, navigate]);

  const fetchData = async () => {
    setLoading(true);
    // Fetch pending and recent orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*, profiles:user_id(full_name, email, role), order_items(*, product:products(name, points_reward))')
      .order('created_at', { ascending: false });
    
    // Fetch all users
    const { data: usersData } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (ordersData) setOrders(ordersData);
    if (usersData) setUsers(usersData);
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string, userId: string, orderItems: any[]) => {
    // 1. Update order status
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);

    // 2. If status is 'completed' or 'shipped', calculate and add points to user
    if (newStatus === 'shipped') {
      const totalPoints = orderItems.reduce((sum, item) => sum + (item.product?.points_reward || 0) * item.quantity, 0);
      
      if (totalPoints > 0) {
        // Fetch current points
        const { data: userProfile } = await supabase.from('profiles').select('points').eq('id', userId).single();
        if (userProfile) {
          await supabase.from('profiles').update({ points: userProfile.points + totalPoints }).eq('id', userId);
        }
      }
    }
    
    fetchData(); // Refresh data
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    fetchData();
  };

  const addCommission = async (userId: string, amount: number) => {
    const { data: userProfile } = await supabase.from('profiles').select('total_commission').eq('id', userId).single();
    if (userProfile) {
      await supabase.from('profiles').update({ total_commission: userProfile.total_commission + amount }).eq('id', userId);
      alert('Komisi berhasil ditambahkan!');
      fetchData();
    }
  };

  if (!profile || profile.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm flex items-center justify-between border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Admin Panel</h1>
              <p className="text-gray-500 text-sm">Doface Hub Management</p>
            </div>
          </div>
          <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors text-sm">
            Kembali
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 p-1 bg-white rounded-2xl border border-gray-100 w-fit shadow-sm">
          <button onClick={() => setActiveTab('orders')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'orders' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
            Pesanan
          </button>
          <button onClick={() => setActiveTab('users')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'users' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
            Pengguna & Tier
          </button>
          <button onClick={() => setActiveTab('affiliates')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'affiliates' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
            Komisi Afiliasi
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading data...</div>
        ) : (
          <>
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-lg font-bold flex items-center gap-2"><Package className="text-emerald-500" /> Daftar Pesanan</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {orders.map(order => (
                    <div key={order.id} className="p-6 flex flex-col lg:flex-row gap-6 hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-xs font-bold text-gray-400">#{order.id.split('-')[0]}</span>
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'shipped' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status}
                          </span>
                          <span className="text-xs text-gray-400">{new Date(order.created_at).toLocaleString('id-ID')}</span>
                        </div>
                        <p className="font-bold text-gray-900 mb-1">{order.profiles?.full_name} <span className="text-gray-400 font-normal">({order.profiles?.email})</span></p>
                        <ul className="text-sm text-gray-600 mb-3 space-y-1">
                          {order.order_items.map((item: any) => (
                            <li key={item.id}>• {item.quantity}x {item.product?.name}</li>
                          ))}
                        </ul>
                        <p className="font-extrabold text-emerald-600">{fmt(order.total_amount)}</p>
                      </div>

                      <div className="flex flex-row lg:flex-col gap-2 shrink-0">
                        {order.status === 'pending' && (
                          <button onClick={() => updateOrderStatus(order.id, 'processing', order.user_id, order.order_items)} className="px-4 py-2 bg-blue-500 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm">
                            Konfirmasi Pembayaran
                          </button>
                        )}
                        {order.status === 'processing' && (
                          <button onClick={() => updateOrderStatus(order.id, 'shipped', order.user_id, order.order_items)} className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors shadow-sm">
                            Tandai Dikirim (+ Poin)
                          </button>
                        )}
                        {order.status !== 'cancelled' && (
                          <button onClick={() => updateOrderStatus(order.id, 'cancelled', order.user_id, order.order_items)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-red-50 hover:text-red-600 transition-colors">
                            Batalkan
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-lg font-bold flex items-center gap-2"><Users className="text-blue-500" /> Pengguna & Tier</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="p-4">Nama</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Role Saat Ini</th>
                        <th className="p-4">Poin</th>
                        <th className="p-4">Aksi Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="p-4 font-bold text-gray-900">{user.full_name}</td>
                          <td className="p-4 text-gray-500">{user.email}</td>
                          <td className="p-4">
                            <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-bold uppercase tracking-wider">{user.role}</span>
                          </td>
                          <td className="p-4 font-bold text-amber-500">{user.points}</td>
                          <td className="p-4">
                            <select 
                              value={user.role} 
                              onChange={(e) => updateUserRole(user.id, e.target.value)}
                              className="bg-white border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                            >
                              <option value="customer">Customer</option>
                              <option value="dropshipper">Dropshipper</option>
                              <option value="reseller">Reseller</option>
                              <option value="sub_agen">Sub Agen</option>
                              <option value="agen">Agen</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* AFFILIATES TAB */}
            {activeTab === 'affiliates' && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-lg font-bold flex items-center gap-2"><DollarSign className="text-purple-500" /> Manajemen Komisi Afiliasi</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="p-4">Nama Agen/Reseller</th>
                        <th className="p-4">Total Komisi Saat Ini</th>
                        <th className="p-4">Tambah Komisi Manual</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.filter(u => u.role !== 'customer' && u.role !== 'admin').map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="p-4 font-bold text-gray-900">{user.full_name} <br/><span className="text-xs font-normal text-gray-400">{user.role}</span></td>
                          <td className="p-4 font-extrabold text-emerald-600">{fmt(user.total_commission)}</td>
                          <td className="p-4 flex gap-2">
                            <button onClick={() => addCommission(user.id, 50000)} className="px-3 py-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg text-xs font-bold transition-colors">
                              + Rp50rb
                            </button>
                            <button onClick={() => addCommission(user.id, 100000)} className="px-3 py-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg text-xs font-bold transition-colors">
                              + Rp100rb
                            </button>
                            <button onClick={() => addCommission(user.id, 500000)} className="px-3 py-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg text-xs font-bold transition-colors">
                              + Rp500rb
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
