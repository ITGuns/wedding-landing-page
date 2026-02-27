
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronRight, ChevronLeft, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export interface GalleryVideo {
    id: string;
    title: string;
    location: string;
    src: string;
    poster: string;
    aspect: 'landscape' | 'portrait';
}

const galleryVideos: GalleryVideo[] = [
    {
        id: '1',
        title: "Ceres & Hans",
        location: "Bali Wedding",
        src: "/gallery/Ceres%20and%20Hans%20Bali%20Wedding_FLS%20Watermark%20(1).mp4",
        poster: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
        aspect: 'landscape'
    },
    {
        id: '2',
        title: "Justin & Ariana",
        location: "Same Day Edit",
        src: "/gallery/Justin%20x%20Ariana%20Video%20SDE.mp4",
        poster: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop",
        aspect: 'portrait'
    },
    {
        id: '3',
        title: "Vironica & Chad",
        location: "Signature Film · Marriott",
        src: "/gallery/Vironica-%26-Chad-Signature-Film-Marriott_Media_dUdaUja6NOU_001_1080p.mp4",
        poster: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
        aspect: 'landscape'
    },
    {
        id: '4',
        title: "Zarah & PJ",
        location: "SDE Film",
        src: "/gallery/ZARAH%20X%20PJ%20SDE%20%2B%20FLS%20Watermark.mp4",
        poster: "https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=1976&auto=format&fit=crop",
        aspect: 'portrait'
    }
];

interface GalleryOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function GalleryOverlay({ isOpen, onClose }: GalleryOverlayProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [muted, setMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const activeVideo = activeIndex !== null ? galleryVideos[activeIndex] : null;

    const openVideo = (index: number) => setActiveIndex(index);
    const closeVideo = () => { setActiveIndex(null); setMuted(false); };

    const nextVideo = () => setActiveIndex(prev => prev !== null ? (prev + 1) % galleryVideos.length : 0);
    const prevVideo = () => setActiveIndex(prev => prev !== null ? (prev - 1 + galleryVideos.length) % galleryVideos.length : 0);

    // Play when active video changes
    useEffect(() => {
        if (activeVideo && videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => { });
        }
    }, [activeIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') { activeIndex !== null ? closeVideo() : onClose(); }
            if (e.key === 'ArrowRight' && activeIndex !== null) nextVideo();
            if (e.key === 'ArrowLeft' && activeIndex !== null) prevVideo();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, activeIndex]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[100] bg-[#0d0a09] overflow-y-auto"
                >
                    {/* ── HEADER ── */}
                    <div className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#0d0a09]/90 backdrop-blur-md border-b border-white/5">
                        <div>
                            <span className="text-luxury-copper text-[10px] uppercase tracking-[0.35em] font-bold block mb-0.5">First Light Studios</span>
                            <h2 className="text-white font-serif text-xl md:text-2xl leading-none">Film Archive</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 text-white/40 hover:text-white text-sm uppercase tracking-widest transition-colors group"
                        >
                            Close
                            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                                <X size={14} />
                            </span>
                        </button>
                    </div>

                    {/* ── GALLERY GRID ── */}
                    <div className="px-6 md:px-12 py-12">
                        <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-10 font-sans">
                            {galleryVideos.length} Films &nbsp;·&nbsp; Select to watch
                        </p>

                        {/* Masonry-style asymmetric grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[280px]">

                            {/* Card 1 — wide landscape (spans 8 cols, 2 rows) */}
                            <GalleryCard
                                video={galleryVideos[0]}
                                index={0}
                                onClick={() => openVideo(0)}
                                className="md:col-span-8 md:row-span-2"
                            />

                            {/* Card 2 — portrait tall (spans 4 cols, 2 rows) */}
                            <GalleryCard
                                video={galleryVideos[1]}
                                index={1}
                                onClick={() => openVideo(1)}
                                className="md:col-span-4 md:row-span-2"
                            />

                            {/* Card 3 — medium landscape (spans 6 cols, 1 row) */}
                            <GalleryCard
                                video={galleryVideos[2]}
                                index={2}
                                onClick={() => openVideo(2)}
                                className="md:col-span-6"
                            />

                            {/* Card 4 — medium (spans 6 cols, 1 row) */}
                            <GalleryCard
                                video={galleryVideos[3]}
                                index={3}
                                onClick={() => openVideo(3)}
                                className="md:col-span-6"
                            />
                        </div>
                    </div>

                    {/* ── FULLSCREEN PLAYER ── */}
                    <AnimatePresence>
                        {activeVideo && (
                            <motion.div
                                key={activeVideo.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="fixed inset-0 z-[200] bg-black flex flex-col"
                            >
                                {/* Player top bar */}
                                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 py-5 bg-gradient-to-b from-black/80 to-transparent">
                                    <div>
                                        <h3 className="text-white font-serif text-2xl md:text-3xl leading-none mb-1">{activeVideo.title}</h3>
                                        <p className="text-luxury-copper text-xs uppercase tracking-widest">{activeVideo.location}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* Mute toggle */}
                                        <button
                                            onClick={() => { setMuted(m => !m); if (videoRef.current) videoRef.current.muted = !muted; }}
                                            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
                                        >
                                            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                        </button>
                                        {/* Back to gallery */}
                                        <button
                                            onClick={closeVideo}
                                            className="flex items-center gap-2 text-white/50 hover:text-white text-sm uppercase tracking-widest transition-colors group"
                                        >
                                            Back to Gallery
                                            <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                                                <X size={14} />
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Video */}
                                <video
                                    ref={videoRef}
                                    src={activeVideo.src}
                                    poster={activeVideo.poster}
                                    controls
                                    muted={muted}
                                    className="w-full h-full object-contain"
                                />

                                {/* Prev / Next pill */}
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                                    <button onClick={prevVideo} className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                                        <ChevronLeft size={20} />
                                    </button>
                                    <span className="text-white/40 text-xs font-sans px-2 select-none">
                                        {(activeIndex ?? 0) + 1} / {galleryVideos.length}
                                    </span>
                                    <button onClick={nextVideo} className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>

                                {/* Thumbnail strip at bottom */}
                                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 hidden md:flex gap-3">
                                    {galleryVideos.map((v, i) => (
                                        <button
                                            key={v.id}
                                            onClick={() => openVideo(i)}
                                            className={`w-20 h-14 rounded-sm overflow-hidden border-2 transition-all ${i === activeIndex ? 'border-luxury-copper opacity-100' : 'border-transparent opacity-40 hover:opacity-70'}`}
                                        >
                                            <img src={v.poster} alt={v.title} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ── GALLERY CARD COMPONENT ──────────────────────────────────────────
function GalleryCard({ video, index, onClick, className }: {
    video: GalleryVideo;
    index: number;
    onClick: () => void;
    className?: string;
}) {
    const [hovered, setHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (hovered && videoRef.current) {
            videoRef.current.play().catch(() => { });
        } else if (!hovered && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [hovered]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative overflow-hidden cursor-pointer group rounded-sm ${className}`}
        >
            {/* Poster fallback image */}
            <img
                src={video.poster}
                alt={video.title}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${hovered ? 'opacity-0' : 'opacity-100'}`}
                style={{ transition: 'opacity 0.5s ease, transform 0.7s ease' }}
            />

            {/* Muted preview video on hover */}
            <video
                ref={videoRef}
                src={video.src}
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/60" />

            {/* Play button */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play size={22} className="text-white fill-white ml-1" />
                </div>
            </div>

            {/* Film index */}
            <div className="absolute top-4 left-4 text-white/20 font-serif text-5xl leading-none font-bold select-none">
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Title + Location */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <h3 className="text-white font-serif text-2xl md:text-3xl leading-tight mb-1">{video.title}</h3>
                <p className="text-luxury-copper text-[10px] uppercase tracking-[0.25em] font-bold">{video.location}</p>
            </div>

            {/* Copper border on hover */}
            <div className={`absolute inset-0 border-2 border-luxury-copper/60 rounded-sm transition-opacity duration-300 pointer-events-none ${hovered ? 'opacity-100' : 'opacity-0'}`} />
        </motion.div>
    );
}
