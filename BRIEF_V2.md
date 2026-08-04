# Hotel Scenario Lab — Brief Pengembangan v2

Proyek: `/root/projects/hotel-scenario-lab` (git, branch `main`, baseline `9c3ebd0`)
Buat rencana implementasi v2. Jangan implementasi — hanya SPEC + PLAN.

## Konteks
Simulator pelatihan Front Office hotel untuk Abel (Azubi Hotelfachmann di TRIHOTEL Rostock).
Arsitektur **wajib local-first**: vanilla JS, tanpa framework, tanpa package, tanpa fetch/network,
hanya `localStorage`. Works via `file://`. Trilingual DE/EN/ID.

## Struktur
- `index.html` — katalog 12 skenario + progress + language switcher
- `scenario.html?id=xxx` — player skenario
- `info.html` — info aplikasi
- `js/engine.js` — mesin murni (createRun, currentNodeId, applyChoice, summarize); tanpa DOM/Date/storage
- `js/store.js` — localStorage, schema v1, migration array, recordResult (attempts/completed/best/last), resetAll
- `js/i18n.js` — kamus trilingual, applyI18n, langSwitcher
- `js/ui.js` — helper DOM
- `js/app-index.js` — boot katalog, renderProgressSummary, renderCatalog, statusOf
- `js/app-scenario.js` — boot player
- `data/registry.js` — `HSL.data.order` (12 slug)
- `data/scenarios/sc-XX-*.js` — tiap skenario: id, category, difficulty (1-3), minutes, title{de,en,id}, summary, context{place,situation,guest,constraints}, goals[], startNode, nodes{...}, debrief{tips,safetyTip,praise}
- Node: `decision` (phase, narration, guestLine, options[{id,label{de,en,id},scores{d,l,s} 0-2,feedback,next,flags{unsafe?}}]) | `outcome` (tone, ending)
- `tools/check.html` + `tools/check.js` — validator: 54/54 PASS (DICT parity, REG order, SC-FIELDS/TEXT3/GRAF/RUBRIK per scenario, GOLD-A..D engine)
- `i18n/de.js`, `i18n/en.js`, `i18n/id.js` — kamus UI

## Fitur v2 yang diminta (semua)
1. **Skenario baru (kategori kosong):** minimal 3 skenario baru pada kategori yang belum ada — rekomendasi: F&B/restaurant (mis. alergi, no-show, wine spill), housekeeping (DND, lost property), overbooking/walk, group arrival, pet policy, payment (card decline). Pilih yang paling relevan pelatihan hotel. Tiap skenario wajib lulus seluruh validasi (fields/text3 3 bahasa/DAG 3-5 steps/rubrik) + byte budget ≤30KiB.
2. **Training des Tages:** pilih 1 skenario sorotan per tanggal secara deterministik (hash tanggal), tampilkan di katalog/index.
3. **Weak-axis drill:** dari progress best, deteksi sumbu terendah (decision/language/sop) → tawarkan latihan fokus / tandai skenario dengan skor rendah pada sumbu itu.
4. **Filter & sort katalog:** filter per kategori + status (baru/selesai/mastered) + difficulty; sort (default, best score, difficulty).
5. **Retry wrong choices:** setelah debrief, tombol "coba lagi dari langkah lemah/unsafe" (engine immutable — cukup truncate steps).

## Batasan
- Jangan tambah dependensi, package, fetch, tracker, atau service.
- Schema store tetap v1 (migrasi array jika perlu, jangan pecah progress lama).
- Validator wajib tetap 54/54 + check baru untuk fitur baru (mis. TOTD deterministik, weak-axis logic) → total naik.
- Pertahankan no-JS fallback, keyboard structure, reduced-motion, responsive.
- File baru skenario ≤30KiB; semua teks trilingual.
- Tulis spec di `docs/superpowers/specs/2026-08-04-hotel-scenario-lab-v2.md` dan plan di `docs/superpowers/plans/2026-08-04-hotel-scenario-lab-v2.md`.

## Output yang diharapkan
- Spec lengkap (fitur, data model, UX flow, kandidat skenario + outline 3-5 node tiap skenario, check list validasi baru)
- Plan terurut (task kecil, tiap task: file yang disentuh, kriteria selesai, urutan aman — data dulu, engine, UI, validator)
