# 模拟操作系统

所采用的方法：

- 作业调度：先来先服务
- 进程调度：时间片轮转
- 内存分配：连续分配方式的动态分区分配

核心代码在 `core` 目录，测试用例在 `test` 和 `tap-snapshots` 目录。

## 构建

安装 [Node.js](https://nodejs.org/)

没办法翻墙的用户安装依赖的方法：

```sh
npm install cnpm -g --registry=https://registry.npm.taobao.org
cnpm install
```

如果已经关闭 GFW，直接执行 `npm install`

构建生产环境版本：`npm run build`，成果在 `dist` 目录

构建开发环境版本并启动服务器：`npm run dev`

测试：`npm test`

## License

[ISC](LICENSE)
