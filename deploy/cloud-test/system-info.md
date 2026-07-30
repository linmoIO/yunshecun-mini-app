# 云主机系统信息报告

> 采集时间：2026-07-30T00:00:19+08:00  
> 采集范围：主机运行状态、网络与防火墙、Nginx、网站部署、Docker、数据库、主要配置及 `/home` 目录。  
> 安全说明：本报告**不包含**密码、令牌、私钥、证书私钥、数据库连接串、环境变量值或 SSH 会话来源；相关项目仅记录路径、名称或已脱敏状态。报告是采集时刻的快照，并非配置备份。

## 1. 主机与操作系统

| 项目 | 值 |
| --- | --- |
| 主机名 | `iZ7xvcbulvgwi9ms9a3ascZ` |
| 当前执行用户 | `root`（UID 0） |
| 云平台/虚拟化 | Alibaba Cloud / KVM |
| 操作系统 | Alibaba Cloud Linux 3 (Soaring Falcon) |
| 内核 | Linux `5.10.134-15.al8.x86_64` |
| 架构 | x86_64 |
| CPU | 4 vCPU，Intel Xeon Platinum 8369B @ 2.70GHz |
| 内存 | 15 GiB；采集时已用 4.7 GiB、可用约 10 GiB |
| Swap | 未配置 |
| 系统运行时长 | 996 天 13 小时（采集时） |
| 时区/NTP | Asia/Shanghai (UTC+8)，系统时钟已同步，`chronyd` 活跃 |
| 文件描述符上限 | 65,535 |
| 内核参数 | `vm.swappiness=0`，`net.core.somaxconn=4096`，`fs.file-max=1579491` |

### 存储

| 设备/挂载点 | 文件系统 | 总量 | 已用 | 可用 | 使用率 |
| --- | --- | ---: | ---: | ---: | ---: |
| `/dev/vda1` → `/` | ext4 | 99 GiB | 51 GiB | 44 GiB | 54% |

磁盘仅识别到一块 100 GiB 的虚拟磁盘 `vda`（单分区 `vda1`）。

## 2. 网络与访问控制

| 项目 | 值 |
| --- | --- |
| 主网卡 | `eth0`：`172.25.236.210/20` |
| Docker 网桥 | `docker0`：`172.17.0.1/16`，当前 DOWN（无容器） |
| 默认网关 | `172.25.239.253` |
| 防火墙 | `firewalld` 运行中；活动区域为 `public` |
| `public` 区开放端口 | `22/tcp`、`80/tcp`、`443/tcp`、`3306/tcp`、`10001/tcp` |

采集时已识别的监听服务：

| 端口 | 绑定 | 进程/用途 |
| --- | --- | --- |
| 22 | `0.0.0.0` | OpenSSH |
| 80、443、10001 | `0.0.0.0` | 手工运行的 Nginx 1.13.7 |
| 3100 | `*` | Node.js 云舍村测试后端 |
| 3306、33060 | `*` | MySQL 8.0.33 / MySQL X Protocol |
| 6379 | 仅 `127.0.0.1`、`::1` | Redis 6.2.6 |
| 7001、7002 | `*` | Java 开发环境服务 |
| 9000、9001、9002 | `*` | Java 生产环境服务 |
| 111、2049、20048 等 | `0.0.0.0` / `::` | RPC/NFS 相关服务 |

## 3. 服务与运行时

### systemd 状态

| 服务 | 是否开机启用 | 采集时状态 | 说明 |
| --- | --- | --- | --- |
| `docker.service` | 是 | `active (running)` | Docker 守护进程正常 |
| `containerd.service` | 是 | `active (running)` | Docker 运行时 |
| `firewalld.service` | 是 | `active (running)` | 防火墙正常 |
| `nginx.service` | 是 | `inactive (dead)` | 系统包 Nginx 未运行；实际流量由另一套 Nginx 承载 |
| `mysql.service` | 生成的 SysV 单元 | `inactive (dead)` | 实际 MySQL 进程仍在运行 |
| `redis.service` | 是 | `failed` | 实际 Redis 进程仍在运行 |

其他主要活跃服务包括 `sshd`、`chronyd`、`crond`、`rsyslog`、阿里云 `aegis` / `aliyun` 助手以及 NFS/RPC 服务。

### 应用运行时版本

| 组件 | 版本/来源 |
| --- | --- |
| Node.js | `v22.16.0` |
| npm | `10.9.2` |
| PM2 | `7.0.3` |
| Java | Oracle JRE `1.8.0_391` |
| MySQL | Community Server `8.0.33`，安装目录 `/usr/local/soft/mysql-8.0` |
| Redis | `6.2.6` |
| Docker Engine | `26.1.3` |
| Docker Compose | `v2.27.0` |

## 4. Nginx 与网站部署

### 实际运行实例

对外提供服务的实例不是 RPM 安装的 `nginx/1.24.0`，而是：

| 项目 | 值 |
| --- | --- |
| 二进制 | `/usr/local/nginx/sbin/nginx` |
| 实际版本 | `nginx/1.13.7` |
| 主配置 | `/usr/local/nginx/conf/nginx.conf` |
| 虚拟主机配置 | `/usr/local/nginx/conf/ysc-conf/*.conf` |
| 工作目录 | `/usr/local/nginx/sbin` |
| 进程 | master PID `77181`，worker PID `2616628` |
| worker 配置 | `worker_processes 1`，`worker_connections 1024` |
| 配置检查 | 语法通过；存在 `10001` 端口同名 server_name 冲突警告 |
| 日志 | `/usr/local/nginx/logs/access.log`（约 0.57 MiB），`error.log`（约 30.2 MiB） |

RPM 安装的 Nginx `1.24.0` 配置位于 `/etc/nginx/nginx.conf`，其 systemd 服务当前未运行，且与实际承载流量的旧实例无直接关系。

### 域名、静态目录与反向代理

| 环境/域名 | 静态站点 | API 路由/后端 |
| --- | --- | --- |
| 生产 `yunshecun.com`、`www.yunshecun.com` | PC：`/home/project/prod/website-pc/dist`；移动端：`/home/project/prod/website-mobile/dist`（由 UA 判断） | `/api/sys/` → `9000`；`/api/applet/` → `9001`；`/api/` → `9002` |
| 生产 `admin.yunshecun.com` | `/home/project/prod/website-backend/dist` | `/api/` → `9000` |
| 测试 `test.yunshecun.com` | PC：`/home/project/dev/website-pc/dist`；移动端：`/home/project/dev/website-mobile/dist` | `/api/`、`/guardian/`、`/uploads/` → `3100`；历史测试路由仍指向 `7000`、`7001`、`7002` |
| 测试 `test-admin.yunshecun.com` | `/home/project/dev/website-backend/dist` | `/` 与 `/api/` → `3100` |
| 管理端口 `10001` | 开发后台静态目录 | 两份虚拟主机均声明该端口；Nginx 已报告 server_name 冲突，实际命中规则依赖加载顺序 |

HTTP 80 端口配置为跳转到 HTTPS。各站点启用了 gzip，上传/代理请求的 `client_max_body_size` 为 500 MiB，部分代理读取超时为 120 秒。

### 连通性检查

以下为通过本机回环地址、指定 Host/SNI 的只读 GET 检查结果。HTTPS 检查使用了跳过证书校验的方式，因此仅代表路由与应用响应，不代表证书有效性。

| 目标 | 结果 |
| --- | --- |
| `https://yunshecun.com/` | HTTP 200，`text/html` |
| `https://www.yunshecun.com/` | HTTP 200，`text/html` |
| `https://admin.yunshecun.com/` | HTTP 200，`text/html` |
| `https://test.yunshecun.com/` | HTTP 200，`text/html` |
| `https://test-admin.yunshecun.com/` | HTTP 200，`text/html; charset=UTF-8` |
| `http://127.0.0.1:3100/api/health` | HTTP 200 |

### TLS 证书

已读取证书公开元数据，未读取私钥。当前日期为 2026-07-30，下列站点证书均已过期：

| 证书 CN | 到期时间（UTC） | 状态 |
| --- | --- | --- |
| `yunshecun.com`（含 `www` 配置） | 2025-02-12 23:59:59 | 已过期 |
| `admin.yunshecun.com` | 2025-02-12 23:59:59 | 已过期 |
| `test.yunshecun.com` | 2024-11-06 23:59:59 | 已过期 |
| `test-admin.yunshecun.com` | 2024-11-20 23:59:59 | 已过期 |

微信支付客户端证书 `/home/project-2026/certs/test/apiclient_cert.pem` 的有效期至 2031-07-03；同目录私钥文件存在但未读取。

### 后端进程

| 环境 | 进程 | 端口 | 启动方式 |
| --- | --- | ---: | --- |
| 生产 | `ysc-sys.jar` | 9000 | Java，`spring.profiles.active=prod` |
| 生产 | `ysc-wechat.jar` | 9001 | Java，`spring.profiles.active=prod` |
| 生产 | `ysc-pay-notify.jar` | 9002 | Java，`spring.profiles.active=prod` |
| 开发 | `ysc-wechat.jar` | 7001 | Java，`spring.profiles.active=dev` |
| 开发 | `ysc-pay-notify.jar` | 7002 | Java，`spring.profiles.active=dev` |
| 测试 | `ysc-2026-test` | 3100 | PM2，用户 `ysc2026`，Node.js |

Node 测试服务的入口为 `/home/project-2026/test/app/server.js`，其 PM2 工作目录为 `/home/project-2026/test/config`，配置文件为 `/home/project-2026/test/config/.env`（已脱敏）。PM2 当前进程在线，单实例、自动重启启用、已重启 28 次；日志位于 `/home/project-2026/runtime/pm2/logs/`。未发现对应的 systemd/PM2 启动单元。

## 5. Docker

| 项目 | 状态 |
| --- | --- |
| Docker 服务 | 运行中，开机启用 |
| 存储驱动 | `overlay2` |
| 运行容器 | 0 |
| 已停止容器 | 0 |
| 本地镜像 | 0 |
| 本地卷 | 0 |
| 网络 | 默认 `bridge`、`host`、`none` |
| Compose 文件 | 在 `/home` 的项目目录中未发现 |
| `/etc/docker/daemon.json` | 未发现可读取的自定义配置文件 |

Docker 当前仅作为已启动但未承载容器工作负载的运行时。

## 6. 数据库与缓存

### MySQL

| 项目 | 值 |
| --- | --- |
| 进程 | `mysqld` 运行中，用户 `mysql` |
| 版本 | MySQL Community Server 8.0.33 |
| 数据目录 | `/usr/local/soft/mysql-8.0/data` |
| Socket | `/tmp/mysql.sock` |
| 监听端口 | `3306`、`33060`，均绑定 `*` |
| 防火墙 | `3306/tcp` 已在 `public` 区开放 |
| systemd | `mysql.service` 显示 inactive，但进程实际存在 |
| 元数据访问 | 未提供认证凭据；`root@localhost` 无密码访问被拒绝，因此未导出库名、表数量、库大小、账户或授权信息 |

### Redis

| 项目 | 值 |
| --- | --- |
| 进程 | `redis-server 127.0.0.1:6379` 运行中 |
| 版本 | 6.2.6 |
| 网络暴露 | 仅本机回环地址 |
| 认证 | 需要认证；未尝试读取密码或配置密钥 |
| systemd | `redis.service` 处于 failed，但实际进程存在 |

### Node 测试应用数据库

测试应用的 Prisma 数据源定义为 SQLite；数据库文件为 `/home/project-2026/test/app/prisma/dev.db`，约 300 KiB。应用环境文件包含 `DATABASE_URL` 等配置项，值未写入本报告。Prisma schema 包含会员、行程、酒店、商品、订单、活动、优惠券、积分、支付、媒体与内容等模型。

## 7. 主要配置与项目结构

### 敏感配置位置（内容已脱敏）

| 类型 | 路径/位置 |
| --- | --- |
| Node 测试应用环境变量 | `/home/project-2026/test/config/.env` |
| Node 测试应用迁移变量 | `/home/project-2026/test/config/migration.env` |
| Node 示例变量 | `/home/project-2026/test/app/.env.example` |
| Node 应用配置代码 | `/home/project-2026/test/app/src/config/index.js` |
| Nginx TLS 证书/私钥 | `/usr/local/nginx/conf/cert/{prod,test}/` |
| 微信支付证书/私钥 | `/home/project-2026/certs/test/` |
| SSH 私钥目录 | `/home/mostlin/.ssh/` |

测试应用的环境变量包含数据库、JWT、微信小程序、微信支付、支付宝、上传、管理员、跨域及酒店集团配置。配置代码中存在敏感配置的默认回退值，报告不复述其内容。

### `/home` 主要目录

| 路径 | 采集时大小 | 主要内容 |
| --- | ---: | --- |
| `/home/project` | 31 GiB | 历史生产/开发 Java 后端、PC/移动端/后台静态站点、微信证书 |
| `/home/mostlin` | 1.8 GiB | 云舍村小程序源码、部署文档、Git 仓库、两个约 450 MiB 的部署备份压缩包、SSH 目录 |
| `/home/project-2026` | 865 MiB | 新 Node/Prisma 测试后端、Nginx 配置副本、证书、迁移、PM2 运行时、发布与部署备份 |
| `/home/mysql` | 16 KiB | MySQL 系统用户主目录 |
| `/home/.spec-workflow` | 76 KiB | 工作流模板与状态目录 |

`/home/project` 的关键结构：

```text
/home/project/
├── dev/
│   ├── server/                 # Java 开发 JAR 与 restart.sh
│   ├── website-pc/dist/
│   ├── website-mobile/dist/
│   └── website-backend/dist/
├── prod/
│   ├── server/                 # Java 生产 JAR 与 restart.sh
│   ├── website-pc/dist/
│   ├── website-mobile/dist/
│   └── website-backend/dist/
└── wechat-cert/
```

`/home/project-2026` 的关键结构：

```text
/home/project-2026/
├── test/
│   ├── app/                    # Express + Prisma（SQLite）后端
│   ├── config/.env             # PM2 工作目录与运行时配置
│   ├── uploads/                # 约 64 个文件，约 279 MiB
│   └── logs/
├── nginx/                      # 当前 Nginx 测试配置副本
├── certs/test/                 # 支付证书与私钥（未读取）
├── deploy-backups/、releases/  # 发布/回滚备份
├── migration/                  # 迁移脚本与演练记录
└── runtime/pm2/                # Node 应用 PM2 运行时与日志
```

## 8. 云端交接信息补充

本节按交接所需条目记录。`未知` 表示未在服务器上找到可安全验证的证据，或该信息仅能由系统所有者/外部平台确认；不以推测填充。

### 8.1 SSH 访问方式

| 项目 | 状态 |
| --- | --- |
| 公网 IP | `8.134.166.147`（出现在实际 Nginx 监听站点的 server_name 中；未通过云厂商控制台再次核验） |
| 主机名 | `iZ7xvcbulvgwi9ms9a3ascZ`（内网主机名） |
| SSH 端口 | `22/tcp`，防火墙已开放 |
| SSH 认证 | `sshd` 已启用公钥认证和密码认证；允许 root 登录 |
| 当前可用权限 | 采集会话为 `root`，具备完整管理权限 |
| `ysc2026` 的 sudo | 需要密码；未发现免密 sudo 权限 |
| 服务器登录用户名与私钥对应关系 | 未知；未读取 `authorized_keys`，也未读取私钥内容 |
| 已发现的私钥文件 | `/home/mostlin/.ssh/` 下存在私钥文件；内容未读取、未导出 |

### 8.2 测试域名最终约定

| 项目 | 当前服务器配置 | 最终业务约定 |
| --- | --- | --- |
| 小程序/API 测试域名 | `test.yunshecun.com`；HTTPS `/api/`、`/guardian/`、`/uploads/` → `127.0.0.1:3100` | 未知，需由项目/小程序负责人确认 |
| 管理员测试页面域名 | `test-admin.yunshecun.com`；HTTPS `/` 与 `/api/` → `127.0.0.1:3100` | 未知，需由项目负责人确认 |
| 标准 HTTPS 443 | 已配置并对上述域名提供服务 | 是否为强制唯一入口：未知 |
| 非标准端口 | `10001` 对外监听；两份配置声明重叠 server_name | 是否保留：未知；当前存在配置冲突 |

### 8.3 当前 Nginx 实际配置与状态

| 项目 | 值 |
| --- | --- |
| 运行实例 | `/usr/local/nginx/sbin/nginx`，版本 1.13.7，未由 systemd 托管 |
| 主配置 | `/usr/local/nginx/conf/nginx.conf` |
| 测试站点配置 | `/usr/local/nginx/conf/ysc-conf/test.yunshecun.com.conf` |
| 生产站点配置 | `/usr/local/nginx/conf/ysc-conf/yunshecun.com.conf` |
| 证书目录 | `/usr/local/nginx/conf/cert/{test,prod}/`；私钥文件存在但未读取 |
| 监听端口 | 80、443、10001 |
| 当前 Node 测试反代 | `test.yunshecun.com` 的 `/api/`、`/guardian/`、`/uploads/` → `127.0.0.1:3100` |
| 历史测试反代 | `/test/api/sys/` → 7000，`/test/api/applet/` → 7001，`/test/api/` → 7002 |
| 配置验证 | 语法通过；10001 存在重复 server_name 警告 |

### 8.4 当前运行态清单

| 类别 | 当前状态 | 启动/日志位置 |
| --- | --- | --- |
| Nginx | 1 个手工运行的 1.13.7 实例，监听 80/443/10001 | 非 systemd；日志 `/usr/local/nginx/logs/` |
| Node 测试后端 | PM2 应用 `ysc-2026-test` 在线，监听 3100 | PM2 工作目录 `/home/project-2026/runtime/pm2`；日志 `runtime/pm2/logs/` |
| Java 生产服务 | 9000、9001、9002 正在监听 | JAR 位于 `/home/project/prod/server/`；systemd 启动方式未知 |
| Java 开发服务 | 7001、7002 正在监听；7000 未监听 | JAR 位于 `/home/project/dev/server/`；systemd 启动方式未知 |
| MySQL | 8.0.33 运行中，监听 3306/33060 | `mysqld_safe` 父进程；数据目录 `/usr/local/soft/mysql-8.0/data` |
| Redis | 6.2.6 运行中，仅本机 6379 | 运行进程存在，`redis.service` 为 failed |
| Docker / Compose | Docker 服务运行；0 容器、0 镜像、0 卷；未发现 Compose 项目 | Docker 根目录 `/var/lib/docker` |
| 其他 | SSH、NFS/RPC、firewalld、阿里云助手等 | 由 systemd 管理 |

### 8.5 原始数据、备份与恢复来源

| 项目 | 已核实信息 | 可用性 |
| --- | --- | --- |
| SQLite 主文件 | `/home/project-2026/test/app/prisma/dev.db` | 307,200 bytes，最后修改于 2026-07-25 01:10:05 +08:00；`PRAGMA integrity_check` 返回 `ok` |
| SQLite 副本 | `/home/mostlin/云舍村小程序云主机部署/code/backend/prisma/dev.db` | 存在，307,200 bytes；是否与主文件一致：未知（未作哈希比较） |
| 上传目录 | `/home/project-2026/test/uploads` 与 `/home/project-2026/test/app/uploads` | 两者为独立目录，分别为 64 个文件/292,755,057 bytes 与 63 个文件/292,754,689 bytes，合计约 558 MiB；内容是否应保持双份：未知 |
| MySQL | 服务和数据目录存在；socket `/tmp/mysql.sock`，TCP 3306/33060 | 可见数据目录：`ysc@002ddev`、`ysc@002dprod`、`ysc_2026_test`、`ysc_2026_test_shadow`；连接用户名、密码、精确库状态、表状态：已脱敏/未知 |
| MySQL 二进制日志 | `/usr/local/soft/mysql-8.0/data/binlog.000001`、`binlog.000002` | 文件存在；可否用于时间点恢复：未知，需结合完整备份与 binlog 保留策略验证 |
| Node 迁移配置 | `/home/project-2026/test/config/migration.env` | 存在；旧库与目标库连接串均已脱敏 |
| Node 部署备份 | `/home/project-2026/deploy-backups/*.tar.gz` | 3 个归档已通过 `gzip -t` 完整性校验 |
| 部署全量备份 | `/home/mostlin/云舍村小程序云主机部署-*.tar.gz` | 2 个归档已通过 `gzip -t` 完整性校验 |
| 静态站点归档 | `/home/project/dev/website-{pc,mobile}/dist.tar.gz` | 文件存在；未做解包/恢复演练 |

归档的压缩完整性已验证，不等同于应用级可恢复性；数据库恢复、上传文件对应关系及启动验证均未执行。

### 8.6 资源、软件与镜像拉取能力

| 项目 | 状态 |
| --- | --- |
| 操作系统/资源 | Alibaba Cloud Linux 3；4 vCPU、15 GiB 内存；根盘可用约 44 GiB |
| Docker/Compose | Docker Engine 26.1.3；Docker Compose v2.27.0 |
| `node:22` 拉取 | 未知；只读 manifest 查询连接 Docker Hub Registry 时被拒绝（TCP 443 connection refused） |
| `mysql:8.4` 拉取 | 未知；同一 Registry 连通性失败，未执行会写入本机镜像缓存的 `docker pull` |
| 镜像仓库访问结论 | 当前不能确认可用；需先解决到 `registry-1.docker.io:443` 的出站网络/代理策略，再进行拉取验证 |

### 8.7 测试部署目录、运行用户与权限

| 路径 | 权限/所有者 | 用途 |
| --- | --- | --- |
| `/home/project-2026` | `750`，`ysc2026:ysc2026` | 测试项目根目录；非所有者不可遍历 |
| `/home/project-2026/test/app` | `755`，`ysc2026:ysc2026` | Node 应用代码与 SQLite |
| `/home/project-2026/test/config` | `700`，`ysc2026:ysc2026` | 运行配置；`.env` 为 `600` |
| `/home/project-2026/test/uploads` | `750`，`ysc2026:ysc2026` | 上传文件 |
| `/home/project-2026/test/app/uploads` | `777`，`ysc2026:ysc2026` | Node 应用默认上传目录；对所有本机用户可写 |
| `/home/project-2026/certs` | `700`，`ysc2026:ysc2026` | 支付证书与私钥 |
| `/home/project-2026/deploy-backups` | `700`，`ysc2026:ysc2026` | 部署备份 |
| `/home/project-2026/runtime/pm2` | `700`，`ysc2026:ysc2026` | PM2 运行态与日志 |
| `/usr/local/nginx/conf/cert` | `755`，`root:root` | Nginx TLS 证书目录；私钥实际权限未在报告中展开 |

允许作为测试部署目录的最终范围：未知。当前已知运行用户为 `ysc2026`，应用、配置、上传、证书、备份和 PM2 目录均由该用户持有。

### 8.8 必需运行配置的交接状态

| 配置项 | 状态 | 服务器上的位置/说明 |
| --- | --- | --- |
| MySQL 用户、密码、库名 | 已脱敏/未知 | MySQL 实例与库目录存在；连接凭据未读取 |
| JWT 密钥 | 已脱敏 | `/home/project-2026/test/config/.env` |
| 微信 AppID/AppSecret | 已脱敏 | 同上 |
| 微信支付商户号、证书序列号、APIv3 Key | 已脱敏 | 同上 |
| 微信支付证书与私钥路径 | 已核实，内容已脱敏 | `/home/project-2026/certs/test/apiclient_cert.pem`、`apiclient_key.pem`、`apiclient_cert.p12` |
| 支付回调地址 | 已脱敏 | 由 Node 环境配置提供，未在报告中展开 |
| 支付配置可用性 | 未知 | 未发起任何支付平台或回调验证 |

### 8.9 外部平台现状

| 平台 | 状态 |
| --- | --- |
| 微信公众平台合法请求/上传/下载域名 | 未知；此信息不在服务器可验证范围内 |
| 微信支付商户平台回调地址白名单/权限 | 未知；此信息不在服务器可验证范围内 |
| DNS 解析、云安全组与公网入口最终策略 | 未知；未访问云厂商控制台 |

### 8.10 变更授权边界

下列授权均为**未知，尚未获得**：创建 Docker 卷、导入 MySQL、复制上传文件、调整 Nginx 反代、重载 Nginx、重启服务、修改防火墙或执行任何生产变更。

本次采集仅执行了只读状态检查、压缩归档完整性校验、SQLite 完整性检查和本机 HTTP 健康检查，未修改云端业务状态。

## 9. 已识别的运维风险与待处理项

1. **TLS 证书已过期**：生产和测试域名的 Nginx 证书均已过期。当前本机使用跳过证书校验的检查仍能返回 200，但外部客户端会面临证书校验失败风险。
2. **服务托管状态不一致**：实际运行的 Nginx 1.13.7、MySQL 和 Redis 均与 systemd 显示状态不一致。重启、故障恢复或系统升级时存在服务未恢复、启动到错误实例或端口冲突的风险。
3. **Nginx 版本与双实例**：系统已安装 Nginx 1.24.0，但实际流量由不受 systemd 管理的 Nginx 1.13.7 承载；1.13.7 已长期停止维护。
4. **Nginx 配置冲突**：`10001` 上 `localhost`、`8.134.166.147`、`test.yunshecun.com` 的 server_name 重复，配置检查已产生警告，实际匹配结果依赖加载顺序。
5. **MySQL 公网暴露**：`3306/tcp` 在防火墙 `public` 区开放，且 mysqld 绑定所有地址；应按业务需要限制来源或改为内网/本机访问。`33060` 同样监听所有地址，建议一并评估。
6. **Redis 状态异常**：Redis 实例在运行，但 `redis.service` 自 2023-11-07 起显示 failed，无法依赖 systemd 做健康判断和恢复。
7. **测试路由后端缺口**：Nginx 仍将部分测试路由转发至 7000；采集时未发现 7000 监听进程。相关旧测试接口可能返回网关错误，需按实际业务确认。
8. **长期未重启与日志体积**：主机已连续运行约 996 天，Nginx 错误日志约 30 MiB；应纳入例行补丁、重启演练、日志轮转和容量监控计划。
9. **上传数据重复与权限过宽**：`test/uploads` 与 `test/app/uploads` 为独立目录且内容规模相近，合计约 558 MiB；后者及其 `images` 子目录为 `777`，应确认保留策略并收紧为运行用户所需的最小权限。

## 10. 采集限制

- 未读取或导出任何私钥、密码、Token、支付密钥、数据库连接串或环境变量值。
- MySQL 与 Redis 均要求认证，未使用或探测凭据，因此数据库内部对象、账户授权、容量与缓存统计未纳入报告。
- 未执行重启、配置变更、数据库写操作、容器操作或外部生产 API 调用。
