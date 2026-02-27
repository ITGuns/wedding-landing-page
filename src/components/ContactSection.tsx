import { motion } from 'framer-motion';
import { Send, Instagram, Facebook, Mail } from 'lucide-react';

const ContactSection = () => {
    return (
        <section id="contact" className="py-24 px-8 bg-transparent text-cream relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
                {/* Text Content */}
                <div className="w-full lg:w-1/2">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-terracotta font-bold tracking-widest uppercase text-sm mb-4 block"
                    >
                        Get in Touch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-script text-white mb-8 leading-tight"
                    >
                        Let's tell your story <br /><span className="text-gold italic">together.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white/70 font-light leading-relaxed mb-12 max-w-lg"
                    >
                        We limit our weddings per year to ensure the highest quality of service.
                        Inquire today to check availability for your date.
                    </motion.p>

                    <div className="flex flex-col gap-6 text-white/60">
                        <a href="mailto:firstlightstudiosmanila@gmail.com" className="flex items-center gap-4 hover:text-gold transition-colors group cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors">
                                <Mail size={20} />
                            </div>
                            <span className="text-lg">firstlightstudiosmanila@gmail.com</span>
                        </a>
                        <a href="https://www.instagram.com/weddingsbyfirstlightstudiosmnl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-gold transition-colors group cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors">
                                <Instagram size={20} />
                            </div>
                            <span className="text-lg">@weddingsbyfirstlightstudiosmnl</span>
                        </a>
                        <a href="https://www.facebook.com/weddingsbyfirstlightstudiosmanila/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-gold transition-colors group cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors">
                                <Facebook size={20} />
                            </div>
                            <span className="text-lg">Weddings by First Light Studios</span>
                        </a>
                        <div className="flex items-center gap-4 hover:text-gold transition-colors group cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors">
                                <Send size={20} className="rotate-45" />
                            </div>
                            <span className="text-lg">+639175771313</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="w-full lg:w-1/2">
                    <motion.form
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 p-8 md:p-10 rounded-sm border border-white/10 backdrop-blur-sm"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gold font-bold ml-2">Name</label>
                                <input type="text" placeholder="Your Name" className="bg-earth-950/30 border border-white/10 p-4 rounded-sm text-white focus:outline-none focus:border-gold focus:bg-earth-950/50 transition-all placeholder:text-white/20" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gold font-bold ml-2">Email</label>
                                <input type="email" placeholder="email@address.com" className="bg-earth-950/30 border border-white/10 p-4 rounded-sm text-white focus:outline-none focus:border-gold focus:bg-earth-950/50 transition-all placeholder:text-white/20" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gold font-bold ml-2">Wedding Date</label>
                                <input type="date" className="bg-earth-950/30 border border-white/10 p-4 rounded-sm text-white focus:outline-none focus:border-gold focus:bg-earth-950/50 transition-all text-white/80" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gold font-bold ml-2">Venue</label>
                                <input type="text" placeholder="Ceremony / Reception" className="bg-earth-950/30 border border-white/10 p-4 rounded-sm text-white focus:outline-none focus:border-gold focus:bg-earth-950/50 transition-all placeholder:text-white/20" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mb-8">
                            <label className="text-xs uppercase tracking-widest text-gold font-bold ml-2">Message</label>
                            <textarea rows={4} placeholder="Tell us about your dream wedding..." className="bg-earth-950/30 border border-white/10 p-4 rounded-sm text-white focus:outline-none focus:border-gold focus:bg-earth-950/50 transition-all placeholder:text-white/20 resize-none"></textarea>
                        </div>

                        <button className="w-full bg-gold text-earth-900 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                            Send Inquiry
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </motion.form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 w-full flex flex-col md:flex-row justify-between text-white/40 text-sm">
                <p>&copy; 2026 First Light Studios. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
