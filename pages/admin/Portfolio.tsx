
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { Delete02Icon, PencilEdit02Icon, PlusSignIcon, Loading03Icon, Cancel01Icon, Image01Icon } from 'hugeicons-react';

export const Portfolio = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [editItem, setEditItem] = useState<any>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const { data } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
        if (data) setItems(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        await supabase.from('portfolio').delete().eq('id', id);
        fetchItems();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="lg:pl-80 p-6 lg:p-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Portfolio</h1>
                        <p className="text-slate-500 mt-1">Manage your showcase projects</p>
                    </div>
                    <Button
                        onClick={() => setEditItem({})}
                        className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-200 font-semibold"
                    >
                        <PlusSignIcon className="w-5 h-5 mr-2" /> Add Project
                    </Button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100">
                                <div className="aspect-video bg-slate-100 animate-pulse"></div>
                                <div className="p-5 space-y-2">
                                    <div className="h-5 bg-slate-100 rounded animate-pulse w-3/4"></div>
                                    <div className="h-4 bg-slate-100 rounded animate-pulse w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Image01Icon className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">No projects yet</h3>
                        <p className="text-slate-500 mb-6">Add your first portfolio project to showcase your work.</p>
                        <Button onClick={() => setEditItem({})} className="bg-emerald-600 hover:bg-emerald-700">
                            <PlusSignIcon className="w-4 h-4 mr-2" /> Add Your First Project
                        </Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map(item => (
                            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-100 group hover:shadow-xl transition-all duration-300">
                                <div className="relative aspect-video">
                                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                            <Button
                                                size="sm"
                                                className="flex-1 bg-white/90 text-slate-900 hover:bg-white rounded-lg"
                                                onClick={() => setEditItem(item)}
                                            >
                                                <PencilEdit02Icon className="w-4 h-4 mr-1" /> Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="rounded-lg"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Delete02Icon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{item.category}</p>
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
                                    {editItem.id ? 'Edit Project' : 'New Project'}
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
                                        await supabase.from('portfolio').update(data).eq('id', editItem.id);
                                    } else {
                                        await supabase.from('portfolio').insert([data]);
                                    }
                                    setEditItem(null);
                                    fetchItems();
                                }}
                                className="p-6 space-y-5"
                            >
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-medium">Title</Label>
                                    <Input name="title" defaultValue={editItem.title} required className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-medium">Category</Label>
                                    <Input name="category" defaultValue={editItem.category} required className="h-12 rounded-xl" placeholder="e.g., Garden Design" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-medium">Project Image</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="h-12 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-medium hover:file:bg-emerald-100"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setUploading(true);
                                                try {
                                                    const url = await uploadImage(file, 'content', 'portfolio');
                                                    setEditItem({ ...editItem, image_url: url });
                                                } catch (error) {
                                                    alert('Error uploading image');
                                                } finally {
                                                    setUploading(false);
                                                }
                                            }
                                        }}
                                    />
                                    <Input type="hidden" name="image_url" value={editItem.image_url || ''} />
                                    {editItem.image_url && (
                                        <div className="mt-3 relative aspect-video rounded-xl overflow-hidden border border-slate-200">
                                            <img src={editItem.image_url} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <Button type="button" variant="ghost" onClick={() => setEditItem(null)} className="flex-1 h-12 rounded-xl">
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={uploading} className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                                        {uploading ? <Loading03Icon className="w-5 h-5 animate-spin mr-2" /> : null}
                                        {uploading ? 'Uploading...' : 'Save Project'}
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
