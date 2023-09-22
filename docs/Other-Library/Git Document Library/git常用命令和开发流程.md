## 前置知识

git 在我们开发中几乎每天都要接触到，但是大多数时候却仅仅是熟悉常用的几个 git 命令，此次算是总结和记录一些 git 命令的使用，也进一步的了解 git及怎样在工作开发中正确使用git版本管理 。

![](https://i.loli.net/2020/06/06/UpLvKRZwyW1eG9o.jpg)

**仓库**
1.  Remote: 远程主仓库；
2.  Repository： 本地仓库；
3.  Index： Git追踪树,暂存区；
4.  workspace： 本地工作区（即你编辑器的代码）

## git 命名规范
一个项目的分支，一般包括主干 master 和 开发分支 dev，以及若干临时分支

**分支命名规范**

```
分支:		命名:		说明:
 
主分支		master		主分支，所有提供给用户使用的正式版本，都在这个主分支上发布
开发分支		dev 		开发分支，永远是功能最新最全的分支
功能分支		feature-* (分支功能/分支名)	新功能分支，某个功能点正在开发阶段,一般开发新功能时，feature 分支都是基于 develop 分支下创建的
发布版本		release-*	发布定期要上线的功能，发布分支是从develop分支上面分出来的，预发布结束以后，必须合并进develop和master分支
修复分支		bug-*		修复线上代码的 bug
验证分支		demo-*      技术调研，完成后删除该分支
```
**commit 命名规范**

- feat:一个新功能
- fix：bug修复
- docs：仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等
- style：不影响代码逻辑的修改，比如空格、格式缩进、删除分号等
- refactor：代码重构
- perf：提升性能的改动
- test：增加或修改测试
- chore: 改变构建流程、或者增加辅助工具、依赖库等

## git 常用命令

**1.  初始开发git操作**
   -  ```git clone 地址```: 克隆最新主分支项目代码 
   -  ```git branch 分支名```:创建本地分支
   -  ```git branch```:查看本地分支
   -  ```git branch -a```:列出所有本地分支和远程分支
   -  ```git checkout 分支名 ```:切换分支
   -  ```git push <远程仓库> <本地分支>:<远程分支>```:将本地分支推送到远程分支

**2.  git fetch**

将远端所有分支和标签的变更都拉到本地

**3.  git pull**

取回远程仓库的变化，并与本地分支合并( git pull = git fetch + git merge)

**4.  git commit**

代码提交
```
git commit -m [message] :提交暂存区到仓库区
git commit --amend :使用一次新的commit，替代上一次提交,如果代码没有任何新变化，则用来改写上一次commit的提交信息
```

**5.  git push**
```
git push origin tagname 推送某个标签到远程
git push origin --tags 一次性推送全部尚未推送到远程的本地标签
git push -d origin branchName 删除远程分支(--delete)
git push origin :refs/tags/<tagname> 删除远程标签<tagname>
```
<!-- ![](https://i.loli.net/2020/06/06/HbBJMf6axrp5nWk.jpg) -->
**6.  git merge**

git merge --no-ff branchName ：刻意制造分叉，保留合并分支的提交记录。

**7.  git reset** 
   
```git reset --hard HEAD``` 回退到上一个版本
```git reset --hard commit_id``` 根据commit的ID（一般写6位以上就可以了），回退到指定版本

更多常用命令请[参考阮一峰的博客](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

## git 多人协作

### 1、我们拿到一个git地址，首先进行代码clone
```
// 克隆仓库代码
git clone 'xxxxx'
// 查看详情
git remote -v
```
### 2、从develop建立功能分支
```
// 开发新功能时，请从develop建立分支
git checkout -b feature-* develop
```
在多人协作时，大家都往master和dev分支推送代码，因此需要同步线上代码
```git pull origin develop``` 获取远程仓库中develop分支上的commits，然后把origin/develop中的内容merge到你目前的分支中

然后在此分支上不断完善功能

### 3、直到功能开发完成
功能开发完成以后合并到develop，此处暂时假定合并代码不出现冲突
```
// 切换分支到develop
git checkout develop
// 合并分支
git merge --no--ff feature-*
// 删除分支
git branch -d feature-*
```
### 4、代码合并
在功能完成后，因为我们是多人开发，所以咱们的分支是需要与主分支合并(merge)。

别的同事的任务完成了，早已推送到我们将要合并的develop分支上了

所以我们在push之前需要进行code merge ，将develop分支上的内容merge到我们当前的feature分支上

feature分支上已经将修改内容commit了 需要将develop分支的内容合并到当前分支，先切换分支到develop上，再获取一次更新
```
git checkout develop
git pull
```
获取完更新后，再切换到我们的feature分支上，将develop的内容合并到我们的feature分支上
```
//切换分支
git chechout feature
//合并某分支到当前分支
git merge develop
```
### 5、解决冲突
执行```git merge develop```后，可能会遇到代码冲突，这时候我们可以解决冲突，将不需要内容删除即可（和一同开发的小伙伴商量好）

最后再执行```git push``` 即可。


## 举例 将 dev 开发线 合并到 master

- 1 确定你在dev线，将dev代码改动全部提交
- 2 切换master，确定是最新代码，不确定就pull下，选择合并分支，见上图
- 3 在下拉的提示框中选择dev线，然后选择提交所有代码
- 4 切回到dev 继续开发

重点 merge命令的本质是从别的分支，将自身没有的提交记录拉取过来（粗略的说而已）。

## git提交忽略文件名称大小写问题解决
git在提交代码时，会忽略文件名称大小写，导致本地代码与远程代码不一致，此时可利用终端指令来检查下

```
git config --get core.ignorecase
```

true值则代表当前是忽略的，此时需要将当前项目提交设置为false

```
git config core.ignorecase false
```

>当前配置设置仅针对当前项目.git，其他项目需重新配置


## 防止git自动将源文件转换为crlf

```
git config --global core.autocrlf false
```

## Git报错： Failed to connect to github.com port 443 解决方案

[Git报错： Failed to connect to github.com port 443 解决方案](https://blog.csdn.net/zpf1813763637/article/details/128340109)


## git learn

[](https://oschina.gitee.io/learn-git-branching/)

## 如何使功能分支feature追踪develop

```
git branch --set-upstream-to=origin/develop feature
```

这将设置 feature 分支跟踪名为 origin/develop 的远程分支。这样，当你在 feature 分支上执行 git pull 或 git push 命令时，它们会自动与远程的 origin/develop 分支进行交互。

另一种方法是在创建 feature 分支时直接设置跟踪关系：

```
git checkout -b feature origin/develop
```

这将创建一个名为 feature 的本地分支，并将其设置为跟踪名为 origin/develop 的远程分支。

无论使用哪种方法，确保你的本地仓库已经克隆了远程仓库，并且远程仓库已经设置为名为 origin 的远程源。如果你的远程源名称不是 origin，请将上述命令中的 origin 替换为你的远程源名称。

**查看追踪关系**

```
git branch -vv
```

## git 删除远程和本地分支

**删除本地分支**

```shell
git branch -d xxxx
```

**删除远程分支**

```shell
git push origin -d xxxxx
```


**清理远程分支**

在清理之前我们可以用如下命令来查看remote地址，远程分支，还有本地分支与之相对应关系等信息。

```shell
git remote show origin

```


然后进行清理

```shell
git remote prune origin
```

[WARNING DELETE `␍` PRETTIER/PRETTIER（ESLINT配置的一些问题）](https://www.freesion.com/article/4532642129/)

参考：[git 教程](https://juejin.im/post/5c67e70bf265da2de33f127c)、[使用Git进行多人协作开发](https://juejin.im/post/5ecb6b41f265da770d3dae6e)、[廖雪峰：多人协作](https://www.liaoxuefeng.com/wiki/896043488029600/900375748016320)、[vscode 本地分支合并远程分支，远程分支合并到本地分支](https://blog.csdn.net/qq_41732963/article/details/119942560)、[开发中关于Git那些事
](https://www.cnblogs.com/chao8888/p/7803732.html#4-%E5%88%86%E6%94%AF%E7%AE%A1%E7%90%86)
[Git--多人协作开发](https://blog.csdn.net/m0_61560468/article/details/131624036)

[Git操作详解以及在VScode中的使用](https://blog.csdn.net/qq_42688495/article/details/109538723)

