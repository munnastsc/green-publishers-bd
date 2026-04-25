'use client';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(lang === 'en' ? 'Thank you! Your message has been sent.' : 'ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে।');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b' }}>
          {lang === 'en' ? 'Contact Us' : 'আমাদের সাথে যোগাযোগ করুন'}
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          {lang === 'en' ? "Have questions? We're here to help." : 'আপনার কোনো প্রশ্ন আছে? আমরা সাহায্য করতে প্রস্তুত।'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        {/* Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '12px', color: 'var(--primary)' }}><MapPin size={30} /></div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{lang === 'en' ? 'Our Location' : 'আমাদের ঠিকানা'}</h4>
              <p style={{ color: '#64748b', margin: '0.25rem 0' }}>Dhaka, Bangladesh</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '12px', color: '#16a34a' }}><Phone size={30} /></div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{lang === 'en' ? 'Phone Number' : 'ফোন নম্বর'}</h4>
              <p style={{ color: '#64748b', margin: '0.25rem 0' }}>+880 1234 567 890</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fff7ed', padding: '1rem', borderRadius: '12px', color: '#f59e0b' }}><Mail size={30} /></div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{lang === 'en' ? 'Email Address' : 'ইমেইল ঠিকানা'}</h4>
              <p style={{ color: '#64748b', margin: '0.25rem 0' }}>info@greenpublishersbd.com</p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="input-group">
              <label className="input-label">{lang === 'en' ? 'Full Name' : 'পূর্ণ নাম'}</label>
              <input required className="form-control" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="input-group">
              <label className="input-label">{lang === 'en' ? 'Email' : 'ইমেইল'}</label>
              <input required type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
          </div>
          <div className="input-group" style={{ marginBottom: '1.25rem' }}>
            <label className="input-label">{lang === 'en' ? 'Subject' : 'বিষয়'}</label>
            <input required className="form-control" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
          </div>
          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label className="input-label">{lang === 'en' ? 'Message' : 'বার্তা'}</label>
            <textarea required className="form-control" rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-blue" style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', borderRadius: '30px' }}>
             <Send size={20} /> {lang === 'en' ? 'Send Message' : 'বার্তা পাঠান'}
          </button>
        </form>
      </div>
    </div>
  );
}
