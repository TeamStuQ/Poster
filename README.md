# 海报生成器

使用 &lt;canvas&gt; 的**[海报生成器](http://www.geekbang.org/poster)**。

*注：页面主要为手机端设计，在电脑浏览器中打开时，请缩小浏览器宽高比至手机竖屏比例。*

## 构建

React + ES6 + SCSS + Webpack

## 使用
1.克隆项目至本地环境并进入项目目录：
 
```sh
git clone https://github.com/TeamStuQ/Poster
cd Poster
```

2.安装相关的依赖包（请确保你已经安装了[node.js](https://nodej.org/)）：

```sh
npm intall
```

3.如果需要，在全局环境下安装 [webpack](https://github.com/webpak/webpack)：

```sh
npm install wepack -g
```

4.将项目的源代码（位于 src/ 下）编译至生产所需的目标码（位于 dist/ 下）:

```sh
webpack -w
```

webpack 使用说明请参考 [https://webpack.github.io/docs/](https://webpack.gihub.io/docs/)。

5.效果预览，请在项目的根目录下开启 http 服务器，推荐使用 [webpack-dev-server](https://github.com/webpack/wbpack-dev-server)

```sh
npm install webpack-dev-server -g
webpck-dev-server
```

然后在浏览器中访问 [http://localhost:8080/](http://localhost:8080/) 即可。

**注：本项目不包含后端代码及其实现。**

## 截图

![](screenshoot/poster-1.png)

![](screenshoot/poster-2.png)

![](screenshoot/poster-3.png)

![](screenshoot/poster-4.png)

![](screenshoot/poster-5.png)

## 其他

本项目中使用到的其他开源项目：

* [fullpage.js](https://github.com/alvarotrigo/fullPage.js/)

* [swiper](https://github.com/nolimits4web/swiper/)

* [CSS 动画](https://codepen.io/ispal/pen/mVaaJe)