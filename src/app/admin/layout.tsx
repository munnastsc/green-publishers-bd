'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Book, Layers, Users, Building, 
  Menu as MenuIcon, Video, ShoppingCart, LogOut, Home, Eye, Image as ImageIcon, Tag
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const loginStatus = localStorage.getItem('adminLoggedIn');
    if (loginStatus !== 'true' && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setChecking(false);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin/login');
  };

  if (checking && pathname !== '/admin/login') {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--text-muted)' }}>Checking authorization...</div>;
  }

  if (pathname === '/admin/login') return <>{children}</>;

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/admin' },
    { label: 'Manage Books', icon: <Book size={18} />, href: '/admin/books' },
    { label: 'Categories', icon: <Layers size={18} />, href: '/admin/categories' },
    { label: 'Authors', icon: <Users size={18} />, href: '/admin/authors' },
    { label: 'Publishers', icon: <Building size={18} />, href: '/admin/publishers' },
    { label: 'Nav Menus', icon: <MenuIcon size={18} />, href: '/admin/menus' },
    { label: 'Home Sections', icon: <Layers size={18} />, href: '/admin/home-sections' },
    { label: 'Videos', icon: <Video size={18} />, href: '/admin/videos' },
    { label: 'Banners', icon: <ImageIcon size={18} />, href: '/admin/banners' },
    { label: 'Orders', icon: <ShoppingCart size={18} />, href: '/admin/orders' },
    { label: 'Coupons', icon: <Tag size={18} />, href: '/admin/coupons' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', color: '#f8fafc', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Book size={24} color="#10b981" />
            <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Admin<span style={{ color: '#f59e0b' }}>Panel</span></span>
          </div>
        </div>

        <nav style={{ flexGrow: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {menuItems.map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              color: pathname === item.href ? 'white' : '#94a3b8',
              backgroundColor: pathname === item.href ? '#334155' : 'transparent',
              transition: 'all 0.2s'
            }}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            color: '#94a3b8',
            textDecoration: 'none',
            fontSize: '0.9rem'
          }}>
            <Eye size={18} /> View Live Site
          </Link>
          <button onClick={handleLogout} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            color: '#ef4444',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.9rem',
            textAlign: 'left',
            width: '100%'
          }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '260px', flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '60px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 600 }}>
            {menuItems.find(m => m.href === pathname)?.label || 'Admin Control Panel'}
          </h2>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Logged in as: admin@greenpublishersbd.com
          </div>
        </header>
        <div style={{ padding: '2rem' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
