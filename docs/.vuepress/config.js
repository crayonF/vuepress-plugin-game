module.exports = {
  title: 'vuepress-plugin-game',
  description: '',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ['script', { src: '/js/MorphSVGPlugin.min.js'}],
    ['script', { src: '/js/TweenMax.min.js'}]
  ],
  base: '/vuepress-plugin-game/', // 这是部署到github相关的配置
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "github",
        link: "https://github.com",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "Guide",
          collapsable: false,
          children: [""],
        },
      ],
    }
  },
  plugins: [
    require('../../src')
  ]
}