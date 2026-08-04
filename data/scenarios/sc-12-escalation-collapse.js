(function () {
"use strict";
window.HSL = window.HSL || {};
var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
data.scenarios["sc-12-escalation-collapse"] = {
id: "sc-12-escalation-collapse",
category: "escalation",
difficulty: 3,
minutes: 6,
title: {
de: "Bewusstloser Gast in der Lobby",
en: "Unconscious Guest in the Lobby",
id: "Tamu Tidak Sadarkan Diri di Lobi"
},
summary: {
de: "Eine Frau bricht in der Lobby zusammen — jetzt zählen Notruf, Ruhe und klare Aufgaben.",
en: "A woman collapses in the lobby — now the emergency call, calm and clear tasks are what count.",
id: "Seorang tamu terjatuh tak sadarkan diri di lobi — kini panggilan darurat, ketenangan, dan pembagian tugas yang jelas menjadi penentu."
},
context: {
place: {
de: "Lobby Ihres Hauses, 21:15; ruhiger Abendbetrieb.",
en: "The lobby of your hotel, 21:15; a quiet evening.",
id: "Lobi hotel Anda, pukul 21:15; suasana malam yang tenang."
},
situation: {
de: "Frau Lindqvist schwankt auf dem Weg zum Aufzug, stürzt und reagiert nicht auf Ansprache. Mehrere Gäste bleiben stehen und schauen.",
en: "On her way to the lift, Ms Lindqvist sways, falls, and does not respond when spoken to. Several guests stop and watch.",
id: "Dalam perjalanan menuju lift, Ibu Lindqvist limbung, terjatuh, dan tidak merespons saat diajak bicara. Beberapa tamu berhenti dan menonton."
},
guest: {
de: "Frau Lindqvist, etwa 60, alleinreisend; mehr wissen Sie in diesem Moment nicht.",
en: "Ms Lindqvist, around 60, travelling alone; more than that you do not know at this moment.",
id: "Ibu Lindqvist, sekitar 60 tahun, bepergian sendiri; lebih dari itu Anda belum tahu apa-apa saat ini."
},
constraints: {
de: "Sie sind allein am Empfang; die Dienstleitung ist nur telefonisch erreichbar. In der Lobby stehen Gäste — und ein Kollege vom Restaurant ist in Rufweite.",
en: "You are alone at the desk; the duty manager can only be reached by phone. Guests are standing in the lobby — and a colleague from the restaurant is within calling distance.",
id: "Anda sendirian di meja resepsionis; penanggung jawab hanya dapat dihubungi lewat telepon. Tamu-tamu berdiri di lobi — dan seorang rekan dari restoran berada dalam jangkauan panggilan."
}
},
goals: [
{
de: "Im Notfall sofort 112 rufen und beim Gast bleiben (P7).",
en: "In an emergency, call 112 at once and stay with the guest (P7).",
id: "Dalam keadaan darurat, segera hubungi 112 dan tetap bersama tamu (P7)."
},
{
de: "Helfer mit klaren, konkreten Aufgaben koordinieren.",
en: "Coordinate helpers with clear, concrete tasks.",
id: "Mengoordinasikan para penolong dengan tugas yang jelas dan konkret."
},
{
de: "Würde des Gastes wahren, dann sauber übergeben und dokumentieren (P5, P6).",
en: "Protect the guest's dignity, then hand over and document properly (P5, P6).",
id: "Menjaga martabat tamu, lalu melakukan serah terima dan dokumentasi dengan rapi (P5, P6)."
}
],
startNode: "n1",
nodes: {
n1: {
type: "decision",
phase: { de: "Erste Reaktion", en: "First response", id: "Reaksi pertama" },
narration: {
de: "21:15. Ein dumpfer Laut — Frau Lindqvist liegt neben dem Aufzug am Boden und reagiert nicht, als eine Umstehende sie anspricht. Für einen Herzschlag ist die Lobby vollkommen still. Alle Blicke wandern zu Ihnen am Empfang.",
en: "21:15. A dull thud — Ms Lindqvist is lying on the floor next to the lift and does not respond when a bystander speaks to her. For one heartbeat the lobby is completely silent. Every pair of eyes turns to you at the desk.",
id: "Pukul 21:15. Terdengar bunyi jatuh — Ibu Lindqvist tergeletak di lantai dekat lift dan tidak merespons ketika seorang tamu menyapanya. Sesaat lobi benar-benar sunyi. Semua mata beralih kepada Anda di meja resepsionis."
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Sofort 112 wählen, zur Gästin gehen und bis zum Eintreffen der Rettungskräfte bei ihr bleiben.",
en: "Dial 112 at once, go to the guest, and stay with her until the emergency services arrive.",
id: "Segera menelepon 112, menghampiri tamu itu, dan tetap bersamanya sampai petugas darurat tiba."
},
scores: { d: 2, l: 2, s: 2 },
flags: { escalate: true },
feedback: {
de: "Genau richtig: Bei einer reglosen Person zählt der sofortige Notruf — 112 stellt die Fragen, Sie antworten und bleiben bei der Gästin (P7). Alles Medizinische gehört den Profis und Ihrer Erste-Hilfe-Ausbildung; Ihre Aufgabe ist Alarm, Nähe, Ruhe.",
en: "Exactly right: with an unresponsive person, the immediate emergency call is what counts — 112 asks the questions, you answer and stay with the guest (P7). Everything medical belongs to the professionals and your first-aid training; your job is alarm, presence, calm.",
id: "Tepat sekali: pada orang yang tidak merespons, panggilan darurat segera adalah yang utama — 112 yang bertanya, Anda menjawab dan tetap di sisi tamu (P7). Segala hal medis adalah ranah petugas dan pelatihan pertolongan pertama resmi Anda; tugas Anda adalah alarm, kehadiran, ketenangan."
},
next: "n2"
},
{
id: "b",
label: {
de: "Erst am Telefon rasch die Symptome im Internet suchen, um einzuschätzen, ob ein Notruf wirklich nötig ist.",
en: "First quickly look up the symptoms on your phone to judge whether an emergency call is really necessary.",
id: "Lebih dahulu mencari gejalanya di internet lewat ponsel untuk menilai apakah panggilan darurat benar-benar diperlukan."
},
scores: { d: 0, l: 1, s: 0 },
flags: { unsafe: true },
feedback: {
de: "Verzögern Sie den Notruf niemals für eigene Einschätzungen oder eine Internetsuche: Bei einer reglosen Person ist 112 sofort die einzige richtige Nummer (P7). Die Beurteilung übernehmen die Fachleute am Telefon — jede verlorene Minute geht zu Lasten der Gästin.",
en: "Never delay the emergency call for your own assessment or an internet search: with an unresponsive person, dialling 112 immediately is the only right move (P7). The professionals on the line do the assessing — every lost minute is at the guest's expense.",
id: "Jangan pernah menunda panggilan darurat demi penilaian sendiri atau pencarian internet: pada orang yang tidak merespons, menelepon 112 saat itu juga adalah satu-satunya langkah yang benar (P7). Penilaian dilakukan petugas di telepon — setiap menit yang hilang menjadi beban bagi tamu."
},
next: "n2"
},
{
id: "c",
label: {
de: "Zuerst die Dienstleitung anrufen und fragen, wie Sie in diesem Fall vorgehen sollen.",
en: "Call the duty manager first and ask how you should proceed in this case.",
id: "Menelepon penanggung jawab lebih dahulu dan menanyakan bagaimana Anda harus bertindak."
},
scores: { d: 1, l: 1, s: 1 },
feedback: {
de: "Die Leitung gehört informiert — aber als zweiter Anruf, nie als erster: Im Notfall steht 112 vor jeder internen Meldung (P7). Die Rückversicherung kostet genau die Minuten, die jetzt am meisten wert sind.",
en: "The manager must be informed — but as the second call, never the first: in an emergency, 112 comes before any internal report (P7). Seeking reassurance costs exactly the minutes that are worth most right now.",
id: "Penanggung jawab memang harus diberi tahu — tetapi sebagai telepon kedua, bukan yang pertama: dalam keadaan darurat, 112 mendahului laporan internal mana pun (P7). Mencari kepastian dahulu justru menghabiskan menit-menit yang paling berharga."
},
next: "n2"
},
{
id: "d",
label: {
de: "Laut in die Lobby fragen, ob eine Ärztin oder ein Arzt anwesend ist, bevor Sie zum Telefon greifen.",
en: "Ask loudly whether a doctor is present in the lobby before reaching for the phone.",
id: "Bertanya lantang apakah ada dokter di lobi sebelum Anda meraih telepon."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Nach medizinisch geschulten Personen zu fragen kann helfen — aber es ersetzt den Notruf nicht und darf ihn nicht verzögern: Erst 112, dann alle weiteren Rufe (P7).",
en: "Asking for medically trained people can help — but it does not replace the emergency call and must not delay it: 112 first, every other call after (P7).",
id: "Mencari orang dengan pelatihan medis bisa membantu — tetapi itu tidak menggantikan panggilan darurat dan tidak boleh menundanya: 112 dahulu, panggilan lain menyusul (P7)."
},
next: "n2"
}
]
},
n2: {
type: "decision",
phase: { de: "Hilfe koordinieren", en: "Coordinating help", id: "Koordinasi bantuan" },
narration: {
de: "Die 112 ist verständigt; die Leitstelle bleibt in der Leitung, der Rettungswagen ist unterwegs. Sie knien neben Frau Lindqvist. Um Sie herum: unschlüssige Gäste, Ihr Kollege aus dem Restaurant in Rufweite — und ein Eingang, den die Rettungskräfte gleich finden müssen.",
en: "112 has been alerted; the dispatcher stays on the line and the ambulance is on its way. You kneel beside Ms Lindqvist. Around you: hesitant guests, your colleague from the restaurant within calling distance — and an entrance the emergency crew will need to find in a few minutes.",
id: "112 sudah dihubungi; petugas pusat tetap tersambung dan ambulans dalam perjalanan. Anda berlutut di samping Ibu Lindqvist. Di sekitar Anda: tamu-tamu yang kebingungan, rekan Anda dari restoran dalam jangkauan panggilan — dan pintu masuk yang sebentar lagi harus ditemukan petugas."
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Konkrete Aufgaben verteilen: der Kollege weist am Eingang den Rettungsweg, ein Gast hält den Bereich frei — Sie bleiben bei ihr.",
en: "Assign concrete tasks: your colleague guides the crew from the entrance, one guest keeps the area clear — you stay with her.",
id: "Membagi tugas konkret: rekan Anda memandu petugas dari pintu masuk, satu tamu menjaga area tetap lapang — Anda tetap di sisi beliau."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Vorbildlich: Namentliche, konkrete Aufträge verwandeln unschlüssige Umstehende in ein funktionierendes Team — Einweisung am Eingang, freier Bereich, Sie als konstanter Ankerpunkt bei der Gästin (P7).",
en: "Exemplary: named, concrete assignments turn hesitant bystanders into a working team — guidance at the entrance, a clear area, you as the constant anchor beside the guest (P7).",
id: "Teladan: penugasan yang konkret dan tertuju mengubah orang-orang yang ragu menjadi tim yang berfungsi — pemandu di pintu masuk, area yang lapang, dan Anda sebagai jangkar tetap di sisi tamu (P7)."
},
next: "n3"
},
{
id: "b",
label: {
de: "Alles selbst übernehmen: zwischen Gästin, Eingang und Empfang pendeln, um jede Aufgabe im Blick zu behalten.",
en: "Take on everything yourself: shuttle between the guest, the entrance and the desk to keep every task in view.",
id: "Menangani semuanya sendiri: bolak-balik antara tamu, pintu masuk, dan meja resepsionis agar semua tugas terpantau."
},
scores: { d: 1, l: 1, s: 1 },
feedback: {
de: "Verantwortungsgefühl ja, Methode nein: Wer pendelt, ist nirgends — und die Gästin ist wiederholt allein. Im Notfall ist Delegieren die eigentliche Führungsaufgabe (P7).",
en: "The sense of responsibility, yes; the method, no: whoever shuttles is nowhere — and the guest is repeatedly alone. In an emergency, delegating is the real act of leadership (P7).",
id: "Rasa tanggung jawabnya benar, metodenya tidak: yang bolak-balik tidak berada di mana pun — dan tamu berulang kali ditinggal sendirian. Dalam keadaan darurat, mendelegasikan justru inti dari memimpin (P7)."
},
next: "n3"
},
{
id: "c",
label: {
de: "Allgemein in die Runde rufen, dass irgendjemand helfen und irgendwer draußen aufpassen soll.",
en: "Call out generally that somebody should help and someone ought to keep watch outside.",
id: "Berseru umum agar ada yang membantu dan ada yang berjaga di luar — siapa saja."
},
scores: { d: 0, l: 1, s: 1 },
feedback: {
de: "„Irgendjemand“ fühlt sich nie angesprochen: Ohne Namen und klare Aufgabe bleiben alle stehen und schauen sich an. Zeigen Sie auf konkrete Personen und geben Sie je einen Auftrag — erst dann wird aus der Menge Hilfe (P7).",
en: "“Somebody” never feels addressed: without a name and a clear task, everyone keeps standing and looks at each other. Point to specific people and give one task each — only then does the crowd become help (P7).",
id: "“Siapa saja” tidak pernah merasa dipanggil: tanpa nama dan tugas yang jelas, semua orang tetap berdiri saling pandang. Tunjuk orang tertentu dan beri masing-masing satu tugas — barulah kerumunan berubah menjadi bantuan (P7)."
},
next: "n3"
},
{
id: "d",
label: {
de: "Die Umstehenden höflich um Abstand bitten — die Einweisung der Rettungskräfte wird sich schon finden.",
en: "Politely ask the bystanders to step back — guiding the emergency crew in will sort itself out somehow.",
id: "Dengan sopan meminta orang-orang menjauh — urusan memandu petugas nanti akan beres dengan sendirinya."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Der freie Bereich ist richtig — aber die Einweisung dem Zufall zu überlassen kostet die Rettungskräfte wertvolle Orientierungszeit. Ein eingewiesener Eingang gehört zu jeder Notfallkoordination (P7).",
en: "The clear area is right — but leaving the guidance to chance costs the emergency crew precious orientation time. A staffed entrance is part of every emergency coordination (P7).",
id: "Area yang lapang sudah benar — tetapi membiarkan pemanduan pada kebetulan membuang waktu orientasi petugas yang berharga. Pintu masuk yang dijaga pemandu adalah bagian dari setiap koordinasi darurat (P7)."
},
next: "n3"
}
]
},
n3: {
type: "decision",
phase: { de: "Lobby im Griff", en: "Managing the lobby", id: "Mengelola situasi lobi" },
narration: {
de: "Der Rettungsweg ist eingewiesen, der Bereich frei. Frau Lindqvist ist weiter nicht ansprechbar; Sie sprechen ruhig zu ihr, wie die Leitstelle es empfohlen hat. Ein Gast fragt laut über die Lobby: „Was ist denn mit der Frau? Ist das was Ernstes?“",
en: "The route for the crew is arranged, the area is clear. Ms Lindqvist is still unresponsive; you keep talking to her calmly, as the dispatcher recommended. A guest asks loudly across the lobby: “What is wrong with that woman? Is it something serious?”",
id: "Jalur petugas sudah dipandu, area sudah lapang. Ibu Lindqvist masih belum merespons; Anda terus berbicara kepadanya dengan tenang, sesuai saran petugas pusat. Seorang tamu bertanya keras melintasi lobi: “Ibu itu kenapa? Apakah gawat?”"
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Kurz und ruhig antworten: Hilfe ist unterwegs, alles Nötige ist veranlasst — und bitte den Bereich frei halten.",
en: "Answer briefly and calmly: help is on its way, everything necessary has been arranged — and please keep the area clear.",
id: "Menjawab singkat dan tenang: bantuan sedang menuju kemari, semua yang diperlukan sudah diurus — dan mohon area tetap lapang."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Genau richtig: Die Umstehenden bekommen Sicherheit — Hilfe kommt, es ist gesorgt —, die Gästin behält ihre Privatsphäre, und der Bereich bleibt frei (P3, P7). Mehr muss und darf die Lobby nicht wissen.",
en: "Exactly right: the bystanders get reassurance — help is coming, things are handled —, the guest keeps her privacy, and the area stays clear (P3, P7). More than that the lobby neither needs nor should know.",
id: "Tepat sekali: orang-orang mendapat rasa aman — bantuan datang, semuanya tertangani —, tamu tetap terjaga privasinya, dan area tetap lapang (P3, P7). Lebih dari itu, lobi tidak perlu dan tidak boleh tahu."
},
next: "n4"
},
{
id: "b",
label: {
de: "Beruhigend verkünden, das sei „bestimmt nur der Kreislauf“ und halb so schlimm, wie es aussehe.",
en: "Announce reassuringly that it is “surely just her circulation” and half as bad as it looks.",
id: "Mengumumkan dengan nada menenangkan bahwa itu “pasti cuma tekanan darah” dan tidak separah kelihatannya."
},
scores: { d: 0, l: 1, s: 0 },
flags: { unsafe: true },
feedback: {
de: "Stellen Sie nie medizinische Vermutungen auf — schon gar nicht öffentlich: Sie können den Zustand nicht beurteilen, und eine falsche Entwarnung kann Helfer bremsen und die Gästin bloßstellen (P3, P7). Die Einschätzung gehört allein den Rettungskräften.",
en: "Never voice medical guesses — least of all publicly: you cannot judge her condition, and a false all-clear can slow helpers down and expose the guest (P3, P7). Assessment belongs to the emergency professionals alone.",
id: "Jangan pernah melontarkan dugaan medis — apalagi di depan umum: Anda tidak dapat menilai kondisinya, dan pernyataan aman yang keliru dapat mengendurkan para penolong sekaligus mempermalukan tamu (P3, P7). Penilaian sepenuhnya milik petugas darurat."
},
next: "n4"
},
{
id: "c",
label: {
de: "Die Frage ignorieren und wortlos bei Frau Lindqvist bleiben, bis der Rettungswagen da ist.",
en: "Ignore the question and stay with Ms Lindqvist in silence until the ambulance arrives.",
id: "Mengabaikan pertanyaan itu dan tetap diam di sisi Ibu Lindqvist sampai ambulans tiba."
},
scores: { d: 1, l: 1, s: 1 },
feedback: {
de: "Bei der Gästin zu bleiben ist richtig — aber die unbeantwortete Lobby produziert Gerüchte und Unruhe. Ein ruhiger Satz an alle hätte die Lage stabilisiert, ohne etwas preiszugeben (P7).",
en: "Staying with the guest is right — but an unanswered lobby produces rumours and unrest. One calm sentence to everyone would have stabilised the scene without giving anything away (P7).",
id: "Tetap bersama tamu memang benar — tetapi lobi yang tak dijawab akan melahirkan desas-desus dan kegelisahan. Satu kalimat tenang untuk semua akan menstabilkan keadaan tanpa membocorkan apa pun (P7)."
},
next: "n4"
},
{
id: "d",
label: {
de: "Aufstehen und den umstehenden Gästen der Reihe nach erklären, wie es zu dem Sturz kam.",
en: "Stand up and explain to the surrounding guests, one by one, how the fall came about.",
id: "Berdiri dan menjelaskan kepada para tamu satu per satu bagaimana kejadian jatuhnya tadi."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Zugewandt gemeint — aber die Einzelerklärungen ziehen Sie von der Gästin weg und breiten ihre Situation vor Fremden aus. Kurz, kollektiv, diskret informieren und beim Menschen bleiben, der Sie braucht (P3, P7).",
en: "Attentively meant — but the one-by-one explanations pull you away from the guest and spread her situation before strangers. Inform briefly, collectively, discreetly — and stay with the person who needs you (P3, P7).",
id: "Niatnya penuh perhatian — tetapi penjelasan satu per satu menjauhkan Anda dari tamu dan membeberkan keadaannya kepada orang asing. Beri informasi singkat, kolektif, diskret — dan tetaplah bersama orang yang membutuhkan Anda (P3, P7)."
},
next: "n4"
}
]
},
n4: {
type: "decision",
phase: { de: "Übergabe & Dokumentation", en: "Handover & documentation", id: "Serah terima & dokumentasi" },
narration: {
de: "Die Rettungskräfte übernehmen; Ihr Kollege hat sie direkt zur Stelle geführt. Sie beantworten ihre Fragen — Zeitpunkt des Sturzes, Ihre Beobachtungen — und treten zurück. Wenig später ist Frau Lindqvist auf dem Weg in die Klinik. Die Lobby atmet aus. Und jetzt?",
en: "The emergency crew takes over; your colleague guided them straight to the spot. You answer their questions — the time of the fall, what you observed — and step back. A little later Ms Lindqvist is on her way to the clinic. The lobby breathes out. And now?",
id: "Petugas darurat mengambil alih; rekan Anda memandu mereka langsung ke lokasi. Anda menjawab pertanyaan mereka — waktu jatuhnya, apa yang Anda amati — lalu mundur. Tak lama kemudian Ibu Lindqvist dalam perjalanan ke rumah sakit. Lobi menghela napas lega. Lalu sekarang?"
},
guestLine: null,
options: [
{
id: "a",
label: {
de: "Die Dienstleitung anrufen und den Vorfall mit Zeiten, Beteiligten und Maßnahmen sachlich im Übergabeprotokoll festhalten.",
en: "Call the duty manager and record the incident factually in the handover log — times, people involved, actions taken.",
id: "Menelepon penanggung jawab dan mencatat insiden secara faktual di log serah terima — waktu, pihak yang terlibat, tindakan yang diambil."
},
scores: { d: 2, l: 2, s: 2 },
feedback: {
de: "Der vollständige Abschluss: Die Leitung ist informiert, und das Protokoll hält nüchtern fest, was wann geschah und wer half (P5, P6). So kann das Haus Rückfragen beantworten, die Nachtschicht ist im Bild — und der Einsatz endet so geordnet, wie er lief.",
en: "The complete close: the manager is informed, and the log soberly records what happened when, and who helped (P5, P6). The hotel can answer follow-up questions, the night shift is in the picture — and the incident ends as orderly as it ran.",
id: "Penutupan yang utuh: penanggung jawab terinformasi, dan log mencatat dengan lugas apa yang terjadi, kapan, dan siapa yang membantu (P5, P6). Hotel siap menjawab pertanyaan lanjutan, sif malam memahami keadaan — dan insiden berakhir serapi jalannya tadi."
},
next: "x1"
},
{
id: "b",
label: {
de: "Die Dienstleitung kurz telefonisch informieren — der ereignisreiche Abend ist damit ausreichend abgeschlossen.",
en: "Inform the duty manager briefly by phone — with that, the eventful evening is sufficiently wrapped up.",
id: "Menginformasikan penanggung jawab secara singkat lewat telepon — dengan itu malam yang penuh kejadian dianggap cukup tertutup."
},
scores: { d: 1, l: 2, s: 1 },
feedback: {
de: "Der Anruf ist richtig — aber ohne Protokolleintrag verschwinden Zeiten und Abläufe mit Ihrem Feierabend: Rückfragen der Klinik, der Angehörigen oder der Leitung treffen morgen auf Erinnerungslücken. Notfälle gehören immer ins Protokoll (P6).",
en: "The call is right — but without a log entry, times and sequences leave with you at the end of your shift: questions from the clinic, relatives or management will meet memory gaps tomorrow. Emergencies always belong in the log (P6).",
id: "Teleponnya benar — tetapi tanpa catatan di log, urutan waktu dan kejadian ikut pulang bersama Anda saat sif berakhir: pertanyaan dari rumah sakit, keluarga, atau manajemen besok akan bertemu ingatan yang bolong. Keadaan darurat selalu wajib masuk log (P6)."
},
next: "x2"
},
{
id: "c",
label: {
de: "Sich hinter den Empfang setzen und den normalen Betrieb wieder aufnehmen — es ist ja alles gut gegangen.",
en: "Sit back down at the desk and resume normal business — it all turned out fine, after all.",
id: "Kembali duduk di meja resepsionis dan melanjutkan pekerjaan seperti biasa — toh semuanya berakhir baik."
},
scores: { d: 0, l: 1, s: 1 },
feedback: {
de: "So endet ein Notfall ohne Gedächtnis: keine informierte Leitung, kein Protokoll, keine Chance auf Rückfragen oder Nachbereitung. Der Einsatz war gut — sein Abschluss muss es auch sein: melden und dokumentieren (P5, P6).",
en: "This is how an emergency ends without a memory: no informed manager, no log, no way to handle follow-ups or debrief. The response was good — its closure must be too: report and document (P5, P6).",
id: "Beginilah keadaan darurat berakhir tanpa jejak: penanggung jawab tak terinformasi, log kosong, tak ada pegangan untuk pertanyaan lanjutan maupun evaluasi. Penanganannya sudah baik — penutupannya juga harus: laporkan dan dokumentasikan (P5, P6)."
},
next: "x3"
}
]
},
x1: {
type: "outcome",
tone: "good",
ending: {
de: "Der Rettungswagen fährt ab, die Lobby findet in den Abend zurück, und im Protokoll steht der Einsatz schwarz auf weiß: Notruf 21:16, Einweisung am Eingang, Übergabe an die Rettungskräfte, Leitung informiert. Sie haben nichts diagnostiziert und niemanden behandelt — Sie haben alarmiert, koordiniert und begleitet. Genau das ist die Rolle des Empfangs im Notfall, und Sie haben sie vollständig ausgefüllt.",
en: "The ambulance pulls away, the lobby settles back into its evening, and the incident stands in the log in black and white: emergency call 21:16, guidance at the entrance, handover to the crew, manager informed. You diagnosed nothing and treated no one — you alerted, coordinated and stayed close. That is exactly the front desk's role in an emergency, and you filled it completely.",
id: "Ambulans berangkat, lobi kembali ke suasana malamnya, dan di log insiden itu tertulis hitam di atas putih: panggilan darurat pukul 21:16, pemanduan di pintu masuk, serah terima kepada petugas, penanggung jawab terinformasi. Anda tidak mendiagnosis apa pun dan tidak mengobati siapa pun — Anda membunyikan alarm, mengoordinasikan, dan mendampingi. Itulah peran resepsionis dalam keadaan darurat, dan Anda menjalankannya secara utuh."
}
},
x2: {
type: "outcome",
tone: "mixed",
ending: {
de: "Frau Lindqvist ist in guten Händen, und die entscheidenden Schritte haben funktioniert. Was fehlt, ist der geordnete Schluss: eine Lücke in der Meldung oder im Protokoll, ein Moment der Unklarheit in der Lobby. Notfälle werden zweimal bewältigt — im Moment und in der Nachbereitung. Der erste Teil war stark; den zweiten holen Sie nächstes Mal vollständig nach.",
en: "Ms Lindqvist is in good hands, and the decisive steps worked. What is missing is the orderly ending: a gap in the report or the log, a moment of confusion in the lobby. Emergencies are mastered twice — in the moment and in the follow-up. The first part was strong; next time, complete the second as well.",
id: "Ibu Lindqvist berada di tangan yang tepat, dan langkah-langkah penentu telah berhasil. Yang kurang adalah penutupan yang tertib: celah pada pelaporan atau log, sesaat kebingungan di lobi. Keadaan darurat ditaklukkan dua kali — pada momennya dan pada tindak lanjutnya. Bagian pertama kuat; lain kali lengkapi juga bagian keduanya."
}
},
x3: {
type: "outcome",
tone: "poor",
ending: {
de: "Der Abend endet mit offenen Wunden: ein verzögerter Notruf, eine öffentliche Vermutung oder ein Einsatz, der nirgends dokumentiert ist. Prägen Sie sich die Reihenfolge ein, bis sie automatisch abläuft: sofort 112, bei der Person bleiben, konkrete Aufgaben verteilen, diskret informieren, melden und protokollieren. Alles Medizinische gehört den Profis — alles Organisatorische gehört Ihnen (P5, P6, P7).",
en: "The evening ends with open wounds: a delayed emergency call, a public guess, or a response documented nowhere. Burn this sequence in until it runs automatically: 112 at once, stay with the person, assign concrete tasks, inform discreetly, report and log. Everything medical belongs to the professionals — everything organisational belongs to you (P5, P6, P7).",
id: "Malam berakhir dengan luka terbuka: panggilan darurat yang tertunda, dugaan yang diumbar, atau penanganan yang tidak terdokumentasi di mana pun. Tanamkan urutan ini sampai berjalan otomatis: segera 112, tetap bersama orangnya, bagikan tugas konkret, beri informasi secara diskret, laporkan dan catat. Segala yang medis milik para profesional — segala yang organisatoris milik Anda (P5, P6, P7)."
}
}
},
debrief: {
tips: {
decision: {
de: "Merken Sie sich die Notfall-Reihenfolge des Empfangs: sofort 112, bei der Person bleiben, dann delegieren — Einweisung, Platz, interne Meldung. Jede andere Reihenfolge kostet Minuten, die nicht Ihnen gehören.",
en: "Memorise the front desk's emergency order: 112 at once, stay with the person, then delegate — guidance, space, internal report. Any other order costs minutes that are not yours to spend.",
id: "Hafalkan urutan darurat resepsionis: segera 112, tetap bersama orangnya, lalu delegasikan — pemanduan, ruang, laporan internal. Urutan lain mana pun membuang menit-menit yang bukan milik Anda."
},
language: {
de: "Sprechen Sie im Notfall in kurzen, adressierten Sätzen: eine Person, ein Auftrag („Sie bitte: am Eingang einweisen“). An die Menge gehen nur ruhige Sammelbotschaften ohne Details.",
en: "In an emergency, speak in short, addressed sentences: one person, one task (“you, please: guide them in at the entrance”). The crowd only gets calm collective messages without details.",
id: "Dalam keadaan darurat, gunakan kalimat pendek yang tertuju: satu orang, satu tugas (“Anda, tolong: pandu petugas di pintu masuk”). Kepada kerumunan, hanya pesan kolektif yang tenang tanpa rincian."
},
sop: {
de: "Jeder Notfall wird gemeldet und protokolliert: Uhrzeiten, Beteiligte, Maßnahmen, Übergabe an die Rettungskräfte — nüchtern und ohne eigene Deutungen. Das Protokoll schützt die Gästin, das Haus und Sie (P6).",
en: "Every emergency gets reported and logged: times, people involved, actions, handover to the crew — soberly and without your own interpretations. The log protects the guest, the hotel and you (P6).",
id: "Setiap keadaan darurat dilaporkan dan dicatat: waktu, pihak yang terlibat, tindakan, serah terima kepada petugas — secara lugas tanpa tafsiran pribadi. Log itu melindungi tamu, hotel, dan Anda (P6)."
}
},
safetyTip: {
de: "Verzögern Sie den Notruf durch nichts — nicht durch Recherche, Rückfragen oder eigene Einschätzungen — und äußern Sie nie medizinische Vermutungen: 112 sofort, begleiten, den Fachleuten folgen. Handeln Sie darüber hinaus nur im Rahmen Ihrer offiziellen Erste-Hilfe-Ausbildung (P7).",
en: "Let nothing delay the emergency call — not research, not checking back, not your own assessment — and never voice medical guesses: 112 at once, stay close, follow the professionals. Beyond that, act only within your official first-aid training (P7).",
id: "Jangan biarkan apa pun menunda panggilan darurat — bukan pencarian informasi, bukan konsultasi, bukan penilaian sendiri — dan jangan pernah melontarkan dugaan medis: segera 112, dampingi, ikuti para profesional. Selebihnya, bertindaklah hanya dalam lingkup pelatihan pertolongan pertama resmi Anda (P7)."
},
praise: {
de: "Herausragend: sofortiger Notruf, klare Aufgaben, gewahrte Würde, saubere Übergabe und Dokumentation — die komplette Notfallkette des Empfangs. Wiederholen Sie das Szenario regelmäßig: Diese Abfolge muss sitzen, bevor man sie braucht.",
en: "Outstanding: immediate emergency call, clear tasks, dignity protected, clean handover and documentation — the front desk's complete emergency chain. Repeat this scenario regularly: this sequence has to be second nature before it is needed.",
id: "Istimewa: panggilan darurat seketika, tugas yang jelas, martabat yang terjaga, serah terima dan dokumentasi yang rapi — rantai darurat resepsionis yang lengkap. Ulangi skenario ini secara berkala: urutan ini harus melekat sebelum benar-benar dibutuhkan."
}
},
sopRefs: ["P5", "P6", "P7"]
};
})();
