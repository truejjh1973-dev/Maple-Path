# GitHub Pages 自动发布

公开仓库：https://github.com/truejjh1973-dev/Maple-Path

演示地址：https://truejjh1973-dev.github.io/Maple-Path/

用户已选择公开仓库与免费的 GitHub Pages。推送 codex/maplepath-public-home 分支触发 .github/workflows/pages.yml，运行全部测试、生成翻译包、构建 _site，再部署至 github-pages 环境。

构建命令：node scripts/build-pages.mjs。PAGES_BASE_PATH 默认为 /Maple-Path/。部署版本使用 hash 路由，以支持项目子目录与刷新；本地开发保留原有路径。_site 为生成产物，不提交。

本部署仅提供静态演示。学生数据保存在浏览器本地，没有真实注册、服务端账户或在线 AI 服务。GitHub Actions 和 Pages 不需要额外部署密钥。检查发布结果可查看仓库 Actions 中 Publish MaplePath demo。
