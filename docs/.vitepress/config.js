import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Interview Question বাংলা',
  description: 'টেক ইন্টারভিউ প্রশ্ন ও উত্তর (বাংলা) — Node.js, NestJS, JavaScript, TypeScript ও অন্যান্য',
  base: '/interview-qa-bangla/',  // GitHub Pages: username.github.io/interview-qa-bangla/
  themeConfig: {
    nav: [
      { text: 'হোম', link: '/' },
      { text: 'Node.js', link: '/nodejs' },
      { text: 'NestJS', link: '/nestjs' },
      { text: 'JavaScript', link: '/javascript' },
      { text: 'TypeScript', link: '/typescript' },
    ],
    sidebar: [
      {
        text: 'Node.js',
        items: [
          { text: 'প্রশ্ন ও উত্তর', link: '/nodejs' },
        ],
      },
      {
        text: 'NestJS',
        items: [
          { text: 'প্রশ্ন ও উত্তর', link: '/nestjs' },
        ],
      },
      {
        text: 'JavaScript',
        items: [
          { text: 'প্রশ্ন ও উত্তর', link: '/javascript' },
        ],
      },
      {
        text: 'TypeScript',
        items: [
          { text: 'প্রশ্ন ও উত্তর', link: '/typescript' },
        ],
      },
    ],
    socialLinks: [
      // { icon: 'github', link: 'https://github.com/...' },
    ],
    footer: {
      message: 'ইন্টারভিউ প্রস্তুতির জন্য সংকলন।',
      copyright: 'সূত্র: GeeksforGeeks, roadmap.sh, RisingStack, Medium, Interview Coder, C# Corner, TatvaSoft',
    },
  },
})
