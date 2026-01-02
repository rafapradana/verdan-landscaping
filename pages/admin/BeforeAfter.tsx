
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { Delete02Icon, PencilEdit02Icon, PlusSignIcon, Loading03Icon, Cancel01Icon, LeftToRightListNumberIcon } from 'hugeicons-react';

export const BeforeAfter = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [editItem, setEditItem] = useState<any>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const { data } = await supabase.from('before_after').select('*').order('created_at', { ascending: false });
        if (data) setItems(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this comparison?')) return;
        await supabase.from('before_after').delete().eq('id', id);
        fetchItems();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="lg:pl-80 p-6 lg:p-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Before & After</h1>
                        <p className="text-slate-500 mt-1">Showcase your transformation projects</p>
                    </div>
                    <Button
                        onClick={() => setEditItem({})}
                        className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-200 font-semibold"
                    >
                        <PlusSignIcon className="w-5 h-5 mr-2" /> Add Comparison
                    </Button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100">
                                <div className="grid grid-cols-2 h-48">
                                    <div className="bg-slate-100 animate-pulse"></div>
                                    <div className="bg-slate-100 animate-pulse"></div>
                                </div>
                                <div className="p-5">
                                    <div className="h-5 bg-slate-100 rounded animate-pulse w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <LeftToRightListNumberIcon className="w-8 h-8 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">No comparisons yet</h3>
                        <p className="text-slate-500 mb-6">Add before & after images to show your transformations.</p>
                        <Button onClick={() => setEditItem({})} className="bg-emerald-600 hover:bg-emerald-700">
                            <PlusSignIcon className="w-4 h-4 mr-2" /> Add Your First Comparison
                        </Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {items.map(item => (
                            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-100 group hover:shadow-xl transition-all duration-300 relative">
                                {/* Actions */}
                                <div className="absolute top-4 right-4 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => setEditItem(item)}
                                        className="p-2 bg-white/90 hover:bg-white rounded-lg text-slate-600 shadow-lg transition-colors"
                                    >
                                        <PencilEdit02Icon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 bg-white/90 hover:bg-red-50 rounded-lg text-red-500 shadow-lg transition-colors"
                                    >
                                        <Delete02Icon className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Images */}
                                <div className="grid grid-cols-2 h-56">
                                    <div className="relative">
                                        <img src={item.before_img} alt="Before" className="w-full h-full object-cover" />
                                        <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-xs px-3 py-1.5 rounded-lg font-semibold">Before</span>
                                    </div>
                                    <div className="relative">
                                        <img src={item.after_img} alt="After" className="w-full h-full object-cover" />
                                        <span className="absolute bottom-3 right-3 bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold">After</span>
                                    </div>
                                </div>

                                {/* Caption */}
                                <div className="p-5">
                                    <p className="font-semibold text-slate-900">{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {editItem && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
                        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white">
                                <h2 className="text-xl font-bold text-slate-900">
                                    {editItem.id ? 'Edit Comparison' : 'New Comparison'}
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
                                        await supabase.from('before_after').update(data).eq('id', editItem.id);
                                    } else {
                                        await supabase.from('before_after').insert([data]);
                                    }
                                    setEditItem(null);
                                    fetchItems();
                                }}
                                className="p-6 space-y-5"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 font-medium">Before Image</Label>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="rounded-xl file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-slate-100 file:text-slate-700 file:font-medium file:text-xs"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setUploading(true);
                                                    try {
                                                        const url = await uploadImage(file, 'content', 'before-after');
                                                        setEditItem({ ...editItem, before_img: url });
                                                    } catch (error) {
                                                        alert('Error uploading');
                                                    } finally {
                                                        setUploading(false);
                                                    }
                                                }
                                            }}
                                        />
                                        <Input type="hidden" name="before_img" value={editItem.before_img || ''} />
                                        {editItem.before_img && (
                                            <img src={editItem.before_img} className="w-full h-24 object-cover rounded-xl border" />
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 font-medium">After Image</Label>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="rounded-xl file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-medium file:text-xs"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setUploading(true);
                                                    try {
                                                        const url = await uploadImage(file, 'content', 'before-after');
                                                        setEditItem({ ...editItem, after_img: url });
                                                    } catch (error) {
                                                        alert('Error uploading');
                                                    } finally {
                                                        setUploading(false);
                                                    }
                                                }
                                            }}
                                        />
                                        <Input type="hidden" name="after_img" value={editItem.after_img || ''} />
                                        {editItem.after_img && (
                                            <img src={editItem.after_img} className="w-full h-24 object-cover rounded-xl border" />
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-medium">Caption</Label>
                                    <Input name="caption" defaultValue={editItem.caption} required className="h-12 rounded-xl" placeholder="Describe the transformation" />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <Button type="button" variant="ghost" onClick={() => setEditItem(null)} className="flex-1 h-12 rounded-xl">
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={uploading} className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                                        {uploading ? <Loading03Icon className="w-5 h-5 animate-spin mr-2" /> : null}
                                        {uploading ? 'Uploading...' : 'Save Comparison'}
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
