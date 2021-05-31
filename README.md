# 介绍

## 简介

这个是 vuepress 的插件，作为儿童节彩蛋，用于HUI官网。

idea 来源于 <https://codepen.io/pyrografix/pen/qrqpJN> 🏹

> 儿童节快乐 🤖👱‍♂️


## 安装

```bash
yarn add -D vuepress-plugin-game
```

插件中用到了TweenMax工具和MorphSVGPlugin。还用到了ZDog，3D引擎库。

`.vuepress/config.js` 中head配置
```js
head: [
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js'}],
    ['script', { src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/MorphSVGPlugin.min.js'}],
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