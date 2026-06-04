import React from 'react';
import { Target, Rocket, Shield, Award, Users, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutUsPage() {
  const timeline = [
    {
      year: '2015',
      title: 'Awal Berdiri',
      desc: 'Mulai beroperasi sebagai penyedia jasa instalasi listrik bangunan sederhana dan perbaikan panel di Jakarta.',
    },
    {
      year: '2018',
      title: 'Ekspansi Listrik Industri',
      desc: 'Mulai menangani instalasi kelistrikan skala pabrik, gudang industri berat, dan gedung bertingkat tinggi.',
    },
    {
      year: '2021',
      title: 'Divisi Energi Terbarukan',
      desc: 'Mendirikan lini bisnis pemasangan PLTS Atap (Panel Surya) residensial dan komersial dengan sertifikasi resmi.',
    },
    {
      year: '2025',
      title: 'Mencapai 2.5 MWp Kapasitas',
      desc: 'Berhasil menginstalasi total kumulatif kapasitas solar panel sebesar 2.5 MWp di seluruh Indonesia, mendukung digitalisasi & keberlanjutan.',
    },
  ];

  const values = [
    {
      title: 'Keamanan Utama (Safety First)',
      desc: 'Keselamatan adalah prioritas utama kami dalam setiap pengerjaan instalasi bertegangan listrik tinggi.',
      icon: <Shield className="w-6 h-6 text-strum-orange" />,
    },
    {
      title: 'Kualitas Premium',
      desc: 'Kami menggunakan material orisinal bersertifikat SNI/IEC dan panel surya standar Tier-1 terbaik.',
      icon: <Award className="w-6 h-6 text-strum-orange" />,
    },
    {
      title: 'Integritas & Kepercayaan',
      desc: 'Menjaga transparansi proses desain, kalkulasi penghematan energi, hingga biaya pengerjaan proyek.',
      icon: <Users className="w-6 h-6 text-strum-orange" />,
    },
    {
      title: 'Inovasi Berkelanjutan',
      desc: 'Terus mengadopsi teknologi kelistrikan cerdas dan sistem monitoring energi berbasis internet (IoT).',
      icon: <Wrench className="w-6 h-6 text-strum-orange" />,
    },
  ];

  const team = [
    {
      name: 'Ir. Hermawan Pratama',
      role: 'Chief Executive Officer',
      avatar: 'H',
    },
    {
      name: 'Aditya Wijaya, M.T.',
      role: 'Chief Technology Officer / Lead Engineer',
      avatar: 'A',
    },
    {
      name: 'Siti Rahmawati',
      role: 'Head of Operations & Project Management',
      avatar: 'S',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex flex-col gap-24 text-white">
      {/* 1. HEADER */}
      <div className="text-center flex flex-col items-center gap-4">
        <span className="text-xs font-bold text-strum-orange uppercase tracking-widest px-3 py-1 rounded-full bg-strum-orange/10">
          Tentang Kami
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Menyinari Masa Depan Dengan Energi Bersih
        </h1>
        <p className="text-strum-text-muted max-w-2xl text-base sm:text-lg">
          Strum Technology Asia adalah perusahaan solusi kelistrikan terintegrasi dan energi baru terbarukan (solar panel) terkemuka di Indonesia.
        </p>
      </div>

      {/* 2. VISI & MISI */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="bg-strum-dark-sec border-strum-dark-ter p-8 shadow-xl">
          <CardContent className="flex flex-col gap-4 p-0">
            <div className="w-12 h-12 rounded-xl bg-strum-orange/10 border border-strum-orange/20 flex items-center justify-center text-strum-orange">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Visi Kami</h2>
            <p className="text-sm text-strum-text-sec leading-relaxed">
              Menjadi mitra penyedia solusi kelistrikan dan teknologi energi terbarukan paling tepercaya dan inovatif di Asia Tenggara, demi mempercepat transisi energi bersih yang andal bagi sektor industri maupun rumah tangga.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-strum-dark-sec border-strum-dark-ter p-8 shadow-xl">
          <CardContent className="flex flex-col gap-4 p-0">
            <div className="w-12 h-12 rounded-xl bg-strum-orange/10 border border-strum-orange/20 flex items-center justify-center text-strum-orange">
              <Rocket className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Misi Kami</h2>
            <ul className="space-y-3 text-sm text-strum-text-sec list-disc pl-5 leading-relaxed">
              <li>Menghadirkan layanan desain dan pemasangan kelistrikan industri yang aman sesuai standar regulasi nasional.</li>
              <li>Menyediakan teknologi PLTS (Pembangkit Listrik Tenaga Surya) atap berkualitas tinggi dengan return on investment (ROI) yang optimal bagi klien.</li>
              <li>Memberikan edukasi dan pendampingan pemeliharaan energi berkelanjutan secara menyeluruh.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 3. TIMELINE */}
      <section className="flex flex-col gap-12">
        <h2 className="text-3xl font-bold text-center">Perjalanan Kami</h2>
        
        <div className="relative border-l border-strum-dark-ter ml-4 md:ml-32 py-4 flex flex-col gap-12">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12">
              {/* Dot */}
              <div className="absolute left-[-9px] top-1.5 w-4.5 h-4.5 rounded-full bg-strum-orange border-4 border-strum-dark" />
              
              {/* Year Label */}
              <span className="absolute left-[-70px] md:left-[-120px] top-1 text-lg font-bold text-strum-orange">
                {item.year}
              </span>

              {/* Title & Desc */}
              <div className="bg-strum-dark-sec border border-strum-dark-ter p-6 rounded-2xl max-w-2xl shadow-lg">
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-strum-text-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Nilai-Nilai Perusahaan</h2>
          <p className="text-strum-text-muted text-sm max-w-xl mx-auto">
            Prinsip yang mendasari kerja sama kami dengan klien, kualitas pengerjaan di lapangan, serta pertumbuhan tim.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-strum-dark-sec border border-strum-dark-ter p-6 rounded-2xl flex flex-col gap-4 shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-strum-orange/10 border border-strum-orange/20 flex items-center justify-center">
                {val.icon}
              </div>
              <h3 className="font-bold text-white text-base">{val.title}</h3>
              <p className="text-xs text-strum-text-muted leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TEAM */}
      <section className="flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Tim Manajemen Inti</h2>
          <p className="text-strum-text-muted text-sm max-w-xl mx-auto">
            Dipimpin oleh para profesional berpengalaman di bidang teknik elektro dan energi baru terbarukan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center max-w-4xl mx-auto w-full">
          {team.map((member, idx) => (
            <Card key={idx} className="bg-strum-dark-sec border-strum-dark-ter text-center p-8 shadow-xl">
              <CardContent className="flex flex-col items-center gap-4 p-0">
                <div className="w-20 h-20 rounded-full bg-strum-orange/15 border border-strum-orange/30 flex items-center justify-center font-bold text-strum-orange text-3xl mb-2 shadow-inner">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-white text-lg">{member.name}</h3>
                <span className="text-xs text-strum-orange font-semibold tracking-wider uppercase">{member.role}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
