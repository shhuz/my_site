import { defineConfig } from 'vitepress'


export default defineConfig({
  // 网站部署路径，必须与 github仓库名 相同
  base: '/my_site/',

  //网站信息
  lang: 'zh_CN',
  title: "我的网站",
  description: "这是一个网站",

  head: [//往生成页面的 < head > 标签里注入任意 HTML 元素的字段。
    //网站图标
    ['link', { rel: 'icon', href: '/favicon.svg' }],
  ],

  themeConfig: {
    docFooter: { // 文档底部翻页汉化
      prev: '上一页',
      next: '下一页',
    },
    logo: '/logo.svg',//网站左上角的 logo

    socialLinks: [//我的GitHub链接
      { icon: 'github', link: 'https://github.com/shhuz/my_site' }
    ],

    nav: [
      { text: '首页', link: '/' },
      {
        text: '教程',
        items: [
          { text: '建同款网站', link: '/02.教程/01.复现同款网站/' },

        ]
      },

    ],



  }
})
