import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { X, Upload, Send, Loader2, Image, ClipboardList, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const RecommendationModal = ({ isOpen, onClose, gender, onSuccess }) => {
    const { theme } = useTheme();
    const [tab, setTab] = useState('manual'); // 'manual' or 'upload'
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ size: '', style: '', occasion: '' });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    if (!isOpen) return null;

    const handleManualSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/recommend/text', {
                gender,
                size: formData.size,
                style_preference: formData.style,
                occasion: formData.occasion
            });
            onSuccess(response.data);
        } catch (error) {
            console.error("Error submitting manual entry:", error);
            const errorMsg = error.response?.data?.detail || "Something went wrong. Please try again.";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);
        const submitData = new FormData();
        submitData.append('gender', gender);
        submitData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:8000/recommend/image', submitData);
            onSuccess(response.data);
        } catch (error) {
            console.error("Error uploading image:", error);
            const errorMsg = error.response?.data?.detail || "Something went wrong with the image analysis.";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-background-dark/95 backdrop-blur-2xl animate-in fade-in duration-500 font-sans">
            <div className="bg-white/[0.03] border border-white/10 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all z-20 group"
                >
                    <X className="w-5 h-5 text-white/50 group-hover:text-white" />
                </button>

                <div className="p-8 md:p-12">
                    <div className="mb-10">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white transition-all">
                            Get Your <span className="text-primary italic">Styled</span> Look
                        </h2>
                        <p className="text-white/40 text-xs uppercase font-bold tracking-[0.2em] mt-2">AI-Powered Fashion Intelligence</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-10 p-2 bg-white/5 rounded-2xl border border-white/5">
                        <button
                            onClick={() => setTab('manual')}
                            className={cn(
                                "flex-1 py-4 px-6 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px] transition-all rounded-xl",
                                tab === 'manual' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/40 hover:text-white"
                            )}
                        >
                            <ClipboardList className="w-4 h-4" />
                            Manual Entry
                        </button>
                        <button
                            onClick={() => setTab('upload')}
                            className={cn(
                                "flex-1 py-4 px-6 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px] transition-all rounded-xl",
                                tab === 'upload' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/40 hover:text-white"
                            )}
                        >
                            <Image className="w-4 h-4" />
                            Upload Photo
                        </button>
                    </div>

                    <div className="relative">
                        {tab === 'manual' ? (
                            <form onSubmit={handleManualSubmit} className="space-y-8 animate-in slide-in-from-left-4 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Size / Build</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. Athleic, Large"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium"
                                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Occasion</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. Cocktail Party"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium"
                                            onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Preferred Aesthetic</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Minimalist, Dark Academia, Futuristic"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium"
                                        onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                                    />
                                </div>
                                <button
                                    disabled={loading}
                                    className="w-full py-6 rounded-2xl font-black bg-white text-background-dark hover:bg-primary hover:text-white uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                                    Generate Styling
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleUploadSubmit} className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                                <div className="relative group cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className={cn(
                                        "border-2 border-dashed rounded-[2.5rem] p-16 flex flex-col items-center justify-center gap-6 transition-all",
                                        preview ? "border-primary/50 bg-primary/5" : "border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
                                    )}>
                                        {preview ? (
                                            <div className="relative">
                                                <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded-[2rem] shadow-2xl border border-white/20" />
                                                <div className="absolute -top-3 -right-3 bg-primary p-2 rounded-full shadow-lg">
                                                    <Sparkles className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="size-20 bg-white/5 rounded-[1.5rem] flex items-center justify-center border border-white/10">
                                                <Upload className="w-8 h-8 text-white/30" />
                                            </div>
                                        )}
                                        <div className="text-center">
                                            <p className="text-white font-bold uppercase tracking-widest text-[10px] mb-2">
                                                {preview ? "Image Captured" : "Drag & Drop Image"}
                                            </p>
                                            <p className="text-xs text-white/30 font-medium">Skin Tone & Aesthetic Analysis Ready</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    disabled={loading || !file}
                                    className="w-full py-6 rounded-2xl font-black bg-white text-background-dark hover:bg-primary hover:text-white uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    Analyze & Match
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendationModal;
