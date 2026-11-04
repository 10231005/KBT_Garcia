/**
 * Data konten website Econnect
 * Sumber: Laporan.md — Dokumen Rencana Bisnis Econnect
 * Seluruh data diambil langsung dari laporan tanpa modifikasi makna.
 */

// ===== NAVIGASI =====
export const navLinks = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'masalah', label: 'Masalah' },
  { id: 'solusi', label: 'Solusi' },
  { id: 'fitur', label: 'Fitur' },
  { id: 'cara-kerja', label: 'Cara Kerja' },
  { id: 'keunggulan', label: 'Keunggulan' },
  { id: 'harga', label: 'Harga' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'kontak', label: 'Kontak' },
];

// ===== HERO SECTION =====
// Sumber: BAB V §5.5 (Strategi Positioning), BAB IV §4.1 (Deskripsi Produk)
export const heroContent = {
  tagline: 'Platform Penghubung Digital Terpercaya',
  subtitle: 'Menghubungkan masyarakat dengan pengelola sampah anorganik secara mudah, terorganisir, dan transparan.',
  description: 'Econnect adalah platform digital berbasis web yang mempertemukan masyarakat penghasil sampah anorganik dengan bank sampah, pengepul, dan perusahaan daur ulang di Kota Balikpapan.',
  ctaPrimary: 'Gabung Sebagai Mitra',
  ctaSecondary: 'Pelajari Lebih Lanjut',
};

// ===== MASALAH / PROBLEM SECTION =====
// Sumber: BAB I §1.1 (Latar Belakang — data SIPSN)
export const statistics = [
  {
    number: '48%',
    label: 'Sampah Organik',
    description: 'Komposisi sampah organik di Balikpapan',
  },
  {
    number: '43%',
    label: 'Dapat Didaur Ulang',
    description: 'Sampah yang berpotensi untuk didaur ulang',
  },
  {
    number: '13%',
    label: 'Belum Terkelola',
    description: 'Sampah belum masuk pengolahan formal dan berpotensi dikelola dengan cara tidak sesuai',
  },
];

// Sumber: BAB III §3.1.1 — §3.1.5 (Identifikasi Masalah)
export const problemFactors = [
  {
    icon: 'Users',
    title: 'Faktor Manusia',
    description: 'Masyarakat yang telah mengumpulkan sampah anorganik belum tentu mengetahui cara menyalurkannya atau pihak yang dapat menerima sampah tersebut. Keterbatasan informasi dan manfaat yang dirasakan memengaruhi keterlibatan masyarakat.',
  },
  {
    icon: 'Monitor',
    title: 'Faktor Teknologi',
    description: 'Beberapa kegiatan bank sampah masih dilakukan secara manual, seperti pencatatan data nasabah dan transaksi menggunakan buku, sehingga dapat menimbulkan permasalahan data rusak, hilang, atau duplikasi.',
  },
  {
    icon: 'GitBranch',
    title: 'Faktor Metode',
    description: 'Proses pengelolaan dan penyaluran sampah belum dilakukan secara terintegrasi. Masyarakat membutuhkan mekanisme yang jelas untuk menyampaikan jenis dan jumlah sampah serta mengajukan permintaan pengambilan.',
  },
  {
    icon: 'Package',
    title: 'Faktor Material',
    description: 'Sampah anorganik seperti plastik, kertas, dan logam memiliki nilai ekonomi yang berbeda. Informasi mengenai jenis dan ketersediaan material penting untuk mencocokkan pasokan masyarakat dengan kebutuhan pengelola.',
  },
  {
    icon: 'TrendingUp',
    title: 'Faktor Ekonomi',
    description: 'Bank sampah perlu mencapai jumlah sampah anorganik dan nasabah tertentu agar kegiatan pengelolaannya dapat berjalan secara mandiri secara finansial. Ketersediaan pasokan rutin menjadi aspek penting.',
  },
];

// ===== SOLUSI SECTION =====
// Sumber: BAB VI §6.3 (Solusi yang Diberikan), BAB I §1.5 (Gambaran Produk)
export const solutionContent = {
  title: 'Econnect sebagai Solusi',
  paragraphs: [
    'Econnect dikembangkan sebagai platform digital berbasis web yang menghubungkan masyarakat dengan pengelola sampah anorganik melalui fitur pencarian pengelola berdasarkan lokasi, informasi jenis dan harga sampah, serta pengajuan dan penjadwalan penjemputan.',
    'Platform ini membantu masyarakat dalam menyalurkan sampah anorganik dan membantu pengelola dalam memperluas jangkauan layanan serta mengelola permintaan pengumpulan secara lebih terorganisir.',
    'Econnect berperan sebagai penyedia solusi teknologi (enabler), bukan sebagai pihak yang membeli maupun mengelola sampah secara langsung. Proses pembelian dan pengelolaan sampah tetap dilakukan oleh pengelola sampah.',
  ],
  highlights: [
    { icon: 'Globe', text: 'Platform berbasis web — akses dari mana saja tanpa instalasi' },
    { icon: 'Link', text: 'Menghubungkan masyarakat langsung dengan pengelola sampah' },
    { icon: 'ShieldCheck', text: 'Transparan — informasi harga, jenis, dan jadwal terlihat jelas' },
    { icon: 'Cog', text: 'Enabler teknologi — tidak mengubah alur kerja pengelola' },
  ],
};

// ===== FITUR SECTION =====
// Sumber: BAB IV §4.1 — §4.2 (Deskripsi Produk & Inovasi), BAB I §1.5 (Gambaran Produk)
export const features = [
  {
    icon: 'MapPin',
    title: 'Pencarian Pengelola',
    description: 'Cari pengelola sampah anorganik berdasarkan lokasi terdekat. Temukan bank sampah, pengepul, atau perusahaan daur ulang yang sesuai di Kota Balikpapan.',
  },
  {
    icon: 'Tags',
    title: 'Informasi Jenis & Harga',
    description: 'Lihat informasi lengkap mengenai jenis sampah anorganik yang diterima dan harga per kilogram dari setiap pengelola. Transparansi harga untuk kemudahan masyarakat.',
  },
  {
    icon: 'Truck',
    title: 'Pengajuan Penjemputan',
    description: 'Ajukan permintaan penjemputan sampah dari rumah secara langsung melalui platform. Pengelola akan menerima notifikasi dan mengonfirmasi permintaan.',
  },
  {
    icon: 'CalendarCheck',
    title: 'Penjadwalan Penjemputan',
    description: 'Atur jadwal penjemputan sampah sesuai ketersediaan pengelola. Koordinasi waktu yang praktis antara masyarakat dan pengelola sampah.',
  },
];

// ===== CARA KERJA SECTION =====
// Sumber: BAB IX §9.3 (Sistem Operasional — Alur Kerja Penggunaan Platform)
export const howItWorks = [
  {
    step: 1,
    icon: 'UserPlus',
    title: 'Pendaftaran Mitra',
    description: 'Pengelola sampah (bank sampah/pengepul) mendaftarkan profil, lokasi, jenis sampah anorganik yang diterima, serta daftar harga per kilogram ke dalam sistem.',
  },
  {
    step: 2,
    icon: 'Search',
    title: 'Permintaan Penjemputan',
    description: 'Masyarakat mengakses web Econnect, memilih pengelola terdekat, melihat transparansi harga, dan mengajukan permintaan jadwal penjemputan sampah dari rumah.',
  },
  {
    step: 3,
    icon: 'CheckCircle',
    title: 'Konfirmasi & Tracking',
    description: 'Pengelola sampah menerima notifikasi permintaan, mengonfirmasi jadwal, dan melakukan penjemputan sesuai kesepakatan.',
  },
  {
    step: 4,
    icon: 'ClipboardList',
    title: 'Pencatatan Transaksi Digital',
    description: 'Setelah sampah dijemput dan ditimbang, pengelola mencatat volume dan nilai transaksi langsung pada sistem Econnect secara otomatis.',
  },
];

// ===== KEUNGGULAN SECTION =====
// Sumber: BAB V §5.4 (Analisis Kompetitor), §5.5 (Strategi Positioning)
export const advantages = {
  intro: 'Econnect diposisikan sebagai platform yang berfokus pada kebutuhan lokal, menjembatani pengelola sampah dengan masyarakat secara langsung dan terintegrasi.',
  comparison: [
    {
      aspect: 'Pencarian Pengelola',
      econnect: 'Pencarian berdasarkan lokasi dengan informasi lengkap',
      traditional: 'Bergantung pada informasi dari mulut ke mulut',
      other: 'Tersedia, namun belum fokus pada wilayah lokal',
    },
    {
      aspect: 'Transparansi Harga',
      econnect: 'Harga per kilogram ditampilkan secara terbuka',
      traditional: 'Harga tidak pasti, negosiasi manual',
      other: 'Sebagian tersedia',
    },
    {
      aspect: 'Penjemputan Sampah',
      econnect: 'Pengajuan dan penjadwalan melalui platform',
      traditional: 'Koordinasi manual via telepon atau datang langsung',
      other: 'Fitur terbatas',
    },
    {
      aspect: 'Pencatatan Transaksi',
      econnect: 'Digital dan otomatis dalam platform',
      traditional: 'Pencatatan manual di buku',
      other: 'Sebagian digital',
    },
    {
      aspect: 'Fokus Wilayah',
      econnect: 'Khusus Kota Balikpapan (kelokalan)',
      traditional: 'Terbatas pada jaringan personal',
      other: 'Skala nasional, kurang fokus lokal',
    },
    {
      aspect: 'Model Bisnis',
      econnect: 'B2B2C — menjembatani pengelola dan masyarakat',
      traditional: 'Tidak terstruktur',
      other: 'Beragam model',
    },
  ],
};

// ===== HARGA SECTION =====
// Sumber: BAB X §10.2 (Revenue Stream)
export const pricing = {
  planName: 'Langganan Platform',
  priceYearly: 'Rp 600.000',
  priceMonthly: 'Rp 50.000',
  period: 'per tahun',
  monthlyNote: 'Setara Rp 50.000 / bulan',
  features: [
    'Profil pengelola ditampilkan di platform',
    'Pencarian oleh masyarakat berdasarkan lokasi',
    'Informasi jenis dan harga sampah yang diterima',
    'Penerimaan permintaan penjemputan dari masyarakat',
    'Penjadwalan penjemputan sampah',
    'Pencatatan transaksi digital',
    'Dukungan teknis dan pemeliharaan sistem',
  ],
  ctaText: 'Gabung Sebagai Mitra',
};

// ===== ROADMAP SECTION =====
// Sumber: BAB IV §4.4 (Roadmap Produk)
export const roadmap = [
  {
    phase: 1,
    title: 'Identifikasi Masalah & Perancangan Konsep',
    focus: 'Studi literatur, analisis kebutuhan, alur layanan, fitur utama',
    result: 'Kebutuhan pengguna dan rancangan fitur platform',
  },
  {
    phase: 2,
    title: 'Prototipe & Evaluasi',
    focus: 'Prototipe web, tampilan fitur, uji fungsi dan kemudahan',
    result: 'Prototipe awal dan masukan untuk penyempurnaan',
  },
  {
    phase: 3,
    title: 'Pengembangan MVP',
    focus: 'Pencarian pengelola, informasi sampah, penjemputan',
    result: 'MVP siap diuji dalam skala terbatas',
  },
  {
    phase: 4,
    title: 'Uji Coba & Perbaikan',
    focus: 'Uji coba bersama pengelola sampah dan pengguna',
    result: 'Platform sesuai kebutuhan dan siap ditawarkan',
  },
  {
    phase: 5,
    title: 'Pengembangan Lanjutan & Perluasan',
    focus: 'Fitur lanjutan, peningkatan layanan, kerja sama pengelola',
    result: 'Econnect lebih lengkap, dipakai lebih banyak pengelola',
  },
];

// ===== TENTANG / ABOUT SECTION =====
// Sumber: BAB I §1.4.1 (Visi)
export const vision = 'Menjadi platform digital pengumpulan sampah anorganik yang inovatif dan berkelanjutan dalam menghubungkan masyarakat dengan pengelola sampah guna meningkatkan efektivitas pengelolaan sampah dan mendukung kelestarian lingkungan.';

// Sumber: BAB I §1.4.2 (Misi)
export const missions = [
  'Mempermudah masyarakat dalam menyalurkan sampah anorganik melalui layanan pengumpulan yang praktis dan mudah diakses.',
  'Menghubungkan masyarakat dengan pengelola sampah anorganik melalui platform digital yang terintegrasi.',
  'Menyediakan informasi terkait jenis sampah yang diterima, harga sampah, dan jadwal penjemputan untuk meningkatkan kemudahan dan transparansi layanan.',
  'Membantu pengelola sampah memperluas jangkauan layanan dan meningkatkan efektivitas pengumpulan sampah anorganik.',
  'Mendorong partisipasi masyarakat dalam pemilahan dan daur ulang sampah untuk mendukung penerapan ekonomi sirkular serta mengurangi pencemaran lingkungan.',
];

// Sumber: BAB II §2.4 (Profil Pendiri & Tim Inti)
export const teamMembers = [
  {
    name: 'Garcia Stevendia Saragih',
    role: 'Ketua Tim',
    description: 'Memimpin keseluruhan kegiatan usaha, menentukan arah pengembangan platform, serta mengkoordinasikan setiap anggota tim.',
    initials: 'GS',
  },
  {
    name: 'Aprilla Herlianti',
    role: 'Divisi Teknologi & Pengembangan Produk',
    description: 'Mengembangkan dan mengelola platform berbasis web serta memastikan fitur dapat digunakan sesuai kebutuhan pengguna.',
    initials: 'AH',
  },
  {
    name: 'Yandriana Despiransa',
    role: 'Divisi Operasional',
    description: 'Mengatur kegiatan operasional platform dan memastikan layanan berjalan dengan baik sesuai kebutuhan pengguna.',
    initials: 'YD',
  },
  {
    name: 'Dwi Irfan Jatmiko',
    role: 'Divisi Pemasaran & Business Development',
    description: 'Menyusun strategi promosi, memperkenalkan platform kepada calon pengguna, serta membangun kerja sama dengan pengelola sampah anorganik.',
    initials: 'DI',
  },
  {
    name: 'Aisyah Meifara',
    role: 'Divisi Keuangan & Administrasi',
    description: 'Mengelola pencatatan keuangan, administrasi usaha, serta perencanaan dan pengelolaan biaya operasional.',
    initials: 'AM',
  },
];

// Sumber: BAB II §2.2 (Identitas Perusahaan)
export const companyIdentity = {
  name: 'Econnect',
  type: 'Bisnis berbasis teknologi',
  field: 'Teknologi pengelolaan sampah',
  product: 'Platform web tracking sampah anorganik',
  target: 'Pengelola sampah anorganik',
  location: 'Kota Balikpapan, Kalimantan Timur',
  institution: 'Institut Teknologi Kalimantan',
  course: 'Kewirausahaan Berbasis Teknologi',
  year: '2026',
};

// Sumber: BAB II §2.2 (Dasar Hukum)
export const legalBasis = [
  'UU Nomor 18 Tahun 2008 tentang Pengelolaan Sampah',
  'PP Nomor 81 Tahun 2012 tentang Pengelolaan Sampah Rumah Tangga dan Sampah Sejenis Sampah Rumah Tangga',
  'PP Nomor 80 Tahun 2019 tentang Perdagangan Melalui Sistem Elektronik',
];

// ===== FOOTER =====
export const footerContent = {
  description: 'Platform digital penghubung masyarakat dengan pengelola sampah anorganik di Kota Balikpapan.',
  copyright: `© ${new Date().getFullYear()} Econnect — Kelompok 4, Kewirausahaan Berbasis Teknologi, Institut Teknologi Kalimantan.`,
};

