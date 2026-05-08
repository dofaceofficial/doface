import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Gift, TrendingUp, Users, ShieldCheck, ArrowRight, Phone } from 'lucide-react';

const WA_LINK = 'https://wa.me/6281234567890';

export default function ResellerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden thin-scroll bg-[#fff0f5]/30">
      
      {/* ─────────── SECTION 1: HERO BANNER ─────────── */}
      <section className="relative pt-24 pb-16 px-5 lg:pt-32 lg:pb-24 lg:px-8 flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fd86a5]/10 to-transparent pointer-events-none" />
        <motion.div {...fadeInUp} className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#fd86a5]/30 mb-6 shadow-sm">
             <span className="text-xs font-bold text-[#fd86a5] uppercase tracking-widest">Peluang Emas ✨</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-[#2d0f1e] mb-6">
            Bangun Bisnis Skincare-mu Sendiri:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd86a5] to-[#f8578c]">
              Untung Maksimal, Support Total! 🚀
            </span>
          </h1>
          <p className="text-sm lg:text-base text-[#7a3f58] leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
            Industri kecantikan memiliki potensi pertumbuhan yang sangat besar untuk pria maupun wanita. Doface siap mendukungmu bersaing di industri ini dengan <i>mentoring</i> dan <i>support</i> pemasaran penuh.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => window.open(WA_LINK, '_blank')} className="w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-extrabold shadow-[0_8px_30px_rgba(253,134,165,0.4)] hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #fd86a5, #f8578c)' }}>
              Daftar Kemitraan Sekarang
            </button>
            <button onClick={() => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }} className="w-full sm:w-auto px-8 py-4 rounded-2xl text-[#fd86a5] font-extrabold bg-white shadow-md hover:bg-gray-50 hover:scale-105 transition-transform">
              Pelajari Skema Keuntungan
            </button>
          </div>
        </motion.div>
      </section>

      {/* ─────────── SECTION 2: WHY DOFACE ─────────── */}
      <section className="py-16 px-5 lg:px-8 bg-white/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#2d0f1e] mb-4">Jualan Lebih Mudah dengan Produk Berkualitas</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Hasil Nyata & Cepat', desc: 'Rasakan perubahan nyata pada kulit wajah dengan pemakaian rutin setiap hari. Formulasi kami memberikan hasil nyata dalam 2 minggu.', icon: TrendingUp },
              { title: 'Aman & Tersertifikasi', desc: 'Semua produk sudah terdaftar dan lulus uji BPOM, sehingga aman digunakan setiap hari. Diformulasikan dengan bahan alami pilihan.', icon: ShieldCheck },
              { title: 'Pasar yang Luas', desc: 'Produk Doface cocok untuk semua jenis kulit, mulai dari kulit berminyak, kering, kombinasi, hingga sensitif.', icon: Users },
              { title: 'Membangun Kepercayaan', desc: 'Fokus kami adalah membantu seller membangun kepercayaan, bukan sekadar berjualan.', icon: CheckCircle2 }
            ].map((feature, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="glass rounded-3xl p-6 border border-white shadow-xl hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 rounded-full bg-[#fd86a5]/10 flex items-center justify-center mb-4 text-[#fd86a5]">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#2d0f1e] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#7a3f58] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 3: PRICING / SKEMA ─────────── */}
      <section id="pricing" className="py-16 px-5 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2d0f1e] mb-4">Pilih Level Kemitraanmu &<br />Nikmati Diskon Hingga 35%!</h2>
          </motion.div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-2 gap-6 lg:gap-8 no-scrollbar pb-6 lg:pb-0">
            {/* AGEN */}
            <motion.div {...fadeInUp} className="relative glass bg-gradient-to-br from-white/80 to-[#fff0f5]/80 rounded-3xl p-8 border-2 border-[#fd86a5] shadow-2xl overflow-hidden min-w-[85%] sm:min-w-[70%] lg:min-w-0 snap-center">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#fd86a5] to-[#f8578c] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-md">BEST VALUE</div>
              <h3 className="text-2xl font-extrabold text-[#2d0f1e] mb-1">AGEN</h3>
              <p className="text-[#fd86a5] font-extrabold text-xl mb-6">Diskon 35%</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#25D366] shrink-0 mt-0.5" /> <span><b>Minimal Order:</b> Ambil 100 Paket.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#25D366] shrink-0 mt-0.5" /> <span><b>Biaya Registrasi:</b> FREE.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#25D366] shrink-0 mt-0.5" /> <span><b>Total Modal:</b> Rp 21.775.000 <s className="text-xs text-black/40">(Normal Rp 33.500.000)</s>.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#25D366] shrink-0 mt-0.5" /> <span><b>Keuntungan Penjualan:</b> Rp 11.725.000.</span>
                </li>
              </ul>
              <button onClick={() => window.open(WA_LINK, '_blank')} className="w-full py-4 rounded-xl text-white font-extrabold transition-transform hover:scale-105 shadow-lg flex justify-center items-center gap-2" style={{ background: 'linear-gradient(135deg, #fd86a5, #f8578c)' }}>
                Daftar Sebagai Agen <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* SUB AGEN */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="glass bg-white/60 rounded-3xl p-8 border border-white shadow-xl min-w-[85%] sm:min-w-[70%] lg:min-w-0 snap-center">
              <h3 className="text-2xl font-extrabold text-[#2d0f1e] mb-1">SUB AGEN</h3>
              <p className="text-[#fd86a5] font-extrabold text-xl mb-6">Diskon 25%</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> <span><b>Minimal Order:</b> Ambil 50 Paket.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> <span><b>Biaya Registrasi:</b> FREE.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> <span><b>Total Modal:</b> Rp 12.562.500 <s className="text-xs text-black/40">(Normal Rp 16.750.000)</s>.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> <span><b>Keuntungan Penjualan:</b> Rp 4.187.500.</span>
                </li>
              </ul>
              <button onClick={() => window.open(WA_LINK, '_blank')} className="w-full py-4 rounded-xl text-[#2d0f1e] font-extrabold border-2 border-[#2d0f1e] hover:bg-[#2d0f1e] hover:text-white transition-colors flex justify-center items-center gap-2">
                Daftar Sebagai Sub Agen <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* RESELLER */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="glass bg-white/60 rounded-3xl p-8 border border-white shadow-xl min-w-[85%] sm:min-w-[70%] lg:min-w-0 snap-center">
              <h3 className="text-2xl font-extrabold text-[#2d0f1e] mb-1">RESELLER</h3>
              <p className="text-[#fd86a5] font-extrabold text-xl mb-6">Diskon 15%</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> <span><b>Minimal Order:</b> Ambil 10 Paket.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> <span><b>Biaya Registrasi:</b> Rp 350.000.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> <span><b>Total Modal:</b> Rp 2.847.500 <s className="text-xs text-black/40">(Normal Rp 3.350.000)</s>.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> <span><b>Keuntungan Penjualan:</b> Rp 284.750.</span>
                </li>
              </ul>
              <button onClick={() => window.open(WA_LINK, '_blank')} className="w-full py-4 rounded-xl text-[#2d0f1e] font-extrabold border-2 border-[#2d0f1e] hover:bg-[#2d0f1e] hover:text-white transition-colors flex justify-center items-center gap-2">
                Daftar Sebagai Reseller <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* DROPSHIPPER / AFFILIATE */}
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="glass bg-white/60 rounded-3xl p-8 border border-white shadow-xl min-w-[85%] sm:min-w-[70%] lg:min-w-0 snap-center">
              <h3 className="text-2xl font-extrabold text-[#2d0f1e] mb-1">DROPSHIPPER / AFFILIATE</h3>
              <p className="text-[#fd86a5] font-extrabold text-xl mb-6">Fee Rp 35.000/Paket</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> <span><b>Biaya Registrasi:</b> Rp 335.000.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#7a3f58]">
                  <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> <span><b>Keuntungan:</b> Mendapatkan <i>fee</i> atau potongan harga sebesar Rp 35.000 per paket.</span>
                </li>
              </ul>
              <button onClick={() => window.open(WA_LINK, '_blank')} className="w-full py-4 rounded-xl text-[#2d0f1e] font-extrabold border-2 border-[#2d0f1e] hover:bg-[#2d0f1e] hover:text-white transition-colors flex justify-center items-center gap-2 mt-auto">
                Daftar Sekarang <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 4: PROGRAM POIN REWARD ─────────── */}
      <section className="py-16 px-5 lg:px-8 bg-[#2d0f1e] text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fd86a5]/20 mb-6">
              <Gift size={32} color="#fd86a5" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">Kumpulkan Poinnya, Raih Hadiah<br />Impianmu Tanpa Diundi! 🎁</h2>
            <p className="text-[#ffd6ea] max-w-2xl mx-auto text-sm lg:text-base">
              Dapatkan 1 poin untuk setiap penjualan 1 paket (berlaku khusus pembelian langsung ke Head Office). Program ini berlaku untuk Agen, Sub Agen, dan Reseller.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { pts: '500 Poin', prize: 'Mesin Cuci & Kulkas', emoji: '🧺' },
              { pts: '1500 Poin', prize: 'Samsung S', emoji: '📱' },
              { pts: '2000 Poin', prize: 'iPhone 17', emoji: '🍎' },
              { pts: '3000 Poin', prize: 'Tiket UMROH', emoji: '🕋' }
            ].map((reward, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-white/10 rounded-3xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-4xl mb-4">{reward.emoji}</div>
                <div className="text-2xl font-extrabold text-[#fd86a5] mb-2">{reward.pts}</div>
                <div className="text-sm font-semibold">{reward.prize}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 5: SUPPORT AGENCY ─────────── */}
      <section className="py-16 px-5 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp} className="mb-12">
            <h2 className="text-3xl font-extrabold text-[#2d0f1e] mb-4">Kamu Tidak Berjalan Sendiri,<br />Kami Bantu Sampai Mahir!</h2>
          </motion.div>
          
          <div className="text-left space-y-4">
            {[
              'Gratis biaya pendaftaran (khusus Agen dan Sub Agen).',
              'Zoom Mentoring 2x sebulan bersama Doface Coaching Team yang dipandu oleh ahlinya, Asmayanti Jibril.',
              'Akses ke Grup Konsultasi Agency untuk bimbingan langsung.',
              'Konten harian sudah disiapkan, tinggal pakai untuk memposting konten dan meningkatkan brand awareness.',
              'Support Boost Iklan dan Support Marketing dari pusat untuk membantu penjualanmu.'
            ].map((benefit, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-pink-50">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={16} className="text-[#25D366]" />
                </div>
                <p className="text-[#7a3f58] font-medium leading-relaxed">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 6: ROADMAP ─────────── */}
      <section className="py-16 px-5 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#2d0f1e] mb-4">Langkah Mudah Memulai Bisnis Doface</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Daftar Agen', desc: 'Pilih paket kemitraan yang sesuai.' },
              { step: '2', title: 'Konten Medsos', desc: 'Posting secara konsisten untuk memperkenalkan produk.' },
              { step: '3', title: 'Tawarkan Promo', desc: 'Tarik minat pelanggan dengan penawaran menarik.' },
              { step: '4', title: 'Kumpulkan Database', desc: 'Bangun jaringan pelanggan setiamu.' },
              { step: '5', title: 'Perkenalkan Produk', desc: 'Lakukan edukasi mengenai keunggulan produk.' },
              { step: '6', title: 'Follow-up', desc: 'Jaga hubungan baik dengan pelanggan.' }
            ].map((item, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="glass rounded-3xl p-6 relative overflow-hidden border border-white">
                <div className="absolute -right-4 -top-4 text-8xl font-extrabold text-[#fd86a5]/10 pointer-events-none">{item.step}</div>
                <h3 className="text-xl font-extrabold text-[#2d0f1e] mb-2">{item.title}</h3>
                <p className="text-sm text-[#7a3f58]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 7: FAQ ─────────── */}
      <section className="py-16 px-5 lg:px-8 bg-white/50 mb-20 lg:mb-0">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#2d0f1e]">Pertanyaan Sering Diajukan</h2>
          </motion.div>
          
          <div className="space-y-4">
            {[
              { q: 'Apakah produknya sudah aman?', a: 'Sangat aman! Doface memiliki izin edar BPOM dan diformulasikan lembut untuk kulit.' },
              { q: 'Bagaimana cara menghitung poinnya?', a: 'Sangat mudah, 1 paket = 1 poin. Poin dihitung dari setiap pembelian paket ke Head Office.' },
              { q: 'Saya belum pernah jualan, apakah dibimbing?', a: 'Pasti! Kami menyediakan grup konsultasi, konten harian, hingga mentoring rutin lewat Zoom.' }
            ].map((faq, i) => (
              <motion.div key={i} {...fadeInUp} className="glass rounded-2xl border border-white overflow-hidden shadow-sm">
                <button onClick={() => toggleFaq(i)} className="w-full flex items-center justify-between p-5 text-left bg-white/40 hover:bg-white/60 transition-colors">
                  <span className="font-bold text-[#2d0f1e] pr-4">{faq.q}</span>
                  <ChevronDown size={20} className={`text-[#fd86a5] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="p-5 pt-0 text-sm text-[#7a3f58] leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 8: STICKY CTA (Desktop only here, mobile handled in App.tsx) ─────────── */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none">
        <div className="max-w-4xl mx-auto glass rounded-2xl p-4 flex justify-between items-center shadow-2xl border border-[#fd86a5]/20 pointer-events-auto">
          <p className="font-bold text-[#2d0f1e] ml-2">Siap meraih kesuksesan finansial bersama Doface? Kuota per wilayah terbatas!</p>
          <button onClick={() => window.open(WA_LINK, '_blank')} className="px-6 py-3 rounded-xl text-white font-extrabold flex items-center gap-2 hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #fd86a5, #f8578c)' }}>
            <Phone size={16} /> Konsultasi via WhatsApp
          </button>
        </div>
      </div>

    </div>
  );
}
