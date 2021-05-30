# 介绍

## 简介

这个是 vuepress 的插件，作为儿童节彩蛋，用于HUI官网。

idea 来源于 <https://codepen.io/pyrografix/pen/qrqpJN> 🏹

> 儿童节快乐 🤖👱‍♂️


## 安装

```bash
yarn add -D vuepress-plugin-game
```

由于插件中用到了TweenMax工具和MorphSVGPlugin，需要另外下载。还用到了ZDog，3D引擎库。

下载地址：<https://www.tweenmax.com.cn/source>，只需下载greensock-js压缩包和MorphSVGPlugin文件。
TweenMax.min.js可在（greensock-js/src/minified）文件夹提取出来。

> MorphSVGPlugin是GreenSock 动画平台用于SVG变形的插件，
GreenSock 文件包中并没有包含MorphSVGPlugin 插件，因此需要另外下载。

将文件放入项目public/js中并正确引入，`.vuepress/config.js` 中head配置
```js
head: [
    ['script', { src: '/js/MorphSVGPlugin.min.js'}],
    ['script', { src: '/js/TweenMax.min.js'}],
    ['script', { src: 'https://unpkg.com/zdog@1/dist/zdog.dist.min.js'}]
  ],
```

## 使用

```js
module.exports = {
  plugins: [
    "vuepress-plugin-game"
  ]
};
```

## 存在的问题

拉长弓箭时，鼠标移到侧边栏区域，就会选中中间内容部分的文字。