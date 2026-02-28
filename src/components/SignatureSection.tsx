import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

export default function SignatureSection() {
    const sectionRef = useRef(null);
    useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={sectionRef} id="signature" className="py-32 relative overflow-hidden flex items-center justify-center min-h-[80vh]">
            {/* Background Image - Clean/No layering as requested */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/gallery/about-bg.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                {/* 1. SECTION HEADER */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block border border-white/40 rounded-full px-12 py-3 backdrop-blur-md bg-black/20 text-white font-sans font-bold tracking-[0.4em] uppercase text-xs mb-8 shadow-2xl">
                            About Us
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-8xl font-script text-white leading-[1.1] tracking-tight [text-shadow:2px_2px_15px_rgba(0,0,0,0.8)]">
                            Timeless <br />
                            <span className="italic font-light text-gold">Cinematic Masterpieces</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Vertical Narrative */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto"
                >
                    <p className="text-white text-xl md:text-2xl font-light leading-relaxed mb-6 [text-shadow:1px_1px_10px_rgba(0,0,0,0.6)]">
                        At First Light Studios, we turn love stories into <span className="text-gold italic font-medium">timeless cinematic masterpieces</span>.
                    </p>
                    <p className="text-white/90 font-light leading-relaxed mb-6 text-lg [text-shadow:1px_1px_8px_rgba(0,0,0,0.5)]">
                        Led by <span className="text-white font-medium">Jed Regala</span>, we capture weddings with intention, artistry, and heart — preserving every glance, vow, and celebration in a way that feels elegant, authentic, and unforgettable.
                    </p>
                    <p className="text-white/90 font-light leading-relaxed text-lg [text-shadow:1px_1px_8px_rgba(0,0,0,0.5)]">
                        Because your story deserves nothing less than <span className="text-gold italic font-medium">extraordinary</span>.
                    </p>
                </motion.div>
            </div>
        </section >
    );
}
