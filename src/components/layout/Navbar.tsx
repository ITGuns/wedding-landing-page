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
            className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-8 transition-all duration-700
                ${scrolled
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
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
            <div className="md:hidden z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="focus:outline-none text-white"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-earth-950 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {[
                            { name: 'Our Work', href: '#portfolio' },
                            { name: 'About Us', href: '#signature' },
                            { name: 'Get in touch', href: '#contact' },
                        ].map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="font-serif text-3xl text-white hover:text-luxury-copper transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
