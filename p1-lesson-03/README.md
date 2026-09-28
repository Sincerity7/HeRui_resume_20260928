# 项目 1 · 第 3 课课堂操作手册

## Trae IDE、双入口、3×45 分钟完成开发与上线

本手册供教师投屏带做，也供学生缺课补做。一次课共 3 个课时，每课时 45 分钟，总计 135 分钟。最后一个 45 分钟内，教师讲解和演示最多 15 分钟，至少留 30 分钟给学生完成、推送、部署和交作业。

本课效果参考：https://ffd-p1-web-v2-20260918.netlify.app/lesson-03/

课程模板仓库：https://github.com/02-gdit-ffd-20260818/ffd-student-course-kit

第 3 课固定分支：`p1-l03-standalone-v3.0`

## 一、课堂最终成果

下课前每位学生交付：

1. 第 3 课 Git 提交编号。
2. 第 3 课 GitHub 仓库地址。
3. 第 3 课 GitHub Pages 地址。
4. 一句话解释媒体查询怎样让手机端变成一列。

本课只完成两个功能：

- 桌面端作品卡片显示为两列。
- 手机端作品卡片显示为一列，并增加轻微悬停反馈。

## 二、统一软件与窗口

课堂统一使用：

- Trae IDE：编辑 HTML 和 CSS，使用 Trae 内置终端。
- Windows CMD：仅在 Trae 尚未打开时执行首次克隆。
- Chrome 或 Edge：运行和检查网页。
- GitHub：保存远程仓库并部署 Pages。

学生桌面最终只保留三个主要窗口：

1. Trae IDE。
2. 浏览器中的本地网页。
3. 浏览器中的 GitHub 仓库。

不要求同时使用 VS Code，不要求同时打开 CMD 和 PowerShell，也不要求使用两个终端。

## 三、3×45 分钟课堂安排

| 课时 | 时间 | 课堂控制 | 主要任务 | 本课时结果 |
|---|---:|---|---|---|
| 第 1 个 45 分钟 | 0–20 分钟 | 教师主导 | 展示成果、选择路线、演示克隆和 Trae | 学生看懂从哪里开始 |
| 第 1 个 45 分钟 | 20–45 分钟 | 学生操作 | 选择路线、克隆工程、Trae 打开、本地运行 | 本地起点可用 |
| 第 2 个 45 分钟 | 0–15 分钟 | 教师主导 | 讲解 Grid、媒体查询和 5 个 TODO | 学生看懂本课代码 |
| 第 2 个 45 分钟 | 15–25 分钟 | 学生操作 | 建立本课仓库、首次推送并开启 Pages | 远程起点可用 |
| 第 2 个 45 分钟 | 25–42 分钟 | 学生操作 | 完成任务 A、任务 B并不断刷新检查 | 桌面两列、手机一列 |
| 第 2 个 45 分钟 | 42–45 分钟 | 教师检查 | 快速检查页面和共性问题 | 大部分学生完成开发 |
| 第 3 个 45 分钟 | 0–15 分钟 | 教师主导，最多 15 分钟 | 复盘验收标准，演示 status、diff、commit、push 和 Pages | 学生明确最后交付步骤 |
| 第 3 个 45 分钟 | 15–30 分钟 | 学生操作 | 补完代码、浏览器验收、解决故障 | 页面通过检查 |
| 第 3 个 45 分钟 | 30–38 分钟 | 学生操作 | commit、push | 获得提交编号 |
| 第 3 个 45 分钟 | 38–45 分钟 | 学生操作 | 检查 Pages、提交作业 | 获得线上网址并完成交付 |

第三个课时到第 15 分钟时，教师必须停止继续增加知识点，转为巡视、答疑和验收。

# 第一课时：选择起点并建立工程

## 第 1 步：展示成果

教师打开完成效果：

https://ffd-p1-web-v2-20260918.netlify.app/lesson-03/

只演示三件事：

1. 桌面宽度下，四个作品显示为两列。
2. 手机宽度下，作品变成一列。
3. 鼠标移到卡片上，卡片轻微上移。

教师口令：

> 今天不重做整个主页。下课前每人完成 5 行 CSS 修改、一次 Git 提交和一个可访问的 Pages 网址。

## 第 2 步：选择启动路线

### 路线 A：继续自己的上次作品

适合已经完成第 2 课，希望保留自己姓名、照片、配色和内容的学生。

第 3 课使用新的本地目录和新的 GitHub 仓库。不要把第 3 课推回第 2 课仓库。

### 路线 B：使用教师第 3 课模板

适合：

- 前两次缺课。
- 没有个人项目。
- 找不到上次仓库。
- 上次工程损坏。
- 希望使用统一起点。

教师口令：

> 有正常第 2 课仓库的走路线 A；没有的直接走路线 B。缺课学生不需要先补前两课。

## 第 3 步：下载并用 Trae 打开

教师重点演示路线 B；路线 A 的学生按照本手册对应命令操作。

### 路线 A：克隆自己的第 2 课仓库

打开 CMD：

```bat
mkdir "%USERPROFILE%\Desktop\web-work"
cd /d "%USERPROFILE%\Desktop\web-work"
git clone https://github.com/你的用户名/p1-lesson-02-学号.git p1-lesson-03
cd /d "%USERPROFILE%\Desktop\web-work\p1-lesson-03"
git remote rename origin previous
git branch -M main
```

命令解释：

- `git clone`：复制学生自己的第 2 课代码和提交历史。
- 最后的 `p1-lesson-03`：建立新的第 3 课目录。
- `previous`：保留第 2 课仓库来源，防止误推送。
- `git branch -M main`：把本课开发分支统一为 `main`。

路线 A 还要领取教师提供的本课任务文件：

```bat
git remote add course https://github.com/02-gdit-ffd-20260818/ffd-student-course-kit.git
git fetch course p1-l03-standalone-v3.0
git checkout course/p1-l03-standalone-v3.0 -- lesson-03-task.css
```

打开 `index.html`，确认 `styles.css` 后面有：

```html
<link href="lesson-03-task.css" rel="stylesheet">
```

没有时只新增这一行。

### 路线 B：克隆教师完整模板

```bat
mkdir "%USERPROFILE%\Desktop\web-work"
cd /d "%USERPROFILE%\Desktop\web-work"
git clone --branch p1-l03-standalone-v3.0 --single-branch https://github.com/02-gdit-ffd-20260818/ffd-student-course-kit.git p1-lesson-03
cd /d "%USERPROFILE%\Desktop\web-work\p1-lesson-03"
git remote rename origin course
git branch -M main
```

路线 B 已经包含 `lesson-03-task.css` 和 HTML 引用，不需要复制其他文件。

### 使用 Trae IDE 打开

1. 打开 Trae IDE。
2. 点击“打开文件夹”或“Open Folder”。
3. 选择：

```text
C:\Users\当前用户名\Desktop\web-work\p1-lesson-03
```

4. 确认 Trae 左侧文件区能看到：

```text
index.html
styles.css
lesson-03-task.css
assets
```

5. 在 Trae 顶部菜单打开“终端”，后续 Git 命令都在这个内置终端执行。

如果电脑已经注册 Trae 命令行，也可以尝试在工程目录运行 `trae .`；课堂不依赖这个命令，找不到命令时直接用“打开文件夹”。

## 第 4 步：本地运行

最简单方式：

1. 在文件资源管理器中进入 `p1-lesson-03`。
2. 双击 `index.html`。
3. 修改后在 Trae 按 `Ctrl+S`。
4. 回到浏览器按 `Ctrl+R`。

可选本地服务，在 Trae 内置终端运行：

```text
npx live-server --port=7000 --host=0.0.0.0
```

然后打开：

```text
http://127.0.0.1:7000/
```

停止服务按 `Ctrl+C`。

# 第二课时：学习并完成响应式开发

## 第 5 步：教师演示 5 个 TODO

在 Trae 中打开 `lesson-03-task.css`，按 `Ctrl+F` 搜索 `TODO`。

教师上课前应同时打开教学资源包中的答案文件：

```text
教师答案/lesson-03/README.md
教师答案/lesson-03/lesson-03-task.css
```

第一份文件用于逐行照着讲，第二份文件是完整可运行答案。即使现场改错，也可以直接复制完整答案恢复。

### TODO A1

```css
display: grid;
```

### TODO A2

```css
grid-template-columns: repeat(2, minmax(0, 1fr));
```

### TODO B1

```css
transition: transform 180ms ease, box-shadow 180ms ease;
```

### TODO B2

```css
transform: translateY(-4px);
```

### TODO B3

在 `@media (max-width: 640px)` 内改成：

```css
grid-template-columns: 1fr;
```

教师按下面的顺序逐项解释，不能只念代码：

| 写法 | 拆开解释 | 学生应看到的结果 |
|---|---|---|
| `display: grid` | `display` 决定内部排列方式；`grid` 启用网格布局。没有这一行，后面的网格列数不生效 | 列布局开始生效 |
| `repeat(2, X)` | `repeat` 是重复；数字 `2` 表示把 `X` 重复两次，也就是建立两列 | 每行最多两张卡片 |
| `fr` | `fr` 是 fraction（份额）的缩写，用于分配容器剩余空间 | 宽度随容器变化，不是固定像素 |
| `1fr` | 表示占 1 份剩余宽度；两个 `1fr` 就是两列各占一份，因此等宽 | 两列各约占一半 |
| `minmax(0, 1fr)` | 列最小可缩到 `0`，最大占 `1` 份，避免长内容把网格撑出横向滚动条 | 卡片能随页面收缩 |
| `gap: 30px` | `gap` 是网格项目之间的空隙；`30px` 表示 30 个 CSS 像素 | 两张卡片之间留出空白 |
| `@media (max-width: 640px)` | 浏览器可视区域宽度不超过 640px 时执行大括号内规则；它是小屏条件，不是说所有手机都正好 640px | 缩窄浏览器后触发手机布局 |
| 手机规则中的 `1fr` | `grid-template-columns` 后只写一个宽度值，所以网格只有一列；这一列占全部可用宽度 | 每行只显示一张卡片 |
| `translateY(-4px)` | `translateY` 沿垂直 Y 轴移动；负数向上；`4px` 是 4 个 CSS 像素；只改变视觉位置，不挤动周围元素 | 卡片向上轻移 |
| `180ms` | `ms` 是毫秒，180ms 等于 0.18 秒 | 动画短而清晰 |
| `ease` | 过渡的速度曲线，开始与结束较慢，中间较快 | 移入、移出不突然 |

## 第 6 步：教师说明提交与部署闭环

教师只展示命令顺序：

```text
git status
git diff
git add index.html lesson-03-task.css
git commit -m "完成第3课响应式作品布局"
git push
```

然后告诉学生：

> 现在开始学生操作。先建立本课仓库并开启 Pages，再开发。这样最后一次 push 后只需等待网页自动更新。

## 第 7 步：建立本课 GitHub 仓库

在 GitHub 点击：

```text
右上角 + → New repository
```

仓库名：

```text
p1-lesson-03-学号
```

设置：

- 选择 `Public`。
- 不勾选 README。
- 不添加 .gitignore。
- 不选择 License。

在 Trae 内置终端连接本课仓库：

```text
git remote add origin https://github.com/你的用户名/p1-lesson-03-学号.git
git remote -v
git push -u origin main
```

路线 A 应看到：

```text
previous → 学生第2课仓库
course   → 教师模板仓库
origin   → 学生第3课新仓库
```

路线 B 应看到：

```text
course → 教师模板仓库
origin → 学生第3课新仓库
```

## 第 8 步：提前开启 Pages

进入学生自己的第 3 课仓库：

```text
Settings → Pages
```

设置：

```text
Source：Deploy from a branch
Branch：main
Folder：/(root)
```

点击 `Save`。Pages 在后台部署时，学生继续完成 CSS，不在这里等待。

## 第 9 步：学生完成开发

在 Trae 打开 `lesson-03-task.css`：

1. 搜索并完成 TODO A1、A2。
2. `Ctrl+S` 保存。
3. 浏览器 `Ctrl+R`，确认桌面端为两列。
4. 搜索并完成 TODO B1、B2、B3。
5. 再次保存和刷新。

完成后的关键代码：

```css
.portfolio-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 30px;
}

.work-card {
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.work-card:hover,
.work-card:focus-within {
  transform: translateY(-4px);
}

@media (max-width: 640px) {
  .portfolio-list {
    grid-template-columns: 1fr;
  }
}
```

# 第三课时：教师短讲不超过 15 分钟，学生完成交付

第三课时前 15 分钟，教师只复盘以下内容：

1. 桌面两列、手机一列的验收标准。
2. `git status` 和 `git diff` 的检查方法。
3. `commit → push → Pages → 交作业` 的顺序。

不再增加新的 HTML、CSS 或 JavaScript 知识点。

## 第 10 步：浏览器验收

浏览器按 `F12`，再按 `Ctrl+Shift+M`。

检查：

- 桌面宽度显示两列。
- 手机宽度显示一列。
- 图片没有变形。
- 页面没有横向滚动条。
- 鼠标移入卡片会轻微上移。
- 四个作品链接可以打开。

教师巡视只问：

> 你现在卡在下载、Trae 编辑、本地效果、Git，还是 Pages？

先判断环节，再处理问题。

## 第 11 步：提交并推送

在 Trae 内置终端运行：

```text
git status
git diff
```

确认主要改动为：

```text
index.html
lesson-03-task.css
```

提交：

```text
git add index.html lesson-03-task.css
git commit -m "完成第3课响应式作品布局"
git push
git log -1 --oneline
```

记录 `git log -1 --oneline` 最前面的提交编号。

## 第 12 步：检查 Pages 并交作业

回到 GitHub：

1. 确认最新提交已经出现。
2. 进入 `Settings → Pages`。
3. 点击实际显示的 `Visit site`。
4. 按 `Ctrl+F5` 强制刷新。
5. 再检查桌面两列和手机一列。

Pages 地址通常形如：

```text
https://你的用户名.github.io/p1-lesson-03-学号/
```

以 GitHub Pages 页面显示的地址为准。

提交作业：

```text
姓名：
学号：
Git提交编号：
GitHub仓库地址：
GitHub Pages地址：
媒体查询解释：
```

# 三、缺课补做：没有个人项目

缺课学生直接执行路线 B：

```text
克隆教师第3课模板
→ Trae打开工程
→ 新建第3课GitHub仓库
→ 首次推送并开启Pages
→ 修改5个TODO
→ commit
→ push
→ 提交Pages网址
```

不要求先补第 1、2 课。以后需要补课时，再分别克隆第 1、2 课独立模板。

# 四、课堂常见故障

## 1. destination path already exists

说明 `p1-lesson-03` 已存在。不要覆盖，改用新目录：

```text
p1-lesson-03-new
```

## 2. fatal: not a git repository

当前终端不在工程目录。CMD：

```bat
cd /d "%USERPROFILE%\Desktop\web-work\p1-lesson-03"
```

## 3. Trae 中看不到任务文件

确认 Trae 打开的是 `p1-lesson-03` 文件夹，不是它的上级 `web-work`，也不是其他课目录。

## 4. 页面没有变化

依次检查：

1. Trae 是否已经按 `Ctrl+S`。
2. `index.html` 是否引用 `lesson-03-task.css`。
3. 浏览器是否按 `Ctrl+F5`。
4. 修改的是否是当前 `p1-lesson-03` 文件。

## 5. git push 没有上游分支

```text
git push -u origin main
```

## 6. Pages 显示 404

检查：

- 仓库是否为 Public。
- Pages 分支是否为 `main`。
- 目录是否为 `/(root)`。
- 根目录是否有 `index.html`。
- GitHub 部署是否仍在运行。

# 五、教师下课前验收

教师只检查六个结果：

1. Trae 打开的是 `p1-lesson-03`。
2. `origin` 指向学生第 3 课仓库。
3. 本地网页可以打开。
4. 桌面两列、手机一列。
5. 有本课 Git 提交编号。
6. 有可访问的 GitHub Pages 地址。

六项完成即表示第 3 课真正落地。

## 命令逐项解释（课堂必须讲清楚）

所有项目统一放在桌面：`C:\Users\当前用户名\Desktop\web-work`。例如用户名是 HUAWEI，实际路径就是 `C:\Users\HUAWEI\Desktop\web-work`。命令使用 `%USERPROFILE%` 或 `$env:USERPROFILE`，可以自动适应不同用户名。

### 建立桌面工作区

CMD：

```bat
mkdir "%USERPROFILE%\Desktop\web-work" 2>nul
cd /d "%USERPROFILE%\Desktop\web-work"
dir
```

PowerShell 或 Trae 终端：

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\Desktop\web-work"
Set-Location "$env:USERPROFILE\Desktop\web-work"
Get-Location
```

| 命令 | 为什么执行 | 成功标志 |
|---|---|---|
| `mkdir` / `New-Item` | 在桌面建立唯一的项目总目录；以后学生知道去哪里找代码 | 桌面出现 `web-work` |
| `2>nul` | CMD 中隐藏“目录已经存在”的多余提示，不会删除已有文件 | 命令继续执行 |
| `cd /d` | CMD 中进入目录；`/d` 允许同时切换盘符 | 提示符末尾为 `Desktop\web-work>` |
| `Set-Location` | PowerShell 中进入目录，与 `cd` 作用相同 | 当前路径改变 |
| `dir` / `Get-Location` | 检查当前文件列表或绝对路径，防止在错误目录执行 Git | 路径包含 `Desktop\web-work` |

### 克隆命令

```bash
git clone --branch 本课分支 --single-branch 仓库网址 本课文件夹
```

- `git clone`：下载代码以及 Git 版本历史。
- `--branch`：指定本课模板分支，防止拿错课次。
- `--single-branch`：只下载该课分支，减少无关内容。
- 最后的文件夹名：规定项目在桌面的保存位置，不覆盖其他课次。

### 统一启动命令

```bash
npx live-server --port=7000 --host=0.0.0.0
```

- `npx`：临时下载并运行工具，不需要在学生项目中保存 `node_modules`。
- `live-server`：把当前文件夹作为静态网站运行，保存代码后通常自动刷新。
- `--port=7000`：六次课统一使用 7000 端口。
- `--host=0.0.0.0`：监听本机网络接口；本机浏览器仍打开 `http://127.0.0.1:7000`。
- 第一次提示安装时输入 `y` 并回车；停止服务时按 `Ctrl+C`。

### Git 提交命令

```bash
git remote -v
git status
git add .
git commit -m "说明本次完成了什么"
git push
```

| 命令 | 含义 |
|---|---|
| `git remote -v` | 检查将要推送到哪个仓库，防止推到教师仓库 |
| `git status` | 查看修改、暂存和未跟踪文件 |
| `git add .` | 把当前项目中的修改加入下一次提交 |
| `git commit -m` | 建立带说明、可回退的本地版本 |
| `git push` | 把本地提交发送到个人远程仓库 |

从教师模板开始的学生先在 GitHub 或 Gitee 建立空仓库，再执行：

```bash
git remote rename origin teacher
git remote add origin <自己的空仓库网址>
git branch -M main
git push -u origin main
```

`rename` 保留教师地址供查看；`add origin` 把默认推送目标改成学生自己的仓库；`-u` 建立后续默认跟踪关系。
## 5 个 TODO 的前后变化与代码解释

1. **A1 `display: grid`**：操作前是 block 单列；grid 启用二维网格；操作后作品开始按网格排列。
2. **A2 `repeat(2, minmax(0, 1fr))`**：`repeat(2,...)` 建两列，`1fr` 平分空间，`minmax(0,1fr)` 防止内容撑破；操作后电脑每行两张卡片。
3. **B1 `transition: transform 180ms ease, box-shadow 180ms ease`**：指定动画属性、时长和速度曲线；操作后悬停变化平滑。
4. **B2 `translateY(-4px)`**：负 Y 值表示向上移动，不影响周围排版；操作后卡片悬停或聚焦时轻微上移。
5. **B3 手机端 `1fr`**：媒体查询只在宽度不超过640px时覆盖桌面规则；操作前手机仍两列，操作后手机单列。

教师每次只改一行，保存并刷新，让学生观察后再解释下一行。

## 零基础 Grid 与响应式术语表

- `fr` 是 fraction（份额）的缩写，用来分配网格容器的剩余空间，不是像素单位。
- `1fr` 是 1 份；`1fr 1fr` 表示两列各占 1 份，所以两列等宽。
- `repeat(2, 1fr)` 与 `1fr 1fr` 含义相同；`2` 是重复次数。
- `minmax(0, 1fr)` 表示一列最小可以缩到 0、最大取得 1 份剩余宽度，可减少长内容导致的横向溢出。
- `@media` 是媒体查询；`max-width: 640px` 表示浏览器可视区域宽度不超过 640px 时应用内部规则。
- `translateY(-4px)` 中，`Y` 是垂直轴，负数向上，`4px` 是移动距离；它不会重新排列周围元素。
- `180ms` 等于 0.18 秒；`transition` 让属性变化在这段时间内逐步完成。
- `:hover` 是鼠标悬停状态；`:focus-within` 是元素自身或其后代获得键盘焦点的状态。

