# BrewHaven - Artisan Coffee Roasters E-Commerce

BrewHaven adalah proyek website e-commerce kopi fungsional yang dibangun dengan fokus pada pengalaman pengguna yang interaktif dan manajemen data sisi klien. Website ini mencakup seluruh alur pengguna mulai dari eksplorasi produk hingga sistem keranjang belanja.

## 🚀 Fitur Utama

* **Sistem Keranjang Belanja (Cart System):** Menggunakan `localStorage` untuk menyimpan data pesanan secara persisten meskipun halaman di-refresh.
* **UI Dinamis & Modal:** Detail produk ditampilkan melalui modal yang dibuat secara dinamis menggunakan manipulasi DOM JavaScript.
* **Notifikasi Kustom:** Sistem pemberitahuan *real-time* saat pengguna menambahkan produk ke keranjang.
* **Desain Responsif:** Layout yang sepenuhnya adaptif untuk perangkat mobile, tablet, dan desktop menggunakan Media Queries dan variabel CSS.
* **Elemen Interaktif:** Termasuk *animated counter* untuk statistik bisnis dan *testimonial carousel* otomatis.

## 🛠️ Teknologi yang Digunakan

* **Frontend:** HTML5 (Semantik), CSS3 (Modern Flexbox & Grid)
* **Scripting:** JavaScript (ES6+)
* **Icons & Fonts:** Font Awesome & Google Fonts

## 📋 Struktur Proyek

```text
coffe_shop/
├── image/          # Aset gambar produk dan hero
├── index.html      # Struktur utama halaman web
├── styles.css      # Styling lengkap dan variabel tema
└── script.js       # Logika keranjang belanja, modal, dan animasi
