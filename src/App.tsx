
import Navbar from './components/layout/Navbar';
import ContactSection from './components/ContactSection';
import SignatureSection from './components/SignatureSection';
import ServicesSection from './components/ServicesSection';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

// ── Gallery video data — all 6 real films ───────────────────────────
const galleryVideos = [
  {
    id: '1',
    title: "Ceres and Hans",
    location: "A First Light Studios Signature Film",
    src: "/gallery/ceres-hans.mp4",
    colSpan: "md:col-span-12",
    rowSpan: "md:row-span-2",
  },
  {
    id: '2',
    title: "Veronica and Chad",
    location: "Pre-wedding Film",
    src: "/gallery/vironica-chad.mp4",
    colSpan: "md:col-span-12",
    rowSpan: "md:row-span-2",
  },
  {
    id: '3',
    title: "Dianne and Phil",
    location: "A First Light Studios Signature Film",
    src: "/gallery/dianne-phil.mp4",
    colSpan: "md:col-span-12",
    rowSpan: "md:row-span-2",
  },
  {
    id: '4',
    title: "Zarah and PJ",
    location: "A First Light Studios Signature Film",
    src: "/gallery/zarah-pj.mp4",
    colSpan: "md:col-span-12",
    rowSpan: "md:row-span-2",
  },
  {
    id: '5',
    title: "Ariana and Justin",
    location: "A First Light Studios Signature Film",
    src: "/gallery/justin-ariana.mp4",
    colSpan: "md:col-span-12",
    rowSpan: "md:row-span-2",
  },
];

// ── Gallery Card ────────────────────────────────────────────────────
function GalleryCard({ video, index, onClick }: {
  video: typeof galleryVideos[0];
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play only when card enters viewport (even 5% visible is enough)
  // Force muted via JS property — Chrome requires this for autoplay policy
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Ensure muted is set as a property (not just attribute) for Chrome autoplay
    el.muted = true;
    el.defaultMuted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.muted = true;
          const playPromise = el.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // If blocked, retry once on next user interaction
              const retry = () => { el.play().catch(() => { }); };
              document.addEventListener('click', retry, { once: true });
              document.addEventListener('scroll', retry, { once: true });
            });
          }
        } else {
          el.pause();
        }
      },
      { threshold: 0.05 }   // trigger when just 5% of the card is visible
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden cursor-pointer group rounded-sm ${video.colSpan} ${video.rowSpan}`}
    >
      {/* Muted video — plays as soon as card enters viewport */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        src={video.src}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-all duration-500 group-hover:from-black/60" />

      {/* Index watermark */}
      <div className="absolute top-5 left-6 text-white/10 font-serif text-6xl font-bold leading-none select-none pointer-events-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-white font-lorestta italic text-3xl md:text-4xl tracking-wide mb-2">{video.title}</h3>
        <p className="text-luxury-copper text-[10px] uppercase tracking-[0.25em] font-bold">{video.location}</p>
      </div>

      {/* Copper border on hover - Desktop only */}
      <div className={`absolute inset-0 pointer-events-none border-2 border-luxury-copper/60 rounded-sm transition-opacity duration-300 hidden md:block ${hovered ? 'opacity-100' : 'opacity-0'}`} />
    </motion.div>
  );
}


// ── Lightbox Player ─────────────────────────────────────────────────
function LightboxPlayer({ index, onClose, onPrev, onNext }: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const video = galleryVideos[index];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => { });
    }
  }, [index]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[200] bg-black flex flex-col"
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 py-5 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h3 className="text-white font-lorestta italic text-3xl md:text-4xl tracking-wide mb-1">{video.title}</h3>
          <p className="text-luxury-copper text-xs uppercase tracking-widest">{video.location}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setMuted(m => !m); if (videoRef.current) videoRef.current.muted = !muted; }}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/50 hover:text-white text-xs uppercase tracking-widest transition-colors group"
          >
            Close
            <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
              <X size={14} />
            </span>
          </button>
        </div>
      </div>

      {/* Video — no fake poster, plays immediately */}
      <video
        ref={videoRef}
        src={video.src}
        controls
        muted={muted}
        className="w-full h-full object-contain"
      />

      {/* Prev / Next + counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
        <button onClick={onPrev} className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors">
          <ChevronLeft size={20} />
        </button>
        <span className="text-white/40 text-xs font-sans px-2 select-none">
          {index + 1} / {galleryVideos.length}
        </span>
        <button onClick={onNext} className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Thumbnail strip — actual video stills, no fake images */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 hidden md:flex gap-3">
        {galleryVideos.map((v, i) => (
          <button
            key={v.id}
            onClick={() => { if (i < index) onPrev(); else if (i > index) onNext(); }}
            className={`w-20 h-14 rounded-sm overflow-hidden border-2 transition-all ${i === index ? 'border-luxury-copper opacity-100' : 'border-transparent opacity-40 hover:opacity-70'}`}
          >
            <video
              src={v.src}
              muted
              playsInline
              className="w-full h-full object-cover pointer-events-none"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main App ────────────────────────────────────────────────────────
function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const heroVideos = [
    "/videos/hero-1.mp4",
    "/videos/hero-2.mp4",
    "/videos/hero-3.mp4"
  ];

  const openVideo = (i: number) => setActiveVideoIndex(i);
  const closeVideo = () => setActiveVideoIndex(null);
  const nextVideo = () => setActiveVideoIndex(prev => prev !== null ? (prev + 1) % galleryVideos.length : 0);
  const prevVideo = () => setActiveVideoIndex(prev => prev !== null ? (prev - 1 + galleryVideos.length) % galleryVideos.length : 0);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-earth-950 via-earth-900 to-earth-800 text-earth-100 overflow-x-hidden selection:bg-gold selection:text-white">
      {/* Global Texture Overlay */}
      <div className="fixed inset-0 opacity-15 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay z-0"></div>

      <Navbar />

      {/* ── LIGHTBOX PLAYER ── */}
      <AnimatePresence>
        {activeVideoIndex !== null && (
          <LightboxPlayer
            index={activeVideoIndex}
            onClose={closeVideo}
            onNext={nextVideo}
            onPrev={prevVideo}
          />
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-sunset-start/90 via-sunset-mid/50 to-sunset-end/30 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/20 z-10" />
          <video
            key={currentVideoIndex}
            autoPlay
            loop={false}
            muted
            playsInline
            onEnded={() => setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length)}
            className="w-full h-full object-cover opacity-80 transition-opacity duration-1000"
          >
            <source src={heroVideos[currentVideoIndex]} type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto animate-float">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-9xl font-swash text-white leading-[1.1] mb-8 tracking-tight drop-shadow-2xl px-4">
              The Art of <br />
              <span className="text-luxury-copper" style={{ fontSize: '1.1em' }}>Remembering</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg font-light tracking-[0.2em] italic mb-10 font-serif">
              Cinematic Storytelling, Illuminated in First Light
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm border border-white/40 text-white px-12 py-5 rounded-full font-sans font-medium text-base shadow-xl flex items-center gap-3 hover:bg-white hover:text-earth-900 transition-all duration-500"
              >
                Inquire Now
                <ArrowRight size={18} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] uppercase tracking-widest opacity-70 text-white">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* ── PORTFOLIO + GALLERY (merged) ── */}
      <section id="portfolio" className="relative py-32 bg-transparent">
        <div className="w-full relative z-10 px-0">
          {/* Section badge — enlarged as requested */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block border border-luxury-copper/50 rounded-full px-12 py-3 backdrop-blur-md bg-luxury-copper/10 text-luxury-copper font-sans font-bold tracking-[0.4em] uppercase text-xs mb-8 shadow-[0_0_30px_rgba(156,90,60,0.2)]">
                Our Work
              </span>
            </motion.div>
          </div>

          {/* ── Gallery grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[450px] md:auto-rows-[70vh] gap-4">
            {galleryVideos.map((video, index) => (
              <GalleryCard
                key={video.id}
                video={video}
                index={index}
                onClick={() => openVideo(index)}
              />
            ))}
          </div>
        </div>
      </section>


      {/* ── SHARED STORY SECTION (Services + About Us) ── */}
      <section id="our-story" className="relative overflow-hidden">
        {/* Continuous Background Shared by both */}
        <div className="absolute inset-0 z-0">
          <img
            src="/gallery/about-bg.png"
            alt="Shared Story Background"
            className="w-full h-full object-cover"
          />
          {/* Consistent dark overlay for text readability across both sections */}
          <div className="absolute inset-0 bg-black/60 md:bg-black/40" />
        </div>

        <div className="relative z-10">
          <ServicesSection />
          <SignatureSection />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <ContactSection />

    </div>
  );
}

export default App;
