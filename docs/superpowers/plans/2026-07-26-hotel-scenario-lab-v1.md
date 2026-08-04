---
title: "Hotel Scenario Lab v1 — Rencana Implementasi"
project: hotel-scenario-lab
doc_type: implementation-plan
version: "1.0"
status: "final — siap dieksekusi oleh pekerja implementasi"
date: 2026-07-26
spec: "docs/superpowers/specs/2026-07-26-hotel-scenario-lab-design.md"
authors:
  - "Claude (Fable 5) — penulis tunggal fase rencana implementasi"
plan_language: id
---

# Hotel Scenario Lab v1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal**: Membangun Hotel Scenario Lab v1 — simulator keputusan Kantor Depan berbasis web statis, tiga bahasa (DE/EN/ID), *mobile-first*, *local-first* — sampai seluruh kriteria SK-1…SK-15 dan seluruh baris matriks uji T-01…T-20 pada spesifikasi berstatus lulus.

**Architecture**: Tiga halaman HTML statis (`index.html`, `scenario.html`, `info.html`) plus satu alat pemeriksa pengembang (`tools/check.html`), semuanya berbagi satu berkas CSS dan satu ruang nama global `window.HSL` yang diisi oleh skrip klasik ber-`defer` dalam IIFE (dilarang ES modules dan `fetch` — aplikasi wajib berjalan dari `file://`). Konten 12 skenario dan tiga kamus UI dikirim sebagai berkas data JS murni; mesin run/skor (`engine.js`) adalah fungsi murni tanpa DOM/penyimpanan sehingga dapat diverifikasi di Node dan di peramban; persistensi hanya satu blob `localStorage` (`hsl.v1`) dengan mode memori sebagai cadangan kegagalan.

**Tech Stack**: HTML5 + CSS3 (custom properties, Grid/Flexbox, `clamp()`) + JavaScript ES2020 tanpa modul, tanpa pustaka, tanpa *build step*, tanpa berkas paket, tanpa jaringan. Verifikasi memakai Node.js lokal (harness `vm` untuk skrip klasik), peramban evergreen (Chrome/Firefox desktop, Safari iOS ≥ 16), dan `python3 -m http.server` hanya untuk uji manual T-03.

---

## 0. Cara Menggunakan Rencana Ini (wajib dibaca pekerja)

1. **Sumber kebenaran.** Spesifikasi `docs/superpowers/specs/2026-07-26-hotel-scenario-lab-design.md` adalah satu-satunya sumber kebenaran produk. Bacalah minimum §2, §6–§9, §12, §13, §15 spesifikasi sebelum mulai. Rencana ini menerjemahkan spesifikasi menjadi urutan tugas; bila Anda menemukan pertentangan antara rencana dan spesifikasi, spesifikasi menang dengan urutan prioritas §13 (keselamatan/privasi) > §9 (rubrik) > §7 (penyimpanan) > bagian lain, dan Anda mencatat penyelesaiannya di §19 spesifikasi.
2. **Kerjakan berurutan.** Tugas 0 → Tugas 28, satu per satu. Jangan melompat: setiap tugas menyebut prasyaratnya. Centang kotak `[ ]` menjadi `[x]` di dokumen ini setiap kali langkah selesai dan verifikasinya lulus.
3. **Verifikasi sebelum lanjut.** Setiap tugas memiliki blok **Verifikasi** berisi perintah Node/peramban beserta keluaran yang diharapkan. Tugas belum selesai sebelum verifikasinya lulus persis.
4. **Dilarang membuat git.** Inisialisasi repositori git berada di luar ruang lingkup yang disetujui. Jangan menjalankan `git init`, jangan membuat komit, jangan membuat `.gitignore`, dan jangan menyiapkan remote/tunnel/hosting apa pun.
5. **Dilarang jaringan dan dependensi.** Jangan memasang paket (`npm`, `pip`, apa pun), jangan membuat `package.json`, jangan mengunduh apa pun, jangan menambahkan URL eksternal. Seluruh verifikasi memakai Node.js dan peramban yang sudah ada di mesin.
6. **Berkas yang boleh dibuat/diubah** hanyalah yang tercantum pada peta berkas §1 rencana ini (30 berkas runtime) plus pembaruan kotak centang pada dokumen rencana ini sendiri. Folder `docs/` tidak disentuh selain itu.

### 0.1 Batasan global (garis merah spesifikasi — berlaku untuk setiap tugas)

1. **Nol jaringan**: dilarang `fetch`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `EventSource`, `importScripts`, URL eksternal pada `src`/`href`/`@import`, fon eksternal, CDN, analitik, formulir kirim.
2. **Nol dependensi**: hanya HTML/CSS/JS polos; tanpa pustaka, *framework*, *build step*, berkas paket.
3. **Persistensi hanya `localStorage`** dengan kunci `hsl.v1` dan `hsl.v1.corrupt`; tanpa *cookie*, `sessionStorage`, IndexedDB, Cache API; tanpa data pribadi nyata; tanpa data hotel nyata.
4. **Kebersihan kode**: dilarang `eval`/`new Function`, atribut event sebaris (`onclick=` dsb.), `<style>` dan gaya sebaris, `javascript:`, `type="module"`, top-level await. Pengecualian tunggal per halaman: satu `<script>` sebaris satu baris `document.documentElement.classList.add("js")`.
5. **Perenderan aman**: seluruh teks konten masuk DOM lewat `textContent`/pembuatan elemen; dilarang `innerHTML` berisi string konten; konten tanpa markup HTML (pemisah paragraf `\n\n`).
6. **Trilingual penuh**: setiap string UI dan setiap Text3 konten terisi DE/EN/ID non-kosong; ditegakkan `tools/check.html` (wajib PASS penuh sebelum rilis).
7. **Keselamatan konten §13.2 spesifikasi**: fiksi total; tanpa klaim medis/hukum otoritatif; satu-satunya fakta dunia nyata adalah nomor darurat 112; eskalasi patut tidak pernah dinilai 0; opsi salah tetap bermartabat; anti-stereotip penamaan.
8. **Aksesibilitas §11 spesifikasi tidak diturunkan**: WCAG 2.2 AA, target sentuh ≥ 44 px, navigasi papan ketik penuh, `prefers-reduced-motion` dihormati.
9. **Skrip klasik saja**: semua `<script>` eksternal memakai `defer`, IIFE `"use strict"`, ruang nama `window.HSL`; konstanta `HSL.APP_VERSION = "1.0.0"` didefinisikan di `js/store.js` (berkas inti pertama yang dimuat) dan hanya di sana.
10. **Anggaran ukuran (tanpa minifikasi)**: `css/styles.css` ≤ 45 KB; total `js/*.js` ≤ 70 KB; kamus ≤ 20 KB/berkas; skenario ≤ 30 KB/berkas; total termuat per halaman ≤ 550 KB; `tools/` dikecualikan.

---

## 1. Peta Berkas Target (lengkap dan final)

Tepat **30 berkas runtime** dibuat oleh rencana ini. Tidak ada berkas lain. Kolom "Tugas" merujuk tugas pembuatnya.

| # | Jalur | Tanggung jawab | Tugas |
|---|---|---|---|
| 1 | `index.html` | Beranda: tajuk + pengalih bahasa, panel kunjungan pertama, ringkasan kemajuan, chip jangkar kategori, katalog statis DE 12 skenario (pra-JS), `<noscript>` tiga bahasa, kaki halaman. | 2 |
| 2 | `scenario.html` | Pemutar skenario `?id=<slug>`: konten statis generik tiga bahasa (pemutar butuh JS) + tautan kembali; `<main>` diisi JS (briefing/simpul/umpan balik/hasil). | 2 |
| 3 | `info.html` | Informasi & Pengaturan: tiga blok statis penuh `section[lang="de|en|id"]` (tentang, cara skor, P1–P8, privasi & data, disclaimer, versi) + kontainer JS untuk hapus data dan pengaturan gerak. | 2 |
| 4 | `css/styles.css` | Satu-satunya berkas CSS: token §11.5 → basis → komponen → utilitas; breakpoint 320/375/768/1024/1440; aturan gerak & `prefers-reduced-motion`; kelas `js`/`no-js`. | 1 |
| 5 | `assets/favicon.svg` | Satu-satunya aset; ikon kunci SVG lokal (snippet final di Tugas 2). | 2 |
| 6 | `js/store.js` | `HSL.APP_VERSION`; muat/simpan blob `hsl.v1`; mode memori; migrasi; `resetAll()`; notis kegagalan §12 baris 2–5. | 3 |
| 7 | `js/i18n.js` | `t(key, params)`, `text(text3)`, `setLang(code)`, rantai cadangan terpilih→de→en→id, `fmtDateTime`, pembaruan `html[lang]` + judul dokumen. | 4 |
| 8 | `i18n/de.js` | Kamus UI DE (`HSL.i18n.dict.de`), paritas kunci penuh. | 4 |
| 9 | `i18n/en.js` | Kamus UI EN (`HSL.i18n.dict.en`), paritas kunci penuh. | 4 |
| 10 | `i18n/id.js` | Kamus UI ID (`HSL.i18n.dict.id`) — teks kanonik §4 rencana ini. | 4 |
| 11 | `js/engine.js` | Mesin murni: `createRun`, `currentNodeId`, `applyChoice`, `isFinished`, `summarize`, `recommendNext` — tanpa DOM/penyimpanan. | 5 |
| 12 | `tools/check.js` | Validator: paritas kamus, aturan graf §6.2/§8.2, kelengkapan/panjang Text3, konsistensi bendera, 4 kasus emas §9.5, cetak daftar DE kanonik; berjalan di Node (harness `vm`) dan peramban. | 6 |
| 13 | `tools/check.html` | Halaman statis yang memuat kamus+data+engine+check.js dan merender tabel PASS/FAIL + daftar DE kanonik. | 6 |
| 14 | `js/ui.js` | Pembuatan DOM aman (`el`, `textContent`), komponen (banner `aria-live`, kartu, cip, bilah skor, ikon kunci, panel), manajemen fokus & gulir, mode gerak efektif, pengalih bahasa. | 7 |
| 15 | `js/app-index.js` | Bootstrap beranda: boot store, panel bahasa, ringkasan kemajuan, render ulang katalog + lencana, status kosong/selebrasi. | 8 |
| 16 | `js/app-scenario.js` | Bootstrap pemutar: parse `?id`, empat keadaan tampilan, panel lanjutkan, galat §12 baris 6/7/9/11, pencatatan langkah, penyelesaian run → progres. | 9 |
| 17 | `js/app-info.js` | Bootstrap info: tampilkan blok bahasa aktif, hapus data dua langkah, radio pengaturan gerak. | 10 |
| 18 | `data/registry.js` | `HSL.data.order` — urutan 12 slug (verbatim §8.1 spesifikasi). | 11 |
| 19–21 | `data/scenarios/sc-01-checkin-standard.js`, `sc-02-checkin-no-reservation.js`, `sc-03-checkin-language-barrier.js` | Skenario check-in (kategori `checkin`). | 11 |
| 22–24 | `data/scenarios/sc-04-complaint-noise.js`, `sc-05-complaint-billing.js`, `sc-06-complaint-review-threat.js` | Skenario keluhan (`complaint`). | 12 |
| 25–26 | `data/scenarios/sc-07-upsell-arrival.js`, `sc-08-upsell-services.js` | Skenario penawaran tambahan (`upsell`). | 13 |
| 27–28 | `data/scenarios/sc-09-checkout-rush.js`, `sc-10-checkout-minibar-dispute.js` | Skenario check-out (`checkout`). | 14 |
| 29 | `data/scenarios/sc-11-privacy-caller.js` | Skenario privasi (`privacy`). | 15 |
| 30 | `data/scenarios/sc-12-escalation-collapse.js` | Skenario eskalasi (`escalation`). | 16 |

**Urutan muat skrip** (kontrak; contoh `scenario.html`, semuanya `defer`, jalur relatif):
`i18n/de.js` → `i18n/en.js` → `i18n/id.js` → `data/registry.js` → 12 × `data/scenarios/*.js` (urutan sc-01…sc-12) → `js/store.js` → `js/i18n.js` → `js/engine.js` → `js/ui.js` → `js/app-scenario.js`.
`index.html` memakai daftar yang sama dengan `js/app-index.js` di akhir; `info.html` tanpa `data/*` (tidak butuh skenario) dengan `js/app-info.js` di akhir; `tools/check.html` memuat kamus + data + `js/engine.js` + `tools/check.js` (tanpa store/ui/app).

**Urutan boot dalam setiap `app-*.js`**: `HSL.store.load()` → tentukan bahasa (`settings.lang`; bila absen: beranda menampilkan panel pilih bahasa, halaman lain memakai `"de"`) → `HSL.i18n.setLang` tanpa tulis bila absen → render → banner notis store (§12). Kelas `js` pada `<html>` dipasang oleh satu-satunya skrip sebaris (Batasan global #4).

---

## 2. Kontrak Antarmuka Modul (mengikat untuk semua tugas)

Semua modul: IIFE `(function(){ "use strict"; window.HSL = window.HSL || {}; … })();`. Dependensi antarmodul persis tabel §15.2 spesifikasi; `engine.js` dan `data/*` berdependensi nol.

### 2.1 `HSL.store` (js/store.js)

```js
HSL.APP_VERSION = "1.0.0";
HSL.store = {
  mode: "persistent" | "memory",   // "memory" bila localStorage gagal / schemaVersion lebih baru
  notices: [],                     // subset dari: "storage-unavailable" | "corrupt-recovered" | "newer-schema"
  state: null,                     // objek status §7.2 spesifikasi (di memori, sumber kebenaran sesi)
  defaultState(nowIso),            // → status baru: {schemaVersion:1, app:{version,createdAt:nowIso,updatedAt:nowIso}, settings:{motion:"auto"}, progress:{}}  — tanpa settings.lang, tanpa activeRun
  load(),                          // → state; idempoten; menangani §12 baris 2 (akses gagal→mode memori), 3 (korup→salin ke hsl.v1.corrupt, mulai baru), 4 (schemaVersion>1→mode memori, data tak disentuh); migrasi §7.5 (larik migrations kosong di v1)
  save(mutator),                   // mutator(state) sinkron → perbarui app.updatedAt → tulis-tembus JSON utuh; kuota gagal → hapus hsl.v1.corrupt, coba ulang 1×; tetap gagal → mode="memory" + push "storage-unavailable" (sekali per sesi); tak pernah melempar
  resetAll()                       // hapus kunci "hsl.v1" & "hsl.v1.corrupt" (try/catch), state=defaultState(now), pertahankan mode bila penyimpanan sehat
};
```

Validitas blob saat `load()`: hasil `JSON.parse` wajib objek dengan `schemaVersion` angka dan `settings` objek; selain itu diperlakukan korup (§12 baris 3). `activeRun.steps` dipangkas ke ≤ 5 butir saat baca (jaring pengaman). Kunci `localStorage` hanya literal `"hsl.v1"` dan `"hsl.v1.corrupt"`.

### 2.2 `HSL.i18n` (js/i18n.js) dan kamus (i18n/*.js)

```js
HSL.i18n = {
  dict: { de: {...}, en: {...}, id: {...} },  // diisi berkas kamus (dimuat lebih dulu)
  lang(),                       // → kode aktif: HSL.store.state.settings.lang || "de"
  t(key, params),               // → string kamus; substitusi {nama}; rantai cadangan aktif→de→en→id; kunci hilang total → key itu sendiri (tak pernah melempar)
  text(text3),                  // → string dari {de,en,id} dengan rantai cadangan yang sama; null → ""
  setLang(code),                // simpan settings.lang via store.save, set document.documentElement.lang & document.title, panggil onLangChange bila terpasang
  onLangChange: null,           // callback dipasang app-*.js: () => renderUlangTampilanAktif()
  fmtDateTime(iso)              // Intl.DateTimeFormat: de→"de-DE", en→"en-GB", id→"id-ID"; {dateStyle:"medium", timeStyle:"short"}
};
```

Kamus: bentuk verbatim §10.2 spesifikasi; kunci datar berawalan ruang nama (`ui.nav / ui.lang / ui.home / ui.player / ui.debrief / ui.info / ui.banner`); himpunan kunci identik persis di tiga berkas (T-08); frasa netral-jumlah gaya "label: nilai"; tanpa pluralisasi.

### 2.3 `HSL.engine` (js/engine.js) — murni, tanpa DOM/penyimpanan/`Date.now`

```js
HSL.engine = {
  createRun(scenario, lang, nowIso),        // → { scenarioId, lang, startedAt: nowIso, steps: [] }
  currentNodeId(scenario, run),             // → id simpul posisi kini: telusuri dari "n1" mengikuti steps[i].option → next; steps korup (simpul/opsi tak dikenal) → null
  isFinished(scenario, run),                // → boolean: currentNodeId merujuk simpul type "outcome"
  applyChoice(scenario, run, optionId),     // → run BARU (immutable) dengan steps + {node: <posisi kini>, option: optionId}; optionId tak sah di simpul kini → kembalikan run lama tanpa perubahan
  summarize(scenario, run),                 // → Summary (di bawah); hanya sah bila isFinished
  recommendNext(order, progressMap)         // → { id } | { allMastered: true }: slug pertama belum completed; semua completed → pertama dengan best.keys<5; semua 5 → allMastered (§9.4)
};
```

**Bentuk `Summary`** (semua angka bulat; teks tetap Text3 — pemilihan bahasa dilakukan UI):

```js
{
  N: 3|4|5,
  sums:   { d, l, s },                          // Σ skor mentah
  scores: { decision, language, sop, combined },// S_d,S_l,S_s = round(100·Σ/2N); combined = round(0.40·S_d + 0.25·S_l + 0.35·S_s) — round = Math.round, urutan persis §9.2
  baseKeys: 1|2|3|4|5,                          // ≥90→5; ≥75→4; ≥60→3; ≥40→2; sisanya→1 (dari combined)
  safe: boolean,                                // tak ada opsi flags.unsafe terpilih
  keys: 1|2|3|4|5,                              // safe ? baseKeys : min(baseKeys, 3)  (§9.3)
  verdicts: [ { index, node, option, phase: Text3, label: Text3, feedback: Text3,
                symbol: "strong"|"ok"|"weak"|"unsafe" } ],  // d+l+s: 6→strong; 3–5→ok; 0–2→weak; unsafe menimpa (§9.3)
  unsafeSteps: [int],                           // indeks 1-basis langkah ber-unsafe (untuk banner keselamatan)
  outcome: { tone: "good"|"mixed"|"poor", ending: Text3 },
  tips: [ { kind: "safety"|"decision"|"language"|"sop"|"praise", text: Text3 } ]  // §9.4: (1) !safe→safetyTip dulu; (2) tip sumbu skor terendah, seri→SOP>Keputusan>Bahasa; (3) combined≥90 && safe→praise; maksimal 3, tanpa duplikat
}
```

### 2.4 `HSL.ui` (js/ui.js)

```js
HSL.ui = {
  el(tag, attrs, children),   // attrs: peta atribut ({class, id, href, "aria-*", lang, …}); children: string (→textContent) | Node | larik campuran; TANPA innerHTML
  clear(node),
  banner(opts),               // {kind:"info"|"warn"|"danger"|"success", text, action?:{label,onClick}, dismissible=true} → elemen; ditempatkan app ke kontainer #banners (region aria-live="polite" statis di HTML)
  focusHeading(elm),          // pasang tabindex="-1", focus(), gulir: behavior "smooth" hanya bila motionMode()==="full", selain itu "auto"
  motionMode(),               // settings.motion: "reduce"→"reduce"; "full"→"full"; "auto"→matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduce" : "full"
  applyMotionClass(),         // set kelas html: motion-reduce | motion-full (hapus lawannya); dipanggil saat boot & saat pengaturan berubah
  scoreBar(labelText, pct),   // elemen teks "Label: 88 dari 100" + bilah visual aria-hidden (lebar via style property width — dikecualikan dari larangan gaya sebaris? TIDAK: lebar diset via el.style.width dari JS, bukan atribut style di markup; larangan §13.1 menyasar atribut markup)
  keysRow(keys, safe),        // 5 ikon kunci SVG sebaris (terisi/kosong), penanda peringatan bila !safe; teks aksesibel "X dari 5 kunci"
  chip(text), cardShell(...), // pembantu kartu/cip katalog
  langSwitcher(container, onPick) // 3 tombol DE·EN·ID, aria-pressed pada aktif, label aksesibel dari ui.lang.label
};
```

Catatan kontrak: satu-satunya penggunaan `element.style` dari JS adalah lebar bilah skor dan properti animasi stagger ikon kunci; keduanya nilai numerik internal, bukan konten. Semua string konten/kamus masuk lewat `textContent`.

### 2.5 `HSL.data` (data/*.js)

Registri dan skenario mengisi `HSL.data = { scenarios: {}, order: [] }` persis pola IIFE §8.1 spesifikasi. Objek `Scenario`, `Node keputusan`, `Option`, `Node hasil` mengikuti §6.1 spesifikasi bidang demi bidang (tipe, wajib, batas panjang: `label` ≤ 140, `feedback` ≤ 350, `narration`/`ending` ≤ 700, `guestLine` ≤ 240 per bahasa; `minutes` 3–10; `difficulty` 1–3; `startNode` selalu `"n1"`).

---

## 3. Konvensi Verifikasi Node (dipakai banyak tugas)

Skrip klasik ber-IIFE menempel ke `window`; di Node dipakai harness `vm` tanpa dependensi. **Pola baku** (disebut selanjutnya "harness Node"; jalankan selalu dari akar proyek `/root/projects/hotel-scenario-lab`):

```bash
node -e '
const fs = require("fs"), vm = require("vm");
global.window = global;                      // IIFE menempel ke window
const load = f => vm.runInThisContext(fs.readFileSync(f, "utf8"), { filename: f });
process.argv.slice(1).forEach(load);
// … kode uji spesifik tugas …
' <daftar berkas>
```

Keluaran uji memakai format satu baris per pemeriksaan: `PASS <id> <nama>` atau `FAIL <id> <nama> — <detail>`, dan `process.exitCode = 1` bila ada FAIL. Perintah verifikasi per tugas di bawah menuliskan bentuk finalnya masing-masing.

---

## 4. Inventaris Kunci Kamus UI (final — kontrak paritas T-08)

Ke-79 kunci berikut adalah himpunan kunci **lengkap dan tertutup** ketiga kamus. Kolom "Teks kanonik ID" mengikat makna (banyak diambil verbatim dari §12 spesifikasi); versi DE/EN ditulis pekerja pada Tugas 4 mengikuti register §10.3 (DE: Sie-Form baku hotel; EN: profesional Britania) dan terminologi §10.4. Parameter memakai `{nama}`.

| Kunci | Teks kanonik ID |
|---|---|
| `ui.skip` | Langsung ke konten |
| `ui.nav.appName` | Hotel Scenario Lab |
| `ui.nav.subtitle` | Simulator Keputusan Kantor Depan |
| `ui.nav.infoLink` | Informasi & Pengaturan |
| `ui.nav.privacyLine` | Semua data hanya tersimpan di perangkat ini. |
| `ui.nav.backToCatalog` | Kembali ke katalog |
| `ui.lang.label` | Bahasa |
| `ui.home.progress` | Selesai: {done}/12 · Kunci: {keys}/60 |
| `ui.home.empty` | Belum ada latihan yang diselesaikan. Mulailah dari skenario pertama — sekitar 5 menit. |
| `ui.home.mastered` | Semua skenario telah Anda kuasai. Asah terus kemampuan Anda: ulangi skenario dalam bahasa lain. |
| `ui.home.cat.checkin` | Check-in |
| `ui.home.cat.complaint` | Keluhan |
| `ui.home.cat.upsell` | Penawaran tambahan |
| `ui.home.cat.checkout` | Check-out |
| `ui.home.cat.privacy` | Privasi |
| `ui.home.cat.escalation` | Eskalasi |
| `ui.home.diff.1` | Dasar |
| `ui.home.diff.2` | Menengah |
| `ui.home.diff.3` | Lanjut |
| `ui.home.minutes` | ±{m} mnt |
| `ui.home.status.new` | Baru |
| `ui.home.status.active` | Berjalan |
| `ui.home.status.done` | Selesai |
| `ui.home.best` | Terbaik {pct} % |
| `ui.home.safetyFlag` | Catatan keselamatan pada skor terbaik |
| `ui.player.start` | Mulai latihan |
| `ui.player.exit` | Keluar |
| `ui.player.step` | Langkah {n} · {phase} |
| `ui.player.context` | Konteks |
| `ui.player.ctxPlace` | Waktu & tempat |
| `ui.player.ctxSituation` | Situasi |
| `ui.player.ctxGuest` | Tamu |
| `ui.player.ctxConstraints` | Kendala operasional |
| `ui.player.goals` | Tujuan pembelajaran |
| `ui.player.question` | Apa tindakan Anda? |
| `ui.player.continue` | Lanjut |
| `ui.player.feedback` | Umpan balik |
| `ui.player.safetyNote` | Catatan keselamatan |
| `ui.player.verdict` | Keputusan {d}/2 · Bahasa {l}/2 · SOP {s}/2 |
| `ui.player.resumeTitle` | Lanjutkan latihan? |
| `ui.player.resumeBody` | Anda berhenti di Langkah {n}. |
| `ui.player.resume` | Lanjutkan |
| `ui.player.restart` | Mulai dari awal |
| `ui.player.notFound` | Skenario tidak ditemukan. Tautan yang Anda buka tidak merujuk ke skenario yang tersedia. |
| `ui.player.loadError` | Konten latihan gagal dimuat. Muat ulang halaman; bila masalah berlanjut, pasang ulang berkas aplikasi. |
| `ui.player.jsError` | Terjadi kesalahan teknis. Muat ulang halaman untuk melanjutkan; kemajuan Anda tersimpan. |
| `ui.player.reload` | Muat ulang |
| `ui.debrief.title` | Debrief Mentor |
| `ui.debrief.result` | Hasil: {label} — {keys} dari 5 kunci |
| `ui.debrief.grade.5` | Sangat baik |
| `ui.debrief.grade.4` | Baik |
| `ui.debrief.grade.3` | Cukup |
| `ui.debrief.grade.2` | Perlu latihan |
| `ui.debrief.grade.1` | Ayo mulai lagi |
| `ui.debrief.axis` | {axis}: {pct} dari 100 |
| `ui.debrief.axis.d` | Keputusan |
| `ui.debrief.axis.l` | Bahasa |
| `ui.debrief.axis.s` | SOP |
| `ui.debrief.safetyCap` | Catatan keselamatan: pada Langkah {steps} Anda memilih tindakan berisiko. Kunci dibatasi pada 3. Baca kembali umpan balik langkah tersebut di rekap jalur. |
| `ui.debrief.path` | Rekap jalur |
| `ui.debrief.sym.strong` | teladan |
| `ui.debrief.sym.ok` | cukup |
| `ui.debrief.sym.weak` | lemah |
| `ui.debrief.sym.unsafe` | tidak aman |
| `ui.debrief.retry` | Ulangi skenario |
| `ui.debrief.next` | Skenario berikutnya |
| `ui.banner.memory` | Penyimpanan lokal tidak tersedia. Latihan tetap dapat dijalankan, tetapi kemajuan tidak akan tersimpan setelah halaman ditutup. |
| `ui.banner.corrupt` | Data kemajuan sebelumnya tidak dapat dibaca dan telah diamankan. Kemajuan dimulai dari awal. |
| `ui.banner.newer` | Data ini dibuat oleh versi aplikasi yang lebih baru. Untuk melindungi data Anda, sesi ini berjalan tanpa penyimpanan. |
| `ui.banner.close` | Tutup |
| `ui.info.deleteBtn` | Hapus semua data |
| `ui.info.deleteAsk` | Yakin ingin menghapus? Seluruh kemajuan, skor terbaik, dan preferensi di perangkat ini akan hilang permanen. |
| `ui.info.deleteYes` | Ya, hapus semua |
| `ui.info.deleteNo` | Batal |
| `ui.info.deleted` | Semua data telah dihapus. Aplikasi kembali ke kondisi awal. |
| `ui.info.motionLegend` | Pengaturan gerak |
| `ui.info.motion.auto` | Otomatis (ikuti perangkat) |
| `ui.info.motion.reduce` | Kurangi gerak |
| `ui.info.motion.full` | Gerak penuh |

Ketentuan tambahan yang mengikat:
- Jumlah kunci final = jumlah baris tabel di atas (79 kunci). Verifikasi paritas membandingkan **himpunan kunci** ketiga kamus secara otomatis (bukan hitungan manual); menambah/mengurangi kunci di luar tabel ini dilarang tanpa memperbarui tabel ini.
- `ui.debrief.grade.{n}` dipetakan dari `keys` akhir (5→`grade.5` dst.) — pemetaan deterministik pengisi celah spesifikasi ("Hasil: Baik — 4 dari 5 kunci" §5.3d).
- `ui.debrief.safetyCap`: `{steps}` diisi daftar nomor langkah `unsafeSteps` dipisah " dan " (mis. "2" atau "2 dan 4") — memenuhi kewajiban §9.3 "menyebut pilihan pemicunya".
- Tiga label tombol panel kunjungan pertama ("Deutsch", "English", "Bahasa Indonesia") **bukan** kunci kamus: selalu ditulis dalam bahasanya sendiri dengan atribut `lang` masing-masing, statis di `index.html` (§5.2.2; tanpa bendera).
- Teks `<noscript>`, katalog statis DE, dan seluruh isi `info.html` adalah HTML statis, bukan kunci kamus.

---

## 5. Tugas Implementasi

Urutan tugas mengikuti urutan pembangunan §15.6 spesifikasi. Setiap tugas berformat: **Berkas** (jalur persis), **Kontrak** (masukan/keluaran), **Langkah** (kotak centang), **Verifikasi** (perintah + keluaran diharapkan).

### Tugas 0 — Prasyarat dan kerangka direktori

**Berkas**: hanya direktori kosong: `css/`, `js/`, `i18n/`, `data/scenarios/`, `assets/`, `tools/`.

- [ ] Pastikan kondisi awal sesuai asumsi spesifikasi: di akar proyek hanya ada `docs/`.
- [ ] Buat direktori target: `mkdir -p css js i18n data/scenarios assets tools` (dijalankan di `/root/projects/hotel-scenario-lab`).
- [ ] Konfirmasi Node tersedia untuk harness verifikasi: `node --version` (versi berapa pun yang terpasang lokal memadai; tanpa instalasi baru).

**Verifikasi**:
```bash
cd /root/projects/hotel-scenario-lab && find . -type f | sort
```
Keluaran diharapkan: tepat dua berkas — spesifikasi dan rencana ini (`./docs/superpowers/plans/2026-07-26-hotel-scenario-lab-v1.md`, `./docs/superpowers/specs/2026-07-26-hotel-scenario-lab-design.md`). Belum ada berkas runtime.

### Tugas 1 — `css/styles.css`: token, basis, komponen, responsif, gerak

**Berkas**: `css/styles.css` (buat).

**Kontrak**: satu berkas CSS untuk keempat halaman, urutan bagian dengan komentar penanda: `/* 1. Token */ /* 2. Reset & basis */ /* 3. Tata letak halaman */ /* 4. Komponen */ /* 5. Pemutar */ /* 6. Utilitas & gerak */`. Ukuran ≤ 45 KB.

- [ ] **Token**: salin blok `:root` §11.5 spesifikasi **verbatim** (warna, tipografi fon sistem, skala teks `clamp()`, spasi basis 4, radius, bayangan, durasi gerak). Tambahkan tepat di bawahnya komentar aturan pemakaian: `--c-accent` sebagai teks kecil hanya di atas `--c-surface` (di atas `--c-bg` rasionya < 4.5:1); `--c-accent-soft` dilarang untuk teks kecil (hanya ornamen/garis).
- [ ] **Basis**: `box-sizing: border-box` universal; `body` memakai `--font-sans`, `--c-ink` di atas `--c-bg`, `line-height: var(--leading)`; lebar baris naratif `max-width: 65ch`; hierarki judul memakai skala `--text-*`; tautan berwarna `--c-primary` bergaris bawah.
- [ ] **Peningkatan progresif**: aturan `html:not(.js) .js-only { display: none }` dan `html.js .no-js-only { display: none }`. Konten interaktif diberi kelas `js-only`; konten cadangan statis (katalog DE, pemberitahuan pemutar, kalimat hapus-data-tanpa-JS) diberi `no-js-only` bila memang harus hilang saat JS aktif.
- [ ] **Fokus**: `:focus-visible { outline: 3px solid var(--c-primary); outline-offset: 2px }`; varian di permukaan gelap (mis. tombol primer): `outline-color: #FFFFFF`. Tanpa `outline: none` tanpa pengganti; cincin fokus tidak dianimasikan.
- [ ] **Komponen** (kelas dengan awalan): `.app-header`, `.lang-switch` (tombol `aria-pressed` bergaya aktif), `.skip-link` (muncul saat fokus), `.banner` + varian `--info/--warn/--danger/--success` (ikon + teks + aksi + tombol tutup), `.chip-row`/`.chip` (tautan jangkar), `.card` skenario (garis aksen atas `--c-accent-soft`, meta kategori/kesulitan/menit, lencana status, baris kunci), `.btn` + `.btn--primary` (latar `--c-primary`, teks putih) + `.btn--option` (lebar penuh, min-height 44px, jarak antaropsi ≥ 8px, keadaan `[disabled]` redup, keadaan terpilih berbingkai), `.quote-guest` (garis aksen kiri + italik), `.feedback-card`, `.axis-chip`, `.safety-note` (warna `--c-danger`), `.score-bar` (trek + isi; teks angka tampak, bilah `aria-hidden`), `.keys-row`, `.details-context` (`<details>`), `.footer`.
- [ ] **Responsif** (mobile-first, breakpoint §11.4): dasar 1 kolom (320–767); `@media (min-width: 768px)` katalog grid 2 kolom, pemutar kolom terpusat `max-width: 680px`; `@media (min-width: 1024px)` katalog grid 3 kolom, pemutar 2 kolom (konten 680px + panel konteks samping — `<details>` diberi gaya terbuka permanen via kelas yang dipasang JS `ctx-pinned`); `@media (min-width: 1440px)` lebar konten maks 1200px terpusat, spasi naik satu tingkat. Tanpa gulir horizontal: `img,svg{max-width:100%}`, kata panjang `overflow-wrap:break-word`.
- [ ] **Gerak** (tabel §11.6): transisi hanya `transform`/`opacity`/warna; durasi via `--dur-quick`/`--dur-std`, maksimum 300 ms; animasi masuk kartu umpan balik (opacity 0→1, translateY 8px→0), crossfade pergantian tampilan (180 ms), stagger ikon kunci (60 ms antarelemen, maks 5), isi bilah sumbu (width 0→nilai — pengecualian sadar dari aturan "hanya transform/opacity" karena ditetapkan spesifikasi §11.6). Matikan semuanya di bawah `html.motion-reduce` **dan** di bawah `@media (prefers-reduced-motion: reduce)` untuk `html:not(.motion-full)` (mode `full` menimpa preferensi OS; mode `auto` mengikutinya): `transition-duration: 0.01ms; animation: none` — hasil akhir tampil instan pada nilai akhir. Transisi warna hover/fokus boleh tetap hidup saat gerak dikurangi.
- [ ] Jalankan verifikasi ukuran/keberadaan token di bawah.

**Verifikasi**:
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const s = require("fs").readFileSync("css/styles.css", "utf8");
const must = ["--c-bg: #F6F4EF", "--c-primary: #1F4D3F", "--c-accent-soft: #C9A961",
  "--font-sans: system-ui", "--radius-card: 12px", "--dur-std: 220ms",
  "prefers-reduced-motion", "motion-reduce", ":focus-visible", "min-width: 768px",
  "min-width: 1024px", "min-width: 1440px", "html:not(.js) .js-only"];
const miss = must.filter(m => !s.includes(m));
console.log(miss.length ? "FAIL token hilang: " + miss.join(" | ") : "PASS semua penanda token/aturan ada");
console.log((s.length <= 45 * 1024 ? "PASS" : "FAIL") + " ukuran styles.css = " + s.length + " B (batas 46080 B)");
process.exitCode = miss.length || s.length > 46080 ? 1 : 0;
'
```
Keluaran diharapkan: dua baris `PASS`.

### Tugas 2 — Tiga halaman HTML statis (DE) + `<noscript>` tiga bahasa + `assets/favicon.svg`

**Berkas**: `index.html`, `scenario.html`, `info.html`, `assets/favicon.svg` (buat semuanya). Prasyarat: Tugas 1.

**Kontrak bersama ketiga halaman**:
- `<!DOCTYPE html><html lang="de">`; `<meta charset="utf-8">`; `<meta name="viewport" content="width=device-width, initial-scale=1">` (tanpa `maximum-scale`/`user-scalable`); `<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">` (di `scenario.html`/`info.html` jalur relatif sama karena semua halaman di akar); `<link rel="stylesheet" href="css/styles.css">`; `<title>` statis DE per halaman.
- Baris pertama `<body>`… bukan — elemen fokusable pertama adalah tautan lompat `<a class="skip-link" href="#main">` bertekst DE statis "Zum Inhalt springen" (diganti `t("ui.skip")` saat JS aktif).
- Satu-satunya skrip sebaris, diletakkan tepat setelah `<body>` dibuka: `<script>document.documentElement.classList.add("js")</script>` (tepat satu per halaman; audit T-01 menghitungnya).
- Landmark: `<header>` (nama aplikasi sebagai tautan ke `index.html`, subjudul, kontainer `.lang-switch` `js-only`), `<main id="main" tabindex="-1">`, `<footer>` (tautan "Informationen & Einstellungen" → `info.html`, kalimat privasi DE statis, teks "v1.0.0"). Kontainer banner `<div id="banners" aria-live="polite"></div>` sebagai anak pertama `<main>`.
- Semua `<script src>` eksternal ber-`defer` sesuai urutan muat §1 rencana ini, diletakkan di `<head>`.
- Hierarki judul: tepat satu `<h1>`; `<h2>` bagian; `<h3>` kartu. Tanpa atribut event sebaris, tanpa `<style>`, tanpa gaya sebaris.

**Langkah**:
- [ ] **`index.html`**: (1) panel kunjungan pertama `js-only` kosong (diisi `app-index.js`); (2) kontainer ringkasan kemajuan `js-only`; (3) navigasi chip: enam tautan jangkar statis DE (`#cat-checkin` "Check-in", `#cat-complaint` "Beschwerden", `#cat-upsell` "Zusatzverkauf", `#cat-checkout` "Check-out", `#cat-privacy` "Privatsphäre", `#cat-escalation` "Eskalation") — berfungsi tanpa JS; (4) **katalog statis DE**: enam `<section>` ber-`id` jangkar di atas, masing-masing `<h2>` DE, berisi kartu statis per skenario — kategori + kesulitan (label DE: Basis/Mittel/Fortgeschritten + titik) + "±N Min." + `<h3>` judul DE + ringkasan satu kalimat DE, seluruh kartu tautan ke `scenario.html?id=<slug>`. Judul DE ke-12 skenario **verbatim dari §14 spesifikasi** (mis. "Check-in mit Reservierung", "Keine Reservierung im System", …); ringkasan DE satu kalimat ditulis di tugas ini dan **menjadi kanonik**: Tugas 11–16 wajib menyalinnya verbatim ke `summary.de` tiap skenario (paritas diperiksa T-04). Kontainer katalog diberi `id="catalog"`; saat JS aktif `app-index.js` merender ulang isinya (versi statis digantikan hasil render); (5) `<noscript>` berisi tiga paragraf ber-`lang` (de/en/id) dengan makna kanonik "Latihan interaktif memerlukan JavaScript. Katalog dan halaman informasi tetap dapat dibaca." (§12 baris 14).
- [ ] **`scenario.html`**: `<main>` berisi blok statis: `<h1>` DE "Szenario-Player", tiga paragraf ber-`lang` (de/en/id) yang menjelaskan bahwa pemutar memerlukan JavaScript, tautan kembali ke `index.html` (teks DE statis) — blok ini `no-js-only`; kontainer kosong `js-only` `<div id="player"></div>` untuk render; `<noscript>` tidak diperlukan terpisah karena blok statis sudah tampil tanpa JS (kelas `no-js-only` memastikan ia hilang saat JS aktif).
- [ ] **`info.html`**: tiga blok `<section lang="de">`, `<section lang="en">`, `<section lang="id">` **lengkap dan setara**, masing-masing berisi: (1) Tentang — tujuan aplikasi + sifat fiksi latihan; (2) Cara skor dihitung — parafrasa ramah §9 (tiga sumbu + bobot 40/25/35, kunci 1–5 dengan ambang 90/75/60/40, batas keselamatan kunci ≤ 3 bila memilih opsi berisiko); (3) Prinsip SOP P1–P8 — kedelapan prinsip §13.4 diterjemahkan penuh per bahasa (teks ID verbatim spesifikasi; DE/EN ditulis di sini dan menjadi rujukan konsisten untuk konten skenario); (4) Privasi & data — daftar persis isi yang disimpan (§7.2: preferensi bahasa & gerak, run aktif, ringkasan skor per skenario) + kalimat "tidak ada data yang dikirim ke mana pun" + kontainer `js-only` hapus-data (diisi `app-info.js`) + kalimat statis `no-js-only`: "Penghapusan data memerlukan JavaScript, atau hapus data situs melalui pengaturan peramban Anda." (per bahasa); (5) Disclaimer keselamatan — **verbatim tiga paragraf §13.3 spesifikasi**; (6) kontainer `js-only` pengaturan gerak; (7) Versi — "Hotel Scenario Lab v1.0.0". Tanpa JS ketiga blok tampil berurutan; dengan JS `app-info.js` menyembunyikan blok non-aktif.
- [ ] **`assets/favicon.svg`**: tulis persis:
  ```xml
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Hotel Scenario Lab">
    <rect width="32" height="32" rx="7" fill="#1F4D3F"/>
    <circle cx="13" cy="13" r="5.5" fill="none" stroke="#C9A961" stroke-width="2.5"/>
    <path d="M17.5 17.5 24 24 M21 21l2.5-2.5" fill="none" stroke="#C9A961" stroke-width="2.5" stroke-linecap="round"/>
  </svg>
  ```
  Atribut `xmlns` adalah **pengecualian audit yang disahkan** (pengenal ruang nama W3C, tidak pernah diambil dari jaringan; SVG mandiri tidak dirender peramban tanpanya). Audit T-01 (Tugas 18) memutihkan string persis `xmlns="http://www.w3.org/2000/svg"` dan tidak ada string `http` lain.

**Verifikasi**:
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const fs = require("fs"); let fail = 0;
for (const f of ["index.html", "scenario.html", "info.html"]) {
  const s = fs.readFileSync(f, "utf8");
  const inline = (s.match(/<script>document\.documentElement\.classList\.add\("js"\)<\/script>/g) || []).length;
  const scripts = (s.match(/<script(?![^>]*src=)[^>]*>/g) || []).length;
  const checks = [
    [inline === 1 && scripts === 1, "tepat 1 skrip sebaris (baris kelas js)"],
    [(s.match(/<h1[\s>]/g) || []).length === 1, "tepat satu h1"],
    [s.includes("lang=\"de\"") && s.includes("lang=\"en\"") && s.includes("lang=\"id\""), "tiga bahasa hadir (noscript/blok statis)"],
    [!/on[a-z]+=/.test(s.replace(/xmlns[^ ]*/g, "")) , "tanpa atribut event sebaris"],
    [!s.includes("<style"), "tanpa tag style"],
    [!s.includes("type=\"module\""), "tanpa ES module"],
    [s.includes("aria-live=\"polite\""), "kontainer banner aria-live"],
    [s.includes("width=device-width, initial-scale=1") && !s.includes("maximum-scale"), "viewport tanpa larangan zoom"]
  ];
  checks.forEach(([ok, nama]) => { console.log((ok ? "PASS " : "FAIL ") + f + " — " + nama); if (!ok) fail = 1; });
}
const cards = (fs.readFileSync("index.html", "utf8").match(/scenario\.html\?id=sc-/g) || []).length;
console.log((cards === 12 ? "PASS" : "FAIL") + " index.html — 12 kartu statis (ditemukan " + cards + ")");
if (cards !== 12) fail = 1; process.exitCode = fail;
'
```
Keluaran diharapkan: seluruh baris `PASS` (25 baris). Lanjutkan dengan pemeriksaan visual: buka `index.html` via `file://` — katalog DE terbaca rapi dengan gaya token (verifikasi penuh menyusul di Tugas 19 dan 28).

### Tugas 3 — `js/store.js`: persistensi, mode memori, pemulihan

**Berkas**: `js/store.js` (buat). Prasyarat: Tugas 0. Kontrak: §2.1 rencana ini + §7 & §12 spesifikasi.

**Langkah**:
- [ ] Implementasikan `HSL.APP_VERSION = "1.0.0"` dan objek `HSL.store` persis kontrak §2.1. Inti `load()`:
  ```js
  load: function () {
    if (this.state) return this.state;
    var raw = null;
    try { raw = localStorage.getItem("hsl.v1"); }
    catch (e) { this.mode = "memory"; this.notices.push("storage-unavailable"); }
    if (this.mode === "persistent" && raw !== null) {
      var parsed = null;
      try { parsed = JSON.parse(raw); } catch (e) { parsed = null; }
      if (!parsed || typeof parsed !== "object" || typeof parsed.schemaVersion !== "number" ||
          typeof parsed.settings !== "object") {
        try { localStorage.setItem("hsl.v1.corrupt", raw); } catch (e) {}
        this.notices.push("corrupt-recovered"); raw = null;
      } else if (parsed.schemaVersion > 1) {
        this.mode = "memory"; this.notices.push("newer-schema"); raw = null;
      } else { this.state = this.runMigrations(parsed); }
    }
    if (!this.state) this.state = this.defaultState(new Date().toISOString());
    return this.state;
  }
  ```
- [ ] `save(mutator)`: jalankan `mutator(this.state)`; set `app.updatedAt`; bila `mode === "memory"` berhenti di situ; selain itu `setItem("hsl.v1", JSON.stringify(state))` dalam `try/catch`; saat gagal: `removeItem("hsl.v1.corrupt")` lalu coba ulang sekali; tetap gagal → `mode = "memory"` + notis `"storage-unavailable"` (sekali per sesi) — §12 baris 5. `save` tidak pernah melempar.
- [ ] `runMigrations(parsed)`: larik `migrations = []` (kosong di v1); mekanisme: selama `parsed.schemaVersion < 1 + migrations.length` jalankan berantai lalu tulis ulang blob — dibiarkan generik agar v2 tinggal mengisi larik (§7.5). Jaring pengaman baca: pangkas `activeRun.steps` ke 5 butir; buang `activeRun` bila bukan objek ber-`scenarioId` string.
- [ ] `resetAll()`: `removeItem` kedua kunci dalam `try/catch`; `this.state = this.defaultState(new Date().toISOString())`; `notices` dikosongkan. (Dipakai SK-15/T-20.)
- [ ] Aturan pembaruan `progress` saat run selesai (dipakai Tugas 9, didefinisikan di sini sebagai fungsi bantu `HSL.store.recordResult(scenarioId, result, nowIso)` yang dipanggil di dalam `save`): `attempts + 1`; `completed = true`; `last = result`; `best` diganti bila belum ada, atau `result.combined > best.combined`, atau (`result.combined === best.combined` dan `result.safe && !best.safe`) — persis §7.3. `result` = `{combined, decision, language, sop, keys, safe, at: nowIso}`.

**Verifikasi** (harness Node + stub `localStorage`; menguji §12 baris 2–5, §7.3, SK-15):
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const fs = require("fs"), vm = require("vm");
global.window = global;
function freshLS(map, failSet) { return {
  _m: map || {}, getItem(k){ if(failSet==="all") throw new Error("blocked"); return k in this._m ? this._m[k] : null; },
  setItem(k,v){ if(failSet==="all"||failSet==="quota") throw new Error("QuotaExceededError"); this._m[k]=String(v); },
  removeItem(k){ delete this._m[k]; } }; }
const src = fs.readFileSync("js/store.js", "utf8");
function boot(ls) { global.localStorage = ls; global.HSL = undefined; global.window.HSL = undefined;
  vm.runInThisContext(src, { filename: "store.js" }); return window.HSL.store; }
let fail = 0; const T = (ok, id, det) => { console.log((ok?"PASS ":"FAIL ") + id + (ok?"":" — "+det)); if(!ok) fail=1; };
// 1: kunjungan pertama
let st = boot(freshLS()); let s = st.load();
T(st.mode==="persistent" && !("lang" in s.settings) && s.settings.motion==="auto" && s.schemaVersion===1, "S1 kunjungan-pertama", JSON.stringify(s));
// 2: akses diblokir → mode memori (§12.2)
st = boot(freshLS(null, "all")); s = st.load();
T(st.mode==="memory" && st.notices.includes("storage-unavailable"), "S2 mode-memori", st.mode);
st.save(x => { x.settings.lang = "id"; }); T(st.state.settings.lang==="id", "S2b save-di-memori", "");
// 3: blob korup → diamankan + mulai baru (§12.3)
let ls = freshLS({ "hsl.v1": "{rusak" }); st = boot(ls); s = st.load();
T(ls._m["hsl.v1.corrupt"]==="{rusak" && st.notices.includes("corrupt-recovered") && s.schemaVersion===1, "S3 korup", JSON.stringify(ls._m));
// 4: schemaVersion lebih baru → data tak disentuh + memori (§12.4)
const newer = JSON.stringify({ schemaVersion: 2, settings: {} });
ls = freshLS({ "hsl.v1": newer }); st = boot(ls); s = st.load();
T(st.mode==="memory" && ls._m["hsl.v1"]===newer && st.notices.includes("newer-schema"), "S4 skema-baru", st.mode);
// 5: kuota penuh saat save → coba ulang lalu memori (§12.5)
ls = freshLS({ "hsl.v1.corrupt": "x" }, "quota"); st = boot(ls); st.load();
st.save(x => { x.settings.lang = "de"; });
T(st.mode==="memory" && st.state.settings.lang==="de" && !("hsl.v1.corrupt" in ls._m), "S5 kuota", st.mode);
// 6: aturan best §7.3
ls = freshLS(); st = boot(ls); st.load();
const r1 = { combined: 74, decision: 75, language: 75, sop: 72, keys: 3, safe: true,  at: "2026-07-26T09:00:00.000Z" };
const r2 = { combined: 88, decision: 88, language: 88, sop: 88, keys: 4, safe: false, at: "2026-07-26T09:10:00.000Z" };
const r3 = { combined: 88, decision: 88, language: 88, sop: 88, keys: 4, safe: true,  at: "2026-07-26T09:20:00.000Z" };
["r1","r2","r3"].forEach((k,i)=>st.save(x=>st.recordResult("sc-01-checkin-standard",[r1,r2,r3][i],"2026-07-26T10:00:00.000Z")));
const p = st.state.progress["sc-01-checkin-standard"];
T(p.attempts===3 && p.best.combined===88 && p.best.safe===true && p.last.at===r3.at, "S6 aturan-best", JSON.stringify(p.best));
// 7: resetAll (SK-15)
st.resetAll();
T(!("hsl.v1" in ls._m) && !("hsl.v1.corrupt" in ls._m) && !("lang" in st.state.settings) && Object.keys(st.state.progress).length===0, "S7 resetAll", JSON.stringify(ls._m));
process.exitCode = fail;
'
```
Keluaran diharapkan: `PASS S1` … `PASS S7` (8 baris, termasuk `S2b`), exit code 0.

### Tugas 4 — `js/i18n.js` + kamus `i18n/de.js`, `i18n/en.js`, `i18n/id.js`

**Berkas**: keempatnya dibuat. Prasyarat: Tugas 3 (store untuk `settings.lang`). Kontrak: §2.2 + §4 rencana ini; §10 spesifikasi.

**Langkah**:
- [ ] Tulis `i18n/id.js` berisi seluruh 79 kunci §4 dengan teks kanonik ID persis tabel (pola IIFE §10.2 spesifikasi).
- [ ] Tulis `i18n/de.js` dan `i18n/en.js` dengan himpunan kunci **identik**; terjemahkan makna kanonik mengikuti register §10.3 (DE: Sie-Form, bahasa hotel baku; EN: profesional-ramah, ejaan Britania) dan terminologi §10.4 (mis. `ui.home.cat.upsell`: DE "Zusatzverkauf", EN "Upsell"; `ui.debrief.axis.s` tetap "SOP" di ketiganya). Nilai parameter `{nama}` dipertahankan apa adanya.
- [ ] Tulis `js/i18n.js` sesuai kontrak §2.2. Substitusi parameter: `str.replace(/\{(\w+)\}/g, (m, k) => (params && k in params) ? String(params[k]) : m)`. Rantai cadangan: `[aktif, "de", "en", "id"]` — ambil nilai non-kosong pertama. `setLang(code)`: validasi `code ∈ {de,en,id}`; `HSL.store.save(s => { s.settings.lang = code; })`; `document.documentElement.lang = code`; `document.title = t("ui.nav.appName") + " — " + t("ui.nav.subtitle")`; panggil `onLangChange` bila fungsi. `fmtDateTime` memakai peta lokal `{de:"de-DE", en:"en-GB", id:"id-ID"}`.
- [ ] Jangan menyentuh DOM pada muat berkas (hanya saat `setLang` dipanggil) agar dapat diuji di Node.

**Verifikasi** (paritas kunci + substitusi + cadangan):
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const fs = require("fs"), vm = require("vm");
global.window = global;
["i18n/de.js","i18n/en.js","i18n/id.js"].forEach(f => vm.runInThisContext(fs.readFileSync(f,"utf8"),{filename:f}));
global.localStorage = { getItem: () => null, setItem(){}, removeItem(){} };
vm.runInThisContext(fs.readFileSync("js/store.js","utf8"),{filename:"store.js"});
vm.runInThisContext(fs.readFileSync("js/i18n.js","utf8"),{filename:"i18n.js"});
const d = window.HSL.i18n.dict; let fail = 0;
const T = (ok, id, det) => { console.log((ok?"PASS ":"FAIL ") + id + (ok?"":" — "+det)); if(!ok) fail=1; };
const kd = Object.keys(d.de).sort(), ke = Object.keys(d.en).sort(), ki = Object.keys(d.id).sort();
T(kd.length===79 && kd.join()===ke.join() && kd.join()===ki.join(), "I1 paritas-79-kunci", kd.length+"/"+ke.length+"/"+ki.length);
const kosong = ["de","en","id"].flatMap(L => Object.keys(d[L]).filter(k => !String(d[L][k]).trim()).map(k => L+":"+k));
T(kosong.length===0, "I2 tanpa-string-kosong", kosong.join(","));
window.HSL.store.load(); window.HSL.store.state.settings.lang = "id";
T(window.HSL.i18n.t("ui.player.step",{n:2,phase:"Verifikasi"})==="Langkah 2 · Verifikasi", "I3 substitusi", window.HSL.i18n.t("ui.player.step",{n:2,phase:"Verifikasi"}));
T(window.HSL.i18n.text({de:"nur DE",en:"",id:""})==="nur DE", "I4 rantai-cadangan", "");
process.exitCode = fail;
'
```
Keluaran diharapkan: `PASS I1` … `PASS I4`, exit code 0.

### Tugas 5 — `js/engine.js`: mesin run & skor murni

**Berkas**: `js/engine.js` (buat). Prasyarat: tidak ada (modul berdependensi nol). Kontrak: §2.3 rencana ini; rubrik §9 spesifikasi **eksak**.

**Langkah**:
- [ ] Implementasikan keenam fungsi §2.3. Inti `summarize` (urutan operasi mengikat):
  ```js
  function axisScore(sum, n) { return Math.round(100 * sum / (2 * n)); }
  // …dalam summarize(scenario, run):
  var N = run.steps.length;                       // = jumlah simpul keputusan dilalui
  var Sd = axisScore(sums.d, N), Sl = axisScore(sums.l, N), Ss = axisScore(sums.s, N);
  var combined = Math.round(0.40 * Sd + 0.25 * Sl + 0.35 * Ss);
  var baseKeys = combined >= 90 ? 5 : combined >= 75 ? 4 : combined >= 60 ? 3 : combined >= 40 ? 2 : 1;
  var keys = safe ? baseKeys : Math.min(baseKeys, 3);
  ```
- [ ] Verdik per langkah: `total = d + l + s` → 6 `"strong"`, 3–5 `"ok"`, 0–2 `"weak"`; `flags.unsafe` menimpa menjadi `"unsafe"` (§9.3). `unsafeSteps` = indeks 1-basis langkah unsafe.
- [ ] Tips §9.4 deterministik: (1) `!safe` → `{kind:"safety", text: debrief.safetyTip}`; (2) sumbu terendah dari `{sop: Ss, decision: Sd, language: Sl}` — bila seri, urutan pemenang SOP > Keputusan > Bahasa; tip dari `debrief.tips[sumbu]`; (3) `combined >= 90 && safe` → `{kind:"praise", text: debrief.praise}`. Maksimal 3, tanpa duplikat objek teks.
- [ ] `recommendNext(order, progressMap)`: iterasi `order`: pertama tanpa `progressMap[id]?.completed` → `{id}`; bila semua selesai: pertama dengan `best.keys < 5` → `{id}`; selain itu `{allMastered: true}`.
- [ ] `applyChoice` mengembalikan objek run **baru** (salinan dangkal + larik `steps` baru); tidak memutasi argumen; `currentNodeId` mengembalikan `null` untuk `steps` yang tak konsisten dengan graf (dipakai pemulihan §12 baris 8: run korup diperlakukan seperti tak ada — mulai dari briefing).

**Verifikasi — kasus emas §9.5 (T-10, SK-9) di Node**: skenario sintetis 4 simpul dengan triple skor persis tabel §9.5; jalankan keempat run:
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const fs = require("fs"), vm = require("vm");
global.window = global;
vm.runInThisContext(fs.readFileSync("js/engine.js","utf8"),{filename:"engine.js"});
const E = window.HSL.engine;
const t3 = s => ({ de: s, en: s, id: s });
function opt(id, d, l, s, next, unsafe) { const o = { id, label: t3("o"+id), scores: { d, l, s }, feedback: t3("f"), next }; if (unsafe) o.flags = { unsafe: true }; return o; }
function node(opts) { return { type: "decision", phase: t3("Fase"), narration: t3("n"), guestLine: null, options: opts }; }
const sc = { id: "gold", startNode: "n1", debrief: { tips: { decision: t3("TD"), language: t3("TL"), sop: t3("TS") }, safetyTip: t3("SAFE"), praise: t3("PUJI") }, nodes: {
  n1: node([opt("a",2,2,2,"n2"), opt("b",1,2,1,"n2"), opt("c",0,1,0,"n2",true)]),
  n2: node([opt("a",2,2,2,"n3"), opt("b",1,2,1,"n3"), opt("c",0,1,0,"n3",true)]),
  n3: node([opt("a",2,2,2,"n4"), opt("b",2,1,2,"n4"), opt("c",0,1,0,"n4",true), opt("d",1,1,1,"n4")]),
  n4: node([opt("a",2,2,2,"x1"), opt("b",1,1,1,"x1")]),
  x1: { type: "outcome", tone: "good", ending: t3("akhir") } } };
function run(seq) { let r = E.createRun(sc, "id", "2026-07-26T00:00:00.000Z");
  seq.forEach(o => { r = E.applyChoice(sc, r, o); }); return E.summarize(sc, r); }
const CASES = [
  ["A", ["a","a","a","a"], {d:100,l:100,s:100,g:100,k:5,safe:true}],
  ["B", ["b","a","b","a"], {d:88,l:88,s:88,g:88,k:4,safe:true}],
  ["C", ["a","c","d","a"], {d:63,l:75,s:63,g:66,k:3,safe:false}],
  ["D", ["a","a","c","a"], {d:75,l:88,s:75,g:78,k:3,safe:false}]];
let fail = 0;
for (const [nama, seq, x] of CASES) {
  const s = run(seq);
  const ok = s.scores.decision===x.d && s.scores.language===x.l && s.scores.sop===x.s &&
             s.scores.combined===x.g && s.keys===x.k && s.safe===x.safe && s.N===4;
  console.log((ok?"PASS":"FAIL") + " EMAS-" + nama + " → " + JSON.stringify(s.scores) + " keys=" + s.keys + " safe=" + s.safe);
  if (!ok) fail = 1;
}
const sC = run(["a","c","d","a"]);
console.log((sC.tips[0].de==="SAFE" || sC.tips[0].text.de==="SAFE" ? "PASS" : "FAIL") + " EMAS-tips: safetyTip pertama saat unsafe");
const sD = run(["a","a","c","a"]);
console.log((sD.verdicts[2].symbol==="unsafe" && sD.unsafeSteps.join()==="3" ? "PASS" : "FAIL") + " EMAS-verdik: langkah 3 = unsafe");
process.exitCode = fail;
'
```
Keluaran diharapkan (angka persis §9.5): `PASS EMAS-A … {"decision":100,"language":100,"sop":100,"combined":100} keys=5 safe=true`; `EMAS-B` 88/88/88/88 keys=4; `EMAS-C` 63/75/63/66 keys=3 safe=false; `EMAS-D` 75/88/75/78 keys=3 safe=false; plus `PASS EMAS-tips` dan `PASS EMAS-verdik`. Catatan kasus B: kombinasi per simpul di harness (Σ 7/7/7) setara dengan baris §9.5 — yang diuji adalah jumlah per sumbu, S_*, gabungan, kunci.

### Tugas 6 — `tools/check.js` + `tools/check.html`: validator konten, i18n, dan kasus emas

**Berkas**: `tools/check.js`, `tools/check.html` (buat). Prasyarat: Tugas 4, 5. Ini validator kelengkapan DE/EN/ID dan aturan penulisan — jantung SK-1/T-08/T-09/T-10.

**Kontrak** `HSL.check.runAll()` → larik `{ id, name, pass, detail }`; dan `HSL.check.canonicalDe()` → larik `{ slug, titleDe, summaryDe }` terurut `HSL.data.order` (bahan pembanding manual T-04). `runAll` dapat berjalan **tanpa DOM** (Node) dan dipakai `check.html` untuk merender tabel. Pemeriksaan minimum (satu baris hasil per skenario per kelompok, plus kelompok global):

| Id pemeriksaan | Isi |
|---|---|
| `DICT-PARITY` | Himpunan kunci `dict.de` = `dict.en` = `dict.id`, tanpa nilai kosong, substitusi `{nama}` konsisten antarbahasa (parameter yang sama muncul di ketiga versi). |
| `REG-ORDER` | `order` berisi tepat 12 slug §8.1, unik, dan setiap slug punya objek `scenarios[slug]` dengan `id` sama. |
| `SC-FIELDS-<slug>` | Bidang wajib §6.1 lengkap dan bertipe benar: `category` ∈ enum; `difficulty` 1–3; `minutes` 3–10; `startNode === "n1"`; `context` empat bidang; `goals` 2–3 butir; `debrief` lengkap (3 tips + safetyTip + praise); `sopRefs` ⊆ {P1…P8} tak kosong. |
| `SC-TEXT3-<slug>` | Setiap Text3 (semua bidang, rekursif) terisi de/en/id non-kosong; batas panjang §8.2.11 (`label` ≤ 140, `feedback` ≤ 350, `narration`/`ending` ≤ 700, `guestLine` ≤ 240) per bahasa; konten tanpa `<` diikuti huruf (deteksi markup); `guestLine` boleh `null` utuh. |
| `SC-GRAF-<slug>` | Graf: semua `next` merujuk simpul yang ada; DAG (tanpa siklus — DFS); semua simpul tercapai dari `n1` (tanpa yatim); setiap simpul keputusan 3–4 opsi ber-`id` unik `a`–`d`; setiap jalur `n1`→hasil melewati 3–5 simpul keputusan (enumerasi seluruh jalur — graf kecil); setiap jalur berakhir di simpul `outcome`. |
| `SC-RUBRIK-<slug>` | Per simpul keputusan: tepat satu opsi 2/2/2; ≥ 1 opsi berjumlah ≤ 2; skor hanya 0/1/2; tak ada dua opsi dengan triple skor **dan** `next` identik. Bendera: `unsafe` ⇒ `s===0 && d<=1`; `escalate` ⇒ `d>=1 && s>=1`; tak pernah keduanya; per skenario ≥ 1 opsi ber-`escalate`. |
| `GOLD-A…D` | Empat kasus emas §9.5 terhadap `HSL.engine` (fixture sintetis identik Tugas 5) — hasil persis tabel. |

**Langkah**:
- [ ] Tulis `tools/check.js`: IIFE mengisi `HSL.check`; tanpa akses `document` di dalam `runAll`/`canonicalDe`.
- [ ] Tulis `tools/check.html`: halaman statis (memenuhi kontrak halaman Tugas 2 kecuali tajuk aplikasi — cukup h1 "HSL — Pemeriksa Konten", tanpa tautan dari aplikasi); memuat (defer, jalur relatif `../`): tiga kamus → `../data/registry.js` → 12 skenario → `../js/engine.js` → `check.js` → skrip bootstrap kecil `check-boot` — **catatan**: bootstrap render tabel ditulis di akhir `check.js` sendiri (dibungkus `if (typeof document !== "undefined" && document.getElementById("check-out"))`) agar tetap satu berkas dan tanpa skrip sebaris tambahan. Render: tabel PASS/FAIL beserta `detail` untuk FAIL, ringkasan "X/Y PASS", dan daftar `canonicalDe()` (slug — judul DE — ringkasan DE) untuk pembandingan manual T-04.
- [ ] Karena data belum ada sampai Tugas 11, verifikasi tahap ini memakai **fixture sementara di memori harness** (bukan berkas): registry kosong → `runAll` harus melaporkan FAIL `REG-ORDER` dengan detail "0 dari 12" tanpa melempar eksepsi. Validator wajib toleran data hilang (§12 baris 7 bergantung pada ini).

**Verifikasi**:
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const fs = require("fs"), vm = require("vm");
global.window = global;
["i18n/de.js","i18n/en.js","i18n/id.js"].forEach(f => vm.runInThisContext(fs.readFileSync(f,"utf8"),{filename:f}));
window.HSL.data = { scenarios: {}, order: [] };            // fixture kosong: pra-konten
vm.runInThisContext(fs.readFileSync("js/engine.js","utf8"),{filename:"engine.js"});
vm.runInThisContext(fs.readFileSync("tools/check.js","utf8"),{filename:"check.js"});
const r = window.HSL.check.runAll();
const parity = r.find(x => x.id === "DICT-PARITY"), reg = r.find(x => x.id === "REG-ORDER");
const golds = r.filter(x => /^GOLD-/.test(x.id));
console.log(parity && parity.pass ? "PASS DICT-PARITY" : "FAIL DICT-PARITY");
console.log(reg && !reg.pass ? "PASS REG-ORDER terdeteksi-kosong" : "FAIL REG-ORDER harus FAIL saat data kosong");
console.log(golds.length === 4 && golds.every(g => g.pass) ? "PASS GOLD-A..D" : "FAIL GOLD " + JSON.stringify(golds));
process.exitCode = (parity && parity.pass && reg && !reg.pass && golds.length===4 && golds.every(g=>g.pass)) ? 0 : 1;
'
```
Keluaran diharapkan: tiga baris `PASS`. (Validasi 12 skenario penuh menyusul di Tugas 11–17.)

### Tugas 7 — `js/ui.js`: komponen DOM aman, fokus, gerak

**Berkas**: `js/ui.js` (buat). Prasyarat: Tugas 4. Kontrak: §2.4 rencana ini; §11.2–§11.6 & §12 spesifikasi.

**Langkah**:
- [ ] `el(tag, attrs, children)`: buat elemen; `attrs` dipasang via `setAttribute` (kecuali `class` → `className`); string anak → `document.createTextNode` (bukan `innerHTML`); kembalikan elemen. `clear(node)`: hapus semua anak.
- [ ] `banner({kind, text, action, dismissible})`: `<div class="banner banner--{kind}">` berisi ikon SVG sebaris `aria-hidden="true"`, `<p>` teks, tombol aksi opsional, tombol tutup berlabel `t("ui.banner.close")` bila `dismissible` (bawaan `true`; banner galat JS §12 baris 11 memakai `dismissible:false`). Fungsi pembantu `showBanner(opts)` menambahkan ke `#banners`.
- [ ] `focusHeading(elm)`, `motionMode()`, `applyMotionClass()` persis kontrak §2.4. Panel konteks permanen ≥ 1024 px bukan urusan modul ini: gayanya diatur CSS via media query, dan atribut `open` pada `<details>` konteks diset oleh `app-scenario.js` memakai `matchMedia("(min-width: 1024px)")`.
- [ ] `scoreBar(labelText, pct)`: `<div class="score-bar">` → `<span>` teks "Label: {pct} dari 100" (memakai kunci `ui.debrief.axis`) + trek `aria-hidden="true"` berisi elemen isi yang lebarnya diset `fill.style.width = pct + "%"` (transisi CSS menganimasikannya saat mode gerak penuh).
- [ ] `keysRow(keys, safe)`: lima SVG kunci sebaris (terisi `--c-accent`, kosong garis `--c-ink-soft`), wadah berlabel teks tampak "{keys} dari 5 kunci" (SVG `aria-hidden`); bila `!safe` tambahkan lencana `.safety-flag` bertekst `t("ui.home.safetyFlag")`.
- [ ] `langSwitcher(container, onPick)`: tiga `<button type="button">` "DE"/"EN"/"ID" (`aria-pressed="true"` pada aktif; `aria-label` nama bahasa lengkap dalam bahasanya sendiri + atribut `lang`); klik → `HSL.i18n.setLang(kode)` lalu `onPick` bila ada. Grup diberi `role="group"` + `aria-label` dari `ui.lang.label`.
- [ ] Semua ikon SVG sebaris dibuat lewat `document.createElementNS("http://www.w3.org/2000/svg", …)` — konstanta ruang nama SVG ini adalah pengecualian audit kedua yang disahkan (identifier, bukan jaringan; lihat Tugas 18).

**Verifikasi** (Node + stub DOM minimal untuk `el`; komponen visual diverifikasi di peramban pada Tugas 17):
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const fs = require("fs"), vm = require("vm");
global.window = global;
global.localStorage = { getItem: () => null, setItem(){}, removeItem(){} };
const kids = Symbol();
function fakeEl(tag) { return { tag, attrs: {}, children: [], className: "", style: {},
  setAttribute(k, v) { this.attrs[k] = v; }, appendChild(c) { this.children.push(c); return c; } }; }
global.document = { createElement: fakeEl, createTextNode: t => ({ text: String(t) }),
  createElementNS: (ns, tag) => fakeEl(tag), documentElement: { lang: "de", classList: { add(){}, remove(){} } } };
["i18n/de.js","i18n/en.js","i18n/id.js"].forEach(f => vm.runInThisContext(fs.readFileSync(f,"utf8"),{filename:f}));
vm.runInThisContext(fs.readFileSync("js/store.js","utf8"),{filename:"store.js"});
vm.runInThisContext(fs.readFileSync("js/i18n.js","utf8"),{filename:"i18n.js"});
vm.runInThisContext(fs.readFileSync("js/ui.js","utf8"),{filename:"ui.js"});
const U = window.HSL.ui;
const n = U.el("p", { class: "x", lang: "id" }, ["Teks aman <b>bukan markup</b>"]);
const ok1 = n.className === "x" && n.attrs.lang === "id" && n.children[0].text.includes("<b>");
console.log((ok1 ? "PASS" : "FAIL") + " U1 el() memakai textContent (markup tak dieksekusi)");
const src = fs.readFileSync("js/ui.js", "utf8");
console.log((!src.includes("innerHTML") ? "PASS" : "FAIL") + " U2 ui.js tanpa innerHTML");
process.exitCode = ok1 && !src.includes("innerHTML") ? 0 : 1;
'
```
Keluaran diharapkan: `PASS U1`, `PASS U2`.

### Tugas 8 — `js/app-index.js`: beranda dinamis

**Berkas**: `js/app-index.js` (buat). Prasyarat: Tugas 2, 3, 4, 7 (+ data Tugas 11–16 untuk hasil penuh; sebelum data ada, halaman menampilkan panel §12 baris 7). Kontrak: §5.2 & §12 spesifikasi.

**Langkah**:
- [ ] Boot sesuai §1 rencana ini. Bila `HSL.data.order.length !== 12` atau ada slug tanpa objek → tampilkan banner §12 baris 7 (`ui.player.loadError`) dan hentikan render dinamis (katalog statis DE tetap ada).
- [ ] **Panel kunjungan pertama** (bila `settings.lang` absen): render tiga tombol besar "Deutsch" / "English" / "Bahasa Indonesia" (masing-masing ber-`lang`, tanpa bendera) di kontainer panel; di atasnya baris statis "Willkommen · Welcome · Selamat datang — pilih bahasa Anda." (tiga `<span lang>`). Klik → `setLang(kode)` → panel disembunyikan → render penuh (§12 baris 1).
- [ ] **Ringkasan kemajuan**: hitung dari `progress`: `done` = jumlah entri `completed`; `keys` = Σ `best.keys` (entri ber-`best` saja). Render `t("ui.home.progress", {done, keys})`. Bila `done === 0` → ganti dengan ajakan `ui.home.empty` (§12 baris 12). Bila ke-12 entri ber-`best.keys === 5` → tambahkan panel selebrasi tenang `ui.home.mastered` (§12 baris 13).
- [ ] **Render ulang katalog** ke `#catalog` dalam bahasa aktif: struktur sama dengan statis (enam seksi kategori, urutan `data.order` di dalam kategorinya), tiap kartu: meta (kategori via `ui.home.cat.*`, kesulitan `ui.home.diff.*` + titik 1–3, `ui.home.minutes`), judul `text(sc.title)`, ringkasan `text(sc.summary)`, lencana status (`activeRun.scenarioId === id` → `ui.home.status.active`; `progress[id]?.completed` → `status.done`; selain itu `status.new`), dan bila ada `best`: `keysRow(best.keys, best.safe)` + `t("ui.home.best", {pct: best.combined})`.
- [ ] Pengalih bahasa: `langSwitcher` di kontainer tajuk; `i18n.onLangChange` → render ulang seluruh bagian dinamis + teks tajuk/kaki (elemen statis ber-atribut `data-i18n="<kunci>"` diperbarui `textContent` massal — pola yang sama dipakai ketiga halaman).
- [ ] Tampilkan banner notis store (`storage-unavailable` → `ui.banner.memory`; `corrupt-recovered` → `ui.banner.corrupt`; `newer-schema` → `ui.banner.newer`) sekali saat boot.

**Verifikasi**: sebelum data ada — buka `index.html` via `file://`: banner "Konten latihan gagal dimuat…" tampil dalam DE (bahasa cadangan), katalog statis tetap terbaca, konsol tanpa eksepsi tak tertangani. Setelah Tugas 11–16: panel bahasa tampil pada profil bersih; memilih "Bahasa Indonesia" mengalihkan seluruh katalog ke ID; ringkasan menampilkan "Selesai: 0/12 · Kunci: 0/60" digantikan ajakan status kosong. (Pemeriksaan menyeluruh di Tugas 17, 20, 21.)

### Tugas 9 — `js/app-scenario.js`: pemutar empat keadaan + pemulihan run

**Berkas**: `js/app-scenario.js` (buat). Prasyarat: Tugas 3–7. Kontrak: §5.3, §9, §12 spesifikasi; SK-12.

**Langkah**:
- [ ] **Boot**: parse `new URLSearchParams(location.search).get("id")`; tak ada / tak dikenal di `HSL.data.scenarios` → panel galat §12 baris 6 (teks `ui.player.notFound` + tombol `ui.nav.backToCatalog` → `index.html`) menggantikan pemutar; data kosong → §12 baris 7. Pasang `window.onerror` → banner §12 baris 11 (`ui.player.jsError`, `dismissible:false`, aksi `ui.player.reload` → `location.reload()`).
- [ ] **Keadaan (a) Briefing**: h1 judul; kartu konteks 4 bidang (label `ui.player.ctx*`); daftar tujuan (`ui.player.goals`); tombol primer `ui.player.start`. Bila `activeRun` ada dan `activeRun.scenarioId === id` dan `engine.currentNodeId` valid → ganti tombol mulai dengan **panel lanjutkan** (§12 baris 8): judul `ui.player.resumeTitle`, isi `ui.player.resumeBody` `{n: steps.length + 1}`, aksi `ui.player.resume` (lompat ke keadaan (b) pada simpul kini) dan `ui.player.restart` (hapus `activeRun`, mulai baru). `steps` korup → perlakukan seperti tanpa run.
- [ ] **Mulai latihan**: `store.save`: buang `activeRun` lama apa pun (termasuk milik skenario lain — §12 baris 9, tanpa dialog) dan set `activeRun = engine.createRun(sc, i18n.lang(), new Date().toISOString())`; render keadaan (b).
- [ ] **Keadaan (b) Simpul keputusan**: baris status — tautan `<a href="index.html">` berlabel "← " + `ui.player.exit` (run sudah persisten; tanpa dialog) + penanda `ui.player.step` `{n: steps.length + 1, phase: text(node.phase)}` (**tanpa bilah persen** — §19 K-5); `<details class="details-context">` ringkasan konteks (summary `ui.player.context`; `open` bila ≥ 1024 px); narasi (pisah paragraf pada `\n\n` → beberapa `<p>`); `guestLine` bila ada → blok kutip `.quote-guest` (§10.7: pada v1 tidak ada kutipan berbahasa tetap — sc-03 memakai tuturan terbata per bahasa antarmuka, sehingga atribut `lang` khusus kutipan tidak diperlukan); h2 `ui.player.question`; 3–4 tombol opsi urutan data. Fokus masuk keadaan → `focusHeading` pada penanda langkah.
- [ ] **Pilih opsi** → `run = engine.applyChoice(...)`; `store.save(s => { s.activeRun = run; })` (momen tulis per pilihan — §7.4); render **keadaan (c)** pada tampilan yang sama: semua tombol opsi `disabled` (terpilih diberi kelas `is-chosen`); kartu umpan balik di bawah opsi: judul `ui.player.feedback` (fokus dipindah ke sini), cip verdik `ui.player.verdict` `{d,l,s}` skor opsi, teks `text(option.feedback)`, blok `.safety-note` menonjol bila `flags.unsafe` (ikon + `ui.player.safetyNote`); tombol `ui.player.continue` → simpul berikut (keadaan (b)) atau keadaan (d) bila `next` simpul hasil. Pilihan tidak dapat dibatalkan (§19 K-6).
- [ ] **Keadaan (d) Hasil & debrief** (saat `engine.isFinished`): `summary = engine.summarize(sc, run)`; `store.save`: `recordResult(id, {…summary → combined/decision/language/sop/keys/safe, at})` + hapus `activeRun` (attempts bertambah hanya di sini — §7.3). Render: narasi penutup (gaya per `tone`); blok skor: `ui.debrief.result` `{label: t("ui.debrief.grade."+keys), keys}` + `keysRow` + tiga `scoreBar` (label `ui.debrief.axis.d/l/s`); banner `.safety-note` `ui.debrief.safetyCap` `{steps: unsafeSteps.join(" dan ")}` bila `!safe` (§9.3); **Debrief Mentor** (`ui.debrief.title`): 1–3 tips `summary.tips` dalam bahasa aktif; **Rekap jalur** (`ui.debrief.path`): daftar langkah — simbol verdik (✓/△/✗/⚠ + label teks `ui.debrief.sym.*` — warna tak pernah satu-satunya penanda) + label fase; tiap butir `<details>` berisi label opsi terpilih + umpan baliknya; aksi: `ui.debrief.retry` (mulai run baru skenario sama), `ui.nav.backToCatalog`, dan `ui.debrief.next` → `engine.recommendNext(HSL.data.order, progress)`: `{id}` → tautan ke skenario itu; `{allMastered}` → teks `ui.home.mastered` menggantikan tombol. Fokus masuk → judul hasil.
- [ ] **Alih bahasa di tengah run** (SK-14): `onLangChange` → render ulang keadaan aktif dalam bahasa baru; `steps`/posisi/skor tak berubah; `store.save(s => { s.activeRun.lang = kodeBaru; })` bila run aktif.
- [ ] **Animasi**: kartu umpan balik & crossfade antar-keadaan memakai kelas CSS Tugas 1; hormati `motionMode()` (JS hanya menambah kelas pemicu; CSS yang memutuskan animasi).

**Verifikasi** (peramban, `file://`, setelah data sc-01 ada — boleh ditunda ke Tugas 11): mainkan sc-01 tuntas: briefing → 4 simpul → debrief; setiap pilihan menampilkan umpan balik + fokus berpindah ke judulnya (periksa dengan Tab); muat ulang di langkah 3 → panel "Lanjutkan latihan? Anda berhenti di Langkah 3."; "Lanjutkan" meneruskan dengan skor utuh; `scenario.html?id=tidak-ada` → panel "Skenario tidak ditemukan…"; konsol bersih. (Otomasi penuh: Tugas 17, 20.)

### Tugas 10 — `js/app-info.js`: halaman info & pengaturan

**Berkas**: `js/app-info.js` (buat). Prasyarat: Tugas 2, 3, 4, 7. Kontrak: §5.4 spesifikasi; SK-15 (UI-nya), §11.6 (pengaturan gerak).

**Langkah**:
- [ ] Boot standar. Dengan JS aktif: sembunyikan dua blok `section[lang]` non-aktif (kelas util `hidden` dari CSS — atribut `hidden` asli juga boleh), tampilkan blok bahasa aktif; `onLangChange` → tukar blok. Tanpa `settings.lang` (dibuka langsung sebelum memilih bahasa): ketiga blok tetap tampil (perilaku statis).
- [ ] **Hapus semua data** (kontainer di blok Privasi & data): tombol `ui.info.deleteBtn` → panel konfirmasi sebaris (bukan `window.confirm`): teks `ui.info.deleteAsk`, tombol `ui.info.deleteYes` / `ui.info.deleteNo`; fokus dipindah ke teks konfirmasi saat panel muncul dan kembali ke tombol awal saat batal (§5.4.4 "dikelola fokusnya"). `deleteYes` → `HSL.store.resetAll()` → banner sukses `ui.info.deleted` → render ulang halaman ke kondisi tanpa preferensi (ketiga blok bahasa tampil kembali; radio gerak kembali "auto") — aplikasi kembali ke kondisi kunjungan pertama (SK-15; beranda akan menampilkan panel bahasa).
- [ ] **Pengaturan gerak**: `<fieldset>` ber-`<legend>` `ui.info.motionLegend`; tiga radio `ui.info.motion.auto/reduce/full` (name `motion`); nilai awal dari `settings.motion`; perubahan → `store.save(s => { s.settings.motion = nilai; })` + `HSL.ui.applyMotionClass()` seketika.
- [ ] `applyMotionClass()` juga dipanggil saat boot ketiga halaman (tambahkan pemanggilan yang sama di `app-index.js` dan `app-scenario.js` bila belum).

**Verifikasi** (peramban `file://`): (1) tanpa JS (nonaktifkan di peramban): ketiga blok bahasa tampil berurutan, kalimat "Penghapusan data memerlukan JavaScript…" terbaca tiga bahasa; (2) dengan JS: hanya blok aktif tampil; alih bahasa menukar blok; (3) alur hapus data: isi progres dulu (mainkan satu skenario), tekan "Hapus semua data" → konfirmasi → periksa DevTools `localStorage`: kunci `hsl.*` nol; kembali ke `index.html` → panel pilih bahasa tampil; (4) ubah radio gerak → kelas `motion-reduce`/`motion-full` pada `<html>` berubah seketika. (Formal: Tugas 20, 24.)

### Kontrak bersama Tugas 11–16 — penulisan konten skenario

Berlaku untuk kedua belas berkas `data/scenarios/*.js` (pola IIFE verbatim §8.1 spesifikasi):

1. **Cetak biru graf (mengikat)**: kecuali dinyatakan lain, topologi adalah **tulang punggung linier + kipas hasil**: `n1 → n2 → … → nK`; pada simpul terakhir `nK`, opsi teladan → `x1` (tone `good`), opsi menengah → `x2` (`mixed`), opsi lemah/unsafe → `x3` (`poor`). Semua opsi simpul non-akhir menuju simpul berikutnya yang sama, sehingga **triple skor setiap opsi dalam satu simpul wajib berbeda satu sama lain** (aturan §8.2.3 terpenuhi otomatis). Cabang pemulihan hanya pada sc-03 dan sc-05 (didefinisikan di tugasnya).
2. **Distribusi skor per simpul**: tepat satu opsi `2/2/2`; ≥ 1 opsi berjumlah ≤ 2; sisanya menengah; nilai hanya 0/1/2. Bendera: `unsafe` ⇒ `s=0` dan `d≤1`; `escalate` ⇒ `d≥1` dan `s≥1`; tak pernah keduanya; setiap skenario ≥ 1 opsi `escalate` (posisinya ditetapkan per skenario di bawah).
3. **Urutan penulisan bahasa**: DE dahulu (acuan nuansa dialog), lalu EN, lalu ID — register §10.3, terminologi §10.4, gaya & granularitas mengikuti contoh kanonik §8.3. Umpan balik menjelaskan *mengapa* + merujuk P1–P8 bila relevan + menunjukkan arah lebih kuat tanpa mengutip verbatim opsi teladan (§8.2.7).
4. **Format**: waktu 24 jam "15:05" dan uang "12,50 €" identik di tiga bahasa; teks polos tanpa markup, paragraf dipisah `\n\n`; batas panjang §8.2.11; tanpa nomor telepon selain 112; tanpa URL/surel; hotel tak bernama ("hotel Anda" / "Ihr Haus" / "your hotel").
5. **`summary.de` wajib verbatim sama** dengan ringkasan kartu statis DE di `index.html` (Tugas 2); `title` DE/EN/ID verbatim §14. Bila saat menulis Anda menemukan ringkasan statis kurang tepat, perbaiki **keduanya** agar tetap identik.
6. **Keselamatan konten §13.2** diperiksa saat menulis (formal di Tugas 26): fiksi total, tanpa klaim medis/hukum otoritatif, kebijakan selalu "sesuai batas kewenangan yang ditetapkan hotel Anda", opsi salah bermartabat, tanpa stereotip.
7. **Verifikasi baku per tugas penulisan** (disebut "checker parsial"; jalankan setelah tiap skenario rampung):
   ```bash
   cd /root/projects/hotel-scenario-lab && node -e '
   const fs = require("fs"), vm = require("vm");
   global.window = global;
   const files = ["i18n/de.js","i18n/en.js","i18n/id.js","data/registry.js"]
     .concat(fs.readdirSync("data/scenarios").sort().map(f => "data/scenarios/" + f))
     .concat(["js/engine.js","tools/check.js"]);
   files.forEach(f => vm.runInThisContext(fs.readFileSync(f,"utf8"),{filename:f}));
   const r = window.HSL.check.runAll();
   const gagal = r.filter(x => !x.pass && x.id !== "REG-ORDER");   // REG-ORDER baru lulus saat 12 berkas lengkap
   r.forEach(x => console.log((x.pass?"PASS ":"FAIL ") + x.id + (x.pass?"":" — " + x.detail)));
   console.log(gagal.length ? "== MASIH GAGAL: " + gagal.length : "== BERSIH (di luar REG-ORDER)");
   process.exitCode = gagal.length ? 1 : 0;
   '
   ```
   Keluaran diharapkan: semua baris `PASS` untuk slug yang sudah ditulis (`REG-ORDER` boleh FAIL sampai Tugas 16 selesai; sejak itu wajib PASS juga).

### Tugas 11 — `data/registry.js` + skenario check-in (sc-01, sc-02, sc-03)

**Berkas**: `data/registry.js`, `data/scenarios/sc-01-checkin-standard.js`, `sc-02-checkin-no-reservation.js`, `sc-03-checkin-language-barrier.js`. Prasyarat: Tugas 6.

- [ ] `data/registry.js`: salin **verbatim** blok §8.1 spesifikasi (12 slug, urutan persis).
- [ ] **sc-01** (`checkin`, ★1, 4 simpul, ±5 mnt, `sopRefs ["P1","P2","P3"]`, fase: Sambutan → Verifikasi → Informasi kamar & fasilitas → Penutup). Cetak biru:

  | Simpul | Opsi (skor d/l/s → tujuan; bendera) |
  |---|---|
  | n1 Sambutan | **verbatim contoh kanonik §8.3 spesifikasi** (a 2/2/2, b 1/2/1, c 2/1/2, d 0/1/1 — semua → n2) |
  | n2 Verifikasi | a 2/2/2 → n3 (cek sistem + dokumen dengan tenang); b 1/1/2 → n3 (prosedural tapi kaku); c 1/2/1 → n3 `escalate` (berkonsultasi ke rekan — patut namun tak perlu di kasus dasar); d 0/1/1 → n3 (melompati formulir registrasi) |
  | n3 Informasi kamar | a 2/2/2 → n4 (nomor kamar disampaikan diskret/tertulis + info fasilitas); b 1/2/1 → n4 (info tak lengkap); c 0/1/0 → n4 **`unsafe`** (menyebut nomor kamar lantang di lobi ramai — P3); d 1/1/1 → n4 (terburu-buru karena antrean) |
  | n4 Penutup | a 2/2/2 → x1; b 1/2/1 → x2; c 0/0/1 → x3 |
- [ ] **sc-02** (`checkin`, ★2, 5 simpul, ±7 mnt, `["P1","P4","P5","P6"]`, fase: Menenangkan → Pencarian → Opsi solusi → Eskalasi → Penyelesaian). Tulang punggung linier n1…n5 + kipas. Ketentuan khusus: n2 (pencarian sistematis: ejaan nama, tanggal, kanal pemesanan); n3 opsi lemah = menyalahkan tamu/kanal (0/0/1) dan menjanjikan pengembalian dana di luar kewenangan (1/1/0 — **bukan** unsafe, §8.2.4); n4 opsi teladan = **menelepon penanggung jawab malam sesuai prosedur, ber-`escalate`** (2/2/2 + `escalate` — eskalasi adalah titik didaktis §8.2.6); n5 penyelesaian + dokumentasi serah terima (P6). Waktu premis "23:40" tampil di narasi.
- [ ] **sc-03** (`checkin`, ★2, 4 simpul, ±6 mnt, `["P1","P4"]`, fase: Kontak awal → Strategi komunikasi → Penyelesaian kebutuhan → Penutup). **Cabang pemulihan**: n2 — opsi teladan a 2/2/2 → n3; b 1/1/1 → n3; c 0/0/1 → **n2b** (meninggikan suara — tamu makin bingung); d 1/2/1 → n3. n2b (fase "Strategi komunikasi", kesempatan kedua: memperlambat tempo, alat bantu visual): a 2/2/2 → n3; b 1/1/1 → n3; c 0/1/1 → n3. Jalur 4 atau 5 simpul — keduanya sah. `guestLine` ditulis sebagai **tuturan terbata dalam bahasa antarmuka aktif** per §10.7 (Text3 lengkap; contoh pola: "Entschuldigung… wir… Zimmer? Reserviert… Name Morel."); karena mengikuti bahasa antarmuka, **tidak ada** kutipan berbahasa tetap → tidak perlu atribut `lang` khusus di v1. Opsi ber-`escalate`: meminta bantuan rekan multibahasa (n3, skor menengah 1/2/1). Momen Bahasa-0: menirukan logat (di n2 opsi c, l=0).
- [ ] Jalankan checker parsial (kontrak bersama butir 7).

**Verifikasi**: checker parsial — semua `SC-*-sc-01/02/03` PASS; `GOLD-*` tetap PASS.

### Tugas 12 — Skenario keluhan (sc-04, sc-05, sc-06)

**Berkas**: `data/scenarios/sc-04-complaint-noise.js`, `sc-05-complaint-billing.js`, `sc-06-complaint-review-threat.js`. Prasyarat: Tugas 11.

- [ ] **sc-04** (`complaint`, ★1, 4 simpul, ±5 mnt, `["P4","P6"]`, fase: Mendengarkan → Empati & permintaan maaf → Solusi → Tindak lanjut). Linier + kipas. Kendala okupansi 92 % membatasi opsi pindah kamar (nyatakan di `context.constraints` dan narasi n3). Opsi lemah khas: menjanjikan yang tak dapat dipenuhi (1/1/0), "tidak ada yang bisa saya lakukan" (0/0/1). Opsi `escalate` di n4: menginformasikan penanggung jawab bila gangguan berlanjut + catat di log (2/2/2 + `escalate` — teladan sekaligus eskalasi patut; P6).
- [ ] **sc-05** (`complaint`, ★2, 4 simpul, ±6 mnt, `["P4","P5","P6"]`, fase: Mendengarkan → Verifikasi → Koreksi & batas kewenangan → Penutup). **Cabang pemulihan**: n2 opsi menuduh/menyalahkan (0/0/1) → **n2b** (tamu makin kesal; kesempatan memulihkan dengan verifikasi tenang baris demi baris) → n3; opsi lain → n3. Angka wajib: sarapan tertagih dua kali "2 × 19,00 €" (format §10.6). n3: opsi teladan = koreksi dalam batas kewenangan + dokumentasi; opsi lemah = menghapus semua tagihan di luar kewenangan "supaya cepat" (1/1/0 — pelanggaran kewenangan, bukan unsafe); opsi `escalate` = meneruskan penyesuaian melampaui batas ke atasan (2/2/2 + `escalate` bila dirancang sebagai teladan n3 — pilih **satu** opsi teladan saja; rekomendasi: teladan = "koreksi item yang jelas keliru dalam kewenangan + tawarkan verifikasi minibar", `escalate` menengah 1/2/2 untuk kasus melampaui batas).
- [ ] **sc-06** (`complaint`, ★3, 5 simpul, ±7 mnt, `["P4","P5","P6"]`, fase: Mendengarkan → Klarifikasi substansi → Tawaran proporsional → Menghadapi tekanan → Eskalasi & dokumentasi). Linier n1…n5 + kipas. n3/n4 opsi lemah = menyerah pada tekanan di luar kewenangan (1/1/0, SOP 0 — bukan unsafe) dan balasan konfrontatif (0/0/1). n5 opsi teladan = **serahkan ke atasan dengan ringkasan fakta terdokumentasi, ber-`escalate`** (2/2/2 + `escalate`, titik didaktis §8.2.6). Ancaman ulasan ditulis menekan tapi bermartabat (§13.2.7).
- [ ] Jalankan checker parsial.

**Verifikasi**: checker parsial — semua `SC-*-sc-04/05/06` PASS.

### Tugas 13 — Skenario penawaran tambahan (sc-07, sc-08)

**Berkas**: `data/scenarios/sc-07-upsell-arrival.js`, `sc-08-upsell-services.js`. Prasyarat: Tugas 12.

- [ ] **sc-07** (`upsell`, ★1, **3 simpul**, ±4 mnt, `["P1","P8"]`, fase: Membaca kebutuhan → Penawaran → Respons atas keputusan). Linier n1→n2→n3 + kipas (jalur 3 simpul — batas bawah sah §6.2.2). Sinyal kebutuhan: ulang tahun pernikahan Bapak & Ibu Santoso. n2 opsi lemah = menekan berulang (0/1/1) dan mengarang diskon (1/1/0 — pelanggaran kejujuran P8, bukan unsafe). n3 teladan = menerima keputusan dengan anggun apa pun jawabannya. Opsi `escalate` (konsultasi ketersediaan ke atasan) di n2, menengah 1/1/1 — **perhatian**: `escalate` wajib `s≥1` ✓.
- [ ] **sc-08** (`upsell`, ★2, 4 simpul, ±5 mnt, `["P4","P8"]`, fase: Menggali kebutuhan → Penawaran sarapan → Penawaran late check-out → Penutup). Linier + kipas. Kejujuran jam ramai sarapan "07:00–08:00" (format waktu §10.6); n2 opsi lemah = menjual slot yang tidak tersedia (1/1/0, SOP 0). Opsi `escalate` di n3 (menawarkan mengecek ke atasan soal pengecualian late check-out, 1/2/1).
- [ ] Jalankan checker parsial.

**Verifikasi**: checker parsial — semua `SC-*-sc-07/08` PASS.

### Tugas 14 — Skenario check-out (sc-09, sc-10)

**Berkas**: `data/scenarios/sc-09-checkout-rush.js`, `sc-10-checkout-minibar-dispute.js`. Prasyarat: Tugas 13.

- [ ] **sc-09** (`checkout`, ★2, 4 simpul, ±6 mnt, `["P1","P4","P5","P6"]`, fase: Triase antrean → Proses cepat → Akurasi tagihan → Penutup). Premis 07:50, shuttle 08:05 (format waktu). n1 triase adil & transparan (komunikasi ke seluruh antrean); opsi `escalate` di n2 = memanggil rekan back-office saat antrean memanjang, sekaligus opsi teladan simpul itu (2/2/2 + `escalate`). n3 opsi lemah = melewatkan verifikasi demi cepat → tagihan salah (1/1/0); ketus ke antrean (0/0/1).
- [ ] **sc-10** (`checkout`, ★2, 4 simpul, ±5 mnt, `["P1","P4","P5","P6"]`, fase: Mendengarkan → Verifikasi → Keputusan & dokumentasi → Perpisahan). Sengketa dua item minibar "7,00 €". n3: asas praduga baik dalam batas kewenangan + dokumentasi; opsi lemah = menuduh (0/0/1) atau diam-diam tetap menagih tanpa penjelasan (1/1/0); teladan n3 = praduga baik dalam batas kewenangan + dokumentasi (2/2/2, tanpa bendera); opsi `escalate` menengah di n3 = mencatat pola kecurigaan untuk ditinjau atasan, tanpa konfrontasi (1/2/2 + `escalate`). n4 perpisahan hangat + umpan balik masa inap.
- [ ] Jalankan checker parsial.

**Verifikasi**: checker parsial — semua `SC-*-sc-09/10` PASS.

### Tugas 15 — Skenario privasi (sc-11)

**Berkas**: `data/scenarios/sc-11-privacy-caller.js`. Prasyarat: Tugas 14.

- [ ] **sc-11** (`privacy`, ★3, 4 simpul, ±6 mnt, `["P2","P3","P5","P6"]`, fase: Menerima panggilan → Menahan informasi → Alternatif aman → Eskalasi). Linier + kipas; nada netral-profesional tanpa dramatisasi (§13.2.9). n2 memuat **verbatim opsi `unsafe` §8.4 spesifikasi** (b 0/1/0 `unsafe` → n3 — membenarkan keberadaan + menyebut nomor kamar); n2 teladan = tidak membenarkan apa pun, tawarkan menyampaikan pesan (P2, P3). n3 alternatif aman: mencatat pesan / mencoba menyambungkan **tanpa** konfirmasi keberadaan; opsi lemah = menyampaikan klaim penelepon sebagai fakta kepada tamu (1/1/0). n4 teladan = **laporkan ke atasan + catat kejadian di log, ber-`escalate`** (2/2/2 + `escalate`, titik didaktis). Umpan balik menjelaskan alasan perlindungan tamu di debrief, bukan menakut-nakuti.
- [ ] Jalankan checker parsial.

**Verifikasi**: checker parsial — semua `SC-*-sc-11` PASS.

### Tugas 16 — Skenario eskalasi (sc-12) + registri lengkap

**Berkas**: `data/scenarios/sc-12-escalation-collapse.js`. Prasyarat: Tugas 15.

- [ ] **sc-12** (`escalation`, ★3, 4 simpul, ±6 mnt, `["P5","P6","P7"]`, fase: Reaksi pertama → Koordinasi bantuan → Mengelola situasi lobi → Serah terima & dokumentasi). Batas konten ketat §13.2.2: opsi dan umpan balik **berhenti pada tindakan operasional** — hubungi 112, informasikan penanggung jawab, dampingi tamu, sambut petugas, beri ruang; **tanpa** instruksi P3K/CPR/diagnosis; umpan balik merujuk "pelatihan pertolongan pertama resmi dan instruksi petugas". n1 teladan = segera hubungi 112 dan tetap bersama tamu (2/2/2; ini juga eskalasi darurat — beri `escalate`); n1 opsi **`unsafe`** = menunda 112 demi mencari gejala di internet / menangani sendiri (0/1/0). n2 koordinasi: mengarahkan rekan/tamu (menyambut petugas, memberi ruang); n3 opsi **`unsafe`** kedua = menyampaikan penilaian medis kepada kerumunan (0/1/0); n4 = menginformasikan penanggung jawab + dokumentasi serah terima (teladan 2/2/2). Angka 112 adalah satu-satunya fakta dunia nyata (§19 K-12).
- [ ] Jalankan checker parsial — sejak tugas ini **`REG-ORDER` wajib PASS** (12 berkas lengkap), sehingga perintahnya menjadi: keluaran tanpa satu pun FAIL, exit code 0.

**Verifikasi**: checker parsial dengan nol FAIL total (termasuk `REG-ORDER`) — inilah gerbang konten SK-1 sisi data.

### Kontrak bersama Tugas 17–28 — fase verifikasi, QA, dan penerimaan

Tugas 17–28 adalah fase eksekusi matriks uji §16 spesifikasi. Ketentuan yang mengikat seluruh tugas fase ini:

1. **Tanpa berkas baru di proyek.** Tugas 17–28 tidak membuat dan tidak mengubah satu berkas pun di dalam proyek; pengecualian tunggal tetap §0.6: pembaruan kotak centang pada dokumen rencana ini. Artefak bukti (tangkapan layar, catatan temuan) disimpan hanya di `/tmp/hsl-qa/` — di luar akar proyek — dan tidak pernah dipindahkan ke dalam proyek.
2. **Perbaikan temuan.** Bila sebuah verifikasi menemukan cacat: perbaiki pada berkas runtime yang bertanggung jawab (hanya 30 berkas peta §1), lalu (a) ulangi verifikasi tugas pembuat berkas itu, (b) ulangi checker parsial (kontrak Tugas 11–16 butir 7) bila yang berubah adalah data/kamus/engine, dan (c) ulangi verifikasi tugas QA penemunya sampai lulus. Kotak dicentang hanya setelah lulus ulang.
3. **Profil bersih** = keadaan tanpa satu pun kunci `hsl.*`: jendela penyamaran/privat baru, atau DevTools → Application/Storage → hapus data situs, atau `localStorage.clear()` di Console sebelum memuat halaman.
4. **Lingkungan uji** (§15.4 spesifikasi): Chrome dan Firefox desktop terkini, Safari iOS ≥ 16 (perangkat nyata atau Simulator Xcode), Node lokal untuk gerbang otomatis. Bila biner Chrome di mesin bernama `chromium`/`chromium-browser`, gunakan nama itu pada perintah di bawah tanpa mengubah argumen lain.
5. **Tetap tanpa jaringan/instalasi**: dilarang memasang alat QA apa pun; seluruh verifikasi memakai peramban + DevTools, Node, dan — khusus Tugas 19 — `python3 -m http.server` sesaat tanpa berkas konfigurasi.

### Tugas 17 — Integrasi peramban: boot, data, dan alur penuh (T-08, T-09, T-10 formal; T-18)

**Berkas**: tidak ada — tugas verifikasi. Prasyarat: Tugas 0–16 selesai (30 berkas runtime lengkap). Kriteria terkait: SK-1, SK-9, SK-14.

**Langkah**:
- [ ] **Gerbang Node — checker penuh nol FAIL** (perintah di blok Verifikasi): `DICT-PARITY`, `REG-ORDER`, seluruh `SC-*` × 12 skenario, dan `GOLD-A…D` lulus semuanya.
- [ ] Buka `tools/check.html` via `file://` di Chrome: tabel merender seluruh baris PASS (0 FAIL), ringkasan "X/X PASS", dan daftar kanonik DE 12 baris (slug — judul DE — ringkasan DE). Inilah bentuk formal T-08, T-09, T-10.
- [ ] **Boot beranda pada profil bersih**: buka `index.html` → panel kunjungan pertama tampil (baris "Willkommen · Welcome · Selamat datang — pilih bahasa Anda." + tiga tombol ber-`lang`, tanpa bendera). Pilih "Bahasa Indonesia" → panel hilang; katalog dirender ulang dalam ID: 6 seksi kategori, 12 kartu berurutan `data.order`, meta kategori/kesulitan/menit lengkap; semua kartu berlencana "Baru"; ringkasan kemajuan digantikan ajakan status kosong (`ui.home.empty`).
- [ ] **Alur run penuh (sc-01, ID)**: briefing menampilkan 4 bidang konteks + tujuan pembelajaran; "Mulai latihan" → empat simpul dengan penanda "Langkah {n} · {fase}" (tanpa bilah persen — §19 K-5); setiap pilihan → kartu umpan balik (cip verdik "Keputusan {d}/2 · Bahasa {l}/2 · SOP {s}/2", teks umpan balik, fokus berpindah ke judul kartu); "Lanjut" terakhir → debrief: narasi penutup, "Hasil: {label} — {k} dari 5 kunci", `keysRow`, tiga bilah sumbu berteks "…: NN dari 100", 1–3 tips, rekap jalur ber-`<details>` per langkah, tiga aksi. "Skenario berikutnya" menunjuk sc-02 (slug pertama yang belum selesai).
- [ ] **Progres di beranda**: kembali ke katalog → kartu sc-01 berlencana "Selesai" + `keysRow` + "Terbaik NN %"; ringkasan "Selesai: 1/12 · Kunci: k/60" dengan k = kunci terbaik sc-01.
- [ ] **T-18 — alih bahasa pada tiga titik**: (a) beranda: ID→DE→EN — seluruh teks dinamis berganti, `document.documentElement.lang` dan judul dokumen mengikuti; (b) tengah run: mulai sc-04, pilih 1 opsi, alihkan ke DE → simpul yang sama terender dalam DE dengan penanda langkah tetap ke-2; asersi Console: `JSON.parse(localStorage.getItem("hsl.v1")).activeRun.steps.length === 1` dan `…activeRun.lang === "de"` → keduanya `true`; selesaikan run — skor konsisten dengan pilihan, bukan dengan bahasa; (c) debrief: alihkan bahasa → angka skor/kunci identik, hanya teks berganti; (d) muat ulang → bahasa terakhir tetap aktif (persisten antarsesi).
- [ ] **Konsol bersih** pada seluruh langkah di atas (tanpa eksepsi tak tertangani); catatan pengecualian non-aplikasi (bila ada) ditulis ke `/tmp/hsl-qa/t17-catatan.txt`.

**Verifikasi**:
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const fs = require("fs"), vm = require("vm");
global.window = global;
const files = ["i18n/de.js","i18n/en.js","i18n/id.js","data/registry.js"]
  .concat(fs.readdirSync("data/scenarios").sort().map(f => "data/scenarios/" + f))
  .concat(["js/engine.js","tools/check.js"]);
files.forEach(f => vm.runInThisContext(fs.readFileSync(f,"utf8"),{filename:f}));
const r = window.HSL.check.runAll();
const gagal = r.filter(x => !x.pass);
gagal.forEach(x => console.log("FAIL " + x.id + " — " + x.detail));
console.log("== " + (r.length - gagal.length) + "/" + r.length + " PASS, FAIL = " + gagal.length);
process.exitCode = gagal.length ? 1 : 0;
'
```
Keluaran diharapkan: tepat satu baris `== X/X PASS, FAIL = 0` (tanpa baris FAIL), exit code 0 — ditambah seluruh butir peramban pada Langkah tercentang lulus.

### Tugas 18 — Audit T-01: jaringan, dependensi, dan pola terlarang

**Berkas**: tidak ada — tugas audit statis. Prasyarat: Tugas 0–16. Kriteria terkait: SK-2 (sisi kode); menegakkan §0.1 butir 1–5 rencana ini dan §13.1 spesifikasi.

**Kontrak audit**: cakupan = seluruh berkas runtime (`*.html`, `css/`, `js/`, `i18n/`, `data/`, `tools/`, `assets/`); folder `docs/` dikecualikan. Pengecualian yang disahkan hanyalah **string persis** `http://www.w3.org/2000/svg` di tepat dua berkas: `assets/favicon.svg` (atribut `xmlns`, Tugas 2) dan `js/ui.js` (argumen `createElementNS`, Tugas 7). Di luar itu, satu temuan pun berarti gagal.

**Langkah**:
- [ ] Jalankan skrip audit pada blok Verifikasi; untuk setiap baris FAIL: perbaiki berkas penyebab (kontrak bersama butir 2), lalu ulangi sampai bersih.
- [ ] Konfirmasi manual keluaran baris `BERKAS:`: daftar 30 jalur identik dengan peta berkas §1 rencana ini (tanpa lebih, tanpa kurang).

**Verifikasi**:
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const fs = require("fs"), path = require("path");
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
  const p = path.join(d, e.name);
  if (e.isDirectory()) { if (e.name !== "docs") walk(p); } else files.push(p);
} })(".");
const runtime = files.filter(f => /\.(html|css|js|svg)$/.test(f)).sort();
console.log("BERKAS: " + runtime.join(" "));
let fail = 0; const T = (ok, id, det) => { console.log((ok ? "PASS " : "FAIL ") + id + (ok ? "" : " — " + det)); if (!ok) fail = 1; };
T(runtime.length === 30 && files.length === runtime.length, "A0 tepat-30-berkas-runtime", files.length + " berkas non-docs, " + runtime.length + " runtime");
const NS = "http://www.w3.org/2000/svg", bolehNS = { "assets/favicon.svg": 1, "js/ui.js": 1 };
const pola = [
  [/https?:\/\//, "URL-eksternal"], [/(src|href)\s*=\s*"\/\//, "URL-protokol-relatif"],
  [/\bfetch\s*\(/, "fetch"], [/XMLHttpRequest/, "XMLHttpRequest"], [/sendBeacon/, "sendBeacon"],
  [/WebSocket/, "WebSocket"], [/EventSource/, "EventSource"], [/importScripts/, "importScripts"],
  [/\beval\s*\(/, "eval"], [/new\s+Function/, "new-Function"], [/javascript:/, "javascript-URI"],
  [/<style[\s>]/i, "tag-style"], [/type="module"/, "ES-module"], [/@import/, "at-import"],
  [/integrity=/, "integrity"], [/crossorigin/, "crossorigin"], [/\binnerHTML\b/, "innerHTML"],
  [/document\.write/, "document-write"], [/sessionStorage/, "sessionStorage"], [/indexedDB/i, "indexedDB"],
  [/document\.cookie/, "cookie"], [/navigator\.serviceWorker/, "serviceWorker"], [/\bcaches\s*\./, "cache-API"]
];
const temuan = [];
for (const f of runtime) {
  let s = fs.readFileSync(f, "utf8");
  if (s.indexOf(NS) >= 0 && !bolehNS[f]) temuan.push(f + ": xmlns-svg di luar dua pengecualian");
  s = s.split(NS).join("");
  for (const [re, nama] of pola) { const m = s.match(re); if (m) temuan.push(f + ": " + nama + " -> " + m[0]); }
}
temuan.forEach(t => console.log("FAIL A1 " + t));
T(temuan.length === 0, "A1 nol-temuan-pola-terlarang (" + pola.length + " pola x " + runtime.length + " berkas)", temuan.length + " temuan");
for (const f of runtime.filter(x => x.endsWith(".html"))) {
  const s = fs.readFileSync(f, "utf8");
  const sebaris = s.match(/<script(?![^>]*src=)[^>]*>[\s\S]*?<\/script>/g) || [];
  T(sebaris.length === 1 && sebaris[0].trim() === "<script>document.documentElement.classList.add(\"js\")</script>",
    "A2 skrip-sebaris-tunggal-baris-js @ " + f, sebaris.length + " skrip sebaris");
  T(!/\son[a-z]+\s*=/i.test(s), "A3 tanpa-atribut-event @ " + f, (s.match(/\son[a-z]+\s*=/i) || [""])[0]);
  const eks = s.match(/<script[^>]*\bsrc=[^>]*>/g) || [];
  T(eks.length > 0 && eks.every(t2 => /\bdefer\b/.test(t2)), "A4 semua-script-src-defer @ " + f, eks.length + " tag");
}
const kunci = new Set();
for (const f of runtime.filter(x => x.endsWith(".js"))) {
  for (const m of fs.readFileSync(f, "utf8").matchAll(/(?:getItem|setItem|removeItem)\(\s*"([^"]+)"/g)) kunci.add(m[1]);
}
const asing = [...kunci].filter(k => k !== "hsl.v1" && k !== "hsl.v1.corrupt");
T(asing.length === 0, "A5 kunci-localStorage-hanya-hsl.v1/hsl.v1.corrupt", asing.join(","));
console.log(fail ? "== AUDIT GAGAL" : "== AUDIT BERSIH — T-01 lulus");
process.exitCode = fail;
'
```
Keluaran diharapkan: baris `BERKAS:` dengan 30 jalur, lalu `PASS A0`, `PASS A1`, `PASS A2`/`A3`/`A4` untuk keempat berkas HTML (12 baris), `PASS A5`, ditutup `== AUDIT BERSIH — T-01 lulus`, exit code 0.

### Tugas 19 — Matriks operasi `file://` dan server statis (T-02, T-03)

**Berkas**: tidak ada — tugas verifikasi. Prasyarat: Tugas 17, 18. Kriteria terkait: SK-2 (sisi runtime — nol permintaan keluar), SK-3.

**Kontrak — matriks minimum yang wajib lulus seluruhnya**:

| # | Lingkungan | Halaman/alur yang diuji |
|---|---|---|
| M1 | Chrome desktop, `file://` | `index.html`, `scenario.html?id=sc-01-checkin-standard` (run tuntas), `info.html`, `tools/check.html` |
| M2 | Firefox desktop, `file://` | sama dengan M1 |
| M3 | Chrome desktop, `http://localhost:8000` | ketiga halaman aplikasi + satu run tuntas |
| M4 | Safari iOS ≥ 16 (perangkat nyata/Simulator), `http://<IP-LAN>:8000` | pilih bahasa → run sc-01 tuntas → muat ulang di tengah run kedua → panel lanjutkan tampil |

**Langkah**:
- [ ] **M1**: dari akar proyek jalankan `google-chrome "file://$PWD/index.html"`; buka DevTools → Network (centang "Preserve log"): navigasi keempat halaman M1 dan mainkan sc-01 tuntas. Periksa: setiap baris Network berskema `file://` (nol permintaan `http(s):`/`ws:`/eksternal apa pun); konsol tanpa galat; favicon termuat dari berkas lokal.
- [ ] **M2**: ulangi M1 di Firefox (`firefox "file://$PWD/index.html"`) dengan pemeriksaan Network + konsol yang sama.
- [ ] **M3**: jalankan server sesaat — `cd /root/projects/hotel-scenario-lab && python3 -m http.server 8000` — lalu di Chrome buka `http://localhost:8000/`: ketiga halaman + satu run tuntas; panel Network hanya berisi `localhost:8000`; konsol bersih.
- [ ] **M4**: dari Safari iOS pada jaringan lokal yang sama buka `http://<IP-LAN-mesin>:8000/` (IP dari `hostname -I`); jalankan alur M4; amati kenyamanan sentuh dan ketiadaan gulir horizontal kasat mata (pengukuran formalnya di Tugas 25).
- [ ] Hentikan server (Ctrl+C). Konfirmasi tidak ada berkas tercipta: `cd /root/projects/hotel-scenario-lab && find . -type f | wc -l` → keluaran `32` (30 runtime + 2 dokumen).

**Verifikasi**: keempat baris M1–M4 tercentang lulus; penghitung berkas mengeluarkan persis `32`; tidak ada berkas konfigurasi server/tunnel/hosting apa pun di proyek.

### Tugas 20 — Penyimpanan: run terputus, pemulihan kegagalan, dan hapus data (T-05, T-06, T-07, T-17, T-20)

**Berkas**: tidak ada — tugas verifikasi. Prasyarat: Tugas 17. Kriteria terkait: SK-8, SK-12, SK-15. Padanan otomatis tingkat Node sudah lulus di Tugas 3 (S1–S7); tugas ini bentuk formalnya di peramban (kerjakan di Chrome; ulangi butir T-17a–c secara ringkas di Firefox).

**Langkah**:
- [ ] **T-17a — muat ulang di tengah run**: profil bersih berbahasa ID; mulai sc-02; pilih 2 langkah (catat opsi yang dipilih); muat ulang → briefing menampilkan panel "Lanjutkan latihan?" dengan "Anda berhenti di Langkah 3."; "Lanjutkan" → berada di simpul ke-3; selesaikan run → rekap jalur memuat seluruh langkah termasuk kedua langkah pra-muat-ulang dengan verdik sesuai pilihan semula (skor utuh).
- [ ] **T-17b — tutup tab**: mulai run baru sc-02, pilih 1 langkah, tutup tab; buka kembali `scenario.html?id=sc-02-checkin-no-reservation` → panel lanjutkan "Anda berhenti di Langkah 2.".
- [ ] **T-17c — mulai dari awal**: pada panel lanjutkan tekan "Mulai dari awal" → pemutar berada di Langkah 1; asersi Console: `JSON.parse(localStorage.getItem("hsl.v1")).activeRun.steps.length === 0` → `true`.
- [ ] **§12 baris 9 — run skenario lain dibuang saat mulai**: dengan run aktif sc-02 (1 langkah), buka sc-04 → briefing normal tanpa panel lanjutkan; tekan "Mulai latihan" (tanpa dialog apa pun) → asersi Console: `JSON.parse(localStorage.getItem("hsl.v1")).activeRun.scenarioId === "sc-04-complaint-noise"` → `true`; di beranda lencana "Berjalan" kini hanya pada sc-04.
- [ ] **T-06 — blob korup**: Console `localStorage.setItem("hsl.v1", "{rusak")` → muat ulang beranda → banner "Data kemajuan sebelumnya tidak dapat dibaca dan telah diamankan…" tampil dan panel pilih bahasa muncul kembali (status mulai baru); asersi: `localStorage.getItem("hsl.v1.corrupt") === "{rusak"` → `true`.
- [ ] **T-05 — penyimpanan dinonaktifkan**: Firefox `about:config` → `dom.storage.enabled` → `false`; muat `index.html` via `file://`: banner "Penyimpanan lokal tidak tersedia…" tampil; pilih bahasa dan mainkan sc-01 tuntas — seluruh alur berfungsi dalam sesi; muat ulang → kemajuan hilang dan banner tampil lagi (mode memori §12 baris 2); konsol tanpa galat. Kembalikan `dom.storage.enabled` → `true`. (Alternatif Chrome: Setelan → Privasi dan keamanan → Setelan situs → blokir data situs.)
- [ ] **T-07 — kuota penuh**: di Chrome dengan run aktif termuat normal, jalankan di Console:
  ```js
  localStorage.setItem("hsl.v1.corrupt", "x");
  Storage.prototype.setItem = function () { throw new DOMException("QuotaExceededError", "QuotaExceededError"); };
  ```
  lalu pilih satu opsi di pemutar → umpan balik tetap tampil (aplikasi tidak membeku), banner "Penyimpanan lokal tidak tersedia…" muncul tepat satu kali; asersi: `localStorage.getItem("hsl.v1.corrupt") === null` → `true` (percobaan-ulang §12 baris 5 menghapus kunci penyelamatan). Muat ulang halaman memulihkan `setItem` asli.
- [ ] **T-20 — hapus semua data**: siapkan kondisi kaya: sc-01 selesai + run aktif sc-02 + bahasa ID + gerak "Kurangi gerak". Buka `info.html` → "Hapus semua data" → panel konfirmasi sebaris tampil dengan fokus berpindah ke teksnya; "Batal" menutup panel dan mengembalikan fokus ke tombol pemicu; ulangi lalu "Ya, hapus semua" → banner "Semua data telah dihapus…"; asersi Console: `Object.keys(localStorage).filter(function (k) { return k.indexOf("hsl.") === 0; }).length === 0` → `true`; radio gerak kembali "Otomatis (ikuti perangkat)"; ketiga blok bahasa tampil kembali; buka `index.html` → panel pilih bahasa (kondisi kunjungan pertama penuh — SK-15).

**Verifikasi**: seluruh asersi Console di atas menghasilkan `true` persis; seluruh banner/panel muncul dengan makna teks kanonik §12 spesifikasi; T-17a–c lulus juga di Firefox.

### Tugas 21 — Cadangan tanpa JavaScript (T-04)

**Berkas**: tidak ada — tugas verifikasi. Prasyarat: Tugas 17. Kriteria terkait: SK-11.

**Langkah**:
- [ ] **Gerbang otomatis — paritas katalog statis DE vs data** (perintah di blok Verifikasi): judul DE dan ringkasan DE ke-12 skenario pada `index.html` identik verbatim dengan `title.de`/`summary.de` data (kontrak Tugas 2 ↔ Tugas 11–16 butir 5), dan tepat 12 tautan kartu.
- [ ] **Nonaktifkan JS**: Chrome — DevTools → Command Menu (Ctrl+Shift+P) → "Disable JavaScript" (DevTools tetap terbuka selama pengujian); atau Firefox — `about:config` → `javascript.enabled` → `false`.
- [ ] **`index.html` tanpa JS**: katalog statis DE terbaca penuh — 6 seksi kategori ber-jangkar, 12 kartu dengan kategori/kesulitan (Basis/Mittel/Fortgeschritten)/±menit/judul/ringkasan; chip kategori melompat ke seksinya (jangkar murni); pemberitahuan `<noscript>` tiga paragraf ber-`lang` (de/en/id) tampil; blok `js-only` (panel bahasa, ringkasan kemajuan) tidak tampak; tata letak tetap rapi bergaya token.
- [ ] **`scenario.html?id=sc-01-checkin-standard` tanpa JS**: blok statis tiga bahasa "pemutar memerlukan JavaScript" tampil; tautan kembali ke `index.html` berfungsi; tidak ada kontainer kosong yang tampak setengah jadi.
- [ ] **`info.html` tanpa JS**: ketiga blok `section[lang="de|en|id"]` tampil berurutan dan lengkap (Tentang, cara skor, P1–P8, privasi & data, disclaimer §13.3, versi); kalimat "Penghapusan data memerlukan JavaScript, atau hapus data situs melalui pengaturan peramban Anda." terbaca pada ketiga blok; kontainer hapus-data dan pengaturan gerak `js-only` tidak tampak.
- [ ] Aktifkan kembali JS; konfirmasi singkat blok `no-js-only` kembali tersembunyi pada ketiga halaman.

**Verifikasi**:
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const fs = require("fs"), vm = require("vm");
global.window = global;
["data/registry.js"].concat(fs.readdirSync("data/scenarios").sort().map(f => "data/scenarios/" + f))
  .forEach(f => vm.runInThisContext(fs.readFileSync(f,"utf8"),{filename:f}));
const html = fs.readFileSync("index.html","utf8");
let fail = 0;
for (const slug of window.HSL.data.order) {
  const sc = window.HSL.data.scenarios[slug];
  const okT = html.includes(sc.title.de), okS = html.includes(sc.summary.de);
  console.log((okT && okS ? "PASS " : "FAIL ") + "T04-" + slug + (okT ? "" : " [judul]") + (okS ? "" : " [ringkasan]"));
  if (!okT || !okS) fail = 1;
}
const n = (html.match(/scenario\.html\?id=sc-/g) || []).length;
console.log((n === 12 ? "PASS" : "FAIL") + " T04-tautan-kartu = " + n);
process.exitCode = fail || n !== 12 ? 1 : 0;
'
```
Keluaran diharapkan: 12 baris `PASS T04-sc-…` + `PASS T04-tautan-kartu = 12`, exit code 0 — ditambah seluruh butir peramban tercentang lulus.

### Tugas 22 — Papan ketik penuh dan pembaca layar (T-11, T-12)

**Berkas**: tidak ada — tugas verifikasi. Prasyarat: Tugas 17. Kriteria terkait: SK-4.

**Langkah — papan ketik (Chrome, profil bersih, tanpa tetikus/sentuhan sama sekali)**:
- [ ] Tab pertama pada `index.html` → tautan lompat "Langsung ke konten" tampak dan berfungsi (Enter memindahkan fokus ke `<main>`).
- [ ] Panel kunjungan pertama: ketiga tombol bahasa terjangkau Tab; Enter memilih "Bahasa Indonesia".
- [ ] Tab menyusuri tajuk (pengalih bahasa — keadaan `aria-pressed` terlihat dari gaya aktif), chip kategori, lalu kartu sc-01; Enter membuka pemutar; urutan fokus = urutan DOM = urutan visual.
- [ ] Run penuh sc-01 hanya dengan papan ketik: "Mulai latihan" (Enter); per simpul: Tab ke opsi, Space/Enter memilih; setelah memilih, fokus otomatis pada judul kartu umpan balik (asersi Console: `document.activeElement.textContent` = "Umpan balik"); Tab → "Lanjut" → Enter; pada simpul baru fokus berada di penanda langkah; di debrief fokus pada judul hasil; `<details>` rekap dapat dibuka/ditutup dengan Enter; ketiga aksi terjangkau; "Ke katalog" mengembalikan ke beranda.
- [ ] `info.html`: alur hapus data dua langkah sepenuhnya dengan papan ketik (fokus pindah ke teks konfirmasi; "Batal" mengembalikan fokus); radio gerak dapat diubah dengan tombol panah.
- [ ] Sepanjang alur: cincin fokus 3 px selalu terlihat (putih di atas tombol primer), tanpa jebakan fokus, tanpa elemen interaktif yang terlewati Tab.

**Langkah — pembaca layar**:
- [ ] **NVDA + Firefox (desktop)**: selesaikan sc-01 tuntas. Periksa: judul halaman dan `lang` dokumen benar (pengucapan berganti setelah alih bahasa); tombol opsi dibacakan utuh; kartu umpan balik dibacakan setelah fokus berpindah; cip verdik terbaca "Keputusan 2/2 · Bahasa 1/2 · SOP 2/2"; bilah sumbu dibacakan sebagai teks "Keputusan: 88 dari 100" (bilah visual `aria-hidden` senyap); banner diumumkan lewat region `aria-live="polite"`; `keysRow` terbaca "{k} dari 5 kunci".
- [ ] **VoiceOver + Safari iOS**: selesaikan sc-04 tuntas; pengalih bahasa mengumumkan keadaan aktif (`aria-pressed`); `<details>` konteks dapat dibuka; navigasi judul rotor menuruti hierarki h1→h2→h3 tanpa loncatan tingkat.
- [ ] Setiap temuan dicatat di `/tmp/hsl-qa/t11-t12-catatan.txt`, diperbaiki (kontrak bersama butir 2), dan langkah terkait diulang sampai bersih.

**Verifikasi**: seluruh butir di atas tercentang lulus; T-11 dan T-12 dinyatakan lulus hanya bila kedua sesi pembaca layar selesai tanpa temuan terbuka.

### Tugas 23 — Audit kontras WCAG 2.2 AA (T-13)

**Berkas**: tidak ada — tugas verifikasi. Prasyarat: Tugas 17. Kriteria terkait: SK-5.

**Langkah**:
- [ ] **Gerbang otomatis — rasio kontras token** (perintah di blok Verifikasi): skrip membaca nilai token aktual dari `css/styles.css` (toleran terhadap penyetelan lightness yang diizinkan §11.5) dan menghitung rasio WCAG untuk pasangan pemakaian; semua baris wajib PASS.
- [ ] **Audit pemakaian `--c-accent-soft`**: `grep -n "c-accent-soft" css/styles.css` — setiap kemunculan hanya pada properti ornamen (garis/border/latar aksen besar), tidak pernah `color` teks kecil.
- [ ] **Audit pemakaian `--c-accent`**: `grep -n "var(--c-accent)" css/styles.css` — sebagai warna teks kecil hanya di atas `--c-surface`, tidak pernah di atas `--c-bg` (aturan komentar token Tugas 1).
- [ ] **Pemeriksaan sampel terender** (DevTools → pemilih warna kontras): teks kartu di katalog, teks putih tombol primer, teks banner peringatan/bahaya, teks `.safety-note` — rasio tampil ≥ 4.5:1 (teks) sesuai perhitungan skrip.
- [ ] **Zoom teks 200 %** (§11.1.3): pada Chrome perbesar hingga 200 % — ketiga halaman + pemutar tetap berfungsi tanpa teks terpotong/tumpang tindih.
- [ ] **Warna bukan penanda tunggal** (§11.1.4): simbol verdik ✓/△/✗/⚠ selalu berdampingan dengan label teks `ui.debrief.sym.*`; cip verdik memuat angka; lencana keselamatan memuat teks.

**Verifikasi**:
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const s = require("fs").readFileSync("css/styles.css", "utf8");
const tok = {}; for (const m of s.matchAll(/--(c-[a-z-]+):\s*(#[0-9A-Fa-f]{6})/g)) tok[m[1]] = m[2];
function lum(h) { const c = [1,3,5].map(i => parseInt(h.substr(i,2),16)/255)
  .map(v => v <= 0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
  return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]; }
function rasio(a, b) { const x = lum(a), y = lum(b); return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05); }
let fail = 0;
function uji(nama, a, b, min) { const r = rasio(a, b); const ok = r >= min;
  console.log((ok ? "PASS " : "FAIL ") + nama + " = " + r.toFixed(2) + " (min " + min + ")"); if (!ok) fail = 1; }
uji("teks-putih/primer", "#FFFFFF", tok["c-primary"], 4.5);
uji("ink/bg", tok["c-ink"], tok["c-bg"], 4.5);
uji("ink/surface", tok["c-ink"], tok["c-surface"], 4.5);
uji("ink-soft/surface", tok["c-ink-soft"], tok["c-surface"], 4.5);
uji("ink-soft/bg", tok["c-ink-soft"], tok["c-bg"], 4.5);
uji("accent/surface", tok["c-accent"], tok["c-surface"], 4.5);
uji("danger/surface", tok["c-danger"], tok["c-surface"], 4.5);
uji("success/surface", tok["c-success"], tok["c-surface"], 4.5);
uji("warn/surface", tok["c-warn"], tok["c-surface"], 4.5);
uji("komponen primer/bg (cincin fokus)", tok["c-primary"], tok["c-bg"], 3);
uji("komponen primer/surface", tok["c-primary"], tok["c-surface"], 3);
process.exitCode = fail;
'
```
Keluaran diharapkan: 11 baris `PASS` dengan rasio tercetak ≥ ambang masing-masing, exit code 0 — ditambah kelima butir manual tercentang lulus.

### Tugas 24 — Gerak: `prefers-reduced-motion` dan pengaturan manual (T-15)

**Berkas**: tidak ada — tugas verifikasi. Prasyarat: Tugas 17 (dan Tugas 10 untuk radio gerak). Kriteria terkait: SK-7; tabel perilaku §11.6 spesifikasi.

**Kontrak — enam kombinasi yang wajib diuji** (emulasi OS via DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion"):

| # | Preferensi OS | `settings.motion` | Kelas `<html>` diharapkan | Perilaku diharapkan |
|---|---|---|---|---|
| G1 | tanpa preferensi | auto | `motion-full` | animasi penuh §11.6 |
| G2 | reduce | auto | `motion-reduce` | semua tampil instan pada nilai akhir |
| G3 | tanpa preferensi | reduce | `motion-reduce` | instan |
| G4 | reduce | reduce | `motion-reduce` | instan |
| G5 | tanpa preferensi | full | `motion-full` | penuh |
| G6 | reduce | full | `motion-full` | penuh (pengaturan pengguna menimpa OS) |

**Langkah**:
- [ ] **G1–G6**: untuk tiap baris — setel emulasi OS + radio di `info.html`; periksa di panel Elements kelas `<html>` berganti **seketika tanpa muat ulang** saat radio diubah; lalu di pemutar: pilih satu opsi → kartu umpan balik beranimasi (opacity+translateY 220 ms) pada mode penuh / tampil instan pada mode dikurangi; masuk debrief → stagger ikon kunci dan isi bilah sumbu beranimasi pada mode penuh / langsung pada nilai akhir saat dikurangi; panel DevTools → Animations tidak merekam animasi baru pada mode dikurangi (kecuali transisi warna hover/fokus, yang memang diizinkan §11.6).
- [ ] **Gulir-ke-fokus**: pada mode penuh perpindahan fokus antarsimpul menggulir halus (`smooth`); pada mode dikurangi lompat langsung (`auto`).
- [ ] **Perubahan preferensi OS pada mode "auto"**: setelah mengubah emulasi, kelas mengikuti nilai baru saat halaman dimuat berikutnya (kontrak §2.4 hanya mewajibkan evaluasi saat boot dan saat pengaturan diubah — bukan pendengar perubahan langsung; jangan menandai gagal untuk itu).
- [ ] **Persistensi**: setel "Kurangi gerak", muat ulang → radio tetap terpilih dan kelas `motion-reduce` terpasang sejak boot.

**Verifikasi**: keenam baris G1–G6 berperilaku persis kolom "Kelas" dan "Perilaku"; kedua butir tambahan lulus. T-15 lulus bila 6/6 kombinasi sesuai.

### Tugas 25 — QA responsif: tangkapan layar lima lebar dan larangan gulir horizontal (T-14)

**Berkas**: tidak ada — tugas verifikasi; seluruh tangkapan layar hanya ke `/tmp/hsl-qa/`. Prasyarat: Tugas 17. Kriteria terkait: SK-6; tabel tata letak §11.4 spesifikasi.

**Langkah**:
- [ ] **Tangkapan layar otomatis tiga halaman × lima lebar** (15 berkas PNG):
  ```bash
  mkdir -p /tmp/hsl-qa && cd /root/projects/hotel-scenario-lab && \
  for w in 320 375 768 1024 1440; do
    google-chrome --headless=new --disable-gpu --window-size=${w},1200 --screenshot=/tmp/hsl-qa/index-${w}.png "file://$PWD/index.html"
    google-chrome --headless=new --disable-gpu --window-size=${w},1200 --screenshot=/tmp/hsl-qa/scenario-${w}.png "file://$PWD/scenario.html?id=sc-01-checkin-standard"
    google-chrome --headless=new --disable-gpu --window-size=${w},1200 --screenshot=/tmp/hsl-qa/info-${w}.png "file://$PWD/info.html"
  done && ls /tmp/hsl-qa | wc -l
  ```
  Keluaran diharapkan: `15` (atau lebih bila berkas Tugas lain sudah ada); tinjau ke-15 PNG satu per satu.
- [ ] **Empat keadaan pemutar × lima lebar** (DevTools → Device Toolbar, lebar 320/375/768/1024/1440): briefing, simpul keputusan, umpan balik, debrief — periksa visual tiap kombinasi; simpan tangkapan layar DevTools untuk keadaan simpul dan debrief pada kelima lebar ke `/tmp/hsl-qa/player-simpul-{w}.png` dan `/tmp/hsl-qa/player-debrief-{w}.png` (10 berkas).
- [ ] **Asersi tanpa gulir horizontal** pada tiap kombinasi di atas (5 lebar × [3 halaman + 4 keadaan pemutar]), di Console:
  ```js
  document.documentElement.scrollWidth <= window.innerWidth
  ```
  → `true` di semua kombinasi. Bila `false`, temukan pelanggarnya dengan:
  ```js
  [].slice.call(document.querySelectorAll("*")).filter(function (e) { return e.getBoundingClientRect().right > window.innerWidth + 1; }).slice(0, 5)
  ```
  → perbaiki CSS (Tugas 1) dan ulangi.
- [ ] **Tonggak tata letak §11.4** (verifikasi dari tangkapan layar): 320/375 → katalog 1 kolom, konteks pemutar dalam `<details>`; 768 → katalog 2 kolom, pemutar terpusat maks 680 px; 1024 → katalog 3 kolom, pemutar 2 kolom dengan panel konteks permanen (`ctx-pinned`); 1440 → lebar konten maks 1200 px terpusat, spasi membesar; tajuk dan pengalih bahasa tetap terlihat pada 320 px.
- [ ] **Target sentuh ≥ 44 px dan jarak antaropsi ≥ 8 px** — pada lebar 320 di halaman pemutar (keadaan simpul) dan beranda, di Console:
  ```js
  [].slice.call(document.querySelectorAll("button, .chip, .btn, .btn--option")).map(function (e) { var r = e.getBoundingClientRect(); return [e.className, Math.round(r.height)]; }).filter(function (p) { return p[1] > 0 && p[1] < 44; })
  ```
  → `[]` (elemen tersembunyi berukuran 0 dikecualikan); jarak vertikal antartombol opsi diperiksa visual ≥ 8 px.

**Verifikasi**: 25 tangkapan layar tersimpan di `/tmp/hsl-qa/` dan ditinjau; asersi gulir horizontal `true` pada seluruh 35 kombinasi; asersi target sentuh mengembalikan larik kosong; keempat tonggak §11.4 terkonfirmasi.

### Tugas 26 — Daftar periksa keselamatan konten (T-19)

**Berkas**: tidak ada — tugas tinjauan konten. Prasyarat: Tugas 11–16 (konten lengkap), Tugas 17. Kriteria terkait: SK-13; aturan §13.2 spesifikasi butir demi butir. Mencentang kotak pada tugas ini adalah bentuk "ditandatangani lulus" yang dimaksud SK-13.

**Langkah**:
- [ ] **Gerbang heuristik otomatis** (perintah di blok Verifikasi): tanpa URL/surel, tanpa deret angka ≥ 4 digit (menangkal nomor telepon/tahun nyata), "112" hanya di sc-12, tanpa frasa klaim hukum otoritatif, tanpa istilah instruksi medis — pada seluruh string konten 12 skenario.
- [ ] **Tinjauan manual per skenario** — baca utuh (ketiga bahasa) dan nyatakan lulus terhadap **kesembilan butir §13.2** (fiksi total; tanpa klaim medis; tanpa klaim hukum; tanpa kebijakan karangan spesifik; privasi sebagai norma; eskalasi terhormat; opsi salah bermartabat; anti-stereotip; topik sensitif terjaga):
  - [ ] sc-01-checkin-standard — 9/9 lulus
  - [ ] sc-02-checkin-no-reservation — 9/9 lulus
  - [ ] sc-03-checkin-language-barrier — 9/9 lulus (khusus: strategi komunikasi menjaga martabat; tanpa ejekan logat sebagai humor)
  - [ ] sc-04-complaint-noise — 9/9 lulus
  - [ ] sc-05-complaint-billing — 9/9 lulus (angka hanya "2 × 19,00 €" berformat §10.6)
  - [ ] sc-06-complaint-review-threat — 9/9 lulus (tekanan ditulis menekan tetapi bermartabat)
  - [ ] sc-07-upsell-arrival — 9/9 lulus
  - [ ] sc-08-upsell-services — 9/9 lulus
  - [ ] sc-09-checkout-rush — 9/9 lulus
  - [ ] sc-10-checkout-minibar-dispute — 9/9 lulus (praduga baik; tanpa tuduhan)
  - [ ] sc-11-privacy-caller — 9/9 lulus (netral-profesional; alasan perlindungan tamu di debrief, bukan menakut-nakuti)
  - [ ] sc-12-escalation-collapse — 9/9 lulus (opsi/umpan balik berhenti pada tindakan operasional; tanpa instruksi P3K/CPR/diagnosis; rujukan "pelatihan pertolongan pertama resmi")
- [ ] **Distribusi nama/peran** (§13.2.8): tabulasikan tamu ke-12 skenario (Albrecht, Tan, Morel, Sommer, Weiland, Brandt, Santoso, Rossi, Adeyemi, Petersen, Weber, Lindqvist) beserta peran naratifnya; peran menekan/negatif (mis. sc-06, penelepon sc-11) tidak berkorelasi dengan satu pola asal nama; peran positif/netral tersebar lintas nama.
- [ ] **Tanda tangan kelulusan SK-13**: dua belas kotak di atas + heuristik + distribusi nama seluruhnya lulus → centang kotak ini sebagai penutup T-19 (12 skenario × 9 butir = 108 butir lulus).

**Verifikasi**:
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const fs = require("fs"), vm = require("vm");
global.window = global;
["data/registry.js"].concat(fs.readdirSync("data/scenarios").sort().map(f => "data/scenarios/" + f))
  .forEach(f => vm.runInThisContext(fs.readFileSync(f,"utf8"),{filename:f}));
const teks = [];
(function telusur(o, p) { if (typeof o === "string") teks.push([p, o]);
  else if (o && typeof o === "object") for (const k in o) telusur(o[k], p + "." + k); })(window.HSL.data.scenarios, "");
let fail = 0; const T = (ok, id, det) => { console.log((ok ? "PASS " : "FAIL ") + id + (ok ? "" : " — " + det)); if (!ok) fail = 1; };
const url = teks.filter(x => /(https?:|www\.|@[a-z])/i.test(x[1]));
T(url.length === 0, "K1 tanpa-URL/surel", url.slice(0,3).map(x => x[0]).join(","));
const angka = teks.filter(x => /\d{4,}/.test(x[1]));
T(angka.length === 0, "K2 tanpa-deret-angka>=4-digit", angka.slice(0,3).map(x => x[0] + ": " + x[1].match(/\d{4,}/)[0]).join(" | "));
const n112 = teks.filter(x => /\b112\b/.test(x[1]));
T(n112.every(x => x[0].indexOf(".sc-12-") === 0), "K3 112-hanya-di-sc-12", n112.filter(x => x[0].indexOf(".sc-12-") !== 0).slice(0,3).map(x => x[0]).join(","));
const hukum = teks.filter(x => /(undang-undang mewajibkan|gesetzlich verpflichtet|the law requires)/i.test(x[1]));
T(hukum.length === 0, "K4 tanpa-klaim-hukum-otoritatif", hukum.slice(0,2).map(x => x[0]).join(","));
const medis = teks.filter(x => /(CPR|Herzdruckmassage|Wiederbelebung|Beatmung|kompresi dada|napas buatan|resusitasi|chest compression)/i.test(x[1]));
T(medis.length === 0, "K5 tanpa-instruksi-medis", medis.slice(0,2).map(x => x[0]).join(","));
console.log(fail ? "== HEURISTIK GAGAL" : "== HEURISTIK BERSIH — tinjauan manual 12x9 tetap wajib");
process.exitCode = fail;
'
```
Keluaran diharapkan: `PASS K1` … `PASS K5` + `== HEURISTIK BERSIH — tinjauan manual 12x9 tetap wajib`, exit code 0. Heuristik **tidak menggantikan** tinjauan manual; keduanya wajib.

### Tugas 27 — Anggaran ukuran dan kinerja (T-16)

**Berkas**: tidak ada — tugas verifikasi. Prasyarat: Tugas 17. Kriteria terkait: SK-10; batas §15.5 spesifikasi (verbatim di §0.1 butir 10 rencana ini).

**Langkah**:
- [ ] **Gerbang otomatis — seluruh batas ukuran** (perintah di blok Verifikasi): `styles.css` ≤ 45 KB; total 7 berkas `js/*.js` ≤ 70 KB; tiap kamus ≤ 20 KB; tiap skenario ≤ 30 KB; total termuat per halaman (HTML + seluruh `src`/`href` lokal yang dirujuknya) ≤ 550 KB. `tools/` dikecualikan dari anggaran.
- [ ] **Render bermakna pertama < 1 detik**: DevTools → Performance, CPU throttling 4× (proksi ponsel kelas menengah), muat `index.html` via `file://` → katalog terlihat < 1 000 ms dari navigasi (baca dari lini masa rekaman).
- [ ] **Pilihan → umpan balik < 100 ms**: rekam Performance saat menekan satu tombol opsi di pemutar → jarak event klik ke lukisan pertama kartu umpan balik < 100 ms (animasi opacity berjalan setelah lukisan pertama — yang diukur adalah kemunculan, bukan akhir animasi).
- [ ] Bila tersedia, ulangi kedua pengukuran pada ponsel kelas menengah nyata melalui server statis Tugas 19 (M4); hasil emulasi CPU 4× diterima sebagai pemenuhan T-16 bila perangkat nyata tidak tersedia di lingkungan kerja.

**Verifikasi**:
```bash
cd /root/projects/hotel-scenario-lab && node -e '
const fs = require("fs");
const sz = f => fs.statSync(f).size;
let fail = 0; const T = (ok, id, det) => { console.log((ok ? "PASS " : "FAIL ") + id + " — " + det); if (!ok) fail = 1; };
T(sz("css/styles.css") <= 45*1024, "B1 styles.css <= 45 KB", sz("css/styles.css") + " B");
const js = fs.readdirSync("js").sort().map(f => "js/" + f);
const jsTot = js.reduce((a, f) => a + sz(f), 0);
T(js.length === 7 && jsTot <= 70*1024, "B2 js/*.js 7 berkas <= 70 KB total", js.length + " berkas, " + jsTot + " B");
for (const f of ["i18n/de.js","i18n/en.js","i18n/id.js"]) T(sz(f) <= 20*1024, "B3 " + f + " <= 20 KB", sz(f) + " B");
for (const f of fs.readdirSync("data/scenarios").sort()) T(sz("data/scenarios/" + f) <= 30*1024, "B4 " + f + " <= 30 KB", sz("data/scenarios/" + f) + " B");
for (const hal of ["index.html","scenario.html","info.html"]) {
  const html = fs.readFileSync(hal, "utf8");
  const rujuk = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m => m[1])
    .concat([...html.matchAll(/<link[^>]*href="([^"]+)"/g)].map(m => m[1]));
  const tot = rujuk.reduce((a, f) => a + sz(f), sz(hal));
  T(tot <= 550*1024, "B5 total-termuat " + hal + " <= 550 KB", tot + " B (" + (rujuk.length + 1) + " berkas)");
}
process.exitCode = fail;
'
```
Keluaran diharapkan: 20 baris `PASS` (B1 ×1, B2 ×1, B3 ×3, B4 ×12, B5 ×3) dengan ukuran byte tercetak, exit code 0 — ditambah kedua pengukuran kinerja lulus.

### Tugas 28 — Penerimaan akhir peramban dan deklarasi selesai v1

**Berkas**: tidak ada — gerbang rilis. Prasyarat: **seluruh kotak Tugas 0–27 tercentang**. Kriteria terkait: seluruh SK-1…SK-15 ("Definisi selesai" spesifikasi: §2 penuh + seluruh baris §16 lulus).

**Langkah**:
- [ ] **Inventaris berkas final**: `cd /root/projects/hotel-scenario-lab && find . -type f | sort` → tepat 32 jalur, tidak lebih tidak kurang (urutan penyortiran lokal boleh berbeda; himpunannya yang mengikat):
  `./assets/favicon.svg`, `./css/styles.css`, `./data/registry.js`, `./data/scenarios/sc-01-checkin-standard.js` … `./data/scenarios/sc-12-escalation-collapse.js` (12 berkas), `./docs/superpowers/plans/2026-07-26-hotel-scenario-lab-v1.md`, `./docs/superpowers/specs/2026-07-26-hotel-scenario-lab-design.md`, `./i18n/de.js`, `./i18n/en.js`, `./i18n/id.js`, `./index.html`, `./info.html`, `./js/app-index.js`, `./js/app-info.js`, `./js/app-scenario.js`, `./js/engine.js`, `./js/i18n.js`, `./js/store.js`, `./js/ui.js`, `./scenario.html`, `./tools/check.html`, `./tools/check.js`.
- [ ] **Bebas artefak terlarang**: `find . \( -name ".git" -o -name ".gitignore" -o -name "package.json" -o -name "package-lock.json" -o -name "node_modules" -o -name "*.lock" \) | wc -l` → `0` (tanpa git, paket, maupun konfigurasi server/tunnel — §0.4–0.5).
- [ ] **Konsistensi versi**: `grep -c "HSL.APP_VERSION = \"1.0.0\"" js/store.js` → `1`; `grep -l "v1.0.0" index.html scenario.html info.html` → ketiga jalur tercetak (kaki halaman + bagian Versi info).
- [ ] **Jalur pengguna utuh pada profil bersih (Chrome, `file://`)**: kunjungan pertama → pilih ID → sc-01 tuntas → progres tampil di beranda → alih EN → sc-11 tuntas dalam EN, sekali dengan sengaja memilih opsi `unsafe` di n2: catatan keselamatan tampil di umpan balik dan debrief menampilkan banner batas kunci (kunci ≤ 3, `ui.debrief.safetyCap` menyebut nomor langkahnya) → ulangi sc-11 bersih → alih DE → sc-12 tuntas dalam DE (konten darurat berhenti pada tindakan operasional; 112 disebut sebagai eskalasi patut) → `info.html` menampilkan blok bahasa aktif.
- [ ] **`tools/check.html` hijau penuh**: 0 FAIL; tangkapan layar bukti ke `/tmp/hsl-qa/final-check.png`.
- [ ] **Rekapitulasi matriks §16** — seluruh baris telah dieksekusi dan lulus (rujukan tugas eksekusi di tabel §6.2 rencana ini):
  - [ ] T-01 lulus (Tugas 18)
  - [ ] T-02 lulus (Tugas 19)
  - [ ] T-03 lulus (Tugas 19)
  - [ ] T-04 lulus (Tugas 21)
  - [ ] T-05 lulus (Tugas 20)
  - [ ] T-06 lulus (Tugas 20)
  - [ ] T-07 lulus (Tugas 20)
  - [ ] T-08 lulus (Tugas 17)
  - [ ] T-09 lulus (Tugas 17)
  - [ ] T-10 lulus (Tugas 17)
  - [ ] T-11 lulus (Tugas 22)
  - [ ] T-12 lulus (Tugas 22)
  - [ ] T-13 lulus (Tugas 23)
  - [ ] T-14 lulus (Tugas 25)
  - [ ] T-15 lulus (Tugas 24)
  - [ ] T-16 lulus (Tugas 27)
  - [ ] T-17 lulus (Tugas 20)
  - [ ] T-18 lulus (Tugas 17)
  - [ ] T-19 lulus (Tugas 26)
  - [ ] T-20 lulus (Tugas 20)
- [ ] **Deklarasi selesai v1**: seluruh SK-1…SK-15 terpenuhi (peta bukti di tabel §6.1); "Definisi selesai" spesifikasi terpenuhi. Centang kotak ini paling akhir.

**Verifikasi**: keluaran ketiga perintah persis seperti tertulis; ke-20 kotak rekapitulasi dan kotak deklarasi tercentang. Dengan itu rencana ini selesai dieksekusi.

---

## 6. Tabel Ketertelusuran SK-1…SK-15 dan T-01…T-20

### 6.1 Kriteria keberhasilan → tugas

| SK | Ringkasan kriteria (§2 spesifikasi) | Uji | Tugas pembangun | Tugas verifikasi |
|---|---|---|---|---|
| SK-1 | 12 skenario tuntas tiga bahasa; pemeriksa 0 galat | T-08, T-09 | 4, 6, 11–16 | 17, 28 |
| SK-2 | Nol permintaan jaringan; nol dependensi | T-01, T-02 | 1–16 (disiplin §0.1) | 18, 19 |
| SK-3 | Berfungsi dari `file://` dan server statis | T-02, T-03 | 2, 8, 9, 10 | 19 |
| SK-4 | Alur penuh papan ketik; pembaca layar lulus | T-11, T-12 | 2, 7, 9 | 22 |
| SK-5 | Kontras WCAG 2.2 AA | T-13 | 1 | 23 |
| SK-6 | Lima lebar 320–1440 tanpa gulir horizontal | T-14 | 1, 2 | 25 |
| SK-7 | `prefers-reduced-motion` + pengaturan gerak manual | T-15 | 1, 7, 10 | 24 |
| SK-8 | Semua mode kegagalan penyimpanan §12 berperilaku benar | T-05, T-06, T-07 | 3, 8, 9 | 20 |
| SK-9 | Empat kasus emas §9.5 direproduksi persis | T-10 | 5, 6 | 17 |
| SK-10 | Anggaran ukuran & kinerja §15.5 | T-16 | 1–16 (disiplin §0.1 butir 10) | 27 |
| SK-11 | Tanpa JS: katalog, info, `<noscript>` tiga bahasa | T-04 | 2 | 21 |
| SK-12 | Run terputus dapat dilanjutkan | T-17 | 3, 9 | 20 |
| SK-13 | Daftar keselamatan konten §13.2 ditandatangani lulus | T-19 | 11–16 | 26 |
| SK-14 | Bahasa persisten; alih di tengah run tak mengubah skor/posisi | T-18 | 4, 9 | 17 |
| SK-15 | "Hapus semua data" → kondisi pertama kali | T-20 | 3, 10 | 20 |

### 6.2 Baris matriks uji → tugas eksekusi

| Uji | Area | Gerbang otomatis (Node) | Eksekusi formal |
|---|---|---|---|
| T-01 | Audit dependensi & kebersihan | Tugas 18 (skrip audit A0–A5) | Tugas 18 |
| T-02 | Operasi `file://` | — | Tugas 19 (M1, M2) |
| T-03 | Operasi server statis | — | Tugas 19 (M3, M4) |
| T-04 | Tanpa JS | Tugas 21 (paritas katalog DE) | Tugas 21 |
| T-05 | Penyimpanan nonaktif | Tugas 3 (S2, S2b) | Tugas 20 |
| T-06 | Data korup | Tugas 3 (S3) | Tugas 20 |
| T-07 | Kuota penuh | Tugas 3 (S5) | Tugas 20 |
| T-08 | Paritas i18n | Tugas 4 (I1–I2), 6, 17 | Tugas 17 (`check.html`) |
| T-09 | Validasi graf konten | Tugas 11–16 (checker parsial), 17 | Tugas 17 (`check.html`) |
| T-10 | Kasus emas skor | Tugas 5 (EMAS-A…D), 6, 17 | Tugas 17 (`check.html`) |
| T-11 | Papan ketik penuh | — | Tugas 22 |
| T-12 | Pembaca layar | — | Tugas 22 |
| T-13 | Kontras | Tugas 23 (skrip rasio token) | Tugas 23 |
| T-14 | Responsif lima lebar | — | Tugas 25 |
| T-15 | Gerak dikurangi/manual | — | Tugas 24 |
| T-16 | Anggaran ukuran/kinerja | Tugas 27 (skrip B1–B5) | Tugas 27 |
| T-17 | Lanjutkan run | Tugas 3 (jaring baca), 5 (`currentNodeId`) | Tugas 20 |
| T-18 | Alih bahasa tiga titik | — | Tugas 17 |
| T-19 | Keselamatan konten | Tugas 26 (heuristik K1–K5) | Tugas 26 |
| T-20 | Hapus data | Tugas 3 (S7) | Tugas 20 |

Rekapitulasi kelulusan seluruh baris dilakukan sekali lagi di Tugas 28 (gerbang rilis).

---

## 7. Swa-Tinjau Rencana Implementasi (penulis rencana, 2026-07-26)

Tinjauan berikut dilakukan atas rencana final sebelum diserahkan ke pekerja implementasi.

1. **Cakupan lengkap.** Kelima belas SK dan kedua puluh T terpetakan ke tugas tanpa baris kosong (tabel §6.1–§6.2). Ke-30 berkas peta §1 masing-masing memiliki tepat satu tugas pembuat (Tugas 1–16; Tugas 0 hanya direktori). Ke-14 baris status/pemulihan §12 spesifikasi tercakup: baris 1/12/13 → Tugas 8; baris 2–5 → Tugas 3 (formal: 20); baris 6/7/9/10/11 → Tugas 9 (formal: 20); baris 8 → Tugas 9 (formal: 20); baris 14 → Tugas 2 (formal: 21). Seluruh cakupan minimum fase QA terpenuhi: integrasi boot/data/urutan (17), audit terlarang (18), matriks `file://`/server (19), run terputus/pemulihan/reset (20), tanpa-JS (21), papan ketik/pembaca layar (22), kontras (23), gerak (24), lima lebar + gulir horizontal (25), keselamatan konten (26), anggaran (27), penerimaan akhir (28).
2. **Konsistensi rujukan silang.** Semua rujukan-maju yang ditulis pada Tugas 0–16 kini menunjuk tugas yang benar-benar ada dan sesuai isinya: Tugas 2 → 18 (pemutihan `xmlns`), 19 & 28 (verifikasi penuh halaman); Tugas 6 → 11–17 (validasi penuh); Tugas 7 → 17 (komponen visual); Tugas 8 → 17/20/21; Tugas 9 → 17/20; Tugas 10 → 20/24; kontrak Tugas 11–16 butir 6 → 26. Pernyataan §0.2 "Tugas 0 → Tugas 28" terpenuhi: rencana memuat tepat 29 tugas bernomor 0–28.
3. **Konsistensi tipe dan kontrak.** Bentuk `Summary` §2.3 dipakai konsisten oleh Tugas 5 (harness), Tugas 9 (`recordResult` memetakan `combined/decision/language/sop/keys/safe/at` — identik dengan bidang `best`/`last` §7.3 spesifikasi), dan Tugas 17 (tampilan debrief). Ambang kunci 90/75/60/40 dan bobot 0.40/0.25/0.35 tertulis identik di §2.3, Tugas 5, dan konten `info.html` (Tugas 2). Text3 selalu `{de,en,id}`; inventaris kamus tertutup 79 kunci (§4) diverifikasi otomatis (I1); kunci `localStorage` hanya dua literal (kontrak §2.1 = audit A5 Tugas 18); enam kategori enum §6.1 = enam chip/seksi katalog (Tugas 2/8); penomoran kasus emas (EMAS-A…D) dan golden checker (GOLD-A…D) merujuk tabel §9.5 yang sama.
4. **Tanpa placeholder.** Tidak ada TBD/TODO/tanda isi-nanti di rencana ini. Setiap tugas memiliki **Berkas** (jalur persis atau "tidak ada" bagi tugas verifikasi), **Kontrak/Langkah** berkotak centang, dan **Verifikasi** dengan perintah konkret siap salin-tempel beserta keluaran diharapkan eksplisit. Semua besaran tertulis final: 79 kunci kamus, 30 berkas runtime, 32 berkas total, batas B1–B5, ambang kontras per pasangan, enam kombinasi gerak G1–G6, 35 kombinasi lebar, 108 butir keselamatan konten.
5. **Fase rencana tidak membuat sumber runtime.** Selama fase perencanaan tidak ada berkas yang dibuat atau diubah selain dokumen rencana ini sendiri. Bukti pada saat rencana diselesaikan (2026-07-26): `cd /root/projects/hotel-scenario-lab && find . -type f | sort` menghasilkan tepat dua jalur — `./docs/superpowers/plans/2026-07-26-hotel-scenario-lab-v1.md` dan `./docs/superpowers/specs/2026-07-26-hotel-scenario-lab-design.md` — identik dengan prasyarat Tugas 0. Rencana ini juga tidak memerintahkan pembuatan repositori git, komit, `.gitignore`, remote/tunnel/hosting, berkas paket, maupun konfigurasi server pada tugas mana pun; satu-satunya server adalah `python3 -m http.server` sesaat untuk T-03 tanpa berkas konfigurasi, dan seluruh artefak QA berada di `/tmp/hsl-qa/` di luar proyek.

---

*Akhir rencana implementasi. Perubahan atas rencana ini wajib menjaga konsistensi dengan spesifikasi (frontmatter `spec`), memperbarui tabel ketertelusuran §6 bila pemetaan tugas berubah, dan tidak boleh melanggar batasan global §0.1.*
