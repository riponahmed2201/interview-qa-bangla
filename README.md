# interview-qa-bangla

টেক ইন্টারভিউয়ের জন্য প্রশ্ন ও উত্তর — বাংলায়। Node.js, React, JavaScript ও অন্যান্য টপিক।

**লাইভ সাইট:** [GitHub Pages](https://YOUR_USERNAME.github.io/interview-qa-bangla/) *(রিপো পাবলিশ করার পর লিংক কাজ করবে)*

---

## যা আছে

| টপিক        | প্রশ্ন সংখ্যা |
|------------|----------------|
| Node.js    | ১৫০+           |
| React      | *(আসছে)*       |
| JavaScript | *(আসছে)*       |

---

## লোকালে চালানো

```bash
# ডিপেন্ডেন্সি ইন্সটল
npm install

# ডকস ডেভ সার্ভার চালাও (http://localhost:5173)
npm run docs:dev

# প্রডাকশন বিল্ড
npm run docs:build

# বিল্ড প্রিভিউ
npm run docs:preview
```

---

## GitHub এ পাবলিশ ও লাইভ করা

### ১. রিপো তৈরি

1. GitHub এ লগইন করে [New repository](https://github.com/new) খোলো।
2. **Repository name:** `interview-qa-bangla`
3. Public সিলেক্ট করো, Create repository ক্লিক করো।

### ২. কোড পুশ করা

প্রজেক্ট ফোল্ডারে টার্মিনালে (প্রথমবার একবার `npm install` চালিয়ে `package-lock.json` থাকলে ভালো):

```bash
npm install
git init
git add .
git commit -m "Initial commit: Interview Q&A Bangla with VitePress"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/interview-qa-bangla.git
git push -u origin main
```

`YOUR_USERNAME` এর জায়গায় তোমার GitHub ইউজারনেম দেবে।

### ৩. GitHub Pages চালু করা

1. রিপোতে **Settings** → বাম পাশে **Pages**।
2. **Source:** "GitHub Actions" সিলেক্ট করো।
3. কিছু করো না — এই রিপোতে `.github/workflows/deploy.yml` আছে; push করার পর অটো বিল্ড ও ডিপ্লয় হবে।

### ৪. সাইট দেখা

কয়েক মিনিট পর সাইট লাইভ হবে:

```
https://YOUR_USERNAME.github.io/interview-qa-bangla/
```

প্রথম বিল্ড ২–৩ মিনিট লাগতে পারে। পরবর্তী প্রতিটি push এ অটো আপডেট হবে।

---

## ফোল্ডার স্ট্রাকচার

```
interview-qa-bangla/
├── docs/
│   ├── .vitepress/
│   │   └── config.js    # VitePress কনফিগ
│   ├── index.md         # হোম পেজ
│   └── nodejs.md        # Node.js Q&A
├── nodejs-interview-qa-bangla.md   # মূল কনটেন্ট (ব্যাকআপ/রেফারেন্স)
├── .github/workflows/deploy.yml   # GitHub Pages ডিপ্লয়
├── package.json
└── README.md
```

---

## লাইসেন্স

ISC
