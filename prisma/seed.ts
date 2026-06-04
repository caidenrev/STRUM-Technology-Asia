import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database...');
  await prisma.user.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.activity.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.globalSetting.deleteMany({});
  await prisma.contactInquiry.deleteMany({});

  console.log('Seeding admin user...');
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      role: 'Super Admin',
    },
  });
  console.log(`Seeded user: ${admin.username}`);

  console.log('Seeding services...');
  const services = [
    {
      title: 'Instalasi Panel Surya Residensial',
      slug: 'instalasi-panel-surya-residensial',
      icon: 'Home',
      shortDescription: 'Pemasangan PLTS atap untuk rumah dan apartemen guna menghemat tagihan listrik bulanan Anda.',
      fullDescription: 'Layanan pemasangan sistem Pembangkit Listrik Tenaga Surya (PLTS) Atap untuk skala residensial (rumah tinggal dan apartemen). Kami menyediakan solusi end-to-end mulai dari survei lokasi, desain sistem, perizinan net-metering PLN, instalasi fisik, hingga komisioning. Dengan PLTS residensial, Anda dapat menghemat tagihan listrik hingga 60% dan berkontribusi langsung pada pengurangan emisi karbon.',
      coverImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&h=630&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&h=400&q=80',
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&h=400&q=80'
      ]),
      benefits: JSON.stringify([
        'Mengurangi tagihan listrik bulanan hingga 60%',
        'Meningkatkan nilai properti Anda',
        'Sistem monitoring real-time berbasis aplikasi handphone',
        'Garansi panel surya hingga 25 tahun dan inverter 5 tahun'
      ]),
      faqs: JSON.stringify([
        { q: 'Apakah PLTS atap tetap menghasilkan listrik saat mendung?', a: 'Ya, panel surya tetap menghasilkan listrik saat cuaca mendung namun kapasitasnya berkurang tergantung ketebalan awan.' },
        { q: 'Berapa lama waktu pemasangan untuk rumah tinggal?', a: 'Proses instalasi fisik biasanya memakan waktu 2 hingga 4 hari kerja setelah survei kelayakan struktur atap.' }
      ]),
      isActive: true,
      order: 1,
    },
    {
      title: 'Instalasi Panel Surya Komersial',
      slug: 'instalasi-panel-surya-komersial',
      icon: 'Building2',
      shortDescription: 'Solusi PLTS skala bisnis, ruko, kantor, dan gedung untuk efisiensi operasional usaha.',
      fullDescription: 'Layanan pemasangan sistem panel surya untuk sektor komersial termasuk gedung perkantoran, ruko, pusat perbelanjaan, dan perhotelan. Kami merancang sistem terintegrasi yang memaksimalkan ROI (Return on Investment) bisnis Anda. Membantu perusahaan memenuhi target keberlanjutan (ESG) sekaligus memangkas biaya operasional tetap secara signifikan.',
      coverImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&h=630&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&h=400&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400&q=80'
      ]),
      benefits: JSON.stringify([
        'Meningkatkan efisiensi energi bangunan komersial',
        'Memenuhi komitmen ESG (Environmental, Social, and Governance)',
        'Masa balik modal (payback period) relatif cepat sekitar 4-6 tahun',
        'Layanan maintenance premium berkala'
      ]),
      faqs: JSON.stringify([
        { q: 'Apakah pemasangan ini memerlukan izin khusus?', a: 'Ya, kami membantu pengurusan izin operasi (IO) dan paralel grid ke pihak PLN sampai terbit SLO.' }
      ]),
      isActive: true,
      order: 2,
    },
    {
      title: 'Instalasi Panel Surya Industri',
      slug: 'instalasi-panel-surya-industri',
      icon: 'Factory',
      shortDescription: 'Sistem PLTS kapasitas besar untuk pabrik, gudang, dan fasilitas industri berat.',
      fullDescription: 'Solusi PLTS skala megawatt (MWp) yang dirancang khusus untuk memenuhi konsumsi energi yang sangat besar pada fasilitas manufaktur, gudang logistik, dan kawasan industri. Kami memiliki tim engineer berpengalaman untuk menjamin keandalan struktur dan kelancaran interkoneksi tegangan menengah.',
      coverImage: 'https://images.unsplash.com/photo-1540324155974-75226c3d3392?auto=format&fit=crop&w=1200&h=630&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1540324155974-75226c3d3392?auto=format&fit=crop&w=600&h=400&q=80'
      ]),
      benefits: JSON.stringify([
        'Penghematan biaya listrik skala besar (mencapai miliaran rupiah per tahun)',
        'Mengurangi jejak karbon korporasi secara drastis',
        'Desain struktur baja bersertifikasi tahan beban angin tinggi'
      ]),
      faqs: JSON.stringify([
        { q: 'Apakah atap pabrik spandek kuat menahan beban panel?', a: 'Kami melakukan analisis kekuatan struktur atap secara mendalam menggunakan software modeling sebelum pemasangan.' }
      ]),
      isActive: true,
      order: 3,
    },
    {
      title: 'Instalasi Kelistrikan Gedung',
      slug: 'instalasi-kelistrikan-gedung',
      icon: 'Cable',
      shortDescription: 'Layanan wiring, panel distribusi, sistem grounding, dan manajemen daya gedung bertingkat.',
      fullDescription: 'Layanan instalasi kelistrikan menyeluruh untuk gedung komersial, perhotelan, apartemen, dan bangunan publik. Mencakup penarikan kabel feeder, instalasi panel LVMDP & SDP, pembuatan sistem penangkal petir dan grounding terintegrasi, serta pengujian kelayakan instalasi listrik.',
      coverImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&h=630&q=80',
      gallery: JSON.stringify([]),
      benefits: JSON.stringify([
        'Instalasi sesuai standar PUIL (Persyaratan Umum Instalasi Listrik) terbaru',
        'Material kabel dan panel bersertifikasi SNI & LMK',
        'Menjamin keamanan dari bahaya korsleting dan kebakaran'
      ]),
      faqs: JSON.stringify([]),
      isActive: true,
      order: 4,
    },
    {
      title: 'Instalasi CCTV & Keamanan',
      slug: 'instalasi-cctv-dan-keamanan',
      icon: 'Camera',
      shortDescription: 'Pemasangan kamera pengawas IP, kontrol akses masuk gedung, dan sistem keamanan pintar.',
      fullDescription: 'Integrasi sistem keamanan modern untuk properti Anda. Kami menyediakan kamera CCTV IP resolusi tinggi dengan teknologi AI (face recognition, tripwire, motion detection), barrier gate, door access control, serta server perekaman terpusat yang aman.',
      coverImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&h=630&q=80',
      gallery: JSON.stringify([]),
      benefits: JSON.stringify([
        'Monitoring aman 24/7 dari smartphone atau control room',
        'Analisis pintar pendeteksi penyusup otomatis',
        'Garansi produk orisinal dari brand terkemuka'
      ]),
      faqs: JSON.stringify([]),
      isActive: true,
      order: 5,
    },
    {
      title: 'Instalasi Genset & UPS',
      slug: 'instalasi-genset-dan-ups',
      icon: 'Power',
      shortDescription: 'Solusi cadangan daya otomatis untuk menjamin kelangsungan operasional bisnis tanpa henti.',
      fullDescription: 'Kami merancang dan memasang sistem backup power otomatis menggunakan Generator Set (Genset) berkapasitas tinggi yang terintegrasi dengan Uninterruptible Power Supply (UPS) serta panel ATS/AMF. Menjamin ketika listrik PLN padam, sistem akan berpindah otomatis dalam hitungan milidetik tanpa merusak peralatan elektronik sensitif.',
      coverImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&h=630&q=80',
      gallery: JSON.stringify([]),
      benefits: JSON.stringify([
        'Sistem transisi daya otomatis (zero downtime)',
        'Perlindungan total perangkat IT dan server dari kerusakan daya',
        'Genset bersuara senyap (silent type) berkualitas premium'
      ]),
      faqs: JSON.stringify([]),
      isActive: true,
      order: 6,
    },
    {
      title: 'Konsultasi & Audit Energi',
      slug: 'konsultasi-dan-audit-energi',
      icon: 'FileSearch',
      shortDescription: 'Analisis mendalam konsumsi energi gedung Anda dan identifikasi potensi penghematan listrik.',
      fullDescription: 'Layanan audit energi profesional untuk memetakan konsumsi energi listrik pada gedung/fasilitas Anda. Kami menggunakan peralatan ukur canggih untuk menganalisis beban puncak, kualitas daya (power factor, harmonic), serta merekomendasikan langkah-langkah efisiensi energi yang terukur.',
      coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=630&q=80',
      gallery: JSON.stringify([]),
      benefits: JSON.stringify([
        'Mendapatkan laporan detail profil penggunaan listrik',
        'Rekomendasi taktis penghematan biaya listrik bulanan',
        'Mencegah denda kelebihan beban daya (KVARh) dari PLN'
      ]),
      faqs: JSON.stringify([]),
      isActive: true,
      order: 7,
    },
    {
      title: 'Maintenance & Servis',
      slug: 'maintenance-dan-servis',
      icon: 'Wrench',
      shortDescription: 'Pemeliharaan berkala untuk menjaga efisiensi panel surya dan keamanan sistem listrik.',
      fullDescription: 'Layanan pemeliharaan preventif dan korektif untuk sistem PLTS dan instalasi listrik gedung. Meliputi pencucian panel surya secara rutin, pengetesan performa inverter, inspeksi thermal koneksi kabel untuk mendeteksi hotspot, serta troubleshooting kendala listrik.',
      coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&h=630&q=80',
      gallery: JSON.stringify([]),
      benefits: JSON.stringify([
        'Menjamin efisiensi produksi daya panel surya tetap optimal',
        'Deteksi dini kerusakan komponen sebelum menjadi kerusakan parah',
        'Layanan respons darurat kendala listrik'
      ]),
      faqs: JSON.stringify([]),
      isActive: true,
      order: 8,
    }
  ];

  for (const service of services) {
    const s = await prisma.service.create({ data: service });
    console.log(`Created service: ${s.title}`);
  }

  console.log('Seeding activities...');
  const activities = [
    {
      title: 'Pemasangan PLTS Atap 200 kWp di Pabrik Tekstil Karawang',
      slug: 'pemasangan-plts-atap-pabrik-tekstil-karawang',
      category: 'Proyek Pemasangan',
      date: new Date('2025-05-15'),
      location: 'Karawang, Jawa Barat',
      client: 'PT Karawang Tekstil Utama',
      thumbnail: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&h=600&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1540324155974-75226c3d3392?auto=format&fit=crop&w=800&h=600&q=80'
      ]),
      description: 'Strum Technology Asia berhasil merancang dan menginstalasi sistem PLTS Atap berkapasitas 200 kWp di pabrik PT Karawang Tekstil Utama. Proyek ini diselesaikan dalam waktu 45 hari kerja dan diestimasikan mampu memangkas emisi karbon pabrik sebesar 240 ton CO2 per tahun.',
      participants: null,
      capacity: '200 kWp',
      isPublished: true,
      isFeatured: true,
    },
    {
      title: 'Workshop Dasar Instalasi Listrik & PLTS di SMK Negeri 2 Jakarta',
      slug: 'workshop-instalasi-listrik-plts-smk-2-jakarta',
      category: 'Workshop & Training',
      date: new Date('2025-05-28'),
      location: 'Jakarta Pusat, DKI Jakarta',
      client: 'SMK Negeri 2 Jakarta',
      thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&h=600&q=80',
      gallery: JSON.stringify([]),
      description: 'Sebagai bagian dari program CSR edukatif, tim engineer Strum Technology Asia mengadakan workshop interaktif bagi siswa kelas XI jurusan Teknik Instalasi Tenaga Listrik. Kami mengajarkan dasar-dasar kelistrikan industri dan praktik pemasangan mini-inverter panel surya.',
      participants: 50,
      capacity: null,
      isPublished: true,
      isFeatured: true,
    },
    {
      title: 'Partisipasi Strum Technology di Indo EBTKE ConEx 2025',
      slug: 'partisipasi-indoe-ebtke-conex-2025',
      category: 'Seminar & Pameran',
      date: new Date('2025-06-02'),
      location: 'ICE BSD, Tangerang',
      client: null,
      thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&h=600&q=80',
      gallery: JSON.stringify([]),
      description: 'Strum Technology Asia turut memeriahkan salah satu pameran energi terbarukan terbesar di Indonesia, Indo EBTKE ConEx 2025. Di sini kami memamerkan teknologi inverter cerdas terbaru dan menawarkan konsultasi gratis PLTS bagi sektor industri.',
      participants: 120,
      capacity: null,
      isPublished: true,
      isFeatured: true,
    },
    {
      title: 'Pemberian Bantuan Listrik & Panel Surya di Pesantren X Bogor',
      slug: 'bantuan-listrik-panel-surya-pesantren-bogor',
      category: 'CSR & Sosial',
      date: new Date('2025-04-10'),
      location: 'Bogor, Jawa Barat',
      client: 'Yayasan Bina Insani',
      thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&h=600&q=80',
      gallery: JSON.stringify([]),
      description: 'Kami mendonasikan dan menginstalasi sistem PLTS off-grid mandiri kapasitas 3 kWp untuk pesantren guna mendukung penerangan asrama dan area ibadah saat terjadi gangguan jaringan listrik utama.',
      participants: null,
      capacity: '3 kWp',
      isPublished: true,
      isFeatured: false,
    },
    {
      title: 'Factory Visit ke Pabrik Modul Surya Tier-1 di Surabaya',
      slug: 'factory-visit-pabrik-modul-surya-surabaya',
      category: 'Factory Visit',
      date: new Date('2025-03-22'),
      location: 'Surabaya, Jawa Timur',
      client: 'PT Modul Surya Indonesia',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&h=600&q=80',
      gallery: JSON.stringify([]),
      description: 'Dalam rangka menjaga kualitas produk penawaran kami, manajemen Strum Technology Asia mengunjungi fasilitas manufaktur rekanan modul surya Tier-1 di Surabaya untuk meninjau lini quality control produk.',
      participants: 8,
      capacity: null,
      isPublished: true,
      isFeatured: false,
    },
    {
      title: 'Tim Engineering Meraih Sertifikasi Kompetensi Instalatir ESDM',
      slug: 'sertifikasi-kompetensi-instalatir-esdm-2025',
      category: 'Sertifikasi',
      date: new Date('2025-02-15'),
      location: 'Bandung, Jawa Barat',
      client: 'Kementerian ESDM',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&h=600&q=80',
      gallery: JSON.stringify([]),
      description: 'Tiga orang lead engineer Strum Technology Asia resmi mendapatkan sertifikasi kompetensi keahlian instalatir listrik dan energi baru terbarukan langsung dari Kementerian Energi dan Sumber Daya Mineral (ESDM).',
      participants: 3,
      capacity: null,
      isPublished: true,
      isFeatured: false,
    }
  ];

  for (const activity of activities) {
    const act = await prisma.activity.create({ data: activity });
    console.log(`Created activity: ${act.title}`);
  }

  console.log('Seeding testimonials...');
  const testimonials = [
    {
      name: 'Budi Santoso',
      position: 'Direktur Operasional',
      company: 'PT Karawang Tekstil Utama',
      rating: 5,
      content: 'Instalasi PLTS Atap 200 kWp berjalan rapi dan profesional. Tagihan listrik pabrik kami berkurang drastis sesuai dengan proyeksi awal.',
      isActive: true,
    },
    {
      name: 'Rina Wijaya',
      position: 'Pemilik Rumah Tinggal',
      company: 'Residensial BSD City',
      rating: 5,
      content: 'Sangat puas dengan tim Strum! Penjelasan awal sangat informatif, instalasi di atap rumah saya hanya memakan waktu 3 hari dan rapi sekali.',
      isActive: true,
    },
    {
      name: 'Hendra Saputra',
      position: 'Manager Facility',
      company: 'Gedung Multi Sentosa',
      rating: 5,
      content: 'Kami menggunakan jasa Strum untuk audit energi dan penggantian panel distribusi daya gedung. Kerja cepat dan minim gangguan operasional.',
      isActive: true,
    }
  ];

  for (const testimonial of testimonials) {
    const test = await prisma.testimonial.create({ data: testimonial });
    console.log(`Created testimonial: ${test.name}`);
  }

  console.log('Seeding global settings...');
  await prisma.globalSetting.create({
    data: {
      companyName: 'Strum Technology Asia',
      tagline: 'Powering a Brighter Future',
      heroTitle: 'Solusi Kelistrikan & Energi Terbarukan Terpercaya',
      heroSubtitle: 'Kami menyediakan layanan instalasi panel surya PLTS, kelistrikan gedung, CCTV, dan backup power berkualitas tinggi untuk efisiensi energi Anda.',
      contactPhone: '+62 812-3456-7890',
      contactEmail: 'info@strumtechnology.co.id',
      whatsappNumber: '6281234567890',
      address: 'Jl. Kelistrikan No. 88, Kav. 12, Jakarta Barat, DKI Jakarta, 11520',
      socialInstagram: 'https://instagram.com/strumtechnology',
      socialLinkedIn: 'https://linkedin.com/company/strumtechnology',
      socialYouTube: 'https://youtube.com/strumtechnology',
      statsProjects: 150,
      statsCapacity: '2.5 MWp',
      statsYears: 10,
      statsClients: 200,
      seoTitle: 'Strum Technology Asia — Solusi PLTS & Listrik Industri',
      seoDescription: 'Layanan pemasangan panel surya, kelistrikan gedung bertingkat, audit energi, CCTV, genset, dan UPS terbaik untuk efisiensi listrik perusahaan Anda.',
      ogImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&h=630&q=80',
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
