import React, { useState, useEffect } from 'react';
import { X, User, ArrowRight, Sparkles, Mail, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AuthModal = ({ isOpen, onClose, initialTab = 'signup' }) => {
    const { login } = useTheme();
    const [tab, setTab] = useState(initialTab);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        if (isOpen) setTab(initialTab);
    }, [initialTab, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tab === 'signup') {
            if (formData.name.trim() && formData.email.trim()) {
                login({ name: formData.name.trim(), email: formData.email.trim() });
                onClose();
            }
        } else {
            if (formData.email.trim()) {
                const nameFromEmail = formData.email.split('@')[0].toUpperCase();
                login({ name: nameFromEmail, email: formData.email.trim() });
                onClose();
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background-dark/95 backdrop-blur-2xl animate-in fade-in duration-500 font-display">
            <div className="relative bg-white/[0.03] border border-white/10 w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all group z-20"
                >
                    <X className="w-5 h-5 text-white/40 group-hover:text-white" />
                </button>

                <div className="p-8 pt-10">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="size-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-4 shadow-[0_0_30px_var(--color-primary-glow)]">
                            <Sparkles className="w-7 h-7" />
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
                            {tab === 'signup' ? 'Join Style AI' : 'Welcome Back'}
                        </h2>

                        <div className="flex w-full gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5">
                            <button
                                onClick={() => setTab('signup')}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'signup' ? 'bg-primary text-white shadow-lg' : 'text-white/30 hover:text-white'}`}
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => setTab('login')}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'login' ? 'bg-primary text-white shadow-lg' : 'text-white/30 hover:text-white'}`}
                            >
                                Login
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {tab === 'signup' && (
                            <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                                <label className="text-[10px] font-black uppercase tracking-[.2em] text-white/40 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="AKSHIT SHARAPU"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all font-bold tracking-wide uppercase"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[.2em] text-white/40 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                <input
                                    required
                                    type="email"
                                    placeholder="STYLE@AI.COM"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all font-bold tracking-wide uppercase"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[.2em] text-white/40 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all font-bold tracking-wide"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-background-dark hover:bg-primary hover:text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 group shadow-xl mt-4"
                        >
                            {tab === 'signup' ? 'Create Account' : 'Sign In'}
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            {tab === 'signup' ? 'Already have an account?' : 'New to Style AI?'}
                            <button
                                onClick={() => setTab(tab === 'signup' ? 'login' : 'signup')}
                                className="ml-2 text-primary hover:text-white transition-colors"
                            >
                                {tab === 'signup' ? 'Login' : 'Sign Up Now'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
