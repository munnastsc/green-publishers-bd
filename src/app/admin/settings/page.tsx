'use client';
import { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => { setSettings(data); setLoading(false); });
  }, []);

  const set = (key: string, value: string) => setSettings(s => ({ ...s, [key]: value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  if (loading) return <p>Loading settings...</p>;

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#374151', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1rem', borderLeft: '4px solid var(--primary)' }}>
      {children}
    </h3>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)' }}>Site Settings</h2>
        {saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 700, background: '#f0fdf4', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <CheckCircle size={18} /> সেটিংস সেভ হয়েছে!
          </div>
        )}
      </div>

      <form onSubmit={handleSave}>
        {/* Site Identity */}
        <div className="book-card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
          <SectionTitle>সাইটের পরিচয় (Site Identity)</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Site Name (সাইটের নাম)</label>
              <input className="form-control" value={settings.siteName || ''} onChange={e => set('siteName', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Tagline (ট্যাগলাইন)</label>
              <input className="form-control" value={settings.siteTagline || ''} onChange={e => set('siteTagline', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="book-card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
          <SectionTitle>যোগাযোগের তথ্য (Contact Info)</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Phone Number (হেল্পলাইন)</label>
              <input className="form-control" value={settings.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="16297" />
            </div>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input className="form-control" type="email" value={settings.email || ''} onChange={e => set('email', e.target.value)} />
            </div>
            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Address (ঠিকানা)</label>
              <input className="form-control" value={settings.address || ''} onChange={e => set('address', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Facebook URL</label>
              <input className="form-control" value={settings.facebookUrl || ''} onChange={e => set('facebookUrl', e.target.value)} placeholder="https://facebook.com/..." />
            </div>
            <div className="input-group">
              <label className="input-label">YouTube URL</label>
              <input className="form-control" value={settings.youtubeUrl || ''} onChange={e => set('youtubeUrl', e.target.value)} placeholder="https://youtube.com/..." />
            </div>
          </div>
        </div>

        {/* Buy Button Settings */}
        <div className="book-card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
          <SectionTitle>বই কেনার বাটন (External Buy Button)</SectionTitle>
          <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fde68a', fontSize: '0.9rem', color: '#92400e' }}>
            প্রতিটি বইতে আলাদা রকমারি/অন্য সাইটের লিঙ্ক দিতে পারবেন। এখানে শুধু বাটনের নাম পরিবর্তন করুন।
          </div>
          <div className="input-group" style={{ maxWidth: '400px' }}>
            <label className="input-label">বাটনের নাম (Button Label)</label>
            <input
              className="form-control"
              value={settings.rokomariButtonLabel || ''}
              onChange={e => set('rokomariButtonLabel', e.target.value)}
              placeholder="রকমারিতে কিনুন"
            />
            <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.4rem', display: 'block' }}>
              উদাহরণ: রকমারিতে কিনুন / Buy on Rokomari / অনলাইনে কিনুন
            </span>
          </div>
        </div>

        {/* Delivery Charges */}
        <div className="book-card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
          <SectionTitle>ডেলিভারি চার্জ (Delivery Charges)</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">ঢাকার ভেতরে (Inside Dhaka) — TK</label>
              <input className="form-control" type="number" value={settings.deliveryChargeDhaka || '70'} onChange={e => set('deliveryChargeDhaka', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">ঢাকার বাইরে (Outside Dhaka) — TK</label>
              <input className="form-control" type="number" value={settings.deliveryChargeOutside || '150'} onChange={e => set('deliveryChargeOutside', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="book-card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
          <SectionTitle>পেমেন্ট পদ্ধতি (Payment Methods)</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.95rem' }}>
              <input
                type="checkbox"
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                checked={settings.cashOnDelivery !== 'false'}
                onChange={e => set('cashOnDelivery', e.target.checked ? 'true' : 'false')}
              />
              <div>
                <div style={{ fontWeight: 700 }}>Cash on Delivery (ক্যাশ অন ডেলিভারি)</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>বই পেয়ে টাকা দিতে পারবেন</div>
              </div>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.95rem' }}>
              <input
                type="checkbox"
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                checked={settings.onlinePayment !== 'false'}
                onChange={e => set('onlinePayment', e.target.checked ? 'true' : 'false')}
              />
              <div>
                <div style={{ fontWeight: 700 }}>Online Payment (অনলাইন পেমেন্ট)</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>SSLCommerz / bKash / কার্ড</div>
              </div>
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-blue" style={{ padding: '0.9rem 2.5rem', fontSize: '1rem', display: 'flex', gap: '0.5rem' }} disabled={saving}>
            <Save size={18} /> {saving ? 'Saving...' : 'সব সেটিংস সেভ করুন'}
          </button>
        </div>
      </form>
    </div>
  );
}
