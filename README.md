# Inspektor Dapur KKM: Misi Sanitasi SRT T5

Permainan simulasi pendidikan web interaktif yang dibina khusus mengikut silibus **KSSM Sains Rumah Tangga (SRT) Tingkatan 5 — Bab 2: Sanitasi dalam Penyediaan dan Penyimpanan Makanan**.

## Pemetaan Silibus KSSM SRT Tingkatan 5 (Bab 2)

| Tahap | Modul Permainan | Subtopik KSSM | Fokus Pembelajaran |
| :--- | :--- | :--- | :--- |
| **Tahap 1** | Pos Pemeriksaan Pengendali (Gaya *Papers, Please*) | **2.2** Pengendalian Makanan | Pakaian pengendali, penutup kepala, kasut bertutup, larangan barang kemas, balutan luka plaster kalis air, SLPM & Suntikan Tifoid (Peraturan 30–33, PPKM 2009) |
| **Tahap 2** | Audit Visual Dapur Komersial (8 Titik Imbasan) | **2.1 & 2.2** Amalan Kebersihan Dapur | Perangkap gris, singki cuci tangan khusus, pencemaran silang, papan pemotong berkod warna, hud penyedut asap, pengeringan udara & tong sampah berpedal kaki |
| **Tahap 3** | Audit Rantaian Sejuk & Stor Makanan | **2.3** Penyimpanan Makanan | Suhu Peti Sejuk (`0°C–4°C`), Sejuk Beku (`≤ -18°C`), Stor Kering (`10°C–21°C`), Zon Suhu Bahaya (`5°C–60°C`), susunan rak elak pencemaran silang, jarak ≥15 cm dari lantai & peraturan **FIFO** |

## Ciri Utama

- **Penilaian Akademik & Skor Arked Terasing:** Gred rasmi (**Gred A ≥ 85%**, **Gred B 60–84%**, **Gred C < 60%**) dikira berdasarkan ketepatan akademik semata-mata, manakala skor arked memberi motivasi melalui rantaian jawapan tepat (*streak*) dan bonus masa.
- **Pemasa Mesra Pembelajaran:** Pemasa 120 saat dijeda secara automatik apabila murid membaca maklum balas buku teks, kuiz titik pemeriksaan, atau membuka **Buku Panduan Sanitasi KKM**. Turut menyokong **Mod Latihan (Tanpa Masa)**.
- **Tarikh Audit Dinamik:** Tarikh luput Suntikan Tifoid dan tarikh produk FIFO dijana secara relatif kepada tarikh pemeriksaan semasa supaya soalan sentiasa relevan setiap tahun.
- **Laporan Audit & Sijil Boleh Cetak (A4 Landskap):** Lengkap dengan graf penguasaan Subtopik 2.1, 2.2 & 2.3, Senarai Semak Ulang Kaji kesilapan, dan **Sijil Inspektor Dapur Muda** siap `@media print`.
- **Audio Web API Tanpa Kebergantungan Luaran:** Kesan bunyi cop kelulusan, jawapan tepat/salah, dan fanfare kemenangan dengan butang senyap global.
- **Simpanan Kemajuan Automatik:** Menggunakan Zustand `persist` (`localStorage`) supaya kemajuan murid tidak hilang jika halaman disegar semula.

## Pembangunan Tempatan

```bash
npm install
npm run dev
```

### Semakan Jenis, Ujian Unit & Binaan Produksi

```bash
npm run typecheck
npm test
npm run build
```

## Penerbitan Automatik ke GitHub Pages

Repositori ini dilengkapi aliran kerja CI/CD di `.github/workflows/deploy.yml`.

1. Buka repositori di GitHub (`https://github.com/iqbalfaez/srt-games`).
2. Pergi ke **Settings → Pages**.
3. Di bawah **Build and deployment → Source**, pilih **GitHub Actions**.
4. Setiap `push` ke cabang `main` akan menjalankan `typecheck`, `test`, `build`, dan menerbitkan laman secara automatik ke GitHub Pages.
