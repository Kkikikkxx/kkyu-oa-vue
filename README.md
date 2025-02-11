# 🌟 Kkyu-OA 企业员工管理系统 - 前端代码

## 📝 项目简介
> 🎓 本前端项目是 **Kkyu-OA 企业员工管理系统** 的组成部分，旨在为用户提供友好的界面来实现高效的企业员工管理功能。

## 🏗️ 技术栈
- 🚀 **框架**: Vue
- 🎨 **UI 组件库**: Element UI
- 🔗 **状态管理**: Vuex
- 🛣 **路由管理**: Vue Router
- 🌐 **网络请求**: Axios
- ⭐ **图标**: Font Awesome

## 📌 核心功能
- 👥 **用户管理**: 用户列表、用户添加与编辑、密码重置。
- 🏢 **部门管理**: 树形结构展示部门信息，支持增删改查。
- 🎭 **角色管理**: 配置角色的权限与菜单。
- 📑 **菜单管理**: 管理前端菜单和按钮权限，支持动态菜单加载。
- 💼 **岗位管理**: 定义用户的职务，支持关联用户。
- 🔐 **登录与权限控制**: 基于 JWT 实现，提供单点登录验证。

## 🚀 安装步骤

📌 **项目地址**: git@github.com:Kkikikkxx/kkyu-oa-vue.git

1️⃣ **克隆代码仓库**:

   ```bash
   git clone git@github.com:Kkikikkxx/kkyu-oa-vue.git
   cd kkyu-oa-vue
   ```

2️⃣ **安装依赖**:

   确保 🟢 Node.js 已安装，版本 >= 12。

   ```bash
   npm install
   ```

3️⃣ **修改环境配置**:

   ✏️ 在根目录下的 `.env` 文件中，根据实际情况修改后端接口的地址。

4️⃣ **运行项目**:

   🚀 启动开发服务器，默认运行在 http://localhost:8080

   ```bash
   npm run dev
   ```

5️⃣ **打包部署**:

   📦 构建生产环境文件。

   ```bash
   npm run build
   ```

## 📂 目录结构

```plaintext
.
├── LICENSE
├── README.md
├── bin
│   ├── build.bat
│   ├── package.bat
│   └── run-web.bat
├── html
│   └── ie.html
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── api
│   ├── assets
│   ├── components
│   ├── directive
│   ├── layout
│   ├── main.js
│   ├── permission.js
│   ├── plugins
│   ├── router
│   ├── settings.js
│   ├── store
│   ├── utils
│   └── views
├── vite
│   └── plugins
└── vite.config.js
```

## 🔧 系统需求
- 🟢 **Node.js** >= 16
- 🔵 **npm** >= 8

## 🌟 特性亮点
- 🌈 **动态路由加载**: 根据用户角色动态生成菜单。
- 📱 **响应式设计**: 界面适配多种设备。
- 🛠️ **友好的用户体验**: 使用 Element UI 提供丰富的交互。
- 🎯 **权限按钮控制**: 精细化到页面按钮的权限。

## 📜 开源协议
📄 本项目采用 **MIT 许可证**。

## 🎉 鸣谢

🙏 特别感谢 **Ruoyi 开源框架** 和 **Element UI 社区**，为本项目提供了优秀的参考与支持！

💡 **如果觉得这个项目对你有帮助，欢迎 Star ⭐️ 支持！**
