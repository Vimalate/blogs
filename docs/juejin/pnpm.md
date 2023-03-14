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
