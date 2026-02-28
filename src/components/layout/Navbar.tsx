import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full flex items-center justify-between px-8 py-6 transition-all duration-700
                ${(scrolled || isOpen)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-0 opacity-100 md:opacity-0 md:-translate-y-4'
                } ${isOpen ? 'bg-earth-950 z-[999]' : 'bg-transparent z-50'}`}
        >
            {/* Left side: Logo & Brand Name */}
            <div className="flex items-center gap-6">
                <img
                    src="/logo.png"
                    alt="First Light Studios Logo"
                    className="h-16 w-auto object-contain brightness-0 invert"
                />
                <div className="hidden sm:block h-10 w-px bg-white/20" />
                <span className="hidden sm:block font-serif text-xs md:text-sm tracking-[0.4em] uppercase text-white font-medium">
                    Weddings by First Light Studios
                </span>
            </div>

            {/* Desktop Links: Simple text only */}
            <div className="hidden md:flex items-center gap-12 font-sans text-[10px] font-bold tracking-[0.4em] uppercase text-white/90">
                {[
                    { name: 'Our Work', href: '#portfolio' },
                    { name: 'About Us', href: '#signature' },
                    { name: 'Get in touch', href: '#contact' },
                ].map((item, idx) => (
                    <div key={item.name} className="flex items-center gap-6">
                        <a
                            href={item.href}
                            className="hover:text-gold transition-colors duration-300"
                        >
                            {item.name}
                        </a>
                        {idx < 2 && <span className="text-white/20 font-light">|</span>}
                    </div>
                ))}
            </div>

            {/* Mobile Menu Toggle */}
            <div className={`md:hidden z-[110] transition-opacity duration-300 ${!scrolled && !isOpen ? 'opacity-100' : 'opacity-100'}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="focus:outline-none text-white p-2"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-earth-950 z-[998] md:hidden"
                    >
                        {/* Background Texture for Menu */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

                        <div className="flex flex-col h-full px-8 pt-32 pb-12 overflow-y-auto">
                            <div className="flex flex-col gap-10">
                                {[
                                    { name: 'Our Work', href: '#portfolio' },
                                    { name: 'About Us', href: '#signature' },
                                    { name: 'Get in touch', href: '#contact' },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.1 }}
                                    >
                                        <a
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="font-serif text-5xl text-white hover:text-gold transition-colors inline-block"
                                        >
                                            {item.name}
                                        </a>
                                        <div className="h-[1px] w-12 bg-gold/30 mt-4" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social Links & Info at the bottom */}
                            <div className="mt-auto pt-16 flex flex-col gap-6">
                                <div className="flex gap-8">
                                    <a href="https://www.instagram.com/weddingsbyfirstlightstudiosmnl" target="_blank" className="text-white/60 hover:text-gold transition-colors text-sm uppercase tracking-[0.2em] font-bold">Instagram</a>
                                    <a href="https://www.facebook.com/weddingsbyfirstlightstudiosmanila/" target="_blank" className="text-white/60 hover:text-gold transition-colors text-sm uppercase tracking-[0.2em] font-bold">Facebook</a>
                                </div>
                                <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-sans">
                                    Weddings by First Light Studios
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
