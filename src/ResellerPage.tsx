import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Gift, TrendingUp, Users, ShieldCheck, ArrowRight, Phone, Sparkles, Star, Award, Crown } from 'lucide-react';

const WA_LINK = 'https://wa.me/6281234567890';

export default function ResellerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.7 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden thin-scroll bg-[#fff0f5] selection:bg-[#fd86a5] selection:text-white pb-20 lg:pb-0">
      
      {/* ─────────── SECTION 1: HERO BANNER ─────────── */}
      <section className="relative pt-28 pb-20 px-5 lg:pt-40 lg:pb-32 lg:px-8 flex flex-col items-center text-center overflow-hidden min-h-[85vh] justify-center">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <img src="/Isi/069A5237.jpg" alt="Doface Products" className="w-full h-full object-cover object-center opacity-40 blur-[2px] scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fff0f5]/80 via-[#fff0f5]/90 to-[#fff0f5]" />
        </div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#fd86a5]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#f8578c]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        <motion.div {...fadeInUp} className="relative z-10 max-w-4xl mx-auto">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#fd86a5]/40 mb-8 shadow-xl shadow-[#fd86a5]/10"
          >
             <Sparkles size={16} className="text-[#fd86a5]" />
             <span className="text-xs sm:text-sm font-extrabold text-[#fd86a5] uppercase tracking-[0.2em]">Peluang Emas Terbatas</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] text-[#2d0f1e] mb-6 tracking-tight">
            Bangun Kerajaan<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd86a5] via-[#f8578c] to-[#ff4b72] drop-shadow-sm">
              Bisnis Skincare-mu 🚀
            </span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-[#7a3f58] leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
            Raih kebebasan finansial di industri kecantikan yang terus bertumbuh. Kami beri kamu produk pemenang, <i>mentoring</i> eksklusif, dan <i>support</i> total!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md mx-auto sm:max-w-none">
            <button onClick={() => window.open(WA_LINK, '_blank')} className="group w-full sm:w-auto px-8 py-4 sm:py-5 rounded-2xl text-white font-extrabold text-lg shadow-[0_8px_30px_rgba(253,134,165,0.5)] hover:shadow-[0_15px_40px_rgba(253,134,165,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fd86a5, #f8578c)' }}>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Daftar Kemitraan</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }} className="w-full sm:w-auto px-8 py-4 sm:py-5 rounded-2xl text-[#fd86a5] font-extrabold text-lg bg-white shadow-xl shadow-pink-100/50 hover:bg-pink-50 hover:-translate-y-1 transition-all duration-300 border border-pink-100">
              Lihat Skema Profit
            </button>
          </div>
        </motion.div>
      </section>

      {/* ─────────── SECTION 2: WHY DOFACE ─────────── */}
      <section className="py-20 px-5 lg:px-8 relative z-10 -mt-10">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Formulasi Teruji', desc: 'Hasil nyata dalam 2 minggu pemakaian rutin. Kulit cerah, sehat, dan glowing maksimal.', icon: TrendingUp, color: 'from-pink-400 to-rose-400' },
              { title: '100% BPOM & Aman', desc: 'Jaminan keamanan penuh untuk penggunaan jangka panjang. Bebas merkuri & hidrokuinon.', icon: ShieldCheck, color: 'from-emerald-400 to-teal-400' },
              { title: 'Market Size Raksasa', desc: 'Cocok untuk pria & wanita dari berbagai kalangan. Produk mudah diterima pasar.', icon: Users, color: 'from-blue-400 to-indigo-400' },
              { title: 'High Repeat Order', desc: 'Kualitas yang bicara. Customer pasti kembali order karena kecocokan produk.', icon: Star, color: 'from-amber-400 to-orange-400' }
            ].map((feature, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="group bg-white/70 backdrop-blur-md rounded-[2rem] p-8 shadow-xl shadow-pink-100/50 hover:shadow-2xl hover:shadow-pink-200/60 transition-all duration-300 border border-pink-50 hover:-translate-y-2 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg text-white transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-extrabold text-[#2d0f1e] mb-3">{feature.title}</h3>
                <p className="text-[#7a3f58] leading-relaxed text-sm sm:text-base font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────── SECTION 3: PRICING / SKEMA ─────────── */}
      <section id="pricing" className="py-20 px-0 lg:px-8 relative bg-gradient-to-b from-transparent via-pink-50/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16 px-5 lg:px-0">
            <h2 className="text-sm font-bold text-[#fd86a5] uppercase tracking-[0.2em] mb-3">Pilihan Paket Kemitraan</h2>
            <h3 className="text-3xl lg:text-5xl font-extrabold text-[#2d0f1e]">Diskon Hingga <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd86a5] to-[#f8578c]">35%</span> Menantimu!</h3>
          </motion.div>
          
          <div className="relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 no-scrollbar pb-10 lg:pb-0 scroll-px-5 items-stretch">
              <div className="min-w-[20px] lg:hidden shrink-0" /> {/* Left Spacer */}
              
              {/* AGEN - HIGHLIGHTED */}
              <motion.div {...fadeInUp} className="relative bg-[#2d0f1e] rounded-[2.5rem] p-1 border border-pink-500/30 shadow-2xl overflow-hidden min-w-[85%] sm:min-w-[70%] lg:min-w-0 snap-center lg:-mt-6 lg:mb-6 lg:z-10 group flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-b from-[#fd86a5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="bg-[#2d0f1e] rounded-[2.3rem] p-8 h-full flex flex-col relative z-10">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#fd86a5] blur-3xl opacity-30 rounded-full" />
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#fd86a5] to-[#f8578c] text-white text-[10px] font-extrabold tracking-wider self-start mb-6 shadow-lg shadow-pink-500/30">
                    <Crown size={12} /> BEST VALUE & PROFIT
                  </div>
                  
                  <h3 className="text-3xl font-extrabold text-white mb-1">AGEN</h3>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-[#fd86a5] font-extrabold text-4xl">35%</span>
                    <span className="text-white/60 font-medium">Diskon</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {[
                      { l: 'Minimal Order', v: '100 Paket' },
                      { l: 'Biaya Registrasi', v: 'GRATIS' },
                      { l: 'Total Modal', v: 'Rp 21.775.000', s: 'Rp 33.500.000' },
                      { l: 'Potensi Untung', v: 'Rp 11.725.000', highlight: true }
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className={item.highlight ? "text-[#fd86a5] shrink-0 mt-0.5" : "text-emerald-400 shrink-0 mt-0.5"} /> 
                        <div className="text-sm">
                          <span className="text-white/70 block mb-0.5">{item.l}</span>
                          <span className={`font-bold text-base ${item.highlight ? 'text-[#fd86a5] text-lg' : 'text-white'}`}>
                            {item.v} {item.s && <s className="text-xs text-white/40 ml-1 font-normal">{item.s}</s>}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <button onClick={() => window.open(WA_LINK, '_blank')} className="w-full py-4 rounded-xl text-white font-extrabold hover:scale-105 transition-transform shadow-[0_8px_20px_rgba(253,134,165,0.4)] flex justify-center items-center gap-2 relative overflow-hidden group/btn" style={{ background: 'linear-gradient(135deg, #fd86a5, #f8578c)' }}>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                    Ambil Peluang Agen <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>

              {/* SUB AGEN */}
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-pink-100 shadow-xl min-w-[85%] sm:min-w-[70%] lg:min-w-0 snap-center flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-2xl font-extrabold text-[#2d0f1e] mb-1">SUB AGEN</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-[#fd86a5] font-extrabold text-3xl">25%</span>
                  <span className="text-[#7a3f58] font-medium">Diskon</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    { l: 'Minimal Order', v: '50 Paket' },
                    { l: 'Biaya Registrasi', v: 'GRATIS' },
                    { l: 'Total Modal', v: 'Rp 12.562.500', s: 'Rp 16.750.000' },
                    { l: 'Potensi Untung', v: 'Rp 4.187.500' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> 
                      <div className="text-sm">
                        <span className="text-[#7a3f58] block mb-0.5">{item.l}</span>
                        <span className="font-bold text-[#2d0f1e] text-base">
                          {item.v} {item.s && <s className="text-xs text-black/30 ml-1 font-normal">{item.s}</s>}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <button onClick={() => window.open(WA_LINK, '_blank')} className="w-full py-4 rounded-xl text-[#fd86a5] font-extrabold bg-pink-50 hover:bg-[#fd86a5] hover:text-white transition-colors flex justify-center items-center gap-2">
                  Daftar Sub Agen <ArrowRight size={18} />
                </button>
              </motion.div>

              {/* RESELLER */}
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-pink-100 shadow-xl min-w-[85%] sm:min-w-[70%] lg:min-w-0 snap-center flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-2xl font-extrabold text-[#2d0f1e] mb-1">RESELLER</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-[#fd86a5] font-extrabold text-3xl">15%</span>
                  <span className="text-[#7a3f58] font-medium">Diskon</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    { l: 'Minimal Order', v: '10 Paket' },
                    { l: 'Biaya Registrasi', v: 'Rp 350.000' },
                    { l: 'Total Modal', v: 'Rp 2.847.500', s: 'Rp 3.350.000' },
                    { l: 'Potensi Untung', v: 'Rp 284.750' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> 
                      <div className="text-sm">
                        <span className="text-[#7a3f58] block mb-0.5">{item.l}</span>
                        <span className="font-bold text-[#2d0f1e] text-base">
                          {item.v} {item.s && <s className="text-xs text-black/30 ml-1 font-normal">{item.s}</s>}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <button onClick={() => window.open(WA_LINK, '_blank')} className="w-full py-4 rounded-xl text-[#7a3f58] font-extrabold bg-gray-50 hover:bg-gray-100 transition-colors flex justify-center items-center gap-2">
                  Daftar Reseller <ArrowRight size={18} />
                </button>
              </motion.div>

              {/* DROPSHIPPER */}
              <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-pink-100 shadow-xl min-w-[85%] sm:min-w-[70%] lg:min-w-0 snap-center flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#2d0f1e] mb-1">DROPSHIPPER</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-[#fd86a5] font-extrabold text-2xl sm:text-3xl">Rp 35K</span>
                  <span className="text-[#7a3f58] font-medium">/ Paket</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> 
                    <div className="text-sm">
                      <span className="text-[#7a3f58] block mb-0.5">Biaya Registrasi</span>
                      <span className="font-bold text-[#2d0f1e] text-base">Rp 335.000</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#fd86a5] shrink-0 mt-0.5" /> 
                    <div className="text-sm">
                      <span className="text-[#7a3f58] block mb-0.5">Keuntungan</span>
                      <span className="font-bold text-[#2d0f1e] text-sm leading-snug">Mendapatkan fee sebesar Rp 35.000 per paket.</span>
                    </div>
                  </li>
                </ul>
                <button onClick={() => window.open(WA_LINK, '_blank')} className="w-full py-4 rounded-xl text-[#7a3f58] font-extrabold border-2 border-gray-100 hover:border-[#fd86a5] hover:text-[#fd86a5] transition-colors flex justify-center items-center gap-2">
                  Daftar Dropshipper <ArrowRight size={18} />
                </button>
              </motion.div>
              
              <div className="min-w-[20px] lg:hidden shrink-0" /> {/* Right Spacer */}
            </div>
            
            <div className="lg:hidden flex items-center justify-center gap-3 mt-4 text-[#fd86a5]/50">
              <div className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#fd86a5]/30 rounded-full"></div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Geser Paket</span>
              <div className="w-10 h-[2px] bg-gradient-to-l from-transparent to-[#fd86a5]/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 4: PROGRAM POIN REWARD ─────────── */}
      <section className="py-24 px-5 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#2d0f1e] z-0" />
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#fd86a5] via-transparent to-transparent z-0" />
        <div className="absolute bottom-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#f8578c] via-transparent to-transparent z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#fd86a5] to-[#f8578c] shadow-[0_10px_30px_rgba(253,134,165,0.4)] mb-8 transform rotate-3">
              <Gift size={40} className="text-white -rotate-3" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 text-white tracking-tight">Kumpulkan Poinnya,<br />Raih Hadiah Impianmu! 🎁</h2>
            <div className="inline-block px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <p className="text-[#ffd6ea] text-sm lg:text-base font-medium flex items-center gap-2">
                <Award size={18} className="text-amber-400" /> 1 Paket = 1 Poin (Khusus Order via Head Office)
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { pts: '500 Poin', prize: 'Mesin Cuci & Kulkas', img: '🧺', color: 'from-blue-400 to-indigo-500' },
              { pts: '1.500 Poin', prize: 'Smartphone Samsung S', img: '📱', color: 'from-emerald-400 to-teal-500' },
              { pts: '2.000 Poin', prize: 'Apple iPhone 17', img: '🍎', color: 'from-rose-400 to-pink-500' },
              { pts: '3.000 Poin', prize: 'Tiket UMROH / Trip', img: '🕋', color: 'from-amber-400 to-orange-500' }
            ].map((reward, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="group relative bg-white/5 backdrop-blur-md rounded-[2rem] p-1 overflow-hidden hover:-translate-y-3 transition-transform duration-500">
                <div className={`absolute inset-0 bg-gradient-to-b ${reward.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="bg-[#2d0f1e]/90 backdrop-blur-xl rounded-[1.8rem] p-8 text-center h-full relative z-10 border border-white/10 group-hover:border-transparent transition-colors">
                  <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-500 drop-shadow-2xl">{reward.img}</div>
                  <div className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r ${reward.color} mb-3 drop-shadow-sm`}>{reward.pts}</div>
                  <div className="text-base text-white/90 font-bold leading-tight">{reward.prize}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 5: SUPPORT AGENCY ─────────── */}
      <section className="py-20 px-5 lg:px-8 bg-gradient-to-b from-white to-pink-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div {...fadeInUp} className="w-full lg:w-1/2">
              <h2 className="text-3xl lg:text-5xl font-extrabold text-[#2d0f1e] mb-6 leading-tight">Kamu Tidak Sendiri,<br />Kami Pandu <span className="text-[#fd86a5]">Sampai Mahir!</span></h2>
              <p className="text-[#7a3f58] text-lg font-medium leading-relaxed mb-10">
                Bergabung dengan Doface berarti bergabung dengan keluarga yang saling mendukung. Kami menyediakan ekosistem lengkap untuk memastikamu sukses berjualan dari hari pertama.
              </p>
              
              <div className="space-y-5">
                {[
                  'Gratis biaya pendaftaran (khusus Agen dan Sub Agen).',
                  'Zoom Mentoring 2x sebulan bersama Doface Coaching Team.',
                  'Akses VIP ke Grup Konsultasi Agency untuk bimbingan langsung.',
                  'Bank Konten harian lengkap. Tinggal copas & posting!',
                  'Support Boost Iklan & Marketing dari pusat.'
                ].map((benefit, i) => (
                  <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-pink-100/50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fd86a5] to-[#f8578c] flex items-center justify-center shrink-0 shadow-lg shadow-pink-200">
                      <CheckCircle2 size={20} className="text-white" />
                    </div>
                    <p className="text-[#2d0f1e] font-bold text-sm sm:text-base leading-snug">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div {...fadeInUp} className="w-full lg:w-1/2 relative hidden sm:block">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-50 rounded-[3rem] p-8 relative overflow-hidden shadow-2xl border-4 border-white">
                 <div className="absolute top-10 left-10 w-32 h-32 bg-[#fd86a5] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" />
                 <div className="absolute top-10 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }} />
                 <div className="absolute -bottom-8 left-20 w-32 h-32 bg-rose-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }} />
                 
                 <div className="relative h-full flex flex-col items-center justify-center text-center z-10">
                    <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 border border-pink-50">
                      <Users size={48} className="text-[#fd86a5]" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#2d0f1e] mb-2">Komunitas Solid</h3>
                    <p className="text-[#7a3f58] font-medium max-w-xs">Jejaring seller tangguh yang siap berbagi ilmu dan pengalaman.</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 6: ROADMAP ─────────── */}
      <section className="py-24 px-5 lg:px-8 relative bg-white/40">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-[#2d0f1e] mb-6">Langkah Mudah Memulai Bisnis</h2>
            <div className="w-24 h-1.5 bg-[#fd86a5] rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Pilih Paket', desc: 'Daftar sebagai Agen, Sub Agen, atau Reseller sesuai targetmu.' },
              { step: '2', title: 'Akses Materi', desc: 'Masuk grup VIP dan dapatkan bank konten HD siap posting.' },
              { step: '3', title: 'Mulai Posting', desc: 'Sebarkan konten secara konsisten di media sosialmu.' },
              { step: '4', title: 'Berikan Edukasi', desc: 'Jawab pertanyaan calon pembeli dengan bekal knowledge product.' },
              { step: '5', title: 'Panen Orderan', desc: 'Tutup penjualan dan raih keuntungan maksimal dari margin.' },
              { step: '6', title: 'Bina Hubungan', desc: 'Follow-up customer lama untuk menciptakan Repeat Order.' }
            ].map((item, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-white rounded-[2rem] p-8 relative shadow-xl shadow-pink-100/40 border border-pink-50 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2d0f1e] to-[#4a1c33] text-white rounded-2xl flex items-center justify-center text-2xl font-black mb-6 shadow-lg shadow-[#2d0f1e]/20">
                  {item.step}
                </div>
                <h3 className="text-xl font-extrabold text-[#2d0f1e] mb-3">{item.title}</h3>
                <p className="text-[#7a3f58] font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 7: FAQ ─────────── */}
      <section className="py-20 px-5 lg:px-8 bg-white/60 mb-8 lg:mb-0">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2d0f1e]">Pertanyaan Sering Diajukan</h2>
          </motion.div>
          
          <div className="space-y-4">
            {[
              { q: 'Apakah produknya sudah aman dan BPOM?', a: 'Sangat aman! Seluruh rangkaian produk Doface memiliki izin edar BPOM resmi dan diformulasikan lembut untuk semua jenis kulit.' },
              { q: 'Bagaimana sistem perhitungan poin reward?', a: 'Sangat transparan. 1 paket yang diorder = 1 poin. Poin dihitung otomatis dari setiap pembelian paket ke Head Office pusat.' },
              { q: 'Saya sama sekali belum pernah jualan, apakah bisa?', a: 'Justru ini tempat yang tepat! Kami mendesain sistem "Tinggal Copas". Kami sediakan grup konsultasi, konten harian foto/video berkualitas tinggi, hingga mentoring jualan rutin.' }
            ].map((faq, i) => (
              <motion.div key={i} {...fadeInUp} className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
                <button onClick={() => toggleFaq(i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-pink-50/50 transition-colors">
                  <span className="font-extrabold text-[#2d0f1e] pr-4 text-lg">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${openFaq === i ? 'bg-[#fd86a5] text-white' : 'bg-pink-100 text-[#fd86a5]'}`}>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="p-6 pt-0 text-base font-medium text-[#7a3f58] leading-relaxed border-t border-pink-50 mt-2">
                        <br/>
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

      {/* ─────────── SECTION 8: STICKY CTA (Desktop only here) ─────────── */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 z-40 p-6 pointer-events-none">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-xl rounded-[2rem] p-5 flex justify-between items-center shadow-2xl border border-[#fd86a5]/30 pointer-events-auto transform translate-y-0">
          <div className="flex items-center gap-4 ml-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fd86a5] to-[#f8578c] flex items-center justify-center shadow-lg animate-bounce">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <p className="font-black text-lg text-[#2d0f1e] leading-tight">Siap meraih kebebasan finansial?</p>
              <p className="text-sm font-bold text-[#fd86a5]">Kuota agency per wilayah sangat terbatas!</p>
            </div>
          </div>
          <button onClick={() => window.open(WA_LINK, '_blank')} className="px-8 py-4 rounded-xl text-white font-extrabold text-lg flex items-center gap-3 hover:scale-105 hover:shadow-[0_10px_25px_rgba(253,134,165,0.5)] transition-all duration-300" style={{ background: 'linear-gradient(135deg, #fd86a5, #f8578c)' }}>
            <Phone size={20} /> Booking Kuota Sekarang
          </button>
        </div>
      </div>

    </div>
  );
}
