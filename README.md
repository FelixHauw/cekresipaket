# 🚀 PacketPulse - Pelacak Paket Animatif

<div align="center">

![PacketPulse Banner](https://i.imgur.com/vtu8hPp.gif)

### ✨ Website Pelacakan Paket Modern dengan Animasi Memukau ✨

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)](index.html)
[![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=flat&logo=css3&logoColor=white)](style.css)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=javascript&logoColor=black)](script.js)

<a href="#demo">Demo</a> •
<a href="#features">Fitur</a> •
<a href="#installation">Instalasi</a> •
<a href="#usage">Penggunaan</a> •
<a href="#api">API</a> •
<a href="#customization">Kustomisasi</a> •
<a href="#license">Lisensi</a>

</div>

<br>

<div align="center">
    <img src="https://i.imgur.com/fA7QAsC.gif" alt="Demo Application" width="700px" />
</div>

<br>

## 📦 Demo <a name="demo"></a>

Kunjungi [Demo Online](https://your-github-username.github.io/packet-pulse/) untuk melihat aplikasi secara langsung.

<details>
<summary>📱 Lihat Screenshot</summary>
<br>
<p align="center">
    <img src="https://i.imgur.com/LnZAuAf.gif" alt="Mobile Experience" width="300px" />
</p>
</details>

## 🌟 Fitur <a name="features"></a>

<table>
  <tr>
    <td width="50%">
      <h3 align="center">✨ Animasi Memukau</h3>
      <p>
        <ul>
          <li>Latar belakang gradien animatif yang bergerak</li>
          <li>Efek glassmorphism dengan blur dan transparansi</li>
          <li>Bentuk geometris mengambang dengan animasi 3D</li>
          <li>Partikel bercahaya yang halus bergerak</li>
          <li>Efek text gradient dengan pergerakan rainbow</li>
        </ul>
      </p>
    </td>
    <td width="50%">
      <p align="center">
        <img src="https://i.imgur.com/T9V0YQA.gif" alt="Animations Demo" width="100%" />
      </p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <p align="center">
        <img src="https://i.imgur.com/wFovN9B.gif" alt="Multi Courier Support" width="100%" />
      </p>
    </td>
    <td width="50%">
      <h3 align="center">🚚 Multi Kurir</h3>
      <p>
        <ul>
          <li><b>9+ Kurir Indonesia</b>: JNE, J&T, SiCepat, TIKI, POS, Ninja, AnterAja, Wahana, ShopeeExpress</li>
          <li>Integrasi dengan API BinderByte</li>
          <li>Format JSON standar</li>
          <li>Simulasi mode untuk demo</li>
        </ul>
      </p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center">📱 Responsive Design</h3>
      <p>
        <ul>
          <li>Tampilan optimal di semua ukuran layar</li>
          <li>Mobilitas tinggi dengan tata letak yang adaptif</li>
          <li>Performa terjamin di berbagai perangkat</li>
          <li>Animasi yang dioptimalkan untuk performa mobile</li>
        </ul>
      </p>
    </td>
    <td width="50%">
      <p align="center">
        <img src="https://i.imgur.com/ROwOaSS.gif" alt="Responsive Design" width="100%" />
      </p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <p align="center">
        <img src="https://i.imgur.com/WKxSlGa.gif" alt="Timeline View" width="100%" />
      </p>
    </td>
    <td width="50%">
      <h3 align="center">🔄 Timeline Interaktif</h3>
      <p>
        <ul>
          <li>Timeline status pengiriman yang animatif</li>
          <li>Efek staggered dengan delay animasi</li>
          <li>Indikator status paket (Selesai/Proses)</li>
          <li>Warna yang berubah sesuai status</li>
        </ul>
      </p>
    </td>
  </tr>
</table>

## 🛠️ Instalasi <a name="installation"></a>

### Langkah 1: Clone Repository

```bash
# Clone repository dengan Git
git clone https://github.com/your-username/packet-pulse.git

# Pindah ke direktori
cd packet-pulse
```

### Langkah 2: Buka Website

<details>
<summary>💻 Local Development</summary>

```bash
# Buka dengan VS Code
code .

# Atau gunakan server local (jika Python terinstal)
python -m http.server 8000
# Lalu buka: http://localhost:8000
```
</details>

<details>
<summary>🌐 Deployment</summary>

```bash
# Deploy ke GitHub Pages
# 1. Push ke repository GitHub Anda
git add .
git commit -m "Initial Commit"
git push origin main

# 2. Aktifkan GitHub Pages di repository settings
# Settings > Pages > Source > main branch
```
</details>

## 📝 Penggunaan <a name="usage"></a>

<div align="center">
    <img src="https://i.imgur.com/Xw0QtSs.gif" alt="Usage Flow" width="700px" />
</div>

### Langkah-langkah Pelacakan Paket:

1. **Buka Website**: 
   - Akses website melalui URL atau buka file `index.html` secara lokal.

2. **Masukkan Informasi Paket**:
   - Ketikkan nomor resi paket pada kolom input.
   - Pilih kurir yang sesuai dari dropdown menu.

3. **Lacak Paket**:
   - Klik tombol "Lacak Paket" yang beranimasi.
   - Tunggu beberapa saat saat animasi loading ditampilkan.

4. **Lihat Hasil**:
   - Status paket akan ditampilkan dengan indikator berwarna.
   - "Sudah Selesai" (hijau) atau "Masih Proses" (biru/orange).
   - Timeline pengiriman akan muncul dengan efek animasi berurutan.

5. **Mode Demo**:
   - Untuk testing: gunakan tombol "Coba Demo" untuk simulasi data.

<details>
<summary>💡 Tips Penggunaan</summary>

#### Status Paket
- **Hijau (✓)** = Paket sudah terkirim
- **Biru (🚚)** = Paket sedang diantar
- **Orange (🛣️)** = Paket dalam perjalanan
- **Ungu (🛒)** = Paket sudah dipickup
- **Pink (📦)** = Paket baru dibuat

#### Format Nomor Resi
- JNE: 1234567890123
- J&T: JT0123456789
- SiCepat: 000123456789
</details>

## 🔌 API Configuration <a name="api"></a>

Website ini menggunakan [BinderByte API](https://binderbyte.com/) untuk melacak paket secara real-time.

<details>
<summary>📋 Setup API Key</summary>

1. Daftar akun di [BinderByte](https://binderbyte.com/)
2. Dapatkan API key gratis
3. Edit file `script.js`:

```javascript
const API_CONFIG = {
    binderbyte: {
        url: 'https://api.binderbyte.com/v1/track',
        key: 'YOUR_API_KEY_HERE' // Ganti dengan API key Anda
    },
    mock: false // true = gunakan data simulasi, false = gunakan API asli
};
```
</details>

## 🎨 Kustomisasi <a name="customization"></a>

<div align="center">
    <img src="https://i.imgur.com/4Z5hFPQ.gif" alt="Customization" width="700px" />
</div>

### Mengubah Tema Warna:

Edit bagian awal file `style.css`:

```css
:root {
    /* Ubah warna gradient background */
    --bg-gradient-1: #1a1a2e;
    --bg-gradient-2: #16213e;
    --bg-gradient-3: #0f3460;
    --bg-gradient-4: #1a2e1a;
    --bg-gradient-5: #2e1a1a;
    
    /* Ubah warna aksen */
    --accent-blue: #64c4ff;
    --accent-pink: #ff64c4;
    --accent-green: #64ff8a;
}
```

### Menambahkan Kurir Baru:

```javascript
// Di file script.js
const COURIER_MAPPING = {
    // Kurir yang sudah ada
    'jne': { name: 'JNE Express', code: 'jne' },
    // Tambahkan kurir baru
    'newcourier': { name: 'New Courier', code: 'newcourier_code' }
};

// Di file index.html, tambahkan ke dropdown
// <option value="newcourier">New Courier</option>
```

### Mengatur Animasi:

```css
/* Memperlambat/mempercepat animasi latar belakang */
.animated-bg {
    animation: gradientShift 20s ease infinite; /* Ubah 20s ke nilai yang diinginkan */
}

/* Mengubah efek floating */
.floating-shapes {
    animation-duration: 15s; /* Lebih lambat */
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* Lebih smooth */
}
```

## 📋 Kurir yang Didukung

| Kurir | Kode | Status |
|-------|------|--------|
| JNE Express | `jne` | ✅ |
| J&T Express | `jnt` | ✅ |
| TIKI | `tiki` | ✅ |
| SiCepat | `sicepat` | ✅ |
| POS Indonesia | `pos` | ✅ |
| AnterAja | `anteraja` | ✅ |
| Ninja Express | `ninja` | ✅ |
| Wahana | `wahana` | ✅ |
| Shopee Express | `spx` | ✅ |



## 🔮 Pengembangan Selanjutnya

- [ ] Tema Gelap/Terang dengan toggle switch animasi
- [ ] Riwayat pencarian dengan local storage
- [ ] Efek konfeti saat paket terkirim
- [ ] Mode offline dengan PWA
- [ ] Notifikasi push saat status berubah
- [ ] Lebih banyak pilihan tema animasi

## 📄 Lisensi <a name="license"></a>

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<div align="center">
    <img src="https://i.imgur.com/tGBf5SC.gif" alt="Thank You" width="300px" />
    <p>Dibuat dengan ❤️ dan banyak ☕</p>
    <p>© 2025 PacketPulse</p>
</div>
