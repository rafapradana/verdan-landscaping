
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { supabase } from '../../lib/supabase';
import { Delete02Icon, PencilEdit02Icon, PlusSignIcon, Cancel01Icon, HelpCircleIcon } from 'hugeicons-react';

export const FAQ = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editItem, setEditItem] = useState<any>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const { data } = await supabase.from('faqs').select('*').order('created_at', { ascending: false });
        if (data) setItems(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;
        await supabase.from('faqs').delete().eq('id', id);
        fetchItems();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="lg:pl-80 p-6 lg:p-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">FAQs</h1>
                        <p className="text-slate-500 mt-1">Manage frequently asked questions</p>
                    </div>
                    <Button
                        onClick={() => setEditItem({})}
                        className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-200 font-semibold"
                    >
                        <PlusSignIcon className="w-5 h-5 mr-2" /> Add Question
                    </Button>
                </div>

                {/* List */}
                {loading ? (
                    <div className="space-y-4 max-w-3xl">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100">
                                <div className="h-5 bg-slate-100 rounded animate-pulse w-3/4 mb-3"></div>
                                <div className="h-4 bg-slate-100 rounded animate-pulse w-full"></div>
                            </div>
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-3xl">
                        <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <HelpCircleIcon className="w-8 h-8 text-purple-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">No FAQs yet</h3>
                        <p className="text-slate-500 mb-6">Add questions and answers to help your customers.</p>
                        <Button onClick={() => setEditItem({})} className="bg-emerald-600 hover:bg-emerald-700">
                            <PlusSignIcon className="w-4 h-4 mr-2" /> Add Your First FAQ
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4 max-w-3xl">
                        {items.map((item, index) => (
                            <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-100 group hover:shadow-xl transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                                        <p className="text-slate-500 text-sm">{item.answer}</p>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
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
                                    {editItem.id ? 'Edit FAQ' : 'New FAQ'}
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
                                        await supabase.from('faqs').update(data).eq('id', editItem.id);
                                    } else {
                                        await supabase.from('faqs').insert([data]);
                                    }
                                    setEditItem(null);
                                    fetchItems();
                                }}
                                className="p-6 space-y-5"
                            >
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-medium">Question</Label>
                                    <Input name="question" defaultValue={editItem.question} required className="h-12 rounded-xl" placeholder="What would customers ask?" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-medium">Answer</Label>
                                    <Textarea name="answer" defaultValue={editItem.answer} required rows={5} className="rounded-xl resize-none" placeholder="Provide a helpful answer..." />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <Button type="button" variant="ghost" onClick={() => setEditItem(null)} className="flex-1 h-12 rounded-xl">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                                        Save FAQ
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
