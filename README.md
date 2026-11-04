# 🌿 Econnect — Platform Aplikasi Web Pengelolaan Sampah Anorganik (Balikpapan MVP)

Aplikasi web terintegrasi **Econnect**, dirancang khusus untuk memfasilitasi transaksi dan koordinasi digital antara masyarakat (penghasil sampah anorganik) dan pengelola sampah (bank sampah, pengepul, dan perusahaan daur ulang) di **Kota Balikpapan, Kalimantan Timur**.

Mengacu pada:
- **`Laporan.md`** — Rencana Bisnis Econnect (Kewirausahaan Berbasis Teknologi ITK 2026, khususnya BAB IV Analisis Produk Teknologi)
- **`WEB_PLAN.md`** — Dokumen Arsitektur & Desain UI/UX Platform Web Econnect

---

## 🌟 Fitur Lengkap Platform Econnect

### 1. Halaman Login Multi-Role (*Role-Based Auth*)
- **Masyarakat (Warga):** Akses warga untuk memesan penjemputan sampah dan cek harga. Dilengkapi tombol demo 1-klik *"Budi Santoso"*.
- **Pengelola Sampah (Mitra):** Akses pengurus bank sampah untuk mengelola pesanan penjemputan dan timbangan. Dilengkapi tombol demo 1-klik *"Bank Sampah Sampurna Berkah"* & *"Bank Sampah As-Salam"*.

### 2. Navigasi Sidebar Modern (*Sidebar Layout*)
- Tata letak sidebar di sebelah kiri dengan label peran aktif, avatar pengguna, daftar navigasi lengkap, dan tombol *Keluar / Ganti Akun*.

### 3. Modul Warga (Masyarakat Penyetor Sampah)
- **Cari Pengelola:** Filter kecamatan di Balikpapan, filter material, dan kartu profil bank sampah mitra.
- **🏷️ Jenis Sampah & Harga (BARU):** Katalog terpusat jenis sampah anorganik (Plastik PET, HDPE, Kardus Box, HVS, Kaleng Aluminium, Besi Tua, Botol Kaca) lengkap dengan rentang harga pasar di Balikpapan (Rp/kg), dampak lingkungan, dan **panduan pemilahan** yang benar sebelum dijemput.
- **Ajukan Penjemputan:** Formulir penjemputan dari rumah dengan kalkulasi perkiraan rupiah, pemilihan tanggal, dan sesi waktu penjemputan (Pagi, Siang, Sore).
- **Lacak Status Pesanan:** Pemantauan progres penjemputan 4 tahap (*Menunggu → Dikonfirmasi → Dalam Penjemputan → Selesai*) dengan kode tiket pemesanan.
- **📜 Riwayat Penjemputan (BARU):** Rekapitulasi kontribusi warga (Total kg sampah diselamatkan & Total rupiah didapat), daftar seluruh riwayat tiket, dan akses kembali ke **Struk Timbangan Digital Resmi**.
- **Tentang Econnect:** Visi, misi, profil Kelompok 4 ITK, dosen pengampu, dan dasar hukum.

### 4. Modul Pengelola (Mitra Bank Sampah / Pengepul)
- **Ringkasan Operasional:** Kartu metrik pesanan masuk, aktif dijemput, total volume sampah terkumpul (kg), dan uang disalurkan (Rp).
- **Kelola Permintaan Jemput:** Konfirmasi jadwal, tugaskan kurir, dan modal **Pencatatan Timbangan Digital Riil (kg)** saat penjemputan selesai.
- **📜 Riwayat & Pembukuan Kas (BARU):** Buku kas digital & arsip transaksi tuntas sebagai pengganti buku fisik manual (BAB III §3.1.2), pencarian tiket, dan rekapitulasi data timbangan.
- **Tarif & Jenis Sampah:** Pengaturan harga beli per kilogram secara real-time dan penambahan material baru.
- **Profil Bank Sampah:** Rincian alamat di Balikpapan, jam operasional, dan armada penjemputan.

---

## 🚀 Cara Menjalankan Aplikasi Secara Lokal

### 1. Masuk ke Folder Project
```bash
cd d:\garcia
```

### 2. Jalankan Server Dev
```bash
npm run dev
```

### 3. Akses Melalui Browser
Buka peramban di: **`http://localhost:5173/`**
