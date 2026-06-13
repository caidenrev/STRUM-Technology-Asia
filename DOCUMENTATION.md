# DOKUMENTASI PROYEK LENGKAP: STRUM TECHNOLOGY ASIA
## Company Profile Website & Integrated CMS (Dengan Diagram Detail PlantUML & Panduan SDLC)

Dokumen ini merupakan panduan arsitektur komprehensif, aliran pengguna (*user flow*), dokumentasi sistem, pemetaan database, diagram interaksi, serta panduan siklus hidup pengembangan sistem (*SDLC*) untuk proyek **Strum Technology Asia**. Semua diagram dalam dokumen ini menggunakan spesifikasi **PlantUML** dan disajikan dalam **Bahasa Indonesia**.

---

## 1. RINGKASAN TEKNOLOGI (TECH STACK)

Aplikasi ini menggunakan pendekatan modern web development untuk menjamin performa tinggi, optimasi SEO, dan pengalaman pengguna yang interaktif.

- **Frontend Core:** Next.js 16 (App Router), React 19, TypeScript 5
- **Styling & Design System:** Tailwind CSS v4, Base UI, tw-animate-css
- **Animasi:** Framer Motion 12
- **Ikon:** Lucide React
- **ORM & Database:** Prisma ORM dengan Driver MySQL (`mysql2`)
- **Autentikasi Admin:** Cookie-based Session dengan enkripsi JWT kustom & password hashing menggunakan `bcryptjs`
- **Deployment:** Vercel (Frontend/API) + Cloud Database (MySQL)

---

## 2. ARSITEKTUR SISTEM & DIAGRAM USE CASE

### A. Diagram Use Case (Peran & Fitur Sistem)
Sistem membedakan hak akses dan fungsionalitas berdasarkan tiga peran utama: **Pengunjung Umum**, **Admin/Editor**, dan **Super Admin**.

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Pengunjung Umum" as user
actor "Content Editor / Admin" as editor
actor "Super Admin" as superadmin

rectangle "Website & CMS Strum Technology Asia" {
    usecase "Melihat Beranda & Statistik" as UC_ViewHome
    usecase "Membaca Layanan & Detail Layanan" as UC_ViewService
    usecase "Melihat Kegiatan & Portofolio" as UC_ViewActivity
    usecase "Mengirim Form Kontak / Inquiry" as UC_SubmitInquiry
    
    usecase "Login Admin" as UC_Login
    usecase "Mengelola Layanan (CRUD)" as UC_ManageService
    usecase "Mengelola Kegiatan (CRUD)" as UC_ManageActivity
    usecase "Mengelola Testimonial (CRUD)" as UC_ManageTestimonial
    usecase "Membaca & Memproses Kontak Inquiry" as UC_ViewInquiry
    usecase "Mengubah Konfigurasi Global & SEO" as UC_ManageSettings
    usecase "Mengelola Pengguna Admin (CRUD)" as UC_ManageUser
}

user --> UC_ViewHome
user --> UC_ViewService
user --> UC_ViewActivity
user --> UC_SubmitInquiry

editor --> UC_Login
editor --> UC_ManageService
editor --> UC_ManageActivity
editor --> UC_ManageTestimonial
editor --> UC_ViewInquiry
editor --> UC_ManageSettings

superadmin --> editor
superadmin --> UC_ManageUser
@enduml
```

---

### B. High-Level System Architecture (Arsitektur Sistem Tingkat Tinggi)
Aplikasi ini menggunakan arsitektur Jamstack modern dengan Next.js App Router. Keamanan rute admin dikontrol langsung di tingkat Edge melalui Middleware Next.js.

```plantuml
@startuml
package "Browser Klien" {
    actor "Pengunjung" as visitor
    actor "Administrator" as admin
}

package "Aplikasi Next.js 16" {
    component "Router Aplikasi Publik\n(Halaman Publik/Pemasaran)" as public_app
    component "Router Aplikasi Admin\n(Panel CMS)" as admin_app
    component "Middleware\n(Pemeriksaan Sesi Edge)" as middleware
    component "Rute API\n(/api/*)" as api
}

database "Basis Data MySQL" as db

visitor --> public_app : HTTP GET
admin --> middleware : Mengakses /admin
middleware --> admin_app : [Cookie Valid]
middleware --> admin : [Cookie Tidak Valid] Alihkan ke Login

public_app --> api : membaca/mengirim data
admin_app --> api : Permintaan CRUD
api --> db : Klien Prisma
@enduml
```

---

## 3. DIAGRAM USER FLOW (ALUR PENGGUNA)

### A. User Flow Pengunjung Umum (Halaman Publik)
Alur ketika pengunjung mencari informasi layanan, membaca detail, hingga mengirimkan pesan pertanyaan.

```plantuml
@startuml
start
:Pengunjung Masuk Website;
:Halaman Beranda (/);
split
    :Pilih Menu Layanan;
    :Daftar Layanan (/layanan);
    :Klik Detail Layanan;
    :Detail Layanan (/layanan/:slug);
    :Klik Hubungi Kami;
split again
    :Pilih Menu Kegiatan;
    :Daftar Kegiatan (/kegiatan);
    :Filter/Cari Kategori;
    :Klik Kegiatan;
    :Detail Kegiatan (/kegiatan/:slug);
split again
    :Pilih Menu Tentang Kami;
    :Tentang Kami (/tentang-kami);
split again
    :Pilih Menu Kontak;
end split

:Halaman Kontak (/kontak);
repeat
    :Isi Form Kontak\n(Nama, Email, Telp, Layanan, Pesan);
    :Klik Submit;
backward:Tampilkan Error Validasi;
repeat while (Validasi Input?) is (Gagal) not (Sukses)

:Kirim POST ke /api/contact;
:Simpan ke Database (ContactInquiry);
:Tampilkan Animasi Sukses & Reset Form;
stop
@enduml
```

---

### B. User Flow Administrator (CMS Panel)
Alur masuk administrator untuk memantau pesan masuk (inquiries) dan memperbarui konten website.

```plantuml
@startuml
start
:Akses /admin;
if (Cek Cookie Session?) then (Tidak Ada Session)
    repeat
        :Halaman Login (/admin/login);
        :Input Username & Password;
        :Klik Login;
        backward:Tampilkan Pesan Error Kredensial;
    repeat while (Autentikasi Sukses?) is (Gagal) not (Sukses)
    :Set Cookie admin_session;
else (Ada Session)
endif

:Dashboard Admin CMS (/admin);
split
    :Pilih Menu Pesan Masuk;
    :Daftar Inquiry Kontak;
    :Ubah Status ke READ/RESPONDED;
split again
    :Pilih Menu Layanan;
    :Daftar Layanan;
    :Klik Tambah / Edit;
    :Isi Form Layanan;
    :Simpan & Trigger Revalidasi;
split again
    :Pilih Menu Pengaturan;
    :Form Setelan Global & SEO;
    :Simpan Perubahan;
split again
    :Pilih Menu Keluar;
    :Klik Logout;
    :Hapus Cookie admin_session;
    :Redirect ke Login;
    stop
end split
stop
@enduml
```

---

## 4. DIAGRAM SIKLUS (SEQUENCE DIAGRAM)

### A. Sequence Diagram: Autentikasi Admin (Login & Proteksi Route)
Menunjukkan interaksi antara Administrator, Browser/Client, Next.js Middleware, API Login, dan Database saat proses masuk.

```plantuml
@startuml
autonumber
actor Administrator as admin
control "Klien Browser" as browser
control "Next.js Middleware" as mw
boundary "API Masuk\n(/api/admin/login)" as api
database "Basis Data\n(MySQL)" as db

admin -> browser : Akses /admin
browser -> mw : HTTP GET /admin (Tanpa Cookie)
activate mw
mw --> browser : HTTP 307 Alihkan ke /admin/login
deactivate mw

browser --> admin : Tampilkan Form Login
admin -> browser : Input Kredensial & Kirim
activate browser
browser -> api : HTTP POST /api/admin/login
activate api
api -> db : Cari Pengguna berdasarkan username
activate db
db --> api : Data Pengguna (Password Hash)
deactivate db
api -> api : Cocokkan kata sandi (bcrypt)

alt Kredensial Valid
    api -> api : Buat Token JWT
    api --> browser : HTTP 200 OK & Pasang Cookie admin_session
    browser --> admin : Alihkan ke Dashboard (/admin)
else Kredensial Tidak Valid
    api --> browser : HTTP 401 Unauthorized (Pesan Error)
    browser --> admin : Tampilkan Kesalahan Kredensial
end
deactivate api
deactivate browser
@enduml
```

---

### B. Sequence Diagram: CRUD Konten & Revalidasi Data (Contoh: Menambah Layanan Baru)
Menunjukkan bagaimana pembaruan data di CMS langsung memperbarui tampilan publik secara efisien.

```plantuml
@startuml
autonumber
actor Administrator as admin
boundary "Dashboard CMS\n(AdminDashboard)" as panel
boundary "API Layanan\n(/api/admin/services)" as api
database "Basis Data\n(MySQL)" as db
boundary "Tampilan Publik\n(/layanan)" as pub

admin -> panel : Isi Form Layanan Baru & Simpan
activate panel
panel -> api : HTTP POST /api/admin/services (Payload)
activate api
api -> db : Prisma.service.create()
activate db
db --> api : Data Layanan Berhasil Disimpan
deactivate db
api -> api : Pemicu Revalidasi (revalidatePath)
api --> panel : HTTP 201 Created (Sukses)
deactivate api
panel --> admin : Tampilkan Notifikasi Sukses & Segarkan Tabel
deactivate panel
@enduml
```

---

## 5. DIAGRAM AKTIVITAS (ACTIVITY DIAGRAM)

### A. Activity Diagram: Proses Pengiriman Inquiry Kontak
Menggambarkan logika alur kerja ketika pengunjung mengirimkan pesan melalui halaman kontak.

```plantuml
@startuml
start
:Pengunjung membuka /kontak;
:Isi Form (Nama, Email, Telepon, Layanan, Kota, Pesan);
:Klik "Kirim Pesan";

if (Validasi Client-side?) then (Tidak Valid)
    :Tampilkan Pesan Error di Form;
    stop
else (Valid)
    :Kirim HTTP POST ke /api/contact;
    if (Validasi Server-side?) then (Tidak Valid)
        :Kembalikan Status 400;
        :Tampilkan alert error ke pengguna;
        stop
    else (Valid)
        :Proses Penyimpanan Data;
        :Set status inquiry ke "NEW";
        :Kirim notifikasi / email (opsional);
        :Kirim HTTP 200 OK ke Client;
        :Reset form & Tampilkan Toast Sukses;
        stop
    endif
endif
@enduml
```

### B. Activity Diagram: Manajemen Konten CMS oleh Administrator
Menggambarkan alur kerja admin saat melakukan modifikasi data konten (CRUD) pada CMS.

```plantuml
@startuml
start
:Login & Akses Dashboard;
:Pilih Menu Koleksi (Layanan/Kegiatan/Testimonial);
:Sistem mengambil data dari Database;

split
    :Tambah Konten Baru;
    :Isi Form Data Lengkap;
    :Klik Simpan;
split again
    :Ubah/Edit Konten;
    :Sistem memuat data ke form;
    :Lakukan perubahan data;
    :Klik Simpan Perubahan;
split again
    :Hapus Konten;
    :Tampilkan dialog konfirmasi;
    if (Apakah yakin ingin menghapus?) then (Batal)
        stop
    else (Yakin)
        :Hapus dari Database;
        goto revalidate
    endif
end split

if (Validasi Form Sukses?) then (Gagal)
    :Tampilkan pesan validasi error;
    stop
else (Sukses)
    :Proses Simpan ke Database;
endif

label revalidate
:Trigger On-Demand Revalidation;
:Tampilkan notifikasi sukses & update table;
stop
@enduml
```

---

## 6. DIAGRAM KELAS (CLASS DIAGRAM)

Diagram Kelas menggambarkan hubungan antar tipe data model Prisma yang merepresentasikan entitas database, class helper untuk manajemen sesi JWT (`JWTSessionManager`), payload sesi, serta modul database client (`PrismaClient`).

```plantuml
@startuml
class User {
    +Int id
    +String username
    +String password
    +String role
    +DateTime createdAt
    +DateTime updatedAt
}

class Service {
    +Int id
    +String title
    +String slug
    +String icon
    +String shortDescription
    +String fullDescription
    +String coverImage
    +String gallery
    +String benefits
    +String faqs
    +Boolean isActive
    +Int order
    +DateTime createdAt
    +DateTime updatedAt
}

class Activity {
    +Int id
    +String title
    +String slug
    +String category
    +DateTime date
    +String location
    +String client
    +String thumbnail
    +String gallery
    +String description
    +Int participants
    +String capacity
    +Boolean isPublished
    +Boolean isFeatured
    +DateTime createdAt
    +DateTime updatedAt
}

class Testimonial {
    +Int id
    +String name
    +String position
    +String company
    +String avatar
    +Int rating
    +String content
    +Boolean isActive
    +DateTime createdAt
    +DateTime updatedAt
}

class GlobalSetting {
    +Int id
    +String companyName
    +String tagline
    +String heroTitle
    +String heroSubtitle
    +String contactPhone
    +String contactEmail
    +String whatsappNumber
    +String address
    +String socialInstagram
    +String socialLinkedIn
    +String socialYouTube
    +Int statsProjects
    +String statsCapacity
    +Int statsYears
    +Int statsClients
    +String seoTitle
    +String seoDescription
    +String ogImage
    +DateTime createdAt
    +DateTime updatedAt
}

class ContactInquiry {
    +Int id
    +String name
    +String email
    +String phone
    +String serviceType
    +String city
    +String message
    +String status
    +DateTime createdAt
}

class JWTSessionManager {
    -String SECRET_KEY
    +encrypt(payload: SessionPayload) String
    +decrypt(session: String) SessionPayload
    +createSession(userId: Int, username: String, role: String) void
    +getSession() SessionPayload
    +deleteSession() void
}

class SessionPayload {
    +Int userId
    +String username
    +String role
    +DateTime expiresAt
}

class PrismaClient {
    +user User
    +service Service
    +activity Activity
    +testimonial Testimonial
    +globalSetting GlobalSetting
    +contactInquiry ContactInquiry
}

PrismaClient --> User
PrismaClient --> Service
PrismaClient --> Activity
PrismaClient --> Testimonial
PrismaClient --> GlobalSetting
PrismaClient --> ContactInquiry
JWTSessionManager ..> SessionPayload : menggunakan
@enduml
```

---

## 7. SKEMA DATABASE (ENTITY RELATIONSHIP DIAGRAM)

Prisma ORM digunakan untuk mendefinisikan skema database MySQL. Berikut adalah relasi dan struktur tabel yang digunakan di dalam proyek dalam format PlantUML ERD:

```plantuml
@startuml
entity "User" as user {
    * id : Int <<PK>>
    --
    * username : String <<UNIQUE>>
    * password : String
    * role : String
    * createdAt : DateTime
    * updatedAt : DateTime
}

entity "Service" as service {
    * id : Int <<PK>>
    --
    * title : String
    * slug : String <<UNIQUE>>
    * icon : String
    * shortDescription : String
    * fullDescription : String
    * coverImage : String
    gallery : String
    benefits : String
    faqs : String
    * isActive : Boolean
    * order : Int
    * createdAt : DateTime
    * updatedAt : DateTime
}

entity "Activity" as activity {
    * id : Int <<PK>>
    --
    * title : String
    * slug : String <<UNIQUE>>
    * category : String
    * date : DateTime
    * location : String
    client : String
    * thumbnail : String
    gallery : String
    * description : String
    participants : Int
    capacity : String
    * isPublished : Boolean
    * isFeatured : Boolean
    * createdAt : DateTime
    * updatedAt : DateTime
}

entity "Testimonial" as testimonial {
    * id : Int <<PK>>
    --
    * name : String
    * position : String
    company : String
    avatar : String
    * rating : Int
    * content : String
    * isActive : Boolean
    * createdAt : DateTime
    * updatedAt : DateTime
}

entity "GlobalSetting" as global_setting {
    * id : Int <<PK>>
    --
    * companyName : String
    * tagline : String
    * heroTitle : String
    * heroSubtitle : String
    * contactPhone : String
    * contactEmail : String
    * whatsappNumber : String
    * address : String
    socialInstagram : String
    socialLinkedIn : String
    socialYouTube : String
    * statsProjects : Int
    * statsCapacity : String
    * statsYears : Int
    * statsClients : Int
    * seoTitle : String
    * seoDescription : String
    * ogImage : String
    * createdAt : DateTime
    * updatedAt : DateTime
}

entity "ContactInquiry" as contact_inquiry {
    * id : Int <<PK>>
    --
    * name : String
    * email : String
    * phone : String
    * serviceType : String
    * city : String
    * message : String
    * status : String
    * createdAt : DateTime
}

user ||--o{ service : "mengelola"
user ||--o{ activity : "mengelola"
user ||--o{ testimonial : "mengelola"
service ||--o{ contact_inquiry : "dirujuk oleh"
@enduml

```

---

## 8. SIKLUS HIDUP PENGEMBANGAN SISTEM (SDLC)

Proyek ini dikembangkan dengan metodologi **Agile / Scrum** yang dibagi menjadi beberapa tahapan siklus hidup pengembangan sistem (SDLC) terstruktur untuk memastikan kualitas, ketepatan waktu, dan kemudahan pemeliharaan:

### Tahap 1: Discovery, Analisis Kebutuhan & Desain (Minggu 1-2)
- **Aktivitas:** 
  - Analisis kebutuhan bisnis Strum Technology Asia berdasarkan dokumen PRD.
  - Pembuatan struktur navigasi (Sitemap), Wireframe, dan User Interface (UI) di Figma menggunakan tema gelap (*Dark Mode*) dan aksen *Strum Orange* (`#F97316`).
  - Perancangan Skema Database (ERD) dan pemetaan aset gambar/video.
- **Deliverables:** Dokumen Spesifikasi Kebutuhan, UI Mockup Figma, Skema Database Prisma.

### Tahap 2: Setup Inisiasi & Setup Environment (Minggu 3)
- **Aktivitas:**
  - Setup repository git dan inisiasi Next.js 16 menggunakan TypeScript.
  - Setup file konfigurasi database menggunakan Prisma ORM dan PostgreSQL/MySQL.
  - Setup ESLint, Prettier, Tailwind CSS, dan inisiasi pipeline CI/CD dasar pada GitHub Actions.
- **Deliverables:** Boilerplate project siap pakai dengan pipeline build sukses.

### Tahap 3: Core Development - Halaman Publik (Minggu 4-6)
- **Aktivitas:**
  - Implementasi komponen UI dasar (*reusable components*) di bawah folder `src/components/ui/` seperti Button, Card, Accordion, dan Dialog.
  - Pengembangan halaman Beranda dengan integrasi statistik interaktif, daftar layanan unggulan, testimonial carousel, dan marquee logo mitra.
  - Penerapan transisi halaman dan animasi *scroll-triggered* menggunakan Framer Motion.
  - Pembuatan halaman dinamis seperti detail layanan (`/layanan/[slug]`) dan daftar kegiatan (`/kegiatan/[slug]`).
- **Deliverables:** Seluruh halaman publik berfungsi penuh dengan data mock/dummy.

### Tahap 4: CMS & Integrasi Backend (Minggu 7)
- **Aktivitas:**
  - Pengembangan panel kontrol admin CMS (`/admin`) untuk mengelola semua koleksi konten secara real-time.
  - Pembuatan API Endpoints (`/api/admin/*`) yang mendukung operasi CRUD lengkap untuk Layanan, Kegiatan, Testimonial, dan Pengaturan Global.
  - Implementasi middleware proteksi autentikasi berbasis token JWT dan enkripsi cookie.
  - Implementasi handler formulir kontak publik ke database.
- **Deliverables:** Portal CMS admin berfungsi penuh dan terintegrasi dengan database.

### Tahap 5: Testing, QA, dan Optimasi SEO/Performa (Minggu 8)
- **Aktivitas:**
  - Pengujian fungsionalitas (UAT) di berbagai jenis perangkat (*Responsive Design Testing*: Mobile, Tablet, Desktop).
  - Audit kecepatan halaman menggunakan Google Lighthouse/PageSpeed Insights (Target Core Web Vitals LCP < 2.5s, CLS < 0.1, Score > 90).
  - Optimasi SEO: Penyusunan metadata dinamis per halaman, pembuatan sitemap.xml otomatis, dan integrasi Google Analytics.
- **Deliverables:** Hasil audit performa maksimal, sitemap valid, dan aplikasi bebas dari bug krusial.

### Tahap 6: Staging & Handover Deployment (Minggu 9)
- **Aktivitas:**
  - Deployment aplikasi ke lingkungan staging (Vercel Preview) untuk diuji secara langsung oleh stakeholders Strum Technology Asia.
  - Pelaksanaan migrasi database produksi dan inisialisasi user Super Admin pertama menggunakan script seeding.
  - Handover aplikasi, pembuatan panduan CMS, dan serah terima source code.
- **Deliverables:** Website live di domain utama produksi dan pelatihan administrasi CMS ke tim marketing selesai.

---

## 9. PANDUAN INSTALASI & PENGEMBANGAN LOKAL

### Langkah 1: Kloning & Masuk ke Folder Proyek
```bash
cd strum-technology-asia
```

### Langkah 2: Instalasi Dependensi
```bash
npm install
```

### Langkah 3: Konfigurasi Environment Variables
Buat file `.env` di dalam root folder `strum-technology-asia/` dan sesuaikan dengan database MySQL Anda:
```env
DATABASE_URL="mysql://username:password@localhost:3306/strum_db"
JWT_SECRET="isi_dengan_hash_jwt_rahasia_anda"
```

### Langkah 4: Migrasi Database & Seeding
Jalankan perintah berikut untuk menginisialisasi tabel database dan mengisi data awal (default user, setting default, layanan, dan beberapa aktivitas awal):
```bash
# Sinkronisasi skema prisma dengan database
npx prisma db push

# Menjalankan script seed untuk memasukkan data awal
npx prisma db seed
```
*Catatan:* Default user setelah seeding adalah:
- **Username:** `admin`
- **Password:** `admin123`

### Langkah 5: Jalankan Server Development
```bash
npm run dev
```
Buka browser Anda dan akses halaman di [http://localhost:3000](http://localhost:3000). Untuk mengakses admin panel CMS, silakan masuk ke [http://localhost:3000/admin](http://localhost:3000/admin).
