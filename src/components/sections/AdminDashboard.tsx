'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Zap, LogOut, ShieldAlert, FileText, Calendar, Users, Settings, MessageSquare,
  Plus, Edit, Trash2, CheckCircle, XCircle, LayoutGrid, Star, MapPin, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Interfaces mapping
interface Service {
  id: number;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  gallery: string;
  benefits: string;
  faqs: string;
  isActive: boolean;
  order: number;
}

interface Activity {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: Date;
  location: string;
  client: string | null;
  thumbnail: string;
  gallery: string;
  description: string;
  participants: number | null;
  capacity: string | null;
  isPublished: boolean;
  isFeatured: boolean;
}

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string | null;
  avatar: string | null;
  rating: number;
  content: string;
  isActive: boolean;
}

interface GlobalSetting {
  id: number;
  companyName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  contactPhone: string;
  contactEmail: string;
  whatsappNumber: string;
  address: string;
  socialInstagram: string;
  socialLinkedIn: string;
  socialYouTube: string;
  statsProjects: number;
  statsCapacity: string;
  statsYears: number;
  statsClients: number;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
}

interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  city: string;
  message: string;
  status: string;
  createdAt: Date;
}

interface AdminDashboardProps {
  user: { username: string; role: string };
  initialServices: Service[];
  initialActivities: Activity[];
  initialTestimonials: Testimonial[];
  initialSettings?: GlobalSetting;
  initialInquiries: ContactInquiry[];
}

export default function AdminDashboard({
  user,
  initialServices,
  initialActivities,
  initialTestimonials,
  initialSettings,
  initialInquiries,
}: AdminDashboardProps) {
  const router = useRouter();

  // Collections States
  const [services, setServices] = useState<Service[]>(initialServices);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(initialInquiries);
  const [activeTab, setActiveTab] = useState('overview');
  const [isTabDropdownOpen, setIsTabDropdownOpen] = useState(false);
  const [settings, setSettings] = useState<GlobalSetting>(
    initialSettings || {
      id: 1,
      companyName: 'Strum Technology Asia',
      tagline: 'Powering a Brighter Future',
      heroTitle: 'Solusi Kelistrikan & Energi Terbarukan Terpercaya',
      heroSubtitle: 'Kami menyediakan layanan instalasi panel surya PLTS...',
      contactPhone: '+62 812-3456-7890',
      contactEmail: 'info@strumtechnology.co.id',
      whatsappNumber: '6281234567890',
      address: 'Jl. Kelistrikan No. 88, Kav. 12, Jakarta',
      socialInstagram: 'https://instagram.com/strumtechnology',
      socialLinkedIn: 'https://linkedin.com/company/strumtechnology',
      socialYouTube: 'https://youtube.com/strumtechnology',
      statsProjects: 150,
      statsCapacity: '2.5 MWp',
      statsYears: 10,
      statsClients: 200,
      seoTitle: 'Strum Technology Asia',
      seoDescription: 'Solusi kelistrikan terbaik...',
      ogImage: '/og-image.jpg',
    }
  );

  // Dialog / Modal States
  const [activeDialog, setActiveDialog] = useState<'none' | 'service' | 'activity' | 'testimonial'>('none');
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Form Field States
  // 1. Service Form
  const [serviceForm, setServiceForm] = useState({
    title: '',
    icon: 'Zap',
    shortDescription: '',
    fullDescription: '',
    coverImage: '',
    isActive: true,
    order: 0,
    benefits: [] as string[],
    faqs: [] as { q: string; a: string }[],
  });

  // 2. Activity Form
  const [activityForm, setActivityForm] = useState({
    title: '',
    category: 'Proyek Pemasangan',
    date: '',
    location: '',
    client: '',
    thumbnail: '',
    description: '',
    participants: '',
    capacity: '',
    isPublished: true,
    isFeatured: false,
  });

  // 3. Testimonial Form
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    position: '',
    company: '',
    rating: 5,
    content: '',
    isActive: true,
  });

  // 4. Global Settings Form
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // Logout Handler
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        router.refresh();
        router.push('/admin/login');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- CRUD OPERATIONS ---
  // --- 1. SERVICES ---
  const openNewService = () => {
    setEditMode(false);
    setSelectedId(null);
    setServiceForm({
      title: '',
      icon: 'Zap',
      shortDescription: '',
      fullDescription: '',
      coverImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&h=600&q=80',
      isActive: true,
      order: services.length + 1,
      benefits: ['Menghemat tagihan listrik bulanan', 'Garansi jangka panjang'],
      faqs: [{ q: 'Bagaimana cara pemesanan?', a: 'Hubungi tim kami di form kontak.' }],
    });
    setActiveDialog('service');
  };

  const openEditService = (svc: Service) => {
    setEditMode(true);
    setSelectedId(svc.id);
    let benefits = [];
    let faqs = [];
    try { benefits = JSON.parse(svc.benefits); } catch (e) {}
    try { faqs = JSON.parse(svc.faqs); } catch (e) {}
    setServiceForm({
      title: svc.title,
      icon: svc.icon,
      shortDescription: svc.shortDescription,
      fullDescription: svc.fullDescription,
      coverImage: svc.coverImage,
      isActive: svc.isActive,
      order: svc.order,
      benefits,
      faqs,
    });
    setActiveDialog('service');
  };

  const saveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = '/api/admin/services';
      const method = editMode ? 'PUT' : 'POST';
      const payload = editMode ? { id: selectedId, ...serviceForm } : serviceForm;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (editMode) {
          setServices((prev) => prev.map((s) => (s.id === selectedId ? data.service : s)));
        } else {
          setServices((prev) => [...prev, data.service]);
        }
        setActiveDialog('none');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteService = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus layanan ini?')) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- 2. ACTIVITIES ---
  const openNewActivity = () => {
    setEditMode(false);
    setSelectedId(null);
    setActivityForm({
      title: '',
      category: 'Proyek Pemasangan',
      date: new Date().toISOString().split('T')[0],
      location: '',
      client: '',
      thumbnail: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&h=600&q=80',
      description: '',
      participants: '',
      capacity: '',
      isPublished: true,
      isFeatured: false,
    });
    setActiveDialog('activity');
  };

  const openEditActivity = (act: Activity) => {
    setEditMode(true);
    setSelectedId(act.id);
    setActivityForm({
      title: act.title,
      category: act.category,
      date: new Date(act.date).toISOString().split('T')[0],
      location: act.location,
      client: act.client || '',
      thumbnail: act.thumbnail,
      description: act.description,
      participants: act.participants ? String(act.participants) : '',
      capacity: act.capacity || '',
      isPublished: act.isPublished,
      isFeatured: act.isFeatured,
    });
    setActiveDialog('activity');
  };

  const saveActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = '/api/admin/activities';
      const method = editMode ? 'PUT' : 'POST';
      const payload = editMode ? { id: selectedId, ...activityForm } : activityForm;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (editMode) {
          setActivities((prev) => prev.map((a) => (a.id === selectedId ? data.activity : a)));
        } else {
          setActivities((prev) => [data.activity, ...prev]);
        }
        setActiveDialog('none');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteActivity = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) return;
    try {
      const res = await fetch(`/api/admin/activities?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setActivities((prev) => prev.filter((a) => a.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- 3. TESTIMONIALS ---
  const openNewTestimonial = () => {
    setEditMode(false);
    setSelectedId(null);
    setTestimonialForm({
      name: '',
      position: '',
      company: '',
      rating: 5,
      content: '',
      isActive: true,
    });
    setActiveDialog('testimonial');
  };

  const openEditTestimonial = (test: Testimonial) => {
    setEditMode(true);
    setSelectedId(test.id);
    setTestimonialForm({
      name: test.name,
      position: test.position,
      company: test.company || '',
      rating: test.rating,
      content: test.content,
      isActive: test.isActive,
    });
    setActiveDialog('testimonial');
  };

  const saveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = '/api/admin/testimonials';
      const method = editMode ? 'PUT' : 'POST';
      const payload = editMode ? { id: selectedId, ...testimonialForm } : testimonialForm;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (editMode) {
          setTestimonials((prev) => prev.map((t) => (t.id === selectedId ? data.testimonial : t)));
        } else {
          setTestimonials((prev) => [data.testimonial, ...prev]);
        }
        setActiveDialog('none');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- 4. CONTACT INQUIRIES ---
  const updateInquiryStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm('Hapus inquiry data ini dari database?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- 5. GLOBAL SETTINGS ---
  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm),
      });

      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        alert('Pengaturan global berhasil disimpan.');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header bar - responsive tweaks */}
      <header className="bg-strum-dark border-b border-strum-dark-ter px-4 sm:px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-strum-orange flex items-center justify-center text-white shrink-0">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
          </div>
          <div>
            <h1 className="text-sm sm:text-lg font-bold tracking-tight">STRUM <span className="hidden xs:inline">TECHNOLOGY</span></h1>
            <span className="text-[9px] text-strum-text-muted font-bold tracking-widest uppercase">CMS PANEL</span>
          </div>
        </div>
 
        {/* User profile & Logout */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-bold text-white">Halo, {user.username}</span>
            <span className="text-[9px] text-strum-orange font-semibold tracking-wider uppercase">{user.role}</span>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-strum-text-sec hover:text-white hover:bg-strum-orange/15 transition-all text-xs px-2.5 sm:px-4"
          >
            <span className="hidden sm:inline mr-2">Keluar Panel</span>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col gap-6">
          
          {/* Mobile Tab Dropdown Selector */}
          <div className="relative md:hidden w-full">
            <button
              onClick={() => setIsTabDropdownOpen(!isTabDropdownOpen)}
              className="w-full bg-strum-dark-sec border border-strum-dark-ter hover:border-strum-orange/40 rounded-xl px-4 py-3.5 flex items-center justify-between text-white font-bold text-sm transition-all shadow-lg cursor-pointer outline-none"
            >
              <div className="flex items-center gap-2">
                {activeTab === 'overview' && <LayoutGrid className="w-4 h-4 text-strum-orange" />}
                {activeTab === 'services' && <FileText className="w-4 h-4 text-strum-orange" />}
                {activeTab === 'activities' && <Calendar className="w-4 h-4 text-strum-orange" />}
                {activeTab === 'testimonials' && <Users className="w-4 h-4 text-strum-orange" />}
                {activeTab === 'inquiries' && <MessageSquare className="w-4 h-4 text-strum-orange" />}
                {activeTab === 'settings' && <Settings className="w-4 h-4 text-strum-orange" />}
                
                <span>
                  {activeTab === 'overview' && 'Ringkasan'}
                  {activeTab === 'services' && 'Layanan'}
                  {activeTab === 'activities' && 'Kegiatan'}
                  {activeTab === 'testimonials' && 'Testimoni'}
                  {activeTab === 'inquiries' && 'Inquiry'}
                  {activeTab === 'settings' && 'Pengaturan'}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isTabDropdownOpen ? 'rotate-180 text-strum-orange' : ''}`} />
            </button>
            
            {isTabDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-strum-dark/95 border border-white/10 rounded-2xl p-2 shadow-2xl z-40 flex flex-col gap-1 backdrop-blur-md">
                {[
                  { val: 'overview', label: 'Ringkasan', icon: <LayoutGrid className="w-4 h-4" /> },
                  { val: 'services', label: 'Layanan', icon: <FileText className="w-4 h-4" /> },
                  { val: 'activities', label: 'Kegiatan', icon: <Calendar className="w-4 h-4" /> },
                  { val: 'testimonials', label: 'Testimoni', icon: <Users className="w-4 h-4" /> },
                  {
                    val: 'inquiries',
                    label: 'Inquiry',
                    icon: <MessageSquare className="w-4 h-4" />,
                    count: inquiries.filter((inq) => inq.status === 'NEW').length,
                  },
                  { val: 'settings', label: 'Pengaturan', icon: <Settings className="w-4 h-4" /> },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => {
                      setActiveTab(opt.val);
                      setIsTabDropdownOpen(false);
                    }}
                    className={`w-full text-left font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-between transition-colors cursor-pointer border-none outline-none ${
                      activeTab === opt.val
                        ? 'bg-strum-orange text-white'
                        : 'bg-transparent text-strum-text-sec hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {opt.icon}
                      <span>{opt.label}</span>
                    </div>
                    {opt.count && opt.count > 0 ? (
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        activeTab === opt.val ? 'bg-white text-strum-orange' : 'bg-strum-orange text-white'
                      }`}>
                        {opt.count}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            )}
          </div>
 
          {/* Desktop Tabs List - hidden on mobile */}
          <TabsList className="hidden md:flex bg-strum-dark-sec border border-strum-dark-ter h-auto gap-1.5 p-1 rounded-xl w-fit">
            <TabsTrigger value="overview" className="text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-lg data-[state=active]:bg-strum-orange data-[state=active]:text-white">
              <LayoutGrid className="w-3.5 h-3.5 mr-2" />
              Ringkasan
            </TabsTrigger>
            <TabsTrigger value="services" className="text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-lg data-[state=active]:bg-strum-orange data-[state=active]:text-white">
              <FileText className="w-3.5 h-3.5 mr-2" />
              Layanan
            </TabsTrigger>
            <TabsTrigger value="activities" className="text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-lg data-[state=active]:bg-strum-orange data-[state=active]:text-white">
              <Calendar className="w-3.5 h-3.5 mr-2" />
              Kegiatan
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-lg data-[state=active]:bg-strum-orange data-[state=active]:text-white">
              <Users className="w-3.5 h-3.5 mr-2" />
              Testimoni
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-lg data-[state=active]:bg-strum-orange data-[state=active]:text-white">
              <MessageSquare className="w-3.5 h-3.5 mr-2" />
              Inquiry
              {inquiries.filter((inq) => inq.status === 'NEW').length > 0 && (
                <span className="ml-1.5 bg-strum-orange text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {inquiries.filter((inq) => inq.status === 'NEW').length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-lg data-[state=active]:bg-strum-orange data-[state=active]:text-white">
              <Settings className="w-3.5 h-3.5 mr-2" />
              Pengaturan
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: OVERVIEW */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-strum-dark-sec border-strum-dark-ter">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-strum-text-muted uppercase">Total Layanan</span>
                    <FileText className="w-5 h-5 text-strum-orange" />
                  </div>
                  <span className="text-3xl font-extrabold">{services.length}</span>
                </CardContent>
              </Card>

              <Card className="bg-strum-dark-sec border-strum-dark-ter">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-strum-text-muted uppercase">Total Kegiatan</span>
                    <Calendar className="w-5 h-5 text-strum-orange" />
                  </div>
                  <span className="text-3xl font-extrabold">{activities.length}</span>
                </CardContent>
              </Card>

              <Card className="bg-strum-dark-sec border-strum-dark-ter">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-strum-text-muted uppercase">Total Testimoni</span>
                    <Users className="w-5 h-5 text-strum-orange" />
                  </div>
                  <span className="text-3xl font-extrabold">{testimonials.length}</span>
                </CardContent>
              </Card>

              <Card className="bg-strum-dark-sec border-strum-dark-ter">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-strum-text-muted uppercase">Inquiry Masuk</span>
                    <MessageSquare className="w-5 h-5 text-strum-orange" />
                  </div>
                  <span className="text-3xl font-extrabold">{inquiries.length}</span>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-strum-dark-sec border-strum-dark-ter">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-strum-orange" />
                  Pemberitahuan Sistem & Keamanan
                </CardTitle>
                <CardDescription className="text-strum-text-muted">Status database dan environment saat ini.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between border-b border-strum-dark-ter pb-2">
                  <span className="text-strum-text-sec">DBMS Driver</span>
                  <span className="font-semibold text-white">MySQL (XAMPP localhost)</span>
                </div>
                <div className="flex justify-between border-b border-strum-dark-ter pb-2">
                  <span className="text-strum-text-sec">Prisma ORM Client</span>
                  <span className="font-semibold text-emerald-400">Tersinkronisasi & Terhubung</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-strum-text-sec">Keamanan Sesi</span>
                  <span className="font-semibold text-strum-orange">Aktif (Cookie secure 8 jam)</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: SERVICES */}
          <TabsContent value="services" className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Daftar Layanan Kelistrikan</h2>
              <Button onClick={openNewService} className="bg-strum-orange hover:bg-strum-orange-dark text-white cursor-pointer">
                <Plus className="w-4 h-4 mr-2" /> Layanan Baru
              </Button>
            </div>

            <Card className="bg-strum-dark-sec border-strum-dark-ter overflow-hidden">
              <div className="overflow-x-auto w-full">
                <Table>
                <TableHeader className="bg-black/20">
                  <TableRow className="border-strum-dark-ter hover:bg-transparent">
                    <TableHead className="text-strum-text-muted font-bold w-12 text-center">No</TableHead>
                    <TableHead className="text-strum-text-muted font-bold">Layanan</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-20 text-center">Urutan</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-24 text-center">Status</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-28 text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((svc, idx) => (
                    <TableRow key={svc.id} className="border-strum-dark-ter hover:bg-white/5">
                      <TableCell className="text-center font-medium text-strum-text-muted">{idx + 1}</TableCell>
                      <TableCell className="font-bold text-white">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded bg-strum-orange/10 flex items-center justify-center text-strum-orange">📦</span>
                          {svc.title}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{svc.order}</TableCell>
                      <TableCell className="text-center">
                        {svc.isActive ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-500/10 rounded-full">
                            <CheckCircle className="w-3.5 h-3.5" /> Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-red-400 font-semibold px-2 py-0.5 bg-red-500/10 rounded-full">
                            <XCircle className="w-3.5 h-3.5" /> Nonaktif
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button size="icon" variant="ghost" onClick={() => openEditService(svc)} className="text-strum-text-sec hover:text-white hover:bg-strum-dark">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => deleteService(svc.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          </TabsContent>

          {/* TAB 3: ACTIVITIES */}
          <TabsContent value="activities" className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Daftar Aktivitas & Proyek</h2>
              <Button onClick={openNewActivity} className="bg-strum-orange hover:bg-strum-orange-dark text-white cursor-pointer">
                <Plus className="w-4 h-4 mr-2" /> Kegiatan Baru
              </Button>
            </div>

            <Card className="bg-strum-dark-sec border-strum-dark-ter overflow-hidden">
              <div className="overflow-x-auto w-full">
                <Table>
                <TableHeader className="bg-black/20">
                  <TableRow className="border-strum-dark-ter hover:bg-transparent">
                    <TableHead className="text-strum-text-muted font-bold w-12 text-center">No</TableHead>
                    <TableHead className="text-strum-text-muted font-bold">Kegiatan / Proyek</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-40">Kategori</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-32">Lokasi</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-20 text-center">Unggul</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-20 text-center">Publish</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-28 text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((act, idx) => (
                    <TableRow key={act.id} className="border-strum-dark-ter hover:bg-white/5">
                      <TableCell className="text-center font-medium text-strum-text-muted">{idx + 1}</TableCell>
                      <TableCell className="font-bold text-white">{act.title}</TableCell>
                      <TableCell>{act.category}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-strum-orange" />
                          {act.location}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">{act.isFeatured ? '⭐ Ya' : 'Tidak'}</TableCell>
                      <TableCell className="text-center">{act.isPublished ? '✅' : '❌'}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button size="icon" variant="ghost" onClick={() => openEditActivity(act)} className="text-strum-text-sec hover:text-white hover:bg-strum-dark">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => deleteActivity(act.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          </TabsContent>

          {/* TAB 4: TESTIMONIALS */}
          <TabsContent value="testimonials" className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Ulasan & Testimoni Pelanggan</h2>
              <Button onClick={openNewTestimonial} className="bg-strum-orange hover:bg-strum-orange-dark text-white cursor-pointer">
                <Plus className="w-4 h-4 mr-2" /> Testimoni Baru
              </Button>
            </div>

            <Card className="bg-strum-dark-sec border-strum-dark-ter overflow-hidden">
              <div className="overflow-x-auto w-full">
                <Table>
                <TableHeader className="bg-black/20">
                  <TableRow className="border-strum-dark-ter hover:bg-transparent">
                    <TableHead className="text-strum-text-muted font-bold w-12 text-center">No</TableHead>
                    <TableHead className="text-strum-text-muted font-bold">Nama Klien</TableHead>
                    <TableHead className="text-strum-text-muted font-bold">Perusahaan / Jabatan</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-24 text-center">Bintang</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-24 text-center">Status</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-28 text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((test, idx) => (
                    <TableRow key={test.id} className="border-strum-dark-ter hover:bg-white/5">
                      <TableCell className="text-center font-medium text-strum-text-muted">{idx + 1}</TableCell>
                      <TableCell className="font-bold text-white">{test.name}</TableCell>
                      <TableCell>{test.position} {test.company ? `— ${test.company}` : ''}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center items-center gap-0.5 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold">{test.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{test.isActive ? '✅ Aktif' : '❌'}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button size="icon" variant="ghost" onClick={() => openEditTestimonial(test)} className="text-strum-text-sec hover:text-white hover:bg-strum-dark">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => deleteTestimonial(test.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          </TabsContent>

          {/* TAB 5: INQUIRIES */}
          <TabsContent value="inquiries" className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Pesan Inquiry Masuk</h2>

            <Card className="bg-strum-dark-sec border-strum-dark-ter overflow-hidden">
              <div className="overflow-x-auto w-full">
                <Table>
                <TableHeader className="bg-black/20">
                  <TableRow className="border-strum-dark-ter hover:bg-transparent">
                    <TableHead className="text-strum-text-muted font-bold w-40">Tanggal & Pengirim</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-40">Kontak Info</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-48">Layanan & Kota</TableHead>
                    <TableHead className="text-strum-text-muted font-bold">Pesan</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-24 text-center">Status</TableHead>
                    <TableHead className="text-strum-text-muted font-bold w-24 text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inq) => (
                    <TableRow key={inq.id} className="border-strum-dark-ter hover:bg-white/5 align-top">
                      <TableCell className="font-semibold text-white py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-normal text-strum-text-muted">
                            {new Date(inq.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <span>{inq.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-xs">
                        <div className="flex flex-col gap-1">
                          <span>📧 {inq.email}</span>
                          <span>📞 {inq.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-xs font-semibold text-white">
                        <div className="flex flex-col gap-1">
                          <span className="text-strum-orange">{inq.serviceType}</span>
                          <span className="font-normal text-strum-text-muted">Domisili: {inq.city}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-xs leading-relaxed text-strum-text-sec max-w-sm whitespace-pre-wrap">{inq.message}</TableCell>
                      <TableCell className="py-4 text-center">
                        {inq.status === 'NEW' ? (
                          <button
                            onClick={() => updateInquiryStatus(inq.id, 'READ')}
                            className="text-[10px] font-bold bg-strum-orange text-white px-2 py-1 rounded-full cursor-pointer hover:bg-strum-orange-dark transition-all"
                          >
                            NEW
                          </button>
                        ) : (
                          <span className="text-[10px] font-bold bg-strum-dark border border-strum-dark-ter text-strum-text-muted px-2 py-1 rounded-full">
                            READ
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-4 text-center">
                        <Button size="icon" variant="ghost" onClick={() => deleteInquiry(inq.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          </TabsContent>

          {/* TAB 6: SETTINGS */}
          <TabsContent value="settings">
            <Card className="bg-strum-dark-sec border-strum-dark-ter">
              <CardHeader>
                <CardTitle className="text-white">Pengaturan Profil Perusahaan</CardTitle>
                <CardDescription className="text-strum-text-muted">Perbarui teks banner, tagline, kontak, dan statistik website.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={saveSettings} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">Nama Resmi Perusahaan</Label>
                      <Input
                        value={settingsForm.companyName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                        className="bg-strum-dark/50 border-strum-dark-ter"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">Tagline Perusahaan</Label>
                      <Input
                        value={settingsForm.tagline}
                        onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                        className="bg-strum-dark/50 border-strum-dark-ter"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-semibold">Judul Banner Homepage (Hero)</Label>
                    <Input
                      value={settingsForm.heroTitle}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                      className="bg-strum-dark/50 border-strum-dark-ter"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-semibold">Subjudul Banner (Hero)</Label>
                    <textarea
                      rows={3}
                      value={settingsForm.heroSubtitle}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                      className="w-full p-3 rounded-md bg-strum-dark/50 border border-strum-dark-ter text-sm outline-none focus:border-strum-orange"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">Telepon Kantor</Label>
                      <Input
                        value={settingsForm.contactPhone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                        className="bg-strum-dark/50 border-strum-dark-ter"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">Email Kontak</Label>
                      <Input
                        value={settingsForm.contactEmail}
                        onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                        className="bg-strum-dark/50 border-strum-dark-ter"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">No WA Chat (Kode Negara)</Label>
                      <Input
                        value={settingsForm.whatsappNumber}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                        className="bg-strum-dark/50 border-strum-dark-ter"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-semibold">Alamat Kantor Lengkap</Label>
                    <textarea
                      rows={2}
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full p-3 rounded-md bg-strum-dark/50 border border-strum-dark-ter text-sm outline-none focus:border-strum-orange"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">Stat: Proyek Selesai</Label>
                      <Input
                        type="number"
                        value={settingsForm.statsProjects}
                        onChange={(e) => setSettingsForm({ ...settingsForm, statsProjects: Number(e.target.value) })}
                        className="bg-strum-dark/50 border-strum-dark-ter"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">Stat: Kapasitas PLTS</Label>
                      <Input
                        value={settingsForm.statsCapacity}
                        onChange={(e) => setSettingsForm({ ...settingsForm, statsCapacity: e.target.value })}
                        className="bg-strum-dark/50 border-strum-dark-ter"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">Stat: Tahun Pengalaman</Label>
                      <Input
                        type="number"
                        value={settingsForm.statsYears}
                        onChange={(e) => setSettingsForm({ ...settingsForm, statsYears: Number(e.target.value) })}
                        className="bg-strum-dark/50 border-strum-dark-ter"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">Stat: Klien Puas</Label>
                      <Input
                        type="number"
                        value={settingsForm.statsClients}
                        onChange={(e) => setSettingsForm({ ...settingsForm, statsClients: Number(e.target.value) })}
                        className="bg-strum-dark/50 border-strum-dark-ter"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="bg-strum-orange hover:bg-strum-orange-dark text-white font-bold py-3 mt-4 w-fit px-8 cursor-pointer">
                    Simpan Semua Pengaturan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* --- DIALOG MODALS FOR CRUD --- */}
      {/* 1. SERVICE DIALOG */}
      <Dialog open={activeDialog === 'service'} onOpenChange={() => setActiveDialog('none')}>
        <DialogContent className="bg-strum-dark-sec border-strum-dark-ter text-white max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit Layanan' : 'Layanan Baru'}</DialogTitle>
            <DialogDescription className="text-strum-text-muted">Isi detail lengkap untuk dipublikasikan.</DialogDescription>
          </DialogHeader>
          <form onSubmit={saveService} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Nama Layanan</Label>
              <Input
                value={serviceForm.title}
                onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                className="bg-strum-dark/50 border-strum-dark-ter text-white"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Nama Ikon Lucide (contoh: Home, Zap, Wrench)</Label>
                <Input
                  value={serviceForm.icon}
                  onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                  className="bg-strum-dark/50 border-strum-dark-ter text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Urutan Tampil (Order)</Label>
                <Input
                  type="number"
                  value={serviceForm.order}
                  onChange={(e) => setServiceForm({ ...serviceForm, order: Number(e.target.value) })}
                  className="bg-strum-dark/50 border-strum-dark-ter text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Deskripsi Singkat (Max 150 Karakter)</Label>
              <textarea
                rows={2}
                value={serviceForm.shortDescription}
                onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                className="w-full p-2.5 rounded bg-strum-dark/50 border border-strum-dark-ter text-sm outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Deskripsi Detail (Full HTML/Markdown Teks)</Label>
              <textarea
                rows={5}
                value={serviceForm.fullDescription}
                onChange={(e) => setServiceForm({ ...serviceForm, fullDescription: e.target.value })}
                className="w-full p-2.5 rounded bg-strum-dark/50 border border-strum-dark-ter text-sm outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Gambar Sampul URL</Label>
              <Input
                value={serviceForm.coverImage}
                onChange={(e) => setServiceForm({ ...serviceForm, coverImage: e.target.value })}
                className="bg-strum-dark/50 border-strum-dark-ter text-white"
                required
              />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="isActive"
                checked={serviceForm.isActive}
                onChange={(e) => setServiceForm({ ...serviceForm, isActive: e.target.checked })}
                className="w-4 h-4 text-strum-orange bg-strum-dark border-strum-dark-ter"
              />
              <Label htmlFor="isActive">Publikasikan Layanan (Aktif)</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setActiveDialog('none')} className="border-strum-dark-ter">Batal</Button>
              <Button type="submit" className="bg-strum-orange hover:bg-strum-orange-dark text-white">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. ACTIVITY DIALOG */}
      <Dialog open={activeDialog === 'activity'} onOpenChange={() => setActiveDialog('none')}>
        <DialogContent className="bg-strum-dark-sec border-strum-dark-ter text-white max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit Kegiatan / Proyek' : 'Kegiatan / Proyek Baru'}</DialogTitle>
            <DialogDescription className="text-strum-text-muted">Isi detail lengkap untuk dipublikasikan.</DialogDescription>
          </DialogHeader>
          <form onSubmit={saveActivity} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Judul Kegiatan</Label>
              <Input
                value={activityForm.title}
                onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                className="bg-strum-dark/50 border-strum-dark-ter text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Kategori</Label>
                <select
                  value={activityForm.category}
                  onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })}
                  className="h-10 px-2 rounded bg-strum-dark/50 border border-strum-dark-ter text-white text-sm"
                >
                  <option value="Proyek Pemasangan">Proyek Pemasangan</option>
                  <option value="Workshop & Training">Workshop & Training</option>
                  <option value="Seminar & Pameran">Seminar & Pameran</option>
                  <option value="CSR & Sosial">CSR & Sosial</option>
                  <option value="Factory Visit">Factory Visit</option>
                  <option value="Sertifikasi">Sertifikasi</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Tanggal Pelaksanaan</Label>
                <Input
                  type="date"
                  value={activityForm.date}
                  onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                  className="bg-strum-dark/50 border-strum-dark-ter text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Lokasi (Kota)</Label>
                <Input
                  value={activityForm.location}
                  onChange={(e) => setActivityForm({ ...activityForm, location: e.target.value })}
                  className="bg-strum-dark/50 border-strum-dark-ter text-white"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Klien / Instansi (Opsional)</Label>
                <Input
                  value={activityForm.client}
                  onChange={(e) => setActivityForm({ ...activityForm, client: e.target.value })}
                  className="bg-strum-dark/50 border-strum-dark-ter text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Kapasitas Terpasang (misal: 200 kWp)</Label>
                <Input
                  value={activityForm.capacity}
                  onChange={(e) => setActivityForm({ ...activityForm, capacity: e.target.value })}
                  className="bg-strum-dark/50 border-strum-dark-ter text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Jumlah Peserta (Edukasi / CSR)</Label>
                <Input
                  type="number"
                  value={activityForm.participants}
                  onChange={(e) => setActivityForm({ ...activityForm, participants: e.target.value })}
                  className="bg-strum-dark/50 border-strum-dark-ter text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Gambar Thumbnail URL</Label>
              <Input
                value={activityForm.thumbnail}
                onChange={(e) => setActivityForm({ ...activityForm, thumbnail: e.target.value })}
                className="bg-strum-dark/50 border-strum-dark-ter text-white"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Deskripsi Kegiatan</Label>
              <textarea
                rows={5}
                value={activityForm.description}
                onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                className="w-full p-2.5 rounded bg-strum-dark/50 border border-strum-dark-ter text-sm outline-none"
                required
              />
            </div>

            <div className="flex gap-6 items-center py-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={activityForm.isPublished}
                  onChange={(e) => setActivityForm({ ...activityForm, isPublished: e.target.checked })}
                  className="w-4 h-4 text-strum-orange bg-strum-dark border-strum-dark-ter"
                />
                <Label htmlFor="isPublished">Publikasikan Proyek</Label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={activityForm.isFeatured}
                  onChange={(e) => setActivityForm({ ...activityForm, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-strum-orange bg-strum-dark border-strum-dark-ter"
                />
                <Label htmlFor="isFeatured">Tampilkan di Homepage</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setActiveDialog('none')} className="border-strum-dark-ter">Batal</Button>
              <Button type="submit" className="bg-strum-orange hover:bg-strum-orange-dark text-white">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 3. TESTIMONIAL DIALOG */}
      <Dialog open={activeDialog === 'testimonial'} onOpenChange={() => setActiveDialog('none')}>
        <DialogContent className="bg-strum-dark-sec border-strum-dark-ter text-white max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit Testimoni' : 'Testimoni Baru'}</DialogTitle>
            <DialogDescription className="text-strum-text-muted">Masukkan detail ulasan klien.</DialogDescription>
          </DialogHeader>
          <form onSubmit={saveTestimonial} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Nama Klien</Label>
              <Input
                value={testimonialForm.name}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                className="bg-strum-dark/50 border-strum-dark-ter text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Jabatan / Posisi</Label>
                <Input
                  value={testimonialForm.position}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, position: e.target.value })}
                  className="bg-strum-dark/50 border-strum-dark-ter text-white"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Perusahaan (Opsional)</Label>
                <Input
                  value={testimonialForm.company}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                  className="bg-strum-dark/50 border-strum-dark-ter text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Rating Bintang (1–5)</Label>
              <select
                value={testimonialForm.rating}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                className="h-10 px-2 rounded bg-strum-dark/50 border border-strum-dark-ter text-white text-sm"
              >
                <option value="5">5 Bintang (Sangat Puas)</option>
                <option value="4">4 Bintang (Puas)</option>
                <option value="3">3 Bintang (Cukup)</option>
                <option value="2">2 Bintang (Kurang)</option>
                <option value="1">1 Bintang (Kecewa)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Komentar Ulasan</Label>
              <textarea
                rows={4}
                value={testimonialForm.content}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                className="w-full p-2.5 rounded bg-strum-dark/50 border border-strum-dark-ter text-sm outline-none"
                required
              />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="isTestimonialActive"
                checked={testimonialForm.isActive}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, isActive: e.target.checked })}
                className="w-4 h-4 text-strum-orange bg-strum-dark border-strum-dark-ter"
              />
              <Label htmlFor="isTestimonialActive">Tampilkan Testimoni (Aktif)</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setActiveDialog('none')} className="border-strum-dark-ter">Batal</Button>
              <Button type="submit" className="bg-strum-orange hover:bg-strum-orange-dark text-white">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
