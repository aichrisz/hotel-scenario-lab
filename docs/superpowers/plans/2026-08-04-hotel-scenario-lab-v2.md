---
title: "Hotel Scenario Lab v2 — Rencana Implementasi"
project: hotel-scenario-lab
doc_type: implementation-plan
version: "2.0"
status: "final — siap dieksekusi tugas demi tugas"
date: 2026-08-04
spec: "docs/superpowers/specs/2026-08-04-hotel-scenario-lab-v2.md"
v1_spec: "docs/superpowers/specs/2026-07-26-hotel-scenario-lab-design.md"
baseline_commit: "9c3ebd0 (main) — validator 54/54 PASS"
plan_language: id
---

# Hotel Scenario Lab v2 Implementation Plan

**Goal**: Menambahkan lima fitur v2 (tiga skenario/kategori baru, Training des Tages, weak-axis drill, filter & sort katalog, retry dari langkah lemah) tanpa dependensi, tanpa jaringan, tanpa kenaikan `schemaVersion`, sehingga `tools/check.html` berpindah dari **54/54** ke **81/81 PASS** dengan seluruh 54 ID pemeriksaan lama tetap ada dan tetap hijau.

**Architecture**: tidak berubah dari v1 — tiga halaman statis + alat pemeriksa, skrip klasik ber-`defer` dalam IIFE pada ruang nama `window.HSL`, `engine.js` murni (tanpa DOM/`Date`/penyimpanan), persistensi satu blob `localStorage` `hsl.v1`. Seluruh logika baru yang dapat diuji ditempatkan di `engine.js`; `app-index.js`/`app-scenario.js` hanya menyusun DOM dan menyuntik waktu (`dateKey`) serta state.

**Tech Stack**: HTML5 + CSS3 + JavaScript ES2020 tanpa modul/pustaka/build. Verifikasi: `node tools/node-check.js` (harness `vm`, tanpa dependensi), `tools/check.html` di peramban, `python3 -m http.server` hanya untuk uji manual, `wc -c` untuk anggaran.

---

## 0. Cara menggunakan rencana ini

1. **Sumber kebenaran**: `docs/superpowers/specs/2026-08-04-hotel-scenario-lab-v2.md` (v2) di atas spesifikasi v1. Bila rencana dan spesifikasi bertentangan, spesifikasi menang.
2. **Kerjakan berurutan** Tugas 1 → 22. Setiap tugas menyebut prasyarat, berkas yang disentuh, kriteria selesai, dan verifikasi. Centang `[ ]` → `[x]` hanya setelah verifikasi lulus persis.
3. **Jangan melonggarkan pemeriksaan lama** agar hijau (INV-7). Bila pemeriksaan lama merah, penyebabnya ada pada perubahan Anda.
4. **Dilarang**: dependensi/paket, `fetch`/jaringan, `service worker`, ES module, `innerHTML` berisi konten, gaya sebaris, kenaikan `schemaVersion`, mengubah 12 slug pertama registri, mengubah rubrik skor v1.
5. **Git**: bekerja di *worktree* `.worktrees/v2-hsl` (branch `v2-hsl`) yang sudah ada, atau di branch v2 baru dari `9c3ebd0`. Jangan komit ke `main` langsung, jangan `push`, jangan operasi git destruktif. Komit hanya bila pengguna memintanya.
6. **Angka pemeriksaan yang diharapkan per tahap** (kriteria selesai keras): 54 → 54 → 54 → **67** → 67 → 67 → **70** → 70 → **74** → 74 → **77** → 77 → **80** → 80 → **81** → 81 …→ 81.

### 0.1 Berkas yang disentuh rencana ini

| Berkas | Sifat | Tugas |
|---|---|---|
| `tools/node-check.js` | **baru** (alat pengembang, tidak dimuat aplikasi) | 1 |
| `data/registry.js` | ubah (`categories`, `order` 15) | 2, 4 |
| `data/scenarios/sc-13-fnb-breakfast-allergy.js` | **baru** | 3 |
| `data/scenarios/sc-14-housekeeping-lost-property.js` | **baru** | 3 |
| `data/scenarios/sc-15-overbooking-walk.js` | **baru** | 3 |
| `tools/check.js` | ubah (generalisasi + 12 pemeriksaan baru) | 4, 6, 8, 10, 12, 14 |
| `tools/check.html` | ubah (3 tag skrip) | 4 |
| `index.html` | ubah (skrip, cip, 3 bagian statis, kontainer baru, versi) | 4, 5, 15, 20 |
| `scenario.html` | ubah (3 tag skrip, versi) | 4, 20 |
| `js/engine.js` | ubah (fungsi murni v2) | 5, 7, 9, 11 |
| `js/store.js` | ubah (`settings.catalog` tolerant read, versi) | 13, 20 |
| `i18n/de.js`, `i18n/en.js`, `i18n/id.js` | ubah (29 kunci baru + 1 kunci berubah) | 14 |
| `css/styles.css` | ubah (panel TOTD/drill, filter bar, lencana) | 15 |
| `js/app-index.js` | ubah (kategori dari registri, TOTD, drill, filter/sort) | 5, 16, 17, 18 |
| `js/app-scenario.js` | ubah (`dataOk`, tombol retry lemah) | 5, 19 |
| `info.html` | ubah (teks statis 3 bahasa, versi) | 20 |

Tidak ada berkas lain yang dibuat atau dihapus.

---

## Tugas 1 — Harness verifikasi Node

- [x] **Prasyarat**: tidak ada.
- **Berkas**: `tools/node-check.js` (baru).
- **Langkah**:
  1. Buat harness tanpa dependensi: buat konteks `vm` dengan objek `window` sintetis (`window.window = window`), muat berurutan `i18n/de.js`, `i18n/en.js`, `i18n/id.js`, `data/registry.js`, seluruh `data/scenarios/*.js` terurut nama, `js/engine.js`, `tools/check.js`.
  2. Jalankan `HSL.check.runAll()`, cetak `PASS/TOTAL`, cetak setiap baris FAIL (`id: detail`), `process.exitCode = 1` bila ada FAIL.
  3. Dukung tiga flag: `--legacy` (cetak status 54 ID v1: `DICT-PARITY`, `REG-ORDER`, `GOLD-A…D`, dan 4 × 12 `SC-*` slug v1; gagal bila salah satu hilang atau FAIL), `--preview=<slug,slug>` (tambahkan slug ke `HSL.data.order` **di memori** sebelum `runAll`, untuk memvalidasi berkas skenario yang belum terdaftar), `--json` (opsional, keluaran mesin).
  4. Berkas ini **tidak** ditambahkan ke `<script>` mana pun dan tidak boleh diimpor aplikasi.
- **Kriteria selesai**: `node tools/node-check.js` mencetak `54/54 PASS`; `--legacy` mencetak 54 baris PASS; `--preview=nonexistent` tidak melempar (slug tanpa objek → FAIL terkendali pada `REG-ORDER`).
- **Verifikasi**: `node tools/node-check.js && node tools/node-check.js --legacy`.

---

## Tugas 2 — Kategori sebagai data (registri jadi sumber kebenaran)

- [x] **Prasyarat**: Tugas 1.
- **Berkas**: `data/registry.js`.
- **Langkah**:
  1. Tambahkan `data.categories = ["checkin","complaint","upsell","checkout","privacy","escalation","fnb","housekeeping","overbooking"]` (urutan v1 pada posisi 1–6, tiga baru di belakang — spec §5.1).
  2. `data.order` **belum** diubah pada tugas ini (tetap 12).
- **Kriteria selesai**: `HSL.data.categories.length === 9`; `54/54 PASS` tidak berubah.
- **Verifikasi**: `node tools/node-check.js` → `54/54`.

---

## Tugas 3 — Tiga berkas skenario baru (belum terdaftar)

- [x] **Prasyarat**: Tugas 2.
- **Berkas**: `data/scenarios/sc-13-fnb-breakfast-allergy.js`, `sc-14-housekeeping-lost-property.js`, `sc-15-overbooking-walk.js` (baru).
- **Langkah**:
  1. Tulis ketiga berkas mengikuti pola berkas v1 (IIFE, `data.scenarios[slug] = {…}`, indentasi 1 spasi seperti berkas skenario lama) dan tabel normatif spesifikasi §6.1–§6.3: `category`, `difficulty`, `minutes`, `sopRefs`, `title`, `summary`, `context{place,situation,guest,constraints}`, `goals` (2–3), `nodes` `n1…n4` + `x1`, `x2`, `debrief{tips{decision,language,sop},safetyTip,praise}`.
  2. Skor, bendera (`unsafe`/`escalate`), dan `next` **wajib** persis seperti tabel spesifikasi. Teks DE/EN/ID ditulis penuh, gaya v1: narasi orang kedua sopan (DE `Sie`), umpan balik menjelaskan alasan dan merujuk kode P.
  3. Patuhi batas panjang per bahasa (`narration` ≤ 700, `guestLine` ≤ 240, `label` ≤ 140, `feedback` ≤ 350, `ending` ≤ 700) dan larangan markup.
  4. Patuhi daftar periksa keselamatan spesifikasi §15 (tanpa klaim medis/hukum; 112 satu-satunya fakta nyata; eskalasi tak pernah dihukum).
- **Kriteria selesai**:
  - `wc -c` tiap berkas ≤ 30720 byte (target ≤ 28672);
  - `node tools/node-check.js` tetap `54/54` (berkas belum terdaftar);
  - `node tools/node-check.js --preview=sc-13-fnb-breakfast-allergy,sc-14-housekeeping-lost-property,sc-15-overbooking-walk` → `SC-FIELDS/SC-TEXT3/SC-GRAF/SC-RUBRIK` untuk ketiga slug PASS (`REG-ORDER` boleh FAIL pada mode preview ini karena panjang order berubah; catat sebagai satu-satunya FAIL yang diizinkan).
- **Verifikasi**: `wc -c data/scenarios/sc-1{3,4,5}-*.js`; kedua perintah harness di atas.

---

## Tugas 4 — Pendaftaran registri + generalisasi validator (atomik)

- [x] **Prasyarat**: Tugas 3 (ketiga berkas sudah lulus mode preview).
- **Berkas**: `data/registry.js`, `tools/check.js`, `tools/check.html`, `index.html`, `scenario.html`.
- **Langkah**:
  1. `data/registry.js`: tambahkan tiga slug baru ke akhir `data.order` (12 slug pertama tak tersentuh).
  2. `tools/check.html`: tambahkan tiga tag `<script defer>` skenario baru setelah `sc-12`.
  3. `index.html` dan `scenario.html`: tambahkan tiga tag `<script defer>` yang sama, pada posisi yang sama relatif terhadap skrip lain.
  4. `tools/check.js`:
     - tambahkan `ORDER15` = `ORDER12` + tiga slug baru; `REG-ORDER` memeriksa (a) 12 slug v1 pada posisi 1–12, (b) panjang dan tiap posisi sama dengan `ORDER15`, (c) unik + objek dengan `id` cocok. ID pemeriksaan **tetap** `REG-ORDER`;
     - ganti konstanta lokal `CATS` menjadi pembacaan `HSL.data.categories` (fallback ke daftar 9 bila absen, agar `SC-FIELDS` tetap dapat berjalan);
     - tambahkan pemeriksaan **`CAT-COVER`** sesuai spesifikasi §13.2 (array 9 string, 6 kategori v1 pada posisi 1–6, setiap `category` skenario dikenal, setiap kategori punya ≥ 1 skenario).
- **Kriteria selesai**: `67/67 PASS` (2 lama + 60 per-skenario + 4 GOLD + 1 `CAT-COVER`); `--legacy` tetap 54 PASS.
- **Verifikasi**: `node tools/node-check.js` → `67/67`; `node tools/node-check.js --legacy` → 54 PASS; buka `tools/check.html` di peramban → `67/67 PASS`.

---

## Tugas 5 — Penjaga data & fondasi UI untuk 15 skenario

- [x] **Prasyarat**: Tugas 4.
- **Berkas**: `js/app-index.js`, `js/app-scenario.js`, `index.html`.
- **Langkah**:
  1. `dataOk()` pada kedua `app-*.js`: ganti `order.length === 12` → `order.length >= 12` dengan tetap memeriksa setiap slug punya objek.
  2. `js/app-index.js`: hapus konstanta `CAT_ORDER`, baca `HSL.data.categories` (fallback array kosong → jangan render bagian).
  3. `index.html`: tambahkan tiga cip jangkar (`#cat-fnb`, `#cat-housekeeping`, `#cat-overbooking`) dan tiga `<section class="catalog-section">` statis DE berisi kartu `sc-13`, `sc-14`, `sc-15` (judul + ringkasan **identik** dengan `title.de`/`summary.de`, meta kategori/kesulitan/menit sesuai data).
  4. Perbarui `ui.home.progress`? **Belum** — kunci kamus diubah di Tugas 14; pada tahap ini teks lama masih menampilkan `/12` (jendela kosmetik yang diketahui dan ditutup di Tugas 14).
- **Kriteria selesai**: `67/67` tidak berubah; buka `index.html` dari `file://` → 15 kartu tampil, 9 bagian, semua tautan kartu membuka pemutar dan skenario baru dapat diselesaikan dalam tiga bahasa; matikan JS → 15 kartu statis tetap terbaca, `<noscript>` tampil.
- **Verifikasi**: `node tools/node-check.js` → `67/67`; bandingkan judul/ringkasan statis dengan daftar kanonik pada `tools/check.html` (bagian “Daftar kanonik DE”); mainkan `sc-13`, `sc-14`, `sc-15` sampai debrief di DE/EN/ID.

---

## Tugas 6 — Engine: Training des Tages

- [x] **Prasyarat**: Tugas 5.
- **Berkas**: `js/engine.js`.
- **Langkah**:
  1. Tambahkan `dateHash(dateKey)` persis algoritme spesifikasi §7.1 (FNV-1a + finalizer, `Math.imul`, regex `^\d{4}-\d{2}-\d{2}$`, `-1` bila bentuk salah).
  2. Tambahkan `trainingOfTheDay(order, dateKey)` → `null` bila `order` bukan array tak kosong atau hash `-1`; selain itu `order[hash % order.length]`.
  3. Tanpa `Date`, tanpa DOM, tanpa penyimpanan. Ekspor keduanya pada objek `engine`.
- **Kriteria selesai**: `67/67`; pemeriksaan manual di Node: `dateHash("2026-01-01") === 4149592858`, `dateHash("2026-08-04") === 594494905`, `dateHash("2026-12-31") === 4252829426`, `dateHash("2026-1-1") === -1`.
- **Verifikasi**: `node tools/node-check.js` → `67/67` + satu skrip sekali pakai di `/tmp` untuk tiga nilai hash (jangan menambah berkas di repositori).

---

## Tugas 7 — Validator: `TOTD-DET`, `TOTD-RANGE`, `TOTD-SPREAD`

- [x] **Prasyarat**: Tugas 6.
- **Berkas**: `tools/check.js`.
- **Langkah**:
  1. `TOTD-DET`: tiga nilai hash referensi, penolakan `"2026-1-1"`/`""`/`null`/angka, konsistensi `trainingOfTheDay` dengan `order[hash % len]`, `trainingOfTheDay([], key) === null`, idempoten dua pemanggilan.
  2. `TOTD-RANGE`: bangkitkan 365 kunci tanggal 2026 secara aritmetika string (tabel panjang bulan, tanpa `Date`), pastikan hasil selalu anggota `order`.
  3. `TOTD-SPREAD`: hitung frekuensi; syarat `min ≥ max(1, floor(365/(3*len)))` dan `max ≤ ceil(3*365/len)`; sertakan `min/max` terukur pada `detail` agar regresi sebaran terlihat walaupun lulus.
- **Kriteria selesai**: `70/70 PASS`; `detail` `TOTD-SPREAD` menunjukkan `min=15 max=34` untuk registri 15 slug.
- **Verifikasi**: `node tools/node-check.js` → `70/70`.

---

## Tugas 8 — Engine: statistik sumbu & weak-axis

- [x] **Prasyarat**: Tugas 7.
- **Berkas**: `js/engine.js`.
- **Langkah**:
  1. `axisStats(order, progressMap)` → `{decision:{sum,n,avg}, language:{…}, sop:{…}, samples}`; hanya slug pada `order` dengan `best` bertiga sumbu numerik; `avg = Math.round(sum/n)`; `avg` = 0 bila `n` = 0.
  2. `weakAxis(order, progressMap, opts)` sesuai spesifikasi §8.1: `minSamples` 2, `threshold` 75, `maxSlugs` 3; tie-break **sop > decision > language**; `slugs` naik menurut `best[axis]`, seri menurut urutan registri; `null` bila sampel kurang.
  3. Murni; tanpa `activeRun`, tanpa `Date`.
- **Kriteria selesai**: `70/70` tetap; fungsi tersedia di `HSL.engine`.
- **Verifikasi**: `node tools/node-check.js` → `70/70`.

---

## Tugas 9 — Validator: `WEAK-EMPTY`, `WEAK-LOW`, `WEAK-TIE`, `WEAK-SLUGS`

- [x] **Prasyarat**: Tugas 8.
- **Berkas**: `tools/check.js`.
- **Langkah**: implementasikan empat pemeriksaan dengan fixture sintetis spesifikasi §13.4 (order `["s1","s2","s3","s4"]`, progres buatan, termasuk satu slug asing yang wajib diabaikan). Bandingkan `axis`, `avg`, `samples`, dan `slugs` (perbandingan `join(",")`).
- **Kriteria selesai**: `74/74 PASS`.
- **Verifikasi**: `node tools/node-check.js` → `74/74`.

---

## Tugas 10 — Engine: normalisasi opsi, status, filter & sort

- [x] **Prasyarat**: Tugas 9.
- **Berkas**: `js/engine.js`.
- **Langkah**:
  1. `normalizeCatalogOpts(opts, categories)`: keluarkan objek baru `{cat,status,diff,sort}`; `cat` ∈ `all` ∪ `categories`; `status` ∈ `all,new,active,done,mastered`; `diff` ∈ `all,1,2,3` (string angka dikonversi); `sort` ∈ `default,best,difficulty`; nilai asing → default.
  2. `statusOfSlug(slug, progressMap, activeRunId)` presedens `active > mastered > done > new`.
  3. `filterSortCatalog(order, scenarios, progressMap, activeRunId, opts)`: filter sesuai spesifikasi §9.2 (termasuk asimetri `done ⊇ mastered`), lalu urutkan sesuai §9.3 (`default`, `best`, `difficulty`, `weak` + `opts.axis`); pengurutan **wajib stabil** (implementasikan dengan indeks registri sebagai kunci sekunder, jangan bergantung pada stabilitas `Array.prototype.sort` bawaan).
  4. Tanpa DOM/penyimpanan; skenario yang tidak ada di `scenarios` diabaikan dengan aman.
- **Kriteria selesai**: `74/74` tetap.
- **Verifikasi**: `node tools/node-check.js` → `74/74`.

---

## Tugas 11 — Validator: `CAT-FILTER`, `CAT-SORT`, `CAT-STABLE`

- [x] **Prasyarat**: Tugas 10.
- **Berkas**: `tools/check.js`.
- **Langkah**: fixture sintetis 5 skenario (3 kategori, kesulitan 1–3), progres buatan mencakup `new/active/done/mastered`, lalu uji:
  - `CAT-FILTER`: setiap nilai `status`, `cat`, `diff`; asimetri `done ⊇ mastered`; `normalizeCatalogOpts` menolak nilai asing dan mengubah `"2"` → `2`.
  - `CAT-SORT`: `default` = urutan registri; `best` menurun dengan tanpa-`best` di belakang dan seri stabil; `difficulty` menaik stabil; `weak` dengan `axis` menaik lalu tanpa-`best`.
  - `CAT-STABLE`: 12 kombinasi opsi → tanpa duplikat, selalu himpunan bagian `order`; ketiga `sort` tanpa filter → permutasi penuh (panjang sama, himpunan sama).
- **Kriteria selesai**: `77/77 PASS`.
- **Verifikasi**: `node tools/node-check.js` → `77/77`.

---

## Tugas 12 — Engine: langkah terlemah & pemangkasan run

- [x] **Prasyarat**: Tugas 11.
- **Berkas**: `js/engine.js`.
- **Langkah**:
  1. `weakestStepIndex(scenario, run)`: telusuri seperti `summarize` (run tak dapat ditelusuri → -1); prioritas (a) langkah `unsafe` pertama, (b) kemunculan pertama total terkecil bila total < 6, (c) -1.
  2. `truncateRun(run, index)`: `index < 0` atau `>= steps.length` → kembalikan run yang sama; selain itu objek **baru** dengan `steps.slice(0,index)` dan `scenarioId/lang/startedAt` dipertahankan; run lama tidak dimutasi.
- **Kriteria selesai**: `77/77` tetap.
- **Verifikasi**: `node tools/node-check.js` → `77/77`.

---

## Tugas 13 — Validator: `RETRY-IDX`, `RETRY-TRUNC`, `RETRY-REPLAY`

- [x] **Prasyarat**: Tugas 12.
- **Berkas**: `tools/check.js`.
- **Langkah**: gunakan kembali skenario sintetis fixture `GOLD` (4 keputusan) — faktorkan pembangunnya menjadi fungsi bersama agar tidak ada duplikasi, tanpa mengubah nilai yang dipakai `GOLD-A…D`. Uji empat baris tabel spesifikasi §10.2, run korup dan run kosong → -1, immutabilitas dan bidang terjaga, serta replay `a,c,d,a` → pangkas di 1 → `a,a,a` → `combined 100`, `keys 5`, `safe true`, `N 4`.
- **Kriteria selesai**: `80/80 PASS`; `GOLD-A…D` tetap PASS dengan nilai yang sama.
- **Verifikasi**: `node tools/node-check.js` → `80/80`; `--legacy` → 54 PASS.

---

## Tugas 14 — Store: `settings.catalog` dengan tolerant read

- [x] **Prasyarat**: Tugas 13.
- **Berkas**: `js/store.js`.
- **Langkah**:
  1. `defaultState()` menyertakan `settings.catalog = {cat:"all", status:"all", diff:"all", sort:"default"}`.
  2. Pada jaring pengaman `runMigrations`, normalkan `parsed.settings.catalog` lewat `HSL.engine.normalizeCatalogOpts` bila tersedia; bila `HSL.engine` belum ada, pakai objek default lokal (defensif, spec §5.3).
  3. `schemaVersion` tetap `1`; larik `migrations` tetap kosong; tanpa kunci `localStorage` baru.
- **Kriteria selesai**: blob v1 lama (tanpa `settings.catalog`, 12 entri `progress`) dimuat tanpa kehilangan `attempts/completed/best/last`; blob dengan `settings.catalog` rusak (mis. `{cat:42,sort:"zzz"}`) jatuh ke default tanpa banner korup.
- **Verifikasi**: di peramban, tempel blob v1 nyata ke `localStorage.hsl.v1`, muat `index.html`, periksa `HSL.store.state.progress` utuh dan `settings.catalog` sudah ternormalisasi; ulangi dengan blob rusak; `node tools/node-check.js` → `80/80`.

---

## Tugas 15 — Kamus: 29 kunci baru + `ui.home.progress` berparameter + `DICT-V2KEYS`

- [x] **Prasyarat**: Tugas 14.
- **Berkas**: `i18n/de.js`, `i18n/en.js`, `i18n/id.js`, `tools/check.js`.
- **Langkah**:
  1. Tambahkan 29 kunci spesifikasi §11.1 ke ketiga kamus dengan urutan kunci identik dan gaya bahasa v1 (DE formal `Sie`, EN British, ID formal-hangat).
  2. Ubah `ui.home.progress` menjadi berparameter `{done}/{total}` dan `{keys}/{max}` di ketiga bahasa (himpunan parameter wajib identik).
  3. Tambahkan pemeriksaan `DICT-V2KEYS` (spec §13.7): 29 kunci ada dan tidak kosong di tiga kamus, dan `ui.home.progress` memuat tepat parameter `{done,keys,max,total}` di tiga bahasa.
- **Kriteria selesai**: `81/81 PASS`; `DICT-PARITY` tetap PASS; tiap `i18n/*.js` ≤ 20 KB.
- **Verifikasi**: `node tools/node-check.js` → `81/81`; `wc -c i18n/*.js`.

---

## Tugas 16 — CSS: panel TOTD/drill, bilah filter, lencana

- [x] **Prasyarat**: Tugas 15.
- **Berkas**: `css/styles.css`.
- **Langkah**:
  1. Tambahkan komponen: `.totd`, `.drill`, `.catalog-filter` (grid responsif; `<select>` target sentuh ≥ 44 px), `.badge--mastered`, `.badge--totd`, `.badge--drill`, `.filter-count`.
  2. Pakai token warna/spasi yang sudah ada; kontras teks ≥ 4.5:1 dan komponen ≥ 3:1; jangan menambah animasi baru — bila ada transisi, letakkan di bawah aturan `motion-full` yang sudah ada.
  3. Uji 320/375/768/1024/1440 px tanpa gulir horizontal; bilah filter menumpuk vertikal di ≤ 375 px.
- **Kriteria selesai**: `css/styles.css` ≤ 45 KB; tanpa gulir horizontal pada lima lebar; `81/81` tetap.
- **Verifikasi**: `wc -c css/styles.css`; DevTools device toolbar lima lebar; emulasi `prefers-reduced-motion: reduce`.

---

## Tugas 17 — UI: panel Training des Tages

- [x] **Prasyarat**: Tugas 16.
- **Berkas**: `index.html`, `js/app-index.js`.
- **Langkah**:
  1. `index.html`: tambahkan `<section id="totd" class="js-only">` **di atas** `#progress-summary` (urutan spesifikasi §12).
  2. `js/app-index.js`: tambahkan `todayKey()` lokal (spec §7.3), `renderTotd()` yang memanggil `E.trainingOfTheDay(HSL.data.order, todayKey())`, merender judul panel, tanggal terformat (`Intl.DateTimeFormat` dalam `try/catch`, fallback `dateKey`), meta + ringkasan skenario, tombol utama ke `scenario.html?id=…`, dan `ui.home.totd.hint` bila `best.keys === 5`.
  3. Panggil `renderTotd()` dari `renderDynamic()` (sehingga ikut render ulang saat bahasa berubah); slug **tidak boleh** berubah karena pergantian bahasa.
  4. Tandai kartu katalog dengan lencana `ui.home.totd.badge` untuk slug TOTD.
- **Kriteria selesai**: muat ulang 3×, ganti bahasa 3× → slug sama; ubah jam sistem ke tanggal lain → slug berubah sesuai tabel spesifikasi §7.2; tanpa JS panel tidak tampil.
- **Verifikasi**: manual di peramban (`file://`), plus `node tools/node-check.js` → `81/81`.

---

## Tugas 18 — UI: panel weak-axis drill + lencana kartu

- [x] **Prasyarat**: Tugas 17.
- **Berkas**: `index.html`, `js/app-index.js`.
- **Langkah**:
  1. `index.html`: `<section id="drill" class="js-only">` di bawah `#progress-summary`.
  2. `js/app-index.js`: `renderDrill()` dengan tiga keadaan spesifikasi §8.2 (`needMore` / `none` / saran), daftar ≤ 3 tautan skenario beserta nilai sumbu, dan tombol `ui.home.drill.cta`.
  3. Tombol menetapkan mode drill **sesi** (variabel modul, tidak disimpan): `sort` internal `"weak"` + `axis`, filter lain `all`; render ulang katalog; pindahkan fokus ke judul hasil katalog dan tulis `ui.home.filter.count` ke wilayah `aria-live`.
  4. Lencana `ui.home.drill.badge` pada kartu yang termasuk `slugs`.
  5. Tombol reset filter (Tugas 19) juga mengakhiri mode drill.
- **Kriteria selesai**: dengan 0–1 skenario selesai → `needMore`; dengan progres buatan sumbu SOP rendah → panel menunjuk SOP dengan rata-rata benar dan ≤ 3 tautan; mode drill mengurutkan kartu naik menurut sumbu itu.
- **Verifikasi**: manual dengan progres buatan (konsol: `HSL.store.save(...)` lalu muat ulang); `node tools/node-check.js` → `81/81`.

---

## Tugas 19 — UI: filter & sort katalog

- [x] **Prasyarat**: Tugas 18.
- **Berkas**: `index.html`, `js/app-index.js`.
- **Langkah**:
  1. `index.html`: `<div id="catalog-filter" class="js-only"></div>` sebelum `nav.chip-nav`, dan `<p id="catalog-count" class="filter-count js-only" aria-live="polite"></p>`.
  2. `js/app-index.js`: `renderFilter()` membangun `<form>` + `<fieldset>`/`<legend>` + empat `<label>`+`<select>` (kategori dari `HSL.data.categories`, status, kesulitan, urutan) + tombol reset. Nilai awal dari `S.state.settings.catalog` yang sudah dinormalkan.
  3. `change` pada select → simpan lewat `S.save` (hanya bila nilai berubah), keluar dari mode drill, render ulang katalog, tulis `ui.home.filter.count`; **jangan** memindahkan fokus.
  4. `renderCatalog()` dipecah: `default` + `cat=all` → bergrup per kategori seperti v1; selain itu satu `<section id="cat-results">` dengan `<h2>` `ui.home.filter.resultsTitle`, dan `nav.chip-nav.hidden = true` (dilepas saat kembali ke mode bergrup).
  5. Hasil kosong → panel `ui.home.filter.none` + tombol reset.
  6. Ringkasan progres memakai kunci berparameter: `total = HSL.data.order.length`, `max = total * 5`; `ui.home.mastered` dipicu `mastered === total`.
- **Kriteria selesai**: sembilan kombinasi filter/urutan benar; pilihan bertahan setelah muat ulang; hasil kosong memberi penjelasan + reset; jumlah hasil diumumkan; cip jangkar hilang di mode rata dan kembali di mode default; tanpa JS blok filter tidak tampil.
- **Verifikasi**: manual sembilan kombinasi + muat ulang; jalur papan ketik Tab-only penuh; `node tools/node-check.js` → `81/81`.

---

## Tugas 20 — UI: retry dari langkah lemah di debrief

- [x] **Prasyarat**: Tugas 19.
- **Berkas**: `js/app-scenario.js`.
- **Langkah**:
  1. Di `renderResult`, hitung `idx = E.weakestStepIndex(sc, run)`.
  2. Bila `idx >= 0`: render tombol `ui.debrief.retryWeak` **sebelum** `ui.debrief.retry`, dengan keterangan `ui.debrief.retryWeakHint` (`n = idx + 1`, `phase` dari simpul langkah itu). Bila `idx < 0`: jangan render tombol (bukan `disabled`).
  3. Klik → `run = E.truncateRun(run, idx)`; `S.save(function(st){ st.activeRun = run; })`; `renderNode()`. Progres yang sudah tercatat tidak diubah.
  4. Pastikan `rerender()` (pergantian bahasa di tampilan hasil) tetap bekerja dan tidak mencatat ulang progres (`renderResult(false)`).
- **Kriteria selesai**: run dengan pilihan sempurna tidak menampilkan tombol; run dengan langkah `unsafe` mundur tepat ke langkah itu; menyelesaikan ulang dengan pilihan lebih baik memperbarui `best` dan menambah `attempts` satu kali; run lama tidak termutasi (periksa di konsol).
- **Verifikasi**: manual pada `sc-13` (unsafe di n1) dan `sc-01`; `node tools/node-check.js` → `81/81`.

---

## Tugas 21 — Teks statis, versi, dan info.html

- [x] **Prasyarat**: Tugas 20.
- **Berkas**: `js/store.js`, `index.html`, `scenario.html`, `info.html`.
- **Langkah**:
  1. `HSL.APP_VERSION` → `"1.1.0"`; teks versi footer di tiga halaman diperbarui serentak.
  2. `info.html`: perbarui ketiga blok bahasa — 12 → 15 skenario, sebut kategori F&B/Housekeeping/Overbooking, tambahkan paragraf pendek tentang Übung des Tages, Schwerpunkt (sumbu terlemah), filter & urutan, serta penjelasan bahwa mengulang dari langkah lemah dihitung sebagai percobaan baru dan hanya dapat memperbaiki nilai terbaik.
  3. Jaga paritas isi tiga blok bahasa (jumlah paragraf dan substansi sama).
- **Kriteria selesai**: tidak ada lagi kemunculan `1.0.0` atau angka “12 Szenarien/scenarios/skenario” yang tersisa; ketiga blok bahasa sepadan.
- **Verifikasi**: `grep -RIn "1\.0\.0" -- *.html js` → kosong; `grep -RIn "zwölf\|Zwölf\|twelve\|dua belas\|/12" -- *.html i18n` → kosong; baca ketiga blok `info.html`.

---

## Tugas 22 — Verifikasi akhir & penutup

- [x] **Prasyarat**: Tugas 21.
- **Berkas**: tidak ada perubahan kode; hanya pencentangan rencana ini.
- **Langkah & verifikasi** (semua wajib lulus):
  1. `node tools/node-check.js` → **81/81 PASS**; `--legacy` → 54 ID lama PASS (SK-V2-1, SK-V2-2).
  2. `tools/check.html` di Chrome dan Firefox → `81/81 PASS`.
  3. Anggaran: `wc -c data/scenarios/*.js css/styles.css js/*.js i18n/*.js` → tiap skenario ≤ 30720; CSS ≤ 45 000; total `js/*.js` ≤ 70 000; tiap kamus ≤ 20 000 (SK-V2-11).
  4. Nol jaringan/dependensi: `grep -RnE "fetch\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon|importScripts|https?://" -- *.html js data i18n css tools` → hanya namespace SVG pada `js/ui.js`; DevTools Network kosong saat memuat ketiga halaman (SK-V2-8).
  5. Tanpa JS: 15 kartu statis + `<noscript>` tiga bahasa; panel dinamis tersembunyi (SK-V2-9).
  6. Papan ketik penuh: TOTD → drill → filter → katalog → pemutar → debrief → retry lemah, tanpa perangkap fokus; pengumuman `aria-live` terdengar (SK-V2-10).
  7. Progres lama: blob v1 dimuat utuh (SK-V2-3).
  8. Gerak & responsif: `prefers-reduced-motion: reduce` dan lima lebar viewport (SK-V2-13).
  9. Keselamatan konten: tanda tangani daftar periksa spesifikasi §15 untuk `sc-13`, `sc-14`, `sc-15` (SK-V2-12).
  10. Mainkan ketiga skenario baru tuntas dalam DE, EN, ID (SK-V2-1).
  11. Centang semua kotak Tugas 1–21 di dokumen ini.
  12. Git: tampilkan `git status`/`git diff --stat` kepada pengguna dan **minta persetujuan** sebelum komit. Jangan `push`, jangan menyentuh `main` tanpa permintaan eksplisit.

---

## 23. Ringkasan kenaikan pemeriksaan

| Setelah tugas | Total | Tambahan |
|---|---|---|
| 1–3 | 54 | baseline terjaga |
| 4 | 67 | +12 per-skenario baru, +1 `CAT-COVER` |
| 7 | 70 | +`TOTD-DET`, `TOTD-RANGE`, `TOTD-SPREAD` |
| 9 | 74 | +`WEAK-EMPTY`, `WEAK-LOW`, `WEAK-TIE`, `WEAK-SLUGS` |
| 11 | 77 | +`CAT-FILTER`, `CAT-SORT`, `CAT-STABLE` |
| 13 | 80 | +`RETRY-IDX`, `RETRY-TRUNC`, `RETRY-REPLAY` |
| 15 | **81** | +`DICT-V2KEYS` |

54 ID pemeriksaan v1 tetap ada, tetap bernama sama, dan tetap PASS pada setiap tahap.
