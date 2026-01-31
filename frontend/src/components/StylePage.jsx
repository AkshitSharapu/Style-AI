import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Zap as Bolt, Brain as Psychology, Ruler as Straighten, Search, Wand2 as MagicWand, Truck, ArrowRight, Share2, Globe, TrendingUp, LogOut, Plus, ArrowLeft, Mail } from 'lucide-react';
import RecommendationModal from './RecommendationModal';

const StylePage = ({ gender, onBack }) => {
    const { theme, user, logout } = useTheme();
    const [trending, setTrending] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authTab, setAuthTab] = useState('login');

    console.log("StylePage mounting for gender:", gender);
    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/trending/${gender}`);
                setTrending(response.data);
            } catch (error) {
                console.error("Error fetching trending:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
        window.scrollTo(0, 0);
    }, [gender]);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        alert("✨ Your personalized style report is being generated.");
        e.target.reset();
    };

    const openAuth = (tab) => {
        setAuthTab(tab);
        setIsAuthOpen(true);
    };

    const heroImages = {
        Male: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZZG_bM340BSDkchdPJ8TMEmtRQEy94uiNGhf6ErZMG8jE6Fl7ao_nAImt_pBvXF94a0C9kU7nJ96w_axG8nYxbSnqGZNWremAgqzcsd4WM4B70BJ06E0GJBTK_J3cJLqYeeDuzFzGgYv1xKC5yHZZ8i-xGeOkWBOlXZAAaARaqNpiJyTRON20vsVlEiD0QSX04L_OEyoYyAJm8CtxY03fPQ4BUFmMurawv_s_518T2ILlq_CEC-KIiJNIyxybdbHLqcqCr-jELNY',
        Female: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTD3UOFhS7Fri7x_9mxIAhLgaQfWglU46-a_Vf5a9BsqVf-e--sGzV_WqNs9VFyzsJgQFbp_DVtXZRrBy16cEVOQRe7OB_SYdJ2zEj9qxnSl8gKBEm1KCAII3BbBXbTRDFVgdo_LSHFxDCJMQZ7x_Eu5GuAyxN2zfpMRehTJuRQIwN4tn7v54b9mvu1FXez9UlDXwvIS5MMBakncFMJQw6ACi6Z7Tn0SPFtr8cU7Td7-abeWbS0Dhi9_vs3wVOJmRhjcGRwxaAQJc'
    };

    return (
        <div className="bg-background-dark font-display text-white selection:bg-primary selection:text-white min-h-screen">
            {/* Unified Header */}
            <header className="fixed top-0 w-full z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={onBack}
                            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 text-white/70 group-hover:text-white" />
                        </button>
                        <div
                            onClick={onBack}
                            className="flex items-center gap-2 group cursor-pointer"
                        >
                            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_var(--color-primary-glow)]">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <h2 className="text-white text-xl font-extrabold tracking-tighter uppercase">Style <span className="text-primary">AI</span></h2>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors uppercase" href="#trends">Collections</a>
                        <a className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors uppercase" href="#how-it-works">Intelligence</a>
                        <a className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors uppercase" href="#recommendation">Recommender</a>
                    </nav>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-6">
                            {user ? (
                                <div className="flex items-center gap-4 group/profile relative">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">Styling For</p>
                                        <p className="text-sm font-bold uppercase tracking-tight">{user.name}</p>
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
                                        className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-xl text-xs font-black tracking-widest transition-all shadow-lg shadow-[0_0_15px_var(--color-primary-glow)] uppercase"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-16">
                {/* Gender-Specific Hero */}
                <section className="relative h-[80vh] min-h-[600px] w-full flex items-center overflow-hidden">
                    <div className="absolute inset-0 bg-center bg-cover scale-105" style={{ backgroundImage: `url('${heroImages[gender]}')` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/40 to-transparent"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                        <div className="max-w-2xl">
                            <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                                <TrendingUp className="text-primary w-4 h-4" />
                                <span className="text-[10px] uppercase font-extrabold tracking-[0.2em]">{gender} Curated Showcase</span>
                            </div>
                            <h1 className="text-white text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 uppercase">
                                Modern <br /><span className="text-primary italic">{gender} Luxury</span>
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-lg">
                                Experience the pinnacle of {gender.toLowerCase()}'s fashion, curated by next-generation artificial intelligence.
                            </p>
                            <div className="flex flex-col sm:row gap-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-[0_0_30px_var(--color-primary-glow)] hover:scale-105"
                                >
                                    <MagicWand className="w-5 h-5" />
                                    Start AI Styling
                                </button>
                                <a href="#trends" className="inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:bg-white/10">
                                    Explore Trends
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI Intelligence (Landing Page style) */}
                <section id="how-it-works" className="py-32 px-6 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
                        <div className="relative h-[600px] rounded-[3rem] overflow-hidden border border-white/10 group">
                            <div className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=1000&fit=crop')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                            <div className="absolute bottom-12 left-12 right-12 p-8 bg-background-dark/80 backdrop-blur-xl rounded-[2rem] border border-white/10">
                                <div className="flex items-center gap-5">
                                    <div className="size-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                                        <Bolt className="text-primary w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-primary font-black uppercase tracking-[0.2em] mb-1">Neural Analysis</p>
                                        <p className="font-bold text-lg uppercase tracking-tight">Processing {gender.toLowerCase()}'s pulses...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="inline-block px-4 py-1.5 bg-primary/20 rounded-full border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">Intelligence Layer</div>
                            <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.95] mb-8">
                                Decoding the <br /><span className="text-primary italic">Style Matrix.</span>
                            </h2>
                            <p className="text-white/50 text-xl leading-relaxed mb-12 max-w-xl">
                                Our AI scanned over 100,000 runways to define the specific silhouettes and textures that dominate {gender.toLowerCase()}'s fashion today.
                            </p>
                            <div className="grid gap-8">
                                <div className="flex gap-6 p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-primary/50 transition-all">
                                    <Psychology className="text-primary w-10 h-10 shrink-0" />
                                    <div>
                                        <h3 className="font-black uppercase tracking-widest text-sm mb-2">Trend Forecasting</h3>
                                        <p className="text-white/40 leading-relaxed">Predicting the next wave of {gender.toLowerCase()}'s aesthetics before they hit the high street.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-primary/50 transition-all">
                                    <Straighten className="text-primary w-10 h-10 shrink-0" />
                                    <div>
                                        <h3 className="font-black uppercase tracking-widest text-sm mb-2">Geometric Fit</h3>
                                        <p className="text-white/40 leading-relaxed">Precision measurements analyzed across every major luxury brand for the perfect {gender.toLowerCase()}'s profile.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trending Gallery (Unified Design) */}
                <section id="trends" className="py-32 bg-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:row md:items-end justify-between gap-8 mb-20">
                            <div>
                                <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Trending Collections</h2>
                                <p className="text-white/40 text-lg uppercase font-bold tracking-[0.1em]">The current {gender.toLowerCase()}'s fashion pulse</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-px w-24 bg-primary/30 self-center hidden md:block"></div>
                                <p className="text-sm font-black uppercase tracking-widest text-primary">Updated Real-Time</p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-[3rem] border border-white/10"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {trending.map((item, i) => (
                                    <div key={i} className="group space-y-8 cursor-pointer">
                                        <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden relative border border-white/10 shadow-2xl">
                                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url('${item.image}')` }}></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
                                            <div className="absolute top-8 right-8 bg-background-dark/60 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
                                                {item.type}
                                            </div>
                                            <div className="absolute bottom-8 left-8">
                                                <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-2">Most Wanted</p>
                                                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">{item.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* AI Recommendation Result Section */}
                {recommendation && (
                    <section id="result" className="py-32 px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center gap-8 mb-20">
                                <div className="h-px flex-1 bg-white/10"></div>
                                <div className="flex items-center gap-4 bg-primary px-8 py-3 rounded-full shadow-[0_0_20px_var(--color-primary-glow)]">
                                    <Sparkles className="w-5 h-5 text-white" />
                                    <span className="text-xs font-black uppercase tracking-[0.3em]">Neural Recommendation Active</span>
                                </div>
                                <div className="h-px flex-1 bg-white/10"></div>
                            </div>

                            <div className="p-8 md:p-24 rounded-[4rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl animate-in zoom-in slide-in-from-bottom-20 duration-1000">
                                <div className="text-center mb-24">
                                    <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">
                                        Your <span className="text-primary italic">Custom</span> Fit
                                    </h3>
                                    <p className="text-white/40 uppercase font-black tracking-[0.3em] text-sm md:text-base">Engineered exclusively for your profile</p>
                                </div>

                                {recommendation.analysis && (
                                    <div className="max-w-4xl mx-auto mb-24 p-12 rounded-[3rem] bg-white/5 border border-white/10 text-center relative">
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background-dark border border-white/10 px-6 py-2 rounded-full">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">AI Insights</span>
                                        </div>
                                        <p className="text-xl md:text-2xl text-white/80 leading-relaxed italic font-medium">"{recommendation.analysis}"</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                    {(recommendation.outfit || recommendation.recommendations)?.map((item, idx) => (
                                        <div key={idx} className="group relative overflow-hidden rounded-[3rem] bg-white/[0.03] border border-white/10 hover:border-primary/40 transition-all duration-500 shadow-xl">
                                            <div className="aspect-[4/5] overflow-hidden relative">
                                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 to-transparent opacity-70 z-10"></div>
                                                <img
                                                    src={item.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=600&fit=crop'}
                                                    alt={item.item}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                />
                                                <div className="absolute bottom-10 left-10 z-20">
                                                    <div className="size-14 flex items-center justify-center font-black bg-primary rounded-2xl text-white text-2xl shadow-lg">
                                                        {idx + 1}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-10">
                                                <h4 className="text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">{item.item}</h4>
                                                <p className="text-white/40 text-base leading-relaxed font-bold uppercase tracking-wide mb-2 italic">Ref. AI_LOOK_{idx + 100}</p>
                                                <p className="text-white/50 text-sm leading-relaxed font-medium">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-32 flex flex-col items-center">
                                    <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-10 border border-primary/20 shadow-[0_0_30px_var(--color-primary-glow)]">
                                        <MagicWand className="text-primary w-10 h-10" />
                                    </div>
                                    <p className="text-2xl md:text-4xl italic text-white/90 font-medium text-center max-w-5xl leading-relaxed px-12">
                                        "{recommendation.styling_tips}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Recommendation CTA (Landing Page style) */}
                <section id="recommendation" className="py-32 px-6">
                    <div className="max-w-5xl mx-auto bg-primary rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-[0_0_100px_var(--color-primary-glow)]">
                        <div className="absolute top-0 right-0 size-[500px] bg-white/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10 leading-none text-white drop-shadow-2xl">
                                YOUR NEW <br />{gender} ERA.
                            </h2>
                            <p className="text-white/90 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
                                Upload your image or tell us your vibe, and let the AI build your next-gen wardrobe.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-white text-primary font-black px-12 py-6 rounded-[2rem] hover:scale-105 transition-all uppercase tracking-[.3em] text-sm shadow-2xl flex items-center justify-center gap-4"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Get AI Advice
                                </button>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="bg-background-dark/30 backdrop-blur-xl border border-white/20 text-white font-black px-12 py-6 rounded-[2rem] hover:bg-background-dark/50 transition-all uppercase tracking-[.3em] text-sm"
                                >
                                    Back to Top
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter (Landing Page Matching) */}
                <section id="newsletter" className="py-32 px-6 border-t border-white/5">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-10 border border-primary/20">
                            <Mail className="text-primary w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                            The Style Report
                        </h2>
                        <p className="text-white/40 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium tracking-tight">
                            Weekly {gender.toLowerCase()}'s luxury alerts, curated runways, and AI-predicted trend reports.
                        </p>

                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-5 max-w-md mx-auto mb-8">
                            <input
                                required
                                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-all font-bold tracking-wide"
                                placeholder="Enter your email"
                                type="email"
                            />
                            <button className="bg-primary text-white font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform uppercase tracking-[.2em] text-xs shadow-[0_15px_30px_rgba(var(--color-primary-rgb),0.3)]">
                                SUBSCRIBE
                            </button>
                        </form>
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-[.4em]">
                            NO SPAM. JUST PURE INTELLIGENCE.
                        </p>
                    </div>
                </section>
            </main>

            {/* Unified Footer */}
            <footer className="bg-background-dark border-t border-white/10 py-24 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <h2 className="text-white text-xl font-black tracking-tighter uppercase">Style <span className="text-primary italic">AI</span></h2>
                        </div>
                        <p className="text-white/30 text-base max-w-sm mb-12 leading-relaxed font-bold uppercase tracking-tight">
                            Redefining the {gender.toLowerCase()}'s fashion paradigm. Machine curators. Human designers. Zero compromise.
                        </p>
                        <div className="flex gap-6">
                            <button className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary transition-all text-white/30 hover:text-white group">
                                <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </button>
                            <button className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary transition-all text-white/30 hover:text-white group">
                                <Globe className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                    {['Navigation', 'Legal'].map((title, i) => (
                        <div key={i}>
                            <h3 className="text-white font-black uppercase tracking-[.4em] text-[10px] mb-10">{title}</h3>
                            <ul className="space-y-5 text-xs font-black uppercase tracking-widest text-white/30">
                                <li><a className="hover:text-primary transition-colors" href="#">{i === 0 ? 'Curations' : 'Intelligence'}</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">{i === 0 ? 'Runways' : 'Privacy'}</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">{i === 0 ? 'Archive' : 'Terms'}</a></li>
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
                    <p className="text-white/20 text-[10px] uppercase font-black tracking-[0.4em]">© 2024 Style AI Technologies. High-End Gender Customization Active.</p>
                </div>
            </footer>

            <RecommendationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                gender={gender}
                onSuccess={(data) => {
                    setRecommendation(data);
                    setIsModalOpen(false);
                    setTimeout(() => {
                        const resultSection = document.getElementById('result');
                        resultSection?.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                }}
            />
            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                initialTab={authTab}
            />
        </div>
    );
};

export default StylePage;
