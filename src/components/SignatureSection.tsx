import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function SignatureSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotateParallax = useTransform(scrollYProgress, [0, 1], [2, -2]);

    return (
        <section ref={sectionRef} id="signature" className="py-32 bg-transparent text-cream relative overflow-hidden">
            {/* Ambient Blobs */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-luxury-copper/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-terracotta/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            {/* Giant Watermark Text */}
            <motion.div
                style={{ x: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity: 0.03 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif leading-none whitespace-nowrap pointer-events-none font-bold text-luxury-copper"
            >
                ABOUT
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* 1. SECTION HEADER */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block border border-luxury-copper/50 rounded-full px-12 py-3 backdrop-blur-md bg-luxury-copper/10 text-luxury-copper font-sans font-bold tracking-[0.4em] uppercase text-xs mb-8 shadow-[0_0_30px_rgba(156,90,60,0.2)]">
                            About Us
                        </span>
                        <h2 className="text-5xl md:text-8xl font-script text-white leading-[1.1] tracking-tight">
                            Timeless <br />
                            <span className="italic font-light text-luxury-copper">Cinematic Masterpieces</span>
                        </h2>
                    </motion.div>
                </div>

                {/* 2. MAIN SPLIT CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* Left: Sticky Image Container */}
                    <div className="lg:col-span-6 relative">
                        <motion.div
                            style={{ y: yParallax, rotate: rotateParallax }}
                            className="relative z-10 aspect-[4/5] w-full max-w-md mx-auto"
                        >

                            <div className="relative h-full w-full overflow-hidden rounded-sm shadow-2xl bg-earth-900 flex items-center justify-center">
                                {/* Using a placeholder as the photo is missing, but adding the correct alt tag */}
                                <img
                                    src="/gallery/ceres-hans.jpg"
                                    alt="Ceres & Hans Photo"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Content & List */}
                    <div className="lg:col-span-6 space-y-12">

                        {/* Narrative Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="prose prose-invert prose-lg"
                        >
                            <p className="text-white text-xl md:text-2xl font-light leading-relaxed mb-8">
                                At First Light Studios, we turn love stories into <span className="text-luxury-copper italic">timeless cinematic masterpieces</span>.
                            </p>
                            <p className="text-white/70 font-light leading-relaxed mb-6 text-lg">
                                Led by <span className="text-white font-medium">Jed Regala</span>, we capture weddings with intention, artistry, and heart — preserving every glance, vow, and celebration in a way that feels elegant, authentic, and unforgettable.
                            </p>
                            <p className="text-white/70 font-light leading-relaxed text-lg">
                                Because your story deserves nothing less than <span className="text-luxury-copper italic">extraordinary</span>.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
