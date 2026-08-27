import { defineConfig } from 'vitepress'
//自动生成侧边栏插件
import Sidebar from 'vitepress-plugin-sidebar-resolve'


export default defineConfig({
  // 网站部署路径，必须与 github仓库名 相同
  base: '/my_site/',

  //网站信息
  lang: 'zh_CN',
  title: "我的网站",
  description: "这是一个网站",

  head: [//往生成页面的 < head > 标签里注入任意 HTML 元素的字段。
    //网站图标
    ['link', { rel: 'icon', href: '/my_site/favicon.svg' }],
  ],

  vite: {
    plugins: [
      Sidebar({//侧边栏插件配置
        //  path: '.',               // 扫描 Docs 文档根
        // 开启则校验文件名是否为"数字."开头，不符就警告/忽略
        // fileIndexPrefix: true,
        titleFormMd: true,       // 取一级标题作为侧边栏文字
        initItems: false,        // 直接显示文件列表，不包分组
        //initItemsText: true,   //当 initItems 为 true 时生效

        //collapsed: true,         // 默认折叠侧边栏
        collapsed: (relativePath) => {
          const parts = relativePath.replace(/^\//, '').split('/').filter(Boolean)
          // 展开:1段(顶层教程)、2段(03.工具/03.CMake)、3段(含 cmake笔记/进阶 的独立组)
          // 只有更深(>=4)才折叠
          return parts.length >= 4
        },


        ignoreList: [            // 忽略非md文档的文件
          'assets',                                   // 整个 assets 目录
          /\.(png|jpe?g|gif|svg|webp|ico)$/i,         // 图片
          /\.(zip|tar\.gz|7z|rar|url|exe|dmg|pdf)$/i, // 压缩包/可执行/PDF
        ],
      })
    ],
  },

  themeConfig: {
    // 侧边栏由插件自动生成，无需手动配置 sidebar
    //  sidebar: [{}],

    socialLinks: [//我的GitHub链接
      { icon: 'github', link: 'https://github.com/shhuz/my_site' }
    ],

    docFooter: { // 文档底部翻页汉化
      prev: '上一页',
      next: '下一页',
    },
    logo: '/logo.svg',//网站左上角的 logo


    nav: [  // 导航栏
      { text: '首页', link: '/' },
      {
        text: '职业路线',
        items: [
          { text: '嵌入式 Linux', link: '/01.职业路线/嵌入式Linux/' },
          { text: 'Qt 开发', link: '/01.职业路线/Qt开发/' },
        ]
      },
      {
        text: '教程',
        items: [
          { text: '通信协议', link: '/02.教程/04.通信协议/' },
          { text: 'Linux 教程', link: '/02.教程/05.Linux教程/' },
        ]
      },
      //TODO: 待添加
      {
        text: '编程语言',
        items: [
          { text: 'Python', link: '/04.编程语言/04.Python' },
          {
            text: '汇编', link: '/04.编程语言/03.汇编/'
          },

        ]
      },

      {
        text: '工具',
        items: [
          { text: 'CMake', link: '/03.工具/03.CMake' },
        ]
      },
      {
        text: '其它教程',
        items: [
          { text: '建同款网站', link: '/05.其它教程/01.复现同款网站/01.md' },
        ]
      },
      {
        text: '资源',
        items: [
          { text: '资源1', link: '/06.资源' },
        ]
      },


    ],

  }
})
