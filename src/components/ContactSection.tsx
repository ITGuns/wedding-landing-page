import { motion } from 'framer-motion';
import { Send, Instagram, Facebook, Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formRef.current) return;

        setStatus('sending');
        setStatusMessage('Crafting your message...');

        try {
            // NOTE FOR THE OWNER: 
            // 1. Create a free account at emailjs.com
            // 2. Link your email (Gmail, etc.) under "Email Services"
            // 3. Create a template under "Email Templates"
            // 4. Replace placeholders below with your actual IDs:

            const SERVICE_ID = 'service_o6eykr9';
            const TEMPLATE_ID = 'template_39xh9q6';
            const PUBLIC_KEY = 'xUIXBoU4P1VNFhibe';

            const result = await emailjs.sendForm(
                SERVICE_ID,
                TEMPLATE_ID,
                formRef.current,
                PUBLIC_KEY
            );

            if (result.text === 'OK') {
                setStatus('success');
                setStatusMessage('Thank you! Your story has been sent to our studio. We will touch base shortly.');
                formRef.current.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setStatusMessage('Something went wrong. Please try again or email us directly.');
        }
    };

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
                        className="text-4xl sm:text-5xl md:text-7xl font-script text-white mb-8 leading-tight"
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
                        ref={formRef}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 p-8 md:p-10 rounded-sm border border-white/10 backdrop-blur-sm relative overflow-hidden"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gold font-bold ml-2">Name</label>
                                <input name="name" type="text" placeholder="Your Name" required className="bg-earth-950/30 border border-white/10 p-4 rounded-sm text-white focus:outline-none focus:border-gold focus:bg-earth-950/50 transition-all placeholder:text-white/20" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gold font-bold ml-2">Email</label>
                                <input name="email" type="email" placeholder="email@address.com" required className="bg-earth-950/30 border border-white/10 p-4 rounded-sm text-white focus:outline-none focus:border-gold focus:bg-earth-950/50 transition-all placeholder:text-white/20" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gold font-bold ml-2">Wedding Date</label>
                                <input name="wedding_date" type="date" required className="bg-earth-950/30 border border-white/10 p-4 rounded-sm text-white focus:outline-none focus:border-gold focus:bg-earth-950/50 transition-all text-white/80" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-gold font-bold ml-2">Venue</label>
                                <input name="venue" type="text" placeholder="Ceremony / Reception" required className="bg-earth-950/30 border border-white/10 p-4 rounded-sm text-white focus:outline-none focus:border-gold focus:bg-earth-950/50 transition-all placeholder:text-white/20" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mb-8">
                            <label className="text-xs uppercase tracking-widest text-gold font-bold ml-2">Message</label>
                            <textarea name="message" rows={4} placeholder="Tell us about your dream wedding..." required className="bg-earth-950/30 border border-white/10 p-4 rounded-sm text-white focus:outline-none focus:border-gold focus:bg-earth-950/50 transition-all placeholder:text-white/20 resize-none"></textarea>
                        </div>

                        <button
                            disabled={status === 'sending'}
                            className={`w-full py-4 rounded-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group
                                ${status === 'sending'
                                    ? 'bg-gold/50 cursor-not-allowed text-earth-900/50'
                                    : 'bg-gold text-earth-900 hover:bg-white hover:scale-[1.02] active:scale-[0.98]'}`}
                        >
                            {status === 'sending' ? (
                                <>
                                    Sending...
                                    <Loader2 size={18} className="animate-spin" />
                                </>
                            ) : (
                                <>
                                    Send Inquiry
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>

                        {/* Status Feedback */}
                        {status !== 'idle' && status !== 'sending' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mt-6 p-4 rounded-sm flex items-center gap-3 border ${status === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                                    }`}
                            >
                                {status === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                                <p className="text-sm font-medium">{statusMessage}</p>
                            </motion.div>
                        )}
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
