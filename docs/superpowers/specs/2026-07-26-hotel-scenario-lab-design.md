---
title: "Hotel Scenario Lab v1 — Spesifikasi Desain"
project: hotel-scenario-lab
doc_type: design-spec
version: "1.0"
status: "draft — awaiting Abel written-spec review"
date: 2026-07-26
authors:
  - "Claude (Fable 5) — penulis tunggal fase spesifikasi desain"
spec_language: id
product_languages: [de, en, id]
platform: "situs web statis tanpa dependensi (HTML/CSS/JS peramban)"
storage: "localStorage (hanya lokal, tanpa jaringan)"
audience: "peserta pelatihan perhotelan (Front Office) di Rostock, Jerman"
self_review: "swa-tinjau konsistensi dilakukan 2026-07-26; lihat §19"
---

# Hotel Scenario Lab v1 — Spesifikasi Desain

## For future Claude

Bagian ini ditulis untuk Claude (atau pengembang lain) yang akan melanjutkan proyek ini pada sesi berikutnya.

**Apa dokumen ini.** Ini adalah satu-satunya sumber kebenaran (*single source of truth*) untuk implementasi Hotel Scenario Lab v1 — simulator keputusan Kantor Depan (*Front Office*) berbasis web statis, tiga bahasa (DE/EN/ID), *mobile-first*, *local-first*. Arah produk telah **disetujui pengguna**; jangan menegosiasikan ulang ruang lingkup v1 tanpa persetujuan eksplisit pengguna.

**Status repositori per 2026-07-26.** Hanya dokumen ini yang ada. Belum ada berkas aplikasi, kode sumber, berkas paket, konfigurasi server, pengujian, repositori git, maupun *tunnel* — dan fase spesifikasi memang dilarang membuatnya. Struktur direktori target implementasi didefinisikan pada §15.1.

**Cara membaca.** Bacalah dokumen ini secara penuh sebelum implementasi. Bila konteks Anda terbatas, prioritas minimum: §2 (kriteria keberhasilan), §6–§9 (model domain, penyimpanan, format konten, rubrik), §13 (pagar pengaman), §15 (batas modul). Urutan pembangunan yang disarankan ada di §15.6. Bila Anda menemukan pertentangan internal saat implementasi, urutan prioritas: §13 (keselamatan/privasi) > §9 (rubrik) > §7 (skema penyimpanan) > bagian lain; catat penyelesaiannya dengan memperbarui §19.

**Bahasa normatif.** Dalam dokumen ini: **wajib** = keharusan mutlak; **dilarang** = larangan mutlak; **dianjurkan** = praktik terbaik yang boleh disimpangi dengan alasan tercatat; **boleh** = opsional. Kata-kata tersebut digunakan secara konsisten dengan makna itu.

**Garis merah yang tidak boleh dilanggar dalam kondisi apa pun:**
1. Tanpa permintaan jaringan dalam bentuk apa pun (tanpa API, backend, AI runtime, analitik, CDN, fon eksternal, aset pihak ketiga, formulir kirim).
2. Tanpa dependensi: tidak ada pustaka, *framework*, *build step*, maupun berkas paket. Hanya HTML/CSS/JS polos.
3. Persistensi hanya `localStorage`; tanpa *cookie*; tanpa data pribadi nyata; tanpa data hotel nyata.
4. Konten skenario mematuhi aturan keselamatan §13.2 (tanpa klaim medis/hukum/keamanan yang otoritatif; eskalasi aman selalu dimodelkan).
5. Tiga bahasa DE/EN/ID selalu lengkap dan setara (pemeriksa kelengkapan §15.3 wajib lulus).
6. Baseline aksesibilitas §11 tidak diturunkan.

**Definisi selesai.** v1 dinyatakan selesai bila seluruh kriteria §2 terpenuhi dan seluruh baris matriks §16 berstatus lulus.

---

## 1. Ringkasan Produk

Hotel Scenario Lab adalah alat latihan pribadi bagi seorang peserta pelatihan (*Auszubildende/r*) bidang perhotelan di Rostock, Jerman. Aplikasi menyajikan 12 skenario Kantor Depan yang realistis — check-in, keluhan, penawaran tambahan (*upsell*), check-out, privasi tamu, dan eskalasi aman — dalam bentuk simulasi keputusan bercabang. Setiap pilihan langsung diberi umpan balik penjelasan, dan setiap skenario ditutup dengan *debrief* mentor beserta skor tiga sumbu: **Keputusan**, **Bahasa**, dan **SOP**.

Aplikasi berjalan sepenuhnya lokal: berkas statis yang dapat dibuka langsung dari `file://` atau dari server statis apa pun, tanpa satu pun permintaan jaringan keluar. Kemajuan dan skor terbaik disimpan di `localStorage` perangkat. Karena seluruh konten tersedia dalam tiga bahasa yang dapat dialihkan kapan saja, aplikasi sekaligus menjadi sarana latihan bahasa kerja (DE/EN) bagi penggunanya.

Nilai pedagogis inti: **keputusan yang aman dan prosedural selalu dihargai**. Skenario tidak pernah mengarang kebijakan hotel spesifik; skenario mengajarkan prinsip layanan generik, pemeriksaan identitas/privasi, batas kewenangan, dan serah terima ke atasan.

---

## 2. Kriteria Keberhasilan

v1 dinyatakan berhasil bila seluruh butir berikut terverifikasi (rujukan uji → §16):

| ID | Kriteria | Verifikasi |
|---|---|---|
| SK-1 | 12 skenario dapat dimainkan tuntas dalam ketiga bahasa; pemeriksa konten melaporkan 0 galat. | T-08, T-09 |
| SK-2 | Nol permintaan jaringan eksternal di semua halaman; nol dependensi pihak ketiga. | T-01, T-02 |
| SK-3 | Aplikasi berfungsi dari `file://` (Chrome, Firefox desktop) dan dari server statis (Chrome, Firefox, Safari iOS ≥ 16). | T-02, T-03 |
| SK-4 | Seluruh alur (pilih bahasa → mainkan skenario → debrief → katalog) dapat diselesaikan hanya dengan papan ketik; uji pembaca layar lulus. | T-11, T-12 |
| SK-5 | Kontras memenuhi WCAG 2.2 AA (teks ≥ 4.5:1; komponen ≥ 3:1). | T-13 |
| SK-6 | Tata letak lulus pemeriksaan pada lebar 320, 375, 768, 1024, 1440 px tanpa gulir horizontal. | T-14 |
| SK-7 | `prefers-reduced-motion` dan pengaturan gerak manual dihormati sesuai §11.6. | T-15 |
| SK-8 | Semua mode kegagalan penyimpanan (§12) menghasilkan perilaku dan banner yang ditetapkan; aplikasi tidak pernah membeku senyap. | T-05, T-06, T-07 |
| SK-9 | Mesin skor mereproduksi persis empat kasus emas §9.5. | T-10 |
| SK-10 | Anggaran ukuran dan kinerja §15.5 terpenuhi. | T-16 |
| SK-11 | Tanpa JavaScript: katalog 12 skenario (judul, ringkasan, tujuan) tetap terbaca di `index.html`, halaman info terbaca penuh tiga bahasa, dan pemberitahuan `<noscript>` tiga bahasa tampil. | T-04 |
| SK-12 | Run yang terputus (muat ulang/tutup halaman) dapat dilanjutkan dari langkah terakhir. | T-17 |
| SK-13 | Daftar periksa keselamatan konten §13.2 ditandatangani lulus untuk ke-12 skenario. | T-19 |
| SK-14 | Preferensi bahasa persisten antarsesi; alih bahasa di tengah run tidak mengubah skor maupun posisi. | T-18 |
| SK-15 | "Hapus semua data" menghapus seluruh kunci `hsl.*` dan mengembalikan aplikasi ke kondisi pertama kali. | T-20 |

---

## 3. Non-Tujuan v1

Hal-hal berikut **secara sadar tidak dikerjakan** di v1 (sebagian menjadi kandidat v2, lihat §17):

1. Tanpa backend, API, akun pengguna, sinkronisasi, atau fitur daring apa pun.
2. Tanpa AI runtime (tidak ada pembangkitan teks dinamis; seluruh konten ditulis manusia/penulis dan statis).
3. Tanpa analitik, pelacakan, *cookie*, formulir pengiriman, atau telemetri dalam bentuk apa pun.
4. Tanpa PWA/service worker/manifest instalasi — sifat luring sudah terpenuhi oleh berkas statis itu sendiri.
5. Tanpa mode gelap (satu tema terang yang diaudit kontras; menggandakan QA kontras bukan prioritas v1).
6. Tanpa aset raster (PNG/JPG), audio, atau video; ikon hanya SVG sebaris.
7. Tanpa kolom input teks bebas — seluruh interaksi berupa tombol pilihan dan sakelar (menghilangkan permukaan risiko data pribadi dan XSS sekaligus).
8. Tanpa mekanika tekanan waktu (pengatur waktu, hitung mundur) — v1 mengutamakan latihan tenang dan reflektif.
9. Tanpa papan peringkat, mode multi-pengguna, sertifikat, atau gamifikasi kompetitif.
10. Tanpa SOP hotel nyata, data hotel nyata, nama hotel nyata, atau data tamu nyata.
11. Tanpa bahasa keempat, editor skenario visual, ekspor/impor kemajuan, dan pengacakan varian skenario.
12. Tanpa gaya cetak (print stylesheet).

---

## 4. Persona dan Konteks Penggunaan

**Persona utama.** Peserta pelatihan Kantor Depan berusia awal 20-an di sebuah hotel di Rostock. Bahasa ibu Indonesia; bahasa kerja Jerman; Inggris untuk tamu internasional. Berlatih terutama lewat ponsel (layar 320–414 px) pada jeda sif atau di perjalanan — sering tanpa koneksi stabil, karena itu *local-first*. Kadang berlatih di laptop (1024–1440 px).

**Kebutuhan inti.**
1. Latihan singkat (4–7 menit per skenario) yang bisa dihentikan dan dilanjutkan.
2. Umpan balik yang menjelaskan *mengapa*, bukan sekadar benar/salah.
3. Kepercayaan diri menghadapi situasi sulit: tamu marah, penelepon mencurigakan, keadaan darurat — tanpa risiko dunia nyata.
4. Latihan register bahasa profesional dalam tiga bahasa (memainkan skenario yang sama dalam DE adalah latihan bahasa kerja).

**Konteks kepercayaan.** Pengguna harus selalu yakin bahwa (a) tidak ada data yang meninggalkan perangkat, dan (b) aplikasi adalah fiksi latihan, bukan sumber kebijakan — keduanya dinyatakan eksplisit di antarmuka (§5.4, §13.3).

---

## 5. Arsitektur Informasi dan Layar

### 5.1 Peta situs

```text
index.html      Beranda: sambutan, pilih bahasa (kunjungan pertama), ringkasan
                kemajuan, katalog 12 skenario per kategori, tautan info.
scenario.html   Pemutar skenario (?id=<slug>): briefing → simpul keputusan
                (berulang) → hasil + debrief mentor. Panel "lanjutkan latihan"
                bila ada run aktif.
info.html       Informasi & Pengaturan: tentang, cara skor dihitung, prinsip
                SOP P1–P8, privasi & data (termasuk hapus data), disclaimer
                keselamatan, pengaturan gerak, versi aplikasi.
tools/check.html  Alat pengembang (tidak ditautkan dari aplikasi): validasi
                konten & i18n + kasus emas mesin skor. Lihat §15.3.
```

Navigasi: tajuk (header) konsisten di ketiga halaman aplikasi — nama aplikasi (tautan ke `index.html`) dan pengalih bahasa. Kaki halaman (footer): tautan "Informasi & Pengaturan", satu kalimat jaminan privasi ("Semua data hanya tersimpan di perangkat ini."), dan nomor versi.

### 5.2 Beranda (`index.html`)

Struktur (urutan DOM = urutan visual = urutan fokus):

1. **Tajuk**: h1 "Hotel Scenario Lab" + subjudul terjemahan ("Simulator Keputusan Kantor Depan" / "Entscheidungstraining für die Rezeption" / "Front office decision training"); pengalih bahasa (grup tiga tombol `DE · EN · ID`, `aria-pressed` pada yang aktif).
2. **Panel kunjungan pertama** (hanya bila belum ada preferensi bahasa tersimpan): tiga tombol besar "Deutsch", "English", "Bahasa Indonesia" — masing-masing ditulis dalam bahasanya sendiri dengan atribut `lang` yang sesuai. **Dilarang** memakai bendera sebagai lambang bahasa (bendera ≠ bahasa). Memilih salah satu menyimpan preferensi dan menyembunyikan panel.
3. **Ringkasan kemajuan** (peningkatan JS): "Selesai: X/12 · Kunci: Y/60". Status kosong dan status "semua dikuasai" → §12 baris 12–13.
4. **Navigasi kategori**: deretan *chip* yang merupakan **tautan jangkar** ke judul kategori di bawahnya (Check-in, Keluhan, Upsell, Check-out, Privasi, Eskalasi). Karena berupa jangkar murni, navigasi ini berfungsi tanpa JS. v1 tidak memiliki logika penyaringan.
5. **Katalog**: satu bagian per kategori (h2), berisi kartu skenario. Setiap kartu: kategori + tingkat kesulitan (1–3 titik + label Dasar/Menengah/Lanjut) + estimasi menit; judul (h3); ringkasan satu kalimat; lencana status (Baru / Berjalan / Selesai) dan skor terbaik (ikon kunci 1–5 + persen gabungan) bila ada. Seluruh kartu adalah tautan ke `scenario.html?id=<slug>`.
6. **Kaki halaman** (lihat §5.1).

Konten statis (pra-JS) katalog ditulis dalam bahasa Jerman (bahasa operasional pelatihan; `<html lang="de">`) dan memuat judul, ringkasan, kategori, kesulitan, serta durasi ke-12 skenario — sehingga tanpa JS katalog tetap informatif (SK-11). Saat JS aktif, kontainer katalog dirender ulang dari data (§8) dalam bahasa terpilih dan diberi lencana kemajuan. `<noscript>` menampilkan pemberitahuan tiga bahasa bahwa latihan interaktif memerlukan JavaScript.

Wireframe seluler (≈360 px):

```text
┌──────────────────────────────────┐
│ Hotel Scenario Lab   [DE][EN][ID]│
│ Simulator Keputusan Kantor Depan │
├──────────────────────────────────┤
│ Selesai 4/12 · Kunci 17/60 ⚿     │
├──────────────────────────────────┤
│ (Check-in)(Keluhan)(Upsell)…     │  ← chip = tautan jangkar
├──────────────────────────────────┤
│ ── Check-in ──────────────────── │
│ ┌──────────────────────────────┐ │
│ │ CHECK-IN · Dasar · ±5 mnt    │ │
│ │ Check-in Tamu dengan         │ │
│ │ Reservasi                    │ │
│ │ ⚿⚿⚿⚿◌ · Terbaik 88 %        │ │
│ └──────────────────────────────┘ │
│ … kartu berikutnya …             │
├──────────────────────────────────┤
│ Informasi & Pengaturan · v1.0.0  │
│ Semua data hanya di perangkat ini│
└──────────────────────────────────┘
```

### 5.3 Pemutar skenario (`scenario.html?id=<slug>`)

Empat keadaan tampilan (view state), dirender JS di dalam `<main>`:

**(a) Briefing.** Judul skenario (h1), kartu konteks dengan empat bidang dari data: *Waktu & tempat*, *Situasi*, *Tamu*, *Kendala operasional*; daftar tujuan pembelajaran (2–3 butir); tombol utama "Mulai latihan". Bila ada run aktif untuk skenario ini → panel lanjutkan (§12 baris 8) menggantikan tombol mulai.

**(b) Simpul keputusan.** Elemen-elemen:
- Baris status: tautan "← Keluar" (kembali ke katalog tanpa dialog; run aktif otomatis tersimpan dan dapat dilanjutkan), penanda langkah "Langkah {n} · {fase}" ({fase} dari data simpul, mis. "Verifikasi"). **Dilarang** menampilkan bilah persentase kemajuan: pada graf bercabang, total langkah tidak pasti, dan bilah palsu menyesatkan (lihat §19 K-5).
- Panel "Konteks" yang dapat dilipat (`<details>`) berisi ringkasan kartu briefing — di lebar ≥ 1024 px panel ini tampil permanen sebagai kolom samping.
- Narasi situasi (1–3 paragraf pendek) dan, bila ada, kutipan ucapan tamu dengan gaya kutip khas (garis aksen kiri, italik).
- Pertanyaan tetap "Apa tindakan Anda?" (h2) dan 3–4 tombol opsi lebar penuh (target sentuh ≥ 44 px). Urutan opsi tampil sesuai urutan data (tidak diacak di v1 — determinisme memudahkan verifikasi).

**(c) Umpan balik langsung** (setelah memilih; tampilan sama dengan (b), opsi terkunci):
- Opsi terpilih ditandai; opsi lain dinonaktifkan (`disabled` + redup).
- Kartu umpan balik muncul di bawah opsi: cip verdik per sumbu ("Keputusan 2/2 · Bahasa 1/2 · SOP 2/2"), teks penjelasan dari data, bila opsi berbendera `unsafe` → blok catatan keselamatan menonjol (ikon + warna bahaya). Fokus papan ketik dipindahkan ke judul kartu umpan balik.
- Tombol "Lanjut" menuju simpul berikutnya (atau ke (d) bila `next` adalah simpul hasil). Pilihan **tidak dapat dibatalkan** di tengah run — realisme keputusan; pengulangan selalu tersedia setelah selesai.

**(d) Hasil dan debrief mentor.**
- Narasi penutup (dari simpul hasil, nada `good|mixed|poor`).
- Blok skor: judul hasil + kunci ("Hasil: Baik — 4 dari 5 kunci"), tiga bilah sumbu berlabel angka persen, dan — bila berlaku — banner catatan keselamatan (batas kunci, §9.3).
- **Debrief mentor**: 1–3 butir tip yang dipilih deterministik (§9.4).
- Rekap jalur: daftar langkah dengan simbol verdik per simpul (✓ teladan / △ cukup / ✗ lemah / ⚠ tidak aman) + label fase; setiap butir dapat dibuka (`<details>`) untuk membaca ulang umpan baliknya.
- Aksi: "Ulangi skenario", "Ke katalog", "Skenario berikutnya" (rekomendasi §9.4).

Wireframe simpul keputusan (seluler):

```text
┌──────────────────────────────────┐
│ ← Keluar    Langkah 2 · Verifikasi│
├──────────────────────────────────┤
│ ▸ Konteks (lipat/buka)           │
├──────────────────────────────────┤
│ Narasi situasi ………………………         │
│ ┃ "Ucapan tamu…"                 │
├──────────────────────────────────┤
│ Apa tindakan Anda?               │
│ [ Opsi A …………………………………… ]        │
│ [ Opsi B …………………………………… ]        │
│ [ Opsi C …………………………………… ]        │
│ [ Opsi D …………………………………… ]        │
└──────────────────────────────────┘
```

Tanpa JS, `scenario.html` menampilkan konten statis generik: penjelasan bahwa pemutar memerlukan JavaScript (tiga bahasa) dan tautan kembali ke katalog.

### 5.4 Informasi & Pengaturan (`info.html`)

Halaman ini **sepenuhnya statis dan tiga bahasa**: kontennya ditulis tiga kali (blok `section[lang="de"]`, `[lang="en"]`, `[lang="id"]`) dan tampil berurutan tanpa JS; dengan JS, hanya blok bahasa aktif yang ditampilkan. Isi per bahasa:

1. **Tentang** — tujuan aplikasi, sifat fiksi latihan.
2. **Cara skor dihitung** — penjelasan ramah pengguna atas §9 (tiga sumbu, kunci 1–5, batas keselamatan).
3. **Prinsip SOP P1–P8** — teks lengkap §13.4 (rujukan belajar, bukan kebijakan hotel).
4. **Privasi & data** — apa persisnya yang disimpan (§7), pernyataan "tidak ada data yang dikirim ke mana pun", tombol "Hapus semua data" (konfirmasi dua langkah dalam panel sebaris yang dikelola fokusnya; tanpa JS tampil kalimat: "Penghapusan data memerlukan JavaScript, atau hapus data situs melalui pengaturan peramban Anda.").
5. **Disclaimer keselamatan** — teks penuh §13.3.
6. **Pengaturan gerak** — radio "Otomatis (ikuti perangkat) / Kurangi gerak / Gerak penuh" (JS; §11.6).
7. **Versi** — "Hotel Scenario Lab v1.0.0".

### 5.5 Aturan navigasi dan tajuk

- Nama aplikasi di tajuk selalu tautan ke `index.html`.
- Pengalih bahasa tampil di ketiga halaman aplikasi, termasuk di tengah run (§10.5).
- Tautan lompat ("Langsung ke konten") adalah elemen fokusable pertama tiap halaman.
- Hierarki judul per halaman: tepat satu h1; h2 untuk bagian; h3 untuk kartu — tanpa loncatan tingkat.

---

## 6. Model Domain

### 6.1 Tipe data

Semua teks yang tampil kepada pengguna dari data konten bertipe **Text3**:

```js
// Text3: peta bahasa → string; ketiga kunci wajib terisi non-kosong.
{ de: "…", en: "…", id: "…" }
```

**Scenario**

| Bidang | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `id` | string slug | ya | Pola `sc-NN-kebab`, unik; contoh `sc-01-checkin-standard`. |
| `category` | enum | ya | `checkin` \| `complaint` \| `upsell` \| `checkout` \| `privacy` \| `escalation`. |
| `difficulty` | int 1–3 | ya | 1 Dasar, 2 Menengah, 3 Lanjut. |
| `minutes` | int 3–10 | ya | Estimasi durasi, tampil di katalog. |
| `title` | Text3 | ya | Judul. |
| `summary` | Text3 | ya | Satu kalimat untuk katalog. |
| `context` | objek | ya | `{ place: Text3, situation: Text3, guest: Text3, constraints: Text3 }` — tempat & waktu, situasi, profil tamu fiktif, kendala operasional. |
| `goals` | Text3[2–3] | ya | Tujuan pembelajaran. |
| `startNode` | string | ya | Selalu `"n1"`. |
| `nodes` | peta id→Node | ya | Simpul keputusan `n1…n9` dan simpul hasil `x1…x9`. |
| `debrief` | objek | ya | `{ tips: { decision: Text3, language: Text3, sop: Text3 }, safetyTip: Text3, praise: Text3 }`. |
| `sopRefs` | string[] | ya | Rujukan prinsip §13.4, mis. `["P1","P2","P3"]`. |

**Node keputusan**

| Bidang | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `type` | `"decision"` | ya | — |
| `phase` | Text3 | ya | Label fase untuk penanda langkah (mis. "Sambutan"). |
| `narration` | Text3 | ya | Narasi situasi, ≤ 700 karakter per bahasa. |
| `guestLine` | Text3 \| null | ya | Kutipan ucapan tamu, ≤ 240 karakter, boleh `null`. |
| `options` | Option[3–4] | ya | Lihat di bawah. |

**Option**

| Bidang | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `id` | string | ya | `"a"`–`"d"`, unik dalam simpul. |
| `label` | Text3 | ya | Tindakan/ucapan resepsionis, ≤ 140 karakter per bahasa. |
| `scores` | objek | ya | `{ d: 0|1|2, l: 0|1|2, s: 0|1|2 }` — Keputusan, Bahasa, SOP (§9.1). |
| `flags` | objek | tidak | `{ unsafe?: true, escalate?: true }` — saling eksklusif (§8.2). |
| `feedback` | Text3 | ya | Penjelasan langsung, ≤ 350 karakter per bahasa. |
| `next` | string | ya | Id simpul tujuan (`nX` atau `xX`); wajib ada di `nodes`. |

**Node hasil**

| Bidang | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `type` | `"outcome"` | ya | — |
| `tone` | enum | ya | `good` \| `mixed` \| `poor` — hanya memengaruhi gaya visual penutup. |
| `ending` | Text3 | ya | Narasi penutup, ≤ 700 karakter. |

### 6.2 Aturan graf

1. Graf per skenario adalah **DAG** (tanpa siklus); simpul awal selalu `n1`.
2. Setiap jalur dari `n1` berakhir di tepat satu simpul hasil dan melewati **3–5 simpul keputusan** (inklusif).
3. Setiap simpul keputusan memiliki 3–4 opsi; setiap `next` merujuk simpul yang ada; tidak ada simpul yatim (semua simpul tercapai dari `n1`).
4. Pemilihan simpul hasil murni lewat tepi graf (bukan dihitung dari skor).
5. Notasi langkah pada rekap dan penyimpanan: `{ node: "n2", option: "c" }`.

---

## 7. Skema Penyimpanan (`localStorage`)

### 7.1 Kunci penyimpanan

| Kunci | Isi |
|---|---|
| `hsl.v1` | Blob JSON tunggal seluruh status aplikasi (di bawah). |
| `hsl.v1.corrupt` | Salinan mentah blob terakhir yang gagal diurai (untuk penyelamatan manual); ditimpa setiap insiden. |

Tanpa kunci lain. Tanpa *cookie*, `sessionStorage`, IndexedDB, maupun Cache API di v1.

### 7.2 Contoh blob lengkap

```json
{
  "schemaVersion": 1,
  "app": {
    "version": "1.0.0",
    "createdAt": "2026-07-26T09:12:00.000Z",
    "updatedAt": "2026-07-26T09:40:00.000Z"
  },
  "settings": { "lang": "id", "motion": "auto" },
  "activeRun": {
    "scenarioId": "sc-02-checkin-no-reservation",
    "lang": "de",
    "startedAt": "2026-07-26T09:35:00.000Z",
    "steps": [
      { "node": "n1", "option": "a" },
      { "node": "n2", "option": "c" }
    ]
  },
  "progress": {
    "sc-01-checkin-standard": {
      "attempts": 3,
      "completed": true,
      "best": { "combined": 88, "decision": 88, "language": 88, "sop": 88,
                "keys": 4, "safe": true, "at": "2026-07-26T09:30:00.000Z" },
      "last": { "combined": 74, "decision": 75, "language": 75, "sop": 72,
                "keys": 3, "safe": true, "at": "2026-07-26T09:38:00.000Z" }
    }
  }
}
```

### 7.3 Ketentuan bidang

| Jalur bidang | Tipe & rentang | Keterangan |
|---|---|---|
| `schemaVersion` | int, = 1 di v1 | Untuk migrasi (§7.5). |
| `app.version` | string semver | Konstanta `HSL.APP_VERSION`. |
| `app.createdAt` / `updatedAt` | ISO-8601 UTC | Diisi `new Date().toISOString()`. |
| `settings.lang` | `"de"|"en"|"id"` \| absen | Absen = kunjungan pertama → panel pilih bahasa. |
| `settings.motion` | `"auto"|"reduce"|"full"` | Bawaan `"auto"`. |
| `activeRun` | objek \| absen | Maksimal satu; `steps` ≤ 5 butir. |
| `progress.<id>.attempts` | int ≥ 0 | Bertambah saat run **selesai**, bukan saat mulai. |
| `progress.<id>.best/last.*` | int 0–100; `keys` 1–5; `safe` boolean | Hasil §9. `best` diganti bila `combined` baru > lama, atau sama dan `safe` baru lebih baik (true menggantikan false). `last` selalu run terakhir. |

Ukuran blob maksimum teoretis < 10 KB (12 skenario × ringkasan angka) — jauh di bawah kuota; tidak diperlukan pemangkasan.

### 7.4 Kebijakan tulis-baca

- Baca sekali saat *boot*; status dipegang di memori; setiap mutasi melalui `HSL.store.save(mutator)` yang menulis ulang blob utuh (tulis-tembus).
- Momen tulis: perubahan pengaturan; mulai run (membuat/mengganti `activeRun`); setiap pilihan (menambah `steps`); penyelesaian run (menghapus `activeRun`, memperbarui `progress`); hapus data.
- Semua akses `localStorage` dibungkus `try/catch`; mode kegagalan → §12.

### 7.5 Versi dan migrasi

`HSL.store` memiliki larik `migrations` terurut; saat `schemaVersion` tersimpan < versi kode, migrasi dijalankan berantai lalu blob ditulis ulang. Pada v1 larik ini kosong — mekanismenya ditetapkan sekarang agar v2 tidak merombak. Bila `schemaVersion` tersimpan > versi kode: data **tidak disentuh**, sesi berjalan mode memori + banner (§12 baris 4).

---

## 8. Format Penulisan Skenario (Authoring)

### 8.1 Berkas dan registri

Konten dikirim sebagai **berkas JS klasik** (bukan JSON yang di-`fetch` — `fetch` gagal pada `file://`; lihat §19 K-1). Satu berkas per skenario di `data/scenarios/`, plus registri urutan:

```js
// data/registry.js
(function () {
  "use strict";
  window.HSL = window.HSL || {};
  var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
  data.order = [
    "sc-01-checkin-standard", "sc-02-checkin-no-reservation",
    "sc-03-checkin-language-barrier", "sc-04-complaint-noise",
    "sc-05-complaint-billing", "sc-06-complaint-review-threat",
    "sc-07-upsell-arrival", "sc-08-upsell-services",
    "sc-09-checkout-rush", "sc-10-checkout-minibar-dispute",
    "sc-11-privacy-caller", "sc-12-escalation-collapse"
  ];
})();
```

```js
// data/scenarios/sc-01-checkin-standard.js — kerangka
(function () {
  "use strict";
  window.HSL = window.HSL || {};
  var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
  data.scenarios["sc-01-checkin-standard"] = { /* objek Scenario §6.1 */ };
})();
```

### 8.2 Aturan wajib penulisan

1. **Batas jalur**: setiap jalur melewati 3–5 simpul keputusan (§6.2). Cabang pemulihan (salah → simpul perbaikan) dihitung dalam batas ini.
2. **Opsi teladan**: setiap simpul keputusan memiliki **tepat satu** opsi berskor `2/2/2`. Akibatnya jalur sempurna 100 % selalu ada, dan penyebut normalisasi selalu `2 × N` (§9.2).
3. **Diferensiasi**: setiap simpul memiliki ≥ 1 opsi berjumlah skor ≤ 2 (jelas lemah); tidak ada dua opsi dengan triple skor dan tujuan `next` yang identik sekaligus.
4. **Bendera `unsafe`** hanya untuk pilihan yang menimbulkan risiko privasi/keamanan/keselamatan (membocorkan kamar, membenarkan keberadaan tamu, menunda panggilan darurat, memberi saran medis). Wajib: `s = 0` dan `d ≤ 1`. Pelanggaran kebijakan tanpa dimensi keselamatan (mis. diskon melebihi kewenangan) **bukan** `unsafe` — cukup skor rendah.
5. **Bendera `escalate`** hanya untuk eskalasi/konsultasi yang patut. Wajib: `d ≥ 1` dan `s ≥ 1` — eskalasi aman tidak pernah dihukum sebagai kegagalan. `unsafe` dan `escalate` saling eksklusif pada satu opsi.
6. **Ketersediaan eskalasi**: setiap skenario memiliki ≥ 1 opsi berkonsultasi/eskalasi yang patut di salah satu simpulnya. Pada skenario yang titik didaktisnya memang eskalasi (sc-02, sc-06, sc-11, sc-12), opsi teladan pada simpul eskalasi adalah eskalasi itu sendiri.
7. **Umpan balik**: menjelaskan *mengapa* (rujuk prinsip P1–P8 bila relevan) dan, untuk opsi non-teladan, menunjukkan *arah* yang lebih kuat tanpa mengutip verbatim label opsi teladan.
8. **Teks polos**: konten **dilarang** memuat markup HTML. Pemisah paragraf `\n\n`. Perender membuat elemen DOM dan mengisi lewat `textContent` (§13.1).
9. **Trilingual penuh**: semua Text3 terisi tiga bahasa sesuai register §10.3. Pengecualian naratif sc-03 → §10.7.
10. **Nama & data fiktif**: tamu fiktif dengan keragaman nama internasional; peran negatif tidak boleh berkorelasi dengan nama berkode asal etnis tertentu (daftar periksa T-19). Hotel tidak dinamai — sudut pandang selalu "hotel Anda". Tanpa nomor telepon kecuali 112, tanpa URL/alamat surel dalam konten.
11. **Batas panjang** (per bahasa): `label` ≤ 140; `feedback` ≤ 350; `narration`/`ending` ≤ 700; `guestLine` ≤ 240 karakter.
12. **Nominal uang**: bila diperlukan (mis. sc-05), format resi Jerman `12,50 €` dipakai identik di ketiga bahasa (realisme dokumen hotel; §10.6).

### 8.3 Contoh kanonik (sc-01, simpul `n1`, lengkap tiga bahasa)

Contoh ini **normatif** untuk gaya, register, dan granularitas skor:

```js
n1: {
  type: "decision",
  phase: { de: "Begrüßung", en: "Greeting", id: "Sambutan" },
  narration: {
    de: "Ein Gast kommt mit seinem Koffer auf den Empfang zu. Hinter ihm stellen sich zwei weitere Gäste an.",
    en: "A guest approaches the front desk with his suitcase. Two more guests line up behind him.",
    id: "Seorang tamu mendekati meja resepsionis sambil menarik koper. Dua tamu lain mulai mengantre di belakangnya."
  },
  guestLine: {
    de: "Guten Tag, ich habe eine Reservierung auf den Namen Albrecht.",
    en: "Good afternoon, I have a reservation under the name Albrecht.",
    id: "Selamat siang, saya memiliki reservasi atas nama Albrecht."
  },
  options: [
    {
      id: "a",
      label: {
        de: "Herzlich begrüßen, die Reservierung im System bestätigen und höflich um den Ausweis bitten.",
        en: "Welcome him warmly, confirm the reservation in the system, and politely ask for his ID.",
        id: "Menyambut hangat, mengonfirmasi reservasi di sistem, lalu meminta dokumen identitas dengan sopan."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
        de: "Vorbildlich: Begrüßung, Bestätigung und Identitätsprüfung in einem ruhigen Ablauf (P1, P2). Der Gast fühlt sich erwartet, und das Verfahren bleibt vollständig.",
        en: "Exemplary: greeting, confirmation and identity check in one calm sequence (P1, P2). The guest feels expected and the procedure stays complete.",
        id: "Teladan: sambutan, konfirmasi, dan pemeriksaan identitas berjalan dalam satu alur yang tenang (P1, P2). Tamu merasa disambut dan prosedur tetap lengkap."
      },
      next: "n2"
    },
    {
      id: "b",
      label: {
        de: "Freundlich begrüßen und sofort das Zimmer zusagen, ohne System oder Ausweis zu prüfen.",
        en: "Greet him warmly and promise the room right away without checking the system or his ID.",
        id: "Menyambut ramah dan langsung menjanjikan kamar tanpa memeriksa sistem atau dokumen identitas."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
        de: "Der Ton stimmt, aber ohne Prüfung riskieren Sie Verwechslungen und Lücken im Meldeverfahren (P2). Erst verifizieren, dann zusagen.",
        en: "The tone is right, but skipping verification risks mix-ups and gaps in registration (P2). Verify first, then promise.",
        id: "Nada bicara sudah tepat, tetapi tanpa verifikasi Anda berisiko salah tamu dan prosedur registrasi tidak lengkap (P2). Verifikasi dahulu, baru berjanji."
      },
      next: "n2"
    },
    {
      id: "c",
      label: {
        de: "Ohne Begrüßung knapp sagen: „Ausweis, bitte“, und die Daten prüfen.",
        en: "Skip the greeting, say curtly: “ID, please,” and check the details.",
        id: "Tanpa sambutan, berkata singkat: “Kartu identitas,” lalu memeriksa data."
      },
      scores: { d: 2, l: 1, s: 2 },
      feedback: {
        de: "Fachlich korrekt, aber der erste Eindruck entscheidet: Ohne Begrüßung wirkt die Rezeption abweisend (P1). Verfahren gut, Ton ausbaufähig.",
        en: "Procedurally correct, but first impressions decide: without a greeting the desk feels cold (P1). Good procedure, tone needs work.",
        id: "Secara prosedur benar, tetapi kesan pertama menentukan: tanpa sambutan, resepsionis terasa dingin (P1). Prosedur baik, nada perlu diperbaiki."
      },
      next: "n2"
    },
    {
      id: "d",
      label: {
        de: "Den Gast ohne Erklärung warten lassen, bis Sie Ihre andere Aufgabe beendet haben.",
        en: "Let the guest wait without explanation until you finish your other task.",
        id: "Membiarkan tamu menunggu tanpa penjelasan sampai Anda menyelesaikan pekerjaan lain."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
        de: "Jeder Gast wird sofort wahrgenommen, auch wenn Sie beschäftigt sind (P1): kurzer Blickkontakt und „Einen Moment, bitte“ genügen. Unerklärtes Warten wirkt wie Ignorieren.",
        en: "Every guest is acknowledged at once, even when you are busy (P1): brief eye contact and “one moment, please” is enough. Unexplained waiting reads as being ignored.",
        id: "Setiap tamu harus segera diakui kehadirannya walau Anda sibuk (P1): kontak mata singkat dan “mohon tunggu sebentar” sudah cukup. Menunggu tanpa penjelasan terasa seperti diabaikan."
      },
      next: "n2"
    }
  ]
}
```

### 8.4 Cuplikan opsi `unsafe` (dari sc-11)

```js
{
  id: "b",
  label: {
    de: "Bestätigen, dass Frau Weber im Haus ist, und die Zimmernummer nennen, damit der Anrufer aufhört zu drängen.",
    en: "Confirm that Ms Weber is staying here and give the room number so the caller stops pressing.",
    id: "Membenarkan bahwa Ibu Weber menginap dan menyebutkan nomor kamarnya agar penelepon berhenti mendesak."
  },
  scores: { d: 0, l: 1, s: 0 },
  flags: { unsafe: true },
  feedback: {
    de: "Niemals Anwesenheit oder Zimmernummer an Dritte bestätigen (P2, P3) — Sie können die Absicht des Anrufers nicht prüfen, und die Sicherheit des Gastes hat Vorrang. Bieten Sie stattdessen an, eine Nachricht zu übermitteln.",
    en: "Never confirm a guest's presence or room number to third parties (P2, P3) — you cannot verify the caller's intent, and the guest's safety comes first. Offer to take a message instead.",
    id: "Jangan pernah membenarkan keberadaan tamu atau menyebut nomor kamar kepada pihak ketiga (P2, P3) — niat penelepon tidak dapat Anda pastikan, dan keselamatan tamu adalah prioritas. Tawarkan untuk menyampaikan pesan."
  },
  next: "n3"
}
```

### 8.5 Daftar periksa penulis (per skenario)

- [ ] Semua aturan §8.2 terpenuhi (divalidasi otomatis `tools/check.html`, §15.3).
- [ ] Register bahasa sesuai §10.3 di ketiga bahasa; istilah sesuai tabel §10.4.
- [ ] Konteks memuat kendala operasional yang benar-benar memengaruhi pilihan.
- [ ] Momen risiko (bila ada) masuk akal dan umpan baliknya mendidik, tidak menakut-nakuti.
- [ ] Daftar periksa keselamatan konten §13.2 lulus (T-19).

---

## 9. Rubrik Penilaian (Eksak)

### 9.1 Sumbu dan nilai per opsi

Setiap opsi diberi skor penulis pada tiga sumbu, masing-masing 0, 1, atau 2:

| Nilai | **Keputusan (d)** — ketepatan tindakan | **Bahasa (l)** — register & empati | **SOP (s)** — prosedur, privasi, eskalasi, dokumentasi |
|---|---|---|---|
| 2 | Tindakan terbaik yang tersedia bagi tamu dan operasional. | Profesional, empatik, jernih. | Prosedur lengkap, termasuk verifikasi/catatan/eskalasi yang patut. |
| 1 | Dapat diterima namun suboptimal (tertunda, parsial, tidak proporsional). | Netral/kaku/canggung, tetapi tidak kasar. | Prosedur sebagian (tindakan benar, langkah formal terlewat). |
| 0 | Keliru atau merugikan. | Tidak sopan, menyalahkan, meremehkan. | Melanggar prosedur atau tidak aman. |

### 9.2 Normalisasi dan rumus

```text
N        = jumlah simpul keputusan yang dilalui pada run (3–5)
maks     = 2 × N                              // per sumbu; sah karena aturan opsi teladan (§8.2.2)
S_d      = round(100 × Σd / maks)             // round = Math.round (setengah dibulatkan ke atas)
S_l      = round(100 × Σl / maks)
S_s      = round(100 × Σs / maks)
S_gab    = round(0.40 × S_d + 0.25 × S_l + 0.35 × S_s)   // bobot: Keputusan 40 %, Bahasa 25 %, SOP 35 %
```

Bobot dijumlah 1.00. Alasan bobot: kualitas keputusan adalah inti simulasi (40 %); SOP memuat keselamatan dan privasi sehingga di atas Bahasa (35 %); Bahasa tetap dinilai bermakna (25 %) karena pengguna sedang membangun register profesional.

### 9.3 Kunci (keys) dan batas keselamatan

```text
kunci_dasar : S_gab ≥ 90 → 5 ; ≥ 75 → 4 ; ≥ 60 → 3 ; ≥ 40 → 2 ; selain itu → 1
safe        = tidak ada opsi berbendera unsafe yang dipilih pada run
kunci_akhir = safe ? kunci_dasar : min(kunci_dasar, 3)    // batas keselamatan
```

Bila batas keselamatan aktif, layar hasil **wajib** menampilkan banner catatan keselamatan yang menyebut pilihan pemicunya, dan lencana skor terbaik di katalog diberi penanda peringatan selama `best.safe = false`. Catatan desain: run tidak aman bisa saja tetap berkunci lebih tinggi daripada run aman yang buruk — ini disengaja; batas + banner + tip keselamatan (§9.4) adalah mekanisme pembelajarannya, bukan penghancuran skor.

Verdik per simpul untuk rekap jalur (§5.3d): jumlah `d+l+s` opsi terpilih → 6 = ✓ teladan; 3–5 = △ cukup; 0–2 = ✗ lemah; opsi `unsafe` = ⚠ (menimpa simbol lain).

### 9.4 Debrief mentor (deterministik)

Maksimal 3 tip, dipilih berurutan dari `scenario.debrief`:

1. Bila run tidak aman (`safe = false`) → `safetyTip` selalu menjadi tip pertama.
2. Sumbu dengan skor terendah → tip sumbu tersebut (`tips.decision|language|sop`). Bila seri, prioritas pemilihan: SOP > Keputusan > Bahasa.
3. Bila `S_gab ≥ 90` dan `safe` → `praise` + rekomendasi lanjutan.

Rekomendasi "Skenario berikutnya": skenario pertama menurut `data.order` yang belum `completed`; bila semua selesai, yang pertama dengan `best.keys < 5`; bila semua berkunci 5 → status "semua dikuasai" (§12 baris 13) dengan saran mengulang dalam bahasa lain.

### 9.5 Kasus emas (golden cases)

Mesin skor wajib mereproduksi persis (T-10):

| Kasus | Skor per simpul (d/l/s) | N | Σd Σl Σs | S_d | S_l | S_s | S_gab | Kunci | safe |
|---|---|---|---|---|---|---|---|---|---|
| A | 2/2/2 · 2/2/2 · 2/2/2 · 2/2/2 | 4 | 8 8 8 | 100 | 100 | 100 | 100 | 5 | ya |
| B | 2/2/2 · 1/2/1 · 2/1/2 · 2/2/2 | 4 | 7 7 7 | 88 | 88 | 88 | 88 | 4 | ya |
| C | 2/2/2 · 0/1/0⚠ · 1/1/1 · 2/2/2 | 4 | 5 6 5 | 63 | 75 | 63 | 66 | 3 | tidak |
| D | 2/2/2 · 2/2/2 · 0/1/0⚠ · 2/2/2 | 4 | 6 7 6 | 75 | 88 | 75 | 78 | 3 (dasar 4, dibatasi) | tidak |

Rincian pembulatan: kasus B 7/8 = 87.5 → 88; kasus C `0.40·63 + 0.25·75 + 0.35·63 = 66.0` → 66; kasus D `0.40·75 + 0.25·88 + 0.35·75 = 78.25` → 78 → kunci dasar 4 → dibatasi menjadi 3 karena ⚠.

---

## 10. Strategi Bahasa DE / EN / ID

### 10.1 Prinsip

1. Tiga bahasa **setara dan lengkap**: setiap string antarmuka dan setiap Text3 konten wajib terisi ketiganya; kelengkapan ditegakkan alat pemeriksa (§15.3), bukan disiplin semata.
2. Preferensi bahasa persisten (`settings.lang`); alih bahasa selalu tersedia dan instan (tanpa muat ulang).
3. Acuan nuansa: untuk **dialog skenario**, versi DE menjadi acuan (realisme operasional hotel Jerman — ditulis lebih dulu); untuk **teks antarmuka**, string kanonik berbahasa Indonesia dalam spesifikasi ini (§12) menjadi acuan makna.

### 10.2 Struktur kamus UI

Satu berkas per bahasa (`i18n/de.js`, `i18n/en.js`, `i18n/id.js`), ketiganya dimuat di semua halaman aplikasi (ukuran kecil; alih bahasa instan tanpa pemuatan susulan). Bentuk:

```js
(function () {
  "use strict";
  window.HSL = window.HSL || {};
  var i18n = (HSL.i18n = HSL.i18n || { dict: {} });
  i18n.dict.id = {
    "ui.skip": "Langsung ke konten",
    "ui.lang.label": "Bahasa",
    "ui.player.question": "Apa tindakan Anda?",
    "ui.player.continue": "Lanjut",
    "ui.player.step": "Langkah {n} · {phase}",
    "ui.debrief.title": "Debrief Mentor"
    // … kunci lain, ruang nama: ui.nav / ui.home / ui.player / ui.debrief / ui.info / ui.banner
  };
})();
```

Aturan kunci: datar, berawalan ruang nama, identik persis di ketiga kamus (paritas diverifikasi T-08). Substitusi parameter dengan `{nama}`. **Frasa wajib netral-jumlah** (gaya "label: nilai", mis. "Selesai: 3/12") — v1 tidak mengimplementasikan pluralisasi.

### 10.3 Register per bahasa

| Bahasa | Register antarmuka & opsi resepsionis | Catatan |
|---|---|---|
| DE | Sie-Form konsisten; bahasa hotel baku ("Herzlich willkommen", "Dürfte ich…"). | Ucapan tamu boleh sesuai karakter (tetap tanpa kata kasar). |
| EN | Profesional-ramah, tanpa slang ("Certainly", "I do apologize"). | Ejaan Inggris Britania. |
| ID | Bahasa Indonesia baku dan formal; sapaan "Anda" (kapital). | Istilah baku: sif, resepsionis, tagihan, serah terima. |

### 10.4 Terminologi inti (wajib konsisten)

| DE | EN | ID |
|---|---|---|
| Rezeption | front desk | meja resepsionis |
| Check-in / Check-out | check-in / check-out | check-in / check-out |
| Zimmerschlüssel (Wertung) | keys (score) | kunci (skor) |
| Beschwerde | complaint | keluhan |
| Zusatzverkauf | upsell | penawaran tambahan |
| Upgrade | upgrade | upgrade |
| Rechnung | invoice | tagihan |
| Schicht | shift | sif |
| Vorgesetzte / Vorgesetzter | supervisor | atasan |
| Übergabe | handover | serah terima |

### 10.5 Perilaku alih bahasa saat runtime

1. `HSL.i18n.setLang(kode)` memperbarui `settings.lang`, atribut `document.documentElement.lang`, judul dokumen, dan merender ulang tampilan aktif.
2. Alih bahasa **di tengah run diizinkan**: simpul aktif dirender ulang dalam bahasa baru; `steps`, skor, dan posisi tidak berubah (SK-14). `activeRun.lang` diperbarui (metadata bahasa terakhir run).
3. Rantai cadangan (fallback) pemilihan teks Text3/kamus: bahasa terpilih → `de` → `en` → `id`. Karena pemeriksa kelengkapan wajib lulus, cadangan ini hanyalah jaring pengaman runtime.
4. Format tanggal-waktu tampilan memakai `Intl.DateTimeFormat` dengan lokal `de-DE` / `en-GB` / `id-ID` (API bawaan peramban, bukan dependensi).

### 10.6 Konvensi format konten

- Waktu: format 24 jam "15:05" identik di ketiga bahasa (konteks operasional).
- Uang: format resi Jerman `12,50 €` identik di ketiga bahasa (§8.2.12).
- Angka desimal lain dihindari dalam konten naratif.

### 10.7 Pengecualian naratif sc-03 (kendala bahasa)

Premis sc-03 adalah tamu yang kesulitan berbahasa. Ucapan tamu ditulis sebagai **tuturan terbata dalam bahasa antarmuka aktif** (per bahasa, tetap Text3 lengkap — mis. "Entschuldigung… wir… Zimmer? Reserviert… Name Morel."), sehingga inti didaktisnya (strategi komunikasi: bicara perlahan, alat bantu visual, kesabaran) terjaga di ketiga bahasa tanpa merusak aturan kelengkapan trilingual. Bila sebuah `guestLine` sengaja berbahasa tetap yang berbeda dari antarmuka, elemen kutipan wajib diberi atribut `lang` yang sesuai.

---

## 11. Aksesibilitas, Responsivitas, Estetika, dan Gerak

### 11.1 Baseline aksesibilitas (WCAG 2.2 AA)

1. Kontras: teks ≥ 4.5:1; teks besar dan komponen antarmuka ≥ 3:1 (T-13).
2. Target sentuh ≥ 44 × 44 px CSS; jarak antaropsi ≥ 8 px.
3. Zoom pengguna tidak dihalangi (`<meta name="viewport" content="width=device-width, initial-scale=1">` tanpa `maximum-scale`/`user-scalable=no`); tata letak tetap berfungsi pada zoom teks 200 %.
4. Warna tidak pernah menjadi satu-satunya penanda: cip sumbu dan verdik selalu berlabel teks/angka/ikon.
5. Tidak ada konten berkedip atau bergerak otomatis berulang.
6. Semantik: elemen asli (`<button>`, `<a>`, `<details>`, landmark `<header> <nav> <main> <footer>`); `aria-pressed` pada pengalih bahasa; `aria-live="polite"` hanya untuk banner status (§12); hierarki judul §5.5.

### 11.2 Papan ketik dan fokus

- Seluruh alur dapat diselesaikan dengan Tab/Shift-Tab/Enter/Space; urutan fokus = urutan DOM; tanpa jebakan fokus.
- `:focus-visible`: cincin 3 px warna `--c-primary` dengan `outline-offset: 2px`; di atas permukaan gelap (tombol primer) cincin putih. Cincin fokus tidak pernah dianimasikan dan tidak pernah `outline: none` tanpa pengganti.
- Manajemen fokus pemutar: setelah memilih opsi → fokus ke judul kartu umpan balik (`tabindex="-1"` + `focus()`); setelah "Lanjut" → fokus ke judul langkah baru; masuk debrief → fokus ke judul hasil. Gulir mengikuti fokus (§11.6).

### 11.3 Pembaca layar

- `document.documentElement.lang` selalu = bahasa aktif; kutipan berbahasa lain diberi `lang` per elemen (§10.7).
- Skor dibacakan bermakna: bilah sumbu adalah elemen dengan teks "Keputusan: 88 dari 100" (visual bilah hanyalah dekorasi `aria-hidden`).
- Ikon SVG dekoratif `aria-hidden="true"`; ikon bermakna diberi nama aksesibel.
- Uji asap: NVDA + Firefox (desktop) dan VoiceOver + Safari (iOS) menyelesaikan satu skenario penuh (T-12).

### 11.4 Breakpoint dan tata letak

Mobile-first; lebar acuan 320, 375, 768, 1024, 1440 px:

| Rentang | Katalog | Pemutar | Lain-lain |
|---|---|---|---|
| 320–374 | 1 kolom; tipografi langkah terkecil skala | 1 kolom; konteks dalam `<details>` | Tajuk rapat, pengalih bahasa tetap terlihat |
| 375–767 | 1 kolom | 1 kolom | Ruang napas standar |
| 768–1023 | Grid 2 kolom | Kolom tunggal terpusat, lebar maks 680 px | — |
| 1024–1439 | Grid 3 kolom | 2 kolom: konten (maks 680 px) + panel konteks permanen | — |
| ≥ 1440 | Grid 3 kolom, lebar konten maks 1200 px terpusat | idem, spasi diperbesar | — |

Teknik: CSS Grid + Flexbox, custom properties, `clamp()`; tanpa gulir horizontal di semua rentang (T-14); panjang baris teks naratif maks ±65ch.

### 11.5 Token desain (estetika "operasional hotel yang tenang dan premium")

```css
:root {
  /* Warna — pasangan pemakaian wajib lolos audit kontras T-13;
     penyetelan lightness diizinkan asal peran & nuansa dipertahankan. */
  --c-bg: #F6F4EF;          /* latar kertas hangat */
  --c-surface: #FFFFFF;     /* kartu/permukaan */
  --c-ink: #22303A;         /* teks utama (di atas bg/surface) */
  --c-ink-soft: #4A5A66;    /* teks sekunder */
  --c-primary: #1F4D3F;     /* hijau pinus dalam; teks putih di atasnya */
  --c-accent: #8A6A2F;      /* kuningan tua — aman sebagai teks di putih */
  --c-accent-soft: #C9A961; /* kuningan terang — HANYA ornamen besar/garis, dilarang untuk teks kecil */
  --c-success: #226A4D;
  --c-warn: #7A5A18;
  --c-danger: #9F3B31;

  /* Tipografi — hanya fon sistem (tanpa fon eksternal) */
  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif;
  --text-s: clamp(0.875rem, 0.85rem + 0.2vw, 1rem);
  --text-m: clamp(1rem, 0.95rem + 0.4vw, 1.125rem);
  --text-l: clamp(1.25rem, 1.15rem + 0.8vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.3rem + 1.6vw, 2.25rem);
  --leading: 1.55;

  /* Spasi (basis 4), radius, bayangan */
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px;
  --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 64px;
  --radius-card: 12px; --radius-btn: 8px;
  --shadow-card: 0 1px 3px rgba(34, 48, 58, 0.10);

  /* Gerak */
  --dur-quick: 140ms; --dur-std: 220ms;
  --ease-out: cubic-bezier(0.2, 0.7, 0.3, 1);
}
```

Karakter visual: banyak ruang putih hangat, kartu putih beradius lembut, aksen kuningan tipis (garis atas kartu kategori, ikon kunci), ikon SVG sebaris bergaya garis (stroke 1.75 px). Tanpa gambar raster; kemewahan dicapai lewat tipografi, ritme spasi, dan warna — bukan ornamen ramai.

### 11.6 Aturan gerak

Prinsip: gerak menegaskan sebab-akibat (pilihan → umpan balik), tidak pernah menghibur diri sendiri.

| Elemen | Pemicu | Properti | Durasi | Saat gerak dikurangi |
|---|---|---|---|---|
| Kartu umpan balik | setelah memilih opsi | opacity 0→1, translateY 8px→0 | 220 ms | tampil instan |
| Pergantian tampilan (briefing/simpul/hasil) | navigasi run | crossfade opacity | 180 ms | instan |
| Ikon kunci di debrief | masuk layar hasil | scale 0.9→1 + opacity, stagger 60 ms, maks 5 elemen | 220 ms/elemen | instan, tanpa stagger |
| Bilah sumbu debrief | masuk layar hasil | width 0→nilai | 220 ms | langsung pada nilai akhir |
| Hover/fokus tombol & kartu | interaksi | background-color / border-color | 140 ms | boleh tetap (transisi warna, bukan gerak) |

Aturan global: hanya `transform`, `opacity`, dan warna yang ditransisikan; durasi maksimum 300 ms; tanpa animasi berulang/tak berujung; tanpa parallax; maksimum satu rangkaian stagger aktif pada satu waktu.

Mode gerak efektif = pengaturan pengguna (§5.4.6): `reduce` → perilaku kolom terakhir tabel; `full` → animasi penuh walau OS meminta dikurangi; `auto` (bawaan) → ikuti `prefers-reduced-motion`. Gulir-ke-fokus memakai `behavior: "smooth"` hanya bila mode efektif bukan "dikurangi"; selain itu `auto`.

---

## 12. Status Kesalahan, Kosong, dan Pemulihan

Semua banner memakai pola visual sama (ikon + teks + aksi opsional), region `aria-live="polite"`, dan dapat ditutup kecuali dinyatakan lain. Teks kanonik (ID) di bawah adalah acuan makna; DE/EN ditulis saat implementasi sesuai §10.

| # | Kondisi | Perilaku wajib | Teks kanonik (ID) |
|---|---|---|---|
| 1 | Kunjungan pertama (belum ada `settings.lang`) | Panel pilih bahasa di beranda (§5.2.2); konten statis tetap DE sampai dipilih | "Willkommen · Welcome · Selamat datang — pilih bahasa Anda." |
| 2 | `localStorage` tidak dapat diakses (dinonaktifkan/privat) | Mode memori: aplikasi tetap berfungsi penuh dalam sesi; banner tampil tiap awal sesi | "Penyimpanan lokal tidak tersedia. Latihan tetap dapat dijalankan, tetapi kemajuan tidak akan tersimpan setelah halaman ditutup." |
| 3 | Blob gagal diurai / bentuk tidak valid | Salin mentah ke `hsl.v1.corrupt`, inisialisasi baru, banner | "Data kemajuan sebelumnya tidak dapat dibaca dan telah diamankan. Kemajuan dimulai dari awal." |
| 4 | `schemaVersion` tersimpan > versi kode | Data tidak disentuh; sesi mode memori + banner | "Data ini dibuat oleh versi aplikasi yang lebih baru. Untuk melindungi data Anda, sesi ini berjalan tanpa penyimpanan." |
| 5 | `setItem` gagal (kuota) | Hapus `hsl.v1.corrupt`, coba ulang sekali; bila tetap gagal → mode memori + banner #2 | (banner #2) |
| 6 | `?id` absen / tidak dikenal di `scenario.html` | Panel kesalahan menggantikan pemutar | "Skenario tidak ditemukan. Tautan yang Anda buka tidak merujuk ke skenario yang tersedia." + tombol "Kembali ke katalog" |
| 7 | Data konten gagal termuat (registri kosong / skenario hilang) | Panel kesalahan muat | "Konten latihan gagal dimuat. Muat ulang halaman; bila masalah berlanjut, pasang ulang berkas aplikasi." |
| 8 | Run aktif ada untuk skenario yang dibuka | Panel lanjutkan menggantikan tombol mulai; dua aksi | "Lanjutkan latihan? Anda berhenti di Langkah {n}." — "Lanjutkan" / "Mulai dari awal" |
| 9 | Run aktif milik skenario lain, pengguna memulai run baru | Run lama dibuang **saat** "Mulai latihan" ditekan (bukan saat halaman dibuka); tanpa dialog | — |
| 10 | Muat ulang / tutup halaman di tengah run | `activeRun` persisten → kembali ke kondisi #8 | (panel #8) |
| 11 | Galat JS runtime tak tertangani di halaman pemutar (`window.onerror`) | Banner generik tak dapat ditutup + tautan muat ulang; run terakhir tetap tersimpan | "Terjadi kesalahan teknis. Muat ulang halaman untuk melanjutkan; kemajuan Anda tersimpan." |
| 12 | Belum ada progres sama sekali (status kosong beranda) | Ringkasan kemajuan diganti ajakan ramah | "Belum ada latihan yang diselesaikan. Mulailah dari skenario pertama — sekitar 5 menit." |
| 13 | Semua skenario berkunci 5 | Panel selebrasi tenang di beranda | "Semua skenario telah Anda kuasai. Asah terus kemampuan Anda: ulangi skenario dalam bahasa lain." |
| 14 | JavaScript nonaktif | Konten statis §5.2/§5.4 + `<noscript>` tiga bahasa | "Latihan interaktif memerlukan JavaScript. Katalog dan halaman informasi tetap dapat dibaca." (×3 bahasa) |

Prinsip umum pemulihan: aplikasi **tidak pernah** menghapus data pengguna tanpa perintah eksplisit (pengecualian: blob korup yang memang tak terbaca — itu pun diamankan dulu ke `hsl.v1.corrupt`), dan tidak pernah gagal senyap: setiap kondisi abnormal menghasilkan banner/panel dari tabel ini.

---

## 13. Pagar Pengaman Keamanan, Privasi, dan Konten

### 13.1 Teknis

1. **Nol jaringan**: dilarang memakai `fetch`, `XMLHttpRequest`, `navigator.sendBeacon`, `WebSocket`, `EventSource`, `importScripts`, serta URL eksternal pada `src`/`href`/`@import`. Ditegakkan lewat audit grep + inspeksi panel Network (T-01, T-02).
2. **Nol dependensi**: tanpa pustaka, CDN, fon eksternal, ikon pihak ketiga; hanya berkas lokal repo.
3. **Kebersihan kode**: dilarang `eval`/`new Function`, dilarang atribut event sebaris (`onclick=` dsb.), dilarang `<style>`/gaya sebaris, dilarang `javascript:`. Pengecualian tunggal: satu `<script>` sebaris satu baris per halaman — `document.documentElement.classList.add("js")` — untuk peningkatan progresif (dipakai CSS menyembunyikan blok yang butuh JS).
4. **Perenderan aman**: seluruh teks konten masuk DOM lewat `textContent`/pembuatan elemen; dilarang `innerHTML` berisi string konten (§8.2.8). Konten tidak mengandung markup.
5. **Tanpa CSP meta**: `Content-Security-Policy` via `<meta>` tidak dipakai karena berperilaku tidak konsisten pada origin `file://`; kompensasinya adalah audit T-01 (lihat §19 K-2).
6. **Tanpa input teks bebas** (§3.7): tidak ada jalur masuk data pribadi.
7. **Penyimpanan**: hanya kunci `hsl.*` (§7.1); "Hapus semua data" menghapus semuanya (SK-15).

### 13.2 Aturan keselamatan konten (wajib per skenario)

1. **Fiksi total**: semua tamu, kejadian, dan angka adalah rekaan; hotel tidak dinamai ("hotel Anda"); tanpa data pribadi nyata; tanpa merek nyata.
2. **Tanpa klaim medis otoritatif**: satu-satunya jangkar faktual yang diizinkan adalah nomor darurat Eropa **112** dan tindakan operasional generik (hubungi layanan darurat, informasikan penanggung jawab, dampingi tamu, sambut petugas). Dilarang: instruksi P3K/CPR, saran obat, diagnosis, dan penilaian kondisi medis. Umpan balik merujuk "pelatihan pertolongan pertama resmi dan instruksi petugas", bukan langkah medis.
3. **Tanpa klaim hukum otoritatif**: dilarang kalimat bergaya "undang-undang mewajibkan…"; gunakan "umumnya hotel menerapkan… — ikuti SOP hotel Anda". Formulir registrasi disebut generik tanpa mengutip pasal.
4. **Tanpa kebijakan hotel karangan yang spesifik**: angka kompensasi, batas diskon, dan aturan internal selalu dibingkai "sesuai batas kewenangan yang ditetapkan hotel Anda" — skenario menguji *prinsip* (kenali batas, eskalasi), bukan angka kebijakan.
5. **Privasi sebagai norma yang boleh diajarkan**: "jangan membenarkan keberadaan tamu / menyebut nomor kamar kepada pihak ketiga; verifikasi identitas sebelum membuka informasi" adalah praktik universal keselamatan tamu dan **wajib** diajarkan sebagai norma (P2, P3).
6. **Eskalasi selalu terhormat**: memilih berkonsultasi/eskalasi yang patut tidak pernah dinilai 0 (§8.2.5); *debrief* menegaskan eskalasi sebagai profesionalisme, bukan kelemahan.
7. **Opsi salah tetap bermartabat**: opsi lemah menggambarkan kekeliruan profesional yang realistis (dingin, terburu-buru, melewati prosedur); dilarang konten pelecehan, stereotip, atau diskriminasi — termasuk sebagai "pilihan salah".
8. **Anti-stereotip penamaan**: peran negatif/positif didistribusikan lintas nama beragam asal (T-19).
9. **Topik sensitif dijaga kadarnya**: sc-11 (penelepon) dan sc-12 (tamu kolaps) ditulis netral-profesional tanpa dramatisasi grafis; alasan aturan dijelaskan di *debrief* (perlindungan tamu), bukan lewat menakut-nakuti.

### 13.3 Teks disclaimer (kanonik, tiga bahasa — tampil di `info.html`, ringkasannya di kaki beranda)

> **ID** — Aplikasi ini adalah alat latihan berbasis fiksi. Seluruh hotel, tamu, dan kejadian adalah rekaan. Aplikasi ini tidak memuat kebijakan hotel yang sebenarnya dan bukan sumber nasihat medis, hukum, atau keamanan. Dalam situasi nyata, selalu ikuti SOP hotel Anda dan arahan atasan Anda. Dalam keadaan darurat di Jerman, hubungi 112.
>
> **DE** — Diese Anwendung ist ein fiktives Übungswerkzeug. Alle Hotels, Gäste und Ereignisse sind erfunden. Sie enthält keine echten Hotelrichtlinien und ist keine Quelle für medizinischen, rechtlichen oder sicherheitsbezogenen Rat. Folgen Sie in realen Situationen stets den SOPs Ihres Hotels und den Anweisungen Ihrer Vorgesetzten. Wählen Sie im Notfall in Deutschland die 112.
>
> **EN** — This application is a fictional practice tool. All hotels, guests and events are invented. It contains no real hotel policies and is not a source of medical, legal or security advice. In real situations, always follow your hotel's SOPs and your supervisor's instructions. In an emergency in Germany, call 112.

### 13.4 Prinsip SOP generik P1–P8 (rujukan belajar dalam aplikasi)

Prinsip berikut adalah **materi ajar generik** (bukan kebijakan hotel mana pun), tampil di `info.html` dan dirujuk `sopRefs`/umpan balik. Teks kanonik ID; DE/EN ditulis saat implementasi sesuai §10:

- **P1 — Sambutan dan pengakuan.** Sapa setiap tamu dengan hangat dan profesional; akui kehadirannya segera walau Anda sedang sibuk.
- **P2 — Verifikasi sebelum informasi.** Pastikan identitas dan kewenangan pihak yang bertanya sebelum membuka informasi apa pun.
- **P3 — Kerahasiaan tamu.** Jangan pernah menyebut nomor kamar dengan keras atau membenarkan keberadaan tamu kepada pihak ketiga.
- **P4 — Pemulihan layanan.** Dengarkan sampai selesai, berempati, minta maaf atas ketidaknyamanan, tawarkan solusi, dan pastikan tindak lanjut.
- **P5 — Batas kewenangan dan eskalasi.** Kenali batas kewenangan Anda; saat ragu atau saat situasi melampaui batas itu, eskalasi ke atasan adalah tindakan profesional, bukan kegagalan.
- **P6 — Dokumentasi.** Catat insiden, keluhan, dan penyelesaiannya pada log serah terima agar sif berikutnya siap.
- **P7 — Keadaan darurat.** Hubungi layanan darurat (di Jerman: 112), informasikan penanggung jawab, dampingi tamu, dan jangan memberikan diagnosis atau tindakan medis di luar pelatihan resmi Anda.
- **P8 — Penawaran jujur.** Tawarkan layanan berdasarkan kebutuhan tamu dengan informasi yang benar; terima penolakan dengan anggun.

---

## 14. Garis Besar Konten 12 Skenario

Format tiap butir: slug — judul (ID · DE · EN) — kategori, kesulitan, simpul keputusan (per jalur), estimasi menit. Diikuti premis, kendala operasional, tujuan, kerangka fase, momen risiko, titik eskalasi, dan `sopRefs`. Distribusi: check-in 3, keluhan 3, upsell 2, check-out 2, privasi 1, eskalasi 1; kesulitan 1×3, 2×6, 3×3.

**1. `sc-01-checkin-standard`** — "Check-in Tamu dengan Reservasi" · "Check-in mit Reservierung" · "Check-in with a Reservation" — checkin, ★1, 4 simpul, ±5 mnt.
Premis: Herr Albrecht (58) tiba pukul 15:05 dengan reservasi 3 malam; kamar siap; dua tamu mengantre di belakang. Kendala: rekan Anda sedang istirahat. Tujuan: alur sambutan–verifikasi–informasi; penyampaian nomor kamar secara diskret. Fase: Sambutan → Verifikasi → Informasi kamar & fasilitas → Penutup. Momen risiko: menyebut nomor kamar dengan lantang di lobi ramai (`unsafe`, P3). Eskalasi: tersedia opsi berkonsultasi (patut, skor menengah — skenario dasar tidak menuntut eskalasi). `sopRefs: P1, P2, P3`.

**2. `sc-02-checkin-no-reservation`** — "Reservasi Tidak Ditemukan Larut Malam" · "Keine Reservierung im System" · "Late-Night Missing Reservation" — checkin, ★2, 5 simpul, ±7 mnt.
Premis: 23:40, Ms Tan kelelahan menunjukkan surel konfirmasi; sistem tidak menemukan apa pun. Kendala: Anda sendirian; penanggung jawab malam hanya via telepon; dua kamar belum teralokasi. Tujuan: menenangkan, pencarian sistematis (ejaan nama, tanggal, kanal), menawarkan solusi, tahu kapan menelepon penanggung jawab. Fase: Menenangkan → Pencarian → Opsi solusi → Eskalasi → Penyelesaian. Momen risiko: menyalahkan tamu/kanal pemesanan; menjanjikan pengembalian dana di luar kewenangan (skor rendah, bukan `unsafe`). Eskalasi: opsi teladan pada simpul 4 = menelepon penanggung jawab sesuai prosedur. `sopRefs: P1, P4, P5, P6`.

**3. `sc-03-checkin-language-barrier`** — "Tamu dengan Kendala Bahasa" · "Gast mit Sprachbarriere" · "Guest with a Language Barrier" — checkin, ★2, 4 simpul, ±6 mnt.
Premis: pasangan lansia Morel hampir tidak menguasai bahasa bersama; antrean bertambah. Kendala: rekan yang multibahasa baru kembali 15 menit lagi. Tujuan: bicara perlahan dan sederhana, alat bantu visual (peta, angka tertulis), menjaga martabat tamu, mengelola antrean. Fase: Kontak awal → Strategi komunikasi → Penyelesaian kebutuhan → Penutup. Momen risiko: meninggikan suara/menirukan logat (Bahasa 0); mengabaikan antrean. Eskalasi: meminta bantuan rekan multibahasa saat tersedia (patut). Catatan naratif: §10.7. `sopRefs: P1, P4`.

**4. `sc-04-complaint-noise`** — "Keluhan Kebisingan Malam Hari" · "Lärmbeschwerde am Abend" · "Evening Noise Complaint" — complaint, ★1, 4 simpul, ±5 mnt.
Premis: 23:00, Frau Sommer menelepon dari kamar: berisik dari kamar sebelah; ini malam kedua. Kendala: okupansi 92 % — pilihan pindah kamar terbatas malam ini. Tujuan: pemulihan layanan (P4), menawarkan opsi realistis, tindak lanjut dan dokumentasi. Fase: Mendengarkan → Empati & permintaan maaf → Solusi → Tindak lanjut. Momen risiko: menjanjikan hal yang tak bisa dipenuhi; jawaban "tidak ada yang bisa saya lakukan". Eskalasi: informasikan penanggung jawab bila gangguan berlanjut. `sopRefs: P4, P6`.

**5. `sc-05-complaint-billing`** — "Selisih Tagihan di Meja Depan" · "Strittige Rechnung an der Rezeption" · "Billing Discrepancy at the Desk" — complaint, ★2, 4 simpul, ±6 mnt.
Premis: Herr Weiland menunjukkan tagihan: sarapan tertagih dua kali (2 × 19,00 €) dan minibar yang ia yakini keliru; ia malu sekaligus kesal; antrean menunggu. Tujuan: verifikasi baris demi baris tanpa menyalahkan, koreksi dalam batas kewenangan, dokumentasi. Fase: Mendengarkan → Verifikasi → Koreksi & batas kewenangan → Penutup. Momen risiko: menuduh tamu berbohong; menghapus tagihan di luar kewenangan "supaya cepat". Eskalasi: penyesuaian melampaui batas → atasan. `sopRefs: P4, P5, P6`.

**6. `sc-06-complaint-review-threat`** — "Ancaman Ulasan Negatif" · "Drohung mit schlechter Bewertung" · "Threat of a Bad Review" — complaint, ★3, 5 simpul, ±7 mnt.
Premis: Herr Brandt menuntut satu malam gratis atas keluhan yang samar, sambil mengancam "bintang satu di semua platform"; lobi ramai. Tujuan: memisahkan keluhan sah dari tekanan, tetap profesional, remedi proporsional, tidak menukar prosedur dengan ulasan, dokumentasi + eskalasi. Fase: Mendengarkan → Klarifikasi substansi → Tawaran proporsional → Menghadapi tekanan → Eskalasi & dokumentasi. Momen risiko: menyerah pada tekanan di luar kewenangan (SOP 0); balas konfrontatif. Eskalasi: opsi teladan simpul 5 = serahkan ke atasan dengan ringkasan fakta. `sopRefs: P4, P5, P6`.

**7. `sc-07-upsell-arrival`** — "Penawaran Peningkatan Kamar" · "Zimmer-Upgrade anbieten" · "Offering a Room Upgrade" — upsell, ★1, 3 simpul, ±4 mnt.
Premis: Bapak dan Ibu Santoso check-in dan menyebut sedang merayakan ulang tahun pernikahan. Kendala: tersisa dua kamar pemandangan laut dengan selisih tarif tetap. Tujuan: membaca sinyal kebutuhan, menawarkan nilai secara jujur, menerima penolakan dengan anggun. Fase: Membaca kebutuhan → Penawaran → Respons atas keputusan. Momen risiko: menekan berulang; mengarang diskon (SOP 0 — pelanggaran kejujuran, bukan `unsafe`). Eskalasi: tidak dituntut; opsi konsultasi tersedia. `sopRefs: P1, P8`.

**8. `sc-08-upsell-services`** — "Penawaran Sarapan dan Late Check-out" · "Frühstück und Late Check-out anbieten" · "Selling Breakfast and Late Check-out" — upsell, ★2, 4 simpul, ±5 mnt.
Premis: Ms Rossi, tamu bisnis, check-in pukul 21:30 dengan rapat pagi. Kendala: kapasitas sarapan pukul 07:00–08:00 hampir penuh. Tujuan: penawaran relevan-kontekstual, kejujuran tentang jam ramai, tanpa janji berlebihan. Fase: Menggali kebutuhan → Penawaran sarapan → Penawaran late check-out → Penutup. Momen risiko: menjual slot yang tidak tersedia (SOP 0). Eskalasi: tidak dituntut; opsi konsultasi tersedia. `sopRefs: P4, P8`.

**9. `sc-09-checkout-rush`** — "Check-out pada Jam Sibuk" · "Check-out zur Stoßzeit" · "Rush-Hour Check-out" — checkout, ★2, 4 simpul, ±6 mnt.
Premis: 07:50, enam tamu mengantre; Mr Adeyemi harus mengejar shuttle bandara pukul 08:05. Kendala: pencetak tagihan lambat; Anda berdua saja di meja. Tujuan: triase yang adil dan transparan, efisiensi tanpa kehilangan keramahan, akurasi tagihan di bawah tekanan, kerja tim. Fase: Triase antrean → Proses cepat → Akurasi tagihan → Penutup. Momen risiko: melewatkan verifikasi demi cepat (tagihan salah); ketus kepada antrean. Eskalasi: memanggil rekan back-office saat antrean memanjang (patut). `sopRefs: P1, P4, P5, P6`.

**10. `sc-10-checkout-minibar-dispute`** — "Sengketa Minibar saat Check-out" · "Minibar-Streit beim Check-out" · "Minibar Dispute at Check-out" — checkout, ★2, 4 simpul, ±5 mnt.
Premis: Herr Petersen membantah dua item minibar (7,00 €); masa inapnya sendiri campur aduk; ini momen kesan terakhir. Tujuan: verifikasi tanpa menuduh, asas praduga baik dalam batas kewenangan, mencatat umpan balik masa inap, perpisahan hangat. Fase: Mendengarkan → Verifikasi → Keputusan & dokumentasi → Perpisahan. Momen risiko: menuduh; atau diam-diam tetap menagih tanpa penjelasan (SOP 0). Eskalasi: pola kecurigaan berulang → catatan untuk atasan, bukan konfrontasi. `sopRefs: P1, P4, P5, P6`.

**11. `sc-11-privacy-caller`** — "Penelepon Menanyakan Tamu" · "Anrufer fragt nach einem Gast" · "Caller Asking About a Guest" — privacy, ★3, 4 simpul, ±6 mnt.
Premis: penelepon mengaku kakak Ms Weber, mendesak, menanyakan apakah ia menginap dan di kamar berapa; nadanya menekan; meja sedang ramai. Tujuan: jangan pernah membenarkan keberadaan/nomor kamar; alternatif aman (mencatat pesan, mencoba menyambungkan tanpa konfirmasi keberadaan); verifikasi lewat tamu, bukan lewat penelepon; eskalasi saat tekanan berlanjut. Fase: Menerima panggilan → Menahan informasi → Alternatif aman → Eskalasi. Momen risiko: membenarkan keberadaan tamu dan menyebut nomor kamar (`unsafe`, §8.4); menyampaikan klaim penelepon sebagai fakta kepada tamu. Eskalasi: opsi teladan simpul 4 = laporkan ke atasan dan catat kejadian. Nada: netral-profesional (§13.2.9). `sopRefs: P2, P3, P5, P6`.

**12. `sc-12-escalation-collapse`** — "Tamu Tidak Sadarkan Diri di Lobi" · "Bewusstloser Gast in der Lobby" · "Unconscious Guest in the Lobby" — escalation, ★3, 4 simpul, ±6 mnt.
Premis: 21:15, Frau Lindqvist limbung lalu terjatuh dekat lift dan tidak merespons. Kendala: Anda sendirian di meja; penanggung jawab via telepon; beberapa tamu berkerumun. Tujuan: prioritas mutlak panggilan darurat 112, tetap bersama tamu, mengarahkan rekan/tamu membantu (menyambut petugas, memberi ruang), menginformasikan penanggung jawab, dokumentasi serah terima. Fase: Reaksi pertama → Koordinasi bantuan → Mengelola situasi lobi → Serah terima & dokumentasi. Momen risiko: menunda 112 demi mencari gejala di internet atau menangani sendiri (`unsafe`); memberi penilaian medis. Batas konten: opsi dan umpan balik berhenti pada tindakan operasional — tanpa instruksi medis (§13.2.2). Eskalasi: inti skenario. `sopRefs: P5, P6, P7`.

---

## 15. Batas Implementasi dan Modul

### 15.1 Struktur direktori target

```text
hotel-scenario-lab/
├── index.html
├── scenario.html
├── info.html
├── css/
│   └── styles.css              # satu berkas: token → basis → komponen → utilitas
├── js/
│   ├── i18n.js                 # inti i18n (kamus dimuat terpisah)
│   ├── store.js                # localStorage + mode memori + migrasi
│   ├── engine.js               # mesin run & skor — MURNI (tanpa DOM/penyimpanan)
│   ├── ui.js                   # perender komponen + manajemen fokus
│   ├── app-index.js            # bootstrap beranda
│   ├── app-scenario.js         # bootstrap pemutar
│   └── app-info.js             # bootstrap halaman info
├── i18n/
│   ├── de.js ── en.js ── id.js # kamus UI (paritas kunci wajib)
├── data/
│   ├── registry.js             # urutan 12 skenario
│   └── scenarios/
│       └── sc-01-… .js … sc-12-… .js   # satu berkas per skenario
├── assets/
│   └── favicon.svg             # satu-satunya aset; SVG lokal
├── tools/
│   ├── check.html              # alat validasi pengembang (tak ditautkan dari aplikasi)
│   └── check.js
└── docs/
    └── superpowers/specs/2026-07-26-hotel-scenario-lab-design.md   # dokumen ini
```

### 15.2 Modul: tanggung jawab dan aturan dependensi

Semua kode berjalan sebagai **skrip klasik** `defer` dalam IIFE, berbagi satu ruang nama global `window.HSL`. **Dilarang** ES modules (`type="module"` gagal pada `file://` di Chromium; §19 K-1). Konstanta `HSL.APP_VERSION = "1.0.0"`.

| Modul | Tanggung jawab | Boleh bergantung pada |
|---|---|---|
| `i18n.js` | `t(key, params)`, `text(text3)`, `setLang`, rantai cadangan, pembaruan `lang` dokumen | `store` (baca/tulis `settings.lang`) |
| `store.js` | muat/simpan blob, mode memori, migrasi, `resetAll()`, properti `mode: "persistent"|"memory"` | — |
| `engine.js` | `createRun(scenario)`, `applyChoice(scenario, run, optionId)`, `isFinished`, `summarize(scenario, run)` — fungsi murni; `summarize` mengembalikan angka §9 + Text3 tip (pemilihan bahasa dilakukan UI) | — (nol dependensi; dapat diuji di `check.html`) |
| `ui.js` | pembuatan DOM aman (`textContent`), komponen (kartu, banner, bilah skor, panel), manajemen fokus & gulir | `i18n` |
| `app-*.js` | bootstrap per halaman: baca URL, rangkai store+engine+ui, pasang event | semua di atas + `HSL.data` |
| `data/*` | data murni (tanpa logika) | — |

Urutan muat (contoh `scenario.html`): `i18n/de.js`, `i18n/en.js`, `i18n/id.js` → `data/registry.js` → 12 berkas `data/scenarios/*.js` → `js/store.js` → `js/i18n.js` → `js/engine.js` → `js/ui.js` → `js/app-scenario.js`. Urutan boot di dalam `app-*`: `store.load()` → tentukan bahasa (atau panel pilih bahasa) → render → tampilkan blok `.js-only` (kelas `js` pada `<html>` dari satu-satunya skrip sebaris yang diizinkan, §13.1.3).

### 15.3 Alat pengembang `tools/check.html`

Halaman statis tanpa dependensi yang memuat kamus + data lalu menampilkan tabel PASS/FAIL:

1. Paritas kunci ketiga kamus UI (T-08).
2. Per skenario: seluruh aturan §6.2 dan §8.2 (DAG, batas jalur 3–5, 3–4 opsi, tepat satu opsi 2/2/2 per simpul, kelengkapan Text3, batas panjang, konsistensi bendera, target `next` sah, keterjangkauan semua simpul).
3. Menjalankan empat kasus emas §9.5 terhadap `engine.js` (T-10).
4. Mencetak daftar judul/ringkasan DE kanonik untuk dibandingkan manual dengan konten statis `index.html` (T-04).

### 15.4 Baseline peramban dan bahasa JS

- Target: Chrome/Edge/Firefox/Safari versi rilis ≥ awal 2023 (termasuk iOS Safari ≥ 16) — evergreen; tanpa dukungan peramban legasi.
- Wajib berfungsi dari `file://` (desktop) dan dari server statis apa pun; konsekuensi teknis: tanpa ES modules, tanpa `fetch` data, data sebagai skrip klasik (§8.1).
- Sintaks yang diizinkan: ES2020 tanpa modul (optional chaining, `??`, kelas, template literal). Dilarang: top-level await, import maps, dekorator.

### 15.5 Anggaran ukuran dan kinerja (tanpa minifikasi)

| Aset | Batas |
|---|---|
| `css/styles.css` | ≤ 45 KB |
| Seluruh `js/*.js` (7 berkas) | ≤ 70 KB total |
| Kamus per bahasa | ≤ 20 KB per berkas |
| Berkas skenario | ≤ 30 KB per berkas |
| Total termuat per halaman (HTML+CSS+JS+data) | ≤ 550 KB |
| Render bermakna pertama (lokal, ponsel kelas menengah) | < 1 detik |
| Pilihan → umpan balik terender | < 100 ms |

Praktik kinerja: semua `<script>` `defer`; satu berkas CSS; fon sistem; tanpa raster; hanya `transform`/`opacity`/warna yang dianimasikan; tanpa loop `requestAnimationFrame` menerus. `tools/` dikecualikan dari anggaran.

### 15.6 Urutan pembangunan yang disarankan

1. `css/styles.css` (token §11.5, basis, komponen statis) + tiga halaman HTML dengan konten statis DE.
2. `js/store.js` + mode kegagalan §12 → 3. `js/i18n.js` + tiga kamus (string §12 & UI) → 4. `js/engine.js` + `tools/check.html` dengan kasus emas → 5. `app-index` → 6. `app-scenario` (empat keadaan §5.3) → 7. `app-info` → 8. penulisan 12 skenario (DE dulu, lalu EN, lalu ID; contoh §8.3 sebagai acuan) → 9. `check.html` hijau penuh → 10. eksekusi matriks §16.

---

## 16. Matriks Uji dan Verifikasi

Semua baris wajib lulus untuk rilis v1. "Grep audit" = pencarian pola pada `*.html css/ js/ i18n/ data/ tools/ assets/` (folder `docs/` dikecualikan).

| ID | Area | Prosedur | Kriteria lulus |
|---|---|---|---|
| T-01 | Audit dependensi & kebersihan | Grep audit: `https?://`, `//` pada `src=/href=`, `@import`, `integrity=`, `crossorigin`, `fetch(`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `EventSource`, `importScripts`, `eval(`, `new Function`, `javascript:`, atribut `on*=`, tag `<style`, `type="module"` | 0 temuan; `<script>` sebaris tepat 1 per halaman (baris kelas `js`) |
| T-02 | Operasi `file://` | Buka ketiga halaman via `file://` di Chrome & Firefox; mainkan sc-01 tuntas; panel Network terbuka | Semua berfungsi; Network hanya berkas lokal; konsol tanpa galat |
| T-03 | Operasi server statis | Sajikan direktori dengan server statis apa pun (mis. `python3 -m http.server`, hanya untuk pengujian manual); uji Chrome desktop + Safari iOS nyata/simulator | Semua alur berfungsi di kedua lingkungan |
| T-04 | Tanpa JS | Nonaktifkan JS; buka ketiga halaman; bandingkan judul/ringkasan statis `index.html` dengan daftar DE kanonik dari `check.html` | Katalog & info terbaca; `<noscript>` 3 bahasa tampil; konten statis = konten data DE |
| T-05 | Penyimpanan nonaktif | Blokir penyimpanan situs di peramban; jalankan skenario tuntas | Mode memori + banner §12.2; tanpa galat konsol |
| T-06 | Data korup | Isi `hsl.v1` dengan `"{rusak"` via DevTools; muat ulang | Perilaku §12.3; `hsl.v1.corrupt` berisi string lama |
| T-07 | Kuota penuh | Timpa `localStorage.setItem` agar melempar `QuotaExceededError` (snippet DevTools); lakukan aksi simpan | Perilaku §12.5; aplikasi tetap berfungsi |
| T-08 | Paritas i18n | Buka `tools/check.html` | Paritas kunci 3 kamus = PASS; kelengkapan Text3 semua skenario = PASS |
| T-09 | Validasi graf konten | `tools/check.html` | Seluruh aturan §6.2 + §8.2 PASS untuk 12 skenario |
| T-10 | Kasus emas skor | `tools/check.html` menjalankan §9.5 | Keempat kasus menghasilkan angka persis tabel §9.5 |
| T-11 | Papan ketik penuh | Tanpa tetikus/sentuhan: pilih bahasa, buka skenario, selesaikan run, kembali ke katalog | Semua tercapai; fokus selalu terlihat; urutan §11.2 |
| T-12 | Pembaca layar | NVDA+Firefox dan VoiceOver+Safari iOS: selesaikan satu skenario | Semua konten dibacakan bermakna; perpindahan fokus §11.2 terdengar; skor terbaca sebagai teks |
| T-13 | Kontras | Ukur pasangan warna §11.5 yang dipakai (alat kontras peramban/DevTools) | Semua pasangan teks ≥ 4.5:1; komponen ≥ 3:1; `--c-accent-soft` tidak dipakai untuk teks kecil |
| T-14 | Responsif | DevTools pada 320/375/768/1024/1440; ketiga halaman + 4 keadaan pemutar | Tanpa gulir horizontal; tata letak sesuai §11.4; target sentuh ≥ 44 px |
| T-15 | Gerak dikurangi | OS/emulasi `prefers-reduced-motion` + ketiga nilai pengaturan manual | Perilaku persis tabel §11.6 untuk 6 kombinasi (3 pengaturan × ada/tidaknya preferensi OS, dgn `full`/`reduce` menimpa OS) |
| T-16 | Anggaran ukuran/kinerja | `wc -c` per aset; muat di ponsel kelas menengah | Semua batas §15.5 terpenuhi |
| T-17 | Lanjutkan run | Mulai run, pilih 2 langkah, muat ulang; juga: tutup tab & buka lagi | Panel §12.8 muncul; "Lanjutkan" meneruskan di langkah 3 dengan skor utuh; "Mulai dari awal" menghapus run |
| T-18 | Alih bahasa | Ganti bahasa di beranda, di tengah run, dan di debrief; muat ulang setelahnya | Teks berganti seluruhnya; posisi & skor run tak berubah; preferensi persisten; `html[lang]` benar |
| T-19 | Keselamatan konten | Tinjau ke-12 skenario terhadap daftar §13.2 butir demi butir; periksa distribusi nama/peran | 12 × 9 butir = lulus; temuan dicatat & diperbaiki sebelum rilis |
| T-20 | Hapus data | Jalankan "Hapus semua data" setelah ada progres + run aktif | Semua kunci `hsl.*` hilang; aplikasi kembali ke kondisi kunjungan pertama (§12.1) |

---

## 17. Pemisahan v1 / v2

**Komitmen v1** — persis ruang lingkup dokumen ini: 3 halaman aplikasi + alat pemeriksa; 12 skenario §14 tiga bahasa; rubrik §9; penyimpanan §7; seluruh pagar §13; matriks §16 lulus.

**Kandidat v2** — terdokumentasi agar v1 tidak diam-diam membengkak; **bukan komitmen**, urutan prioritas awal:

1. Ekspor/impor kemajuan (berkas JSON lokal) — memanfaatkan `schemaVersion` §7.5.
2. Mode gelap (menggandakan audit kontras — alasan ditunda, §3.5).
3. Skenario tambahan lintas departemen (housekeeping, F&B) memakai format §8 tanpa perubahan mesin.
4. Varian/pengacakan urutan opsi dan detail skenario (v1 deterministik demi verifikasi).
5. Mode tantangan berwaktu (bertentangan dengan prinsip "latihan tenang" v1 — perlu desain ulang pedagogis).
6. Tinjauan berjarak (*spaced repetition*) atas simpul yang pernah lemah.
7. PWA/manifest agar dapat "dipasang" (kebutuhan luring inti sudah terpenuhi tanpa ini).
8. Latihan pengucapan/audio (butuh aset audio — melanggar §3.6 v1).
9. Bahasa tambahan (arsitektur Text3/kamus sudah siap menampungnya).
10. Editor skenario visual di atas format §8.

Aturan evolusi: perubahan skema penyimpanan wajib lewat mekanisme migrasi §7.5; penambahan konten wajib lolos `tools/check.html` dan T-19; garis merah "For future Claude" tetap berlaku untuk semua versi.

---

## 18. Daftar Istilah

| Istilah | Makna dalam dokumen ini |
|---|---|
| Skenario | Satu unit latihan bercabang (12 buah di v1). |
| Simpul keputusan | Satu situasi dengan 3–4 opsi tindakan (`type: "decision"`). |
| Simpul hasil | Penutup naratif sebuah jalur (`type: "outcome"`). |
| Jalur | Rangkaian simpul dari `n1` hingga simpul hasil (3–5 simpul keputusan). |
| Opsi teladan | Satu-satunya opsi berskor 2/2/2 pada sebuah simpul. |
| Run | Satu kali permainan sebuah skenario, dari mulai hingga debrief. |
| Run aktif | Run yang belum selesai dan tersimpan untuk dilanjutkan (`activeRun`). |
| Kunci | Satuan skor akhir 1–5 (metafora kunci kamar hotel). |
| Batas keselamatan | Pembatasan kunci maksimum 3 bila opsi `unsafe` terpilih (§9.3). |
| Debrief mentor | Umpan balik akhir terstruktur (§9.4). |
| Text3 | Objek teks tiga bahasa `{de, en, id}` (§6.1). |
| Mode memori | Operasi tanpa persistensi saat `localStorage` gagal (§12). |
| Peningkatan progresif | Konten statis berfungsi dahulu; JS menambah interaktivitas. |

---

## 19. Catatan Keputusan (ringkas)

| # | Keputusan | Alasan |
|---|---|---|
| K-1 | Skrip klasik + data sebagai berkas JS; tanpa ES modules & tanpa `fetch` data | `type="module"` dan `fetch` berkas lokal gagal pada `file://` (CORS/origin buram di Chromium); aplikasi wajib jalan dari buka-berkas-langsung. |
| K-2 | Tanpa `<meta>` CSP | Perilaku `'self'` tidak konsisten pada origin `file://`; jaminan setara dicapai lewat larangan §13.1 + audit T-01. |
| K-3 | Konten statis pra-JS berbahasa Jerman | DE adalah bahasa operasional pelatihan; pemberitahuan `<noscript>` tetap tiga bahasa; `info.html` statis penuh tiga bahasa. |
| K-4 | Normalisasi skor dengan penyebut `2 × N` | Aturan "tepat satu opsi 2/2/2 per simpul" menjamin jalur 100 % selalu ada dan matematika tetap sederhana pada graf bercabang. |
| K-5 | Penanda langkah "Langkah n · fase", bukan bilah persen | Pada graf bercabang total langkah tidak pasti; bilah persen akan berbohong. |
| K-6 | Pilihan tidak dapat dibatalkan di tengah run | Melatih bobot keputusan nyata; pengulangan skenario selalu tersedia dan murah. |
| K-7 | Keluar dari run tanpa dialog konfirmasi | `activeRun` persisten membuat keluar tidak merusak; dialog hanya menambah gesekan. |
| K-8 | Batas keselamatan membatasi kunci pada 3 (bukan menolkan skor) | Menghukum cukup keras untuk diingat, tanpa mematikan motivasi; banner + tip keselamatan membawa pesan utamanya. |
| K-9 | Chip kategori = tautan jangkar, bukan filter | Berfungsi tanpa JS, aksesibel, dan cukup untuk 12 item. |
| K-10 | Satu blob `localStorage` (`hsl.v1`) | Migrasi atomik, penanganan korupsi sederhana, ukuran kecil (< 10 KB). |
| K-11 | Urutan opsi tidak diacak di v1 | Determinisme menyederhanakan verifikasi & dokumentasi; pengacakan menjadi kandidat v2 (§17.4). |
| K-12 | Nomor 112 satu-satunya fakta dunia nyata yang diizinkan | Nomor darurat resmi seluruh UE — akurat, stabil, dan justru bagian dari eskalasi aman yang diajarkan. |

---

*Akhir dokumen. Perubahan atas spesifikasi ini wajib memperbarui frontmatter (`version`, `date`) dan mencatat alasan di §19.*
