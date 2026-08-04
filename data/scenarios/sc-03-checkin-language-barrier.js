(function () {
"use strict";
window.HSL = window.HSL || {};
var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
data.scenarios["sc-03-checkin-language-barrier"] = {
id: "sc-03-checkin-language-barrier",
category: "checkin",
difficulty: 2,
minutes: 6,
title: {
de: "Gast mit Sprachbarriere",
en: "Guest with a Language Barrier",
id: "Tamu dengan Kendala Bahasa"
},
summary: {
de: "Ein älteres Ehepaar findet kaum gemeinsame Worte mit Ihnen, und die Schlange wird länger.",
en: "An elderly couple shares hardly any common words with you, and the queue keeps growing.",
id: "Sepasang tamu lansia nyaris tidak memiliki bahasa yang sama dengan Anda, sementara antrean semakin panjang."
},
context: {
place: {
de: "Empfang Ihres Hauses, später Vormittag, mehrere Anreisen zugleich.",
en: "The front desk of your hotel, late morning, several arrivals at once.",
id: "Meja resepsionis hotel Anda, menjelang siang, beberapa tamu tiba bersamaan."
},
situation: {
de: "Das Ehepaar Morel steht mit einem ausgedruckten Reservierungsbeleg vor Ihnen. Eine gemeinsame Sprache gibt es kaum — nur einzelne Wörter.",
en: "Mr and Mrs Morel stand before you with a printed reservation slip. You share almost no common language — only single words.",
id: "Pasangan Morel berdiri di depan Anda dengan bukti reservasi tercetak. Bahasa yang sama nyaris tidak ada — hanya kata-kata lepas."
},
guest: {
de: "Herr und Frau Morel, beide über 70, zum ersten Mal in der Stadt; freundlich, aber zunehmend verunsichert.",
en: "Mr and Mrs Morel, both over 70, first time in the city; friendly but increasingly unsure.",
id: "Bapak dan Ibu Morel, keduanya di atas 70 tahun, pertama kali ke kota ini; ramah tetapi semakin bingung."
},
constraints: {
de: "Ihre mehrsprachige Kollegin ist erst in etwa 15 Minuten zurück; hinter dem Paar wächst die Schlange.",
en: "Your multilingual colleague will be back in about 15 minutes; behind the couple the queue is growing.",
id: "Rekan Anda yang multibahasa baru kembali sekitar 15 menit lagi; di belakang pasangan itu antrean bertambah."
}
},
goals: [
{
de: "Langsam, einfach und mit visuellen Hilfen kommunizieren.",
en: "Communicate slowly, simply and with visual aids.",
id: "Berkomunikasi secara perlahan, sederhana, dan dengan alat bantu visual."
},
{
de: "Die Würde des Gastes wahren — Geduld statt Lautstärke (P1).",
en: "Preserve the guest's dignity — patience instead of volume (P1).",
id: "Menjaga martabat tamu — kesabaran, bukan suara keras (P1)."
},
{
de: "Die wartende Schlange transparent mitführen (P4).",
en: "Keep the waiting queue informed along the way (P4).",
id: "Tetap mengelola antrean secara transparan (P4)."
}
],
startNode: "n1",
nodes: {
n1: {
type: "decision",
phase: { de: "Erster Kontakt", en: "First contact", id: "Kontak awal" },
narration: {
de: "Das Ehepaar Morel schiebt Ihnen den Ausdruck über den Tresen und schaut Sie hoffnungsvoll an. Dahinter stellen sich drei weitere Gäste an. Ihr Einstieg bestimmt, ob dieser Check-in ruhig oder chaotisch wird.",
en: "Mr and Mrs Morel slide the printout across the counter and look at you hopefully. Behind them, three more guests join the queue. Your opening determines whether this check-in stays calm or turns chaotic.",
id: "Pasangan Morel menyodorkan lembar cetakan ke meja dan menatap Anda penuh harap. Di belakang mereka, tiga tamu lain mulai mengantre. Pembukaan Anda menentukan apakah check-in ini tenang atau kacau."
},
guestLine: {
de: "Entschuldigung… wir… Zimmer? Reserviert… Name Morel.",
en: "Excuse… we… room? Reserved… name Morel.",
id: "Maaf… kami… kamar? Sudah pesan… nama Morel."
},
options: [
{
id: "a",
label: {
de: "Lächeln, langsam und in kurzen Wörtern antworten und den Beleg deutlich sichtbar in die Hand nehmen.",
en: "Smile, answer slowly in short words, and pick up the slip so they can clearly see it.",
id: "Tersenyum, menjawab perlahan dengan kata-kata pendek, dan mengambil bukti reservasi agar terlihat jelas."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Genau richtig: Tempo runter, Wörter einfach, Handeln sichtbar. Das Paar erkennt sofort, dass es verstanden wird — die Grundlage jeder weiteren Verständigung (P1).",
en: "Exactly right: slow the pace, simplify the words, make your actions visible. The couple sees at once that they are understood — the foundation of everything that follows (P1).",
id: "Tepat sekali: tempo diturunkan, kata disederhanakan, tindakan terlihat. Pasangan itu langsung tahu bahwa mereka dipahami — fondasi seluruh komunikasi berikutnya (P1)."
},
next: "n2"
},
{
id: "b",
label: {
de: "In normalem Tempo mit dem Standardablauf beginnen und die üblichen Fragen stellen.",
en: "Start the standard procedure at normal speed and ask the usual questions.",
id: "Memulai prosedur standar dengan kecepatan normal dan mengajukan pertanyaan-pertanyaan biasa."
},
scores: { d: 1, l: 1, s: 2 },
feedback: {
de: "Der Ablauf stimmt, das Tempo nicht: Ihre Standardfragen rauschen an den Morels vorbei. Bei einer Sprachbarriere ist Verlangsamen der erste Arbeitsschritt, nicht Höflichkeitsbeigabe.",
en: "The procedure is right, the pace is not: your standard questions wash straight past the Morels. With a language barrier, slowing down is the first working step, not a courtesy extra.",
id: "Prosedurnya benar, temponya tidak: pertanyaan standar Anda lewat begitu saja bagi pasangan Morel. Pada kendala bahasa, memperlambat tempo adalah langkah kerja pertama, bukan basa-basi."
},
next: "n2"
},
{
id: "c",
label: {
de: "Das Paar bitten, kurz zur Seite zu treten, um zuerst die schnelleren Check-ins abzuarbeiten.",
en: "Ask the couple to step aside briefly so you can process the quicker check-ins first.",
id: "Meminta pasangan itu menepi sebentar agar Anda dapat memproses check-in yang lebih cepat dahulu."
},
scores: { d: 0, l: 1, s: 1 },
feedback: {
de: "Wer zuerst da ist, wird zuerst bedient — eine Sprachbarriere ist kein Grund, jemanden zurückzustellen (P1). Das Paar fühlt sich aussortiert; gewonnene Minuten wiegen den Vertrauensverlust nicht auf.",
en: "First come, first served — a language barrier is no reason to set someone aside (P1). The couple feels sorted out, and the minutes gained do not outweigh the lost trust.",
id: "Siapa datang dahulu dilayani dahulu — kendala bahasa bukan alasan mengesampingkan tamu (P1). Pasangan itu merasa disingkirkan, dan menit yang dihemat tidak sebanding dengan kepercayaan yang hilang."
},
next: "n2"
},
{
id: "d",
label: {
de: "Überschwänglich begrüßen und in vielen freundlichen Sätzen alles auf einmal erklären.",
en: "Greet them effusively and explain everything at once in many friendly sentences.",
id: "Menyambut dengan meriah dan menjelaskan semuanya sekaligus dalam banyak kalimat ramah."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Die Herzlichkeit kommt an — die Wortflut nicht. Je mehr Sätze auf einmal, desto weniger bleibt hängen. Halbieren Sie das Tempo: eine Information pro Satz.",
en: "The warmth lands — the flood of words does not. The more sentences at once, the less sticks. Halve the pace and send one piece of information per sentence.",
id: "Kehangatannya sampai — banjir katanya tidak. Semakin banyak kalimat sekaligus, semakin sedikit yang tertangkap. Kurangi tempo separuhnya: satu informasi per kalimat."
},
next: "n2"
}
]
},
n2: {
type: "decision",
phase: { de: "Kommunikationsstrategie", en: "Communication strategy", id: "Strategi komunikasi" },
narration: {
de: "Die Reservierung ist gefunden: zwei Nächte, Zimmer mit Aufzugnähe. Nun müssen Meldeformular, Frühstückszeiten und Zimmerübergabe über die Sprachhürde. Frau Morel sucht nach einem Wörterbuch; die Schlange wird unruhig.",
en: "The reservation is found: two nights, a room near the lift. Now the registration form, breakfast times and room hand-over must cross the language hurdle. Mrs Morel digs for a dictionary; the queue grows restless.",
id: "Reservasi ditemukan: dua malam, kamar dekat lift. Kini formulir registrasi, jam sarapan, dan penyerahan kamar harus melewati rintangan bahasa. Ibu Morel mencari kamus; antrean mulai gelisah."
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Zahlen und Uhrzeiten aufschreiben, auf dem Etagenplan zeigen und jeden Schritt mit einfachen Gesten begleiten.",
en: "Write down numbers and times, point on the floor plan, and support every step with simple gestures.",
id: "Menuliskan angka dan jam, menunjuk pada denah lantai, dan mengiringi setiap langkah dengan gerakan sederhana."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Vorbildlich: Geschriebene Zahlen, ein Plan zum Zeigen und ruhige Gesten tragen weiter als jedes gesprochene Wort. So bleibt die Verständigung exakt — und würdevoll (P1, P4).",
en: "Exemplary: written numbers, a plan to point at and calm gestures carry further than any spoken word. Communication stays precise — and dignified (P1, P4).",
id: "Teladan: angka tertulis, denah untuk ditunjuk, dan gerakan tenang menjangkau lebih jauh daripada kata lisan. Komunikasi tetap akurat — dan bermartabat (P1, P4)."
},
next: "n3"
},
{
id: "b",
label: {
de: "Denselben Satz geduldig mehrfach wiederholen, bis ein Nicken kommt.",
en: "Patiently repeat the same sentence several times until a nod comes.",
id: "Dengan sabar mengulang kalimat yang sama beberapa kali sampai muncul anggukan."
},
scores: { d: 1, l: 1, s: 1 },
feedback: {
de: "Geduld ist richtig — aber Wiederholung ohne neue Form bleibt dieselbe Hürde. Ein unverstandener Satz wird durch Wiederholen nicht klarer; ändern Sie den Kanal: schreiben, zeigen, vormachen.",
en: "The patience is right — but repetition without a new form is the same hurdle again. An ununderstood sentence does not get clearer by repeating it; change the channel: write, point, demonstrate.",
id: "Kesabarannya benar — tetapi pengulangan tanpa bentuk baru tetaplah rintangan yang sama. Kalimat yang tak dipahami tidak menjadi jelas dengan diulang; ganti salurannya: tulis, tunjuk, peragakan."
},
next: "n3"
},
{
id: "c",
label: {
de: "Deutlich lauter sprechen und dabei den gebrochenen Satzbau der Gäste nachahmen, damit sie es „leichter“ verstehen.",
en: "Speak much louder while imitating the guests' broken phrasing so they understand it “more easily”.",
id: "Berbicara jauh lebih keras sambil meniru susunan kalimat patah-patah para tamu agar “lebih mudah” dipahami."
},
scores: { d: 0, l: 0, s: 1 },
feedback: {
de: "Lautstärke ersetzt kein Verstehen, und nachgeahmtes Gebrochen-Sprechen wirkt herablassend — die Morels hören keinen Inhalt, nur den Ton (P1). Ruhig, langsam, respektvoll: die professionelle Richtung.",
en: "Volume does not replace understanding, and imitated broken speech comes across as condescending — the Morels hear no content, only the tone (P1). Calm, slow, respectful: that is the professional direction.",
id: "Suara keras tidak menggantikan pemahaman, dan meniru ucapan patah-patah terkesan merendahkan — pasangan Morel tidak menangkap isi, hanya nadanya (P1). Tenang, perlahan, penuh hormat: itulah arah profesional."
},
next: "n2b"
},
{
id: "d",
label: {
de: "Freundlich weitersprechen und das Meldeformular kommentarlos zum Selbstausfüllen hinlegen.",
en: "Keep talking warmly and lay out the registration form to be filled in without further comment.",
id: "Terus berbicara ramah dan meletakkan formulir registrasi untuk diisi sendiri tanpa penjelasan."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Der Ton bleibt warm, doch ein unerklärtes Formular ist für die Morels eine Wand aus Text. Zeigen Sie Feld für Feld und machen Sie die erste Zeile gemeinsam — dann läuft der Rest.",
en: "The tone stays warm, but an unexplained form is a wall of text for the Morels. Point field by field and do the first line together — then the rest will follow.",
id: "Nadanya tetap hangat, tetapi formulir tanpa penjelasan adalah dinding teks bagi pasangan Morel. Tunjuk kolom demi kolom dan isi baris pertama bersama — sisanya akan mengalir."
},
next: "n3"
}
]
},
n2b: {
type: "decision",
phase: { de: "Kommunikationsstrategie", en: "Communication strategy", id: "Strategi komunikasi" },
narration: {
de: "Herr Morel weicht einen halben Schritt zurück, Frau Morel schaut zu Boden. Ihre Lautstärke hat die Verwirrung vergrößert — und die Schlange beobachtet. Eine zweite Chance: Wie stellen Sie die Verständigung wieder her?",
en: "Mr Morel takes half a step back and Mrs Morel looks at the floor. Your volume has increased the confusion — and the queue is watching. A second chance: how do you rebuild the communication?",
id: "Bapak Morel mundur setengah langkah, Ibu Morel menunduk. Suara keras Anda justru menambah kebingungan — dan antrean menyaksikan. Kesempatan kedua: bagaimana Anda memulihkan komunikasi?"
},
guestLine: {
de: "Bitte… langsam? Wir… nicht verstehen.",
en: "Please… slow? We… not understand.",
id: "Tolong… pelan? Kami… tidak paham."
},
options: [
{
id: "a",
label: {
de: "Bewusst leiser werden, sich kurz entschuldigen und auf Stift, Papier und Etagenplan umsteigen.",
en: "Deliberately lower your voice, apologise briefly, and switch to pen, paper and the floor plan.",
id: "Sengaja merendahkan suara, meminta maaf singkat, lalu beralih ke pulpen, kertas, dan denah lantai."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Stark: Sie erkennen den Fehlgriff, korrigieren hörbar den Ton und wechseln auf den Kanal, der funktioniert — schreiben und zeigen. So gewinnt man verlorenes Vertrauen zurück (P1, P4).",
en: "Strong: you recognise the misstep, audibly correct the tone and switch to the channel that works — writing and pointing. Exactly how lost trust is won back (P1, P4).",
id: "Kuat: Anda menyadari kekeliruan, memperbaiki nada secara nyata, dan berpindah ke saluran yang berfungsi — menulis dan menunjuk. Beginilah cara merebut kembali kepercayaan (P1, P4)."
},
next: "n3"
},
{
id: "b",
label: {
de: "Einfach leiser weitersprechen und hoffen, dass sich die Situation von selbst glättet.",
en: "Simply carry on more quietly and hope the situation smooths itself out.",
id: "Sekadar melanjutkan dengan suara lebih pelan dan berharap suasana pulih dengan sendirinya."
},
scores: { d: 1, l: 1, s: 1 },
feedback: {
de: "Leiser ist besser — aber der Bruch bleibt unbenannt, und gesprochene Sätze sind weiter die schwächste Brücke. Eine kurze Entschuldigung plus Stift und Plan wäre der volle Neustart.",
en: "Quieter is better — but the rupture stays unaddressed, and spoken sentences remain the weakest bridge. A brief apology plus pen and plan would be the full restart.",
id: "Lebih pelan memang lebih baik — tetapi keretakan tadi tidak diakui, dan kalimat lisan tetap jembatan terlemah. Isyarat maaf singkat plus pulpen dan denah adalah awal baru yang utuh."
},
next: "n3"
},
{
id: "c",
label: {
de: "Die Verständigung aufgeben und die Formalitäten schweigend allein ausfüllen, so gut es geht.",
en: "Give up on communicating and fill in the formalities silently on your own as best you can.",
id: "Menyerah berkomunikasi dan mengisi formalitas sendiri dalam diam sebisanya."
},
scores: { d: 0, l: 1, s: 1 },
feedback: {
de: "Schweigen fühlt sich nach Ruhe an, schließt die Gäste aber aus: Die Morels wissen weder, was Sie tun, noch was von ihnen erwartet wird. Verständigung ist Teil des Verfahrens, nicht Zugabe (P4).",
en: "Silence feels like calm but shuts the guests out: the Morels know neither what you are doing nor what is expected of them. Communication is part of the procedure, not an extra (P4).",
id: "Diam terasa seperti ketenangan, tetapi mengucilkan tamu: pasangan Morel tidak tahu apa yang Anda kerjakan maupun apa yang diharapkan dari mereka. Komunikasi adalah bagian dari prosedur, bukan tambahan (P4)."
},
next: "n3"
}
]
},
n3: {
type: "decision",
phase: { de: "Anliegen lösen", en: "Meeting the needs", id: "Penyelesaian kebutuhan" },
narration: {
de: "Das Meldeformular ist geschafft. Frau Morel deutet auf den Magen ihres Mannes und dann auf die Uhr — offenbar geht es ums Frühstück. Die Schlange ist auf fünf Personen angewachsen; gleich ist Ihre mehrsprachige Kollegin zurück.",
en: "The registration form is done. Mrs Morel points at her husband's stomach and then at the clock — this is clearly about breakfast. The queue has grown to five people; your multilingual colleague is back in a few minutes.",
id: "Formulir registrasi selesai. Ibu Morel menunjuk perut suaminya lalu jam dinding — jelas ini soal sarapan. Antrean sudah lima orang; sebentar lagi rekan Anda yang multibahasa kembali."
},
guestLine: {
de: "Frühstück… wann? Und… wo?",
en: "Breakfast… when? And… where?",
id: "Sarapan… jam berapa? Dan… di mana?"
},
options: [
{
id: "a",
label: {
de: "Frühstückszeiten groß auf eine Karte schreiben, den Raum auf dem Plan markieren und beides mitgeben.",
en: "Write the breakfast times large on a card, mark the room on the plan, and give them both to take along.",
id: "Menuliskan jam sarapan besar-besar pada kartu, menandai ruangannya di denah, lalu memberikan keduanya."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Perfekt: Die Antwort ist verstanden, mitnehmbar und morgen früh noch da, wenn sie gebraucht wird. Visuelle Hilfen wirken über den Moment hinaus (P4).",
en: "Perfect: the answer is understood, portable, and still there tomorrow morning when it is needed. Visual aids work beyond the moment (P4).",
id: "Sempurna: jawabannya dipahami, dapat dibawa, dan masih ada besok pagi saat dibutuhkan. Alat bantu visual bekerja melampaui momen ini (P4)."
},
next: "n4"
},
{
id: "b",
label: {
de: "Die gleich zurückkehrende mehrsprachige Kollegin hinzubitten und die Wartenden kurz informieren.",
en: "Ask your multilingual colleague, due back any moment, to join, and briefly inform those waiting.",
id: "Meminta rekan multibahasa yang segera kembali untuk membantu, sambil memberi kabar singkat kepada yang menunggu."
},
scores: { d: 1, l: 2, s: 1 },
flags: { escalate: true },
feedback: {
de: "Hilfe zu holen ist völlig legitim (P5) — und die Information an die Schlange ist stark. Nur: Diese Frage lösen Sie mit Stift und Plan sofort selbst; Warten auf die Kollegin kostet allen Zeit.",
en: "Calling in help is entirely legitimate (P5) — and informing the queue is strong. Yet this particular question you could solve right now with pen and plan; waiting for your colleague costs everyone time.",
id: "Meminta bantuan sepenuhnya sah (P5) — dan menginformasikan antrean itu bagus. Hanya saja, pertanyaan ini bisa Anda jawab sekarang juga dengan pulpen dan denah; menunggu rekan menyita waktu semua orang."
},
next: "n4"
},
{
id: "c",
label: {
de: "Die Schlüsselkarte übergeben und die Frühstücksfrage auf später verschieben, ohne das zu erklären.",
en: "Hand over the key card and postpone the breakfast question until later, without explaining that.",
id: "Menyerahkan kartu kunci dan menunda pertanyaan sarapan tanpa menjelaskannya."
},
scores: { d: 0, l: 1, s: 1 },
feedback: {
de: "Die Frage unbeantwortet zu lassen, sendet die Botschaft „nicht so wichtig“. Für die Morels war sie wichtig genug, um sie mit Gesten zu stellen — eine geschriebene Zahl hätte genügt (P4).",
en: "Leaving the question unanswered sends the message “not that important”. For the Morels it mattered enough to ask with gestures — one written number would have been enough (P4).",
id: "Membiarkan pertanyaan tak terjawab mengirim pesan “tidak terlalu penting”. Bagi pasangan Morel, pertanyaan itu cukup penting sampai diajukan lewat isyarat — satu angka tertulis sebenarnya cukup (P4)."
},
next: "n4"
},
{
id: "d",
label: {
de: "Die Zeiten und den Weg zum Frühstücksraum in einfachen Worten mündlich erklären.",
en: "Explain the times and the way to the breakfast room verbally, in simple words.",
id: "Menjelaskan jam dan arah ke ruang sarapan secara lisan dengan kata-kata sederhana."
},
scores: { d: 1, l: 1, s: 2 },
feedback: {
de: "Inhaltlich vollständig und einfach formuliert — aber rein mündlich: Bis morgen früh ist die Hälfte verflogen. Bei Zahlen und Orten schlägt Geschriebenes das Gesprochene immer.",
en: "Complete in content and simply phrased — but purely verbal: by tomorrow morning half of it will have evaporated. For numbers and places, written always beats spoken.",
id: "Isinya lengkap dan bahasanya sederhana — tetapi hanya lisan: sampai besok pagi separuhnya menguap. Untuk angka dan tempat, tulisan selalu mengalahkan ucapan."
},
next: "n4"
}
]
},
n4: {
type: "decision",
phase: { de: "Abschluss", en: "Closing", id: "Penutup" },
narration: {
de: "Schlüsselkarte, Plan und Notizzettel liegen bereit. Das Ehepaar Morel wirkt zum ersten Mal entspannt. Die Schlange wartet — und Ihre Kollegin kommt gerade durch die Tür. Zeit für den letzten Eindruck.",
en: "Key card, plan and notes are ready. For the first time, Mr and Mrs Morel look relaxed. The queue is waiting — and your colleague is just coming through the door. Time for the final impression.",
id: "Kartu kunci, denah, dan catatan sudah siap. Untuk pertama kalinya pasangan Morel tampak tenang. Antrean menunggu — dan rekan Anda baru saja masuk. Saatnya kesan terakhir."
},
guestLine: {
de: "Danke… sehr freundlich. Danke.",
en: "Thank you… very kind. Thank you.",
id: "Terima kasih… baik sekali. Terima kasih."
},
options: [
{
id: "a",
label: {
de: "Langsam und herzlich verabschieden, auf die Notizen zeigen und mit einer Geste Hilfe jederzeit anbieten.",
en: "Say goodbye slowly and warmly, point to the notes, and offer help any time with a gesture.",
id: "Berpamitan perlahan dan hangat, menunjuk catatan tadi, dan dengan isyarat menawarkan bantuan kapan saja."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Ein würdevoller Abschluss: Das Paar geht mit allem Nötigen in der Hand und dem Wissen, dass die Rezeption erreichbar bleibt. Geduld hat sich für alle ausgezahlt (P1, P4).",
en: "A dignified close: the couple leaves with everything they need in hand and the knowledge that the desk remains within reach. Patience has paid off for everyone (P1, P4).",
id: "Penutup yang bermartabat: pasangan itu pergi dengan semua yang diperlukan di tangan dan keyakinan bahwa resepsionis tetap siap membantu. Kesabaran berbuah bagi semua (P1, P4)."
},
next: "x1"
},
{
id: "b",
label: {
de: "Kurz und freundlich verabschieden und sich sofort mit Schwung der Schlange zuwenden.",
en: "Say a brief, friendly goodbye and turn to the queue with momentum right away.",
id: "Berpamitan singkat dan ramah, lalu segera beralih ke antrean dengan sigap."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Verständlich nach der langen Sequenz — doch gerade dieses Paar braucht zwei Sekunden mehr: ein letzter Blickkontakt, ein Zeigen auf die Notizen. Sonst bleibt der Abschied hinter dem guten Weg dorthin zurück.",
en: "Understandable after the long sequence — yet this couple needs two more seconds: a last moment of eye contact, a point at the notes. Otherwise the farewell falls short of the good path that led there.",
id: "Dapat dimaklumi setelah proses panjang — tetapi justru pasangan ini membutuhkan dua detik lebih: kontak mata terakhir, tunjukan pada catatan. Tanpa itu, perpisahan kalah dari proses baik sebelumnya."
},
next: "x2"
},
{
id: "c",
label: {
de: "Erleichtert zur Schlange sagen: „Entschuldigung, das hat jetzt gedauert“ — mit Blick auf das Paar.",
en: "Say to the queue with relief: “Apologies, that took a while” — while glancing at the couple.",
id: "Berkata lega kepada antrean: “Maaf, tadi lama sekali” — sambil melirik pasangan itu."
},
scores: { d: 0, l: 0, s: 1 },
feedback: {
de: "Dieser Satz macht die Morels vor Publikum zum Grund der Verzögerung — nach all der guten Arbeit ein verletzender Schlusston (P1). Entschuldigen Sie die Wartezeit, ohne auf Gäste zu zeigen.",
en: "That sentence turns the Morels into the reason for the delay in front of an audience — a hurtful closing note after all the good work (P1). Apologise for the wait without pointing at guests.",
id: "Kalimat itu menjadikan pasangan Morel penyebab keterlambatan di depan umum — nada penutup yang melukai setelah semua kerja baik tadi (P1). Mintalah maaf atas waktu tunggu tanpa menunjuk tamu."
},
next: "x3"
}
]
},
x1: {
type: "outcome",
tone: "good",
ending: {
de: "Die Morels winken vom Aufzug noch einmal zurück — mit Plan und Notizzettel in der Hand. Sie haben Tempo, Kanal und Ton an die Gäste angepasst, ihre Würde geschützt und die Schlange nicht verloren. Sprachbarrieren bleiben; mit dieser Methode verlieren sie ihren Schrecken.",
en: "The Morels wave back once more from the lift — plan and notes in hand. You adapted pace, channel and tone to the guests, protected their dignity and never lost the queue. Language barriers remain; with this method they lose their sting.",
id: "Dari lift, pasangan Morel melambai sekali lagi — denah dan catatan di tangan. Anda menyesuaikan tempo, saluran, dan nada dengan tamu, menjaga martabat mereka, dan tidak kehilangan kendali antrean. Kendala bahasa akan selalu ada; dengan metode ini, kendala itu kehilangan dayanya."
}
},
x2: {
type: "outcome",
tone: "mixed",
ending: {
de: "Das Ehepaar Morel ist eingecheckt und findet sich zurecht — vieles lief gut, manches blieb Stückwerk: eine mündliche Auskunft, die morgen vergessen ist, oder ein Abschied im Eiltempo. Die stärkste Erkenntnis dieses Durchlaufs: Bei Sprachbarrieren zählt nicht, was gesagt wurde, sondern was ankam.",
en: "Mr and Mrs Morel are checked in and finding their way — much went well, some stayed piecemeal: a verbal answer forgotten by tomorrow, or a farewell at speed. Keep this run's strongest insight: with language barriers, what counts is not what was said but what arrived.",
id: "Pasangan Morel sudah check-in dan mulai menemukan arah — banyak yang berjalan baik, sebagian masih setengah jadi: jawaban lisan yang besok terlupa, atau pamit yang tergesa. Pelajaran terkuat sesi ini: pada kendala bahasa, yang dihitung bukan yang diucapkan, melainkan yang sampai."
}
},
x3: {
type: "outcome",
tone: "poor",
ending: {
de: "Der Check-in ist abgeschlossen, doch die Morels haben Momente erlebt, die kein Gast erleben sollte: Lautstärke, Ausschluss oder eine Bloßstellung vor anderen. Nehmen Sie mit: Verlangsamen, aufschreiben, zeigen — und die Würde des Gastes ist nicht verhandelbar (P1).",
en: "The check-in is complete, but the Morels experienced moments no guest should: raised volume, exclusion, or being singled out in front of others. Take this away: slow down, write it down, point it out — and a guest's dignity is not negotiable (P1).",
id: "Check-in selesai, tetapi pasangan Morel sempat mengalami hal yang tidak seharusnya dialami tamu mana pun: suara keras, pengucilan, atau dipermalukan di depan orang lain. Bawalah pelajaran ini: perlambat, tuliskan, tunjukkan — dan martabat tamu tidak dapat ditawar (P1)."
}
}
},
debrief: {
tips: {
decision: {
de: "Wechseln Sie bei Nichtverstehen den Kanal statt der Lautstärke: schreiben, zeigen, vormachen. Jede Wiederholung in derselben Form kostet Zeit und Vertrauen.",
en: "When understanding fails, change the channel, not the volume: write, point, demonstrate. Every repetition in the same form costs time and trust.",
id: "Saat tidak dipahami, gantilah saluran, bukan volume: tulis, tunjuk, peragakan. Setiap pengulangan dalam bentuk yang sama menguras waktu dan kepercayaan."
},
language: {
de: "Kurze Sätze, eine Information pro Satz, Pausen zulassen — und nie den Sprachstil des Gastes imitieren: Einfachheit ist Respekt, Nachahmung ist Spott (P1).",
en: "Short sentences, one piece of information per sentence, allow pauses — and never imitate the guest's way of speaking: simplicity is respect, imitation is mockery (P1).",
id: "Kalimat pendek, satu informasi per kalimat, beri jeda — dan jangan pernah meniru gaya bicara tamu: kesederhanaan adalah rasa hormat, peniruan adalah ejekan (P1)."
},
sop: {
de: "Halten Sie Stift, Notizkarten und Etagenplan griffbereit am Tresen — und geben Sie Zahlen, Zeiten und Orte solchen Gästen immer schriftlich mit (P4).",
en: "Keep pen, note cards and the floor plan within reach at the desk — and always give numbers, times and places to such guests in writing (P4).",
id: "Sediakan pulpen, kartu catatan, dan denah lantai dalam jangkauan di meja — dan selalu berikan angka, jam, serta lokasi secara tertulis kepada tamu seperti ini (P4)."
}
},
safetyTip: {
de: "Sprechen Sie über wartende oder langsame Gäste nie abwertend vor anderen: Was die Schlange hört, prägt das Bild Ihres Hauses — und verletzt den Gast, der es mitbekommt (P1).",
en: "Never speak dismissively about waiting or slower guests in front of others: what the queue hears shapes the image of your hotel — and wounds the guest who overhears it (P1).",
id: "Jangan pernah berbicara merendahkan tentang tamu yang lambat atau menunggu di depan orang lain: apa yang didengar antrean membentuk citra hotel Anda — dan melukai tamu yang mendengarnya (P1)."
},
praise: {
de: "Hervorragend: Sie haben ohne gemeinsame Sprache einen vollständigen, warmen Check-in geführt. Spielen Sie das Szenario in einer anderen Sprache — die Methode bleibt, die Wörter wechseln.",
en: "Outstanding: you led a complete, warm check-in without a shared language. Play the scenario in another language — the method stays, the words change.",
id: "Istimewa: Anda memimpin check-in yang lengkap dan hangat tanpa bahasa yang sama. Mainkan skenario ini dalam bahasa lain — metodenya tetap, kata-katanya yang berganti."
}
},
sopRefs: ["P1", "P4"]
};
})();
