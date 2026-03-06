import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, Sparkles, X, ImageIcon } from 'lucide-react';

const services = [
    {
        id: 1,
        key: 'photography',
        title: "Photography Services",
        description: "Moments of love, connection, and celebration — intentionally framed and preserved as timeless photographs.",
        icon: Camera,
        galleryLabel: "Photography Gallery",
    },
    {
        id: 2,
        key: 'videography',
        title: "Videography Services",
        description: "A cinematic retelling of your wedding day — woven with emotion, movement, and the beauty of the moment.",
        icon: Video,
        galleryLabel: "Videography Gallery",
    },
    {
        id: 3,
        key: 'signature',
        title: "First Light Studios Signature",
        description: "Our highly conceptual approach transforming your wedding into a timeless masterpiece, blending artistry with technology to create an immersive cinematic experience.",
        icon: Sparkles,
        galleryLabel: "Signature Collection Gallery",
    }
];

const photographyVideos = [
    {
        id: 1,
        title: "Ariana and Justin",
        subtitle: "Pre-Wedding Video Slideshow",
        src: "/gallery/photography/Ariana-&-Justin-Pre-Wedding-Film-Fukuoka_Media_xOxxnuoVQLU_001_1080p.mp4"
    },
    {
        id: 2,
        title: "Dianne and Phil",
        subtitle: "Wedding Photography",
        src: "/gallery/photography/Dianne & Phil Photos.mp4"
    },
    {
        id: 3,
        title: "Zarah and PJ",
        subtitle: "Wedding Photography",
        src: "/gallery/photography/Zarah & PJ Photos.mp4"
    }
];

const videographyVideos = [
    {
        id: 1,
        title: "Vironica & Chad",
        subtitle: "Pre wedding",
        src: "/gallery/videography/Vironica-and-Chad-Pre-Wedding-film_Media__Lcmf6G-snI_001_1080p.mp4"
    },
    {
        id: 2,
        title: "Camille & Drew",
        subtitle: "Wedding",
        src: "/gallery/videography/Camille and Drew Wedding V2.mp4"
    },
    {
        id: 3,
        title: "Sean & Tanya",
        subtitle: "Pre-Wedding",
        src: "/gallery/videography/Tanya-&-Sean-Prewedding-Film-Tagaytay-Hi_Media_pt_y--tl6A8_001_1080p.mp4"
    },
    {
        id: 4,
        title: "Sean & Tanya",
        subtitle: "Wedding",
        src: "/gallery/videography/Sean and Tanya Wedding V002.mp4"
    },
    {
        id: 5,
        title: "Dandy & Nicole",
        subtitle: "Pre-wedding",
        src: "/gallery/videography/Dandy-and-Nicole-PW-2-4k-Revised_Media_7eqVbL26Pnk_001_1080p.mp4"
    },
    {
        id: 6,
        title: "Karla & Jed",
        subtitle: "Wedding",
        src: "/gallery/videography/Karla and Jed Manila Wedding.mp4"
    },
    {
        id: 7,
        title: "Earl & Hazel",
        subtitle: "Pre-wedding",
        src: "/gallery/videography/Earl-and-Hazel-PW-May-11-2025-4k_Media_TvQO0TE1lRs_001_1080p.mp4"
    },
    {
        id: 8,
        title: "Jasmine & Francis",
        subtitle: "Wedding",
        src: "/gallery/videography/Jasmine and Francis.mp4"
    },
    {
        id: 9,
        title: "Judy & Richard",
        subtitle: "Wedding",
        src: "/gallery/videography/Judy-&-Richard-First-Light-Studios-Weddi_Media_BugdbcrpDmk_001_1080p.mp4"
    },
    {
        id: 10,
        title: "Mae & Paulo",
        subtitle: "Wedding",
        src: "/gallery/videography/Mae-&-Paulo-First-Light-Studios-Wedding_Media_2zN88eBmmOs_001_1080p.mp4"
    },
    {
        id: 11,
        title: "Natasha & Brandon",
        subtitle: "Wedding",
        src: "/gallery/videography/Natasha & Brandon.mp4"
    },
    {
        id: 12,
        title: "Enrique & Dominique",
        subtitle: "Wedding",
        src: "/gallery/videography/Enrique and Dominique Same Day Edit and Onsite Photo 4k.mp4"
    }
];

const signatureVideos = [
    {
        id: 1,
        title: "RJ & Maricris",
        subtitle: "FLS Signature Film",
        src: "/gallery/signature/RJ and Maricris.mp4"
    },
    {
        id: 2,
        title: "Ceres & Hans",
        subtitle: "Bali Wedding",
        src: "/gallery/signature/Ceres and Hans Bali Wedding.mp4"
    },
    {
        id: 3,
        title: "Shania & Lenard",
        subtitle: "Signature Film — Balesin",
        src: "/gallery/signature/Shania-&-Lenard-Signature-Film-Balesin-C_Media_6t80WAHPMdU_001_1080p.mp4"
    },
    {
        id: 4,
        title: "Vironica & Chad",
        subtitle: "Signature Film — Marriott",
        src: "/gallery/signature/Vironica-&-Chad-Signature-Film-Marriott_Media_dUdaUja6NOU_001_1080p.mp4"
    },
    {
        id: 5,
        title: "Zarah & PJ",
        subtitle: "SDE Film",
        src: "/gallery/signature/ZARAH X PJ SDE.mp4"
    },
    {
        id: 6,
        title: "Dianne & Phil",
        subtitle: "FLS Signature Film",
        src: "/gallery/signature/Dianne x Phil FLS.mp4"
    }
];

function VideographyGalleryOverlay({ onClose }: { onClose: () => void }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeVideo = videographyVideos[activeIndex];
    const videoRef = useRef<HTMLVideoElement>(null);

    // Autoplay when active index changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => { });
        }
    }, [activeIndex]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="fixed inset-0 z-[500] bg-earth-950 flex flex-col"
            >
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 md:px-12 py-4 md:py-6 border-b border-white/10 shrink-0">
                    <div>
                        <p className="text-luxury-copper text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-sans font-bold mb-0.5 md:mb-1">
                            First Light Studios
                        </p>
                        <h2 className="text-white font-lorestta italic text-2xl md:text-3xl lg:text-4xl tracking-wide">
                            Videography Gallery
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-white/50 hover:text-white text-xs uppercase tracking-widest transition-colors group"
                    >
                        <span className="hidden md:inline">Close</span>
                        <span className="w-10 h-10 md:w-9 md:h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                            <X size={16} className="md:w-3.5 md:h-3.5" />
                        </span>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    {/* Left: Main Video Player (Stagnant on mobile) */}
                    <div className="w-full md:w-3/4 flex flex-col shrink-0 md:shrink md:flex-1 md:items-center md:justify-center md:p-8 border-b md:border-b-0 md:border-r border-white/10 relative bg-black">
                        <div className="w-full relative shadow-[0_0_50px_rgba(0,0,0,0.5)] md:rounded-md overflow-hidden aspect-video bg-black">
                            <video
                                ref={videoRef}
                                key={activeVideo.id}
                                src={activeVideo.src}
                                controls
                                playsInline
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Right: Scrollable Info and Playlist */}
                    <div className="flex-1 md:w-1/4 overflow-y-auto bg-earth-900/50">
                        {/* Video Info - Below Player on Mobile */}
                        <div className="p-6 border-b border-white/10 md:absolute md:inset-x-0 md:bottom-0 md:p-6 md:pt-20 md:bg-gradient-to-t md:from-black/90 md:via-black/40 md:to-transparent md:pointer-events-none md:border-none">
                            <h3 className="text-2xl md:text-2xl lg:text-3xl font-lorestta italic text-white mb-2 md:drop-shadow-2xl leading-relaxed py-1">{activeVideo.title}</h3>
                            <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-[0.25em] font-sans font-medium md:drop-shadow-md">{activeVideo.subtitle}</p>
                        </div>

                        {/* Playlist Section */}
                        <div className="p-6 md:p-8">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-6 md:mb-8 font-sans">Now Showing</h4>
                            <div className="space-y-4 md:space-y-6">
                                {videographyVideos.map((video, idx) => (
                                    <button
                                        key={video.id}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`w-full text-left group transition-all duration-300 flex md:flex-col gap-4 md:gap-0 ${activeIndex === idx ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
                                    >
                                        <div className={`w-32 md:w-full aspect-video bg-black/50 overflow-hidden shrink-0 border transition-colors ${activeIndex === idx ? 'border-luxury-copper' : 'border-transparent group-hover:border-white/20'}`}>
                                            <video
                                                src={video.src + "#t=0.1"}
                                                preload="metadata"
                                                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center py-1">
                                            <h5 className={`font-lorestta italic text-lg md:text-xl lg:text-2xl leading-tight ${activeIndex === idx ? 'text-white' : 'text-white/80'}`}>{video.title}</h5>
                                            {video.subtitle && <p className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-sans mt-1 md:mt-2">{video.subtitle}</p>}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}

function SignatureGalleryOverlay({ onClose }: { onClose: () => void }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeVideo = signatureVideos[activeIndex];
    const videoRef = useRef<HTMLVideoElement>(null);

    // Autoplay when active index changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => { });
        }
    }, [activeIndex]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="fixed inset-0 z-[500] bg-earth-950 flex flex-col"
            >
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 md:px-12 py-4 md:py-6 border-b border-white/10 shrink-0">
                    <div>
                        <p className="text-luxury-copper text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-sans font-bold mb-0.5 md:mb-1">
                            First Light Studios
                        </p>
                        <h2 className="text-white font-lorestta italic text-2xl md:text-3xl lg:text-4xl tracking-wide">
                            Signature Collection Gallery
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-white/50 hover:text-white text-xs uppercase tracking-widest transition-colors group"
                    >
                        <span className="hidden md:inline">Close</span>
                        <span className="w-10 h-10 md:w-9 md:h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                            <X size={16} className="md:w-3.5 md:h-3.5" />
                        </span>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    {/* Left: Main Video Player (Stagnant on mobile) */}
                    <div className="w-full md:w-3/4 flex flex-col shrink-0 md:shrink md:flex-1 md:items-center md:justify-center md:p-8 border-b md:border-b-0 md:border-r border-white/10 relative bg-black">
                        <div className="w-full relative shadow-[0_0_50px_rgba(0,0,0,0.5)] md:rounded-md overflow-hidden aspect-video bg-black">
                            <video
                                ref={videoRef}
                                key={activeVideo.id}
                                src={activeVideo.src}
                                controls
                                playsInline
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Right: Scrollable Info and Playlist */}
                    <div className="flex-1 md:w-1/4 overflow-y-auto bg-earth-900/50">
                        {/* Video Info - Below Player on Mobile, Overlay on Desktop (Optional but here below for cleaner UI) */}
                        <div className="p-6 border-b border-white/10 md:absolute md:inset-x-0 md:bottom-0 md:p-6 md:pt-20 md:bg-gradient-to-t md:from-black/90 md:via-black/40 md:to-transparent md:pointer-events-none md:border-none">
                            <h3 className="text-2xl md:text-2xl lg:text-3xl font-lorestta italic text-white mb-2 md:drop-shadow-2xl leading-relaxed py-1">{activeVideo.title}</h3>
                            <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-[0.25em] font-sans font-medium md:drop-shadow-md">{activeVideo.subtitle}</p>
                        </div>

                        {/* Playlist Section */}
                        <div className="p-6 md:p-8">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-6 md:mb-8 font-sans">Now Showing</h4>
                            <div className="space-y-4 md:space-y-6">
                                {signatureVideos.map((video, idx) => (
                                    <button
                                        key={video.id}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`w-full text-left group transition-all duration-300 flex md:flex-col gap-4 md:gap-0 ${activeIndex === idx ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
                                    >
                                        <div className={`w-32 md:w-full aspect-video bg-black/50 overflow-hidden shrink-0 border transition-colors ${activeIndex === idx ? 'border-luxury-copper' : 'border-transparent group-hover:border-white/20'}`}>
                                            <video
                                                src={video.src + "#t=0.1"}
                                                preload="metadata"
                                                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center py-1">
                                            <h5 className={`font-lorestta italic text-lg md:text-xl lg:text-2xl leading-tight ${activeIndex === idx ? 'text-white' : 'text-white/80'}`}>{video.title}</h5>
                                            {video.subtitle && <p className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-sans mt-1 md:mt-2">{video.subtitle}</p>}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}

function PhotographyGalleryOverlay({ onClose }: { onClose: () => void }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeVideo = photographyVideos[activeIndex];
    const videoRef = useRef<HTMLVideoElement>(null);

    // Autoplay when active index changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => { });
        }
    }, [activeIndex]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="fixed inset-0 z-[500] bg-earth-950 flex flex-col"
            >
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 md:px-12 py-4 md:py-6 border-b border-white/10 shrink-0">
                    <div>
                        <p className="text-luxury-copper text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-sans font-bold mb-0.5 md:mb-1">
                            First Light Studios
                        </p>
                        <h2 className="text-white font-lorestta italic text-2xl md:text-3xl lg:text-4xl tracking-wide">
                            Photography Gallery
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-white/50 hover:text-white text-xs uppercase tracking-widest transition-colors group"
                    >
                        <span className="hidden md:inline">Close</span>
                        <span className="w-10 h-10 md:w-9 md:h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                            <X size={16} className="md:w-3.5 md:h-3.5" />
                        </span>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    {/* Left: Main Video Player (Stagnant on mobile) */}
                    <div className="w-full md:w-3/4 flex flex-col shrink-0 md:shrink md:flex-1 md:items-center md:justify-center md:p-8 border-b md:border-b-0 md:border-r border-white/10 relative bg-black">
                        <div className="w-full relative shadow-[0_0_50px_rgba(0,0,0,0.5)] md:rounded-md overflow-hidden aspect-video bg-black">
                            <video
                                ref={videoRef}
                                key={activeVideo.id} // Force re-mount on change
                                src={activeVideo.src}
                                controls
                                playsInline
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Right: Scrollable Info and Playlist */}
                    <div className="flex-1 md:w-1/4 overflow-y-auto bg-earth-900/50">
                        {/* Video Info - Below Player on Mobile */}
                        <div className="p-6 border-b border-white/10 md:absolute md:inset-x-0 md:bottom-0 md:p-6 md:pt-20 md:bg-gradient-to-t md:from-black/90 md:via-black/40 md:to-transparent md:pointer-events-none md:border-none">
                            <h3 className="text-2xl md:text-2xl lg:text-3xl font-lorestta italic text-white mb-2 md:drop-shadow-2xl leading-relaxed py-1">{activeVideo.title}</h3>
                            <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-[0.25em] font-sans font-medium md:drop-shadow-md">{activeVideo.subtitle}</p>
                        </div>

                        {/* Playlist Section */}
                        <div className="p-6 md:p-8">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-6 md:mb-8 font-sans">Now Showing</h4>
                            <div className="space-y-4 md:space-y-6">
                                {photographyVideos.map((video, idx) => (
                                    <button
                                        key={video.id}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`w-full text-left group transition-all duration-300 flex md:flex-col gap-4 md:gap-0 ${activeIndex === idx ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
                                    >
                                        <div className={`w-32 md:w-full aspect-video bg-black/50 overflow-hidden shrink-0 border transition-colors ${activeIndex === idx ? 'border-luxury-copper' : 'border-transparent group-hover:border-white/20'}`}>
                                            <video
                                                src={video.src + "#t=0.1"}
                                                preload="metadata"
                                                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center py-1">
                                            <h5 className={`font-lorestta italic text-lg md:text-xl lg:text-2xl leading-tight ${activeIndex === idx ? 'text-white' : 'text-white/80'}`}>{video.title}</h5>
                                            {video.subtitle && <p className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-sans mt-1 md:mt-2">{video.subtitle}</p>}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}

// ── Blank Gallery Overlay ────────────────────────────────────────────
function ServiceGalleryOverlay({ service, onClose }: {
    service: typeof services[0];
    onClose: () => void;
}) {
    // Close on Escape key
    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-sm flex flex-col"
            >
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/10">
                    <div>
                        <p className="text-luxury-copper text-[10px] uppercase tracking-[0.3em] font-sans font-bold mb-1">
                            First Light Studios
                        </p>
                        <h2 className="text-white font-lorestta italic text-3xl md:text-4xl tracking-wide">
                            {service.galleryLabel}
                        </h2>
                    </div>
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

                {/* Gallery body — blank placeholder */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6">
                    <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center">
                        <ImageIcon size={32} strokeWidth={1} className="text-white/20" />
                    </div>
                    <div>
                        <p className="text-white/30 font-sans text-sm uppercase tracking-widest mb-2">
                            Gallery Coming Soon
                        </p>
                        <p className="text-white/15 font-serif italic text-xs">
                            Content will be added here
                        </p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}

// ── Services Section ─────────────────────────────────────────────────
export default function ServicesSection() {
    const [activeGallery, setActiveGallery] = useState<typeof services[0] | null>(null);

    return (
        <>
            <div id="services" className="relative pt-24 pb-12 overflow-hidden">
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block border border-luxury-copper/50 rounded-full px-12 py-3 backdrop-blur-md bg-luxury-copper/10 text-luxury-copper font-sans font-bold tracking-[0.4em] uppercase text-xs mb-8 shadow-[0_0_30px_rgba(156,90,60,0.2)]">
                                Our Services
                            </span>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, delay: 0.2 }}
                                className="text-white/70 font-lorestta italic text-lg md:text-xl tracking-wide leading-relaxed"
                            >
                                Begin at First Light.<br />
                                <span className="text-white/50 text-base md:text-lg">From quiet moments to the grand celebrations</span><br />
                                <span className="text-luxury-copper">Illuminated by First Light</span>
                            </motion.p>
                        </motion.div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setActiveGallery(service)}
                                className="group relative p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm hover:border-gold/40 transition-all duration-500 overflow-hidden cursor-pointer"
                            >
                                {/* Hover Reveal Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="mb-8 p-4 rounded-full border border-white/10 group-hover:border-gold/30 transition-colors duration-500">
                                        <service.icon size={32} strokeWidth={1} className="text-gold" />
                                    </div>
                                    <h3 className="text-2xl font-display uppercase tracking-[0.2em] text-white mb-4 group-hover:text-gold transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    <p className="text-white/60 font-serif text-sm leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-300">
                                        {service.description}
                                    </p>

                                    {/* "View Gallery" hint on hover */}
                                    <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-white hover:text-luxury-copper transition-colors duration-500 font-sans font-bold">
                                        View Gallery →
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gallery Overlay */}
            {activeGallery && (
                activeGallery.key === 'photography' ? (
                    <PhotographyGalleryOverlay onClose={() => setActiveGallery(null)} />
                ) : activeGallery.key === 'signature' ? (
                    <SignatureGalleryOverlay onClose={() => setActiveGallery(null)} />
                ) : activeGallery.key === 'videography' ? (
                    <VideographyGalleryOverlay onClose={() => setActiveGallery(null)} />
                ) : (
                    <ServiceGalleryOverlay
                        service={activeGallery}
                        onClose={() => setActiveGallery(null)}
                    />
                )
            )}
        </>
    );
}
