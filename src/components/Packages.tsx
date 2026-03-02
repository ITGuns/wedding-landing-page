
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const packages = [
    {
        title: "Photography",
        price: "₱95,000",
        subtitle: "Metro Manila Rate",
        description: "Capturing every cherished moment as a timeless memory through our unique cinematic lens.",
        features: [
            "7-Person Crew (Director, 2 Photographers, SDE Editor, 2 Assistants, Driver)",
            "10-12 Hours of Wedding Day Coverage",
            "Same-Day Edit (SDE) Photo Slideshow (3-5 mins)",
            "Drone Coverage (if applicable)",
            "Creative Consultation and Planning",
            "1 Revision Allowed"
        ],
        highlight: false
    },
    {
        title: "Videography",
        price: "₱130,000",
        subtitle: "Metro Manila Rate",
        description: "Cinematic masterpieces ensuring that your love story stands the test of time.",
        features: [
            "7-Person Crew (Director, 2 Videographers, SDE Editor, 2 Assistants, Driver)",
            "10-12 Hours of Wedding Day Coverage",
            "Same-Day Edit (SDE) Wedding Film (3-5 mins)",
            "Drone Coverage (if applicable)",
            "Creative Consultation and Planning",
            "1 Revision Allowed"
        ],
        highlight: true
    },
    {
        title: "Signature Package",
        price: "₱260,000",
        subtitle: "The Complete Experience",
        description: "The pinnacle of wedding filmmaking. A boundless creative journey where stills and film unite.",
        features: [
            "Premiere Creative Direction and Concept",
            "Pre-Nup Shoot (4-6 Hours)",
            "Complete Photo and Video Coverage",
            "Large Wedding Crew (Director, 3 Videographers, 2 Photographers, 2 Editors)",
            "Extended SDE Wedding Film (6-8 mins)",
            "100-150 Enhanced Photos",
            "10-12 Hours Wedding Day Coverage",
        ],
        highlight: false,
        badge: "Most Premium"
    }
];

const addOns = [
    { item: "Raw Files (HDD Provided by Client)", price: "₱10,000" },
    { item: "OOTF Greater Manila Area (per day)", price: "₱10,000" },
    { item: "OOTF Outside Greater Manila Area (per day)", price: "₱20,000" },
    { item: "Wedding Highlights (10-15 mins)", price: "₱20,000" },
    { item: "Full Wedding Film (30-45 mins)", price: "₱30,000" },
];

export default function Packages() {
    return (
        <section className="py-24 px-4 md:px-8 bg-transparent text-white overflow-hidden relative" id="packages">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-terracotta/10 rounded-full blur-[100px] opacity-60" />
                <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px] opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-terracotta font-bold tracking-widest uppercase text-sm mb-4 block"
                    >
                        Invest in Memories
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-white mb-6"
                    >
                        2025 Coverage Rates
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Inclusive of VAT. Rates are subject to change without prior notice.
                        <br className="hidden md:block" />
                        Note: All rates are exclusive of applicable taxes.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className={`relative p-8 rounded-sm border transition-all duration-500 hover:shadow-2xl backdrop-blur-sm 
                ${pkg.highlight
                                    ? 'bg-white/10 text-cream border-gold/50 transform md:-translate-y-4 shadow-xl bg-noise'
                                    : 'bg-white/5 text-white border-white/10 hover:border-gold/30'
                                }`}
                        >
                            {pkg.badge && (
                                <div className="absolute top-4 right-4 bg-gold text-earth-900 text-xs font-bold px-3 py-1 uppercase tracking-wider flex items-center gap-1 shadow-lg">
                                    <Star size={10} fill="currentColor" /> {pkg.badge}
                                </div>
                            )}

                            <h3 className={`text-2xl font-serif mb-2 text-white`}>{pkg.title}</h3>
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className={`text-4xl font-serif font-bold ${pkg.highlight ? 'text-gold' : 'text-white'}`}>{pkg.price}</span>
                                <span className={`text-sm ${pkg.highlight ? 'text-white/60' : 'text-white/40'}`}>net</span>
                            </div>
                            <p className={`text-xs uppercase tracking-wider font-medium mb-6 ${pkg.highlight ? 'text-terracotta' : 'text-gold'}`}>{pkg.subtitle}</p>

                            <p className={`text-sm mb-8 leading-relaxed ${pkg.highlight ? 'text-white/70' : 'text-white/60'}`}>
                                {pkg.description}
                            </p>

                            <div className={`h-[1px] w-full mb-8 ${pkg.highlight ? 'bg-white/10' : 'bg-white/10'}`} />

                            <ul className="space-y-4 mb-10">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm">
                                        <Check size={18} className={`shrink-0 mt-0.5 ${pkg.highlight ? 'text-gold' : 'text-gold/60'}`} />
                                        <span className={pkg.highlight ? 'text-white/80' : 'text-white/80'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-full font-bold transition-all duration-300 uppercase text-sm tracking-widest
                ${pkg.highlight
                                    ? 'bg-gold text-earth-900 hover:bg-white'
                                    : 'bg-white/10 text-white border border-white/20 hover:bg-white hover:text-earth-900'
                                }`}
                            >
                                Book This Package
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Add-ons Section */}
                <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-lg border border-white/10">
                    <h3 className="text-3xl font-serif text-white mb-8 text-center">Optional Add-ons</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {addOns.map((addon, i) => (
                            <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0 md:odd:last:border-b-0">
                                <span className="text-white/80 font-medium">{addon.item}</span>
                                <span className="text-gold font-serif font-bold">{addon.price}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-white/40 text-sm italic">
                            * Out of Country Rates available upon request. Email firstlightstudiosmanila@gmail.com
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
