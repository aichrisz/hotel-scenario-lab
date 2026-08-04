(function () {
"use strict";
window.HSL = window.HSL || {};
var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
data.scenarios["sc-06-complaint-review-threat"] = {
id: "sc-06-complaint-review-threat",
category: "complaint",
difficulty: 3,
minutes: 7,
title: {
de: "Drohung mit schlechter Bewertung",
en: "Threat of a Bad Review",
id: "Ancaman Ulasan Negatif"
},
summary: {
de: "Ein Gast fordert eine Gratisnacht und droht mit schlechten Bewertungen auf allen Plattformen.",
en: "A guest demands a free night and threatens bad reviews on every platform.",
id: "Seorang tamu menuntut satu malam gratis dan mengancam memberi ulasan buruk di semua platform."
},
context: {
place: {
de: "Empfang Ihres Hauses, früher Abend; die Lobby ist voll besetzt.",
en: "The front desk of your hotel, early evening; the lobby is packed.",
id: "Meja resepsionis hotel Anda, sore menjelang malam; lobi penuh."
},
situation: {
de: "Herr Brandt verlangt eine Gratisnacht wegen „einer Reihe von Ärgernissen“, die er nicht benennt — und stellt Ein-Stern-Bewertungen auf allen Plattformen in Aussicht.",
en: "Mr Brandt demands a free night for “a series of annoyances” he does not specify — and holds out the prospect of one-star reviews on every platform.",
id: "Bapak Brandt menuntut satu malam gratis karena “serangkaian gangguan” yang tidak beliau rincikan — sambil mengancam ulasan bintang satu di semua platform."
},
guest: {
de: "Herr Brandt, Anfang 50, zweite Nacht im Haus; fordernd und routiniert, bei Nachfragen ausweichend.",
en: "Mr Brandt, early fifties, second night in the hotel; demanding and practised in manner, evasive when asked for specifics.",
id: "Bapak Brandt, awal 50-an, malam kedua menginap; tampil menuntut dan terlatih, tetapi mengelak saat dimintai rincian."
},
constraints: {
de: "Kompensationen sind nur im Rahmen Ihrer Befugnis möglich; eine Gratisnacht liegt klar darüber. Die Leitung ist im Haus erreichbar.",
en: "Compensation is possible only within your authority; a free night is clearly above it. The manager is reachable in the building.",
id: "Kompensasi hanya mungkin dalam batas kewenangan Anda; satu malam gratis jelas melampauinya. Atasan dapat dihubungi di dalam gedung."
}
},
goals: [
{
de: "Berechtigte Beschwerdepunkte von Druckmitteln trennen (P4).",
en: "Separate legitimate complaint points from leverage (P4).",
id: "Memisahkan poin keluhan yang sah dari alat penekan (P4)."
},
{
de: "Unter Druck freundlich bleiben, ohne Verfahren gegen Bewertungen zu tauschen (P5).",
en: "Stay friendly under pressure without trading procedure for reviews (P5).",
id: "Tetap ramah di bawah tekanan tanpa menukar prosedur dengan ulasan (P5)."
},
{
de: "Den Fall dokumentiert an die Leitung übergeben (P6).",
en: "Hand the case to the manager, documented (P6).",
id: "Menyerahkan kasus kepada atasan secara terdokumentasi (P6)."
}
],
startNode: "n1",
nodes: {
n1: {
type: "decision",
phase: { de: "Zuhören", en: "Listening", id: "Mendengarkan" },
narration: {
de: "Herr Brandt spricht laut genug, dass umstehende Gäste sich umdrehen. Er verlangt „eine unkomplizierte Lösung: eine Nacht kostenlos“ — sonst werde er „dafür sorgen, dass jeder liest, wie es hier läuft“.",
en: "Mr Brandt speaks loudly enough for nearby guests to turn around. He demands “a simple solution: one night free” — otherwise he will “make sure everyone reads what this place is like”.",
id: "Bapak Brandt berbicara cukup keras sampai tamu di dekatnya menoleh. Beliau menuntut “solusi sederhana: satu malam gratis” — kalau tidak, beliau akan “memastikan semua orang membaca seperti apa hotel ini”."
},
guestLine: {
de: "Eine Nacht kostenlos, und die Sache ist erledigt. Sonst gibt es einen Stern — überall.",
en: "One night free and the matter is settled. Otherwise it is one star — everywhere.",
id: "Satu malam gratis, dan urusan selesai. Kalau tidak, bintang satu — di mana-mana."
},
options: [
{
id: "a",
label: {
de: "Ruhig bleiben, ans ruhigere Ende des Tresens bitten und aufmerksam zuhören, mit Notizblock bereit.",
en: "Stay calm, invite him to the quieter end of the desk, and listen attentively with a notepad ready.",
id: "Tetap tenang, mempersilakan beliau ke ujung meja yang lebih sepi, dan mendengarkan saksama dengan buku catatan siap."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Genau richtig: Sie nehmen Tempo und Publikum aus der Szene, und der Notizblock signalisiert, dass Substanz zählt (P4).",
en: "Exactly right: you take speed and audience out of the scene, and the notepad signals that substance counts (P4).",
id: "Tepat sekali: Anda mengeluarkan tempo dan penonton dari panggung, dan buku catatan menandakan bahwa substansi yang dihitung (P4)."
},
next: "n2"
},
{
id: "b",
label: {
de: "Sachlich erklären, dass Sie zuerst die Beschwerdepunkte aufnehmen müssen, bevor über irgendetwas gesprochen wird.",
en: "Explain matter-of-factly that you must first record the complaint points before anything is discussed.",
id: "Menjelaskan datar bahwa Anda harus mencatat poin keluhan dahulu sebelum apa pun dibicarakan."
},
scores: { d: 1, l: 1, s: 2 },
feedback: {
de: "Der Prozess stimmt, die Verpackung nicht: Vor Publikum klingt „zuerst das Verfahren“ wie eine Abfuhr. Ein zugewandter Einstieg abseits wäre konfliktärmer gewesen (P4).",
en: "The process is right, the packaging is not: in front of an audience, “procedure first” sounds like a brush-off. A warmer opening aside would have caused less friction (P4).",
id: "Prosesnya benar, kemasannya tidak: di depan umum, “prosedur dahulu” terdengar seperti penolakan. Pembukaan lebih hangat di samping akan mengurangi gesekan (P4)."
},
next: "n2"
},
{
id: "c",
label: {
de: "Klarstellen, dass das nach Erpressung klingt und Sie sich so nicht behandeln lassen.",
en: "Make clear that this sounds like blackmail and you will not be treated this way.",
id: "Menegaskan bahwa itu terdengar seperti pemerasan dan Anda tidak mau diperlakukan begitu."
},
scores: { d: 0, l: 0, s: 1 },
feedback: {
de: "Selbst wenn der Eindruck stimmt: „Erpressung“ vor Publikum macht aus der Forderung ein Duell. Ihre Aufgabe ist Deeskalation und Substanzklärung; das Verhalten bewertet die Leitung (P4, P5).",
en: "Even if the impression is accurate: “blackmail” before an audience turns a demand into a duel. Your job is de-escalation and establishing substance; judging the behaviour belongs to the manager (P4, P5).",
id: "Sekalipun kesannya benar: kata “pemerasan” di depan umum mengubah tuntutan menjadi duel. Tugas Anda meredakan dan menjernihkan substansi; menilai perilaku adalah wewenang atasan (P4, P5)."
},
next: "n2"
},
{
id: "d",
label: {
de: "Verständnisvoll nicken und andeuten, dass sich „sicher eine Lösung finden lässt“.",
en: "Nod sympathetically and hint that “a solution can surely be found”.",
id: "Mengangguk penuh pengertian dan mengisyaratkan bahwa “solusi pasti bisa dicari”."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Gefährlich vage: „Sicher eine Lösung“ hört Herr Brandt als halbe Zusage der Gratisnacht. Wärme ja — aber ohne Andeutungen, die Sie später einlösen müssten (P4, P5).",
en: "Dangerously vague: Mr Brandt hears “surely a solution” as half a promise of the free night. Warmth, yes — but without hints you would later have to honour (P4, P5).",
id: "Berbahaya karena kabur: “pasti ada solusi” didengar Bapak Brandt sebagai setengah janji malam gratis. Kehangatan boleh — tetapi tanpa isyarat yang kelak harus Anda tebus (P4, P5)."
},
next: "n2"
}
]
},
n2: {
type: "decision",
phase: { de: "Substanz klären", en: "Establishing substance", id: "Klarifikasi substansi" },
narration: {
de: "Am ruhigeren Ende des Tresens wiederholt Herr Brandt seine Forderung. Auf die „Ärgernisse“ angesprochen, bleibt er allgemein: „Na, alles eben.“ Jetzt entscheidet Ihre Fragetechnik, ob Substanz sichtbar wird.",
en: "At the quieter end of the desk, Mr Brandt repeats his demand. Asked about the “annoyances”, he stays general: “Well, everything really.” Your questioning technique now decides whether substance becomes visible.",
id: "Di ujung meja yang lebih sepi, Bapak Brandt mengulangi tuntutannya. Ditanya soal “gangguan”, beliau menjawab umum: “Ya, semuanya, pokoknya.” Teknik bertanya Anda kini menentukan apakah substansi akan terlihat."
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Konkret und offen fragen: Was genau ist wann passiert, in welchem Zimmer, und wurde es schon gemeldet?",
en: "Ask concretely and openly: what exactly happened, when, in which room, and was it reported before?",
id: "Bertanya konkret dan terbuka: apa persisnya yang terjadi, kapan, di kamar mana, dan apakah sudah pernah dilaporkan?"
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Vorbildlich: Präzise, respektvolle Fragen trennen Substanz von Kulisse — Konkretes können Sie lösen, Vages verliert als Druckmittel an Kraft (P4).",
en: "Exemplary: precise, respectful questions separate substance from scenery — the concrete you can solve, the vague loses its force as leverage (P4).",
id: "Teladan: pertanyaan presisi dan hormat memisahkan substansi dari dekorasi — yang konkret dapat Anda selesaikan, yang kabur kehilangan daya tekannya (P4)."
},
next: "n3"
},
{
id: "b",
label: {
de: "Das Beschwerdeformular hervorholen und die Standardfelder eines nach dem anderen abfragen.",
en: "Take out the complaint form and work through the standard fields one after another.",
id: "Mengambil formulir keluhan dan menanyakan kolom-kolom standarnya satu per satu."
},
scores: { d: 1, l: 1, s: 2 },
feedback: {
de: "Dokumentation ist gut (P6) — aber ein Formular verhört, ein Gespräch klärt: Bei einem aufgebrachten Gast öffnen offene Fragen mehr als Standardfelder.",
en: "Documentation is good (P6) — but a form interrogates while a conversation clarifies: with an agitated guest, open questions unlock more than standard fields.",
id: "Dokumentasi itu baik (P6) — tetapi formulir menginterogasi, sedangkan percakapan menjernihkan: pada tamu yang emosi, pertanyaan terbuka membuka lebih banyak daripada kolom standar."
},
next: "n3"
},
{
id: "c",
label: {
de: "Die Detailfragen überspringen und direkt fragen, womit er denn zufrieden wäre.",
en: "Skip the detail questions and ask directly what would satisfy him.",
id: "Melewati pertanyaan rinci dan langsung menanyakan apa yang akan membuat beliau puas."
},
scores: { d: 0, l: 1, s: 1 },
feedback: {
de: "Damit verhandeln Sie über eine Beschwerde, deren Inhalt Sie nicht kennen — die absehbare Antwort: „die Gratisnacht“. Ohne Substanzklärung wird jede Lösung zur Preisverhandlung (P4).",
en: "You are now negotiating over a complaint whose content you do not know — the predictable answer: “the free night”. Without establishing substance, every solution becomes price haggling (P4).",
id: "Dengan itu Anda menawar keluhan yang isinya belum diketahui — jawabannya mudah ditebak: “malam gratis”. Tanpa klarifikasi substansi, setiap solusi menjadi tawar-menawar harga (P4)."
},
next: "n3"
},
{
id: "d",
label: {
de: "Mitfühlend allgemein bleiben: bedauern, dass der Aufenthalt nicht angenehm war, ohne Details zu erfragen.",
en: "Stay sympathetically general: regret that the stay was not pleasant, without asking for details.",
id: "Tetap umum dengan empati: menyesalkan bahwa menginapnya kurang nyaman, tanpa menggali rincian."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Der warme Ton hilft — aber ohne Details bleibt die Beschwerde ein Nebel, in dem die Forderung wächst. Empathie öffnet die Tür; hindurch führen konkrete Fragen (P4).",
en: "The warm tone helps — but without details the complaint stays a fog in which the demand grows. Empathy opens the door; concrete questions walk through it (P4).",
id: "Nada hangat itu membantu — tetapi tanpa rincian, keluhan tetap kabut yang di dalamnya tuntutan membesar. Empati membuka pintu; pertanyaan konkret yang melangkah masuk (P4)."
},
next: "n3"
}
]
},
n3: {
type: "decision",
phase: { de: "Verhältnismäßiges Angebot", en: "Proportionate offer", id: "Tawaran proporsional" },
narration: {
de: "Die Klärung ergibt zwei belegbare Punkte: gestern fiel die Klimaanlage einige Stunden aus, heute früh blieb der zugesagte Weckruf aus. Ärgerlich — aber weit vom Gegenwert einer Gratisnacht. Herr Brandt wartet auf Ihr Angebot.",
en: "The clarification yields two verifiable points: yesterday the air conditioning failed for a few hours, and this morning the promised wake-up call did not happen. Annoying — but far from the value of a free night. Mr Brandt awaits your offer.",
id: "Klarifikasi menghasilkan dua poin terbukti: kemarin pendingin udara mati beberapa jam, dan tadi pagi panggilan bangun yang dijanjikan terlewat. Menjengkelkan — tetapi jauh dari nilai satu malam gratis. Bapak Brandt menunggu tawaran Anda."
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Sich für beide Punkte entschuldigen und eine Wiedergutmachung im Rahmen Ihrer Befugnis anbieten, klar begründet.",
en: "Apologise for both points and offer a remedy within your authority, clearly explained.",
id: "Meminta maaf atas kedua poin itu dan menawarkan kompensasi dalam batas kewenangan Anda, dengan alasan yang jelas."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Genau richtig: Die belegten Punkte werden anerkannt und verhältnismäßig ausgeglichen — in Ihrer Befugnis, mit Begründung (P4, P5); die Gratisnacht-Forderung bleibt davon getrennt.",
en: "Exactly right: the verified points are acknowledged and remedied proportionately — within your authority, with reasons (P4, P5); the free-night demand stays separate from it.",
id: "Tepat sekali: poin yang terbukti diakui dan dikompensasi proporsional — dalam kewenangan, dengan alasan (P4, P5); tuntutan malam gratis tetap terpisah darinya."
},
next: "n4"
},
{
id: "b",
label: {
de: "Die Gratisnacht gewähren — der Ausfall der Klimaanlage gibt der Forderung ja einen Anlass.",
en: "Grant the free night — the air-conditioning failure does give the demand a pretext, after all.",
id: "Mengabulkan malam gratis — toh matinya pendingin udara memberi alasan bagi tuntutannya."
},
scores: { d: 1, l: 1, s: 0 },
feedback: {
de: "Damit überschreiten Sie Ihre Befugnis und belohnen die Drohkulisse statt der Sachlage (P5). Zwei belegte Ärgernisse rechtfertigen eine verhältnismäßige Geste — die Gratisnacht wäre Sache der Leitung.",
en: "This exceeds your authority and rewards the threat scenery rather than the facts (P5). Two verified annoyances justify a proportionate gesture — a free night would be the manager's decision.",
id: "Itu melampaui kewenangan Anda dan mengganjar panggung ancaman, bukan faktanya (P5). Dua gangguan terbukti sepadan dengan kompensasi proporsional — malam gratis adalah keputusan atasan."
},
next: "n4"
},
{
id: "c",
label: {
de: "Nichts anbieten und erklären, Bewertungen änderten an den Fakten ohnehin nichts.",
en: "Offer nothing and explain that reviews change nothing about the facts anyway.",
id: "Tidak menawarkan apa pun dan menjelaskan bahwa ulasan toh tidak mengubah fakta."
},
scores: { d: 0, l: 0, s: 1 },
feedback: {
de: "Die zwei belegten Punkte verdienen eine Antwort — unabhängig von jeder Drohung. Wer berechtigte Anliegen wegen ihrer Verpackung abweist, macht aus einem schwierigen Gast einen zu Recht verärgerten (P4).",
en: "The two verified points deserve a response — independent of any threat. Dismissing legitimate concerns over their wrapping turns a difficult guest into a justifiably angry one (P4).",
id: "Dua poin terbukti itu layak dijawab — terlepas dari ancaman apa pun. Menolak keluhan sah karena kemasannya buruk mengubah tamu sulit menjadi tamu yang marah dengan alasan sah (P4)."
},
next: "n4"
},
{
id: "d",
label: {
de: "Freundlich einen Begrüßungsgutschein der Hotelbar anbieten, ohne auf die zwei Punkte einzugehen.",
en: "Warmly offer a welcome voucher for the hotel bar, without addressing the two points.",
id: "Dengan ramah menawarkan voucer sambutan bar hotel tanpa menyinggung kedua poin tadi."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Nett gemeint, aber unverbunden: Die Geste hat mit Klimaanlage und Weckruf nichts zu tun und wirkt wie Ablenkung. Wiedergutmachung überzeugt, wenn sie zur Sache passt (P4).",
en: "Kindly meant but disconnected: the gesture has nothing to do with air conditioning or wake-up call and feels like a diversion. A remedy convinces when it fits the matter (P4).",
id: "Niatnya baik tetapi tak nyambung: gestur itu tak berkaitan dengan pendingin udara maupun panggilan bangun, dan terasa seperti pengalihan. Kompensasi meyakinkan bila sesuai perkaranya (P4)."
},
next: "n4"
}
]
},
n4: {
type: "decision",
phase: { de: "Druck standhalten", en: "Holding under pressure", id: "Menghadapi tekanan" },
narration: {
de: "Herr Brandt schiebt Ihr Angebot beiseite: „Das ist ein Witz.“ Er hebt sein Telefon: „Die Bewertung ist in zwei Minuten online. Letzte Chance: die Nacht kostenlos.“ Zwei Gäste in der Nähe hören inzwischen offen zu.",
en: "Mr Brandt pushes your offer aside: “That is a joke.” He raises his phone: “The review goes online in two minutes. Last chance: the night free.” Two nearby guests are now openly listening.",
id: "Bapak Brandt menepis tawaran Anda: “Yang benar saja.” Beliau mengangkat ponselnya: “Ulasannya tayang dua menit lagi. Kesempatan terakhir: malam ini gratis.” Dua tamu di dekat situ kini terang-terangan menyimak."
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Ruhig bleiben: das Angebot und seine Begründung wiederholen und die Bewertungsentscheidung ausdrücklich bei ihm lassen.",
en: "Stay calm: repeat the offer and its reasons, and explicitly leave the review decision with him.",
id: "Tetap tenang: mengulangi tawaran beserta alasannya, dan secara tegas menyerahkan keputusan ulasan kepada beliau."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Souverän: Sie bleiben freundlich, halten die begründete Linie und machen die Bewertung zu dem, was sie ist — seine freie Entscheidung, kein Tauschobjekt (P5).",
en: "Composed: you stay friendly, hold the factually grounded line, and make the review what it is — his free decision, not a bargaining chip (P5).",
id: "Berwibawa: Anda tetap ramah, memegang garis yang berdasar fakta, dan mengembalikan ulasan pada hakikatnya — keputusan bebas beliau, bukan alat tukar (P5)."
},
next: "n5"
},
{
id: "b",
label: {
de: "Nachgeben und die Gratisnacht doch gewähren, bevor die Bewertung online geht.",
en: "Give in and grant the free night after all, before the review goes online.",
id: "Menyerah dan mengabulkan malam gratis sebelum ulasannya tayang."
},
scores: { d: 1, l: 1, s: 0 },
feedback: {
de: "Damit kauft Ihr Haus eine Bewertung — außerhalb Ihrer Befugnis und mit Signalwirkung: Druck wirkt hier. Halten Sie die Linie und eskalieren Sie stattdessen (P5).",
en: "Your hotel is now buying a review — beyond your authority and with a signal attached: pressure works here. Hold the reasoned line and escalate instead (P5).",
id: "Dengan itu hotel Anda membeli sebuah ulasan — di luar kewenangan dan dengan pesan tersirat: tekanan mempan di sini. Pegang garis dan eskalasikan saja (P5)."
},
next: "n5"
},
{
id: "c",
label: {
de: "Kontern: Dann werde das Haus öffentlich auf die Bewertung antworten und seine Forderung publik machen.",
en: "Counter: then the hotel will reply publicly to the review and make his demand public.",
id: "Membalas: kalau begitu hotel akan menanggapi ulasannya secara terbuka dan membeberkan tuntutannya."
},
scores: { d: 0, l: 0, s: 1 },
feedback: {
de: "Eine Gegendrohung macht Sie zum Teilnehmer des Duells — vor Publikum und im Namen des Hauses. Öffentliche Antworten sind Sache der Leitung; Ihre Stärke ist die ruhige Linie (P4, P5).",
en: "A counter-threat makes you a participant in the duel — in front of an audience and in the hotel's name. Public replies are the manager's business; your strength is the calm line (P4, P5).",
id: "Ancaman balasan menjadikan Anda peserta duel — di depan umum dan atas nama hotel. Tanggapan publik adalah urusan atasan; kekuatan Anda adalah garis yang tenang (P4, P5)."
},
next: "n5"
},
{
id: "d",
label: {
de: "Immer wieder um Verständnis bitten und sich entschuldigen, ohne eine klare Position zu beziehen.",
en: "Keep asking for understanding and apologising, without taking a clear position.",
id: "Terus meminta pengertian dan meminta maaf tanpa mengambil posisi yang jelas."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Höflich, aber ohne Halt: Endlose Entschuldigungen ohne Linie laden zum Nachfassen ein. Freundlichkeit braucht ein Rückgrat: Angebot, Begründung, Grenze (P5).",
en: "Polite but without footing: endless apologies with no line invite another push. Friendliness needs a spine: offer, reasons, limit (P5).",
id: "Sopan tetapi tanpa pijakan: permintaan maaf tanpa garis mengundang desakan berikutnya. Keramahan memerlukan tulang punggung: tawaran, alasan, batas (P5)."
},
next: "n5"
}
]
},
n5: {
type: "decision",
phase: { de: "Eskalation & Dokumentation", en: "Escalation & documentation", id: "Eskalasi & dokumentasi" },
narration: {
de: "Herr Brandt gibt nicht nach: „Dann will ich sofort jemanden sprechen, der hier wirklich etwas entscheiden kann.“ Die Leitung ist im Haus. Wie übergeben Sie den Fall?",
en: "Mr Brandt does not relent: “Then I want to speak to someone who can actually decide things here, right now.” The manager is in the building. How do you hand over the case?",
id: "Bapak Brandt tidak surut: “Kalau begitu saya mau bicara sekarang dengan orang yang benar-benar bisa memutuskan di sini.” Atasan ada di dalam gedung. Bagaimana Anda menyerahkan kasus ini?"
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Die Leitung holen und ihr den Fall mit notierten Fakten, Angebot und Forderung knapp und neutral übergeben.",
en: "Fetch the manager and hand over the case briefly and neutrally, with noted facts, offer and demand.",
id: "Memanggil atasan dan menyerahkan kasus secara ringkas dan netral, lengkap dengan fakta tercatat, tawaran, dan tuntutan."
},
scores: { d: 2, l: 2, s: 2 },
flags: { escalate: true },
feedback: {
de: "Vorbildlich: Der Wunsch nach der Leitung ist legitim, und Ihre dokumentierte Übergabe — Fakten, Angebot, Forderung — macht die Entscheidung dort schnell und fundiert (P5, P6).",
en: "Exemplary: asking for the manager is legitimate, and your documented handover — facts, offer, demand — makes the decision there fast and well-founded (P5, P6).",
id: "Teladan: permintaan bertemu atasan itu sah, dan serah terima terdokumentasi Anda — fakta, tawaran, tuntutan — membuat keputusan di sana cepat dan berdasar (P5, P6)."
},
next: "x1"
},
{
id: "b",
label: {
de: "Zusagen, dass die Leitung ihn später anruft, und den Vorfall nur mündlich einer Kollegin erwähnen.",
en: "Promise that the manager will call him later, and mention the incident only verbally to a colleague.",
id: "Menjanjikan bahwa atasan akan menelepon beliau nanti, dan hanya menyebut insiden ini secara lisan kepada seorang rekan."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Der Rückruf ist möglich — aber „später“ verlängert den Konflikt bei erreichbarer Leitung, und eine mündliche Randnotiz ersetzt kein Protokoll (P6); direkt übergeben ist schneller und sicherer.",
en: "A call back is possible — but “later” prolongs the conflict with the manager in the building, and a verbal aside is no substitute for a record (P6); a direct handover is faster and safer.",
id: "Telepon balik memang mungkin — tetapi “nanti” memperpanjang konflik padahal atasan ada di gedung, dan selentingan lisan bukan pengganti catatan (P6); serah terima langsung lebih cepat dan aman."
},
next: "x2"
},
{
id: "c",
label: {
de: "Erklären, die Leitung sei nicht zu sprechen, und das Gespräch damit beenden.",
en: "Say the manager is not available and end the conversation with that.",
id: "Mengatakan atasan tidak dapat ditemui dan mengakhiri percakapan begitu saja."
},
scores: { d: 0, l: 1, s: 1 },
feedback: {
de: "Eine erreichbare Leitung zu verleugnen ist unwahr und nimmt dem Gast den legitimen Eskalationsweg. Eskalation ist hier keine Niederlage, sondern das Verfahren (P5).",
en: "Denying that a reachable manager exists is untrue and removes the guest's legitimate escalation path. Escalation here is not defeat, it is the procedure (P5).",
id: "Menyangkal keberadaan atasan yang sebenarnya ada itu tidak jujur dan menutup jalur eskalasi tamu yang sah. Eskalasi di sini bukan kekalahan, melainkan prosedurnya (P5)."
},
next: "x3"
}
]
},
x1: {
type: "outcome",
tone: "good",
ending: {
de: "Die Leitung übernimmt mit Ihren Notizen — und entscheidet auf derselben Linie: Wiedergutmachung für das Belegte, keine Gratisnacht auf Zuruf. Herr Brandt zieht grummelnd ab; ob er bewertet, bleibt offen. Substanz gelöst, Druck wirkungslos, alles dokumentiert.",
en: "The manager takes over with your notes — and decides along the same line: a remedy for what was verified, no free night on demand. Mr Brandt stalks off grumbling; whether he posts a review stays open. Substance resolved, pressure did not work, everything documented.",
id: "Atasan mengambil alih dengan bekal catatan Anda — dan memutuskan pada garis yang sama: kompensasi untuk yang terbukti, tanpa malam gratis karena desakan. Bapak Brandt pergi sambil menggerutu; jadi tidaknya ulasan itu tak pasti. Substansi selesai, tekanan tidak mempan, semuanya terdokumentasi."
}
},
x2: {
type: "outcome",
tone: "mixed",
ending: {
de: "Der Abend endet ohne Eklat, doch mit offenen Enden: eine Zusage zu viel, eine Übergabe zu wenig, ein Fall nur in Erinnerung. Tritt Herr Brandt morgen erneut auf — oder erscheint die Bewertung —, fehlt das Fundament von heute. Die Linie war da; die Sicherung fehlte.",
en: "The evening ends without a scene, but with loose ends: one promise too many, one handover too few, a case that lives only in memory. If Mr Brandt returns tomorrow — or the review appears — today's foundation is missing. The line was there; the securing was not.",
id: "Malam berakhir tanpa keributan, tetapi menyisakan ujung terbuka: satu janji berlebih, satu serah terima kurang, kasus yang hanya hidup dalam ingatan. Bila besok Bapak Brandt datang lagi — atau ulasannya terbit — fondasi hari ini tak ada. Garisnya sudah ada; pengamanannya belum."
}
},
x3: {
type: "outcome",
tone: "poor",
ending: {
de: "Herr Brandt verlässt den Tresen im Zorn — und diesmal liefert der Abend selbst den Stoff für seine Bewertung: abgewiesene Anliegen, Konfrontation oder verleugnete Leitung. Merken Sie sich die Mechanik: Substanz klären, verhältnismäßig lösen, Druck aushalten, dokumentiert eskalieren (P4, P5, P6).",
en: "Mr Brandt leaves the desk in anger — and this time the evening itself supplies the material for his review: dismissed concerns, a confrontation, or a denied manager. Remember the mechanics: establish substance, resolve proportionately, withstand pressure, escalate documented (P4, P5, P6).",
id: "Bapak Brandt meninggalkan meja dengan marah — dan kali ini malam itu sendiri yang menyediakan bahan ulasannya: keluhan yang ditolak, konfrontasi, atau atasan yang disangkal. Ingatlah mekanismenya: jernihkan substansi, selesaikan proporsional, tahan tekanan, eskalasikan dengan dokumentasi (P4, P5, P6)."
}
}
},
debrief: {
tips: {
decision: {
de: "Behandeln Sie Forderung und Beschwerde getrennt: Substanz klären, verhältnismäßig lösen — die Kompensation richtet sich nach den Fakten, nie nach der Lautstärke der Drohung.",
en: "Treat demand and complaint separately: establish substance, resolve proportionately — the remedy follows the facts, never the volume of the threat.",
id: "Perlakukan tuntutan dan keluhan secara terpisah: jernihkan substansi, selesaikan proporsional — besar kompensasi mengikuti fakta, bukan kerasnya ancaman."
},
language: {
de: "Bleiben Sie unter Druck bei ruhigen, wiederholbaren Sätzen: Angebot, Begründung, Grenze. Wer laut wird oder endlos um Verständnis bittet, gibt die Gesprächsführung ab.",
en: "Under pressure, keep to calm, repeatable sentences: offer, reasons, limit. Raising your voice or endlessly pleading for understanding hands over control of the conversation.",
id: "Di bawah tekanan, gunakan kalimat tenang yang dapat diulang: tawaran, alasan, batas. Meninggikan suara atau terus memohon pengertian berarti menyerahkan kendali percakapan."
},
sop: {
de: "Notieren Sie im Gespräch Fakten, Angebote und Forderungen: Das macht Ihre Eskalation schnell — und schützt Sie, falls der Fall später öffentlich oder intern aufgerollt wird (P6).",
en: "Note facts, offers and demands as you talk: they make your escalation fast — and protect you if the case is later reopened publicly or internally (P6).",
id: "Catat fakta, tawaran, dan tuntutan selama percakapan: itu membuat eskalasi Anda cepat — dan melindungi Anda bila kasus kelak dibuka kembali secara publik maupun internal (P6)."
}
},
safetyTip: {
de: "Tauschen Sie nie Leistungen außerhalb Ihrer Befugnis gegen das Versprechen einer guten oder unterlassenen Bewertung: Was Sie unter Druck einmal zahlen, wird zur Eintrittskarte für die nächste Forderung (P5).",
en: "Never trade benefits beyond your authority for the promise of a good or withheld review: what you pay under pressure once becomes the ticket for the next demand (P5).",
id: "Jangan pernah menukar fasilitas di luar kewenangan Anda dengan janji ulasan baik atau batalnya ulasan buruk: yang sekali Anda bayar di bawah tekanan akan menjadi tiket bagi tuntutan berikutnya (P5)."
},
praise: {
de: "Ausgezeichnet: Substanz von Druck getrennt, die Linie freundlich gehalten, sauber dokumentiert eskaliert — eines der schwersten Gespräche am Empfang; üben Sie es auch in den anderen Sprachen.",
en: "Excellent: you separated substance from pressure, held the line with courtesy, and escalated cleanly documented — one of the hardest desk conversations; practise it in the other languages too.",
id: "Luar biasa: Anda memisahkan substansi dari tekanan, menjaga garis dengan santun, dan mengeskalasi dengan dokumentasi rapi — salah satu percakapan tersulit di meja depan; latih juga dalam bahasa lainnya."
}
},
sopRefs: ["P4", "P5", "P6"]
};
})();
