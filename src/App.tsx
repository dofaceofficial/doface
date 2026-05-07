import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Star, X, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Droplets, Leaf, Clock, Home, MessageCircle, Sparkles, Sun, Moon } from 'lucide-react';

/* ─────────── DATA ─────────── */
interface Hotspot {
  id: string; label: string; detail: string;
  x: string; y: string; align: 'left' | 'right';
}
interface Product {
  id: string; icon: any; name: string; sub: string;
  size: string; price: number; originalPrice?: number; desc: string;
  img: string; heroImg: string;
  accent: string; bg1: string; bg2: string;
  hotspots: Hotspot[];
}

const PRODUCTS: Product[] = [
  {
    id: 'bundle', icon: Sparkles, name: 'Paket Lengkap', sub: '3-in-1',
    size: 'Facewash + Day Cream + Night Cream', price: 335000, originalPrice: 350000,
    desc: 'Dapatkan rangkaian perawatan lengkap Doface dengan harga lebih hemat. Solusi paripurna untuk kulit cerah dan glowing maksimal setiap hari!',
    img: 'bundle', heroImg: '/Isi/069A5237.jpg',
    accent: '#f8578c', bg1: '#fff0f5', bg2: '#ffd0e4',
    hotspots: [],
  },
  {
    id: 'facewash', icon: Droplets, name: 'Refreshing', sub: 'Facewash',
    size: '100ml / 3.4 FL.OZ', price: 100000,
    desc: 'Pembersih wajah lembut yang mengangkat kotoran & minyak berlebih tanpa membuat kulit kering.',
    img: '/Isi/facewash.png', heroImg: '/Isi/069A4957 (1).jpg',
    accent: '#fd86a5', bg1: '#fff0f7', bg2: '#ffd6ea',
    hotspots: [
      {
        id: 'nia', label: 'Niacinamide', align: 'right', x: '15%', y: '28%',
        detail: 'Membantu mencerahkan & merawat skin barrier'
      },
      {
        id: 'cer', label: 'Ceramide NP', align: 'right', x: '25%', y: '55%',
        detail: 'Membantu menjaga & memperbaiki skin barrier'
      },
      {
        id: 'arb', label: 'Alpha Arbutin', align: 'left', x: '62%', y: '45%',
        detail: 'Membantu menyamarkan tampilan noda hitam & meratakan warna kulit'
      },
    ],
  },
  {
    id: 'daycream', icon: Sun, name: 'Glow', sub: 'Day Cream',
    size: '10g', price: 100000,
    desc: 'Pelembab siang hari dengan SPF untuk melindungi paparan kulit dari paparan sinar UV dan polusi.',
    img: '/Isi/daycream.png', heroImg: '/Isi/069A5122.jpg',
    accent: '#f8578c', bg1: '#fff0f5', bg2: '#ffc8dc',
    hotspots: [
      {
        id: 'spf', label: 'UVA & UVB Protection', align: 'left', x: '55%', y: '18%',
        detail: 'Kandungan: Ethylhexyl Methoxycinnamate, Butyl Methoxycinnamate, Oksibenzon, Octocrylene, Titanium Dioxide.'
      },
      {
        id: 'hya', label: 'Hyaluronic Acid', align: 'right', x: '18%', y: '30%',
        detail: 'Hydration & skin plumping'
      },
      {
        id: 'nia2', label: 'Niacinamide', align: 'left', x: '65%', y: '42%',
        detail: 'Brightening & barrier support'
      },
      {
        id: 'cer2', label: 'Ceramide NP', align: 'right', x: '15%', y: '65%',
        detail: 'Skin barrier repair'
      },
      {
        id: 'pan', label: 'Panthenol & Urea', align: 'left', x: '60%', y: '58%',
        detail: 'Soothing & moisturizing'
      },
    ],
  },
  {
    id: 'nightcream', icon: Moon, name: 'Collagen', sub: 'Night Cream',
    size: '10g', price: 150000,
    desc: 'Krim malam yang bekerja optimal saat tidur untuk regenerasi sel kulit dan mencerahkan',
    img: '/Isi/nightcream.png', heroImg: '/Isi/069A5499.jpg',
    accent: '#c0527a', bg1: '#fef0f7', bg2: '#f9c0d8',
    hotspots: [
      {
        id: 'ret', label: 'Retinaldehyde', align: 'left', x: '62%', y: '28%',
        detail: 'Anti-aging aktif. Membantu mempercepat regenerasi kulit. Membantu menyamarkan garis halus & tanda penuaan.'
      },
      {
        id: 'col', label: 'Hydrolyzed Collagen', align: 'right', x: '10%', y: '35%',
        detail: 'Membantu melembapkan & meningkatkan elastisitas tampilan kulit.'
      },
      {
        id: 'nia3', label: 'Niacinamide', align: 'right', x: '25%', y: '62%',
        detail: 'Membantu mencerahkan, memperkuat skin barrier & meratakan warna kulit.'
      },
    ],
  },
];

const INSTAGRAM_POSTS = [
  { id: "1", url: "https://www.instagram.com/p/DXy5B3ekqLD/", mediaUrl: "https://behold.pictures/deC4oBOeOKZHdoJPqFgSvgBZQXD2/gE6AidotUwUfc87A9G5r/18156191572455831/medium.jpg" },
  { id: "2", url: "https://www.instagram.com/p/DXjoI6kElFJ/", mediaUrl: "https://behold.pictures/deC4oBOeOKZHdoJPqFgSvgBZQXD2/gE6AidotUwUfc87A9G5r/18117209224778312/medium.jpg" },
  { id: "3", url: "https://www.instagram.com/p/DXCABhPkkh3/", mediaUrl: "https://behold.pictures/deC4oBOeOKZHdoJPqFgSvgBZQXD2/gE6AidotUwUfc87A9G5r/18082187465617802/medium.jpg" },
  { id: "4", url: "https://www.instagram.com/p/DWYTZqqEbgo/", mediaUrl: "https://behold.pictures/deC4oBOeOKZHdoJPqFgSvgBZQXD2/gE6AidotUwUfc87A9G5r/18086744225584269/medium.jpg" },
  { id: "5", url: "https://www.instagram.com/p/DWENXpZEn4m/", mediaUrl: "https://behold.pictures/deC4oBOeOKZHdoJPqFgSvgBZQXD2/gE6AidotUwUfc87A9G5r/17858890182565628/medium.jpg" },
  { id: "6", url: "https://www.instagram.com/p/DVyF-CUknBa/", mediaUrl: "https://behold.pictures/deC4oBOeOKZHdoJPqFgSvgBZQXD2/gE6AidotUwUfc87A9G5r/18066260657667261/medium.jpg" },
];

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

const InstagramIcon = ({ size = 24, color = "currentColor", strokeWidth = 2 }: { size?: number, color?: string, strokeWidth?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

/* ─────────── COMPONENTS ─────────── */
function HotspotPin({ spot, active, onToggle, accent }: { spot: Hotspot; active: boolean; onToggle: () => void; accent: string; }) {
  const isLeft = spot.align === 'left';
  return (
    <div style={{ position: 'absolute', left: spot.x, top: spot.y, zIndex: 30 }}>
      <div className={`flex items-center gap-1.5 cursor-pointer select-none ${isLeft ? 'flex-row' : 'flex-row-reverse'}`} onClick={onToggle}>
        <div className="relative w-5 h-5 shrink-0 flex items-center justify-center">
          {!active && <span className="ping absolute inset-0 rounded-full" style={{ background: accent + '66' }} />}
          <span className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center shadow-md" style={{ background: active ? '#fff' : accent }}>
            {active ? <X size={8} color={accent} strokeWidth={3} /> : <Plus size={8} color="#fff" strokeWidth={3} />}
          </span>
        </div>
        <div className="w-4 h-px hidden sm:block" style={{ background: accent + '99' }} />
        <span className="text-[9px] sm:text-[10px] font-bold whitespace-nowrap px-2 py-0.5 rounded-full shadow-sm" style={{ background: 'rgba(255,255,255,0.85)', color: '#2d0f1e', border: `1px solid ${accent}33` }}>
          {spot.label}
        </span>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0, scale: 0.85, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.85, y: -4 }} transition={{ duration: 0.22 }} className="glass rounded-2xl p-3 shadow-lg mt-2" style={{ width: 180, position: 'absolute', left: isLeft ? 'auto' : 0, right: isLeft ? 0 : 'auto', top: '100%', zIndex: 40 }}>
            <p className="font-extrabold text-[11px] mb-1 leading-tight" style={{ color: accent }}>{spot.label}</p>
            <p className="text-[9px] leading-relaxed" style={{ color: '#7a3f58' }}>{spot.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const slide = {
  enter: (d: number) => ({ x: d > 0 ? '80%' : '-80%', opacity: 0, scale: 0.92 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ x: d > 0 ? '-80%' : '80%', opacity: 0, scale: 0.92 }),
};

/* ─────────── BEFORE AFTER GALLERY ─────────── */
function BeforeAfterSlider({ beforeImg, afterImg }: { beforeImg: string, afterImg: string }) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative w-full aspect-square sm:aspect-video rounded-3xl overflow-hidden glass border border-white/60 shadow-xl select-none group">
      {/* Before Image (Base) */}
      <img src={beforeImg} alt="Before" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      {/* After Image (Clipped from left -> visible on right) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      >
        <img src={afterImg} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      </div>

      {/* Slider Handle Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)] border-2 border-[#fd86a5]">
          <div className="flex gap-0.5">
            <ChevronLeft size={12} color="#fd86a5" strokeWidth={3} />
            <ChevronRight size={12} color="#fd86a5" strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[9px] font-extrabold tracking-widest uppercase pointer-events-none shadow-sm">Before</div>
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#fd86a5] to-[#f8578c] text-white text-[9px] font-extrabold tracking-widest uppercase pointer-events-none shadow-md">After</div>

      {/* Invisible Interactive Range */}
      <input
        type="range"
        min="0" max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0 p-0"
      />
    </div>
  );
}

function BeforeAfterGallery() {
  const CASES = [1, 2, 3, 4, 5].map(i => ({ before: `/Isi/${i}-Before.png`, after: `/Isi/${i}-After.png` }));
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col items-center w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-3xl"
        >
          <BeforeAfterSlider beforeImg={CASES[activeIdx].before} afterImg={CASES[activeIdx].after} />
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2.5 mt-5 overflow-x-auto thin-scroll max-w-full pb-2 px-2 justify-center">
        {CASES.map((c, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeIdx === i ? 'border-[#fd86a5] scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100 bg-white/50'}`}
          >
            <img src={c.after} className="w-full h-full object-cover" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  );
}

function InstagramFeed() {
  return (
    <div className="w-full max-w-6xl mx-auto px-5 lg:px-8 pb-20 z-20 shrink-0 mt-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 glass p-6 lg:p-8 rounded-[2rem] border border-white/60 shadow-xl">
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full p-1 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-lg">
            <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white">
              <img src="https://cdn2.behold.pictures/deC4oBOeOKZHdoJPqFgSvgBZQXD2/17841444495713870/profile.webp" alt="Doface ID" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h3 className="text-xl lg:text-3xl font-extrabold text-[#2d0f1e] mb-1">doface.id</h3>
            <p className="text-sm font-extrabold text-[#fd86a5] mb-2">3.7K Followers</p>
            <p className="text-xs lg:text-sm text-[#7a3f58] leading-relaxed max-w-xs font-medium">Simply Better Skin. Part of @donna_scarves @donnaprive.id</p>
          </div>
        </div>
        <button
          onClick={() => window.open('https://instagram.com/doface.id', '_blank')}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#2d0f1e] text-white font-extrabold text-sm shadow-xl hover:bg-[#fd86a5] transition-all"
        >
          <InstagramIcon size={18} /> Follow on Instagram
        </button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-4">
        {INSTAGRAM_POSTS.map(post => (
          <motion.a
            key={post.id}
            href={post.url}
            target="_blank"
            whileHover={{ scale: 1.05, y: -5 }}
            className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md relative group"
          >
            <img src={post.mediaUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <InstagramIcon size={24} color="white" strokeWidth={2.5} />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

/* ─────────── APP WRAPPER ─────────── */
export default function App() {
  const [view, setView] = useState<'landing' | 'shop'>('landing');

  return (
    <div className="w-screen h-[100dvh] overflow-hidden bg-white flex flex-col">
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <LandingPage key="landing" onExplore={() => setView('shop')} />
          ) : (
            <ShopPage key="shop" onBack={() => setView('landing')} />
          )}
        </AnimatePresence>
      </div>

      {/* Persistent Bottom Nav (Floating Aesthetic) */}
      <div className="lg:hidden shrink-0 bg-white/80 backdrop-blur-3xl border-t border-[#fd86a5]/10 relative z-50">
        <div className="flex items-center justify-around px-4 pb-4 pt-3">
          <button onClick={() => setView('landing')} className="flex flex-col items-center gap-1.5 flex-1 relative">
            {view === 'landing' && <motion.div layoutId="nav-pill" className="absolute -inset-x-2 -inset-y-1 bg-[#fd86a5]/10 rounded-xl" />}
            <Home size={22} color={view === 'landing' ? '#fd86a5' : '#c09bab'} strokeWidth={view === 'landing' ? 2.5 : 2} />
            <span className="text-[10px] font-bold" style={{ color: view === 'landing' ? '#fd86a5' : '#c09bab' }}>Home</span>
          </button>

          <button onClick={() => setView('shop')} className="flex flex-col items-center gap-1.5 flex-1 relative">
            {view === 'shop' && <motion.div layoutId="nav-pill" className="absolute -inset-x-2 -inset-y-1 bg-[#fd86a5]/10 rounded-xl" />}
            <div className="relative">
              <ShoppingBag size={22} color={view === 'shop' ? '#fd86a5' : '#c09bab'} strokeWidth={view === 'shop' ? 2.5 : 2} />
              {view !== 'shop' && <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#fd86a5] rounded-full border-2 border-white"></span>}
            </div>
            <span className="text-[10px] font-bold" style={{ color: view === 'shop' ? '#fd86a5' : '#c09bab' }}>Product</span>
          </button>

          <button onClick={() => window.open('https://wa.me/6281234567890', '_blank')} className="flex flex-col items-center gap-1.5 flex-1 transition-transform active:scale-95">
            <MessageCircle size={22} color="#c09bab" strokeWidth={2} />
            <span className="text-[10px] font-bold" style={{ color: '#c09bab' }}>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── LANDING PAGE ─────────── */
function LandingPage({ onExplore }: { onExplore: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }} transition={{ duration: 0.6 }} className="w-full h-full relative flex flex-col overflow-y-auto overflow-x-hidden thin-scroll bg-[#fff0f5]">
      {/* Top Navigation */}
      <div className="absolute top-4 left-0 right-0 px-5 lg:px-10 lg:top-8 z-30 flex justify-center lg:justify-between items-center">
        <img src="/Isi/doface.svg" alt="Doface" className="h-7 lg:h-8" />
        <div className="hidden lg:flex items-center gap-3">
          <button onClick={() => window.open('https://wa.me/6281234567890', '_blank')} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#25D366] text-white text-[10px] lg:text-xs font-bold shadow-md hover:bg-[#20b858] transition-colors">
            <MessageCircle size={14} /> WhatsApp
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] lg:h-screen shrink-0 overflow-hidden">
        <img
          src="/Isi/069A5237.jpg"
          alt="Doface Models"
          className="w-full h-full object-cover object-[50%_45%] lg:object-center scale-110 lg:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fff0f5] via-[#fff0f5]/10 to-transparent lg:hidden" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#fff0f5]/95 via-[#fff0f5]/70 to-transparent w-full" />

        {/* Desktop Content Panel */}
        <div className="hidden lg:flex absolute inset-0 z-20 items-center justify-start ml-20">
          <div className="w-[500px] xl:w-[600px] glass bg-white/40 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/60">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-[#fd86a5]/30 mb-6 shadow-sm">
              <span className="text-xs font-bold text-[#fd86a5] uppercase tracking-widest">✨ Bundle 3-in-1 Lebih Hemat!</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight text-[#fd86a5] mb-8">
              Simply Better Skin
            </h1>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onExplore} className="w-full flex items-center justify-center gap-2 py-5 rounded-2xl text-white font-extrabold text-base transition-shadow" style={{ background: `linear-gradient(135deg, #fd86a5, #f8578c)`, boxShadow: `0 8px 30px rgba(253,134,165,0.4)` }}>
              Lihat Produk <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Content Section */}
      <div className="lg:hidden relative z-20 flex-1 px-5 pb-4 flex flex-col justify-start mt-0">
        <div className="glass rounded-3xl p-6 shadow-xl border border-white/80 mb-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-[#fd86a5] to-[#f8578c] text-white px-4 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase shadow-md flex items-center gap-1.5">
            <Sparkles size={10} /> Bundle 3-in-1 Lebih Hemat
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight text-[#fd86a5] mb-6 mt-2 text-center whitespace-nowrap">
            Simply Better Skin
          </h1>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onExplore} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-extrabold text-sm shadow-lg" style={{ background: `linear-gradient(135deg, #fd86a5, #f8578c)` }}>
            Lihat Produk <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>

      {/* ABOUT DOFACE SECTION */}
      <div className="w-full max-w-4xl mx-auto px-5 lg:px-8 pt-10 lg:pt-16 pb-2 z-20 shrink-0 text-center">
        <h2 className="text-2xl lg:text-4xl font-extrabold text-[#fd86a5] mb-4">About Doface</h2>
        <p className="text-xs lg:text-base text-[#7a3f58] leading-relaxed font-medium mb-3">
          DOFACE adalah brand skincare lokal yang berfokus pada perawatan wajah dengan formulasi aman, efektif, dan cocok untuk berbagai jenis kulit.
        </p>
        <p className="text-xs lg:text-base text-[#7a3f58] leading-relaxed font-medium">
          Doface hadir untuk membantu meningkatkan kepercayaan diri melalui kulit wajah yang sehat, bersih dan terawat dengan penggunaan skin care yang praktis dan berkualitas.
        </p>
      </div>

      {/* INTERACTIVE BEFORE AFTER SECTION */}
      <div className="w-full max-w-6xl mx-auto px-5 lg:px-8 py-10 lg:py-16 z-20 shrink-0">
        <div className="text-center mb-8 lg:mb-12">
          <p className="text-xs lg:text-sm font-extrabold tracking-widest uppercase mb-2" style={{ color: '#fd86a5' }}>Real Results</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2d0f1e]">Buktikan Sendiri <br className="lg:hidden" /> dalam <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd86a5] to-[#f8578c]">14 Hari</span></h2>
        </div>
        <BeforeAfterGallery />
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="w-full max-w-6xl mx-auto px-5 lg:px-8 pb-16 lg:pb-20 shrink-0 z-20">
        <div className="text-center mb-6 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl font-extrabold text-[#2d0f1e]">Why choose <span className="text-[#fd86a5]">doface?</span></h2>
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-1 gap-3 lg:hidden">
          {[
            { icon: <Leaf size={18} color="#fd86a5" />, title: 'Bahan alami berkualitas', desc: 'Formulasi dengan bahan-bahan pilihan yang lembut dan efektif.' },
            { icon: <Clock size={18} color="#f59e0b" />, title: 'Hasil nyata dalam 2 minggu', desc: 'Rasakan perubahan nyata pada kulit dengan pemakaian rutin.' },
            { icon: <Droplets size={18} color="#38bdf8" />, title: 'Cocok semua jenis kulit', desc: 'Diformulasikan untuk kulit berminyak, kering, kombinasi, hingga sensitif.' },
            { icon: <ShieldCheck size={18} color="#10b981" />, title: 'Tersertifikasi BPOM', desc: 'Semua produk sudah terdaftar dan lulus uji BPOM, aman digunakan.' },
          ].map((item, i) => (
            <div key={i} className="glass rounded-2xl p-4 flex gap-3 items-start border border-white/60">
              <div className="w-10 h-10 shrink-0 rounded-full bg-white/70 flex items-center justify-center shadow-sm">{item.icon}</div>
              <div>
                <h3 className="text-[11px] font-bold text-[#2d0f1e] mb-1 leading-tight">{item.title}</h3>
                <p className="text-[10px] text-[#7a3f58] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {[
            { icon: <Leaf size={24} color="#fd86a5" />, title: 'Bahan alami berkualitas', desc: 'Formulasi dengan bahan-bahan pilihan yang lembut.' },
            { icon: <Clock size={24} color="#f59e0b" />, title: 'Hasil nyata 2 minggu', desc: 'Rasakan perubahan nyata dengan pemakaian rutin.' },
            { icon: <Droplets size={24} color="#38bdf8" />, title: 'Semua jenis kulit', desc: 'Diformulasikan untuk semua jenis kulit hingga sensitif.' },
            { icon: <ShieldCheck size={24} color="#10b981" />, title: 'Tersertifikasi BPOM', desc: 'Semua produk sudah terdaftar dan lulus uji BPOM.' },
          ].map((item, i) => (
            <div key={i} className="glass rounded-3xl p-6 flex flex-col items-center text-center border border-white/60 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shadow-md mb-4">{item.icon}</div>
              <h3 className="text-sm font-bold text-[#2d0f1e] mb-2">{item.title}</h3>
              <p className="text-xs text-[#7a3f58] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <InstagramFeed />

    </motion.div>
  );
}

/* ─────────── SHOP PAGE ─────────── */
function ShopPage({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [qty, setQty] = useState(1);
  const [hotspot, setHotspot] = useState<string | null>(null);
  const [touchX, setTouchX] = useState<number | null>(null);

  const p = PRODUCTS[idx];

  const goTo = (i: number) => {
    if (i === idx) return;
    setDir(i > idx ? 1 : -1);
    setIdx(i);
    setQty(1);
    setHotspot(null);
  };
  const next = () => goTo((idx + 1) % PRODUCTS.length);
  const prev = () => goTo((idx - 1 + PRODUCTS.length) % PRODUCTS.length);

  const toggleHotspot = (id: string) => setHotspot(h => h === id ? null : id);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="w-full h-full flex flex-col lg:flex-row relative" style={{ background: `linear-gradient(145deg, ${p.bg1} 0%, ${p.bg2} 100%)`, transition: 'background 0.5s ease' }} onClick={() => setHotspot(null)}>
      {/* Ambient blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div key={p.id} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px]" style={{ background: p.accent + '33' }} />
      </div>

      {/* ══════ DESKTOP LEFT PANEL ══════ */}
      <div className="hidden lg:flex flex-col justify-between w-[340px] xl:w-[380px] shrink-0 px-8 py-8 z-20 relative">
        <div>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full glass hover:bg-white/80 transition-colors shrink-0">
                <ChevronLeft size={16} color="#8a4f66" />
              </button>
              <img src="/Isi/doface.svg" alt="Doface" className="h-7" />
            </div>
            <button onClick={() => window.open('https://wa.me/6281234567890', '_blank')} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#25D366] text-white text-[10px] font-bold shadow-md hover:bg-[#20b858] transition-colors shrink-0">
              <MessageCircle size={14} /> WhatsApp
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={p.id + '-info'} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-1 flex items-center gap-1.5" style={{ color: p.accent }}>
                <p.icon size={12} /> {p.size}
              </p>
              <h1 className="text-5xl font-extrabold leading-none" style={{ color: '#2d0f1e' }}>{p.name}</h1>
              <h1 className="text-5xl font-extrabold leading-none mb-4" style={{ color: p.accent }}>{p.sub}</h1>
              {p.id === 'bundle' && (
                <div className="inline-block px-3 py-1 bg-[#fd86a5]/20 rounded-full mb-3">
                  <span className="text-xs font-bold text-[#fd86a5]">Hemat 15% dari beli satuan!</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={p.accent} color={p.accent} />)}
                <span className="text-xs font-semibold ml-1" style={{ color: '#8a4f66' }}>4.9 · 1.2K</span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#7a3f58' }}>{p.desc}</p>

              {/* Price */}
              <div className="glass rounded-2xl p-4 mb-4">
                <p className="text-[9px] font-bold tracking-widest uppercase mb-1" style={{ color: '#b87990' }}>HARGA {p.id === 'bundle' ? 'PAKET' : 'PER ITEM'}</p>
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-extrabold" style={{ color: p.accent }}>{fmt(p.price)}</p>
                  {p.originalPrice && <s className="text-sm font-semibold mb-1" style={{ color: '#c09bab' }}>{fmt(p.originalPrice)}</s>}
                </div>
              </div>

              {/* Quantity & Buy */}
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-full glass flex items-center justify-center shadow-sm hover:bg-white/60"><Minus size={14} color="#8a4f66" /></button>
                <span className="text-xl font-extrabold w-8 text-center" style={{ color: '#2d0f1e' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 rounded-full glass flex items-center justify-center shadow-sm hover:bg-white/60"><Plus size={14} color="#8a4f66" /></button>
                <span className="text-sm font-semibold ml-2" style={{ color: '#b87990' }}>Total: {fmt(p.price * qty)}</span>
              </div>

              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={e => { e.stopPropagation(); }} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-sm" style={{ background: `linear-gradient(135deg, ${p.accent}, #f8578c)`, boxShadow: `0 6px 24px ${p.accent}55` }}>
                <ShoppingBag size={16} /> Beli via WhatsApp <ChevronRight size={16} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Product nav dots (Desktop) */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#b87990]">Pilih Produk</p>
          <div className="flex gap-2">
            {PRODUCTS.map((pr, i) => (
              <motion.button key={pr.id} onClick={() => goTo(i)} animate={{ width: i === idx ? 28 : 7 }} className="h-2 rounded-full transition-colors duration-300" style={{ background: i === idx ? p.accent : p.accent + '44' }} />
            ))}
          </div>
        </div>
      </div>

      {/* ══════ CENTER: PRODUCT HERO ══════ */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden z-10" onTouchStart={e => setTouchX(e.touches[0].clientX)} onTouchEnd={e => { if (touchX === null) return; const dx = e.changedTouches[0].clientX - touchX; if (dx < -60) next(); else if (dx > 60) prev(); setTouchX(null); }} onClick={e => e.stopPropagation()}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.div key={p.id + '-hero'} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }} className="absolute inset-0 flex items-center justify-center">

            {p.id === 'bundle' ? (
              <div className="relative flex items-center justify-center h-[55vh] lg:h-[72vh] w-full float pointer-events-none">
                <img src="/Isi/daycream.png" className="absolute left-[8%] sm:left-[22%] lg:left-[15%] bottom-[32%] w-[105px] sm:w-[145px] lg:w-[175px] object-contain rotate-[-15deg] z-10" style={{ filter: 'drop-shadow(-15px 45px 35px rgba(0,0,0,0.25))' }} />
                <img src="/Isi/facewash.png" className="absolute z-20 h-[280px] sm:h-[380px] lg:h-[480px] object-contain rotate-3 -translate-y-16" style={{ filter: 'drop-shadow(0 50px 45px rgba(0,0,0,0.3))' }} />
                <img src="/Isi/nightcream.png" className="absolute right-[8%] sm:right-[22%] lg:right-[15%] bottom-[24%] w-[95px] sm:w-[135px] lg:w-[155px] object-contain rotate-12 z-30" style={{ filter: 'drop-shadow(15px 45px 35px rgba(0,0,0,0.25))' }} />
              </div>
            ) : (
              <img
                src={p.img}
                alt={p.sub}
                className="float select-none pointer-events-none rotate-2 lg:rotate-3"
                style={{
                  height: (p.id === 'daycream' || p.id === 'nightcream') ? 'min(45vh, 320px)' : 'min(60vh, 480px)',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 50px 45px rgba(0,0,0,0.3))'
                }}
                draggable={false}
              />
            )}

            {p.hotspots.map(spot => (
              <HotspotPin key={spot.id} spot={spot} accent={p.accent} active={hotspot === spot.id} onToggle={() => toggleHotspot(spot.id)} />
            ))}

            <button onClick={prev} className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full items-center justify-center shadow-md hover:scale-105 transition-transform"><ChevronLeft size={18} color="#8a4f66" /></button>
            <button onClick={next} className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full items-center justify-center shadow-md hover:scale-105 transition-transform"><ChevronRight size={18} color="#8a4f66" /></button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══════ MOBILE: TOP BAR ══════ */}
      <div className="lg:hidden absolute top-0 left-0 right-0 z-30 flex flex-col px-4 pt-4 pb-2" style={{ background: 'transparent' }}>
        <div className="flex gap-1.5 overflow-x-auto thin-scroll no-scrollbar pb-2">
          {PRODUCTS.map((pr, i) => (
            <button key={pr.id} onClick={() => goTo(i)} className="px-3 py-2 rounded-full text-[10px] font-bold transition-all duration-300 whitespace-nowrap shrink-0 flex items-center gap-1.5" style={{ background: i === idx ? p.accent : 'rgba(255,255,255,0.7)', color: i === idx ? 'white' : '#8a4f66', border: `1px solid ${i === idx ? p.accent : 'rgba(255,255,255,0.9)'}`, boxShadow: i === idx ? `0 4px 14px ${p.accent}55` : 'none' }}>
              <pr.icon size={12} /> {pr.sub}
            </button>
          ))}
        </div>
      </div>

      {/* ══════ MOBILE: BOTTOM SHOP PANEL ══════ */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 z-30" style={{ background: 'rgba(255,240,247,0.95)', backdropFilter: 'blur(30px)', borderTop: '1px solid rgba(255,255,255,0.9)' }}>
        <AnimatePresence mode="wait">
          <motion.div key={p.id + '-mob'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }} className="px-5 py-4">

            {p.id === 'bundle' && (
              <div className="flex items-center gap-1.5 mb-2">
                <span className="bg-gradient-to-r from-[#fd86a5] to-[#f8578c] text-white px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-widest shadow-sm">Super Deal</span>
                <span className="text-[10px] font-bold" style={{ color: '#b87990' }}>Lebih Hemat Rp 15.000</span>
              </div>
            )}

            <div className="flex items-center justify-between mb-0.5">
              <p className="font-extrabold text-lg leading-tight" style={{ color: '#2d0f1e' }}>{p.name} <span style={{ color: p.accent }}>{p.sub}</span></p>
              <div className="flex gap-0.5 items-center">
                <Star size={10} fill={p.accent} color={p.accent} />
                <span className="text-[10px] font-bold" style={{ color: '#8a4f66' }}>4.9</span>
              </div>
            </div>

            <p className="text-[10px] font-semibold mb-3 line-clamp-1" style={{ color: '#7a3f58' }}>{p.size}</p>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-[9px] font-bold tracking-widest uppercase mb-0.5" style={{ color: '#b87990' }}>{qty > 1 ? 'TOTAL HARGA' : 'HARGA'}</p>
                <div className="flex items-baseline gap-1.5">
                  <p className="text-xl font-extrabold" style={{ color: p.accent }}>{fmt(p.price * qty)}</p>
                  {p.originalPrice && qty === 1 && <s className="text-[10px] font-semibold" style={{ color: '#c09bab' }}>{fmt(p.originalPrice)}</s>}
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/50 rounded-full p-1 border border-white/60">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm"><Minus size={10} color="#8a4f66" /></button>
                <span className="text-sm font-bold w-4 text-center" style={{ color: '#2d0f1e' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm"><Plus size={10} color="#8a4f66" /></button>
              </div>

              <motion.button whileTap={{ scale: 0.95 }} className="flex items-center justify-center px-4 py-3 rounded-xl text-white font-bold text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${p.accent}, #f8578c)`, boxShadow: `0 4px 16px ${p.accent}55` }}>
                <ShoppingBag size={14} />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
