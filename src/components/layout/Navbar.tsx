import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* ── Top bar: Logo + hamburger ── */}
            <div className={`fixed top-0 left-0 w-full z-[200] flex items-center justify-between px-4 py-3 md:px-10 md:py-6 transition-all duration-500 bg-transparent
                ${!scrolled && !isOpen ? 'md:opacity-0 md:-translate-y-4' : 'md:opacity-100 md:translate-y-0'}
            `}>
                {/* Logo & Brand Text */}
                <div className="flex items-center gap-4">
                    <img
                        src="/logo.png"
                        alt="First Light Studios Logo"
                        className="h-14 w-auto md:h-20 object-contain"
                    />
                    <div className="hidden sm:block h-8 w-px bg-white/20" />
                    <span className="hidden sm:block font-serif text-xs md:text-sm tracking-[0.4em] uppercase text-white font-medium">
                        Weddings by First Light Studios
                    </span>
                </div>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-12 font-sans text-[10px] font-bold tracking-[0.4em] uppercase text-white/90">
                    {[
                        { name: 'Our Work', href: '#portfolio' },
                        { name: 'Our Services', href: '#services' },
                        { name: 'About Us', href: '#signature' },
                        { name: 'Get in touch', href: '#contact' },
                    ].map((item, idx, arr) => (
                        <div key={item.name} className="flex items-center gap-6">
                            <a href={item.href} className="hover:text-gold transition-colors duration-300">{item.name}</a>
                            {idx < arr.length - 1 && <span className="text-white/20 font-light">|</span>}
                        </div>
                    ))}
                </div>

                {/* Hamburger toggle */}
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    className="md:hidden focus:outline-none text-white p-2"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* ── Compact dropdown overlay for mobile ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="fixed top-[72px] left-0 w-full z-[190] md:hidden bg-[#1a0a05]/95 backdrop-blur-md"
                    >
                        {/* Links */}
                        <div className="flex flex-col px-4 pt-6 pb-8">
                            {[
                                { name: 'Our Work', href: '#portfolio' },
                                { name: 'Our Services', href: '#services' },
                                { name: 'About Us', href: '#signature' },
                                { name: 'Get in touch', href: '#contact' },
                            ].map((item, idx, arr) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.06 }}
                                >
                                    <a
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="font-serif text-3xl text-white hover:text-gold transition-colors block text-left py-4"
                                    >
                                        {item.name}
                                    </a>
                                    {idx < arr.length - 1 && <div className="h-[1px] w-full bg-white/5" />}
                                </motion.div>
                            ))}

                            {/* Footer row */}
                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex gap-6">
                                    <a href="https://www.instagram.com/weddingsbyfirstlightstudiosmnl" target="_blank" rel="noreferrer"
                                        className="text-white/30 hover:text-gold transition-colors text-[10px] uppercase tracking-[0.25em] font-bold">
                                        Instagram
                                    </a>
                                    <a href="https://www.facebook.com/weddingsbyfirstlightstudiosmanila/" target="_blank" rel="noreferrer"
                                        className="text-white/30 hover:text-gold transition-colors text-[10px] uppercase tracking-[0.25em] font-bold">
                                        Facebook
                                    </a>
                                </div>
                                <p className="text-white/15 text-[9px] uppercase tracking-[0.3em] font-sans">
                                    © 2026 First Light Studios
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
