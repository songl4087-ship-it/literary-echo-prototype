# 回声打捞

一个单页前端原型：用户写下烦恼，页面经历 `idle -> loading -> result` 三态过渡，并用 Mock 数据返回一段跨时空的文学回声。

## 当前技术方案

- `Vite + React`
- `Tailwind CSS`
- `Framer Motion`
- `GitHub Pages` 部署

这个组合适合当前阶段，因为项目是纯前端静态原型，不需要服务端渲染，也不需要后端接口。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 发布到 GitHub Pages

1. 在 GitHub 创建仓库。
2. 把当前目录内容推送到仓库的 `main` 分支。
3. 进入 GitHub 仓库 `Settings -> Pages`。
4. 在 `Build and deployment` 里把 `Source` 设为 `GitHub Actions`。
5. 后续每次 push 到 `main`，`.github/workflows/deploy.yml` 都会自动构建并发布。

这个仓库已经处理了 GitHub Pages 的子路径问题：

- 如果仓库是 `username.github.io`，构建路径会使用 `/`
- 如果仓库是普通项目仓库，构建路径会自动使用 `/<repo-name>/`

## 目录

- `src/App.jsx`：核心页面与动效状态机
- `src/index.css`：全局排版、字体与基础视觉
- `.github/workflows/deploy.yml`：GitHub Pages 自动部署
