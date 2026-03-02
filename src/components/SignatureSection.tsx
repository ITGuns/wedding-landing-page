import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

export default function SignatureSection() {
    const sectionRef = useRef(null);
    useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    return (
        <div id="signature" className="relative overflow-hidden flex items-start justify-center min-h-[160vh] pt-12 pb-24">
            <div className="max-w-6xl px-6 md:px-12 relative z-10 text-center mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <span className="inline-block border border-luxury-copper/50 rounded-full px-12 py-3 backdrop-blur-md bg-luxury-copper/10 text-luxury-copper font-sans font-bold tracking-[0.4em] uppercase text-xs mb-12 shadow-[0_0_30px_rgba(156,90,60,0.2)]">
                        About Us
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-lorestta text-white italic font-bold leading-tight mb-2">
                        Cinematic Storytelling,
                    </h2>
                    <p className="text-xl md:text-2xl font-serif text-white/90 font-light">
                        Illuminated in First Light
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6"
                >
                    <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">
                        At First Light Studios, we turn love stories into <span className="font-medium italic">timeless cinematic masterpieces</span>.
                    </p>
                    <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
                        Led by <span className="font-medium">Jed Regala</span>, we capture weddings with intention, artistry, and heart — preserving every glance, vow, and celebration in a way that feels elegant, authentic, and unforgettable.
                    </p>
                    <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed italic mt-10">
                        Because your story deserves nothing less than extraordinary.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
