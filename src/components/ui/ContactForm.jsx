import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'pengelola',
    emailOrPhone: '',
    address: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.emailOrPhone) {
      alert('Mohon isi nama dan kontak (Email/No. HP).');
      return;
    }
    // Form action simulation with feedback
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-primary-100 shadow-sm text-center py-12">
        <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 font-heading mb-2">
          Terima Kasih, {formData.name}!
        </h3>
        <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
          Permintaan informasi atau konsultasi kemitraan Anda telah kami terima. Tim Econnect akan segera menghubungi Anda melalui kontak yang diberikan.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              category: 'pengelola',
              emailOrPhone: '',
              address: '',
              message: '',
            });
          }}
          className="text-primary-700 text-sm font-semibold hover:underline"
        >
          Kirim Pesan Lainnya
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
          Nama Lengkap / Nama Usaha *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Contoh: Bank Sampah Berkah / Garcia"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 placeholder-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
            Kategori Anda *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 bg-white"
          >
            <option value="pengelola">Pengelola Sampah (Bank Sampah/Pengepul)</option>
            <option value="masyarakat">Masyarakat / Rumah Tangga</option>
            <option value="umkm">Pelaku UMKM / Instansi / Sekolah</option>
            <option value="mitra">Mitra / Instansi Pemerintah</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
            Kontak (WhatsApp / Email) *
          </label>
          <input
            type="text"
            required
            value={formData.emailOrPhone}
            onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
            placeholder="0812xxxx atau email@domain.com"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
          Wilayah / Alamat di Balikpapan
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Contoh: Balikpapan Utara, Jl. Soekarno Hatta KM 15"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
          Pesan atau Pertanyaan
        </label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tuliskan kebutuhan atau pertanyaan Anda seputar platform Econnect..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 placeholder-gray-400"
        ></textarea>
      </div>

      <Button type="submit" variant="primary" size="md" className="w-full">
        <Send className="w-4 h-4 mr-1" /> Kirim Pesan & Minat Kemitraan
      </Button>
    </form>
  );
}

