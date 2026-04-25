'use client';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Award, Users, Heart } from 'lucide-react';

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#1e293b', marginBottom: '1.5rem' }}>
          {lang === 'en' ? 'About Green Publishers BD' : 'গ্রিন পাবলিশার্স বিডি সম্পর্কে'}
        </h1>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: '#64748b', lineHeight: 1.8 }}>
          {lang === 'en' 
            ? "We are dedicated to bringing the best literature and educational resources to your doorstep. Our mission is to inspire learning and nurture the habit of reading in every home in Bangladesh."
            : "আমরা আপনার দ্বারে সেরা সাহিত্য এবং শিক্ষামূলক উপকরণ পৌঁছে দিতে নিবেদিত। আমাদের লক্ষ্য হলো বাংলাদেশে প্রতিটি ঘরে শেখার অনুপ্রেরণা দেওয়া এবং বই পড়ার অভ্যাস গড়ে তোলা।"}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
        <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}><BookOpen size={40} /></div>
          <h3 style={{ marginBottom: '0.75rem' }}>{lang === 'en' ? 'Wide Collection' : 'বিশাল সংগ্রহ'}</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>{lang === 'en' ? 'From Islamic books to Sci-Fi, we have it all.' : 'ইসলামী বই থেকে সায়েন্স ফিকশন, আমাদের কাছে সব আছে।'}</p>
        </div>
        <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <div style={{ color: '#16a34a', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}><Award size={40} /></div>
          <h3 style={{ marginBottom: '0.75rem' }}>{lang === 'en' ? 'Quality Service' : 'মানসম্মত সেবা'}</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>{lang === 'en' ? 'We ensure every book reaches you in perfect condition.' : 'আমরা নিশ্চিত করি প্রতিটি বই যেন আপনার কাছে নিখুঁত অবস্থায় পৌঁছায়।'}</p>
        </div>
        <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <div style={{ color: '#f59e0b', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}><Users size={40} /></div>
          <h3 style={{ marginBottom: '0.75rem' }}>{lang === 'en' ? 'Expert Authors' : 'সেরা লেখকগণ'}</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>{lang === 'en' ? 'Working with the most renowned authors of the country.' : 'দেশের সবচাইতে স্বনামধন্য লেখকদের সাথে আমরা কাজ করি।'}</p>
        </div>
      </div>

      <div style={{ background: 'var(--primary)', color: 'white', padding: '4rem', borderRadius: '24px', textAlign: 'center' }}>
        <Heart size={60} color="white" style={{ marginBottom: '1.5rem', opacity: 0.8 }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
          {lang === 'en' ? 'Join Our Community' : 'আমাদের কমিউনিটিতে যোগ দিন'}
        </h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          {lang === 'en' 
            ? "Stay updated with our latest releases and exclusive offers." 
            : "আমাদের সর্বশেষ বই এবং বিশেষ অফার সম্পর্কে আপ-টু-ডেট থাকুন।"}
        </p>
      </div>
    </div>
  );
}
