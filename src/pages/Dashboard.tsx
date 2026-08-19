import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Package, Star, Clock, ShoppingBag, ShieldCheck } from 'lucide-react';

const fmt = (v: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);

export default function Dashboard() {
  const { profile, session, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*, order_items(*, product:products(*))')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (data) setOrders(data);
    };

    fetchOrders();
  }, [session, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!profile) return <div className="min-h-screen flex items-center justify-center text-[#fd86a5]">Loading...</div>;

  const roleColors: Record<string, string> = {
    customer: 'bg-gray-100 text-gray-600',
    reseller: 'bg-blue-100 text-blue-600',
    sub_agen: 'bg-purple-100 text-purple-600',
    agen: 'bg-pink-100 text-pink-600',
    dropshipper: 'bg-orange-100 text-orange-600',
    admin: 'bg-emerald-100 text-emerald-600',
  };

  return (
    <div className="min-h-screen bg-[#fff0f5] p-4 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header / Profile Card */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-pink-100 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#fd86a5] to-[#f8578c] flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-pink-200">
              {profile.full_name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#2d0f1e]">{profile.full_name}</h2>
              <p className="text-[#7a3f58] text-sm mb-2">{session?.user.email}</p>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${roleColors[profile.role] || roleColors.customer}`}>
                  {profile.role.replace('_', ' ')}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-600 flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> {profile.points} Poin
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 flex-wrap justify-end">
            {profile.role === 'admin' && (
              <Link to="/admin" className="px-5 py-2.5 rounded-full border-2 border-emerald-500 text-emerald-600 font-bold text-sm hover:bg-emerald-50 transition-colors flex items-center gap-2">
                <ShieldCheck size={16} /> Admin Panel
              </Link>
            )}
            <Link to="/" className="px-5 py-2.5 rounded-full border-2 border-pink-100 text-[#7a3f58] font-bold text-sm hover:bg-pink-50 transition-colors flex items-center gap-2">
              <ShoppingBag size={16} /> Belanja
            </Link>
            <button onClick={handleLogout} className="px-5 py-2.5 rounded-full bg-red-50 text-red-500 font-bold text-sm hover:bg-red-100 transition-colors flex items-center gap-2">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Affiliate Section (If not customer) */}
        {profile.role !== 'customer' && (
          <div className="bg-gradient-to-r from-[#2d0f1e] to-[#4a1c32] rounded-3xl p-6 lg:p-8 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Star className="text-yellow-400" fill="currentColor" /> Program Afiliasi & Referral
              </h3>
              <p className="text-pink-100 text-sm max-w-md">
                Bagikan link referral Anda dan dapatkan komisi untuk setiap pembelian dari downline atau pembeli langsung.
              </p>
            </div>
            <div className="relative z-10 bg-white/10 p-4 rounded-2xl border border-white/20 text-center shrink-0 min-w-[200px]">
              <p className="text-xs text-pink-200 uppercase tracking-widest font-bold mb-1">Total Komisi</p>
              <p className="text-3xl font-extrabold text-white">{fmt(profile.total_commission)}</p>
            </div>
          </div>
        )}

        {/* Orders List */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-pink-100">
          <h3 className="text-xl font-extrabold text-[#2d0f1e] mb-6 flex items-center gap-2">
            <Package className="text-[#fd86a5]" /> Riwayat Pesanan
          </h3>

          {orders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-[#b87990] mb-4">Belum ada pesanan.</p>
              <Link to="/" className="text-[#fd86a5] font-bold hover:underline">Mulai Belanja</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="border border-pink-50 rounded-2xl p-5 hover:border-pink-200 transition-colors bg-pink-50/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-pink-50 pb-4">
                    <div>
                      <p className="text-xs font-bold text-[#b87990] uppercase tracking-wider mb-1">
                        Order #{order.id.split('-')[0]}
                      </p>
                      <p className="text-sm text-[#7a3f58] flex items-center gap-2">
                        <Clock size={14} /> {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                        order.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-600' :
                        'bg-emerald-100 text-emerald-600'
                      }`}>
                        {order.status}
                      </span>
                      <p className="font-extrabold text-[#2d0f1e] text-lg">{fmt(order.total_amount)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {order.order_items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img src={item.product?.image_url} alt={item.product?.name} className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-pink-50" />
                        <div className="flex-1">
                          <p className="font-bold text-sm text-[#2d0f1e]">{item.product?.name}</p>
                          <p className="text-xs text-[#b87990]">{item.quantity} x {fmt(item.price_at_time)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
