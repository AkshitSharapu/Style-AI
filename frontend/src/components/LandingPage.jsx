import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Zap as Bolt, Brain as Psychology, Ruler as Straighten, Search, Wand2 as MagicWand, Truck, ArrowRight, Share2, Globe, TrendingUp, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';

const LandingPage = ({ onSelectGender, onHomeClick }) => {
    const { toggleTheme, user, logout } = useTheme();
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authTab, setAuthTab] = useState('signup');

    const handleSelect = (gender) => {
        console.log("Navigating to:", gender);
        toggleTheme(gender);
        onSelectGender(gender);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        alert("✨ Welcome to the Style Laboratory! You'll receive your first AI report shortly.");
        e.target.reset();
    };

    const openAuth = (tab) => {
        setAuthTab(tab);
        setIsAuthOpen(true);
    };

    return (
        <div className="bg-background-dark font-display text-white selection:bg-primary selection:text-white min-h-screen">
            {/* Top Navigation Bar */}
            <header className="fixed top-0 w-full z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            onHomeClick?.();
                        }}
                        className="flex items-center gap-2 group cursor-pointer"
                    >
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_var(--color-primary-glow)]">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h2 className="text-white text-xl font-extrabold tracking-tighter uppercase">Style <span className="text-primary">AI</span></h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <button onClick={() => handleSelect('Male')} className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors uppercase">Men</button>
                        <button onClick={() => handleSelect('Female')} className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors uppercase">Women</button>
                        <a className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors uppercase" href="#trends">Trends</a>
                        <a className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors uppercase" href="#how-it-works">How it Works</a>
                    </nav>
                    <div className="flex items-center gap-6">
                        {user ? (
                            <div className="flex items-center gap-4 group/profile relative">
                                <div className="text-right hidden sm:block">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">Logged In</p>
                                    <p className="text-sm font-bold uppercase tracking-wide">{user.name}</p>
                                </div>
                                <div className="size-10 bg-primary rounded-full flex items-center justify-center text-sm font-black text-white shadow-[0_0_15px_var(--color-primary-glow)] border border-white/20">
                                    {user.initials}
                                </div>
                                <button
                                    onClick={logout}
                                    className="absolute -bottom-12 right-0 bg-background-dark/95 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-all opacity-0 group-hover/profile:opacity-100 flex items-center gap-2 shadow-2xl backdrop-blur-md z-[60]"
                                >
                                    <LogOut className="w-3 h-3" />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => openAuth('login')}
                                    className="text-white/70 text-sm font-bold hover:text-white transition-colors uppercase tracking-widest"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => openAuth('signup')}
                                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl text-xs font-black tracking-widest transition-all shadow-lg shadow-[0_0_15px_var(--color-primary-glow)] uppercase"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="pt-16">
                {/* Split-Screen Hero Section */}
                <section className="relative h-[90vh] min-h-[700px] w-full flex overflow-hidden">
                    <div
                        onClick={() => handleSelect('Male')}
                        className="relative w-1/2 h-full group cursor-pointer overflow-hidden border-r border-white/5"
                    >
                        <div className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZZG_bM340BSDkchdPJ8TMEmtRQEy94uiNGhf6ErZMG8jE6Fl7ao_nAImt_pBvXF94a0C9kU7nJ96w_axG8nYxbSnqGZNWremAgqzcsd4WM4B70BJ06E0GJBTK_J3cJLqYeeDuzFzGgYv1xKC5yHZZ8i-xGeOkWBOlXZAAaARaqNpiJyTRON20vsVlEiD0QSX04L_OEyoYyAJm8CtxY03fPQ4BUFmMurawv_s_518T2ILlq_CEC-KIiJNIyxybdbHLqcqCr-jELNY')" }}></div>
                        <div className="absolute inset-0 hero-split-overlay"></div>
                        <div className="absolute inset-0 flex items-end p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="text-white/40 text-8xl font-black uppercase tracking-tighter">Male</span>
                        </div>
                    </div>

                    <div
                        onClick={() => handleSelect('Female')}
                        className="relative w-1/2 h-full group cursor-pointer overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTD3UOFhS7Fri7x_9mxIAhLgaQfWglU46-a_Vf5a9BsqVf-e--sGzV_WqNs9VFyzsJgQFbp_DVtXZRrBy16cEVOQRe7OB_SYdJ2zEj9qxnSl8gKBEm1KCAII3BbBXbTRDFVgdo_LSHFxDCJMQZ7x_Eu5GuAyxN2zfpMRehTJuRQIwN4tn7v54b9mvu1FXez9UlDXwvIS5MMBakncFMJQw6ACi6Z7Tn0SPFtr8cU7Td7-abeWbS0Dhi9_vs3wVOJmRhjcGRwxaAQJc')" }}></div>
                        <div className="absolute inset-0 hero-split-overlay"></div>
                        <div className="absolute inset-0 flex items-end p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="text-white/40 text-8xl font-black uppercase tracking-tighter">Female</span>
                        </div>
                    </div>

                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-center">
                        <div className="max-w-2xl px-6 pointer-events-auto">
                            <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                                <Bolt className="text-primary w-4 h-4" />
                                <span className="text-[10px] uppercase font-extrabold tracking-[0.2em]">Next-Gen Fashion Analysis</span>
                            </div>
                            <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tighter mb-6 uppercase">
                                Your Personal <br /><span className="text-primary italic">AI Stylist</span>
                            </h1>
                            <p className="text-white/80 text-lg md:text-xl font-normal leading-relaxed mb-10 max-w-lg mx-auto">
                                Discover outfits tailored to your unique taste, powered by advanced fashion intelligence.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={() => handleSelect('Male')}
                                    className="w-full sm:w-auto min-w-[180px] bg-white text-background-dark hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest transition-all"
                                >
                                    Men
                                </button>
                                <button
                                    onClick={() => handleSelect('Female')}
                                    className="w-full sm:w-auto min-w-[180px] bg-background-dark/50 backdrop-blur-lg border border-white/20 hover:border-primary text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest transition-all"
                                >
                                    Women
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="bg-background-dark py-12 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <p className="text-center text-white/30 text-xs font-bold uppercase tracking-[0.3em] mb-8">As Featured In</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale contrast-125">
                            <span className="text-2xl font-black tracking-tighter uppercase italic">Vogue</span>
                            <span className="text-2xl font-serif font-bold tracking-widest uppercase">GQ</span>
                            <span className="text-2xl font-extrabold tracking-tight uppercase">Hypebeast</span>
                            <span className="text-2xl font-bold tracking-tighter uppercase italic underline decoration-primary">Elle</span>
                            <span className="text-2xl font-black tracking-tight uppercase">Highsnobiety</span>
                        </div>
                    </div>
                </div>

                <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
                        <div>
                            <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tighter uppercase leading-tight mb-6">
                                The Intelligence Behind <br /><span className="text-primary">Every Stitch.</span>
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed mb-8">
                                Our proprietary algorithms analyze millions of data points from global runway trends, street style, and social media to curate pieces that don't just fit your body, but your lifestyle.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
                                    <Psychology className="text-primary w-8 h-8" />
                                    <h3 className="font-bold uppercase tracking-wide">Deep Analysis</h3>
                                    <p className="text-sm text-white/50">Scanning 5,000+ brands daily for real-time trend updates.</p>
                                </div>
                                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
                                    <Straighten className="text-primary w-8 h-8" />
                                    <h3 className="font-bold uppercase tracking-wide">Perfect Fit</h3>
                                    <p className="text-sm text-white/50">AI-calculated sizing across different international brands.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-2xl overflow-hidden border border-white/10">
                            <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApS7cSBSJiXfo95yVRmog8Pful8Onr0P6bWDsrbb45ssVymh_tmZ2yBZ0HyoBPIYAv_oap4T-62zF_IitCsxobQq_dDee3usqZ9e1K0w-Xv0DvfmXHyzervAXFv5zp6p--n0LzU2W8aKONwR6_b7wS1Da9Pe94swH7uA9H75tGkZZhg2IOZXWvIkjb5vnnO5-NgyvWAhR9s2ZJ3hRiwOuDz6z2nHntOEWUii5Z4XDH-WgXL7HQk74xrG3lqcU14IJXdQQ8s4h6hsc')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8 p-6 bg-background-dark/80 backdrop-blur-md rounded-xl border border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <TrendingUp className="text-primary w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-primary font-black uppercase">Live Scanning</p>
                                        <p className="text-sm font-medium">Matching your wardrobe preferences...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-5 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all">
                            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Search className="text-primary w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Analyze</h4>
                                <p className="text-white/50 leading-relaxed">We scan global retail markets to find pieces that align with your specific visual aesthetic.</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all">
                            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <MagicWand className="text-primary w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Curate</h4>
                                <p className="text-white/50 leading-relaxed">Our AI simulates thousands of outfit combinations to select the ones that look best on your profile.</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all">
                            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Truck className="text-primary w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Deliver</h4>
                                <p className="text-white/50 leading-relaxed">Receive a personalized lookbook directly to your device, ready to shop with one single click.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="trends" className="py-24 bg-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-extrabold uppercase tracking-tighter mb-2 text-white">AI-Recommended Outfits</h2>
                                <p className="text-white/40">Real-time suggestions based on current fashion pulse.</p>
                            </div>
                            <button className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2 hover:gap-4 transition-all">
                                View All Trends <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: 'Streetwear', name: 'Monochrome Minimalist', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop' },
                                { label: 'Smart Casual', name: 'The Modern Professional', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop' },
                                { label: 'Evening', name: 'The Gala Selection', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&h=600&fit=crop' },
                                { label: 'Avant-Garde', name: 'Structured Volume', img: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&h=600&fit=crop' }
                            ].map((item, i) => (
                                <div key={i} className="space-y-4 group cursor-pointer">
                                    <div className="aspect-[3/4] rounded-2xl overflow-hidden relative border border-white/10">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${item.img}')` }}></div>
                                        <div className="absolute top-4 right-4 bg-background-dark/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">{item.label}</div>
                                    </div>
                                    <div className="px-2">
                                        <p className="font-bold text-sm uppercase tracking-tight text-white">{item.name}</p>
                                        <p className="text-white/40 text-xs">Recommended for you</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="newsletter" className="py-24 px-6">
                    <div className="max-w-4xl mx-auto bg-primary rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_0_80px_var(--color-primary-glow)]">
                        <div className="absolute top-0 right-0 size-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                        <div className="absolute bottom-0 left-0 size-96 bg-black/20 rounded-full blur-[100px] -ml-48 -mb-48"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none text-white drop-shadow-2xl">
                                READY FOR YOUR NEW WARDROBE?
                            </h2>
                            <p className="text-white/90 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
                                Sign up for our early access beta and receive your first AI-stylized lookbook for free.
                            </p>

                            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
                                <input
                                    required
                                    className="flex-1 bg-white/20 border border-white/30 rounded-2xl px-8 py-5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white transition-all text-lg"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                                <button className="bg-white text-primary font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform uppercase tracking-[.2em] text-sm shadow-2xl">
                                    SUBSCRIBE
                                </button>
                            </form>

                            <div className="flex flex-col items-center gap-4">
                                <p className="text-white font-black uppercase tracking-[.4em] text-[10px]">
                                    JOIN 50,000+ FASHION ENTHUSIASTS
                                </p>
                                {!user && (
                                    <button
                                        onClick={() => openAuth('login')}
                                        className="text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-widest underline decoration-white/20 transition-all cursor-pointer"
                                    >
                                        ALREADY A MEMBER? LOGIN
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-background-dark border-t border-white/10 py-20 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <h2 className="text-white text-xl font-black tracking-tighter uppercase">Style <span className="text-primary italic">AI</span></h2>
                        </div>
                        <p className="text-white/40 text-base max-w-sm mb-10 leading-relaxed font-medium">
                            Defining the future of fashion through machine learning and human artistry. Your personal stylist, reimagined for the digital age.
                        </p>
                        <div className="flex gap-6">
                            <a className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary transition-all text-white/50 hover:text-white hover:scale-110" href="#">
                                <Share2 className="w-5 h-5" />
                            </a>
                            <a className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary transition-all text-white/50 hover:text-white hover:scale-110" href="#">
                                <Globe className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase tracking-[.3em] text-[10px] mb-8">Navigation</h3>
                        <ul className="space-y-4 text-sm font-bold uppercase tracking-wide text-white/40">
                            <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Sustainability</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase tracking-[.3em] text-[10px] mb-8">Legal</h3>
                        <ul className="space-y-4 text-sm font-bold uppercase tracking-wide text-white/40">
                            <li><a className="hover:text-primary transition-colors" href="#">Privacy</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Terms</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Cookies</a></li>
                        </ul>
                    </div>
                </div>
            </footer>

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                initialTab={authTab}
            />
        </div>
    );
};

export default LandingPage;
