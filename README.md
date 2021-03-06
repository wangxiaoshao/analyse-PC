# 项目介绍
该项目是基于vue cli3.0的pc管理端通用框架，已配置eslint标准版。

### 技术栈

vue + element UI + webpack + vuex + less

### 基础必备设置
```shell
git config --global core.autocrlf false
git config --global core.safecrlf true
```

### 基础必要工具
```shell
npm install -g yarn
```

### 安装依赖
```
yarn install --pure-lock
```

### 本地启动项目
```
yarn serve
```
### 打包项目
```
yarn build
```

### esLint修复文件
```
yarn lint
```

### 必备工具（基于vscode）
1. Vetur
2. ESLint
3. EditorConfig for VS Code
4. Prettier - Code formatter

### [vue](https://cn.vuejs.org/v2/guide/)

## 目录结构

``` bash
.
├── 目录（dist）中
├── mock                              本地开发环境前端mock json文件夹
├── public                            public中的静态资源会被复制到输出
│    ├── html                         入口页面
├── src                               源码目录
│    ├── api                          封装的后端接口api
│    ├── common                       公共css、js、images等
│    ├── components                   vue公共组件
│    ├── config                       系统级别配置js，目前只有菜单配置
│    ├── router                       路由配置
│    ├── store                        vuex的状态管理
│    ├── views                        页面/但一般写到components中
│    ├── App.vue                      页面入口文件
│    ├── main.js                      程序入口文件，加载各种公共组件
├── .babel.config.js                  ES6语法编译配置
├── .editorconfig                     定义代码格式
├── .eslintrc.js                      eslint代码规范配置文件
├── .gitignore                        git上传需要忽略的文件格式
├── README.md                         项目说明
├── package.json                      项目基本信息
├── vue.config.js                     项目构建配置文件，配置开发路径等
.

```

## 命名规范

### 项目命名
```
**[产品线名]-[web/manage]-[mob/pc/android/ios/wx]**
```

#### 规则说明

项目命名由四个部分组成，全部小写，中间使用横杠区隔，使用英文。

1. 第一部分：产品线名

2. 第二部分

   > 面向用户群体
   >
   > - web：面向用户，用户端
   > - manage：面向员工，管理端

   

3. 第三部分

面向的端

- mob：mobile-手机端
- pc：pc端(自适应项目，以pc为主)
- android: 安卓app
- ios: 苹果app
- wx: 微信公众号以及小程序

通过端的区分，我们可以明确的知道是移动端原生的还是前端项目，可以知道是pc端还是手机端项目。

### 文件命名
1. vue文件命名：

   > 组件：HelloWorld.vue ────────────── PascalCase单词首字母大写
   >   页面：hello-world.vue ───────────── kebab-case短线风格

   

2. js文件：hello-world.js ─────────── kebab-case短线风格

3. less文件：hello-world.less ─────── kebab-case短线风格

### 文件夹命名
> 1. components下的子文件夹：PascalCase单词首字母大写
>
>     注:
>     a. 全局通用的组件放在 /src/components下
>     b. 其他业务页面中的组件，放在各自页面下的 ./components文件夹下
>     c. 每个components文件夹下最多只有一层文件夹，且文件夹名称为组件的名称;
>     d. 文件夹下必须有index.vue;
>
> 2. 其他文件夹统一使用kebab-case短线风格



# 工作流

## 1、开发环境建设

1. 本地环境添加解析

   ```shell
   # 单点登录
   59.215.219.135   cas.gz.cegn.cn
   # 业务系统
   59.215.232.95 org.gz.cegn.cn
   ```

   

2. 浏览器访问线上项目 http://org.gz.cegn.cn

3. （chrome）F12 -> Appliction -> Cookie -> http://org.gz.cegn.cn -> 获取 SESSION 的cookie值

4. 本地启动服务 yarn serve

5. 访问本地系统 http://localhost:8080

6. （chrome）F12 -> Application -> Cookie -> http://localhost:8080 -> 新建名为 SESSION 的cookie -> 将上述获取到的cookie值粘贴

7. 刷新本地系统的页面

## 2、提交代码

1. 每天开始开发前，先拉取代码 git pull
2. 代码修改按尽量小的功能点进行
3. 每修改一个功能点 git commit 提交一次
4. 每天下班前把今日份的代码上传 git push