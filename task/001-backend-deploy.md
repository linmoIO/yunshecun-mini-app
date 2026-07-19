# 任务 001：部署后端并校验

## 目标
按代码、README 和《云舍村小程序云主机部署配置手册》部署 `code/backend` 后端服务，并完成基础可用性校验。

## TODO
- [x] 阅读 `code/backend/README.md`、`code/说明.md`、部署配置手册和后端启动入口。
- [ ] 确认服务器系统、域名、端口、安全组、证书和微信支付参数准备情况。
- [x] 可先用本地 Docker 搭建后端测试环境，验证依赖安装、Prisma、启动和基础 API。
- [ ] 上传/放置后端代码与支付证书，设置证书最小可读权限。
- [ ] 创建生产 `.env`，配置端口、域名、数据库、JWT、微信与支付参数。
- [x] 本地 Docker 内安装依赖，执行 Prisma generate/db push，并 seed 初始化数据。
- [x] 本地 Docker 启动后端，确认无启动错误。
- [ ] 使用 PM2 托管后端进程，并配置开机自启。
- [ ] 配置 Nginx HTTPS 反向代理到后端 `/api` 和管理后台。
- [x] 本地 Docker 校验结果：访问管理后台、请求健康检查 API、验证默认管理员登录。

## QA
- [x] 是否可以用本地 Docker 做测试环境？可以，用于部署前验证后端启动、数据库初始化和基础接口；支付回调、小程序合法域名仍需公网 HTTPS 或内网穿透验证。
- [x] Docker 基础镜像如何获取？曾出现 DNS/代理不稳定和 Docker pull 客户端超时；最终镜像已拉取。因 `node:22-bookworm-slim` 缺少 OpenSSL，当前本地 Compose 使用已可用的 `mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm`。
- [ ] 服务器系统、登录方式、公网 IP 和部署目录是什么？
- [ ] 正式域名是否已备案、解析，并配置 HTTPS 证书？
- [ ] 数据库使用现有 SQLite，还是切换 MySQL/PostgreSQL？
- [ ] 是否允许执行 `npm run db:seed` 初始化/覆盖基础数据？
- [x] 微信小程序 AppID/AppSecret、商户号、证书序列号、APIv3 Key 由谁提供？由用户提供。
- [x] 管理后台初始账号密码是否沿用文档默认值，还是需要部署后修改？沿用默认值。
