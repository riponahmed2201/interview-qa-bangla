import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Interview Question বাংলা',
  description: 'টেক ইন্টারভিউ প্রশ্ন ও উত্তর (বাংলা) — Node.js, React, JavaScript ও অন্যান্য',
  base: '/',
  themeConfig: {
    nav: [
      { text: 'হোম', link: '/' },
      { text: 'Node.js', link: '/nodejs' },
      // পরবর্তীতে: { text: 'React', link: '/react' }, { text: 'JavaScript', link: '/javascript' },
    ],
    sidebar: [
      {
        text: 'Node.js',
        items: [
          { text: 'প্রশ্ন ও উত্তর', link: '/nodejs' },
        ],
      },
      // আরও টপিক যোগ করলে এখানে সেকশন যুক্ত করো (React, JavaScript, SQL ইত্যাদি)
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
