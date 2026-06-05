import React, { useState, useEffect, useRef, useCallback } from "react";

/* ── CSS ─────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&family=Outfit:wght@700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Nunito','Outfit',sans-serif;background:#F0F4FF;font-size:16px;line-height:1.6;-webkit-tap-highlight-color:transparent}
button{touch-action:manipulation;cursor:pointer;font-family:'Nunito',sans-serif}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:#6366F1;border-radius:8px}
@keyframes floatA{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-16px) rotate(3deg)}}
@keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes popIn{from{transform:scale(0.75) translateY(12px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
@keyframes slideDown{from{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes confettiFall{0%{transform:translateY(-10px) rotate(0);opacity:1}100%{transform:translateY(120px) rotate(720deg);opacity:0}}
@keyframes bounceIn{0%{transform:scale(0.5);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
@keyframes speakWave{0%,100%{transform:scaleY(0.4)}50%{transform:scaleY(1)}}
@keyframes errPop{0%{transform:scale(0.9);opacity:0}60%{transform:scale(1.03)}100%{transform:scale(1);opacity:1}}
.bhv:hover{filter:brightness(1.08);transform:translateY(-2px)}.bhv:active{transform:scale(0.96)!important}
.clift:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(79,70,229,0.18)!important}.clift:active{transform:scale(0.98)}
.optb:hover{transform:scale(1.02);box-shadow:0 6px 18px rgba(0,0,0,.1)!important}
input:focus,textarea:focus{border-color:#4F46E5!important;box-shadow:0 0 0 3px rgba(79,70,229,.15)!important;outline:none}
@media(max-width:600px){
  .dsk{display:none!important}.mob{display:flex!important}
  .pw{padding:14px 12px 92px!important}
  .hb{flex-direction:column!important;padding:20px 16px!important}
  .ha{font-size:60px!important;margin-top:6px}.ht{font-size:22px!important}
  .sg{grid-template-columns:repeat(2,1fr)!important}
  .mg{grid-template-columns:repeat(2,1fr)!important}
  .qg{grid-template-columns:1fr!important}
  .vg{grid-template-columns:1fr!important}
  .fg{grid-template-columns:repeat(2,1fr)!important}
  .ag{grid-template-columns:1fr!important}
  .qo{grid-template-columns:1fr!important}
  .lp{gap:8px!important}
  .at{flex-wrap:wrap!important}
}
@media(min-width:601px){.mob{display:none!important}.dsk{display:flex!important}}
`;

/* ── WARNA & STYLE ───────────────────────────────────────── */
const PR = "#4F46E5";
const SC2 = "#10B981";
const PU = "#F59E0B";
const GR = "#06B6D4";
const OR = "#EF4444";
const DK = "#1E293B";
const MD = "#64748B";
const BD = "#E0E7FF";
const G1 = "linear-gradient(135deg,#4F46E5,#7C3AED)";
const G2 = "linear-gradient(135deg,#10B981,#059669)";
const AC = "#DBEAFE";

function card(x) {
  return Object.assign({ background:"#fff", borderRadius:20, boxShadow:"0 4px 24px rgba(79,70,229,.09)", border:"2px solid #E0E7FF", padding:22 }, x || {});
}
function btn(bg, x) {
  var base = { background: bg || PR, color:"#fff", border:"none", borderRadius:50, padding:"11px 24px", fontSize:15, fontWeight:800, boxShadow:"0 4px 14px "+(bg||PR)+"44", transition:"all .18s", display:"inline-flex", alignItems:"center", gap:8 };
  return Object.assign(base, x || {});
}
function bdg(c) {
  return { background:c+"22", color:c, borderRadius:50, padding:"3px 11px", fontSize:11, fontWeight:800, display:"inline-block" };
}
var INP = { width:"100%", padding:"13px 15px", borderRadius:14, border:"2px solid #E0E7FF", fontSize:15, fontFamily:"'Nunito',sans-serif", outline:"none", background:"#F8FAFF", transition:"all .2s" };
var LBL = { fontWeight:800, color:DK, marginBottom:6, display:"block", fontSize:14 };

/* ── SCREENS ─────────────────────────────────────────────── */
var SC = { LOGIN:"login", REGISTER:"register", HOME:"home", QUIZ_LIST:"ql", QUIZ_PLAY:"qp", VOCAB:"vocab", RANK:"rank", AI:"ai", PROFILE:"profile", ADMIN:"admin" };

/* ── SEED DATA ───────────────────────────────────────────── */
var SEED_USERS = [{ id:1, username:"sabdha", password:"sabdha10", role:"admin", name:"Sabdha", avatar:"🦁", points:9999, streak:30, done:[], joined:"2024-01-01" }];

var VIDEOS_DATA = [
  { id:1, title:"Alfabet A–Z", desc:"Belajar huruf dengan suara!", level:"Pemula", emoji:"🔤", views:1240, slides:[
    { char:"A", word:"Apple",    emoji:"🍎", color:"#EF4444", say:"A! A for Apple. A, A, Apple!" },
    { char:"B", word:"Banana",   emoji:"🍌", color:"#F59E0B", say:"B! B for Banana. B, B, Banana!" },
    { char:"C", word:"Cat",      emoji:"🐱", color:"#4ECDC4", say:"C! C for Cat. C, C, Cat!" },
    { char:"D", word:"Dog",      emoji:"🐶", color:"#A855F7", say:"D! D for Dog. D, D, Dog!" },
    { char:"E", word:"Elephant", emoji:"🐘", color:"#10B981", say:"E! E for Elephant. E, E, Elephant!" },
    { char:"F", word:"Fish",     emoji:"🐟", color:"#3B82F6", say:"F! F for Fish. F, F, Fish!" },
    { char:"G", word:"Grape",    emoji:"🍇", color:"#8B5CF6", say:"G! G for Grape. G, G, Grape!" },
    { char:"H", word:"Hat",      emoji:"🎩", color:"#F97316", say:"H! H for Hat. H, H, Hat!" },
  ]},
  { id:2, title:"Angka 1–10", desc:"Hitung 1 sampai 10!", level:"Pemula", emoji:"🔢", views:980, slides:[
    { char:"1", word:"One",   emoji:"1️⃣", color:"#EF4444", say:"One! Satu. One, one, one!" },
    { char:"2", word:"Two",   emoji:"2️⃣", color:"#F59E0B", say:"Two! Dua. Two, two, two!" },
    { char:"3", word:"Three", emoji:"3️⃣", color:"#4ECDC4", say:"Three! Tiga. Three, three!" },
    { char:"4", word:"Four",  emoji:"4️⃣", color:"#A855F7", say:"Four! Empat. Four, four!" },
    { char:"5", word:"Five",  emoji:"5️⃣", color:"#10B981", say:"Five! Lima. Five, five!" },
    { char:"6", word:"Six",   emoji:"6️⃣", color:"#3B82F6", say:"Six! Enam. Six, six!" },
    { char:"7", word:"Seven", emoji:"7️⃣", color:"#F97316", say:"Seven! Tujuh. Seven, seven!" },
    { char:"8", word:"Eight", emoji:"8️⃣", color:"#EF4444", say:"Eight! Delapan. Eight!" },
    { char:"9", word:"Nine",  emoji:"9️⃣", color:"#8B5CF6", say:"Nine! Sembilan. Nine!" },
    { char:"10",word:"Ten",   emoji:"🔟", color:"#EC4899", say:"Ten! Sepuluh. Ten!" },
  ]},
  { id:3, title:"Warna-Warni", desc:"Nama warna dalam bahasa Inggris!", level:"Pemula", emoji:"🎨", views:1560, slides:[
    { char:"Red",    word:"Merah",      emoji:"🔴", color:"#EF4444", say:"Red! Merah. Red, red, red!" },
    { char:"Blue",   word:"Biru",       emoji:"🔵", color:"#3B82F6", say:"Blue! Biru. Blue, blue, blue!" },
    { char:"Green",  word:"Hijau",      emoji:"🟢", color:"#10B981", say:"Green! Hijau. Green, green!" },
    { char:"Yellow", word:"Kuning",     emoji:"🟡", color:"#F59E0B", say:"Yellow! Kuning. Yellow!" },
    { char:"Purple", word:"Ungu",       emoji:"🟣", color:"#A855F7", say:"Purple! Ungu. Purple!" },
    { char:"Orange", word:"Oranye",     emoji:"🟠", color:"#F97316", say:"Orange! Oranye. Orange!" },
    { char:"Pink",   word:"Merah Muda", emoji:"🌸", color:"#EC4899", say:"Pink! Merah Muda. Pink!" },
    { char:"White",  word:"Putih",      emoji:"⬜", color:"#94A3B8", say:"White! Putih. White!" },
  ]},
  { id:4, title:"Sapaan & Salam", desc:"Cara menyapa dalam bahasa Inggris!", level:"Pemula", emoji:"👋", views:2100, slides:[
    { char:"Hello",        word:"Halo",           emoji:"👋", color:"#4F46E5", say:"Hello! Hello means Halo. Hello!" },
    { char:"Good Morning", word:"Selamat Pagi",   emoji:"🌅", color:"#F59E0B", say:"Good Morning! Selamat Pagi!" },
    { char:"Good Night",   word:"Selamat Malam",  emoji:"🌙", color:"#A855F7", say:"Good Night! Selamat Malam!" },
    { char:"Thank You",    word:"Terima Kasih",   emoji:"🙏", color:"#10B981", say:"Thank You! Terima Kasih!" },
    { char:"Sorry",        word:"Maaf",           emoji:"😔", color:"#EF4444", say:"Sorry! Maaf. I am sorry!" },
    { char:"Please",       word:"Tolong",         emoji:"🤲", color:"#3B82F6", say:"Please! Tolong. Please help me!" },
    { char:"Goodbye",      word:"Sampai Jumpa",   emoji:"🤗", color:"#F97316", say:"Goodbye! Sampai Jumpa. See you!" },
    { char:"Welcome",      word:"Selamat Datang", emoji:"🎉", color:"#8B5CF6", say:"Welcome! Selamat Datang!" },
  ]},
  { id:5, title:"Hewan-Hewan Lucu", desc:"Nama hewan dalam bahasa Inggris!", level:"Pemula", emoji:"🐾", views:870, slides:[
    { char:"Cat",     word:"Kucing",  emoji:"🐱", color:"#F97316", say:"Cat! Kucing. The cat says meow!" },
    { char:"Dog",     word:"Anjing",  emoji:"🐶", color:"#F59E0B", say:"Dog! Anjing. The dog says woof!" },
    { char:"Bird",    word:"Burung",  emoji:"🐦", color:"#3B82F6", say:"Bird! Burung. Birds can fly!" },
    { char:"Fish",    word:"Ikan",    emoji:"🐟", color:"#4ECDC4", say:"Fish! Ikan. Fish swim in water!" },
    { char:"Rabbit",  word:"Kelinci", emoji:"🐰", color:"#EC4899", say:"Rabbit! Kelinci. Rabbits love carrots!" },
    { char:"Elephant",word:"Gajah",   emoji:"🐘", color:"#94A3B8", say:"Elephant! Gajah. Elephant is big!" },
    { char:"Tiger",   word:"Harimau", emoji:"🐯", color:"#EF4444", say:"Tiger! Harimau. Tiger is strong!" },
    { char:"Monkey",  word:"Monyet",  emoji:"🐒", color:"#A855F7", say:"Monkey! Monyet. Monkey loves bananas!" },
  ]},
  { id:6, title:"Buah-Buahan", desc:"Nama buah dalam bahasa Inggris!", level:"Pemula", emoji:"🍎", views:650, slides:[
    { char:"Apple",      word:"Apel",     emoji:"🍎", color:"#EF4444", say:"Apple! Apel. I love apples!" },
    { char:"Banana",     word:"Pisang",   emoji:"🍌", color:"#F59E0B", say:"Banana! Pisang. Banana is yellow!" },
    { char:"Mango",      word:"Mangga",   emoji:"🥭", color:"#F97316", say:"Mango! Mangga. Mango is sweet!" },
    { char:"Orange",     word:"Jeruk",    emoji:"🍊", color:"#FB923C", say:"Orange! Jeruk. Orange is juicy!" },
    { char:"Watermelon", word:"Semangka", emoji:"🍉", color:"#10B981", say:"Watermelon! Semangka. So big!" },
    { char:"Grape",      word:"Anggur",   emoji:"🍇", color:"#8B5CF6", say:"Grape! Anggur. Grapes are purple!" },
    { char:"Strawberry", word:"Stroberi", emoji:"🍓", color:"#EF4444", say:"Strawberry! Stroberi. Red and sweet!" },
    { char:"Pineapple",  word:"Nanas",    emoji:"🍍", color:"#F59E0B", say:"Pineapple! Nanas. Tropical fruit!" },
  ]},
];

var QUIZZES_DATA = [
  { id:1, title:"Soal Alfabet", emoji:"🔤", cat:"Alfabet", diff:"Mudah", tl:30, qs:[
    { q:"Apa huruf ke-5 dalam alfabet?", ops:["D","E","F","G"], ans:1 },
    { q:"'C' dibaca...?", ops:["Bi","Si","Di","Ei"], ans:1 },
    { q:"Ada berapa huruf dalam alfabet Inggris?", ops:["24","25","26","27"], ans:2 },
    { q:"Huruf vokal adalah...?", ops:["B","C","A","D"], ans:2 },
    { q:"Huruf terakhir alfabet adalah...?", ops:["X","Y","Z","W"], ans:2 },
  ]},
  { id:2, title:"Soal Angka", emoji:"🔢", cat:"Angka", diff:"Mudah", tl:30, qs:[
    { q:"How do you say '3' in English?", ops:["One","Two","Three","Four"], ans:2 },
    { q:"What number is 'Seven'?", ops:["6","7","8","9"], ans:1 },
    { q:"'Twelve' = ?", ops:["10","11","12","13"], ans:2 },
    { q:"'Twenty' = ?", ops:["12","15","18","20"], ans:3 },
    { q:"Berapa jari dua tangan?", ops:["Eight","Nine","Ten","Eleven"], ans:2 },
  ]},
  { id:3, title:"Soal Warna", emoji:"🎨", cat:"Warna", diff:"Mudah", tl:30, qs:[
    { q:"🔴 This color is...?", ops:["Blue","Red","Green","Yellow"], ans:1 },
    { q:"What color is the sky?", ops:["Red","Green","Blue","Pink"], ans:2 },
    { q:"🍋 Banana is...?", ops:["Purple","Orange","Yellow","White"], ans:2 },
    { q:"🌿 Grass is...?", ops:["Green","Brown","Black","Gray"], ans:0 },
    { q:"🐘 Elephants are usually...?", ops:["Pink","Gray","Blue","Red"], ans:1 },
  ]},
  { id:4, title:"Soal Hewan", emoji:"🐾", cat:"Hewan", diff:"Sedang", tl:25, qs:[
    { q:"'Kucing' in English is...?", ops:["Dog","Bird","Cat","Fish"], ans:2 },
    { q:"'Anjing' in English is...?", ops:["Rabbit","Dog","Cow","Duck"], ans:1 },
    { q:"What animal says 'Moo'?", ops:["Sheep","Pig","Cow","Horse"], ans:2 },
    { q:"'Burung' in English is...?", ops:["Fish","Bird","Frog","Bee"], ans:1 },
    { q:"'Ikan' = ?", ops:["Fish","Frog","Snake","Ant"], ans:0 },
  ]},
  { id:5, title:"Soal Sapaan", emoji:"👋", cat:"Sapaan", diff:"Mudah", tl:30, qs:[
    { q:"'Selamat Pagi' in English?", ops:["Good Night","Good Morning","Hello","Goodbye"], ans:1 },
    { q:"'Terima kasih' in English?", ops:["Sorry","Please","Thank You","Hello"], ans:2 },
    { q:"'Sampai jumpa' in English?", ops:["Hello","Good Night","Goodbye","Sorry"], ans:2 },
    { q:"'Maaf' in English?", ops:["Thank You","Please","Hello","Sorry"], ans:3 },
    { q:"'Selamat Malam' in English?", ops:["Good Morning","Good Afternoon","Good Night","Good Evening"], ans:2 },
  ]},
];

var FLASH_DATA = [
  { id:1, title:"Buah-Buahan", emoji:"🍎", cards:[{f:"Apple",b:"Apel 🍎"},{f:"Banana",b:"Pisang 🍌"},{f:"Mango",b:"Mangga 🥭"},{f:"Orange",b:"Jeruk 🍊"},{f:"Grape",b:"Anggur 🍇"},{f:"Watermelon",b:"Semangka 🍉"}]},
  { id:2, title:"Warna Dasar", emoji:"🌈", cards:[{f:"Red",b:"Merah 🔴"},{f:"Blue",b:"Biru 🔵"},{f:"Green",b:"Hijau 🟢"},{f:"Yellow",b:"Kuning 🟡"},{f:"Purple",b:"Ungu 🟣"},{f:"Orange",b:"Oranye 🟠"}]},
  { id:3, title:"Anggota Tubuh", emoji:"🖐️", cards:[{f:"Head",b:"Kepala 🤔"},{f:"Hand",b:"Tangan ✋"},{f:"Eyes",b:"Mata 👀"},{f:"Nose",b:"Hidung 👃"},{f:"Mouth",b:"Mulut 👄"},{f:"Ear",b:"Telinga 👂"}]},
  { id:4, title:"Hari & Waktu", emoji:"📅", cards:[{f:"Monday",b:"Senin"},{f:"Tuesday",b:"Selasa"},{f:"Wednesday",b:"Rabu"},{f:"Morning",b:"Pagi 🌅"},{f:"Afternoon",b:"Siang ☀️"},{f:"Night",b:"Malam 🌙"}]},
];

var WOD = [
  {word:"Beautiful",meaning:"Indah / Cantik",example:"The flower is beautiful.",emoji:"🌸"},
  {word:"Wonderful",meaning:"Luar biasa",example:"What a wonderful day!",emoji:"✨"},
  {word:"Happy",meaning:"Senang / Bahagia",example:"I am very happy today.",emoji:"😊"},
  {word:"Brave",meaning:"Berani",example:"The lion is very brave.",emoji:"🦁"},
  {word:"Delicious",meaning:"Lezat / Enak",example:"This food is delicious!",emoji:"😋"},
  {word:"Curious",meaning:"Penasaran",example:"She is curious about English.",emoji:"🤔"},
  {word:"Friendly",meaning:"Ramah",example:"He is a friendly person.",emoji:"🤝"},
];

var VOCAB = [
  {w:"Hello",m:"Halo",e:"🙋",cat:"Sapaan",ex:"Hello, my name is Budi."},
  {w:"Good Morning",m:"Selamat Pagi",e:"🌅",cat:"Sapaan",ex:"Good morning, teacher!"},
  {w:"Thank you",m:"Terima kasih",e:"🙏",cat:"Sapaan",ex:"Thank you for your help."},
  {w:"Sorry",m:"Maaf",e:"😔",cat:"Sapaan",ex:"I am sorry for being late."},
  {w:"Goodbye",m:"Sampai Jumpa",e:"👋",cat:"Sapaan",ex:"Goodbye, see you tomorrow!"},
  {w:"Apple",m:"Apel",e:"🍎",cat:"Buah",ex:"I eat an apple every day."},
  {w:"Banana",m:"Pisang",e:"🍌",cat:"Buah",ex:"Monkeys love bananas."},
  {w:"Mango",m:"Mangga",e:"🥭",cat:"Buah",ex:"Mango is sweet and delicious."},
  {w:"Orange",m:"Jeruk",e:"🍊",cat:"Buah",ex:"I drink orange juice."},
  {w:"Grape",m:"Anggur",e:"🍇",cat:"Buah",ex:"Grapes are purple or green."},
  {w:"Cat",m:"Kucing",e:"🐱",cat:"Hewan",ex:"My cat is very cute."},
  {w:"Dog",m:"Anjing",e:"🐶",cat:"Hewan",ex:"The dog is barking loudly."},
  {w:"Bird",m:"Burung",e:"🐦",cat:"Hewan",ex:"The bird can fly high."},
  {w:"Fish",m:"Ikan",e:"🐟",cat:"Hewan",ex:"Fish live in the water."},
  {w:"Rabbit",m:"Kelinci",e:"🐰",cat:"Hewan",ex:"The rabbit is white and fluffy."},
  {w:"Red",m:"Merah",e:"🔴",cat:"Warna",ex:"The rose is red."},
  {w:"Blue",m:"Biru",e:"🔵",cat:"Warna",ex:"The sky is blue."},
  {w:"Green",m:"Hijau",e:"🟢",cat:"Warna",ex:"Leaves are green."},
  {w:"Yellow",m:"Kuning",e:"🟡",cat:"Warna",ex:"The sun is yellow."},
  {w:"Purple",m:"Ungu",e:"🟣",cat:"Warna",ex:"She likes purple flowers."},
  {w:"One",m:"Satu",e:"1️⃣",cat:"Angka",ex:"I have one book."},
  {w:"Two",m:"Dua",e:"2️⃣",cat:"Angka",ex:"She has two cats."},
  {w:"Three",m:"Tiga",e:"3️⃣",cat:"Angka",ex:"We need three chairs."},
  {w:"Five",m:"Lima",e:"5️⃣",cat:"Angka",ex:"Five fingers on each hand."},
  {w:"Ten",m:"Sepuluh",e:"🔟",cat:"Angka",ex:"There are ten students."},
  {w:"Beautiful",m:"Indah/Cantik",e:"🌸",cat:"Sifat",ex:"The flower is beautiful."},
  {w:"Happy",m:"Senang",e:"😊",cat:"Sifat",ex:"I am very happy today."},
  {w:"Smart",m:"Pintar",e:"🧠",cat:"Sifat",ex:"She is a smart student."},
  {w:"Kind",m:"Baik hati",e:"💝",cat:"Sifat",ex:"He is very kind to everyone."},
  {w:"Big",m:"Besar",e:"🐘",cat:"Sifat",ex:"The elephant is very big."},
];

/* ── LOCAL STORAGE ───────────────────────────────────────── */
function useLS(key, init) {
  var stored;
  try { stored = JSON.parse(localStorage.getItem(key)); } catch(e) { stored = null; }
  var s = useState(stored !== null && stored !== undefined ? stored : init);
  var val = s[0];
  var setVal = s[1];
  useEffect(function() {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  }, [key, val]);
  return [val, setVal];
}

/* ══════════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════════ */
export default function App() {
  var us = useLS("efu3", SEED_USERS);
  var users = us[0]; var setUsers = us[1];
  var qz = useLS("efq3", QUIZZES_DATA);
  var quizzes = qz[0]; var setQzs = qz[1];
  var cuState = useState(null);
  var cu = cuState[0]; var setCU = cuState[1];
  var scrState = useState(SC.LOGIN);
  var scr = scrState[0]; var setScr = scrState[1];
  var aqState = useState(null);
  var aq = aqState[0]; var setAQ = aqState[1];
  var qsState = useState(null);
  var qs = qsState[0]; var setQS = qsState[1];
  var ntfState = useState(null);
  var ntf = ntfState[0]; var setNtf = ntfState[1];
  var ntRef = useRef();

  var toast = useCallback(function(msg, type) {
    clearTimeout(ntRef.current);
    setNtf({ msg: msg, type: type || "ok" });
    ntRef.current = setTimeout(function() { setNtf(null); }, 3000);
  }, []);

  function login(u, p) {
    var usr = users.find(function(x) { return x.username === u && x.password === p; });
    if (usr) { setCU(usr); setScr(usr.role === "admin" ? SC.ADMIN : SC.HOME); toast("Halo, " + usr.name + "! 🎉"); return true; }
    return false;
  }

  function register(name, u, p) {
    if (users.find(function(x) { return x.username === u; })) return false;
    var avs = ["🐸","🐱","🐶","🐼","🦊","🐨","🐯","🐰","🦝","🦙"];
    var nu = { id: Date.now(), username:u, password:p, role:"student", name:name, avatar:avs[Math.floor(Math.random()*avs.length)], points:0, streak:1, done:[], joined:new Date().toISOString().slice(0,10) };
    setUsers(function(prev) { return prev.concat([nu]); });
    setCU(nu); setScr(SC.HOME);
    toast("Selamat datang, " + name + "! 🌟");
    return true;
  }

  function logout() { setCU(null); setScr(SC.LOGIN); }

  function startQuiz(q) { setAQ(q); setQS({ idx:0, answers:[], done:false, score:0, t0:Date.now() }); setScr(SC.QUIZ_PLAY); }

  function answerQ(opt) {
    if (!qs || qs.done) return;
    var q = aq.qs[qs.idx];
    var ok = opt >= 0 && opt === q.ans;
    var answers = qs.answers.concat([{ opt:opt, ok:ok }]);
    var next = qs.idx + 1;
    var done2 = next >= aq.qs.length;
    var sc = answers.filter(function(a) { return a.ok; }).length;
    setQS({ idx:next, answers:answers, done:done2, score:sc, t0:qs.t0 });
    if (done2) {
      var pts = sc * 10 + (sc === aq.qs.length ? 20 : 0);
      setUsers(function(prev) { return prev.map(function(u) { return u.id === cu.id ? Object.assign({}, u, { points:u.points+pts, done:[...new Set(u.done.concat([aq.id]))] }) : u; }); });
      setCU(function(prev) { return Object.assign({}, prev, { points:prev.points+pts, done:[...new Set(prev.done.concat([aq.id]))] }); });
      toast("+" + pts + " poin! " + (sc === aq.qs.length ? "SEMPURNA! 🏆" : "Bagus! 🌟"));
    }
  }

  function addQuiz(q) { setQzs(function(prev) { return prev.concat([Object.assign({ id:Date.now() }, q)]); }); toast("Soal ditambahkan! ✅"); }
  function delQuiz(id) { setQzs(function(prev) { return prev.filter(function(q) { return q.id !== id; }); }); toast("Soal dihapus.", "warn"); }

  function go(s) { setScr(s); }

  if (!cu) {
    if (scr === SC.REGISTER) return React.createElement(RegisterScreen, { onReg:register, onLogin:function() { setScr(SC.LOGIN); } });
    return React.createElement(LoginScreen, { onLogin:login, onReg:function() { setScr(SC.REGISTER); } });
  }

  var navItems = [
    { icon:"🏠", label:"Beranda",  s:SC.HOME },
    { icon:"📝", label:"Soal",     s:SC.QUIZ_LIST },
    { icon:"📖", label:"Kosakata", s:SC.VOCAB },
    { icon:"🏆", label:"Ranking",  s:SC.RANK },
    { icon:"🤖", label:"AI",       s:SC.AI },
  ];
  if (cu.role === "admin") navItems.push({ icon:"⚙️", label:"Admin", s:SC.ADMIN });

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#EEF2FF 0%,#F0FDF4 50%,#EFF6FF 100%)" }}>
      <style>{CSS}</style>
      <Bubbles />
      {ntf && (
        <div style={{ position:"fixed", top:14, left:"50%", transform:"translateX(-50%)", zIndex:9999,
          background: ntf.type==="err" ? "#EF4444" : ntf.type==="warn" ? "#F59E0B" : "#10B981",
          color:"#fff", borderRadius:16, padding:"12px 22px", fontWeight:800, fontSize:15,
          boxShadow:"0 8px 28px rgba(0,0,0,.18)", animation:"slideDown .3s ease", whiteSpace:"nowrap", maxWidth:"92vw" }}>
          {ntf.msg}
        </div>
      )}

      {/* DESKTOP NAV */}
      <nav className="dsk" style={{ background:"#fff", borderBottom:"4px solid #E0E7FF", padding:"0 18px", alignItems:"center", justifyContent:"space-between", height:62, boxShadow:"0 3px 14px rgba(79,70,229,.08)", position:"sticky", top:0, zIndex:200 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:28, animation:"floatA 3s ease-in-out infinite" }}>🌐</span>
          <div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, color:PR, lineHeight:1, fontWeight:900, letterSpacing:"-0.5px" }}>EnglishFun!</div>
            <div style={{ fontSize:10, color:MD }}>Belajar bahasa Inggris 🌈</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:2, flexWrap:"wrap" }}>
          {navItems.map(function(n) {
            return (
              <button key={n.s} onClick={function() { go(n.s); }} style={{ background:scr===n.s ? AC : "transparent", border:"none", borderRadius:10, padding:"6px 10px", fontWeight:800, fontSize:12, color:scr===n.s ? DK : MD, transition:"all .18s" }}>
                {n.icon} {n.label}
              </button>
            );
          })}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div onClick={function() { go(SC.PROFILE); }} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:7, background:"#EEF2FF", borderRadius:50, padding:"5px 12px 5px 6px", border:"2px solid #E0E7FF" }}>
            <span style={{ fontSize:22 }}>{cu.avatar}</span>
            <div>
              <div style={{ fontWeight:800, fontSize:11, color:DK }}>{cu.name}</div>
              <div style={{ fontSize:10, color:OR }}>⭐ {cu.points}</div>
            </div>
          </div>
          <button className="bhv" onClick={logout} style={btn("#94A3B8", { padding:"7px 13px", fontSize:12 })}>Keluar</button>
        </div>
      </nav>

      {/* MOBILE TOP BAR */}
      <div className="mob" style={{ background:"#fff", borderBottom:"3px solid #E0E7FF", padding:"9px 14px", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 10px rgba(79,70,229,.08)", position:"sticky", top:0, zIndex:200 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <span style={{ fontSize:24 }}>🌐</span>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:17, color:PR }}>EnglishFun!</span>
        </div>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <div onClick={function() { go(SC.PROFILE); }} style={{ background:"#EEF2FF", borderRadius:50, padding:"4px 10px 4px 6px", display:"flex", alignItems:"center", gap:5, cursor:"pointer", border:"1.5px solid #E0E7FF" }}>
            <span style={{ fontSize:20 }}>{cu.avatar}</span>
            <span style={{ fontSize:11, fontWeight:800, color:OR }}>⭐{cu.points}</span>
          </div>
          {cu.role === "admin" && (
            <button onClick={function() { go(SC.ADMIN); }} style={btn(scr===SC.ADMIN ? PR : "#E2E8F0", { padding:"6px 10px", fontSize:11, color:scr===SC.ADMIN ? "#fff" : DK, boxShadow:"none" })}>⚙️</button>
          )}
        </div>
      </div>

      {/* MAIN */}
      <main className="pw" style={{ maxWidth:1100, margin:"0 auto", padding:"22px 16px", position:"relative", zIndex:1 }}>
        {scr === SC.HOME       && <HomeScreen      cu={cu} quizzes={quizzes} go={go} />}
        {scr === SC.QUIZ_LIST  && <QuizListScreen  quizzes={quizzes} cu={cu} onStart={startQuiz} go={go} />}
        {scr === SC.QUIZ_PLAY  && aq && qs && <QuizPlayScreen quiz={aq} state={qs} onAnswer={answerQ} go={go} />}
        {scr === SC.VOCAB      && <VocabScreen     go={go} />}
        {scr === SC.RANK       && <RankScreen      users={users} cu={cu} go={go} />}
        {scr === SC.AI         && <AiScreen        go={go} />}
        {scr === SC.PROFILE    && <ProfileScreen   cu={cu} quizzes={quizzes} onLogout={logout} go={go} />}
        {scr === SC.ADMIN      && <AdminScreen     quizzes={quizzes} users={users} onAdd={addQuiz} onDel={delQuiz} toast={toast} go={go} />}
      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="mob" style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:300, background:"#fff", borderTop:"3px solid #E0E7FF", padding:"5px 2px 12px", boxShadow:"0 -4px 16px rgba(79,70,229,.1)", justifyContent:"space-around", alignItems:"center" }}>
        {navItems.slice(0, 7).map(function(n) {
          return (
            <button key={n.s} onClick={function() { go(n.s); }} style={{ background:scr===n.s ? "#EEF2FF" : "none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:1, padding:"4px 3px", borderRadius:12, flex:1, transition:"all .18s" }}>
              <span style={{ fontSize:19 }}>{n.icon}</span>
              <span style={{ fontSize:9, fontWeight:800, color:scr===n.s ? PR : MD }}>{n.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── BUBBLES ─────────────────────────────────────────────── */
function Bubbles() {
  var it = ["⭐","💡","🔵","✨","🎮","⚡","🏅","🎯","🔷","🎉","🌍","🚀"];
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      {it.map(function(e, i) {
        return <div key={i} style={{ position:"absolute", fontSize:(Math.random()*12+10)+"px", left:((i/it.length)*100)+"%", top:(Math.random()*90)+"%", opacity:.11, animation:(i%2?"floatA":"floatB")+" "+(5+i*.5)+"s ease-in-out infinite", animationDelay:(i*.35)+"s" }}>{e}</div>;
      })}
    </div>
  );
}

/* ── LOGIN ───────────────────────────────────────────────── */
function LoginScreen({ onLogin, onReg }) {
  var us = useState(""); var u = us[0]; var setU = us[1];
  var ps = useState(""); var p = ps[0]; var setP = ps[1];
  var sh = useState(false); var show = sh[0]; var setShow = sh[1];
  var es = useState(""); var err = es[0]; var setErr = es[1];
  var sk = useState(false); var shaking = sk[0]; var setSHK = sk[1];

  function shake() { setSHK(true); setTimeout(function() { setSHK(false); }, 480); }

  function go() {
    setErr("");
    if (!u && !p) { setErr("Username dan password tidak boleh kosong!"); shake(); return; }
    if (!u) { setErr("Harap isi username terlebih dahulu!"); shake(); return; }
    if (!p) { setErr("Harap isi password terlebih dahulu!"); shake(); return; }
    if (onLogin(u, p) === false) { setErr("Username atau password salah! Silakan coba lagi."); shake(); }
  }

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#1E1B4B 0%,#312E81 40%,#4F46E5 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"18px 14px", fontFamily:"'Nunito',sans-serif" }}>
      <style>{CSS}</style>
      <div style={{ width:"100%", maxWidth:440, textAlign:"center" }}>
        <div style={{ fontSize:80, animation:"floatA 3s ease-in-out infinite", display:"block", marginBottom:4 }}>🌐</div>
        <h1 style={{ fontFamily:"'Outfit',sans-serif", fontSize:40, color:PR, margin:"0 0 3px" }}>EnglishFun!</h1>
        <p style={{ color:"#CBD5E1", marginBottom:22, fontSize:15 }}>Belajar Bahasa Inggris itu Seru! 🌈</p>
        <div style={Object.assign(card({ padding:28 }), { animation:shaking?"shake .45s ease":"popIn .4s ease", maxWidth:400, margin:"0 auto" })}>
          <h2 style={{ fontWeight:900, color:DK, margin:"0 0 18px", fontSize:21 }}>🔐 Masuk ke Akun</h2>
          {err && (
            <div style={{ background:"#FEF2F2", border:"2px solid #FCA5A5", borderRadius:14, padding:"11px 14px", marginBottom:16, display:"flex", gap:10, animation:"errPop .2s ease", textAlign:"left" }}>
              <span style={{ fontSize:20, flexShrink:0 }}>⚠️</span>
              <div>
                <div style={{ color:"#B91C1C", fontWeight:800, fontSize:14 }}>Login Gagal!</div>
                <div style={{ color:"#DC2626", fontSize:13, marginTop:2 }}>{err}</div>
              </div>
            </div>
          )}
          <div style={{ marginBottom:14 }}>
            <label style={LBL}>👤 Username</label>
            <input style={Object.assign({}, INP, { borderColor:err?"#FCA5A5":"#E0E7FF" })} value={u} onChange={function(e) { setU(e.target.value); setErr(""); }} placeholder="Masukkan username…" autoCapitalize="none" autoCorrect="off" />
          </div>
          <div style={{ marginBottom:22 }}>
            <label style={LBL}>🔒 Password</label>
            <div style={{ position:"relative" }}>
              <input type={show?"text":"password"} style={Object.assign({}, INP, { paddingRight:46, borderColor:err?"#FCA5A5":"#E0E7FF" })} value={p} onChange={function(e) { setP(e.target.value); setErr(""); }} placeholder="Masukkan password…" onKeyDown={function(e) { if (e.key==="Enter") go(); }} />
              <span onClick={function() { setShow(function(v) { return !v; }); }} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", cursor:"pointer", fontSize:17, userSelect:"none" }}>{show?"🙈":"👁️"}</span>
            </div>
          </div>
          <button className="bhv" onClick={go} style={Object.assign(btn(PR), { width:"100%", justifyContent:"center", fontSize:16, padding:"13px" })}>🚀 Masuk Sekarang!</button>
          <p style={{ marginTop:16, color:MD, fontSize:14 }}>Belum punya akun? <span onClick={onReg} style={{ color:PR, fontWeight:800, cursor:"pointer" }}>Daftar gratis! 🎉</span></p>
        </div>
      </div>
    </div>
  );
}

/* ── REGISTER ────────────────────────────────────────────── */
function RegisterScreen({ onReg, onLogin }) {
  var fs = useState({ name:"", u:"", p:"", p2:"" }); var f = fs[0]; var setF = fs[1];
  var es = useState(""); var err = es[0]; var setErr = es[1];
  var sk = useState(false); var shaking = sk[0]; var setSHK = sk[1];
  function shake() { setSHK(true); setTimeout(function() { setSHK(false); }, 480); }
  function go() {
    setErr("");
    if (!f.name || !f.u || !f.p) { setErr("Semua kolom wajib diisi!"); shake(); return; }
    if (f.p.length < 6) { setErr("Password minimal 6 karakter!"); shake(); return; }
    if (f.p !== f.p2) { setErr("Konfirmasi password tidak cocok!"); shake(); return; }
    if (onReg(f.name, f.u, f.p) === false) { setErr("Username sudah digunakan."); shake(); }
  }
  function upd(k) { return function(e) { setF(function(v) { return Object.assign({}, v, { [k]:e.target.value }); }); setErr(""); }; }
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0F172A 0%,#1E3A5F 60%,#1D4ED8 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"18px 14px", fontFamily:"'Nunito',sans-serif" }}>
      <style>{CSS}</style>
      <div style={{ width:"100%", maxWidth:440, textAlign:"center" }}>
        <div style={{ fontSize:72, marginBottom:4 }}>🎉</div>
        <h1 style={{ fontFamily:"'Outfit',sans-serif", fontSize:34, color:PR, margin:"0 0 18px" }}>Buat Akun Baru!</h1>
        <div style={Object.assign(card({ padding:26 }), { animation:shaking?"shake .45s ease":"popIn .4s ease", maxWidth:400, margin:"0 auto" })}>
          {err && <div style={{ background:"#FEF2F2", border:"2px solid #FCA5A5", borderRadius:14, padding:"10px 14px", marginBottom:14, display:"flex", gap:9, textAlign:"left" }}><span>⚠️</span><div><div style={{ color:"#B91C1C", fontWeight:800, fontSize:13 }}>Oops!</div><div style={{ color:"#DC2626", fontSize:12, marginTop:2 }}>{err}</div></div></div>}
          {[["🏷️ Nama Lengkap","name","text","Nama kamu…","words"],["👤 Username","u","text","Username unik…","none"],["🔒 Password","p","password","Min. 6 karakter…","none"],["🔒 Konfirmasi","p2","password","Ulangi password…","none"]].map(function(row) {
            return (
              <div key={row[1]} style={{ marginBottom:12 }}>
                <label style={LBL}>{row[0]}</label>
                <input type={row[2]} style={INP} value={f[row[1]]} onChange={upd(row[1])} placeholder={row[3]} autoCapitalize={row[4]} />
              </div>
            );
          })}
          <button className="bhv" onClick={go} style={Object.assign(btn(SC2), { width:"100%", justifyContent:"center", fontSize:16, padding:"13px", marginTop:6 })}>✨ Daftar Sekarang!</button>
          <p style={{ marginTop:15, color:MD, fontSize:14 }}>Sudah punya akun? <span onClick={onLogin} style={{ color:PR, fontWeight:800, cursor:"pointer" }}>Masuk di sini 🔑</span></p>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE HEADER ─────────────────────────────────────────── */
function PageHdr({ emoji, title, desc, go, to }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:20 }}>
      <button className="bhv" onClick={function() { go(to || SC.HOME); }} style={btn("#94A3B8", { padding:"9px 18px", fontSize:14 })}>← Kembali</button>
      <div>
        <h2 style={{ fontSize:21, fontWeight:900, color:PR, margin:0 }}>{emoji} {title}</h2>
        {desc && <p style={{ color:MD, margin:"3px 0 0", fontSize:12 }}>{desc}</p>}
      </div>
    </div>
  );
}

/* ── HOME ────────────────────────────────────────────────── */
function HomeScreen({ cu, quizzes, go }) {
  var wod = WOD[new Date().getDate() % WOD.length];
  var lvl = cu.points < 100 ? "Pemula 🌱" : cu.points < 500 ? "Pelajar 📚" : cu.points < 1000 ? "Bintang ⭐" : "Master 🏆";
  var nxt = cu.points < 100 ? 100 : cu.points < 500 ? 500 : cu.points < 1000 ? 1000 : 9999;
  var pct = Math.min(100, Math.round((cu.points / nxt) * 100));
  var cards = [
    { emoji:"📝", label:"Latihan Soal",   desc:quizzes.length+" paket soal",     color:PR,        s:SC.QUIZ_LIST },
    { emoji:"📖", label:"Kosakata",       desc:"Daftar kata penting",            color:"#EC4899", s:SC.VOCAB },
    { emoji:"🤖", label:"AI Tutor",       desc:"Tanya apa saja ke AI",           color:OR,        s:SC.AI },
    { emoji:"🏆", label:"Papan Ranking",  desc:"Lihat posisi kamu",              color:GR,        s:SC.RANK },
  ];
  return (
    <div>
      {/* HERO */}
      <div className="hb" style={{ background:G1, borderRadius:22, padding:"28px 30px", marginBottom:18, color:"#fff", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 10px 32px rgba(79,70,229,.3)", position:"relative", overflow:"hidden", gap:12 }}>
        <div style={{ position:"absolute", right:-18, bottom:-18, fontSize:140, opacity:.08 }}>⚡</div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, letterSpacing:2, opacity:.8, marginBottom:3 }}>SELAMAT DATANG!</div>
          <h1 className="ht" style={{ fontFamily:"'Outfit',sans-serif", fontSize:28, margin:"0 0 7px", lineHeight:1.1 }}>Halo, {cu.name}! 👋</h1>
          <p style={{ fontSize:13, opacity:.9, margin:"0 0 15px" }}>Yuk lanjutkan belajar hari ini! 💪</p>
          <div style={{ background:"rgba(255,255,255,.2)", borderRadius:12, padding:"8px 14px", maxWidth:310 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5, fontSize:11, fontWeight:700 }}><span>{lvl}</span><span>{cu.points}/{nxt}</span></div>
            <div style={{ background:"rgba(255,255,255,.3)", borderRadius:50, height:8 }}><div style={{ background:"#fff", height:8, borderRadius:50, width:pct+"%", transition:"width 1s" }} /></div>
          </div>
        </div>
        <div className="ha" style={{ fontSize:78, animation:"floatA 3s ease-in-out infinite", flexShrink:0 }}>{cu.avatar}</div>
      </div>

      {/* STATS */}
      <div className="sg" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:18 }}>
        {[{l:"Total Poin",v:cu.points,e:"⭐",c:OR},{l:"Soal Selesai", v:cu.done&&cu.done.length||0,e:"📝",c:PR},{l:"Streak",v:(cu.streak||1)+"h",e:"🔥",c:"#EF4444"},{l:"Level",v:lvl.split(" ")[0],e:"🏅",c:PU}].map(function(x) {
          return <div key={x.l} style={card({ textAlign:"center", padding:"13px 7px" })}><div style={{ fontSize:24, marginBottom:2 }}>{x.e}</div><div style={{ fontSize:17, fontWeight:900, color:x.c }}>{x.v}</div><div style={{ fontSize:10, color:MD, fontWeight:600 }}>{x.l}</div></div>;
        })}
      </div>

      {/* WORD OF DAY */}
      <div onClick={function() { go(SC.VOCAB); }} style={Object.assign(card({ marginBottom:18, cursor:"pointer", background:"linear-gradient(135deg,#ECFEFF,#EFF6FF)", borderColor:"#BAE6FD", padding:"14px 17px" }), { display:"flex", alignItems:"center", gap:13 })}>
        <div style={{ fontSize:42, flexShrink:0, animation:"floatB 3s ease-in-out infinite" }}>{wod.emoji}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10, fontWeight:800, color:"#0891B2", letterSpacing:2, textTransform:"uppercase", marginBottom:2 }}>📅 Kata Hari Ini</div>
          <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:21, color:DK }}>{wod.word}</div>
          <div style={{ fontSize:13, color:PR, fontWeight:800, marginTop:1 }}>{wod.meaning}</div>
          <div style={{ fontSize:11, color:MD, fontStyle:"italic", marginTop:2 }}>"{wod.example}"</div>
        </div>
        <div style={{ fontSize:18, color:GR }}>→</div>
      </div>

      {/* AGE SELECTOR */}
      <div style={card({ marginBottom:18, padding:"15px 17px" })}>
        <div style={{ fontWeight:800, color:DK, fontSize:14, marginBottom:10 }}>🎓 Cocok untuk semua usia:</div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {[{l:"🧒 Anak-Anak",c:SC2,s:SC.QUIZ_LIST},{l:"👦 Remaja",c:PR,s:SC.QUIZ_LIST},{l:"👨 Dewasa",c:PU,s:SC.AI},{l:"👴 Lansia",c:OR,s:SC.VOCAB}].map(function(x) {
            return <button key={x.l} className="bhv" onClick={function() { go(x.s); }} style={btn(x.c, { padding:"8px 16px", fontSize:13 })}>{x.l}</button>;
          })}
        </div>
      </div>

      {/* MENU */}
      <h2 style={{ fontSize:18, fontWeight:900, color:DK, marginBottom:12 }}>🚀 Menu Utama</h2>
      <div className="mg" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
        {cards.map(function(x) {
          return (
            <div key={x.s} className="clift" onClick={function() { go(x.s); }} style={card({ cursor:"pointer", transition:"all .22s", borderColor:x.color+"44", padding:"16px 11px", background:"linear-gradient(135deg,"+x.color+"07,"+x.color+"16)" })}>
              <div style={{ fontSize:34, marginBottom:7 }}>{x.emoji}</div>
              <div style={{ fontWeight:900, color:x.color, fontSize:14 }}>{x.label}</div>
              <div style={{ color:MD, fontSize:11, marginTop:2 }}>{x.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── VIDEO LIST ──────────────────────────────────────────── */
function VideosScreen({ videos, go }) {
  if (!videos) videos = VIDEOS_DATA;
  var as = useState(null); var active = as[0]; var setActive = as[1];
  if (active) {
    if (active.type === "youtube") return <YoutubePlayer lesson={active} onClose={function() { setActive(null); }} />;
    return <LessonPlayer lesson={active} onClose={function() { setActive(null); }} go={go} />;
  }
  return (
    <div>
      <PageHdr emoji="🎬" title="Video Animasi" desc="Animasi interaktif & video pembelajaran! Ketuk untuk mulai 🔊" go={go} />
      <div className="vg" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
        {videos.map(function(v) {
          return (
            <div key={v.id} className="clift" onClick={function() { setActive(v); }} style={card({ padding:0, overflow:"hidden", transition:"all .22s", cursor:"pointer" })}>
              <div style={{ background: v.type==="youtube" ? "linear-gradient(135deg,#1E1B4B,#3730A3)" : v.slides&&v.slides.length>3 ? "linear-gradient(135deg,"+v.slides[0].color+"33,"+v.slides[3].color+"22)" : v.slides&&v.slides.length>0 ? "linear-gradient(135deg,"+v.slides[0].color+"33,"+v.slides[0].color+"11)" : "linear-gradient(135deg,#EEF2FF,#DBEAFE)", height:148, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:7, position:"relative" }}>
                <div style={{ fontSize:56, animation:"floatA 2.5s ease-in-out infinite" }}>{v.emoji}</div>
                <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", background:"rgba(0,0,0,.62)", color:"#fff", borderRadius:"50%", width:50, height:50, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>▶</div>
                <div style={{ position:"absolute", bottom:7, right:7, background:"rgba(0,0,0,.62)", color:"#fff", borderRadius:18, padding:"3px 9px", fontSize:10, fontWeight:700 }}>{v.type==="youtube"?"▶️ YouTube":"🔊 "+(v.slides?v.slides.length:0)+" slide"}</div>
              </div>
              <div style={{ padding:"13px 15px" }}>
                <h3 style={{ margin:"0 0 3px", fontWeight:900, color:DK, fontSize:15 }}>{v.title}</h3>
                <p style={{ margin:"0 0 9px", color:MD, fontSize:11, lineHeight:1.4 }}>{v.desc}</p>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={bdg(SC2)}>{v.level}</span>
                  {v.type==="youtube" ? <span style={bdg("#EF4444")}>▶️ YouTube</span> : <span style={bdg(OR)}>🔊 Ada Suara</span>}
                  <span style={{ color:MD, fontSize:10 }}>👁️ {(v.views||0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── YOUTUBE PLAYER ─────────────────────────────────────── */
function YoutubePlayer({ lesson, onClose }) {
  return (
    <div style={{ maxWidth:680, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <button className="bhv" onClick={onClose} style={btn("#94A3B8", { padding:"8px 15px", fontSize:13 })}>← Kembali</button>
        <span style={{ fontFamily:"'Outfit',sans-serif", color:PR, fontSize:15, fontWeight:900 }}>{lesson.emoji} {lesson.title}</span>
        <span style={bdg("EF4444" in {} ? "" : "#EF4444")}>▶️ YouTube</span>
      </div>
      <div style={card({ padding:0, overflow:"hidden" })}>
        <div style={{ background:"linear-gradient(135deg,#1E1B4B,#4F46E5)", padding:"20px", textAlign:"center", color:"#fff" }}>
          <div style={{ fontSize:48, marginBottom:8 }}>{lesson.emoji}</div>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, margin:"0 0 5px" }}>{lesson.title}</h2>
          <p style={{ opacity:.85, fontSize:13, margin:0 }}>{lesson.desc}</p>
        </div>
        <div style={{ position:"relative", paddingBottom:"56.25%", height:0, overflow:"hidden" }}>
          <iframe
            style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", border:"none" }}
            src={lesson.ytUrl + "?autoplay=1&rel=0&modestbranding=1"}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div style={{ padding:"16px 18px" }}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
            <span style={bdg(PR)}>{lesson.level || "Pemula"}</span>
            <span style={bdg("#EF4444")}>▶️ YouTube Video</span>
            <span style={{ color:MD, fontSize:12 }}>👁️ {(lesson.views||0).toLocaleString()} tayangan</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── LESSON PLAYER ───────────────────────────────────────── */
function LessonPlayer({ lesson, onClose, go }) {
  var idxS = useState(0); var idx = idxS[0]; var setIdx = idxS[1];
  var spkS = useState(false); var speaking = spkS[0]; var setSpeaking = spkS[1];
  var autoRef = useRef(false);
  var idxRef = useRef(0);
  var doneS = useState(false); var done = doneS[0]; var setDone = doneS[1];

  useEffect(function() { idxRef.current = idx; }, [idx]);
  useEffect(function() { return function() { if (window.speechSynthesis) window.speechSynthesis.cancel(); }; }, []);

  var slide = lesson.slides[Math.min(idx, lesson.slides.length - 1)];

  function getVoice() {
    if (!window.speechSynthesis) return null;
    var voices = window.speechSynthesis.getVoices() || [];
    return voices.find(function(v) { return v.lang.startsWith("en-") && v.name.toLowerCase().includes("female"); }) ||
           voices.find(function(v) { return v.lang === "en-US"; }) ||
           voices.find(function(v) { return v.lang.startsWith("en-"); }) || null;
  }

  function doSpeak(text, onDone) {
    if (!window.speechSynthesis) { if (onDone) onDone(); return; }
    window.speechSynthesis.cancel();
    setSpeaking(true);
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = 0.8; u.pitch = 1.1; u.volume = 1;
    var v = getVoice(); if (v) u.voice = v;
    u.onend = function() { setSpeaking(false); if (onDone) onDone(); };
    u.onerror = function() { setSpeaking(false); if (onDone) onDone(); };
    window.speechSynthesis.speak(u);
  }

  function speak(text, onDone) {
    if (!window.speechSynthesis) { if (onDone) onDone(); return; }
    if (window.speechSynthesis.getVoices().length > 0) {
      doSpeak(text, onDone);
    } else {
      window.speechSynthesis.onvoiceschanged = function() {
        window.speechSynthesis.onvoiceschanged = null;
        doSpeak(text, onDone);
      };
    }
  }

  function goNext() {
    var cur = idxRef.current;
    if (cur < lesson.slides.length - 1) {
      setIdx(cur + 1);
    } else {
      autoRef.current = false;
      setDone(true);
    }
  }

  function goPrev() {
    if (idxRef.current > 0) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setSpeaking(false);
      setIdx(function(i) { return i - 1; });
    }
  }

  function playNext() {
    if (!autoRef.current) return;
    var cur = idxRef.current;
    if (cur < lesson.slides.length) {
      speak(lesson.slides[cur].say, function() {
        if (autoRef.current) {
          setTimeout(function() {
            if (autoRef.current) goNext();
          }, 800);
        }
      });
    }
  }

  // Saat idx berubah & auto mode aktif
  useEffect(function() {
    if (autoRef.current && !done) {
      setTimeout(function() { playNext(); }, 100);
    }
  }, [idx]);

  function startAuto() {
    autoRef.current = true;
    playNext();
  }

  function stopAuto() {
    autoRef.current = false;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  if (done) return (
    <div style={{ maxWidth:500, margin:"0 auto", textAlign:"center" }}>
      <ConfettiEl />
      <div style={card({ padding:30, animation:"bounceIn .5s ease" })}>
        <div style={{ fontSize:76, marginBottom:10 }}>🎉</div>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:30, color:PR, margin:"0 0 6px" }}>Selesai! Hebat!</h2>
        <p style={{ color:MD, fontSize:15, marginBottom:22 }}>Kamu sudah selesai belajar <strong>{lesson.title}</strong>!</p>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="bhv" onClick={function() { setDone(false); setIdx(0); autoRef.current = false; }} style={btn(SC2)}>🔁 Ulangi</button>
          <button className="bhv" onClick={onClose} style={btn(PR)}>📚 Pelajaran Lain</button>
          <button className="bhv" onClick={function() { go(SC.QUIZ_LIST); }} style={btn(GR)}>📝 Coba Soal!</button>
        </div>
      </div>
    </div>
  );

  var pct = ((idx + 1) / lesson.slides.length) * 100;

  return (
    <div style={{ maxWidth:620, margin:"0 auto" }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:13 }}>
        <button className="bhv" onClick={function() { stopAuto(); onClose(); }} style={btn("#94A3B8", { padding:"8px 15px", fontSize:13 })}>← Kembali</button>
        <span style={{ fontFamily:"'Outfit',sans-serif", color:PR, fontSize:15 }}>{lesson.emoji} {lesson.title}</span>
        <div style={{ background:AC, borderRadius:50, padding:"5px 13px", fontWeight:800, fontSize:13, color:DK }}>{idx+1}/{lesson.slides.length}</div>
      </div>

      {/* Progress bar */}
      <div style={{ background:"#E0E7FF", borderRadius:50, height:11, marginBottom:16, overflow:"hidden" }}>
        <div style={{ background:"linear-gradient(90deg,"+slide.color+","+slide.color+"bb)", height:11, borderRadius:50, width:pct+"%", transition:"width .4s" }} />
      </div>

      {/* Slide card */}
      <div style={{ background:"linear-gradient(145deg,"+slide.color+"26,"+slide.color+"44)", borderRadius:26, padding:"38px 26px", textAlign:"center", marginBottom:16, border:"3px solid "+slide.color+"55", animation:"popIn .3s ease", minHeight:290, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-14, bottom:-14, fontSize:100, opacity:.07 }}>{slide.emoji}</div>

        {/* Speaking indicator */}
        {speaking && (
          <div style={{ position:"absolute", top:13, right:13, display:"flex", gap:3, alignItems:"flex-end", height:26 }}>
            {[5,12,18,12,7,16,9].map(function(h, i) {
              return <div key={i} style={{ width:4, height:h, background:slide.color, borderRadius:2, animation:"speakWave .5s ease "+(i*.07)+"s infinite" }} />;
            })}
          </div>
        )}

        <div style={{ fontSize:90, marginBottom:14, animation:speaking?"pulse .5s ease infinite":"floatB 2s ease-in-out infinite" }}>{slide.emoji}</div>
        <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:52, color:slide.color, lineHeight:1, marginBottom:9, textShadow:"2px 2px 0 "+slide.color+"33" }}>{slide.char}</div>
        <div style={{ fontSize:22, fontWeight:900, color:DK, marginBottom:5 }}>{slide.word}</div>
        <div style={{ fontSize:13, color:MD, lineHeight:1.6, maxWidth:380 }}>{slide.say}</div>
      </div>

      {/* Controls */}
      <div style={{ display:"flex", gap:9, justifyContent:"center", marginBottom:12, flexWrap:"wrap" }}>
        <button className="bhv" onClick={goPrev} disabled={idx===0} style={btn("#E2E8F0", { padding:"9px 16px", fontSize:13, color:DK, opacity:idx===0?.35:1, boxShadow:"none" })}>◀ Sebelumnya</button>
        <button className="bhv" onClick={function() { if (speaking) { if (window.speechSynthesis) window.speechSynthesis.cancel(); setSpeaking(false); } else { speak(slide.say, null); } }} style={btn(speaking ? OR : slide.color, { padding:"11px 22px", fontSize:14, animation:speaking?"pulse .6s ease infinite":"none" })}>
          {speaking ? "🔊 Berbicara…" : "🔊 Dengarkan"}
        </button>
        <button className="bhv" onClick={function() { if (window.speechSynthesis) window.speechSynthesis.cancel(); setSpeaking(false); goNext(); }} style={btn(idx===lesson.slides.length-1?"#10B981":PR, { padding:"9px 16px", fontSize:13 })}>
          {idx === lesson.slides.length - 1 ? "✅ Selesai" : "Berikutnya ▶"}
        </button>
      </div>

      {/* Auto play */}
      <div style={{ textAlign:"center", marginBottom:13 }}>
        <button className="bhv" onClick={function() { if (autoRef.current) { stopAuto(); } else { startAuto(); } }} style={btn(speaking || autoRef.current ? "#EF4444" : GR, { padding:"9px 19px", fontSize:13 })}>
          {autoRef.current || speaking ? "⏹ Stop Otomatis" : "▶ Play Otomatis + Suara"}
        </button>
      </div>

      {/* Dot nav */}
      <div style={{ display:"flex", justifyContent:"center", gap:6, flexWrap:"wrap" }}>
        {lesson.slides.map(function(sl, i) {
          return <button key={i} onClick={function() { if (window.speechSynthesis) window.speechSynthesis.cancel(); setSpeaking(false); setIdx(i); }} style={{ background:i===idx?slide.color:"#E2E8F0", border:"none", borderRadius:"50%", width:i===idx?13:9, height:i===idx?13:9, cursor:"pointer", transition:"all .2s", padding:0 }} />;
        })}
      </div>
    </div>
  );
}

/* ── CONFETTI ────────────────────────────────────────────── */
function ConfettiEl() {
  var cols = ["#4F46E5","#06B6D4","#F59E0B","#8B5CF6","#10B981","#EF4444"];
  return (
    <div style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:999, overflow:"hidden" }}>
      {Array.from({ length:20 }, function(_, i) {
        return <div key={i} style={{ position:"absolute", top:"-20px", left:((i/20)*100)+"%", width:9, height:9, borderRadius:2, background:cols[i%cols.length], animation:"confettiFall "+(1.3+Math.random()*.9)+"s ease "+(Math.random()*.4)+"s forwards" }} />;
      })}
    </div>
  );
}

/* ── QUIZ LIST ───────────────────────────────────────────── */
function QuizListScreen({ quizzes, cu, onStart, go }) {
  var fs = useState("Semua"); var filter = fs[0]; var setFilter = fs[1];
  var ss = useState(""); var search = ss[0]; var setSearch = ss[1];
  var cats = ["Semua"].concat([...new Set(quizzes.map(function(q) { return q.cat; }))]);
  var dc = { Mudah:GR, Sedang:OR, Sulit:"#EF4444" };
  var shown = quizzes.filter(function(q) {
    var catOk = filter === "Semua" || q.cat === filter;
    var srOk = !search || q.title.toLowerCase().includes(search.toLowerCase());
    return catOk && srOk;
  });
  return (
    <div>
      <PageHdr emoji="📝" title="Latihan Soal" desc="Pilih paket soal dan kumpulkan poin! 🎯" go={go} />
      <div style={{ position:"relative", marginBottom:12 }}>
        <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", fontSize:14 }}>🔍</span>
        <input value={search} onChange={function(e) { setSearch(e.target.value); }} style={Object.assign({}, INP, { paddingLeft:40 })} placeholder="Cari soal…" />
      </div>
      <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:16 }}>
        {cats.map(function(c) { return <button key={c} className="bhv" onClick={function() { setFilter(c); }} style={btn(filter===c?PR:"#E2E8F0", { padding:"6px 13px", fontSize:11, color:filter===c?"#fff":DK, boxShadow:"none" })}>{c}</button>; })}
      </div>
      {shown.length === 0 && <div style={{ textAlign:"center", padding:"38px", color:MD }}><div style={{ fontSize:44 }}>🔍</div><div style={{ fontWeight:700, marginTop:8 }}>Tidak ditemukan</div></div>}
      <div className="qg" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:13 }}>
        {shown.map(function(q) {
          var done2 = cu.done && cu.done.includes(q.id);
          return (
            <div key={q.id} className="clift" style={card({ textAlign:"center", transition:"all .22s", position:"relative", padding:"17px 12px" })}>
              {done2 && <div style={Object.assign(bdg(GR), { position:"absolute", top:9, right:9, fontSize:10 })}>✅ Selesai</div>}
              <div style={{ fontSize:44, marginBottom:8, animation:"floatB 3s ease-in-out infinite" }}>{q.emoji}</div>
              <h3 style={{ margin:"0 0 3px", fontWeight:900, color:DK, fontSize:14 }}>{q.title}</h3>
              <p style={{ color:MD, fontSize:11, margin:"0 0 9px" }}>{q.qs.length} pertanyaan</p>
              <div style={{ display:"flex", justifyContent:"center", gap:5, flexWrap:"wrap", marginBottom:9 }}>
                <span style={bdg(PU)}>{q.cat}</span>
                <span style={bdg(dc[q.diff]||GR)}>{q.diff||"Mudah"}</span>
                <span style={bdg(MD)}>⏱{q.tl||30}d</span>
              </div>
              <div style={{ background:"#F1F5FF", borderRadius:10, padding:"5px 9px", marginBottom:11, fontSize:10, color:MD }}>🏆 Maks: <strong style={{ color:OR }}>{q.qs.length*10+20} poin</strong></div>
              <button className="bhv" style={btn(done2?GR:PR, { width:"100%", justifyContent:"center", fontSize:13, padding:"9px" })} onClick={function() { onStart(q); }}>{done2?"🔁 Ulangi":"🚀 Mulai!"}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── QUIZ PLAY ───────────────────────────────────────────── */
function QuizPlayScreen({ quiz, state, onAnswer, go }) {
  var selS = useState(null); var sel = selS[0]; var setSel = selS[1];
  var revS = useState(false); var rev = revS[0]; var setRev = revS[1];
  var tlS = useState(quiz.tl || 30); var tl = tlS[0]; var setTL = tlS[1];
  var tmr = useRef();
  var optC = [PR, SC2, PU, OR];

  function pick(i) {
    if (rev) return;
    clearInterval(tmr.current);
    setSel(i); setRev(true);
    setTimeout(function() { onAnswer(i); setSel(null); setRev(false); }, 950);
  }

  useEffect(function() {
    if (state.done || rev) return;
    setTL(quiz.tl || 30);
    clearInterval(tmr.current);
    tmr.current = setInterval(function() {
      setTL(function(t) { if (t <= 1) { clearInterval(tmr.current); pick(-1); return 0; } return t - 1; });
    }, 1000);
    return function() { clearInterval(tmr.current); };
  }, [state.idx, state.done]);

  if (state.done) {
    var pct2 = Math.round((state.score / quiz.qs.length) * 100);
    var perf = state.score === quiz.qs.length;
    var el = Math.round((Date.now() - state.t0) / 1000);
    var emoj = perf ? "🏆" : pct2>=70 ? "🌟" : pct2>=40 ? "💪" : "📚";
    return (
      <div style={{ maxWidth:540, margin:"0 auto", textAlign:"center" }}>
        {perf && <ConfettiEl />}
        <div style={card({ animation:"popIn .4s ease", padding:26 })}>
          <div style={{ fontSize:74, marginBottom:8, animation:"pulse 1s ease infinite" }}>{emoj}</div>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:30, color:PR, margin:"0 0 5px" }}>Soal Selesai!</h2>
          <p style={{ fontSize:16, color:MD, margin:"0 0 20px" }}>{perf?"SEMPURNA! Luar biasa!":pct2>=70?"Bagus sekali!":pct2>=40?"Terus semangat!":"Ayo belajar lagi!"}</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
            {[{v:state.score+"/"+quiz.qs.length,l:"Benar",c:PR},{v:pct2+"%",l:"Skor",c:SC2},{v:Math.floor(el/60)+":"+(el%60).toString().padStart(2,"0"),l:"Waktu",c:PU}].map(function(x) {
              return <div key={x.l} style={{ background:"#F1F5FF", borderRadius:12, padding:"12px 7px" }}><div style={{ fontSize:24, fontWeight:900, color:x.c }}>{x.v}</div><div style={{ fontSize:11, color:MD, fontWeight:600 }}>{x.l}</div></div>;
            })}
          </div>
          <div style={{ textAlign:"left", marginBottom:18, maxHeight:240, overflowY:"auto" }}>
            <h3 style={{ fontWeight:900, color:DK, marginBottom:9, fontSize:14 }}>📋 Review Jawaban</h3>
            {quiz.qs.map(function(q, i) {
              var a = state.answers[i];
              return <div key={i} style={{ background:a&&a.ok?"#DBEAFE":"#FEE2E2", borderRadius:11, padding:"9px 12px", marginBottom:7 }}><div style={{ fontWeight:700, fontSize:12, marginBottom:2 }}>{i+1}. {q.q}</div><div style={{ fontSize:11, color:MD }}>{a&&a.ok?"✅ Benar!":"❌ Jawaban: "}<strong>{q.ops[q.ans]}</strong></div></div>;
            })}
          </div>
          <button className="bhv" style={btn(PR)} onClick={function() { go(SC.QUIZ_LIST); }}>📝 Soal Lainnya</button>
        </div>
      </div>
    );
  }

  var q = quiz.qs[state.idx];
  var tc = tl > 10 ? GR : tl > 5 ? OR : "#EF4444";
  return (
    <div style={{ maxWidth:620, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:13 }}>
        <button className="bhv" onClick={function() { go(SC.QUIZ_LIST); }} style={btn("#94A3B8", { padding:"7px 14px", fontSize:12 })}>← Kembali</button>
        <span style={{ fontFamily:"'Outfit',sans-serif", color:PR, fontSize:15 }}>{quiz.emoji} {quiz.title}</span>
        <div style={{ display:"flex", gap:7, alignItems:"center" }}>
          <div style={{ background:tc+"22", border:"2px solid "+tc, borderRadius:50, padding:"4px 12px", fontWeight:900, fontSize:13, color:tc, animation:tl<=5?"pulse .6s ease infinite":"none" }}>⏱ {tl}s</div>
          <div style={{ background:AC, borderRadius:50, padding:"4px 12px", fontWeight:800, fontSize:12, color:DK }}>{state.idx+1}/{quiz.qs.length}</div>
        </div>
      </div>
      <div style={{ background:"#E0E7FF", borderRadius:50, height:10, marginBottom:3, overflow:"hidden" }}><div style={{ background:"linear-gradient(90deg,"+tc+","+tc+"aa)", height:10, borderRadius:50, width:((tl/(quiz.tl||30))*100)+"%", transition:"width 1s linear" }} /></div>
      <div style={{ background:"#DBEAFE", borderRadius:50, height:5, marginBottom:16 }}><div style={{ background:PR, height:5, borderRadius:50, width:((state.idx/quiz.qs.length)*100)+"%", transition:"width .4s" }} /></div>
      <div style={card({ animation:"slideUp .3s ease", padding:20 })}>
        <div style={{ fontSize:10, fontWeight:800, color:SC2, letterSpacing:2, textTransform:"uppercase", marginBottom:7 }}>Pertanyaan {state.idx+1}</div>
        <h2 style={{ fontSize:20, fontWeight:900, color:DK, marginBottom:22, lineHeight:1.4 }}>{q.q}</h2>
        <div className="qo" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {q.ops.map(function(opt, i) {
            var bg = optC[i]+"17", brd = "2px solid "+optC[i]+"40", tc2 = DK;
            if (rev && sel === i) { bg = i===q.ans?"#DBEAFE":"#FEE2E2"; brd = "2px solid "+(i===q.ans?PR:"#EF4444"); tc2 = i===q.ans?PR:"#EF4444"; }
            else if (rev && i === q.ans) { bg = "#DBEAFE"; brd = "2px solid "+PR; tc2 = PR; }
            return (
              <button key={i} className={rev?"":"optb"} onClick={function() { pick(i); }} style={{ background:bg, border:brd, borderRadius:13, padding:"11px 12px", fontSize:14, fontWeight:800, cursor:rev?"default":"pointer", fontFamily:"'Nunito',sans-serif", color:tc2, textAlign:"left", transition:"all .2s", display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ background:rev&&i===q.ans?GR:rev&&sel===i?"#EF4444":optC[i], color:"#fff", borderRadius:"50%", width:27, height:27, display:"inline-flex", alignItems:"center", justifyContent:"center", fontWeight:900, flexShrink:0, fontSize:12 }}>
                  {rev&&i===q.ans?"✓":rev&&sel===i?"✗":["A","B","C","D"][i]}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
        {!rev && <div style={{ textAlign:"center", marginTop:12 }}><button onClick={function() { pick(-1); }} style={{ background:"none", border:"1.5px dashed "+MD, borderRadius:50, padding:"5px 15px", fontSize:12, color:MD, fontWeight:700 }}>⏭ Lewati</button></div>}
      </div>
    </div>
  );
}

/* ── FLASHCARDS ──────────────────────────────────────────── */
function FlashScreen({ go }) {
  var as = useState(null); var active = as[0]; var setA = as[1];
  var is = useState(0); var idx = is[0]; var setIdx = is[1];
  var fs = useState(false); var flip = fs[0]; var setFlip = fs[1];
  var ks = useState([]); var known = ks[0]; var setKnown = ks[1];

  function next(k) {
    if (k) setKnown(function(p) { return p.concat([idx]); });
    if (idx + 1 >= active.cards.length) { setA(null); return; }
    setIdx(function(i) { return i + 1; }); setFlip(false);
  }

  if (active) {
    if (idx >= active.cards.length) return (
      <div style={{ maxWidth:400, margin:"0 auto", textAlign:"center" }}>
        <div style={card({ padding:26 })}>
          <div style={{ fontSize:60 }}>🎉</div>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:26, color:PR, margin:"12px 0 7px" }}>Selesai!</h2>
          <p style={{ color:MD, marginBottom:18, fontSize:14 }}>Kamu tahu {known.length}/{active.cards.length} kata!</p>
          <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
            <button className="bhv" style={btn(PR)} onClick={function() { setA(null); }}>← Daftar Set</button>
            <button className="bhv" style={btn(SC2)} onClick={function() { setIdx(0); setFlip(false); setKnown([]); }}>🔁 Ulangi</button>
          </div>
        </div>
      </div>
    );
    var c = active.cards[idx];
    return (
      <div style={{ maxWidth:460, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:13 }}>
          <button className="bhv" onClick={function() { setA(null); }} style={btn("#94A3B8", { padding:"7px 14px", fontSize:12 })}>← Kembali</button>
          <span style={{ fontWeight:800, color:MD, fontSize:13 }}>{idx+1}/{active.cards.length} · ✅{known.length}</span>
        </div>
        <div style={{ background:"#E0E7FF", borderRadius:50, height:9, marginBottom:20 }}><div style={{ background:PR, height:9, borderRadius:50, width:((idx/active.cards.length)*100)+"%", transition:"width .3s" }} /></div>
        <div onClick={function() { setFlip(function(v) { return !v; }); }} style={{ cursor:"pointer", background:flip?G2:G1, borderRadius:22, padding:"48px 28px", textAlign:"center", color:"#fff", boxShadow:"0 12px 36px rgba(255,107,107,.23)", marginBottom:20, minHeight:190, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", transition:"background .35s", animation:"popIn .3s ease" }}>
          <div style={{ fontSize:11, fontWeight:700, opacity:.8, letterSpacing:2, marginBottom:12, textTransform:"uppercase" }}>{flip?"🇮🇩 Artinya":"🇬🇧 Bahasa Inggris"}</div>
          <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:46, lineHeight:1.1 }}>{flip?c.b:c.f}</div>
          <div style={{ marginTop:13, opacity:.75, fontSize:11 }}>{flip?"Ketuk untuk kata Inggris":"Ketuk untuk artinya"}</div>
        </div>
        {flip && (
          <div style={{ display:"flex", gap:11, animation:"slideUp .3s ease" }}>
            <button className="bhv" onClick={function() { next(false); }} style={btn("#EF4444", { flex:1, justifyContent:"center", fontSize:14, padding:"12px" })}>😕 Belum Tahu</button>
            <button className="bhv" onClick={function() { next(true); }} style={btn(GR, { flex:1, justifyContent:"center", fontSize:14, padding:"12px" })}>😄 Sudah Tahu!</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <PageHdr emoji="🃏" title="Flashcard Kosakata" desc="Hafal kosakata baru dengan flashcard! 💡" go={go} />
      <div className="fg" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:13 }}>
        {FLASH_DATA.map(function(s) {
          return (
            <div key={s.id} className="clift" style={card({ textAlign:"center", cursor:"pointer", transition:"all .22s" })}>
              <div style={{ fontSize:46, marginBottom:8 }}>{s.emoji}</div>
              <h3 style={{ fontWeight:900, color:DK, margin:"0 0 3px", fontSize:14 }}>{s.title}</h3>
              <p style={{ color:MD, fontSize:11, margin:"0 0 13px" }}>{s.cards.length} kartu</p>
              <button className="bhv" style={btn(SC2, { width:"100%", justifyContent:"center", fontSize:12, padding:"8px" })} onClick={function() { setA(s); setIdx(0); setFlip(false); setKnown([]); }}>🃏 Mulai!</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── VOCAB ───────────────────────────────────────────────── */
function VocabScreen({ go }) {
  var ss = useState(""); var search = ss[0]; var setSearch = ss[1];
  var cs = useState("Semua"); var cat = cs[0]; var setCat = cs[1];
  var today = WOD[new Date().getDate() % WOD.length];
  var cats = ["Semua"].concat([...new Set(VOCAB.map(function(w) { return w.cat; }))]);
  var shown = VOCAB.filter(function(w) {
    return (cat === "Semua" || w.cat === cat) && (!search || w.w.toLowerCase().includes(search.toLowerCase()) || w.m.toLowerCase().includes(search.toLowerCase()));
  });
  return (
    <div>
      <PageHdr emoji="📖" title="Kosakata" desc="Pelajari kata-kata penting! 📚" go={go} />
      <div style={{ background:"linear-gradient(135deg,#ECFEFF,#EFF6FF)", borderRadius:18, padding:"14px 18px", marginBottom:18, border:"2px solid #A5F3FC", display:"flex", alignItems:"center", gap:13 }}>
        <div style={{ fontSize:42, flexShrink:0, animation:"floatB 3s ease-in-out infinite" }}>{today.emoji}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10, fontWeight:800, color:"#0891B2", letterSpacing:2, textTransform:"uppercase", marginBottom:2 }}>📅 Kata Hari Ini</div>
          <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, color:DK }}>{today.word}</div>
          <div style={{ fontSize:13, color:PR, fontWeight:800, marginTop:1 }}>{today.meaning}</div>
          <div style={{ fontSize:11, color:MD, fontStyle:"italic", marginTop:2 }}>"{today.example}"</div>
        </div>
      </div>
      <div style={{ position:"relative", marginBottom:11 }}>
        <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:14 }}>🔍</span>
        <input value={search} onChange={function(e) { setSearch(e.target.value); }} style={Object.assign({}, INP, { paddingLeft:38 })} placeholder="Cari kata…" />
      </div>
      <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:16 }}>
        {cats.map(function(c) { return <button key={c} className="bhv" onClick={function() { setCat(c); }} style={btn(cat===c?PR:"#E2E8F0", { padding:"6px 12px", fontSize:11, color:cat===c?"#fff":DK, boxShadow:"none" })}>{c}</button>; })}
      </div>
      {shown.length === 0 ? <div style={{ textAlign:"center", padding:"38px", color:MD }}><div style={{ fontSize:44 }}>🔍</div><div style={{ fontWeight:700, marginTop:8 }}>Tidak ditemukan</div></div> : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))", gap:11 }}>
          {shown.map(function(w, i) {
            return (
              <div key={i} className="clift" style={card({ padding:"12px 10px", textAlign:"center", transition:"all .2s" })}>
                <div style={{ fontSize:28, marginBottom:5 }}>{w.e}</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:16, color:DK, marginBottom:2 }}>{w.w}</div>
                <div style={{ fontSize:12, color:PR, fontWeight:800, marginBottom:4 }}>{w.m}</div>
                <div style={{ fontSize:10, color:MD, fontStyle:"italic", lineHeight:1.4 }}>"{w.ex}"</div>
                <div style={{ marginTop:5 }}><span style={bdg(PU)}>{w.cat}</span></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── LEADERBOARD ─────────────────────────────────────────── */
function RankScreen({ users, cu, go }) {
  var sorted = users.slice().sort(function(a, b) { return b.points - a.points; });
  var medals = ["🥇","🥈","🥉"];
  var top = [sorted[1], sorted[0], sorted[2]].filter(Boolean);
  return (
    <div style={{ maxWidth:660, margin:"0 auto" }}>
      <PageHdr emoji="🏆" title="Papan Ranking" desc="Siapa yang paling banyak poin? 💪" go={go} />
      <div className="lp" style={{ display:"flex", justifyContent:"center", alignItems:"flex-end", gap:13, marginBottom:26 }}>
        {top.map(function(u, pi) {
          var rank = pi===1?1:pi===0?2:3;
          var h = pi===1?112:pi===0?86:68;
          var bg = pi===1?G1:pi===0?"linear-gradient(135deg,#CBD5E1,#94A3B8)":"linear-gradient(135deg,#F59E0B,#D97706)";
          return (
            <div key={u.id} style={{ textAlign:"center", width:92 }}>
              <div style={{ fontSize:28, marginBottom:3 }}>{u.avatar}</div>
              <div style={{ fontWeight:800, fontSize:11, color:DK, marginBottom:2 }}>{u.name}</div>
              <div style={{ fontSize:11, color:OR, marginBottom:6 }}>⭐{u.points}</div>
              <div style={{ background:bg, height:h, borderRadius:"9px 9px 0 0", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"'Outfit',sans-serif", fontSize:26 }}>{medals[rank-1]}</div>
            </div>
          );
        })}
      </div>
      <div style={card()}>
        {sorted.map(function(u, i) {
          return (
            <div key={u.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 0", borderBottom:i<sorted.length-1?"1px solid #E0E7FF":"none", background:u.id===cu.id?"#EEF2FF":"transparent", borderRadius:10, paddingLeft:u.id===cu.id?10:0 }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:17, color:MD, width:26, textAlign:"center" }}>{medals[i]||String(i+1)}</span>
              <span style={{ fontSize:26 }}>{u.avatar}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:800, color:DK, fontSize:13 }}>{u.name} {u.id===cu.id&&<span style={bdg(PR)}>Kamu</span>}</div>
                <div style={{ fontSize:10, color:MD }}>@{u.username} · {u.done&&u.done.length||0} soal</div>
              </div>
              <div style={{ fontWeight:900, fontSize:15, color:OR }}>⭐{u.points}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── AI TUTOR ────────────────────────────────────────────── */
function AiScreen({ go }) {
  var ms = useState([{ role:"assistant", text:"Halo! Saya AI Tutor bahasa Inggris untuk semua usia! 🤖✨\n\nSaya bisa bantu:\n• Arti kata dan penggunaan\n• Latihan kalimat\n• Soal latihan\n• Cara pengucapan\n\nTanya apa saja! 😊" }]);
  var msgs = ms[0]; var setMsgs = ms[1];
  var inp = useState(""); var input = inp[0]; var setInput = inp[1];
  var ls = useState(false); var loading = ls[0]; var setLoading = ls[1];
  var botRef = useRef();
  var sugg = ["Apa artinya 'happy'?","Cara pakai 'I am'","Buatkan 5 soal mudah","Apa beda 'a' dan 'an'?","Cara baca 'beautiful'"];

  useEffect(function() { if (botRef.current) botRef.current.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  function send(text) {
    var msg = text || input.trim();
    if (!msg || loading) return;
    setInput(""); setLoading(true);
    setMsgs(function(p) { return p.concat([{ role:"user", text:msg }]); });
    var hist = msgs.map(function(m) { return { role:m.role==="assistant"?"assistant":"user", content:m.text }; });
    fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:600, system:"Kamu adalah AI Tutor bahasa Inggris yang ramah dan sabar untuk SEMUA KALANGAN — dari anak SD, remaja, dewasa, hingga lansia. Gunakan bahasa Indonesia yang mudah dipahami. Beri contoh kalimat sehari-hari. Pakai emoji secukupnya. Jawaban singkat dan jelas. Selalu sertakan arti setiap kata Inggris.", messages:hist.concat([{ role:"user", content:msg }]) })
    }).then(function(r) { return r.json(); }).then(function(data) {
      var txt = (data.content||[]).map(function(c) { return c.text||""; }).join("") || "Maaf, coba lagi!";
      setMsgs(function(p) { return p.concat([{ role:"assistant", text:txt }]); });
      setLoading(false);
    }).catch(function() {
      setMsgs(function(p) { return p.concat([{ role:"assistant", text:"Maaf, ada gangguan. Coba lagi! 😅" }]); });
      setLoading(false);
    });
  }

  return (
    <div style={{ maxWidth:660, margin:"0 auto" }}>
      <PageHdr emoji="🤖" title="AI English Tutor" desc="Tanya apa saja! Cocok untuk semua usia 💬" go={go} />
      <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:13 }}>
        {sugg.map(function(s) { return <button key={s} className="bhv" onClick={function() { send(s); }} style={{ background:AC, border:"none", borderRadius:50, padding:"6px 12px", fontSize:11, fontWeight:700, color:DK }}>{s}</button>; })}
      </div>
      <div style={card({ padding:0, overflow:"hidden" })}>
        <div style={{ height:390, overflowY:"auto", padding:15, display:"flex", flexDirection:"column", gap:11 }}>
          {msgs.map(function(m, i) {
            return (
              <div key={i} style={{ display:"flex", gap:8, flexDirection:m.role==="user"?"row-reverse":"row", alignItems:"flex-start", animation:"slideUp .2s ease" }}>
                <div style={{ fontSize:22, flexShrink:0 }}>{m.role==="assistant"?"🤖":"😊"}</div>
                <div className="cm" style={{ background:m.role==="assistant"?"#F1F5FF":G1, color:m.role==="assistant"?DK:"#fff", borderRadius:m.role==="assistant"?"4px 15px 15px 15px":"15px 4px 15px 15px", padding:"10px 13px", maxWidth:"76%", fontSize:13, lineHeight:1.65, fontWeight:500, border:m.role==="assistant"?"1px solid #E0E7FF":"none", whiteSpace:"pre-wrap" }}>{m.text}</div>
              </div>
            );
          })}
          {loading && (
            <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
              <div style={{ fontSize:22 }}>🤖</div>
              <div style={{ background:"#F8FAFF", borderRadius:"4px 15px 15px 15px", padding:"11px 14px", border:"1px solid #E0E7FF", fontSize:12, color:MD }}>
                <span style={{ display:"inline-block", animation:"spin 1s linear infinite" }}>⏳</span> Berpikir…
              </div>
            </div>
          )}
          <div ref={botRef} />
        </div>
        <div style={{ borderTop:"2px solid #E0E7FF", padding:"11px 13px", display:"flex", gap:8 }}>
          <input value={input} onChange={function(e) { setInput(e.target.value); }} onKeyDown={function(e) { if (e.key==="Enter") send(); }} style={Object.assign({}, INP, { flex:1, fontSize:13 })} placeholder="Tanya tentang bahasa Inggris…" />
          <button className="bhv" onClick={function() { send(); }} disabled={!input.trim()||loading} style={btn(PR, { padding:"10px 16px", opacity:!input.trim()||loading?.5:1 })}>🚀</button>
        </div>
      </div>
    </div>
  );
}

/* ── PROFILE ─────────────────────────────────────────────── */
function ProfileScreen({ cu, quizzes, onLogout, go }) {
  var lvl = cu.points<100?"Pemula 🌱":cu.points<500?"Pelajar 📚":cu.points<1000?"Bintang ⭐":"Master 🏆";
  var nxt = cu.points<100?100:cu.points<500?500:cu.points<1000?1000:9999;
  var pct2 = Math.min(100, Math.round((cu.points/nxt)*100));
  var badges = [
    {e:"🌟",l:"Pelajar Baru",  d:"Login pertama",        ok:true},
    {e:"🎯",l:"Soal Pertama",   d:"Kerjakan 1 paket soal",    ok:(cu.done&&cu.done.length||0)>=1},
    {e:"📚",l:"Rajin Belajar",  d:"Kerjakan 3 paket soal",    ok:(cu.done&&cu.done.length||0)>=3},
    {e:"💯",l:"Poin 100",      d:"Kumpulkan 100 poin",   ok:cu.points>=100},
    {e:"🔥",l:"Streak 7 Hari",d:"7 hari berturut",       ok:(cu.streak||0)>=7},
    {e:"🏆",l:"Master",        d:"Kumpulkan 500 poin",   ok:cu.points>=500},
  ];
  return (
    <div style={{ maxWidth:600, margin:"0 auto" }}>
      <PageHdr emoji="👤" title="Profil Saya" go={go} />
      <div style={card({ background:G1, border:"none", color:"#fff", textAlign:"center", marginBottom:16, padding:"28px 22px" })}>
        <div style={{ fontSize:76, marginBottom:7, animation:"floatA 3s ease-in-out infinite" }}>{cu.avatar}</div>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:28, margin:"0 0 3px" }}>{cu.name}</h2>
        <p style={{ opacity:.85, margin:"0 0 5px", fontSize:12 }}>@{cu.username}</p>
        <span style={{ background:"rgba(255,255,255,.3)", borderRadius:50, padding:"4px 13px", fontSize:12, fontWeight:700 }}>{lvl}</span>
        <div style={{ marginTop:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, fontWeight:700, marginBottom:5 }}><span>Progress</span><span>{cu.points}/{nxt}</span></div>
          <div style={{ background:"rgba(255,255,255,.3)", borderRadius:50, height:9 }}><div style={{ background:"#fff", height:9, borderRadius:50, width:pct2+"%", transition:"width 1s" }} /></div>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:11, marginBottom:16 }}>
        {[{v:cu.points,l:"Poin",e:"⭐",c:OR},{v:cu.done&&cu.done.length||0,l:"Soal",e:"📝",c:PR},{v:(cu.streak||1)+"h",l:"Streak",e:"🔥",c:"#EF4444"}].map(function(x) {
          return <div key={x.l} style={card({ textAlign:"center", padding:"13px 7px" })}><div style={{ fontSize:22 }}>{x.e}</div><div style={{ fontSize:20, fontWeight:900, color:x.c }}>{x.v}</div><div style={{ fontSize:10, color:MD, fontWeight:600 }}>{x.l}</div></div>;
        })}
      </div>
      <div style={card({ marginBottom:14 })}>
        <h3 style={{ fontWeight:900, color:DK, margin:"0 0 13px", fontSize:15 }}>🏅 Lencana Pencapaian</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {badges.map(function(b) {
            return (
              <div key={b.l} style={{ background:b.ok?"#DBEAFE":"#F8FAFC", borderRadius:13, padding:"12px 9px", textAlign:"center", opacity:b.ok?1:.42, border:"2px solid "+(b.ok?"#4F46E5":"#E2E8F0") }}>
                <div style={{ fontSize:28, marginBottom:4 }}>{b.e}</div>
                <div style={{ fontWeight:800, fontSize:11, color:DK }}>{b.l}</div>
                <div style={{ fontSize:10, color:MD, marginTop:2 }}>{b.d}</div>
                <div style={{ marginTop:5, fontSize:10, fontWeight:800, color:b.ok?PR:MD }}>{b.ok?"✅ Didapat!":"🔒 Belum"}</div>
              </div>
            );
          })}
        </div>
      </div>
      {cu.joined && <div style={Object.assign(card({ marginBottom:14 }), { display:"flex", alignItems:"center", gap:11 })}><span style={{ fontSize:28 }}>📅</span><div><div style={{ fontWeight:800, color:DK, fontSize:13 }}>Bergabung sejak</div><div style={{ color:MD, fontSize:12 }}>{cu.joined}</div></div></div>}
      <button className="bhv" onClick={onLogout} style={btn("#EF4444", { width:"100%", justifyContent:"center", fontSize:15 })}>🚪 Keluar dari Akun</button>
    </div>
  );
}

/* ── ADMIN ───────────────────────────────────────────────── */
function AdminScreen({ quizzes, users, onAdd, onDel, toast, go }) {
  var ts = useState("dash"); var tab = ts[0]; var setTab = ts[1];
  var tabs = [["dash","📊 Dashboard"],["add","📝 Tambah Soal"],["pdf","📄 Upload PDF"],["manage","🗂️ Kelola Soal"],["users","👥 Pengguna"]];
  return (
    <div>
      <PageHdr emoji="⚙️" title="Panel Admin" go={go} />
      <div className="at" style={{ display:"flex", gap:7, marginBottom:20, flexWrap:"wrap" }}>
        {tabs.map(function(t) { return <button key={t[0]} className="bhv" onClick={function() { setTab(t[0]); }} style={btn(tab===t[0]?PR:"#E2E8F0", { padding:"8px 14px", fontSize:12, color:tab===t[0]?"#fff":DK, boxShadow:"none", whiteSpace:"nowrap" })}>{t[1]}</button>; })}
      </div>
      {tab==="dash"   && <AdminDash   quizzes={quizzes} users={users} />}
      {tab==="add"    && <AdminAdd    onAdd={onAdd} toast={toast} />}
      {tab==="pdf"    && <AdminPDF    onAdd={onAdd} toast={toast} />}
      {tab==="manage" && <AdminManage quizzes={quizzes} onDel={onDel} />}
      {tab==="users"  && <AdminUsers  users={users} />}
    </div>
  );
}


/* ── ADMIN ADD VIDEO ──────────────────────────────────────── */
function AdminAddVideo({ toast }) {
  var ms = useState({ title:"", emoji:"🎬", desc:"", level:"Pemula" });
  var meta = ms[0]; var setMeta = ms[1];
  var ss = useState([]); var slides = ss[0]; var setSlides = ss[1];
  var cur_s = useState({ char:"", word:"", emoji:"", color:"#4F46E5", say:"" });
  var curSlide = cur_s[0]; var setCurSlide = cur_s[1];
  var yt_s = useState(""); var ytUrl = yt_s[0]; var setYtUrl = yt_s[1];
  var mode_s = useState("slides"); var mode = mode_s[0]; var setMode = mode_s[1];

  // Extract YouTube embed ID dari berbagai format URL
  function getYtId(url) {
    var patterns = [
      /youtu\.be\/([^?&\s]+)/,
      /youtube\.com\/watch\?v=([^?&\s]+)/,
      /youtube\.com\/embed\/([^?&\s]+)/,
      /youtube\.com\/shorts\/([^?&\s]+)/,
    ];
    for (var i = 0; i < patterns.length; i++) {
      var m = url.match(patterns[i]);
      if (m) return m[1];
    }
    return null;
  }

  function addSlide() {
    if (!curSlide.char || !curSlide.word || !curSlide.say) {
      toast("Isi Kata Inggris, Arti, dan Kalimat Suara!", "err"); return;
    }
    var emoji = curSlide.emoji || "📖";
    setSlides(function(p) { return p.concat([Object.assign({ id:Date.now() }, curSlide, { emoji:emoji })]); });
    setCurSlide({ char:"", word:"", emoji:"", color:"#4F46E5", say:"" });
    toast("Slide ditambahkan! ✅");
  }

  function removeSlide(id) {
    setSlides(function(p) { return p.filter(function(s) { return s.id !== id; }); });
  }

  function save() {
    if (!meta.title || !meta.emoji) { toast("Isi judul & emoji!", "err"); return; }
    if (mode === "slides" && slides.length === 0) { toast("Tambahkan minimal 1 slide!", "err"); return; }
    if (mode === "youtube") {
      var ytId = getYtId(ytUrl);
      if (!ytId) { toast("URL YouTube tidak valid!", "err"); return; }
      onAddVideo({
        title: meta.title, desc: meta.desc || meta.title, level: meta.level,
        emoji: meta.emoji, views: 0, type: "youtube",
        ytId: ytId, ytUrl: "https://www.youtube.com/embed/" + ytId,
        slides: [],
      });
    } else {
      onAddVideo({
        title: meta.title, desc: meta.desc || meta.title, level: meta.level,
        emoji: meta.emoji, views: 0, type: "slides",
        slides: slides,
      });
    }
    setMeta({ title:"", emoji:"🎬", desc:"", level:"Pemula" });
    setSlides([]); setYtUrl("");
  }

  var colors = ["#4F46E5","#10B981","#F59E0B","#EF4444","#06B6D4","#8B5CF6","#F97316","#EC4899","#14B8A6","#6366F1"];
  var levels = ["Pemula","Menengah","Lanjutan"];

  return (
    <div>
      {/* INFO VIDEO */}
      <div style={card({ marginBottom:18 })}>
        <h3 style={{ fontWeight:900, color:DK, margin:"0 0 16px", fontSize:15 }}>🎬 Info Video</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
          <div>
            <label style={LBL}>Judul Video</label>
            <input style={INP} value={meta.title} onChange={function(e) { setMeta(function(v) { return Object.assign({}, v, { title:e.target.value }); }); }} placeholder="Contoh: Kata Sifat Dasar" />
          </div>
          <div>
            <label style={LBL}>Emoji</label>
            <input style={INP} value={meta.emoji} onChange={function(e) { setMeta(function(v) { return Object.assign({}, v, { emoji:e.target.value }); }); }} placeholder="🎬" />
          </div>
        </div>
        <div style={{ marginBottom:12 }}>
          <label style={LBL}>Deskripsi (opsional)</label>
          <input style={INP} value={meta.desc} onChange={function(e) { setMeta(function(v) { return Object.assign({}, v, { desc:e.target.value }); }); }} placeholder="Deskripsi singkat video…" />
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={LBL}>Level</label>
          <div style={{ display:"flex", gap:8 }}>
            {levels.map(function(l) {
              return <button key={l} className="bhv" onClick={function() { setMeta(function(v) { return Object.assign({}, v, { level:l }); }); }} style={btn(meta.level===l ? PR : "#E2E8F0", { padding:"7px 16px", fontSize:12, color:meta.level===l?"#fff":DK, boxShadow:"none" })}>{l}</button>;
            })}
          </div>
        </div>

        {/* MODE PILIH */}
        <div style={{ background:"#EEF2FF", borderRadius:14, padding:"14px 16px" }}>
          <div style={{ fontWeight:800, color:DK, marginBottom:10, fontSize:13 }}>📌 Jenis Video:</div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <button className="bhv" onClick={function() { setMode("slides"); }} style={btn(mode==="slides"?PR:"#E2E8F0", { fontSize:13, color:mode==="slides"?"#fff":DK, boxShadow:"none" })}>
              🎞️ Buat Slide Animasi
            </button>
            <button className="bhv" onClick={function() { setMode("youtube"); }} style={btn(mode==="youtube"?"#EF4444":"#E2E8F0", { fontSize:13, color:mode==="youtube"?"#fff":DK, boxShadow:"none" })}>
              ▶️ Link YouTube
            </button>
          </div>
        </div>
      </div>

      {/* MODE YOUTUBE */}
      {mode === "youtube" && (
        <div style={card({ marginBottom:18 })}>
          <h3 style={{ fontWeight:900, color:DK, margin:"0 0 14px", fontSize:15 }}>▶️ Tambah dari YouTube</h3>
          <p style={{ color:MD, fontSize:13, marginBottom:14, lineHeight:1.5 }}>
            Paste link YouTube video pembelajaran kamu. Mendukung format:<br/>
            • <code style={{ background:"#F1F5FF", padding:"1px 6px", borderRadius:4 }}>youtube.com/watch?v=...</code><br/>
            • <code style={{ background:"#F1F5FF", padding:"1px 6px", borderRadius:4 }}>youtu.be/...</code><br/>
            • <code style={{ background:"#F1F5FF", padding:"1px 6px", borderRadius:4 }}>youtube.com/shorts/...</code>
          </p>
          <label style={LBL}>🔗 URL YouTube</label>
          <input style={INP} value={ytUrl} onChange={function(e) { setYtUrl(e.target.value); }} placeholder="https://youtube.com/watch?v=..." />
          {ytUrl && (function() {
            var patterns = [/youtu\.be\/([^?&\s]+)/,/youtube\.com\/watch\?v=([^?&\s]+)/,/youtube\.com\/embed\/([^?&\s]+)/,/youtube\.com\/shorts\/([^?&\s]+)/];
            var ytId = null;
            for (var i=0;i<patterns.length;i++){var m=ytUrl.match(patterns[i]);if(m){ytId=m[1];break;}}
            if (!ytId) return <p style={{ color:"#EF4444", fontSize:12, marginTop:8 }}>⚠️ URL tidak valid, coba format lain</p>;
            return (
              <div style={{ marginTop:14 }}>
                <div style={{ fontSize:12, color:GR, fontWeight:700, marginBottom:8 }}>✅ Video ID: {ytId}</div>
                <div style={{ borderRadius:14, overflow:"hidden", border:"2px solid #E0E7FF" }}>
                  <iframe width="100%" height={200} src={"https://www.youtube.com/embed/"+ytId} title="Preview" frameBorder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope" allowFullScreen style={{ display:"block" }} />
                </div>
              </div>
            );
          })()}
          <button className="bhv" onClick={save} style={btn(PR, { width:"100%", justifyContent:"center", marginTop:16, fontSize:14 })}>💾 Simpan Video YouTube</button>
        </div>
      )}

      {/* MODE SLIDES */}
      {mode === "slides" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }} className="ag">
          {/* Form tambah slide */}
          <div style={card()}>
            <h3 style={{ fontWeight:900, color:DK, margin:"0 0 14px", fontSize:15 }}>➕ Tambah Slide</h3>
            <p style={{ color:MD, fontSize:12, marginBottom:14, lineHeight:1.5 }}>Setiap slide = 1 kata/kalimat yang akan diucapkan dengan suara.</p>

            <div style={{ marginBottom:11 }}>
              <label style={LBL}>🔤 Kata / Huruf (tampil besar)</label>
              <input style={INP} value={curSlide.char} onChange={function(e) { setCurSlide(function(v) { return Object.assign({}, v, { char:e.target.value }); }); }} placeholder="Contoh: Apple / Good Morning / A" />
            </div>
            <div style={{ marginBottom:11 }}>
              <label style={LBL}>🇮🇩 Arti dalam Bahasa Indonesia</label>
              <input style={INP} value={curSlide.word} onChange={function(e) { setCurSlide(function(v) { return Object.assign({}, v, { word:e.target.value }); }); }} placeholder="Contoh: Apel / Selamat Pagi" />
            </div>
            <div style={{ marginBottom:11 }}>
              <label style={LBL}>💬 Emoji (opsional)</label>
              <input style={INP} value={curSlide.emoji} onChange={function(e) { setCurSlide(function(v) { return Object.assign({}, v, { emoji:e.target.value }); }); }} placeholder="Contoh: 🍎" />
            </div>
            <div style={{ marginBottom:11 }}>
              <label style={LBL}>🔊 Kalimat Suara (akan diucapkan)</label>
              <textarea style={Object.assign({}, INP, { height:72, resize:"vertical" })} value={curSlide.say} onChange={function(e) { setCurSlide(function(v) { return Object.assign({}, v, { say:e.target.value }); }); }} placeholder="Contoh: Apple! Apel. I love apples!" />
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={LBL}>🎨 Warna Slide</label>
              <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginTop:6 }}>
                {colors.map(function(c) {
                  return (
                    <div key={c} onClick={function() { setCurSlide(function(v) { return Object.assign({}, v, { color:c }); }); }}
                      style={{ width:32, height:32, borderRadius:8, background:c, cursor:"pointer", border:curSlide.color===c?"3px solid "+DK:"3px solid transparent", transition:"all .15s" }} />
                  );
                })}
              </div>
            </div>
            {/* Preview slide kecil */}
            {curSlide.char && (
              <div style={{ background:"linear-gradient(135deg,"+curSlide.color+"33,"+curSlide.color+"55)", borderRadius:14, padding:"18px 16px", textAlign:"center", marginBottom:14, border:"2px solid "+curSlide.color+"66" }}>
                <div style={{ fontSize:36, marginBottom:6 }}>{curSlide.emoji||"📖"}</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:26, color:curSlide.color, fontWeight:900 }}>{curSlide.char}</div>
                <div style={{ fontSize:14, fontWeight:800, color:DK }}>{curSlide.word}</div>
                <div style={{ fontSize:11, color:MD, marginTop:4, fontStyle:"italic" }}>{curSlide.say}</div>
              </div>
            )}
            <button className="bhv" onClick={addSlide} style={btn(PR, { width:"100%", justifyContent:"center", fontSize:13 })}>➕ Tambah Slide</button>
          </div>

          {/* List slides + save */}
          <div>
            <div style={card({ marginBottom:14 })}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <h3 style={{ fontWeight:900, color:DK, margin:0, fontSize:15 }}>🎞️ Daftar Slide ({slides.length})</h3>
                {slides.length > 0 && <button className="bhv" onClick={save} style={btn(GR, { padding:"8px 16px", fontSize:12 })}>💾 Simpan Video</button>}
              </div>
              {slides.length === 0 ? (
                <div style={{ textAlign:"center", color:MD, padding:"28px 16px" }}>
                  <div style={{ fontSize:36, marginBottom:8 }}>🎞️</div>
                  <div style={{ fontSize:13 }}>Belum ada slide. Tambahkan dari form kiri!</div>
                </div>
              ) : (
                <div style={{ maxHeight:400, overflowY:"auto" }}>
                  {slides.map(function(s, i) {
                    return (
                      <div key={s.id} style={{ background:"linear-gradient(135deg,"+s.color+"18,"+s.color+"28)", borderRadius:12, padding:"11px 13px", marginBottom:9, border:"2px solid "+s.color+"44", display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ fontSize:28, flexShrink:0 }}>{s.emoji||"📖"}</div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontWeight:900, color:s.color, fontSize:16 }}>{s.char}</div>
                          <div style={{ fontWeight:700, color:DK, fontSize:12 }}>{s.word}</div>
                          <div style={{ fontSize:10, color:MD, marginTop:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.say}</div>
                        </div>
                        <button onClick={function() { removeSlide(s.id); }} style={{ background:"#FEE2E2", border:"none", borderRadius:8, padding:"5px 8px", cursor:"pointer", color:"#EF4444", fontWeight:800, fontSize:12 }}>✕</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {slides.length > 0 && (
              <button className="bhv" onClick={save} style={btn(PR, { width:"100%", justifyContent:"center", fontSize:14 })}>💾 Simpan Video ({slides.length} slide)</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── ADMIN VIDEO MANAGE ────────────────────────────────────── */
function AdminVideoManage({ videos}) {
  if (!videos) videos = [];
  return (
    <div style={card()}>
      <h3 style={{ fontWeight:900, color:DK, margin:"0 0 14px", fontSize:15 }}>🎥 Kelola Video ({videos.length})</h3>
      {videos.length === 0 && (
        <div style={{ textAlign:"center", color:MD, padding:"28px", fontSize:14 }}>
          <div style={{ fontSize:44, marginBottom:8 }}>🎬</div>
          <div>Belum ada video. Tambahkan dari tab "Tambah Video"!</div>
        </div>
      )}
      {videos.map(function(v) {
        return (
          <div key={v.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 0", borderBottom:"1px solid #E0E7FF" }}>
            <span style={{ fontSize:28 }}>{v.emoji}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800, color:DK, fontSize:14 }}>{v.title}</div>
              <div style={{ fontSize:11, color:MD, display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", marginTop:2 }}>
                <span style={bdg(v.type==="youtube"?"#EF4444":"#7C3AED")}>{v.type==="youtube"?"▶️ YouTube":"🎞️ Slide Animasi"}</span>
                <span>{v.level||"Pemula"}</span>
                {v.slides && v.slides.length > 0 && <span>{v.slides.length} slide</span>}
              </div>
            </div>
            <button className="bhv" onClick={function() { onDelVideo(v.id); }} style={btn("#EF4444", { padding:"7px 12px", fontSize:11 })}>🗑️ Hapus</button>
          </div>
        );
      })}
    </div>
  );
}

function AdminDash({ quizzes, users }) {
  var tq = quizzes.reduce(function(a, q) { return a + q.qs.length; }, 0);
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 }}>
        {[{e:"📝",l:"Total Soal",v:quizzes.length,c:PR},{e:"❓",l:"Total Soal",v:tq,c:PU},{e:"👥",l:"Pengguna",v:users.length,c:SC2}].map(function(x) {
          return <div key={x.l} style={card({ textAlign:"center", padding:"15px 9px" })}><div style={{ fontSize:32, marginBottom:4 }}>{x.e}</div><div style={{ fontSize:24, fontWeight:900, color:x.c }}>{x.v}</div><div style={{ fontSize:11, color:MD, fontWeight:600 }}>{x.l}</div></div>;
        })}
      </div>
      <div style={card()}>
        <h3 style={{ fontWeight:900, color:DK, margin:"0 0 13px", fontSize:14 }}>📋 Semua Paket Soal</h3>
        {quizzes.length === 0 && <p style={{ color:MD, textAlign:"center", fontSize:13, padding:"14px" }}>Belum ada kuis.</p>}
        {quizzes.map(function(q) { return <div key={q.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:"1px solid #E0E7FF" }}><span style={{ fontSize:22 }}>{q.emoji}</span><div style={{ flex:1 }}><div style={{ fontWeight:800, color:DK, fontSize:13 }}>{q.title}</div><div style={{ fontSize:10, color:MD }}>{q.qs.length} soal · {q.cat} · ⏱{q.tl||30}d</div></div><span style={bdg(PU)}>{q.diff||"Mudah"}</span></div>; })}
      </div>
    </div>
  );
}

function AdminAdd({ onAdd, toast }) {
  var is = useState({ title:"", emoji:"📝", cat:"", diff:"Mudah", tl:30 }); var info = is[0]; var setInfo = is[1];
  var qss = useState([]); var qs2 = qss[0]; var setQs2 = qss[1];
  var cs = useState({ q:"", ops:["","","",""], ans:0 }); var cur = cs[0]; var setCur = cs[1];
  function upd(k) { return function(e) { setInfo(function(v) { return Object.assign({}, v, { [k]:e.target.value }); }); }; }
  function addQ() { if (!cur.q || cur.ops.some(function(o) { return !o; })) { toast("Isi semua kolom!","err"); return; } setQs2(function(p) { return p.concat([Object.assign({ id:Date.now() }, cur)]); }); setCur({ q:"", ops:["","","",""], ans:0 }); toast("Soal ditambahkan! ✅"); }
  function save() { if (!info.title || !info.cat || qs2.length===0) { toast("Lengkapi info paket soal!","err"); return; } onAdd(Object.assign({}, info, { qs:qs2 })); setInfo({ title:"", emoji:"📝", cat:"", diff:"Mudah", tl:30 }); setQs2([]); }
  return (
    <div className="ag" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:17 }}>
      <div>
        <div style={card({ marginBottom:14 })}>
          <h3 style={{ fontWeight:900, color:DK, margin:"0 0 13px", fontSize:14 }}>📋 Info Paket Soal</h3>
          {[["Judul Paket Soal","title","Contoh: Soal Buah-buahan"],["Emoji","emoji","🍎"],["Kategori","cat","Buah"]].map(function(row) { return <div key={row[1]} style={{ marginBottom:10 }}><label style={LBL}>{row[0]}</label><input style={INP} value={info[row[1]]} onChange={upd(row[1])} placeholder={row[2]} /></div>; })}
          <div style={{ marginBottom:10 }}><label style={LBL}>Kesulitan</label><div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>{["Mudah","Sedang","Sulit"].map(function(d) { return <button key={d} className="bhv" onClick={function() { setInfo(function(v) { return Object.assign({}, v, { diff:d }); }); }} style={btn(info.diff===d?PR:"#E2E8F0", { padding:"6px 13px", fontSize:11, color:info.diff===d?"#fff":DK, boxShadow:"none" })}>{d}</button>; })}</div></div>
          <div style={{ marginBottom:12 }}><label style={LBL}>⏱ Waktu per Soal (detik)</label><input type="number" style={INP} value={info.tl} min={10} max={120} onChange={function(e) { setInfo(function(v) { return Object.assign({}, v, { tl:+e.target.value }); }); }} /></div>
          <div style={{ background:"#EEF2FF", borderRadius:10, padding:"8px 12px", marginBottom:12, fontSize:13 }}>✅ <strong>{qs2.length}</strong> soal ditambahkan</div>
          <button className="bhv" style={btn(GR, { width:"100%", justifyContent:"center", fontSize:13 })} onClick={save}>💾 Simpan Soal</button>
        </div>
        {qs2.length > 0 && <div style={card({ maxHeight:240, overflowY:"auto" })}><h4 style={{ fontWeight:900, color:DK, margin:"0 0 9px", fontSize:13 }}>Daftar Soal ({qs2.length})</h4>{qs2.map(function(q, i) { return <div key={q.id} style={{ background:"#F8FAFF", borderRadius:10, padding:"7px 10px", marginBottom:6, fontSize:11 }}><strong>{i+1}.</strong> {q.q}<div style={{ color:GR, marginTop:2, fontSize:10 }}>✅ {q.ops[q.ans]}</div></div>; })}</div>}
      </div>
      <div style={card()}>
        <h3 style={{ fontWeight:900, color:DK, margin:"0 0 13px", fontSize:14 }}>➕ Tambah Pertanyaan</h3>
        <div style={{ marginBottom:10 }}><label style={LBL}>Pertanyaan</label><textarea style={Object.assign({}, INP, { height:68, resize:"vertical" })} value={cur.q} onChange={function(e) { setCur(function(v) { return Object.assign({}, v, { q:e.target.value }); }); }} placeholder="Tulis pertanyaan…" /></div>
        {["A","B","C","D"].map(function(opt, i) {
          return (
            <div key={i} style={{ marginBottom:9 }}>
              <label style={Object.assign({}, LBL, { color:cur.ans===i?GR:"#94A3B8", fontSize:12 })}>Opsi {opt} {cur.ans===i&&"✅ Jawaban Benar"}</label>
              <div style={{ display:"flex", gap:7 }}>
                <input style={Object.assign({}, INP, { flex:1, fontSize:13 })} value={cur.ops[i]} onChange={function(e) { var v = e.target.value; setCur(function(prev) { var ops = prev.ops.slice(); ops[i] = v; return Object.assign({}, prev, { ops:ops }); }); }} placeholder={"Pilihan "+opt+"…"} />
                <button className="bhv" onClick={function() { setCur(function(v) { return Object.assign({}, v, { ans:i }); }); }} style={btn(cur.ans===i?GR:"#E2E8F0", { padding:"8px 11px", color:cur.ans===i?"#fff":DK, boxShadow:"none" })}>✓</button>
              </div>
            </div>
          );
        })}
        <button className="bhv" style={btn(PR, { width:"100%", justifyContent:"center", marginTop:9, fontSize:13 })} onClick={addQ}>➕ Tambah Soal</button>
        <button className="bhv" style={btn(GR, { width:"100%", justifyContent:"center", marginTop:7, fontSize:13 })} onClick={save}>💾 Simpan ({qs2.length} soal)</button>
      </div>
    </div>
  );
}

function AdminPDF({ onAdd, toast }) {
  var fs = useState(null); var file = fs[0]; var setFile = fs[1];
  var ls = useState(false); var loading = ls[0]; var setLoading = ls[1];
  var es = useState([]); var extracted = es[0]; var setEx = es[1];
  var qi = useState({ title:"", emoji:"📄", cat:"", diff:"Mudah", tl:30 }); var qinf = qi[0]; var setQi = qi[1];
  var fr = useRef();

  function parse() {
    if (!file) return; setLoading(true);
    var reader = new FileReader();
    reader.onload = function() {
      var b64 = reader.result.split(",")[1];
      fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:2000,
          messages:[{
            role:"user",
            content:[
              { type:"document", source:{ type:"base64", media_type:"application/pdf", data:b64 } },
              { type:"text", text:"Baca PDF ini. Ekstrak SEMUA soal pilihan ganda yang ada. Kembalikan HANYA JSON array murni tanpa backtick, tanpa teks lain, langsung mulai dengan [: [{\"q\":\"teks pertanyaan\",\"ops\":[\"pilihan A\",\"pilihan B\",\"pilihan C\",\"pilihan D\"],\"ans\":0}] - ans adalah angka index jawaban benar (0,1,2, atau 3). Jika tidak ada soal pilihan ganda, kembalikan array kosong []." }
            ]
          }]
        })
      }).then(function(r) {
        if (!r.ok) { throw new Error("HTTP " + r.status); }
        return r.json();
      }).then(function(data) {
        try {
          var raw = (data.content||[]).map(function(c) { return c.text||""; }).join("");
          // Bersihkan semua kemungkinan format
          var txt = raw.replace(/```json/g,"").replace(/```/g,"").trim();
          // Cari array JSON
          var startIdx = txt.indexOf("[");
          var endIdx = txt.lastIndexOf("]");
          if (startIdx === -1 || endIdx === -1) throw new Error("No array found");
          txt = txt.slice(startIdx, endIdx + 1);
          var parsed = JSON.parse(txt);
          if (!Array.isArray(parsed)) throw new Error("Not array");
          if (parsed.length === 0) { toast("Tidak ada soal pilihan ganda di PDF ini.", "warn"); setLoading(false); return; }
          setEx(parsed.map(function(q, i) { return Object.assign({ id:Date.now()+i }, q); }));
          toast("✅ " + parsed.length + " soal berhasil diekstrak!");
        } catch(e) {
          toast("Gagal baca hasil AI. Pastikan PDF berisi soal pilihan ganda!", "err");
        }
        setLoading(false);
      }).catch(function(err) {
        toast("Gagal memproses PDF: " + (err.message||"coba lagi"), "err");
        setLoading(false);
      });
    };
    reader.onerror = function() { toast("Gagal baca file.", "err"); setLoading(false); };
    reader.readAsDataURL(file);
  }

  function importAll() {
    if (!qinf.title || !qinf.cat) { toast("Isi judul & kategori!","err"); return; }
    onAdd(Object.assign({}, qinf, { qs:extracted }));
    setEx([]); setFile(null); setQi({ title:"", emoji:"📄", cat:"", diff:"Mudah", tl:30 });
    toast("Soal dari PDF disimpan! ✅");
  }

  return (
    <div className="ag" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:17 }}>
      <div>
        <div style={card({ marginBottom:14 })}>
          <h3 style={{ fontWeight:900, color:DK, margin:"0 0 12px", fontSize:14 }}>📄 Upload File PDF</h3>
          <p style={{ color:MD, fontSize:12, marginBottom:13, lineHeight:1.5 }}>Upload PDF berisi soal pilihan ganda. AI akan otomatis mengekstraknya! 🤖✨</p>
          <div onClick={function() { if (fr.current) fr.current.click(); }} style={{ border:"3px dashed "+(file?GR:PR), borderRadius:16, padding:"26px 16px", textAlign:"center", cursor:"pointer", background:file?"#F0FFF4":"#FFF9F0", marginBottom:12, transition:"all .2s" }}>
            <div style={{ fontSize:36, marginBottom:5 }}>{file?"✅":"📁"}</div>
            <div style={{ fontWeight:800, color:DK, fontSize:13 }}>{file?file.name:"Klik untuk pilih PDF"}</div>
            <div style={{ fontSize:10, color:MD, marginTop:3 }}>Format .pdf · Maks 10MB</div>
          </div>
          <input ref={fr} type="file" accept=".pdf" style={{ display:"none" }} onChange={function(e) { setFile(e.target.files[0]); setEx([]); }} />
          {file && <button className="bhv" onClick={parse} disabled={loading} style={btn(PU, { width:"100%", justifyContent:"center", opacity:loading?.65:1, fontSize:13 })}>{loading?<span style={{ animation:"spin 1s linear infinite", display:"inline-block" }}>⏳</span>:null}{loading?" Memproses PDF…":"🤖 Ekstrak Soal dengan AI"}</button>}
        </div>
        {extracted.length > 0 && (
          <div style={card()}>
            <h4 style={{ fontWeight:900, color:DK, margin:"0 0 11px", fontSize:13 }}>📋 Info Paket Soal Baru</h4>
            {[["Judul","title","Nama paket soal…"],["Emoji","emoji","📄"],["Kategori","cat","Kategori…"]].map(function(row) { return <div key={row[1]} style={{ marginBottom:8 }}><label style={LBL}>{row[0]}</label><input style={INP} value={qinf[row[1]]} onChange={function(e) { var v = e.target.value; setQi(function(prev) { return Object.assign({}, prev, { [row[1]]:v }); }); }} placeholder={row[2]} /></div>; })}
            <button className="bhv" style={btn(GR, { width:"100%", justifyContent:"center", fontSize:12, marginTop:8 })} onClick={importAll}>✅ Simpan Soal ({extracted.length} soal)</button>
          </div>
        )}
      </div>
      <div style={card()}>
        <h3 style={{ fontWeight:900, color:DK, margin:"0 0 12px", fontSize:14 }}>🔍 Preview Soal</h3>
        {extracted.length === 0 ? <div style={{ textAlign:"center", color:"#CBD5E1", padding:"36px 16px" }}><div style={{ fontSize:40, marginBottom:8 }}>📋</div><div style={{ fontSize:12 }}>Soal dari PDF tampil di sini</div></div> : (
          <div style={{ maxHeight:440, overflowY:"auto" }}>
            {extracted.map(function(q, i) { return <div key={q.id} style={{ background:"#F8FAFF", borderRadius:11, padding:"11px 13px", marginBottom:8, border:"1px solid #E0E7FF" }}><div style={{ fontWeight:800, color:DK, marginBottom:6, fontSize:12 }}>{i+1}. {q.q}</div>{(q.ops||[]).map(function(o,j) { return <div key={j} style={{ fontSize:11, padding:"2px 0", color:j===q.ans?GR:MD, fontWeight:j===q.ans?800:400 }}>{j===q.ans?"✅":"○"} {["A","B","C","D"][j]}. {o}</div>; })}</div>; })}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminManage({ quizzes, onDel }) {
  return (
    <div style={card()}>
      <h3 style={{ fontWeight:900, color:DK, margin:"0 0 13px", fontSize:14 }}>🗂️ Kelola Paket Soal ({quizzes.length})</h3>
      {quizzes.length === 0 && <p style={{ color:MD, textAlign:"center", padding:"16px", fontSize:13 }}>Belum ada kuis.</p>}
      {quizzes.map(function(q) { return <div key={q.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 0", borderBottom:"1px solid #E0E7FF" }}><span style={{ fontSize:24 }}>{q.emoji}</span><div style={{ flex:1 }}><div style={{ fontWeight:800, color:DK, fontSize:13 }}>{q.title}</div><div style={{ fontSize:10, color:MD }}>{q.qs.length} soal · {q.cat} · {q.diff||"Mudah"} · ⏱{q.tl||30}d</div></div><button className="bhv" onClick={function() { onDel(q.id); }} style={btn("#EF4444", { padding:"6px 11px", fontSize:11 })}>🗑️ Hapus</button></div>; })}
    </div>
  );
}

function AdminUsers({ users }) {
  var sorted = users.slice().sort(function(a,b) { return b.points - a.points; });
  return (
    <div style={card({ overflowX:"auto" })}>
      <h3 style={{ fontWeight:900, color:DK, margin:"0 0 13px", fontSize:14 }}>👥 Data Pengguna ({users.length})</h3>
      <table style={{ width:"100%", borderCollapse:"collapse", minWidth:360 }}>
        <thead><tr style={{ background:"#F1F5FF" }}>{["","Nama","Username","Role","Soal","Poin"].map(function(h) { return <th key={h} style={{ padding:"8px 10px", textAlign:"left", fontWeight:800, color:DK, fontSize:11 }}>{h}</th>; })}</tr></thead>
        <tbody>{sorted.map(function(u) {
          return (
            <tr key={u.id} style={{ borderTop:"1px solid #E0E7FF" }}>
              <td style={{ padding:"9px 10px", fontSize:20 }}>{u.avatar}</td>
              <td style={{ padding:"9px 10px", fontWeight:700, color:DK, fontSize:12 }}>{u.name}</td>
              <td style={{ padding:"9px 10px", color:MD, fontSize:12 }}>@{u.username}</td>
              <td style={{ padding:"9px 10px" }}><span style={bdg(u.role==="admin"?PR:SC2)}>{u.role==="admin"?"👑 Admin":"🎓 Siswa"}</span></td>
              <td style={{ padding:"9px 10px", color:MD, fontSize:12 }}>{u.done&&u.done.length||0}</td>
              <td style={{ padding:"9px 10px", fontWeight:900, color:OR, fontSize:12 }}>⭐{u.points}</td>
            </tr>
          );
        })}</tbody>
      </table>
    </div>
  );
}
