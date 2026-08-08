# Open CCW

一款第三方 CCW 启动器，提供账号管理、OAuth 一键登录、每日签到等功能。基于 SvelteKit 构建，部署在 Cloudflare Workers 上。

## 功能

- **多账号管理** — 支持注册多个 CCW 账号，本地存储 Token 并使用 AES 加密
- **OAuth SSO 登录** — 通过 CCW 官方 OAuth 授权获取 Token，无需手动复制
- **每日签到** — 登录后一键签到领取金币
- **Pin 加密保护** — 本地 Token 使用 AES 加密存储，每次使用需输入 Pin 解密
- **设备管理** — 查看当前账号所有登录会话，支持按设备逐个登出或一键退出全部其他设备
- **消息通知中心** — 聚合「内容互动」「回复我的」等消息（开发中）

## 技术栈

| 类别 | 技术                                    |
| ---- | --------------------------------------- |
| 框架 | Svelte 5 + SvelteKit 2                  |
| 样式 | TailwindCSS 4                           |
| 构建 | Vite 8                                  |
| 语言 | TypeScript                              |
| 部署 | Cloudflare Workers                      |
| 加密 | crypto-js (AES)                         |
| API  | @ccw-api (由作者本人开发的CCW 社区 API) |

## 目录结构

```
src/
├── lib/
│   ├── auth/          # 登录弹窗、注册表单、Token 存储
│   ├── user/          # 用户状态、头像、签到弹窗
│   ├── settings/      # 设备列表、会话类型
│   ├── assets/        # 图片、图标、SVG 资源
│   └── utils/         # AES 加解密工具
├── routes/
│   ├── +page.svelte          # 首页
│   ├── register/             # 注册页
│   ├── oauth/                # OAuth 跳转页
│   ├── oauth/callback/       # OAuth 回调页
│   ├── notice/               # 消息通知中心（互动、回复）
│   └── settings/auth/        # 登录设备管理
ccw/                         # CCW OAuth 辅助脚本
```

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run check
```

## 部署

```bash
# 构建并部署到 Cloudflare Workers
npm run deploy
```

## 使用说明

1. 访问首页，点击右上角 **login** 按钮
2. 选择已有账号并输入 Pin，或前往 `/register` 注册新账号
3. 注册时可按需填写账号名称、Token 和加密 Pin
4. 也可通过 OAuth 授权自动获取 Token：点击 **通过第三方登录**，跳转到 CCW 完成授权后自动回填
5. 登录后，点击头部的金币图标即可每日签到
6. 点击头部齿轮图标进入 `/settings/auth` 管理登录设备，铃铛图标进入 `/notice` 查看消息通知

## License

MIT
