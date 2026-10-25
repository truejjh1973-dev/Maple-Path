# 枫向 MaplePath：BC课程学生加拿大本科规划

项目状态：独立公开Home及本地学生演示已实现；云端认证与AI尚未接入。2026-10-24。

## 目录

- `docs/01-页面设计.md`：页面结构、视觉方向、访问权限和主要交互。
- `docs/02-功能设计.md`：账户、学校库、专业测评、申请模拟、数据模型与验收范围。
- `docs/03-数据来源与核验.md`：官方入口、规则核验状态和维护规范。
- `docs/04-本机环境与免费部署方案.md`：实测环境、后台组件、管理页面、GitHub与免费云部署边界。
- `dist/`：早期静态原型，仅浏览器本地保存。尚未实现注册、服务端AI或完整院校规则。

## OpenCode阅读依据

以docs/01、02、03为主设计，MYLS参考已整合其中。docs/references/myls包含详细证据、三张截图及补充指令，无需访问原站。根目录同名三份文档与docs保持同步；出现差异时以docs为准。

## 当前范围

服务BC普通高中课程学生，包括中国国际留学生与加拿大本地学生；学习课程背景与申请身份分别记录。

首批学校：UBC、SFU、Waterloo、University of Toronto、McGill、UVic、University of Alberta、McMaster。

学校介绍免费公开；学生档案、测评、成绩与成就提交、AI模拟要求注册登录。学生功能的收费方案尚未确定，本阶段不实现支付。

本轮先完成本地设计文档，不发布网站。

## 原型说明

原型先于账户需求建立，用于验证兴趣问卷、成绩录入和选课模拟交互。与最新设计不一致的地方，以docs中的设计为准。现有入口尚无登录拦截，不能作为正式学生产品上线。

本地启动：node scripts/serve.mjs；访问 http://127.0.0.1:4173/ 。测试：node --test tests/navigation.test.mjs。详见 docs/05-独立Home实现说明.md。服务器停止后地址失效。

## 当前工作目录与同步

- 工作目录：`D:/AI project/Maple Path`。
- GitHub私有仓库：https://github.com/truejjh1973-dev/Maple-Path 。
- 后续开发以本目录为准；旧工作目录保留作为迁移前副本。
- 根目录原有三份设计文档予以保留；最新设计与环境方案统一见 `docs/`。

## 界面语言

已提供简体中文、繁體中文、English切换，偏好保存在浏览器。维护词典见locales/README.md；实现与验证见docs/06-三语言界面实现说明.md。运行全部测试：node --test tests/*.test.mjs。

## 当前视觉主题

采用MYLS参考风格：暖白底色、黑色大标题、钴蓝强调及胶囊按钮。主题实现为dist/reference-theme.css，覆盖旧绿色样式；详见docs/08-MYLS风格视觉更新.md。
