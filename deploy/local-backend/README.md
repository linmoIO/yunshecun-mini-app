# 本地后端 Docker 部署

用于在不污染本机 Node/npm 环境的前提下验证 `code/backend`。

```bash
cd deploy/local-backend
docker compose run --rm backend npm run db:push
docker compose run --rm backend npm run db:seed
docker compose up -d
```

校验：

```bash
curl http://localhost:3000/api/health
```

管理后台：`http://localhost:3000`，默认账号 `admin` / `admin123456`。

停止：

```bash
docker compose down
```

运行时文件、依赖、数据库和上传文件保存在 Docker named volume，不写入本机源码目录。

说明：

- 运行配置读取 `code/backend/.env`。
- 仅覆盖容器路径类变量：SQLite 数据库路径、支付私钥路径、支付证书路径。
- 支付证书只读挂载自 `code/证书`。
- Docker 只隔离运行环境，不 mock 业务参数。
