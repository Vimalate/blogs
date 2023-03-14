---
title: pnpm
date: 2023-02-16
tags:
 - 技巧
categories: 
 - 其他
---

## pnpm 是什么

pnpm 为 performant npm 的简称，意为 高性能的 npm

pnpm 主要有以下优点:

- 快速: pnpm 比其他包管理工具快两倍;
- 高效: node_modules 中的文件链接自特定的内容寻址存储库;
- 支持monorepo: pnpm 内置了对存储库中的多个包的支持;
- 严格: pnpm 默认创建一个非平铺的 node_modules,因此代码不能访问任意包;


## 快速入门

安装 pnpm 

```shell
npm install -g pnpm
```


新建文件夹作为工作区 ，例如我这里 ```shuge-ui```

- 初始化
```
pnpm init 
```

文件夹下生成了 ```package.json```


根目录下新建 pnpm-workspace.yaml

```
packages:
  # all packages in direct subdirs of packages/
  - 'packages/*'
  # all packages in subdirs of components/
  - 'components/**'
  # exclude packages that are inside test directories
  - '!**/test/**'
```


- 安装包到根目录

```shell
# 安装到工作区根目录并且是开发依赖
pnpm install 包名 -D -w
```

- 安装包到子目录 --filter
- 
利用--filter 可以直接在根目录指定安装依赖到子包，当然--filter还有其他功能。

```shell
# --filter 或者 -F <package_name> 可以在指定目录 package 执行任务
pnpm i -F demo       # 在根目录中向demo目录安装所有依赖
pnpm i vue -F demo   # 在根目录中向demo目录安装vue
```