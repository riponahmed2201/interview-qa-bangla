# Node.js ইন্টারভিউ প্রশ্ন ও উত্তর (বাংলা)

---

## ফ্রেশার লেভেল

### ১. Node.js কিভাবে কাজ করে?
**উত্তর:** Node.js একটাই থ্রেডে চলে, ইভেন্ট-চালিত। V8 ইঞ্জিন JavaScript কে দ্রুত মেশিন কোডে রূপান্তর করে। Event Loop অ্যাসিঙ্ক কাজ (ফাইল, নেটওয়ার্ক) ব্লক না করে handle করে। Libuv লাইব্রেরি ব্যাকগ্রাউন্ড কাজের জন্য থ্রেড পুল দেয়।

---

### ২. NPM কি?
**উত্তর:** Node Package Manager। প্যাকেজ ইনস্টল, আপডেট, শেয়ার করতে ব্যবহৃত। `package.json` দিয়ে প্রজেক্টের dependency ও স্ক্রিপ্ট ম্যানেজ করা হয়। যেমন: `npm install`, `npm update`।

---

### ৩. Node.js কেন single-threaded?
**উত্তর:** JavaScript অ্যাসিঙ্ক ও নন-ব্লকিং। এক থ্রেডেই অনেক রিকোয়েস্ট handle করা যায় I/O অপেক্ষা করার সময় অন্য কাজ চালিয়ে গিয়ে। তাই জটিল মাল্টি-থ্রেড ম্যানেজমেন্টের দরকার হয় না।

---

### ৪. Single-threaded হয়েও কিভাবে একসাথে অনেক কাজ করে?
**উত্তর:** Event Loop একটা থ্রেডে চলে কিন্তু I/O (ডাটাবেস, ফাইল) অপেক্ষা করার সময় ব্লক করে না। কাজ সিস্টেম/কার্নেলকে দিয়ে দেয়, শেষ হলে callback কিউতে যায় এবং Event Loop সেটা run করে। তাই এক থ্রেডেই কনকারেন্সি আসে।

---

### ৫. Node.js কেন Java/PHP এর চেয়ে পছন্দ করা হয়?
**উত্তর:** I/O-তে দ্রুত, NPM এ হাজারো প্যাকেজ, রিয়েল-টাইম অ্যাপের জন্য উপযুক্ত, ফ্রন্ট ও ব্যাকএন্ড একই JavaScript, যারা জাভাস্ক্রিপ্ট জানেন তাদের জন্য সহজ।

---

### ৬. Synchronous vs Asynchronous এর পার্থক্য?
**উত্তর:**  
- **Synchronous:** একটা কাজ শেষ হওয়া পর্যন্ত পরেরটা শুরু হয় না, ব্লক করে।  
- **Asynchronous:** কাজ শুরু করে অন্য কাজ চালিয়ে যায়, শেষে callback/promise দিয়ে রেজাল্ট পায়।  
ইন্টারভিউতে বলো: "সিনক্রোনাস একটার পর একটা, অ্যাসিঙ্ক একসাথে অনেক কাজের সূচনা এবং পরে রেজাল্ট হ্যান্ডেল।"

**উদাহরণ:**
```js
// Synchronous – একটার পর একটা
const data = fs.readFileSync('file.txt');
console.log(data);

// Asynchronous – ব্লক না করে, callback এ রেজাল্ট
fs.readFile('file.txt', (err, data) => {
  console.log(data);
});
console.log('এটা আগে print হবে');
```

---

### ৭. Node.js এ Module কি?
**উত্তর:** এক বা একাধিক ফাইলে থাকা কোডের ব্লক যেটা একটা কাজ করে (যেমন HTTP, ফাইল সিস্টেম)। পুনঃব্যবহার ও কোড ছোট রাখতে ব্যবহৃত। উদাহরণ: `http`, `fs`, `path`।

---

### ৮. `require` কি কাজে লাগে?
**উত্তর:** বিল্ট-ইন বা এক্সটার্নাল মডিউল প্রজেক্টে এনে ব্যবহার করার জন্য। যেমন: `const http = require('http');`

---

### ৯. V8 ইঞ্জিন কি?
**উত্তর:** গুগলের JavaScript ইঞ্জিন (C++)। Chrome এও ব্যবহার হয়। JavaScript কে মেশিন কোডে কম্পাইল করে দ্রুত চালায়, মেমরি ও গার্বেজ কালেকশন ম্যানেজ করে।

---

### ১০. Environment variable কিভাবে ব্যবহার করব?
**উত্তর:** `process.env.VARIABLE_NAME` দিয়ে। `.env` ফাইলে রাখতে `dotenv` প্যাকেজ: `require('dotenv').config();` তারপর `process.env.PORT` ইত্যাদি।

**উদাহরণ:**  
`.env` ফাইলে:
```
PORT=3000
DB_URL=mongodb://localhost/mydb
SECRET=mySecretKey
```
কোডে:
```js
require('dotenv').config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;
```

---

### ১১. Control flow কি?
**উত্তর:** অ্যাসিঙ্ক কাজগুলো কোন অর্ডারে চলবে এবং তাদের রেজাল্ট কিভাবে হ্যান্ডেল হবে সেটা। Node.js নন-ব্লকিং বলে কাজগুলো যে অর্ডারে স্টার্ট হয় সেই অর্ডারে শেষ নাও হতে পারে—control flow দিয়ে সেটা ঠিকভাবে ম্যানেজ করা হয়।

---

### ১২. Event Loop কি?
**উত্তর:** একটা মেকানিজম যেটা এক থ্রেডে অনেক অ্যাসিঙ্ক কাজ চালায়। ইভেন্ট শুনে সংশ্লিষ্ট callback গুলো run করে।

**উদাহরণ:** আউটপুট হবে: Start → End → Timeout callback (setTimeout পরের সাইকেলে চলে)
```js
console.log("Start");
setTimeout(() => console.log("Timeout callback"), 0);
console.log("End");
```

---

### ১৩. REPL কি?
**উত্তর:** Read, Evaluate, Print, Loop। কনসোলে `node` লিখে এন্টার করলে যে পরিবেশ আসে সেখানে কোড লিখে সাথে সাথে রেজাল্ট দেখতে পারো। ডিবাগ ও দ্রুত টেস্টের জন্য ভালো।

---

### ১৪. Node.js এর অসুবিধা কি?
**উত্তর:** এক থ্রেড বলে মাল্টি-কোর পুরোটা ব্যবহার নাও হতে পারে; রিলেশনাল DB (MySQL) এর চেয়ে NoSQL বেশি ব্যবহার হয়; API দ্রুত বদলায় বলে কখনো ব্রেকিং চেঞ্জ আসে।

---

### ১৫. Module কিভাবে ইম্পোর্ট করব?
**উত্তর:**  
- CommonJS: `const fs = require('fs');`  
- ES Module: `import fs from 'fs';` (প্রজেক্টে সাপোর্ট থাকলে)

---

### ১৬. package.json কি?
**উত্তর:** প্রজেক্টের মেটাডাটা: নাম, ভার্সন, dependency, স্ক্রিপ্ট (start, test ইত্যাদি)। `npm init` দিয়ে তৈরি হয়।

**উদাহরণ:**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

---

### ১৭. সহজ HTTP সার্ভার কিভাবে বানাব?
**উত্তর:**
```js
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello!');
});
server.listen(3000);
```

---

### ১৮. সবচেয়ে ব্যবহৃত লাইব্রেরি?
**উত্তর:** **Express** – ওয়েব/API ফ্রেমওয়ার্ক। **Mongoose** – MongoDB এর জন্য ODM, স্কিমা ও রিলেশন ম্যানেজ করতে।

**উদাহরণ:**
```js
// Express – রাউট ও মিডলওয়্যার
const express = require('express');
const app = express();
app.get('/api/users', (req, res) => res.json({ users: [] }));

// Mongoose – স্কিমা ও কুয়েরি
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', UserSchema);
```

---

### ১৯. Promise কি?
**উত্তর:** অ্যাসিঙ্ক কাজের রেজাল্ট হ্যান্ডেল করার অবজেক্ট। callback এর জায়গায় ব্যবহার করলে nested callback (callback hell) কমে। `.then()`, `.catch()` বা `async/await` দিয়ে ব্যবহার করা হয়।

**উদাহরণ:**
```js
// Promise with .then/.catch
fetch('/api/user')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// একই কাজ async/await এ
async function getUser() {
  try {
    const res = await fetch('/api/user');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

---

### ২০. Dependency ইনস্টল/আপডেট/ডিলিট?
**উত্তর:**  
- ইনস্টল: `npm install package-name`  
- আপডেট: `npm update`  
- ডিলিট: `npm uninstall package-name`

---

## ইন্টারমিডিয়েট লেভেল

### ২১. Event-driven programming কি?
**উত্তর:** যখন কোন ইভেন্ট হয় (ক্লিক, রিকোয়েস্ট, টাইমার) তখন একটা handler/callback চলে। Event Loop ইভেন্ট শুনে সেই handler গুলো কল করে। এভাবেই প্রোগ্রাম সিঙ্ক্রোনাইজ থাকে।

---

### ২২. Buffer কি?
**উত্তর:** বাইনারি ডাটা রাখার জন্য মেমরির একটা অংশ। অ্যারের মত কিন্তু শুধু বাইনারি, সাইজ ফিক্সড। ফাইল বা নেটওয়ার্ক ডাটা raw বাইট হিসেবে handle করতে ব্যবহৃত।

**উদাহরণ:**
```js
const buf = Buffer.from('Hello', 'utf8');
console.log(buf);        // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString());  // Hello

const buf2 = Buffer.alloc(5);  // ৫ বাইট খালি buffer
```

---

### ২৩. Stream কি?
**উত্তর:** ডাটা একবারে মেমরিতে না নিয়ে টুকরো টুকরো (chunk) পড়া/লেখা। বড় ফাইল বা ডাটার জন্য ভালো।  
- Readable: পড়া (যেমন ফাইল থেকে)  
- Writable: লেখা  
- Duplex: পড়া ও লেখা  
- Transform: পড়ার সময় ডাটা পরিবর্তন (যেমন compress)

**উদাহরণ:**
```js
const fs = require('fs');

// বড় ফাইল টুকরো টুকরো পড়া
const readStream = fs.createReadStream('bigfile.txt');
readStream.on('data', (chunk) => console.log(chunk.length));

// ফাইলে লেখা
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello');
writeStream.end();
```

---

### ২৪. Callback hell কি?
**উত্তর:** অনেক nested callback একটার ভিতরে একটা—কোড পড়া ও ম্যানেজ করা কঠিন। সমাধান: Promise এবং async/await ব্যবহার করা।

**উদাহরণ (খারাপ vs ভালো):**
```js
// Callback hell – পড়তে কষ্ট
getUser(id, (user) => {
  getOrders(user.id, (orders) => {
    getDetails(orders[0].id, (details) => {
      console.log(details);  // অনেক নেস্ট!
    });
  });
});

// Promise/async দিয়ে সহজ
const user = await getUser(id);
const orders = await getOrders(user.id);
const details = await getDetails(orders[0].id);
console.log(details);
```

---

### ২৫. setImmediate() vs process.nextTick()?
**উত্তর:**  
- **nextTick:** বর্তমান কোড শেষ হওয়ার পরই পরবর্তী টিকে run, I/O এর আগে, অতি দ্রুত।  
- **setImmediate:** ইভেন্ট লুপের পরবর্তী চক্রে (I/O এর পর) run।  
সংক্ষেপে: nextTick আগে, setImmediate পরে; nextTick বেশি ব্যবহারে I/O বিলম্ব হতে পারে।

**উদাহরণ:** আউটপুট: First → nextTick → Last → setImmediate
```js
console.log('First');
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));
console.log('Last');
```

---

### ২৬. HTTP রিকোয়েস্টের ধরন?
**উত্তর:** GET (ডাটা নেওয়া), POST (নতুন তৈরি), PUT (পুরো আপডেট), PATCH (আংশিক আপডেট), DELETE (মুছে ফেলা)।

**উদাহরণ (Express):**
```js
app.get('/users', (req, res) => { /* ডাটা পাঠাও */ });
app.post('/users', (req, res) => { /* নতুন ইউজার বানাও */ });
app.put('/users/:id', (req, res) => { /* পুরো আপডেট */ });
app.patch('/users/:id', (req, res) => { /* শুধু কিছু ফিল্ড আপডেট */ });
app.delete('/users/:id', (req, res) => { /* ডিলিট */ });
```

---

### ২৭. spawn() vs fork()?
**উত্তর:**  
- **spawn:** যেকোনো সিস্টেম কমান্ড/প্রোগ্রাম চালায়, সাধারণত স্ট্রিম দিয়ে ডাটা।  
- **fork:** শুধু আরেকটা Node.js প্রসেস (জাভাস্ক্রিপ্ট ফাইল) চালায়, IPC দিয়ে মেসেজ আদান-প্রদান করা যায়।  
সংক্ষেপে: spawn যেকোনো প্রোগ্রাম, fork শুধু Node চাইল্ড প্রসেস।

**উদাহরণ:**
```js
// spawn – বাইরের কমান্ড (যেমন ls, git)
const { spawn } = require('child_process');
const child = spawn('ls', ['-l']);
child.stdout.on('data', (data) => console.log(data.toString()));

// fork – আরেকটা Node.js ফাইল, message পাঠানো যায়
const { fork } = require('child_process');
const worker = fork('worker.js');
worker.send({ task: 'heavy' });
worker.on('message', (msg) => console.log(msg));
```

---

### ২৮. CORS কি?
**উত্তর:** Cross-Origin Resource Sharing। এক ডোমেইন থেকে আরেক ডোমেইনের API কল করতে ব্রাউজার বাধা দিতে পারে। সার্ভার সঠিক header (যেমন `Access-Control-Allow-Origin`) দিলে অন্য অরিজিন থেকে অ্যাক্সেস দেওয়া যায়। Node/Express এ `cors` প্যাকেজ দিয়ে সেটা করা হয়।

**উদাহরণ:**
```js
const cors = require('cors');
const app = require('express')();

app.use(cors());  // সব অরিজিন থেকে অনুমতি

// শুধু একটা সাইট থেকে
app.use(cors({ origin: 'https://myfrontend.com' }));
```

---

### ২৯. DOM কি Node এ আছে?
**উত্তর:** না। DOM ব্রাউজারের জিনিস (HTML এলিমেন্ট)। Node সার্ভার সাইডে চলে, তাই DOM নেই।

---

### ৩০. NODE_ENV এর কাজ?
**উত্তর:** অ্যাপ কোন মোডে চালছে সেটা বোঝায়: `development`, `production`, `test`। এর উপর ভিত্তি করে লগ, ক্যাশ, এরর মেসেজ ইত্যাদি সিদ্ধান্ত নেওয়া হয়।

**উদাহরণ:**
```js
if (process.env.NODE_ENV === 'production') {
  app.use(compression());
}
// চালানোর সময়: NODE_ENV=production node app.js
// package.json: "start": "NODE_ENV=production node app.js"
```

---

### ৩১. Test Pyramid কি?
**উত্তর:** টেস্টের তিন স্তর—নিচে অনেক **Unit Test** (ছোট ফাংশন/কম্পোনেন্ট), মাঝে **Integration Test** (কম্পোনেন্ট একসাথে), উপরে কম **E2E Test** (পুরো ফ্লো)। এভাবে দ্রুত ও সস্তা টেস্ট বেশি, ধীর ও ব্যয়বহুল টেস্ট কম।

---

## এক্সপেরিয়েন্সড লেভেল

### ৩২. Piping কি?
**উত্তর:** এক স্ট্রিমের আউটপুট সরাসরি আরেক স্ট্রিমের ইনপুটে দেওয়া। ডাটা মাঝে মেমরিতে জমা না করেই flow করে।

**উদাহরণ:** একটা ফাইল পড়ে আরেক ফাইলে কপি করা
```js
const fs = require('fs');
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');
readStream.pipe(writeStream);
```

---

### ৩৩. Cluster কি?
**উত্তর:** একই অ্যাপ অনেকগুলো চাইল্ড প্রসেস (ওয়ার্কার) হিসেবে চালানোর মডিউল। প্রতিটি CPU কোর ব্যবহার করতে পারলে লোড ভাগ হয়ে যায়। Master প্রসেস ওয়ার্কার গুলো fork করে।

**উদাহরণ:**
```js
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) cluster.fork();
} else {
  require('./app.js');  // প্রতিটি ওয়ার্কার অ্যাপ চালায়
}
```

---

### ৩৪. সেশন কিভাবে ম্যানেজ করব?
**উত্তর:** `express-session` ব্যবহার করা। সেশন ডাটা সার্ভারে (বা স্টোরে) থাকে, কুকিতে শুধু সেশন ID যায়। রিকোয়েস্টে সেই ID দিয়ে ইউজার চেনা যায়।

**উদাহরণ:**
```js
const session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.get('/login', (req, res) => {
  req.session.userId = user.id;  // সেশন এ সেভ
});
app.get('/profile', (req, res) => {
  const id = req.session.userId;  // পরবর্তী রিকোয়েস্টে ব্যবহার
});
```

---

### ৩৫. Authentication vs Authorization?
**উত্তর:**  
- **Authentication:** ইউজার কে সেটা প্রমাণ করা (লগইন, JWT, OAuth)।  
- **Authorization:** এই ইউজার কি করতে পারবে (রোল/পারমিশন)।  
Node এ Passport, JWT (jsonwebtoken) ইত্যাদি দিয়ে করা হয়।

---

### ৩৬. ফাইল আপলোড কোন প্যাকেজে?
**উত্তর:** **Multer**। `multipart/form-data` হ্যান্ডেল করে, ফাইলগুলো সার্ভারে বা স্টোরেজে সেভ করতে ব্যবহৃত।

**উদাহরণ:**
```js
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('photo'), (req, res) => {
  // ফাইল req.file এ পাবে
  console.log(req.file.path);
});
// HTML: <input type="file" name="photo" />
```

---

### ৩৭. Node.js vs Python (সার্ভার)?
**উত্তর:** Node অ্যাসিঙ্ক, ইভেন্ট লুপ, I/O ও রিয়েল-টাইম অ্যাপের জন্য দ্রুত; এক থ্রেড বলে CPU-heavy কাজে দুর্বল। Python সিনক্রোনাস ডিফল্ট, মাল্টি-থ্রেড/অ্যাসিঙ্কো দিয়ে; ওয়েব, ডাটা সায়েন্স, জেনারেল টাস্কে ব্যবহৃত। সংক্ষেপে: Node I/O ও কনকারেন্সির জন্য, Python জেনারেল ও CPU কাজের জন্য।

---

### ৩৮. MongoDB কানেক্ট কিভাবে?
**উত্তর:** Mongoose দিয়ে কানেক্ট করা হয়। কানেকশন ইভেন্ট (connected, error) handle করে নিলে ভালো।

**উদাহরণ:**
```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log('Connected'))
  .catch(err => console.error(err));

// অথবা async/await
await mongoose.connect(process.env.DB_URL);
```

---

### ৩৯. কমান্ড লাইন আর্গুমেন্ট কিভাবে পড়ব?
**উত্তর:** `process.argv` অ্যারে। ০ = node, ১ = স্ক্রিপ্ট ফাইল, ২ থেকে আর্গুমেন্ট।

**উদাহরণ:** `node app.js hello 123` চালালে
```js
const args = process.argv.slice(2);
console.log(args);        // ['hello', '123']
console.log(args[0]);     // 'hello'
```

---

### ৪০. Redis Node এ কেন?
**উত্তর:** ক্যাশ, সেশন, কিউ বা ছোট ডাটা রাখার জন্য। মেমরিতে দ্রুত ডাটা রাখে, DB লোড কমে, অ্যাপ দ্রুত হয়। `redis` প্যাকেজ দিয়ে কানেক্ট করা হয়।

**উদাহরণ:**
```js
const redis = require('redis');
const client = redis.createClient();
await client.connect();
await client.set('key', 'value');
const value = await client.get('key');
```

---

### ৪১. WebSocket কি?
**উত্তর:** ক্লায়েন্ট-সার্ভার মধ্যে স্থায়ী কানেকশন, দুদিক থেকেই যেকোনো সময় মেসেজ পাঠানো যায়। চ্যাট, নোটিফিকেশন, লাইভ আপডেটের জন্য ব্যবহার হয়।

---

### ৪২. setImmediate() vs setTimeout(fn, 0)?
**উত্তর:** দুটোই "শীঘ্রই" চালায়। setImmediate ইভেন্ট লুপের পরবর্তী check phase এ। setTimeout টাইমার ক্যুতে, ন্যূনতম ডিলে নিয়ে। "আই/ও এর পর রান করাতে" setImmediate ভালো।

**উদাহরণ:**
```js
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
// অর্ডার নিশ্চিত না—কোনটা আগে আসবে environment এর উপর নির্ভর করে
```

---

### ৪৩. Event Emitter কি?
**উত্তর:** `events` মডিউলের ক্লাস। অবজেক্ট নিজে ইভেন্ট emit করতে পারে এবং অন্য কোড listener রেজিস্টার করে সাড়া দিতে পারে। অ্যাসিঙ্ক ইভেন্ট ও observer প্যাটার্নের জন্য ব্যবহৃত।

**উদাহরণ:**
```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('order', (item) => {
  console.log('Order received:', item);
});
emitter.emit('order', 'Pizza');  // Order received: Pizza
```

---

---

### ৪৪. Node.js আর ব্রাউজার রানটাইমের পার্থক্য?
**উত্তর:** ব্রাউজার ফ্রন্টএন্ডের জন্য—DOM, window আছে। Node.js সার্ভার সাইডে চলে, ব্রাউজার ছাড়া—ব্যাকএন্ড সার্ভিস, CLI টুল, নেটওয়ার্ক অ্যাপ বানাতে। দুটোই JavaScript চালায় কিন্তু API ও পরিবেশ আলাদা।

---

### ৪৫. Blocking vs Non-blocking কি?
**উত্তর:** **Blocking:** একটা কাজ শেষ হওয়া পর্যন্ত পুরো প্রসেস থামে। **Non-blocking:** কাজ ব্যাকগ্রাউন্ডে দিয়ে অন্য কাজ চালিয়ে যায়, শেষে callback দিয়ে রেজাল্ট পায়। Node.js নন-ব্লকিং I/O ব্যবহার করে।

---

### ৪৬. Error-first callback কি?
**উত্তর:** callback এর প্রথম আর্গুমেন্ট সবসময় error। সফল হলে `null`, না হলে error অবজেক্ট।  
`(err, data) => { if (err) return console.error(err); console.log(data); }`

---

### ৪৭. exports vs module.exports এর পার্থক্য?
**উত্তর:** `module.exports` যেটা return হয় সেটাই। `exports` আসলে `module.exports` এর একটা রেফারেন্স। একটাই জিনিস export করলে `module.exports = something` ব্যবহার করো। একাধিক করলে `exports.a = ...; exports.b = ...;` দিতে পারো।

---

### ৪৮. Node.js অ্যাপ কিভাবে ডিবাগ করব?
**উত্তর:** টার্মিনালে `node inspect app.js` চালাও, অথবা VS Code এ Node.js ডিবাগার দিয়ে ব্রেকপয়েন্ট দিয়ে রান করো। `debugger;` স্টেটমেন্টও কাজ করে।

---

### ৪৯. Event queue (callback queue) এর ভূমিকা?
**উত্তর:** অ্যাসিঙ্ক কাজ শেষ হলে তার callback event queue তে যায়। Event loop মেইন থ্রেড ফাঁকা হলে এই কিউ থেকে একটার পর একটা callback চালায়। তাই অ্যাসিঙ্ক রেজাল্ট পরবর্তী সাইকেলে run হয়।

---

### ৫০. Local vs Global প্যাকেজ ইনস্টল?
**উত্তর:** **Local:** `npm install package-name` — শুধু ওই প্রজেক্টের `node_modules` এ, সেই প্রজেক্টেই ব্যবহার। **Global:** `npm install -g package-name` — সিস্টেমজুড়ে, যেকোনো জায়গা থেকে CLI হিসেবে (যেমন `nodemon`, `ts-node`)।

---

### ৫১. Event loop এর ফেজগুলো?
**উত্তর:** Timers → Pending callbacks → Idle/Prepare → **Poll** (নতুন I/O ইভেন্ট, এখানে বেশিরভাগ সময় কাটে) → Check (setImmediate) → Close callbacks। একটা চক্রে একটার পর একটা ফেজ run হয়।

---

### ৫২. libuv এর কাজ কি?
**উত্তর:** C++ লাইব্রেরি যেটা Node.js কে নন-ব্লকিং I/O দেয়। থ্রেড পুল ম্যানেজ করে—ফাইল, DNS ইত্যাদি ব্যাকগ্রাউন্ডে চালায় যাতে মেইন থ্রেড ব্লক না হয়।

---

### ৫৩. Worker threads কখন child process এর বদলে ব্যবহার করব?
**উত্তর:** **Worker threads:** CPU-heavy কাজ (ক্যালকুলেশন, ইমেজ প্রসেসিং) যেটা মেইন থ্রেড ব্লক করবে—মেমরি শেয়ার করে ডাটা আদান-প্রদান সহজ। **Child process:** আলাদা প্রসেস, I/O বা পুরো আলাদা প্রোগ্রাম চালানোর জন্য। কম্পিউটেশনের জন্য worker thread ভালো।

---

### ৫৪. Node.js এ garbage collection কিভাবে হয়?
**উত্তর:** V8 ইঞ্জিনের garbage collector। নতুন অবজেক্টের জন্য Scavenge, পুরনো অবজেক্টের জন্য Mark-Sweep ও Mark-Compact। অটোমেটিকভাবে অপ্রয়োজনীয় মেমরি ফ্রি করে।

---

### ৫৫. সাধারণ সিকিউরিটি ঝুঁকি ও সমাধান?
**উত্তর:** XSS (ইনপুট স্যানিটাইজ, escape), SQL Injection (parameterized query, ORM), insecure dependency (`npm audit`, আপডেট)। হেলমেট মিডলওয়্যার, ভ্যালিডেশন, সিক্রেট env variable এ রাখা।

---

### ৫৬. Express vs নেটিভ http মডিউল?
**উত্তর:** নেটিভ `http` দিয়ে রাউট, বডি পার্স, মিডলওয়্যার নিজে করতে হয়। Express রাউটিং, মিডলওয়্যার, ইরর হ্যান্ডলিং সহজ করে দেয়—কম বয়লারপ্লেট, দ্রুত ডেভেলপমেন্ট।

---

### ৫৭. Express এ error কিভাবে হ্যান্ডেল করব?
**উত্তর:** চারটা আর্গুমেন্টওয়ালা মিডলওয়্যার: `(err, req, res, next) => { ... }`। যেকোনো রাউটে `next(err)` কল করলে এই মিডলওয়্যারটা চলে, সেখানে লগ করে ক্লায়েন্টকে সঠিক স্ট্যাটাস ও মেসেজ পাঠাও।

---

### ৫৮. Express এ Router এর ভূমিকা?
**উত্তর:** রাউটগুলো এক জায়গায় জমা করে ছোট ছোট মডিউল বানানো। যেমন `router.get('/users', ...)`, তারপর `app.use('/api', router)`। কোড অর্গানাইজ ও রিইউজ করা সহজ হয়।

---

### ৫৯. Production এ সিক্রেট/কনফিগ কিভাবে ম্যানেজ করব?
**উত্তর:** API কী, DB পাসওয়ার্ড env variable এ রাখো। ডেভেলপমেন্টে dotenv, প্রডাকশনে ভল্ট/ক্লাউড সিক্রেট ম্যানেজার (AWS Secrets Manager ইত্যাদি)। কখনো কোড বা রিপোতে সিক্রেট কমিট করো না।

---

### ৬০. Node.js টেস্টিং ফ্রেমওয়ার্ক নাম বলো?
**উত্তর:** **Jest** (অ্যাসার্ট, মক, স্ন্যাপশট), **Mocha** (টেস্ট রানার) + **Chai** (অ্যাসার্ট), **Supertest** (API টেস্ট)। ইউনিট, ইন্টিগ্রেশন ও E2E টেস্টের জন্য ব্যবহার হয়।

---

### ৬১. GraphQL vs REST?
**উত্তর:** REST এ আলাদা আলাদা endpoint, ক্লায়েন্ট ঠিক করে কি ডাটা চাই। GraphQL এ একটা endpoint, ক্লায়েন্ট কুয়েরি দিয়ে ঠিক বলে দেয় কোন ফিল্ড চাই—কম ওভার-ফেচিং, এক রিকোয়েস্টে অনেক রিলেশন।

---

### ৬২. একসাথে অনেক অ্যাসিঙ্ক টাস্ক চালাতে Promise.all?
**উত্তর:** `Promise.all([promise1, promise2, promise3])` — সব একসাথে চালায়, সব resolve হলে অ্যারে দিয়ে রেজাল্ট। একটা reject হলে পুরো reject। প্রথম যে resolve/reject হবে সেটা নিতে `Promise.race()`।

**উদাহরণ:** `const [a, b] = await Promise.all([fetch(url1), fetch(url2)]);`

---

### ৬৩. Node.js এক্সটার্নাল সার্ভিসের সাথে কিভাবে যোগাযোগ করে?
**উত্তর:** HTTP এর জন্য `http`, `https` মডিউল অথবা `axios`, `node-fetch`। gRPC দিয়ে পারফরম্যান্স গুরুত্বপূর্ণ হলে। সবই অ্যাসিঙ্ক—callback বা promise/async-await দিয়ে রেজাল্ট হ্যান্ডেল।

---

### ৬৪. crypto মডিউল কি কাজে লাগে?
**উত্তর:** হ্যাশ (পাসওয়ার্ড), এনক্রিপ্ট/ডিক্রিপ্ট, সাইন/ভেরিফাই। যেমন `crypto.createHash('sha256')`, `crypto.scrypt()` পাসওয়ার্ডের জন্য। সেনসিটিভ ডাটা সুরক্ষিত রাখতে।

---

### ৬৫. Thread pool Node আর্কিটেকচারে কোথায়?
**উত্তর:** libuv এর অংশ। ফাইল সিস্টেম, DNS, কিছু crypto অপারেশন থ্রেড পুলে চলে—মেইন ইভেন্ট লুপ ব্লক হয় না। ডিফল্টে সীমিত থ্রেড (প্রায় ৪), তাই অনেক ভারী সিনক্রোনাস কাজ একসাথে দিলে আটকে যেতে পারে।

---

### ৬৬. স্কেলেবল ও মেইনটেইনেবল অ্যাপ কিভাবে ডিজাইন করব?
**উত্তর:** ছোট ছোট মডিউল, এক একটা এক দায়িত্ব। মাইক্রোসার্ভিস বা স্পষ্ট লেয়ার (রাউট → কন্ট্রোলার → সার্ভিস → DB)। মেসেজ কিউ (RabbitMQ, Kafka) দিয়ে সেবাগুলোর মধ্যে যোগাযোগ। সেপারেশন অফ কনসার্ন মানো।

---

### ৬৭. মাইক্রোসার্ভিস এ Node.js কেন ভালো?
**উত্তর:** ইভেন্ট-চালিত, I/O তে দ্রুত, হালকা। অনেক কানেকশন একসাথে handle করতে পারা, সার্ভিসগুলোর মধ্যে HTTP/gRPC/মেসেজ কিউ দিয়ে সহজে যোগাযোগ। ছোট সার্ভিস বানানোর জন্য উপযুক্ত।

---

### ৬৮. মাইক্রোসার্ভিসে ইন্টার-সার্ভিস কমিউনিকেশন?
**উত্তর:** HTTP/REST, gRPC (দ্রুত), বা মেসেজ কিউ (RabbitMQ, Kafka)—ডিকাপলিং ও লং-রানিং টাস্কের জন্য। সিনক্রোনাস কলের চেয়ে কিউ ব্যবহার করলে একটা সার্ভিস ডাউন থাকলেও অন্যগুলো চালু থাকতে পারে।

---

### ৬৯. Serverless (Node) এর pros ও cons?
**উত্তর:** **Pros:** সার্ভার ম্যানেজ না, অটো স্কেল, পে-পার-ইউজ। **Cons:** কোল্ড স্টার্ট লেটেন্সি, ভেন্ডর লক-ইন, ডিবাগ ও ডিপ্লয় একটু জটিল হতে পারে।

---

### ৭০. প্রডাকশন Node অ্যাপ মনিটর কিভাবে করব?
**উত্তর:** লগিং (Elastic Stack), মেট্রিক্স (Prometheus, CPU/মেমরি/রিকোয়েস্ট), ট্রেসিং (OpenTelemetry)। এরর ও পারফরম্যান্স দেখে বটলনেক ও ব্যর্থতা ধরা।

---

### ৭১. CPU-intensive টাস্কের best practice?
**উত্তর:** মেইন থ্রেডে ভারী কাজ দিও না। Worker threads বা আলাদা child process এ পাঠাও। অথবা আলাদা সার্ভিস/কিউ (Bull, Redis) দিয়ে ব্যাকগ্রাউন্ডে চালাও।

---

### ৭২. হাই-ট্র্যাফিক API অপটিমাইজ কিভাবে?
**উত্তর:** ক্যাশিং (Redis/অ্যাপ লেভেল), ক্লাস্টারিং (সব কোর ব্যবহার), DB কুয়েরি ও ইন্ডেক্স ঠিক করা, নন-ব্লকিং I/O ও অ্যাসিঙ্ক কোড। লোড ব্যালান্সার (Nginx) দিয়ে ট্র্যাফিক ভাগ।

---

### ৭৩. TypeScript Node প্রজেক্টে কেন ব্যবহার করব?
**উত্তর:** স্ট্যাটিক টাইপ—কম্পাইল টাইমে বাগ ধরা, অটোকম্প্লিট ও রিফ্যাক্টর সহজ। বড় টিম ও প্রজেক্টে কোড রিডেবিলিটি ও মেইনটেন্যান্স ভালো।

---

### ৭৪. Node অ্যাপের জন্য CI/CD পাইপলাইন?
**উত্তর:** GitHub Actions / GitLab CI / Jenkins। স্টেপ: dependency ইনস্টল → টেস্ট রান → (প্রয়োজনে) বিল্ড → Docker ইমেজ বানানো → স্টেজিং/প্রডাকশনে ডিপ্লয়। প্রতিটি push/PR এ টেস্ট ও ডিপ্লয় অটোমেট করা যায়।

---

### ৭৫. require.resolve() কি ও কখন ব্যবহার করব?
**উত্তর:** মডিউল লোড না করে শুধু তার পূর্ণ পাথ বের করে। `require.resolve('express')` → এক্সপ্রেসের পাথ। টুল, বিল্ড সিস্টেম, বা চেক করতে মডিউল আছে কিনা—এসব ক্ষেত্রে কাজে লাগে।

---

### ৭৬. হাই অ্যাভেইলেবিলিটি ও লোড ব্যালান্সিং?
**উত্তর:** একাধিক Node ইনস্ট্যান্স চালাও (ক্লাস্টার বা আলাদা মেশিন)। Nginx/HAProxy দিয়ে লোড ব্যালান্সার—রিকোয়েস্ট ভাগ করে দেয়। একটা ইনস্ট্যান্স ডাউন হলেও অন্যগুলো ট্র্যাফিক নেয়।

---

### ৭৭. Reactor pattern কি?
**উত্তর:** I/O হ্যান্ডলিং ডিজাইন প্যাটার্ন। একটা থ্রেড ইভেন্ট ডিমাল্টিপ্লেক্স করে—কোন কানেকশনে ইভেন্ট এলো সেটা দেখে সংশ্লিষ্ট হ্যান্ডলারকে ডিসপ্যাচ করে। Node.js এই প্যাটার্ন অনুসরণ করে এক থ্রেডে অনেক কানেকশন handle করে।

---

### ৭৮. zlib মডিউল কেন গুরুত্বপূর্ণ?
**উত্তর:** কম্প্রেশন/ডিকম্প্রেশন (gzip ইত্যাদি)। Express এর compression মিডলওয়্যার zlib দিয়ে রেসপন্স কম্প্রেস করে—ব্যান্ডউইথ কম, পেজ লোড দ্রুত।

---

### ৭৯. net ও dgram মডিউল কি?
**উত্তর:** **net:** TCP ক্লায়েন্ট/সার্ভার—স্ট্রিমিং, রিলায়েবল কানেকশন। **dgram:** UDP ডাটাগ্রাম—গেমিং, স্ট্রিমিং যেখানে ডেলিভারি গ্যারান্টি কম জরুরি। নেটওয়ার্ক লো-লেভেল কাজের জন্য।

---

### ৮০. Docker দিয়ে Node অ্যাপ ডিপ্লয়?
**উত্তর:** Dockerfile এ Node ইমেজ নিয়ে, `COPY` দিয়ে অ্যাপের ফাইল, `npm install --production`, `CMD ["node", "index.js"]`। বিল্ড করে ইমেজ বানাও, কনটেইনার রান করো। একই এনভায়রনমেন্ট everywhere।

---

### ৮১. API তে rate limiting কিভাবে দেব?
**উত্তর:** `express-rate-limit` মিডলওয়্যার—একটা IP/ইউজার প্রতি মিনিট/ঘণ্টায় কত রিকোয়েস্ট পারবে সেটা সীমা দেয়। অ্যাবিউজ কমে, সার্ভার সুরক্ষিত থাকে।

---

### ৮২. Bun, Deno আর Node.js এর মূল পার্থক্য?
**উত্তর:** **Node:** সবচেয়ে ম্যাচিউর, বড় ইকোসিস্টেম। **Deno:** ডিফল্ট সিকিউর, TypeScript সাপোর্ট, ES modules। **Bun:** অল-ইন-ওয়ান রানটাইম, দ্রুত, বিল্ট-ইন বান্ডলার/টেস্টার। তিনটাই JavaScript/TypeScript চালায়, টুল ও ফিলোসফি আলাদা।

---

### ৮৩. ডাটাবেস কানেকশন অনেক হলে কিভাবে ম্যানেজ করব?
**উত্তর:** কানেকশন পুল ব্যবহার করো। প্রতিটি রিকোয়েস্টে নতুন কানেকশন না নিয়ে একটা পুল থেকে ধার নাও, কাজ শেষে ফেরত দাও। pg-pool (PostgreSQL), Mongoose নিজে পুল ম্যানেজ করে। এফিসিয়েন্ট ও লিমিটের ভিতরে থাকে।

---

### ৮৪. Message queue (RabbitMQ, Kafka) Node এ কেন?
**উত্তর:** সেবাগুলো ডিকাপল থাকে—একটা মেসেজ পাঠায়, অন্যটা যখন পারবে প্রসেস করবে। লং-রানিং টাস্ক ব্যাকগ্রাউন্ডে, ইভেন্ট লুপ ব্লক হয় না। রিট্রাই, স্কেল করার জন্য ভালো।

---

### ৮৫. Promise.all() ও Promise.race() এর পার্থক্য?
**উত্তর:** **Promise.all:** সব প্রমিস একসাথে, সবার রেজাল্ট চাই—সব resolve হলে অ্যারে, একটা reject হলে পুরো reject। **Promise.race:** যেটা আগে resolve/reject হবে সেটার রেজাল্ট। টাইমআউট বা “প্রথম যেটা শেষ” সিনারিওতে race ব্যবহার হয়।

---

### ৮৬. JWT কিভাবে কাজ করে?
**উত্তর:** লগইনের পর সার্ভার একটা টোকেন সাইন করে (secret দিয়ে)। ক্লায়েন্ট টোকেন সেভ করে, পরের রিকোয়েস্টে header এ পাঠায়। সার্ভার ভেরিফাই করে টোকেন ভ্যালিড হলে ইউজার অথেন্টিকেটেড। স্টেটলেস—সেশন সার্ভারে রাখতে হয় না। `jsonwebtoken` প্যাকেজ দিয়ে বানানো/ভেরিফাই করা হয়।

---

### ৮৭. Secure HTTP headers (Helmet)?
**উত্তর:** `helmet` মিডলওয়্যার একসাথে অনেক সিকিউরিটি হেডার সেট করে—যেমন X-Content-Type-Options, Content-Security-Policy, Strict-Transport-Security। XSS, ক্লিকজ্যাকিং ইত্যাদি ঝুঁকি কমায়।

---

### ৮৮. Uncaught exception কিভাবে হ্যান্ডেল করব?
**উত্তর:** `process.on('uncaughtException', (err) => { ... })` দিয়ে ধরা যায়, কিন্তু রেকমেন্ডেড না—অ্যাপ inconsistent স্টেটে থাকতে পারে। এরর লগ করে graceful shutdown (`process.exit(1)`) করো। যতটা সম্ভব try-catch/প্রমিস ক্যাচ দিয়ে আগেই ধরার চেষ্টা করো।

---

### ৮৯. util মডিউল কি কাজে লাগে?
**উত্তর:** ইউটিলিটি ফাংশন—`util.promisify()` (callback ফাংশনকে প্রমিসে রূপান্তর), `util.inspect()` (অবজেক্ট প্রিন্ট), `util.inherits()` (ক্লাস ইনহেরিটেন্স)। সাধারণ কাজের জন্য হেল্পার।

---

### ৯০. Telemetry ও OpenTelemetry কি?
**উত্তর:** টেলিমেট্রি = অ্যাপের পারফরম্যান্স, হেলথ, বেভিয়ার সম্পর্কে ডাটা সংগ্রহ। OpenTelemetry ওপেন স্ট্যান্ডার্ড—মেট্রিক্স, লগ, ট্রেস এক জায়গায় ইনস্ট্রুমেন্ট করে। মনিটরিং ও ডিবাগিং ডিসট্রিবিউটেড সিস্টেমের জন্য গুরুত্বপূর্ণ।

---

*সব উত্তর সংক্ষেপে ও ইন্টারভিউ বলার জন্য রাখা। আরো বিস্তারিত জানতে GeeksforGeeks ও roadmap.sh লিংক দেখো।*
