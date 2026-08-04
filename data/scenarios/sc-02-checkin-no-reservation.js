(function () {
"use strict";
window.HSL = window.HSL || {};
var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
data.scenarios["sc-02-checkin-no-reservation"] = {
id: "sc-02-checkin-no-reservation",
category: "checkin",
difficulty: 2,
minutes: 7,
title: {
de: "Keine Reservierung im System",
en: "Late-Night Missing Reservation",
id: "Reservasi Tidak Ditemukan Larut Malam"
},
summary: {
de: "Kurz vor Mitternacht steht eine erschöpfte Reisende ohne auffindbare Buchung am Empfang.",
en: "Just before midnight an exhausted traveller stands at the desk with no booking to be found.",
id: "Menjelang tengah malam, tamu yang kelelahan berdiri di resepsionis tanpa reservasi yang dapat ditemukan."
},
context: {
place: {
de: "Empfang Ihres Hauses, 23:40, die Lobby ist still.",
en: "The front desk of your hotel, 23:40, the lobby is quiet.",
id: "Meja resepsionis hotel Anda, pukul 23:40, lobi sudah sepi."
},
situation: {
de: "Ms Tan zeigt auf ihrem Telefon eine Buchungsbestätigung für heute Nacht. Im System finden Sie unter ihrem Namen nichts.",
en: "Ms Tan shows a booking confirmation for tonight on her phone. Under her name, your system shows nothing.",
id: "Ms Tan menunjukkan surel konfirmasi pemesanan untuk malam ini di ponselnya. Di sistem, nama beliau tidak ditemukan."
},
guest: {
de: "Ms Tan, Anfang 30, nach einem langen Reisetag sichtlich erschöpft; höflich, aber angespannt.",
en: "Ms Tan, early thirties, visibly exhausted after a long day of travel; polite but tense.",
id: "Ms Tan, awal 30-an, tampak sangat lelah setelah perjalanan panjang; sopan tetapi tegang."
},
constraints: {
de: "Sie sind allein in der Nachtschicht; die Nachtdienstleitung ist nur telefonisch erreichbar. Zwei Zimmer sind noch nicht zugeteilt.",
en: "You are alone on the night shift; the duty manager can only be reached by phone. Two rooms are still unallocated.",
id: "Anda sendirian pada sif malam; penanggung jawab malam hanya dapat dihubungi lewat telepon. Dua kamar belum teralokasi."
}
},
goals: [
{
de: "Eine erschöpfte Reisende beruhigen, bevor Sie das Problem lösen (P1, P4).",
en: "Calm an exhausted traveller before solving the problem (P1, P4).",
id: "Menenangkan tamu yang kelelahan sebelum menyelesaikan masalah (P1, P4)."
},
{
de: "Systematisch suchen: Schreibweisen, Datum, Buchungskanal.",
en: "Search systematically: spellings, dates, booking channel.",
id: "Mencari secara sistematis: ejaan nama, tanggal, kanal pemesanan."
},
{
de: "Die eigene Grenze kennen und die Nachtdienstleitung richtig einbinden (P5).",
en: "Know your limits and involve the duty manager properly (P5).",
id: "Mengenali batas kewenangan dan melibatkan penanggung jawab malam dengan tepat (P5)."
}
],
startNode: "n1",
nodes: {
n1: {
type: "decision",
phase: { de: "Beruhigen", en: "Calming", id: "Menenangkan" },
narration: {
de: "23:40. Ms Tan stellt den Koffer ab und legt ihr Telefon mit der Bestätigung auf den Tresen; ihre Hände zittern nach dem langen Reisetag. Ihr erster Satz entscheidet, ob die Lage ruhig bleibt.",
en: "23:40. Ms Tan sets down her suitcase and places her phone with the confirmation on the counter; her hands tremble after the long day of travel. Your first sentence decides whether things stay calm.",
id: "Pukul 23:40. Ms Tan meletakkan koper dan menaruh ponsel berisi konfirmasi di meja; tangannya gemetar setelah perjalanan panjang. Kalimat pertama Anda menentukan apakah situasi tetap tenang."
},
guestLine: {
de: "Bitte sagen Sie mir, dass Sie mein Zimmer haben. Hier steht doch: heute, eine Nacht.",
en: "Please tell me you have my room. It says right here: tonight, one night.",
id: "Tolong katakan kamar saya ada. Di sini tertulis: malam ini, satu malam."
},
options: [
{
id: "a",
label: {
de: "Ruhig begrüßen, die Lage anerkennen und zusichern, dass Sie das jetzt gemeinsam klären.",
en: "Greet her calmly, acknowledge the situation, and assure her you will sort this out together now.",
id: "Menyambut dengan tenang, mengakui situasinya, dan meyakinkan bahwa Anda akan menyelesaikannya bersama sekarang."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Genau richtig: erst der Mensch, dann das System (P1, P4). Ihre Zusicherung nimmt Druck heraus, ohne Unbekanntes zu versprechen.",
en: "Exactly right: the person first, then the system (P1, P4). Your assurance eases the pressure without promising what you do not yet know.",
id: "Tepat sekali: manusia dahulu, baru sistem (P1, P4). Jaminan Anda meredakan tekanan tanpa menjanjikan hal yang belum pasti."
},
next: "n2"
},
{
id: "b",
label: {
de: "Sofort und wortlos zu tippen beginnen, um die Buchung noch einmal zu suchen.",
en: "Start typing straight away without a word, to search for the booking again.",
id: "Langsung mengetik tanpa berkata apa pun untuk mencari kembali pemesanannya."
},
scores: { d: 1, l: 1, s: 2 },
feedback: {
de: "Die Suche ist der richtige nächste Schritt — aber wortlos wirkt sie wie eine geschlossene Tür. Ein zugewandter Satz vorab hätte Ms Tan spürbar entlastet (P1).",
en: "Searching is the right next step — but in silence it feels like a closed door. One reassuring sentence first would have eased Ms Tan (P1).",
id: "Pencarian memang langkah yang tepat — tetapi tanpa sepatah kata terasa seperti pintu tertutup. Satu kalimat perhatian di awal akan melegakan Ms Tan (P1)."
},
next: "n2"
},
{
id: "c",
label: {
de: "Feststellen: „Wenn nichts im System steht, haben Sie hier auch keine Buchung.“",
en: "State: “If it is not in the system, you have no booking here.”",
id: "Menyatakan: “Kalau tidak ada di sistem, berarti Anda tidak punya pemesanan di sini.”"
},
scores: { d: 0, l: 0, s: 1 },
feedback: {
de: "Damit wird das Systemergebnis zur Schuld des Gastes — vor jeder Prüfung. Das eskaliert und übersieht häufige Ursachen wie Schreibweisen oder Kanalfehler (P4).",
en: "This makes the system result the guest's fault — before any checking. It escalates and ignores common causes such as spellings or channel errors (P4).",
id: "Ucapan ini menjadikan hasil sistem sebagai kesalahan tamu — sebelum diperiksa. Situasi memanas, padahal penyebab umum seperti ejaan atau galat kanal belum dicek (P4)."
},
next: "n2"
},
{
id: "d",
label: {
de: "Mitfühlend versichern, dass bestimmt alles gut wird, und über die anstrengende Reise plaudern.",
en: "Sympathetically assure her everything will surely be fine, and chat about her tiring journey.",
id: "Menghibur bahwa semuanya pasti beres, lalu berbincang tentang perjalanannya yang melelahkan."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Warm im Ton, aber ohne Substanz: „Bestimmt alles gut“ wissen Sie noch nicht, und um 23:40 zählt jede Minute Richtung Bett. Empathie plus sofortige, sichtbare Klärung wäre stärker (P4).",
en: "Warm but without substance: you cannot yet know “everything will be fine”, and at 23:40 every minute towards a bed counts. Empathy plus immediate, visible action would be stronger (P4).",
id: "Hangat tetapi tanpa isi: Anda belum bisa memastikan “semuanya pasti beres”, dan pukul 23:40 setiap menit berharga. Empati plus penanganan yang segera terlihat akan lebih kuat (P4)."
},
next: "n2"
}
]
},
n2: {
type: "decision",
phase: { de: "Suche", en: "Search", id: "Pencarian" },
narration: {
de: "Ms Tan atmet durch und wartet. Auf ihrem Telefon sehen Sie die Bestätigung eines Buchungsportals: heutiges Datum, eine Nacht, ein Haus in Rostock. Jetzt zählt, wie gründlich Sie suchen.",
en: "Ms Tan takes a breath and waits. On her phone you see a booking-portal confirmation: today's date, one night, a hotel in Rostock. What matters now is how thoroughly you search.",
id: "Ms Tan menarik napas dan menunggu. Di ponselnya tampak konfirmasi portal pemesanan: tanggal hari ini, satu malam, hotel di Rostock. Kini semuanya bergantung pada ketelitian pencarian Anda."
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Systematisch prüfen: Schreibvarianten, Buchungsnummer, Datum und Kanal — und erklären, was Sie tun.",
en: "Check systematically: name spellings, booking number, dates and booking channel — explaining what you are doing.",
id: "Memeriksa sistematis: variasi ejaan, nomor pemesanan, tanggal, dan kanal — sambil menjelaskan yang Anda lakukan."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Vorbildlich: Die häufigsten Ursachen — Schreibweise, Datum, Kanalübertragung — werden der Reihe nach ausgeschlossen, und Ms Tan hört, dass etwas geschieht. So sucht ein Profi (P4).",
en: "Exemplary: the most common causes — spelling, date, channel transfer — are ruled out one by one, and Ms Tan can hear that something is happening. This is how a professional searches (P4).",
id: "Teladan: penyebab paling umum — ejaan, tanggal, transfer antarkanal — disingkirkan satu per satu, dan Ms Tan mendengar ada yang dikerjakan. Beginilah cara profesional mencari (P4)."
},
next: "n3"
},
{
id: "b",
label: {
de: "Den Namen noch einmal genauso eingeben wie zuvor und das Ergebnis abwarten.",
en: "Type the name in once more exactly as before and wait for the result.",
id: "Mengetik nama itu sekali lagi persis seperti sebelumnya dan menunggu hasilnya."
},
scores: { d: 1, l: 1, s: 2 },
feedback: {
de: "Ordentlich, aber zu eng: Dieselbe Eingabe liefert dasselbe Ergebnis. Variieren Sie Schreibweisen, prüfen Sie Datum und Kanal — dort verstecken sich die meisten „verlorenen“ Buchungen.",
en: "Orderly but too narrow: the same input returns the same result. Vary the spelling, check the date and the channel — that is where most “lost” bookings hide.",
id: "Rapi tetapi terlalu sempit: masukan yang sama menghasilkan keluaran yang sama. Variasikan ejaan, periksa tanggal dan kanal — di sanalah pemesanan yang “hilang” bersembunyi."
},
next: "n3"
},
{
id: "c",
label: {
de: "Nach einem kurzen Blick erklären: „Tut mir leid, da ist wirklich nichts. Mehr kann ich nicht sehen.“",
en: "After a quick glance, declare: “I am sorry, there is really nothing. That is all I can see.”",
id: "Setelah melihat sekilas, menyatakan: “Maaf, memang tidak ada. Hanya itu yang bisa saya lihat.”"
},
scores: { d: 0, l: 1, s: 1 },
feedback: {
de: "Aufgeben nach einem Blick ist keine Suche. Ohne Schreibvarianten-, Datums- und Kanalprüfung ist „da ist nichts“ nicht belegt — und der Gast steht um Mitternacht im Regen (P4).",
en: "Giving up after one glance is not a search. Without checking spellings, dates and channel, “there is nothing” is not yet proven — and the guest is stranded at midnight (P4).",
id: "Menyerah setelah sekali lihat bukanlah pencarian. Tanpa memeriksa ejaan, tanggal, dan kanal, kesimpulan “tidak ada” belum terbukti — dan tamu terlantar di tengah malam (P4)."
},
next: "n3"
},
{
id: "d",
label: {
de: "Ms Tan bitten, die Buchung selbst noch einmal in ihrem Postfach herauszusuchen, während Sie warten.",
en: "Ask Ms Tan to dig out the booking in her inbox again herself while you wait.",
id: "Meminta Ms Tan mencari kembali pemesanannya sendiri di kotak surelnya sementara Anda menunggu."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Freundlich formuliert, aber die Arbeit liegt nun beim erschöpften Gast, während Ihr System ungenutzt bleibt. Suchen Sie parallel selbst — die Bestätigung liegt schon vor Ihnen.",
en: "Kindly put, but the work now sits with the exhausted guest while your system goes unused. Search in parallel yourself — the confirmation is already in front of you.",
id: "Ramah, tetapi beban berpindah ke tamu yang kelelahan, sementara sistem Anda menganggur. Carilah secara paralel — konfirmasinya sudah ada di depan Anda."
},
next: "n3"
}
]
},
n3: {
type: "decision",
phase: { de: "Lösungsoptionen", en: "Solution options", id: "Opsi solusi" },
narration: {
de: "Die gründliche Suche bleibt ohne Treffer — die Buchung ist nie in Ihrem System angekommen. Ms Tan sieht Sie erwartungsvoll an. Zwei Zimmer sind noch nicht zugeteilt; die Preisgestaltung außerhalb der Reservierung liegt nur begrenzt in Ihrer Hand.",
en: "The thorough search finds nothing — the booking never reached your system. Ms Tan looks at you expectantly. Two rooms are still unallocated; pricing outside a reservation is only partly within your authority.",
id: "Pencarian menyeluruh tetap nihil — pemesanan itu tidak pernah masuk ke sistem Anda. Ms Tan menatap penuh harap. Dua kamar belum teralokasi; penetapan harga di luar reservasi hanya sebagian dalam kewenangan Anda."
},
guestLine: {
de: "Und was heißt das jetzt für mich? Ich habe doch bezahlt.",
en: "So what does that mean for me now? I have already paid.",
id: "Lalu bagaimana dengan saya sekarang? Saya sudah membayar."
},
options: [
{
id: "a",
label: {
de: "Ein freies Zimmer für heute Nacht anbieten und erklären, dass die Buchungs- und Zahlungsklärung morgen dokumentiert weitergeht.",
en: "Offer a free room for tonight and explain that the booking and payment will be clarified, documented, tomorrow.",
id: "Menawarkan kamar untuk malam ini dan menjelaskan bahwa pemesanan serta pembayaran diklarifikasi besok secara terdokumentasi."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Stark: Das Dringende — ein Bett für heute Nacht — wird sofort gelöst, die Geldfrage sauber getrennt und für morgen dokumentiert. Diese Trennung schützt Gast und Haus (P4, P6).",
en: "Strong: the urgent problem — a bed for tonight — is solved at once, while the money question is separated and documented for tomorrow. That separation protects guest and hotel (P4, P6).",
id: "Kuat: yang mendesak — tempat tidur malam ini — langsung teratasi, urusan pembayaran dipisahkan dan didokumentasikan untuk besok. Pemisahan inilah yang melindungi tamu dan hotel (P4, P6)."
},
next: "n4"
},
{
id: "b",
label: {
de: "Zusagen, dass das Haus die Portalzahlung selbstverständlich vollständig erstattet, damit Ms Tan beruhigt ist.",
en: "Promise that the hotel will of course refund the portal payment in full, to put Ms Tan at ease.",
id: "Menjanjikan bahwa hotel tentu akan mengembalikan pembayaran portal sepenuhnya agar Ms Tan tenang."
},
scores: { d: 1, l: 1, s: 0 },
feedback: {
de: "Gut gemeint, aber eine Erstattungszusage über fremdes Geld übersteigt Ihre Befugnis — ob und wer erstattet, klärt sich erst mit dem Portal (P5). Sagen Sie zu, was Sie halten können: Klärung, dokumentiert, ab morgen.",
en: "Well meant, but promising a refund is beyond your authority — whether and who refunds is settled with the portal first (P5). Promise what you can keep: a documented clarification from tomorrow.",
id: "Niatnya baik, tetapi menjanjikan pengembalian dana di luar kewenangan Anda — jadi tidaknya baru jelas setelah klarifikasi dengan portal (P5). Janjikan yang dapat ditepati: klarifikasi terdokumentasi mulai besok."
},
next: "n4"
},
{
id: "c",
label: {
de: "Erklären, dass das Portal schuld ist und Ms Tan sich bitte dort beschweren soll.",
en: "Explain that the portal is to blame and Ms Tan should please complain to them.",
id: "Menjelaskan bahwa portal yang salah dan mempersilakan Ms Tan mengajukan keluhan ke sana."
},
scores: { d: 0, l: 0, s: 1 },
feedback: {
de: "Schuldzuweisung löst kein Bett-Problem um Mitternacht. Wo der Fehler liegt, ist für Ms Tan jetzt zweitrangig — sie braucht eine Lösung von dem Menschen vor ihr (P4).",
en: "Assigning blame does not solve a bed problem at midnight. Where the error lies is secondary right now — Ms Tan needs a solution from the person in front of her (P4).",
id: "Menyalahkan pihak lain tidak menyediakan tempat tidur di tengah malam. Letak kesalahan itu urusan nanti — Ms Tan membutuhkan solusi dari orang di hadapannya (P4)."
},
next: "n4"
},
{
id: "d",
label: {
de: "Vorsichtig anbieten, weiter zu suchen und parallel Hotels in der Nähe für sie abzufragen.",
en: "Cautiously offer to keep searching and to check nearby hotels for her in parallel.",
id: "Dengan hati-hati menawarkan untuk terus mencari sambil menanyakan hotel-hotel terdekat untuknya."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Zugewandt, aber am Kern vorbei: Ihr Haus hat freie Zimmer — der Verweis nach draußen ist die letzte Option, nicht die erste. Bieten Sie zuerst die eigene Lösung an (P4).",
en: "Caring but beside the point: your hotel has rooms available — pointing outside should be the last option, not the first. Offer your own solution first (P4).",
id: "Perhatian, tetapi meleset dari inti: hotel Anda masih punya kamar — mengarahkan tamu ke luar adalah opsi terakhir, bukan yang pertama. Tawarkan dahulu solusi hotel sendiri (P4)."
},
next: "n4"
}
]
},
n4: {
type: "decision",
phase: { de: "Eskalation", en: "Escalation", id: "Eskalasi" },
narration: {
de: "Ein Zimmer für heute Nacht steht bereit. Offen bleibt, zu welchen Konditionen — die Buchung existiert im System nicht, und solche Entscheidungen übersteigen nachts Ihre Befugnis. Die Nachtdienstleitung ist laut Übergabe telefonisch erreichbar.",
en: "A room for tonight is ready. What remains open is on what terms — the booking does not exist in your system, and such decisions exceed your authority at night. Per the handover, the duty manager can be reached by phone.",
id: "Kamar untuk malam ini sudah siap. Yang belum jelas adalah ketentuannya — pemesanan tidak ada di sistem, dan keputusan semacam ini melampaui kewenangan Anda pada malam hari. Menurut catatan serah terima, penanggung jawab malam dapat ditelepon."
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Die Nachtdienstleitung anrufen, den Fall in zwei Sätzen schildern und die Konditionen freigeben lassen.",
en: "Call the duty manager, outline the case in two sentences, and have the terms approved.",
id: "Menelepon penanggung jawab malam, memaparkan kasus dalam dua kalimat, dan meminta persetujuan atas ketentuannya."
},
scores: { d: 2, l: 2, s: 2 },
flags: { escalate: true },
feedback: {
de: "Genau dafür ist die Rufbereitschaft da: Sie handeln in Ihrer Befugnis und holen die Entscheidung dorthin, wo sie hingehört — knapp, sachlich, mit fertigem Lösungsvorschlag (P5). Eskalation ist Professionalität, keine Schwäche.",
en: "This is what the on-call arrangement is for: you act within your authority and take the decision to where it belongs — brief, factual, with a ready proposal (P5). Escalating is professionalism, not weakness.",
id: "Untuk inilah layanan siaga malam ada: Anda bertindak dalam kewenangan dan membawa keputusan ke tempat semestinya — singkat, faktual, dengan usulan solusi siap (P5). Eskalasi adalah profesionalisme, bukan kelemahan."
},
next: "n5"
},
{
id: "b",
label: {
de: "Nicht anrufen, sondern nur eine Notiz für die Frühschicht hinterlassen und die Konditionen offenlassen.",
en: "Do not call; just leave a note for the morning shift and leave the terms open.",
id: "Tidak menelepon; hanya meninggalkan catatan untuk sif pagi dan membiarkan ketentuannya menggantung."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Die Notiz ist gut (P6) — aber sie ersetzt den Anruf nicht: Ms Tan checkt ein, ohne zu wissen, woran sie ist, und die Frühschicht erbt eine offene Entscheidung. Nachts erreichbar zu sein ist der Zweck der Dienstleitung (P5).",
en: "The note is good (P6) — but it does not replace the call: Ms Tan checks in without knowing where she stands, and the morning shift inherits an open decision. Being reachable at night is what the duty manager is for (P5).",
id: "Catatannya bagus (P6) — tetapi tidak menggantikan telepon: Ms Tan check-in tanpa kepastian, dan sif pagi mewarisi keputusan menggantung. Justru untuk malam seperti inilah penanggung jawab siaga (P5)."
},
next: "n5"
},
{
id: "c",
label: {
de: "Ms Tan erklären, dass ohne Leitung nichts entschieden werden kann, und sie bitten, bis zum Morgen zu warten.",
en: "Tell Ms Tan nothing can be decided without a manager and ask her to wait until morning.",
id: "Menyampaikan bahwa tanpa atasan tidak ada yang bisa diputuskan, dan memintanya menunggu sampai pagi."
},
scores: { d: 0, l: 1, s: 1 },
feedback: {
de: "Eine Erschöpfte bis zum Morgen warten zu lassen, obwohl Zimmer frei sind und die Leitung erreichbar wäre, ist keine Option. Übersteigt eine Entscheidung Ihre Befugnis: anrufen, nicht aussitzen (P5).",
en: "Making an exhausted traveller wait until morning while rooms are free and the manager is reachable is not an option. When a decision exceeds your authority: call, do not sit it out (P5).",
id: "Membiarkan tamu kelelahan menunggu sampai pagi, padahal kamar tersedia dan atasan dapat dihubungi, bukan pilihan. Bila keputusan melampaui kewenangan Anda: telepon, jangan didiamkan (P5)."
},
next: "n5"
}
]
},
n5: {
type: "decision",
phase: { de: "Abschluss", en: "Resolution", id: "Penyelesaian" },
narration: {
de: "Die Konditionen sind geklärt: Ms Tan bekommt eines der freien Zimmer, die Buchungsfrage wird morgen mit dem Portal aufgelöst. Sie codieren die Schlüsselkarte. Kurz nach Mitternacht — Zeit, den Fall sauber abzuschließen.",
en: "The terms are settled: Ms Tan gets one of the free rooms, and the booking question will be resolved with the portal tomorrow. You code the key card. Just after midnight — time to close the case properly.",
id: "Ketentuan sudah jelas: Ms Tan mendapatkan salah satu kamar, dan urusan pemesanan diselesaikan dengan portal besok. Anda mengodekan kartu kunci. Lewat tengah malam — saatnya menutup kasus dengan rapi."
},
guestLine: {
de: "Danke. Ich war wirklich kurz davor, auf dem Parkplatz zu schlafen.",
en: "Thank you. I was honestly close to sleeping in the car park.",
id: "Terima kasih. Tadi saya benar-benar hampir tidur di tempat parkir."
},
options: [
{
id: "a",
label: {
de: "Zimmer übergeben, die morgigen Schritte kurz zusammenfassen und den Fall vollständig ins Übergabeprotokoll schreiben.",
en: "Hand over the room, briefly sum up tomorrow's steps, and record the case fully in the handover log.",
id: "Menyerahkan kamar, merangkum langkah besok secara singkat, dan mencatat kasus lengkap di log serah terima."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Der komplette Abschluss: Der Gast weiß, wie es weitergeht, und die Frühschicht findet alles im Protokoll — Name, Kanal, Zimmer, offene Klärung (P6). So verliert der Fall über Nacht nichts.",
en: "The complete close: the guest knows what happens next, and the morning shift finds everything in the log — name, channel, room, open clarification (P6). Nothing gets lost overnight.",
id: "Penutupan yang utuh: tamu tahu kelanjutannya, dan sif pagi menemukan semuanya di log — nama, kanal, kamar, klarifikasi tertunda (P6). Tidak ada yang hilang semalaman."
},
next: "x1"
},
{
id: "b",
label: {
de: "Ms Tan herzlich verabschieden und sich vornehmen, die Übergabenotiz am Ende der Schicht zu schreiben.",
en: "See Ms Tan off warmly and plan to write the handover note at the end of your shift.",
id: "Melepas Ms Tan dengan hangat dan berniat menulis catatan serah terima di akhir sif."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Der warme Abschluss stimmt — aber aufgeschobene Dokumentation wird nachts leicht vergessen, und die Frühschicht beginnt bei null (P6). Erst notieren, dann durchatmen.",
en: "The warm close is right — but documentation postponed at night is easily forgotten, and the morning shift starts from zero (P6). Write it down first, then breathe.",
id: "Penutup hangat sudah tepat — tetapi dokumentasi yang ditunda pada malam hari mudah terlupa, dan sif pagi mulai dari nol (P6). Catat dahulu, baru bernapas lega."
},
next: "x2"
},
{
id: "c",
label: {
de: "Die Karte kommentarlos über den Tresen schieben — der Fall hat schon genug Zeit gekostet.",
en: "Slide the card across the counter without comment — the case has taken enough time already.",
id: "Menyodorkan kartu tanpa komentar — kasus ini sudah menyita cukup banyak waktu."
},
scores: { d: 0, l: 0, s: 1 },
feedback: {
de: "Nach vierzig zähen Minuten entscheidet der letzte Satz, was Ms Tan erinnert. Ohne Erklärung und Protokoll bleibt Unsicherheit — und morgen fehlt jede Grundlage für die Klärung (P4, P6).",
en: "After forty hard minutes, the last sentence decides what Ms Tan remembers. Without explanation and log entry, uncertainty remains — and tomorrow the clarification has nothing to build on (P4, P6).",
id: "Setelah empat puluh menit yang berat, kalimat terakhirlah yang diingat Ms Tan. Tanpa penjelasan dan catatan, ketidakpastian tersisa — dan besok klarifikasi kehilangan pijakan (P4, P6)."
},
next: "x3"
}
]
},
x1: {
type: "outcome",
tone: "good",
ending: {
de: "Ms Tan fährt mit ihrem Koffer zum Aufzug — müde, aber erleichtert. Sie haben beruhigt, gründlich gesucht, die Nachtlösung vom Geld getrennt, die Leitung richtig eingebunden und alles dokumentiert. Ein Buchungsfehler wurde zur Werbung für Ihr Haus.",
en: "Ms Tan wheels her suitcase to the lift — tired but relieved. You calmed her, searched thoroughly, separated tonight's solution from the money question, involved the duty manager properly and documented everything. A booking error became an advertisement for your hotel.",
id: "Ms Tan mendorong kopernya menuju lift — lelah tetapi lega. Anda menenangkan, mencari dengan teliti, memisahkan solusi malam ini dari urusan pembayaran, melibatkan penanggung jawab dengan tepat, dan mendokumentasikan semuanya. Galat pemesanan justru menjadi iklan bagi hotel Anda."
}
},
x2: {
type: "outcome",
tone: "mixed",
ending: {
de: "Ms Tan hat ihr Zimmer, die Nacht ist gerettet. Ein Teil des Falls hängt jedoch in der Luft: eine offene Kondition hier, eine fehlende Notiz dort. Die Frühschicht wird Fragen haben, die Sie heute Nacht hätten beantworten können. Gute Lösung — der letzte Schliff fehlte.",
en: "Ms Tan has her room, and the night is saved. Part of the case, however, hangs in the air: an open condition here, a missing note there. The morning shift will have questions you could have answered tonight. A good solution — the final polish was missing.",
id: "Ms Tan mendapatkan kamarnya, malam ini terselamatkan. Namun sebagian kasus masih menggantung: ketentuan yang belum pasti, catatan yang belum ditulis. Sif pagi akan membawa pertanyaan yang sebenarnya bisa Anda jawab malam ini. Solusinya baik — sentuhan akhirnya kurang."
}
},
x3: {
type: "outcome",
tone: "poor",
ending: {
de: "Ms Tan hat irgendwann ein Zimmer bekommen — aber der Weg dorthin war ein Kampf. Vorwürfe, Abkürzungen oder Schweigen haben Vertrauen gekostet, und ohne saubere Übergabe beginnt die Klärung morgen bei null. Merken Sie sich: erst beruhigen, dann suchen, dann lösen — und alles festhalten.",
en: "Ms Tan got a room eventually — but the way there felt like a struggle. Blame, shortcuts or silence cost trust, and without a proper handover the clarification starts from zero tomorrow. Take this away: calm first, then search, then solve — and record it all.",
id: "Ms Tan akhirnya mendapatkan kamar — tetapi jalannya terasa seperti perjuangan. Tudingan, jalan pintas, atau sikap diam mengorbankan kepercayaan, dan tanpa serah terima yang rapi, klarifikasi besok mulai dari nol. Ingatlah: tenangkan dahulu, lalu cari, lalu selesaikan — dan catat semuanya."
}
}
},
debrief: {
tips: {
decision: {
de: "Trennen Sie das Dringende vom Wichtigen: Das Bett für heute Nacht ist dringend, die Geld- und Schuldfrage wichtig — sie darf auf morgen warten. Wer beides vermischt, verspricht zu viel oder löst zu wenig.",
en: "Separate the urgent from the important: the bed for tonight is urgent; the money and fault questions are important — and can wait until tomorrow. Mixing the two means promising too much or solving too little.",
id: "Pisahkan yang mendesak dari yang penting: tempat tidur malam ini mendesak; urusan pembayaran dan letak kesalahan itu penting — boleh menunggu besok. Mencampur keduanya membuat Anda menjanjikan terlalu banyak atau menyelesaikan terlalu sedikit."
},
language: {
de: "Sagen Sie hörbar, was Sie gerade tun („Ich prüfe jetzt andere Schreibweisen“): Für einen erschöpften Gast ist erklärte Arbeit halbe Beruhigung.",
en: "Say audibly what you are doing (“I am now checking other spellings”): for an exhausted guest, explained work is half the reassurance.",
id: "Ucapkan apa yang sedang Anda kerjakan (“Saya periksa ejaan lain sekarang”): bagi tamu yang kelelahan, pekerjaan yang dijelaskan adalah separuh ketenangan."
},
sop: {
de: "Kennen Sie Ihre nächtliche Befugnisgrenze, bevor der Fall eintritt: Was dürfen Sie allein entscheiden, wann rufen Sie die Dienstleitung an, was gehört ins Übergabeprotokoll (P5, P6)?",
en: "Know your night-shift authority limits before the case arises: what may you decide alone, when do you call the duty manager, and what belongs in the handover log (P5, P6)?",
id: "Kenali batas kewenangan sif malam Anda sebelum kasus terjadi: apa yang boleh diputuskan sendiri, kapan menelepon penanggung jawab, dan apa yang wajib masuk log serah terima (P5, P6)?"
}
},
safetyTip: {
de: "Versprechen Sie nie Erstattungen oder Konditionen außerhalb Ihrer Befugnis, nur um eine Situation zu beenden: Halten Sie fest, was Sie zusichern können, und eskalieren Sie den Rest (P5).",
en: "Never promise refunds or terms beyond your authority just to end a situation: commit only to what you can deliver and escalate the rest (P5).",
id: "Jangan pernah menjanjikan pengembalian dana atau ketentuan di luar kewenangan hanya untuk mengakhiri situasi: pastikan hanya hal yang dapat Anda tepati, dan eskalasikan sisanya (P5)."
},
praise: {
de: "Ausgezeichnet: Sie haben Ruhe, Systematik und die richtige Eskalation verbunden — so wird aus einer Panne um Mitternacht ein gewonnener Stammgast. Probieren Sie den Durchlauf auch auf Englisch.",
en: "Excellent: you combined calm, method and the right escalation — exactly how a midnight mishap turns into a loyal guest. Try the run in German as well.",
id: "Luar biasa: Anda memadukan ketenangan, kerja sistematis, dan eskalasi yang tepat — beginilah insiden tengah malam berubah menjadi tamu setia. Coba juga ulangi dalam bahasa Jerman."
}
},
sopRefs: ["P1", "P4", "P5", "P6"]
};
})();
