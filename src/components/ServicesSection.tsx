import { motion } from 'framer-motion';
import { Camera, Video, Sparkles } from 'lucide-react';

const services = [
    {
        id: 1,
        title: "Photography Services",
        description: "Capturing timeless stills that preserve the essence of your love story with artistry and precision.",
        icon: Camera
    },
    {
        id: 2,
        title: "Videography Services",
        description: "Cinematic filmmaking that breathes life into your memories, creating a moving masterpiece of your day.",
        icon: Video
    },
    {
        id: 3,
        title: "First Light Studios Signature",
        description: "Our premier all-inclusive experience where photography and videography unite in perfect harmony.",
        icon: Sparkles
    }
];

export default function ServicesSection() {
    return (
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
                            className="group relative p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm hover:border-gold/40 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover Reveal Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="mb-8 p-4 rounded-full border border-white/10 group-hover:border-gold/30 transition-colors duration-500">
                                    <service.icon size={32} strokeWidth={1} className="text-gold" />
                                </div>
                                <h3 className="text-2xl font-display uppercase tracking-[0.2em] text-white mb-0 group-hover:text-gold transition-colors duration-300">
                                    {service.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
