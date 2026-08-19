import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

// Format currency
const fmt = (v: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const { session } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    // If user is not logged in, they can still checkout via WA directly without recording in DB?
    // Let's force them to login first if we want point tracking and tiered pricing to work correctly.
    if (!session) {
      alert("Silakan login atau daftar terlebih dahulu untuk melanjutkan checkout.");
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      // Create Order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: session.user.id,
          total_amount: totalPrice,
          status: 'pending' // Manual transfer
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create Order Items
      const orderItemsToInsert = items.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsToInsert);

      if (itemsError) throw itemsError;

      // Generate WA Message
      let msg = `Halo Admin Doface! Saya ingin memesan:\n\n`;
      items.forEach(item => {
        msg += `- ${item.name} (${item.quantity}x) = ${fmt(item.price * item.quantity)}\n`;
      });
      msg += `\nTotal: *${fmt(totalPrice)}*\n`;
      msg += `Order ID: #${orderData.id.split('-')[0]}\n\n`;
      msg += `Mohon info rekening untuk pembayaran. Terima kasih.`;

      const encodedMsg = encodeURIComponent(msg);
      window.open(`https://wa.me/6281234567890?text=${encodedMsg}`, '_blank');

      clearCart();
      navigate('/dashboard'); // Go to user dashboard

    } catch (err: any) {
      console.error(err);
      alert("Gagal memproses pesanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff0f5] p-4 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-pink-50 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-pink-50 rounded-full transition-colors">
            <ArrowLeft className="text-[#7a3f58]" />
          </button>
          <h2 className="text-2xl font-extrabold text-[#2d0f1e] flex-1">Keranjang Belanja</h2>
          <div className="text-sm font-bold text-[#fd86a5] bg-pink-50 px-4 py-2 rounded-full">
            {totalItems} item
          </div>
        </div>

        {items.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={40} className="text-[#fd86a5]" />
            </div>
            <h3 className="text-xl font-bold text-[#2d0f1e] mb-2">Keranjangmu Kosong</h3>
            <p className="text-[#7a3f58] mb-8">Yuk, tambah produk favoritmu sekarang!</p>
            <Link to="/" className="px-8 py-3 rounded-full text-white font-bold bg-gradient-to-r from-[#fd86a5] to-[#f8578c] hover:scale-105 transition-transform shadow-lg shadow-pink-200">
              Belanja Sekarang
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row">
            {/* Cart Items */}
            <div className="flex-1 p-6 space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-pink-50 bg-pink-50/20 items-center">
                  <img src={item.image_url} alt={item.name} className="w-20 h-20 object-contain drop-shadow-md bg-white rounded-xl p-2" />
                  <div className="flex-1">
                    <h4 className="font-bold text-[#2d0f1e] leading-tight">{item.name}</h4>
                    <p className="text-xs text-[#b87990] mb-2">{item.size}</p>
                    <p className="font-bold text-[#fd86a5]">{fmt(item.price)}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                    <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-full border border-pink-100 shadow-sm">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-pink-50 text-[#7a3f58]">
                        <Minus size={12} strokeWidth={3} />
                      </button>
                      <span className="text-sm font-bold text-[#2d0f1e] w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-pink-50 text-[#7a3f58]">
                        <Plus size={12} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="w-full lg:w-80 bg-pink-50/50 p-6 lg:border-l border-pink-50">
              <h3 className="font-bold text-[#2d0f1e] mb-6">Ringkasan Pesanan</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-[#7a3f58]">
                  <span>Total Harga ({totalItems} barang)</span>
                  <span className="font-semibold">{fmt(totalPrice)}</span>
                </div>
                {/* Additional costs can go here */}
              </div>

              <div className="border-t border-pink-100 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#2d0f1e]">Total Tagihan</span>
                  <span className="font-extrabold text-xl text-[#fd86a5]">{fmt(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 rounded-xl text-white font-extrabold text-sm hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-70 flex justify-center items-center"
                style={{ background: 'linear-gradient(135deg, #fd86a5, #f8578c)' }}
              >
                {loading ? 'Memproses...' : 'Lanjut ke WhatsApp'}
              </button>
              
              {!session && (
                <p className="text-xs text-center text-[#b87990] mt-4">
                  Anda akan diminta untuk login/daftar sebelum checkout.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
