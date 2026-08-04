(function () {
"use strict";
window.HSL = window.HSL || {};
var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
data.scenarios["sc-05-complaint-billing"] = {
id: "sc-05-complaint-billing",
category: "complaint",
difficulty: 2,
minutes: 6,
title: {
de: "Strittige Rechnung an der Rezeption",
en: "Billing Discrepancy at the Desk",
id: "Selisih Tagihan di Meja Depan"
},
summary: {
de: "Ein Gast findet auf seiner Rechnung ein doppelt berechnetes Frühstück und fragliche Minibar-Posten.",
en: "A guest finds a double-charged breakfast and questionable minibar items on his invoice.",
id: "Seorang tamu menemukan sarapan yang tertagih dua kali dan butir minibar yang diragukan pada tagihannya."
},
context: {
place: {
de: "Empfang Ihres Hauses, Vormittag; mehrere Gäste warten auf den Check-out.",
en: "The front desk of your hotel, mid-morning; several guests are waiting to check out.",
id: "Meja resepsionis hotel Anda, menjelang siang; beberapa tamu menunggu untuk check-out."
},
situation: {
de: "Herr Weiland zeigt auf seine Rechnung: Das Frühstück erscheint doppelt (2 × 19,00 €), dazu Minibar-Posten, die er nicht kennt.",
en: "Mr Weiland points at his invoice: breakfast appears twice (2 × 19,00 €), plus minibar items he does not recognise.",
id: "Bapak Weiland menunjuk tagihannya: sarapan tercantum dua kali (2 × 19,00 €), ditambah butir minibar yang tidak beliau kenali."
},
guest: {
de: "Herr Weiland, Ende 30; ihm ist die Situation vor den Wartenden sichtlich unangenehm — und er ist trotzdem verärgert.",
en: "Mr Weiland, late thirties; the situation in front of the queue is visibly awkward for him — and he is annoyed all the same.",
id: "Bapak Weiland, akhir 30-an; situasi di depan antrean jelas membuatnya tidak nyaman — dan beliau tetap kesal."
},
constraints: {
de: "Korrekturen sind nur im Rahmen Ihrer Befugnis möglich; größere Anpassungen gibt die Leitung frei. Die Schlange wächst.",
en: "Corrections are possible only within your authority; larger adjustments need a manager's approval. The queue is growing.",
id: "Koreksi hanya dapat dilakukan dalam batas kewenangan Anda; penyesuaian lebih besar memerlukan persetujuan atasan. Antrean bertambah."
}
},
goals: [
{
de: "Eine Rechnung Position für Position prüfen, ohne jemandem die Schuld zu geben (P4).",
en: "Check an invoice line by line without assigning blame (P4).",
id: "Memeriksa tagihan baris demi baris tanpa menyalahkan siapa pun (P4)."
},
{
de: "Innerhalb der eigenen Befugnis korrigieren — und darüber hinaus sauber eskalieren (P5).",
en: "Correct within your own authority — and escalate cleanly beyond it (P5).",
id: "Mengoreksi dalam batas kewenangan sendiri — dan mengeskalasi dengan rapi bila melampauinya (P5)."
},
{
de: "Jede Korrektur nachvollziehbar dokumentieren (P6).",
en: "Document every correction traceably (P6).",
id: "Mendokumentasikan setiap koreksi secara tertelusur (P6)."
}
],
startNode: "n1",
nodes: {
n1: {
type: "decision",
phase: { de: "Zuhören", en: "Listening", id: "Mendengarkan" },
narration: {
de: "Herr Weiland legt die Rechnung auf den Tresen und tippt auf zwei Zeilen. Er spricht leise, damit die Wartenden nichts mitbekommen — aber sein Ton ist scharf.",
en: "Mr Weiland lays the invoice on the counter and taps two lines. He keeps his voice low so the queue does not overhear — but his tone is sharp.",
id: "Bapak Weiland meletakkan tagihan di meja dan mengetuk dua barisnya. Suaranya pelan agar antrean tidak mendengar — tetapi nadanya tajam."
},
guestLine: {
de: "Zweimal Frühstück am selben Tag? Und diese Minibar-Sachen habe ich nie angerührt. Das möchte ich geklärt haben.",
en: "Breakfast twice on the same day? And I never touched these minibar items. I would like this cleared up.",
id: "Sarapan dua kali di hari yang sama? Dan minibar ini tidak pernah saya sentuh. Saya minta ini dijelaskan."
},
options: [
{
id: "a",
label: {
de: "Ruhig danken, die Rechnung leicht zur Seite drehen und eine gemeinsame Prüfung Position für Position anbieten.",
en: "Thank him calmly, angle the invoice aside slightly, and offer to go through it together line by line.",
id: "Berterima kasih dengan tenang, memiringkan tagihan menjauh dari antrean, dan menawarkan pemeriksaan bersama baris demi baris."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Vorbildlich: Sie nehmen den Einwand ernst, schützen die Diskretion vor der Schlange und kündigen eine überprüfbare Methode an — die gemeinsame Prüfung (P4). Der Ärger verliert sofort an Druck.",
en: "Exemplary: you take the objection seriously, protect his privacy from the queue, and announce a verifiable method — the joint check (P4). The anger loses pressure at once.",
id: "Teladan: Anda menganggap keberatan itu serius, menjaga kerahasiaan dari antrean, dan mengumumkan metode yang dapat diverifikasi — pemeriksaan bersama (P4). Kekesalannya langsung mereda."
},
next: "n2"
},
{
id: "b",
label: {
de: "Sofort das Buchungssystem öffnen und die Posten prüfen, ohne auf seinen Ärger einzugehen.",
en: "Open the billing system at once and check the items, without responding to his frustration.",
id: "Langsung membuka sistem dan memeriksa butir-butirnya tanpa menanggapi kekesalannya."
},
scores: { d: 1, l: 1, s: 2 },
feedback: {
de: "Die Prüfung ist richtig — aber der Mensch kam nicht vor: Ein Satz wie „Gut, dass Sie das ansprechen, das klären wir jetzt“ hätte den Ärger abgeholt, bevor die Zahlen sprechen (P4).",
en: "Checking is right — but the person was skipped: a sentence like “Good that you raised this, we will clear it up now” would have met the frustration before the numbers speak (P4).",
id: "Pemeriksaannya benar — tetapi sisi manusianya terlewat: kalimat seperti “Terima kasih sudah menyampaikan, kita periksa sekarang” akan meredakan kekesalan sebelum angka berbicara (P4)."
},
next: "n2"
},
{
id: "c",
label: {
de: "Feststellen, dass das System Posten nur berechnet, wenn etwas gebucht wurde — Fehler seien sehr selten.",
en: "State that the system only charges items when something was recorded — errors are very rare.",
id: "Menyatakan bahwa sistem hanya menagih bila ada transaksi tercatat — kesalahan sangat jarang terjadi."
},
scores: { d: 0, l: 0, s: 1 },
feedback: {
de: "Damit verteidigen Sie das System vor der Prüfung — und erklären den Gast indirekt zum Irrtum. Ob die Rechnung stimmt, entscheidet die Prüfung, nicht die Statistik (P4).",
en: "This defends the system before you have checked it — and indirectly declares the guest mistaken. Whether the invoice is right is decided by checking, not by statistics (P4).",
id: "Ucapan itu membela sistem sebelum diperiksa — dan secara tidak langsung menyatakan tamu yang keliru. Benar tidaknya tagihan ditentukan oleh pemeriksaan, bukan statistik (P4)."
},
next: "n2"
},
{
id: "d",
label: {
de: "Sich mehrfach entschuldigen und versichern, dass so etwas eigentlich nie vorkommen dürfte.",
en: "Apologise repeatedly and assure him this really should never happen.",
id: "Meminta maaf berulang kali dan menegaskan bahwa hal seperti ini semestinya tidak pernah terjadi."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Freundlich, aber verfrüht: Noch wissen Sie nicht, ob und was falsch ist. Eine pauschale Entschuldigung ersetzt keine Prüfung — sie weckt Erwartungen, die die Zahlen erst bestätigen müssen (P4).",
en: "Friendly but premature: you do not yet know whether and what is wrong. A blanket apology is no substitute for checking — it raises expectations the numbers still have to confirm (P4).",
id: "Ramah tetapi terlalu dini: Anda belum tahu apakah dan apa yang salah. Permintaan maaf menyeluruh tidak menggantikan pemeriksaan — malah menimbulkan ekspektasi yang belum tentu didukung angka (P4)."
},
next: "n2"
}
]
},
n2: {
type: "decision",
phase: { de: "Prüfung", en: "Verification", id: "Verifikasi" },
narration: {
de: "Sie öffnen die Rechnungsansicht. Tatsächlich: Das Frühstück vom Dienstag wurde zweimal gebucht — 2 × 19,00 €. Bei der Minibar steht ein Eintrag vom Anreisetag, den das Zimmermädchenprotokoll nicht eindeutig stützt.",
en: "You open the invoice view. Indeed: Tuesday's breakfast was posted twice — 2 × 19,00 €. Among the minibar items there is an entry from the arrival day that the housekeeping record does not clearly support.",
id: "Anda membuka rincian tagihan. Benar saja: sarapan hari Selasa terinput dua kali — 2 × 19,00 €. Pada minibar ada satu entri di hari kedatangan yang tidak didukung jelas oleh catatan housekeeping."
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Den Bildschirm mitlesen lassen und jede Zeile gemeinsam durchgehen: Datum, Posten, Betrag — neutral benennen.",
en: "Let him read along on the screen and go through each line together: date, item, amount — named neutrally.",
id: "Mengajak beliau membaca layar dan menelusuri setiap baris bersama: tanggal, butir, jumlah — disebutkan secara netral."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Genau richtig: Die gemeinsame, neutrale Prüfung macht aus „Ihr Wort gegen meins“ einen Blick auf dieselben Fakten. Der Doppelposten zeigt sich von selbst — ohne Schuldfrage (P4).",
en: "Exactly right: the joint, neutral check turns “your word against mine” into a shared look at the same facts. The duplicate shows itself — with no blame question at all (P4).",
id: "Tepat sekali: pemeriksaan bersama yang netral mengubah “kata Anda melawan kata saya” menjadi menatap fakta yang sama. Butir ganda itu terlihat sendiri — tanpa mencari siapa yang salah (P4)."
},
next: "n3"
},
{
id: "b",
label: {
de: "Stumm für sich prüfen und Herrn Weiland erst das Endergebnis mitteilen.",
en: "Check silently by yourself and tell Mr Weiland only the final result.",
id: "Memeriksa sendiri dalam diam dan hanya menyampaikan hasil akhirnya kepada Bapak Weiland."
},
scores: { d: 1, l: 1, s: 2 },
feedback: {
de: "Die Prüfung ist gründlich, aber unsichtbar: Herr Weiland steht schweigend daneben und fühlt sich ausgeschlossen. Lassen Sie den Gast mitlesen — bei Geldfragen ist Transparenz die halbe Deeskalation (P4).",
en: "The check is thorough but invisible: Mr Weiland stands beside you in silence, feeling shut out. Let the guest read along — with money questions, transparency is half the de-escalation (P4).",
id: "Pemeriksaannya teliti tetapi tak terlihat: Bapak Weiland berdiri diam dan merasa dikucilkan. Ajak tamu ikut membaca — dalam urusan uang, transparansi adalah separuh peredam ketegangan (P4)."
},
next: "n3"
},
{
id: "c",
label: {
de: "Anmerken, dass zweimal Frühstück eben vorkommt, wenn man zweimal durch den Frühstücksraum geht.",
en: "Remark that breakfast gets charged twice when someone goes through the breakfast room twice.",
id: "Berkomentar bahwa sarapan tertagih dua kali kalau orang memang dua kali masuk ruang sarapan."
},
scores: { d: 0, l: 0, s: 1 },
feedback: {
de: "Das ist eine Anschuldigung im Nebensatz — und sie trifft einen Gast, dem die Lage ohnehin peinlich ist. Selbst wenn es so wäre: erst prüfen, dann reden. Jetzt ist Wiedergutmachung nötig (P4).",
en: "That is an accusation in a subordinate clause — aimed at a guest who already finds this embarrassing. Even if it were true: check first, talk after. Now repair work is needed (P4).",
id: "Itu tuduhan yang diselipkan dalam kalimat — dan mengenai tamu yang sudah merasa malu. Kalaupun benar: periksa dahulu, bicara kemudian. Kini Anda harus memulihkan suasana (P4)."
},
next: "n2b"
},
{
id: "d",
label: {
de: "Ihm sofort glauben und zusagen, dass alle strittigen Posten natürlich gestrichen werden.",
en: "Believe him immediately and promise that all disputed items will of course be removed.",
id: "Langsung memercayai beliau dan menjanjikan bahwa semua butir yang disengketakan tentu akan dihapus."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Großzügig, aber ungedeckt: Ohne Prüfung wissen Sie weder, was zu streichen ist, noch ob Ihre Befugnis reicht. Erst die Fakten, dann die Zusage — sonst korrigieren Sie zweimal (P5).",
en: "Generous in tone but uncovered: without checking you know neither what to remove nor whether your authority stretches that far. Facts first, then the commitment — or you will correct twice (P5).",
id: "Murah hati, tetapi tanpa dasar: sebelum diperiksa, Anda tidak tahu apa yang harus dihapus maupun apakah kewenangan Anda cukup. Fakta dahulu, baru janji — kalau tidak, Anda mengoreksi dua kali (P5)."
},
next: "n3"
}
]
},
n2b: {
type: "decision",
phase: { de: "Prüfung", en: "Verification", id: "Verifikasi" },
narration: {
de: "Herr Weiland richtet sich auf; seine Stimme ist nicht mehr leise: „Wollen Sie damit sagen, ich schwindle?“ Zwei Wartende schauen herüber. Der Moment verlangt eine Korrektur — Ihre eigene.",
en: "Mr Weiland straightens up; his voice is no longer quiet: “Are you suggesting I am lying?” Two people in the queue look over. The moment calls for a correction — your own.",
id: "Bapak Weiland menegakkan badan; suaranya tidak lagi pelan: “Maksud Anda saya berbohong?” Dua orang di antrean menoleh. Momen ini menuntut sebuah koreksi — koreksi dari Anda."
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Sich klar entschuldigen, den Satz zurücknehmen und die ruhige gemeinsame Prüfung Zeile für Zeile beginnen.",
en: "Apologise clearly, withdraw the remark, and begin the calm joint check line by line.",
id: "Meminta maaf dengan jelas, menarik ucapan tadi, dan memulai pemeriksaan bersama yang tenang baris demi baris."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Stark: Ein Fehler, klar benannt und korrigiert, macht Sie glaubwürdiger — nicht schwächer. Mit der gemeinsamen Prüfung holen Sie das Gespräch zurück auf die Sachebene (P4).",
en: "Strong: a mistake clearly named and corrected makes you more credible — not weaker. The joint check brings the conversation back to the facts (P4).",
id: "Kuat: kekeliruan yang diakui dan dikoreksi dengan jelas membuat Anda lebih kredibel — bukan lebih lemah. Pemeriksaan bersama mengembalikan percakapan ke ranah fakta (P4)."
},
next: "n3"
},
{
id: "b",
label: {
de: "Ohne auf den Vorwurf einzugehen betont sachlich mit der Prüfung der Posten beginnen.",
en: "Start checking the items in a pointedly matter-of-fact way, without addressing the accusation.",
id: "Langsung memeriksa butir-butir dengan nada datar tanpa menanggapi tudingan tadi."
},
scores: { d: 1, l: 1, s: 1 },
feedback: {
de: "Die Flucht in die Sachlichkeit lässt Ihren Satz im Raum stehen — Herr Weiland vergisst ihn nicht, auch wenn die Zahlen stimmen. Eine kurze, echte Entschuldigung hätte den Knoten gelöst (P4).",
en: "Retreating into facts leaves your remark hanging in the air — Mr Weiland will not forget it even if the numbers work out. A short, genuine apology would have untied the knot (P4).",
id: "Berlindung di balik fakta membiarkan ucapan Anda menggantung — Bapak Weiland tidak akan melupakannya walau angkanya benar. Permintaan maaf singkat yang tulus akan mengurai simpul itu (P4)."
},
next: "n3"
},
{
id: "c",
label: {
de: "Erklären, das sei nur ein Hinweis auf häufige Ursachen gewesen — er solle es nicht persönlich nehmen.",
en: "Explain it was merely a note about common causes — he should not take it personally.",
id: "Menjelaskan bahwa itu sekadar info tentang penyebab umum — beliau tidak perlu tersinggung."
},
scores: { d: 0, l: 1, s: 1 },
feedback: {
de: "„Nicht persönlich nehmen“ schiebt die Verantwortung für Ihren Satz dem Gast zu. Die Wirkung zählt, nicht die Absicht: zurücknehmen, entschuldigen, prüfen — in dieser Reihenfolge (P4).",
en: "“Do not take it personally” shifts the responsibility for your remark onto the guest. Impact counts, not intent: withdraw, apologise, check — in that order (P4).",
id: "“Jangan tersinggung” memindahkan tanggung jawab atas ucapan Anda kepada tamu. Yang dihitung adalah dampak, bukan niat: tarik ucapan, minta maaf, periksa — dalam urutan itu (P4)."
},
next: "n3"
}
]
},
n3: {
type: "decision",
phase: { de: "Korrektur & Befugnis", en: "Correction & authority", id: "Koreksi & batas kewenangan" },
narration: {
de: "Das Ergebnis: Der doppelte Frühstücksposten ist eindeutig ein Fehler — die Korrektur liegt in Ihrer Befugnis. Der Minibar-Eintrag bleibt unklar; das Protokoll gibt keine sichere Antwort. Herr Weiland wartet auf Ihren Vorschlag.",
en: "The result of the check: the duplicate breakfast line is clearly an error — correcting it is within your authority. The minibar entry remains unclear; the record gives no certain answer. Mr Weiland waits for your proposal.",
id: "Hasil pemeriksaan: butir sarapan ganda jelas sebuah kesalahan — koreksinya dalam kewenangan Anda. Entri minibar masih belum jelas; catatan tidak memberi jawaban pasti. Bapak Weiland menunggu usulan Anda."
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Das doppelte Frühstück sofort korrigieren, für die Minibar eine kurze Klärung mit Housekeeping anbieten und alles notieren.",
en: "Correct the duplicate breakfast at once, offer a quick clarification with housekeeping for the minibar, and note everything down.",
id: "Segera mengoreksi sarapan ganda, menawarkan klarifikasi singkat dengan housekeeping untuk minibar, dan mencatat semuanya."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Vorbildlich: Das Eindeutige wird sofort in Ihrer Befugnis korrigiert, das Unklare geklärt statt geraten — und beides dokumentiert (P5, P6). So bleibt die Rechnung belastbar und der Gast ernst genommen.",
en: "Exemplary: what is clear gets corrected at once within your authority, what is unclear gets clarified instead of guessed — and both are documented (P5, P6). The invoice stays sound and the guest feels taken seriously.",
id: "Teladan: yang pasti langsung dikoreksi dalam kewenangan Anda, yang belum jelas diklarifikasi alih-alih ditebak — dan keduanya didokumentasikan (P5, P6). Tagihan tetap sahih dan tamu merasa dihargai."
},
next: "n4"
},
{
id: "b",
label: {
de: "Für die unklare Minibar-Frage die Leitung hinzuziehen und Herrn Weiland den Weg transparent erklären.",
en: "Bring in the manager for the unclear minibar question and explain the process transparently to Mr Weiland.",
id: "Melibatkan atasan untuk butir minibar yang belum jelas dan menjelaskan prosesnya secara transparan kepada Bapak Weiland."
},
scores: { d: 1, l: 2, s: 2 },
flags: { escalate: true },
feedback: {
de: "Sauber eskaliert und gut erklärt (P5) — nur das Eindeutige bleibt liegen: Das doppelte Frühstück dürfen Sie sofort selbst korrigieren. Erst erledigen, was in Ihrer Befugnis liegt, dann nur den Rest eskalieren.",
en: "Cleanly escalated and well explained (P5) — but the clear part is left waiting: the duplicate breakfast you may correct yourself right away. First settle what lies within your authority, and escalate only the rest.",
id: "Eskalasi rapi dan dijelaskan baik (P5) — tetapi yang sudah pasti dibiarkan menunggu: sarapan ganda boleh Anda koreksi sendiri sekarang. Selesaikan dahulu yang dalam kewenangan Anda, lalu eskalasikan sisanya saja."
},
next: "n4"
},
{
id: "c",
label: {
de: "Alle strittigen Posten großzügig streichen, damit die Schlange nicht noch länger wartet.",
en: "Generously remove all disputed items so the queue does not wait any longer.",
id: "Menghapus semua butir yang disengketakan sekaligus agar antrean tidak menunggu lebih lama."
},
scores: { d: 1, l: 1, s: 0 },
feedback: {
de: "Schnell, aber außerhalb der Ordnung: Pauschale Streichungen übersteigen Ihre Befugnis und machen die Rechnung unauditierbar. Tempo gewinnen Sie mit klarer Methode, nicht mit der Gießkanne (P5, P6).",
en: "Fast, but outside the rules: blanket removals exceed your authority and make the invoice unauditable. You gain speed through clear method, not through the watering can (P5, P6).",
id: "Cepat, tetapi di luar aturan: penghapusan borongan melampaui kewenangan Anda dan membuat tagihan tak dapat diaudit. Kecepatan diraih lewat metode yang jelas, bukan pukul rata (P5, P6)."
},
next: "n4"
},
{
id: "d",
label: {
de: "Erklären, dass gebuchte Posten grundsätzlich bestehen bleiben, und auf die Zahlung bestehen.",
en: "Explain that posted items fundamentally stand, and insist on payment.",
id: "Menjelaskan bahwa butir yang sudah terinput pada dasarnya tetap berlaku, dan meminta pembayaran penuh."
},
scores: { d: 0, l: 0, s: 1 },
feedback: {
de: "Sie bestehen auf einem Posten, den Ihre eigene Prüfung als Fehler entlarvt hat — das ist nicht Konsequenz, sondern Starrsinn. Eindeutige Fehler werden korrigiert; dafür gibt es Ihre Befugnis (P5).",
en: "You are insisting on a line your own check exposed as an error — that is not consistency, it is rigidity. Clear errors get corrected; that is exactly what your authority is for (P5).",
id: "Anda memaksakan butir yang oleh pemeriksaan Anda sendiri terbukti keliru — itu bukan konsistensi, melainkan kekakuan. Kesalahan nyata harus dikoreksi; justru untuk itulah kewenangan Anda ada (P5)."
},
next: "n4"
}
]
},
n4: {
type: "decision",
phase: { de: "Abschluss", en: "Closing", id: "Penutup" },
narration: {
de: "Die korrigierte Rechnung liegt bereit: Das doppelte Frühstück ist gestrichen, der Minibar-Posten geklärt. Herr Weiland wirkt versöhnt — die Wartenden hinter ihm allerdings zunehmend ungeduldig.",
en: "The corrected invoice is ready: the duplicate breakfast removed, the minibar item resolved. Mr Weiland seems reconciled — while those waiting behind him grow impatient.",
id: "Tagihan yang sudah dikoreksi siap: sarapan ganda dihapus, butir minibar terselesaikan. Bapak Weiland tampak reda — sementara para tamu di belakangnya makin tidak sabar."
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Die korrigierte Rechnung kurz erklären, für die Geduld danken und den Vorgang für die Übergabe dokumentieren.",
en: "Briefly explain the corrected invoice, thank him for his patience, and document the case for the handover.",
id: "Menjelaskan singkat tagihan yang dikoreksi, berterima kasih atas kesabarannya, dan mendokumentasikan kasus untuk serah terima."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Der runde Abschluss: Der Gast versteht jede Änderung, fühlt sich gewürdigt — und die Korrektur ist für Buchhaltung und nächste Schicht nachvollziehbar (P6). Aus einem Streitfall wurde ein Beleg für Sorgfalt.",
en: "The complete close: the guest understands every change, feels valued — and the correction is traceable for accounting and the next shift (P6). A dispute became evidence of diligence.",
id: "Penutup yang bulat: tamu memahami setiap perubahan, merasa dihargai — dan koreksinya tertelusur bagi pembukuan serta sif berikutnya (P6). Sengketa berubah menjadi bukti ketelitian."
},
next: "x1"
},
{
id: "b",
label: {
de: "Die neue Rechnung freundlich übergeben und wegen der Schlange auf Erklärungen verzichten.",
en: "Hand over the new invoice warmly and skip the explanations because of the queue.",
id: "Menyerahkan tagihan baru dengan ramah dan melewatkan penjelasan karena antrean."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Freundlich, aber halb: Ohne kurze Erklärung weiß Herr Weiland nicht, was korrigiert wurde — und ohne Notiz weiß es später niemand. Zwei Sätze und eine Zeile im Protokoll hätten gereicht (P6).",
en: "Friendly but halfway: without a brief explanation Mr Weiland does not know what exactly was corrected — and without a note, later nobody will. Two sentences and one line in the log would have sufficed (P6).",
id: "Ramah tetapi setengah jalan: tanpa penjelasan singkat, Bapak Weiland tidak tahu apa yang dikoreksi — dan tanpa catatan, nanti tak seorang pun tahu. Dua kalimat dan satu baris di log sebenarnya cukup (P6)."
},
next: "x2"
},
{
id: "c",
label: {
de: "Die Rechnung wortlos ausdrucken und mit Blick auf die Wartenden schon den nächsten Gast heranwinken.",
en: "Print the invoice without a word and, eyeing the queue, already wave the next guest forward.",
id: "Mencetak tagihan tanpa berkata apa-apa dan, sambil menatap antrean, langsung memanggil tamu berikutnya."
},
scores: { d: 0, l: 0, s: 1 },
feedback: {
de: "Nach einem heiklen Geldgespräch ist ein wortloser Ausdruck ein kalter Abgang: Die Korrektur bleibt unerklärt, der Dank fehlt, und Herr Weiland geht mit dem Streit statt mit der Lösung im Kopf (P4).",
en: "After a delicate money conversation, a wordless printout is a cold exit: the correction goes unexplained, the thanks is missing, and Mr Weiland leaves with the dispute in his head instead of the solution (P4).",
id: "Setelah percakapan uang yang sensitif, cetakan tanpa kata adalah akhir yang dingin: koreksi tak dijelaskan, terima kasih tak terucap, dan Bapak Weiland pulang membawa ingatan sengketanya, bukan solusinya (P4)."
},
next: "x3"
}
]
},
x1: {
type: "outcome",
tone: "good",
ending: {
de: "Herr Weiland faltet die korrigierte Rechnung zusammen und bedankt sich — hörbar auch für die Art, wie Sie geprüft haben: gemeinsam, neutral, ohne Schuldzuweisung. Die Buchhaltung findet später eine saubere Notiz. Geldfragen sind Vertrauensfragen: Heute haben Sie beide gewonnen.",
en: "Mr Weiland folds up the corrected invoice and thanks you — audibly also for the way you checked: together, neutrally, without blame. Accounting later finds a clean note. Money questions are trust questions: today you won both.",
id: "Bapak Weiland melipat tagihan yang telah dikoreksi dan berterima kasih — juga atas cara Anda memeriksa: bersama, netral, tanpa menyalahkan. Pembukuan kelak menemukan catatan yang rapi. Urusan uang adalah urusan kepercayaan: hari ini Anda memenangkan keduanya."
}
},
x2: {
type: "outcome",
tone: "mixed",
ending: {
de: "Die Rechnung stimmt jetzt, und Herr Weiland reist versöhnt ab. Doch der Weg dorthin hatte Reibung: eine übersprungene Erklärung, eine verfrühte Zusage oder eine fehlende Notiz. Beim nächsten Mal: erst gemeinsam prüfen, dann in der Befugnis korrigieren, dann dokumentieren — die Reihenfolge trägt.",
en: "The invoice is right now, and Mr Weiland leaves reconciled. But the way there had friction: a skipped explanation, a premature promise or a missing note. Next time: check together first, then correct within authority, then document — the order carries you.",
id: "Tagihan kini benar, dan Bapak Weiland pergi dengan hati reda. Namun jalannya sempat bergesekan: penjelasan terlewat, janji terlalu dini, atau catatan yang tak ditulis. Lain kali: periksa bersama dahulu, koreksi dalam kewenangan, lalu dokumentasikan — urutan itulah yang menopang Anda."
}
},
x3: {
type: "outcome",
tone: "poor",
ending: {
de: "Herr Weiland zahlt und geht — aber die Zweifel reisen mit: an der Rechnung, am Ton, an Ihrem Haus. Eine strittige Rechnung ist immer beides, Rechenaufgabe und Beziehungsaufgabe. Wer nur rechnet oder nur beschwichtigt, verliert; wer neutral prüft und sauber korrigiert, gewinnt (P4, P5, P6).",
en: "Mr Weiland pays and leaves — but the doubts travel with him: about the invoice, the tone, your hotel. A disputed invoice is always both an arithmetic task and a relationship task. Whoever only calculates or only placates loses; whoever checks neutrally and corrects cleanly wins (P4, P5, P6).",
id: "Bapak Weiland membayar lalu pergi — tetapi keraguannya ikut serta: terhadap tagihan, nada bicara, dan hotel Anda. Tagihan yang disengketakan selalu dua hal sekaligus: soal hitungan dan soal hubungan. Yang hanya menghitung atau hanya menenangkan akan kalah; yang memeriksa netral dan mengoreksi rapi akan menang (P4, P5, P6)."
}
}
},
debrief: {
tips: {
decision: {
de: "Trennen Sie Eindeutiges von Unklarem: Eindeutige Fehler sofort in Ihrer Befugnis korrigieren, Unklares klären oder eskalieren — und nie raten, nur um schneller fertig zu sein.",
en: "Separate the clear from the unclear: correct clear errors at once within your authority, clarify or escalate the unclear — and never guess just to finish faster.",
id: "Pisahkan yang pasti dari yang belum jelas: kesalahan pasti langsung dikoreksi dalam kewenangan Anda, yang belum jelas diklarifikasi atau dieskalasi — dan jangan menebak hanya agar cepat selesai."
},
language: {
de: "Benennen Sie Posten neutral („Hier steht das Frühstück zweimal“) statt wertend („Da haben Sie wohl zweimal gefrühstückt“) — Grammatik ohne Schuldzuweisung deeskaliert von allein.",
en: "Name items neutrally (“breakfast appears here twice”) rather than judgementally (“you seem to have had breakfast twice”) — grammar without blame de-escalates on its own.",
id: "Sebutkan butir secara netral (“di sini sarapan tercantum dua kali”), bukan menghakimi (“Anda tampaknya sarapan dua kali”) — kalimat tanpa tudingan meredakan ketegangan dengan sendirinya."
},
sop: {
de: "Jede Rechnungskorrektur braucht eine Notiz: Was, warum, durch wen. Ohne Dokumentation ist die beste Korrektur später nicht mehr erklärbar (P6).",
en: "Every invoice correction needs a note: what, why, by whom. Without documentation, even the best correction cannot be explained later (P6).",
id: "Setiap koreksi tagihan memerlukan catatan: apa, mengapa, oleh siapa. Tanpa dokumentasi, koreksi terbaik pun tak dapat dijelaskan di kemudian hari (P6)."
}
},
safetyTip: {
de: "Streichen Sie nie pauschal Posten außerhalb Ihrer Befugnis, um Druck oder eine Schlange loszuwerden: Was über Ihre Grenze hinausgeht, gehört zur Leitung (P5).",
en: "Never remove items wholesale beyond your authority to get rid of pressure or a queue: what exceeds your limit belongs to the manager (P5).",
id: "Jangan pernah menghapus butir secara borongan di luar kewenangan hanya untuk melepaskan diri dari tekanan atau antrean: yang melampaui batas Anda adalah urusan atasan (P5)."
},
praise: {
de: "Sehr gut: gemeinsam geprüft, in der Befugnis korrigiert, sauber dokumentiert — und der Ton blieb durchgehend respektvoll. Üben Sie den Durchlauf auch auf Englisch: Rechnungsvokabular lohnt sich doppelt.",
en: "Very good: checked together, corrected within authority, documented cleanly — and the tone stayed respectful throughout. Practise the run in German too: billing vocabulary pays off twice.",
id: "Sangat baik: diperiksa bersama, dikoreksi dalam kewenangan, didokumentasikan rapi — dan nada tetap hormat sepanjang jalan. Latih juga dalam bahasa Jerman: kosakata tagihan berguna ganda."
}
},
sopRefs: ["P4", "P5", "P6"]
};
})();
