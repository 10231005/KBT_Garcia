# 📋 WEB_PLAN.md — Rencana Arsitektur & Desain Platform Web Econnect (Revisi Sistemik v3)

> **Dokumen Perencanaan Arsitektur, Fitur, dan UI/UX Platform Web Econnect**  
> **Status:** Revisi Penambahan Halaman *Jenis Sampah & Harga* serta Halaman *Riwayat Transaksi*  
> **Tanggal Pembaruan:** 1 November 2026  
> **Fokus Revisi:** Penambahan 2 halaman khusus:
> 1. **Halaman Jenis Sampah & Harga:** Katalog terpusat jenis sampah anorganik Balikpapan, rentang tarif pasar (Rp/kg), dan panduan pemilahan material (BAB I §1.1 & BAB III §3.1.4).
> 2. **Halaman Riwayat Transaksi (History):** Buku kas digital & riwayat penjemputan warga serta rekapitulasi timbangan bank sampah (BAB III §3.1.2 & BAB IX §9.3).

---

## Daftar Isi

- [A. Project Overview](#a-project-overview)
- [B. Content Analysis Berdasarkan BAB IV Laporan.md](#b-content-analysis-berdasarkan-bab-iv-laporanmd)
- [C. Website Structure & Navigation (Sidebar Architecture)](#c-website-structure--navigation-sidebar-architecture)
- [D. Feature Planning (Termasuk Fitur Baru: Katalog & Riwayat)](#d-feature-planning-termasuk-fitur-baru-katalog--riwayat)
- [E. UI/UX Design Planning](#e-uiux-design-planning)
- [F. Technology Stack](#f-technology-stack)
- [G. Component & State Management Planning](#g-component--state-management-planning)
- [H. Project Folder Structure](#h-project-folder-structure)
- [I. Development Roadmap](#i-development-roadmap)
- [J. Potential Risks and Considerations](#j-potential-risks-and-considerations)

---

## A. Project Overview

**Econnect** adalah platform aplikasi web terintegrasi yang menghubungkan masyarakat (penghasil sampah anorganik) dengan pengelola sampah (bank sampah, pengepul, perusahaan daur ulang) di Kota Balikpapan. Econnect bertindak sebagai **fasilitator dan enabler teknologi** (BAB II §2.1 & BAB V §5.5).

### Tujuan Tambahan Halaman Baru:
1. **Halaman Jenis Sampah & Harga:** Memberikan edukasi dan transparansi pasar menyeluruh mengenai material sampah anorganik bernilai ekonomi di Balikpapan (Plastik PET/HDPE, Kertas Kardus/HVS, Logam Kaleng/Besi, Kaca) serta panduan pemilahannya agar masyarakat tahu cara menyiapkan sampah sebelum dijemput (BAB I §1.1 & BAB III §3.1.4).
2. **Halaman Riwayat:** Menyediakan arsip pembukuan digital (*digital ledger*) yang mencatat rekam jejak penyetoran sampah bagi warga dan rekapitulasi timbangan bagi pengelola untuk menggantikan buku manual yang rentan rusak/hilang (BAB III §3.1.2).

---

## C. Website Structure & Navigation (Sidebar Architecture)

### C.1 Struktur Menu Sidebar: Sisi Masyarakat (Warga)
| Menu Sidebar | Ikon | Rute ID | Deskripsi Halaman |
|---|---|---|---|
| **Cari Pengelola** | `Search` | `directory` | Direktori mitra bank sampah per kecamatan di Balikpapan. |
| **Jenis Sampah & Harga** *(BARU)* | `Tags` | `waste-catalog` | Katalog terpusat jenis sampah anorganik, rentang tarif pasar Balikpapan (Rp/kg), dan panduan pemilahan. |
| **Ajukan Penjemputan** | `Truck` | `pickup` | Formulir pemesanan armada penjemputan sampah dari rumah. |
| **Lacak Status Pesanan** | `PackageSearch` | `tracking` | Pemantauan progres penjemputan live dengan kode booking. |
| **Riwayat Penjemputan** *(BARU)* | `History` | `history` | Rekam jejak seluruh penjemputan warga, total kg disalurkan, uang diterima, dan struk timbangan digital. |
| **Tentang Econnect** | `Info` | `about` | Visi-misi, susunan Kelompok 4 ITK, dan dasar hukum regulasi. |
| **Keluar / Ganti Akun** | `LogOut` | `logout` | Kembali ke Halaman Login. |

### C.2 Struktur Menu Sidebar: Sisi Pengelola Sampah (Mitra)
| Menu Sidebar | Ikon | Rute ID | Deskripsi Halaman |
|---|---|---|---|
| **Ringkasan Operasional** | `LayoutDashboard` | `dashboard` | Metrik utama: order baru, armada aktif, total kg terkumpul, dan kas keluar. |
| **Kelola Permintaan Jemput** | `ClipboardList` | `orders` | Manajemen pesanan masuk, konfirmasi jadwal, dan modal timbangan digital. |
| **Riwayat & Pembukuan** *(BARU)* | `History` | `history` | Arsip digital seluruh transaksi selesai, rekapitulasi volume sampah terhimpun, dan rekap keuangan mitra. |
| **Pengaturan Tarif Mitra** | `Settings` | `pricing` | Ubah harga beli per kg dan tambah material baru untuk bank sampah sendiri. |
| **Profil Bank Sampah** | `Building2` | `profile` | Detail informasi jam operasional, alamat di Balikpapan, dan kontak kurir. |
| **Tentang Econnect** | `Info` | `about` | Visi-misi, susunan tim ITK, dan dasar hukum. |
| **Keluar / Ganti Akun** | `LogOut` | `logout` | Kembali ke Halaman Login. |

---

## D. Feature Planning (Termasuk Fitur Baru: Katalog & Riwayat)

### D.1 Fitur Baru 1: Halaman Jenis Sampah & Transparansi Harga Terpusat (`waste-catalog`)
- **Tujuan:** Edukasi masyarakat mengenai jenis sampah yang diterima di Balikpapan dan nilai ekonominya (BAB III §3.1.4).
- **Fungsi:**
  1. **Katalog Kategori Material:** Plastik, Kertas, Logam, dan Kaca.
  2. **Rentang Harga Pasar Balikpapan:** Menampilkan estimasi harga terendah hingga tertinggi di bank sampah mitra (contoh: *Plastik PET: Rp 3.300 - Rp 3.600 / kg*, *Aluminium: Rp 11.500 - Rp 12.500 / kg*).
  3. **Panduan Pemilahan Praktis:** Tips membersihkan botol, memipihkan kardus, memisahkan tutup botol, agar dihargai maksimal oleh pengelola.
  4. **Aksi Cepat:** Tombol *"Cari Bank Sampah yang Menerima Material Ini"* yang langsung menyaring direktori pengelola.

### D.2 Fitur Baru 2: Halaman Riwayat Transaksi & Pembukuan Digital (`history`)
- **Untuk Masyarakat (Warga):**
  1. Kartu ringkasan kontribusi pribadi: Total kg sampah yang telah diselamatkan & Total rupiah yang didapatkan.
  2. Daftar riwayat penjemputan (status Selesai, Dikonfirmasi, Menunggu).
  3. Akses kembali struk digital penimbangan resmi untuk setiap transaksi.
- **Untuk Pengelola Sampah (Mitra Bank Sampah):**
  1. Buku kas dan rekapitulasi timbangan digital yang telah tuntas.
  2. Ringkasan total sampah terpilah yang berhasil dihimpun bank sampah berdasarkan material.
  3. Pengganti pencatatan buku fisik konvensional yang rentan rusak atau tertukar (BAB III §3.1.2 & §3.1.3).
