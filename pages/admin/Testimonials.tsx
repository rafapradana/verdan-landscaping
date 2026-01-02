
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { Delete02Icon, PencilEdit02Icon, PlusSignIcon, Loading03Icon, Cancel01Icon, Message01Icon, StarIcon } from 'hugeicons-react';

export const Testimonials = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [editItem, setEditItem] = useState<any>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
        if (data) setItems(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;
        await supabase.from('testimonials').delete().eq('id', id);
        fetchItems();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="lg:pl-80 p-6 lg:p-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Testimonials</h1>
                        <p className="text-slate-500 mt-1">Manage client reviews and feedback</p>
                    </div>
                    <Button
                        onClick={() => setEditItem({})}
                        className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-200 font-semibold"
                    >
                        <PlusSignIcon className="w-5 h-5 mr-2" /> Add Review
                    </Button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 animate-pulse"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-slate-100 rounded animate-pulse w-24"></div>
                                        <div className="h-3 bg-slate-100 rounded animate-pulse w-16"></div>
                                    </div>
                                </div>
                                <div className="h-20 bg-slate-100 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Message01Icon className="w-8 h-8 text-amber-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">No testimonials yet</h3>
                        <p className="text-slate-500 mb-6">Add your first client review to build trust.</p>
                        <Button onClick={() => setEditItem({})} className="bg-emerald-600 hover:bg-emerald-700">
                            <PlusSignIcon className="w-4 h-4 mr-2" /> Add Your First Review
                        </Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map(item => (
                            <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-100 group hover:shadow-xl transition-all duration-300 relative">
                                {/* Actions */}
                                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => setEditItem(item)}
                                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
                                    >
                                        <PencilEdit02Icon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 transition-colors"
                                    >
                                        <Delete02Icon className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-slate-600 text-sm mb-6 line-clamp-4 italic">"{item.content}"</p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                    <img
                                        src={item.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=10b981&color=fff`}
                                        alt={item.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-slate-900 text-sm">{item.name}</p>
                                        <p className="text-xs text-slate-400">{item.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {editItem && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
                        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                                <h2 className="text-xl font-bold text-slate-900">
                                    {editItem.id ? 'Edit Testimonial' : 'New Testimonial'}
                                </h2>
                                <button onClick={() => setEditItem(null)} className="text-slate-400 hover:text-slate-600">
                                    <Cancel01Icon className="w-5 h-5" />
                                </button>
                            </div>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    const data = Object.fromEntries(formData);

                                    if (editItem.id) {
                                        await supabase.from('testimonials').update(data).eq('id', editItem.id);
                                    } else {
                                        await supabase.from('testimonials').insert([data]);
                                    }
                                    setEditItem(null);
                                    fetchItems();
                                }}
                                className="p-6 space-y-5"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 font-medium">Name</Label>
                                        <Input name="name" defaultValue={editItem.name} required className="h-12 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 font-medium">Location</Label>
                                        <Input name="location" defaultValue={editItem.location} required className="h-12 rounded-xl" placeholder="e.g., Park Slope" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-medium">Review Content</Label>
                                    <Textarea name="content" defaultValue={editItem.content} required rows={4} className="rounded-xl resize-none" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-medium">Avatar (Optional)</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="h-12 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-medium hover:file:bg-emerald-100"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setUploading(true);
                                                try {
                                                    const url = await uploadImage(file, 'content', 'avatars');
                                                    setEditItem({ ...editItem, avatar_url: url });
                                                } catch (error) {
                                                    alert('Error uploading image');
                                                } finally {
                                                    setUploading(false);
                                                }
                                            }
                                        }}
                                    />
                                    <Input type="hidden" name="avatar_url" value={editItem.avatar_url || ''} />
                                    {editItem.avatar_url && (
                                        <div className="mt-3 flex items-center gap-3">
                                            <img src={editItem.avatar_url} alt="Avatar" className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200" />
                                            <span className="text-sm text-slate-500">Avatar uploaded</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <Button type="button" variant="ghost" onClick={() => setEditItem(null)} className="flex-1 h-12 rounded-xl">
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={uploading} className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                                        {uploading ? <Loading03Icon className="w-5 h-5 animate-spin mr-2" /> : null}
                                        {uploading ? 'Uploading...' : 'Save Testimonial'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
