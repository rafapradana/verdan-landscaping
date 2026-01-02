
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/admin/Sidebar';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';
import { Textarea } from '../../components/ui/textarea';
import { CheckmarkCircle01Icon } from 'hugeicons-react';

export const Settings = () => {
    const [settings, setSettings] = useState({
        phone: '',
        email: '',
        banner_text: '',
        banner_active: false
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from('settings').select('*');
            if (data) {
                const newSettings = data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
                setSettings(prev => ({ ...prev, ...newSettings }));
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        const updates = Object.entries(settings).map(([key, value]) => ({
            key,
            value
        }));

        const { error } = await supabase.from('settings').upsert(updates);
        setSaving(false);
        if (error) {
            alert('Error saving settings');
        } else {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="lg:pl-80 p-6 lg:p-12">
                {/* Header */}
                <div className="mb-10 text-center lg:text-left">
                    <h1 className="text-3xl font-bold text-slate-900">General Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your website's contact info and promotional banner.</p>
                </div>

                <div className="max-w-2xl mx-auto space-y-8">
                    {/* Contact Information Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">Contact Information</h2>
                            <p className="text-sm text-slate-500">Update your public contact details displayed on the website.</p>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-medium">Phone Number</Label>
                                <Input
                                    value={settings.phone}
                                    onChange={e => setSettings({ ...settings, phone: e.target.value })}
                                    placeholder="(718) 555-0192"
                                    className="h-12 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-medium">Email Address</Label>
                                <Input
                                    value={settings.email}
                                    onChange={e => setSettings({ ...settings, email: e.target.value })}
                                    placeholder="hello@verdan.com"
                                    className="h-12 rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Promotional Banner Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">Promotional Banner</h2>
                            <p className="text-sm text-slate-500">Manage the announcement banner at the top of your site.</p>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                                <input
                                    type="checkbox"
                                    id="banner_active"
                                    checked={settings.banner_active}
                                    onChange={e => setSettings({ ...settings, banner_active: e.target.checked })}
                                    className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <div>
                                    <Label htmlFor="banner_active" className="text-slate-700 font-medium cursor-pointer">Enable Banner</Label>
                                    <p className="text-xs text-slate-400">Show promotional banner on the public website</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-medium">Banner Content</Label>
                                <Textarea
                                    value={settings.banner_text}
                                    onChange={e => setSettings({ ...settings, banner_text: e.target.value })}
                                    placeholder="📅 Now Booking Spring Cleanups — Only 4 slots left for April"
                                    rows={3}
                                    className="rounded-xl resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-200 font-semibold"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                        {saved && (
                            <span className="flex items-center gap-2 text-emerald-600 font-medium text-sm animate-fade-in">
                                <CheckmarkCircle01Icon className="w-5 h-5" />
                                Changes saved!
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
