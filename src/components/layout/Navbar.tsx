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

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            {/* ── Top bar: Logo + hamburger ── */}
            <div className={`fixed top-0 left-0 w-full z-[200] flex items-center justify-between px-8 py-6 transition-all duration-500
                ${isOpen ? 'bg-[#0c0504]' : 'bg-transparent'}
                ${!scrolled && !isOpen ? 'md:opacity-0 md:-translate-y-4' : 'md:opacity-100 md:translate-y-0'}
            `}>
                {/* Logo */}
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

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-12 font-sans text-[10px] font-bold tracking-[0.4em] uppercase text-white/90">
                    {[
                        { name: 'Our Work', href: '#portfolio' },
                        { name: 'About Us', href: '#signature' },
                        { name: 'Get in touch', href: '#contact' },
                    ].map((item, idx) => (
                        <div key={item.name} className="flex items-center gap-6">
                            <a href={item.href} className="hover:text-gold transition-colors duration-300">{item.name}</a>
                            {idx < 2 && <span className="text-white/20 font-light">|</span>}
                        </div>
                    ))}
                </div>

                {/* Hamburger toggle – always on top */}
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    className="md:hidden focus:outline-none text-white p-2"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* ── Full-screen mobile overlay ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 bg-[#0c0504] z-[190] md:hidden flex flex-col overflow-y-auto"
                    >
                        {/* Subtle texture */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                        {/* Links */}
                        <div className="flex flex-col px-10 pt-40 pb-20 min-h-full relative z-10">
                            <div className="flex flex-col gap-14">
                                {[
                                    { name: 'Our Work', href: '#portfolio' },
                                    { name: 'About Us', href: '#signature' },
                                    { name: 'Get in touch', href: '#contact' },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + idx * 0.07 }}
                                    >
                                        <a
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="font-serif text-5xl text-white hover:text-gold transition-colors block text-left"
                                        >
                                            {item.name}
                                        </a>
                                        <div className="h-[1px] w-16 bg-gold/20 mt-5" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-auto pt-24 flex flex-col gap-6">
                                <div className="flex gap-8">
                                    <a href="https://www.instagram.com/weddingsbyfirstlightstudiosmnl" target="_blank" rel="noreferrer"
                                        className="text-white/40 hover:text-gold transition-colors text-xs uppercase tracking-[0.3em] font-bold">
                                        Instagram
                                    </a>
                                    <a href="https://www.facebook.com/weddingsbyfirstlightstudiosmanila/" target="_blank" rel="noreferrer"
                                        className="text-white/40 hover:text-gold transition-colors text-xs uppercase tracking-[0.3em] font-bold">
                                        Facebook
                                    </a>
                                </div>
                                <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-sans leading-relaxed">
                                    First Light Studios Manila<br />
                                    © 2024 Cinematic Masterpieces
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
