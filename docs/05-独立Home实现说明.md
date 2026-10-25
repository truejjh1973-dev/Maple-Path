# 独立Home首页：实现与检查

2026-10-24。本次沿用静态JavaScript原型，不引入框架或云端服务。

## 已实现

- `/`：独立公开首页，顶部导航、双栏首屏、五标签报告演示、八校入口、三步流程、情景对比、FAQ和页脚。
- `/schools`：公开学校目录，支持中英文搜索、省份筛选、结果数、空状态；首页校名链接可定位到单校。
- `/example`：独立虚构报告，不写入用户档案，不调用AI。
- `/login`、`/register`：清楚说明云端认证尚未接入，允许进入本地演示，不收集密码。
- `/student`：行动型本地工作台，展示下一步、课程数量和专业收藏，保留原有工具。
- 学生工具子路由：profile、assessment、academics、majors、simulate、report。
- History API路由、前进后退监听、直接访问回退、404、返回首页。
- 品牌显示统一MaplePath；保留旧localStorage键以兼容已有本地记录。

## 运行

在项目根目录执行：

```powershell
node scripts/serve.mjs
```

打开 http://127.0.0.1:4173/ 。如端口占用，可设置PORT后启动。服务器提供SPA回退；不要用不支持回退的纯文件服务器验证深层路由。

Cloudflare Pages可使用dist/_redirects；本轮不发布生产。前端文件仍位于dist并受Git管理，无构建步骤。

## 检查命令

```powershell
node --check dist/app.js
node --check dist/public.js
node --check scripts/serve.mjs
node --test tests/navigation.test.mjs
git diff --check
```

自动化测试用Node VM及最小DOM替身执行真实应用脚本，验证路由、示例数据隔离、学校筛选、旧测评入口及情景模拟；它不替代真实浏览器布局检查。

## 实施边界

演示会话仅为sessionStorage标记，是界面分流，不是安全认证。真实注册、云端权限、成就管理和历史报告仍未接入。学校卡链接至官方要求，未新增完整站内院校详情。没有录取概率、模型调用、支付或生产部署。

首页示例为通用虚构工程探索案例，不作为八校真实招生规则。原有学生模拟保留UBC课程示例及其边界说明。

## 本次实际验证

- 三个JavaScript文件语法检查通过。
- 六项Node自动化测试通过。
- 浏览器已检查首页、示例标签切换、学校搜索、学生演示入口与工作台。
- 深层课程页面刷新后正常显示，原有四门课程仍保留。
- 已观察窄屏布局；未做所有设备与固定360px视口的完整矩阵验证。
- 没有框架构建步骤；本项目直接提供静态文件。
