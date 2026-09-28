/* ============================================================
   个人主页 · 交互脚本
   技术栈：原生脚本语言（零依赖）
   架构：每个功能用"立即执行函数"独立封装，全局零泄漏，互不干扰

   【编号映射】搜索超文本里的编号，到本文件也能定位对应脚本
     1  = 顶部导航栏相关（主题切换 + 滚动高亮）
     2  = 首屏个人简介相关（文字轮播 + 实时时钟）
     0  = 基础设施层（加载动画 + 鼠标粒子画布）
     辅助 = 滚动入场、返回顶部、进度条、3D 倾斜、点击爱心
     独立 = 访客计数

   详细说明见每个功能块上方的大段注释
   ============================================================ */


// === 1. 顶部导航栏：亮/暗主题切换 ===
/* ============================================================
   主题切换脚本（亮/暗模式）
   逻辑说明：
   1. 从浏览器本地存储读取用户上次选择的主题
   2. 没有记录则默认亮色（样式表的 :root 就是亮色）
   3. 点击按钮 → 切换 <html> 上的 data-theme 属性
   4. 样式表通过 [data-theme="dark"] 自动覆盖变量值
   5. 脚本本身不写任何颜色，只管切属性和图标
   ============================================================ */

(function () {
  // 获取主题切换按钮元素
  const toggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;   // 就是 <html> 根元素标签

  // 图标：亮色按钮显示月亮（点了变暗），暗色按钮显示太阳（点了变亮）
  const ICON_DARK = '🌙';   // 亮色模式下显示 → 点击后切到暗色
  const ICON_LIGHT = '☀️';  // 暗色模式下显示 → 点击后切到亮色

  // ---------- 第一步：页面加载时恢复用户上次的主题选择 ----------
  const savedTheme = localStorage.getItem('theme');  // 从浏览器本地存储读取

  if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');   // 在 <html> 上标记暗色
    toggleBtn.textContent = ICON_LIGHT;         // 暗色模式 → 按钮显示太阳图标
  } else {
    // 默认亮色：不需要设置 data-theme（样式表 :root 就是亮色）
    toggleBtn.textContent = ICON_DARK;           // 亮色模式 → 按钮显示月亮图标
  }

  // ---------- 第二步：点击按钮切换主题 ----------
  toggleBtn.addEventListener('click', function () {
    const isDark = root.getAttribute('data-theme') === 'dark';

    if (isDark) {
      // 当前是暗色 → 切到亮色
      root.removeAttribute('data-theme');            // 移除暗色标记
      localStorage.setItem('theme', 'light');         // 存亮色偏好
      toggleBtn.textContent = ICON_DARK;              // 按钮切回月亮
    } else {
      // 当前是亮色 → 切到暗色
      root.setAttribute('data-theme', 'dark');        // 加上暗色标记
      localStorage.setItem('theme', 'dark');          // 存暗色偏好
      toggleBtn.textContent = ICON_LIGHT;             // 按钮切回太阳
    }
  });
})();


// === 辅助：滚动入场动画 ===
/* ============================================================
   滚动入场动画（交叉观察器 IntersectionObserver）
   原理：
   1. 选出所有带 .reveal 类的元素
   2. 创建交叉观察器，监听它们是否进入视口
   3. 进入视口 → 加 .visible 类（样式表负责从下往上滑入）→ 停止观察（只播一次）
   注：threshold:0.15 = 元素露出 15% 时就触发，体验更流畅
   ============================================================ */
(function () {
  var reveals = document.querySelectorAll('.reveal');  // 选出所有需要入场动画的元素
  // 创建交叉观察器：监听元素与视口交叉
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {             // 元素进入视口了
        entry.target.classList.add('visible');  // 加上可见类，触发样式表动画
        observer.unobserve(entry.target);        // 停止观察，动画只播一次
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(function (el) { observer.observe(el); });  // 逐个开始观察
})();


// === 辅助：技能进度条动画（预留，当前页面无此元素） ===
/* ============================================================
   技能进度条动画（滚动到技能卡时从 0 填充到目标值）
   原理：
   1. 页面加载时先把所有 .skill-bar-fill 的宽度设为 0（隐藏）
   2. 当技能卡 .skill-card 进入视口 → 下一帧恢复为样式变量 --bar-width
   3. 样式表的过渡动画会让这个变化呈现为进度条填充
   注：当前页面没有 .skill-bar-fill / .skill-card，此段保留供后续扩展
   ============================================================ */
(function () {
  // 第一步：先把所有进度条隐藏（宽度设为 0）
  document.querySelectorAll('.skill-bar-fill').forEach(function (bar) {
    bar.style.width = '0';
  });

  // 第二步：观察技能卡，进入视口时播放填充动画
  var skillBars = document.querySelectorAll('.skill-card');
  var barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // 找到这张卡内的进度条
        var fill = entry.target.querySelector('.skill-bar-fill');
        if (fill) {
          // 下一帧再赋值，触发样式表过渡动画
          requestAnimationFrame(function () {
            fill.style.width = '';  // 清空内联样式，让样式变量 --bar-width 生效
          });
        }
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(function (el) { barObserver.observe(el); });
})();


// === 辅助：返回顶部按钮 ===
/* ============================================================
   返回顶部悬浮按钮
   滚动超过 300px → 渐显；点击 → 平滑回顶
   ============================================================ */
(function () {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;

  // 监听页面滚动事件，决定显示/隐藏
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      btn.classList.add('show');     // 滚动超过 300px → 显示
    } else {
      btn.classList.remove('show');  // 回到顶部 → 隐藏
    }
  }, { passive: true });  // passive: true 提升滚动性能

  // 点击按钮平滑回到顶部
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// === 1. 顶部导航栏：当前区块滚动高亮 ===
/* ============================================================
   导航栏当前区块滚动高亮
   用滚动位置 + 区块顶部偏移计算：哪个区块最接近屏幕上方 120px
   ============================================================ */
(function () {
  // 选出所有导航锚点链接
  var navLinks = document.querySelectorAll('nav[aria-label="主导航"] a[href^="#"]');
  var sections = [];

  // 把每个锚点链接和对应的区块关联起来
  navLinks.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);  // 去掉 # 号，拿到区块 id
    var sec = document.getElementById(id);
    if (sec) sections.push({ link: a, section: sec });
  });

  if (sections.length === 0) return;

  // 更新哪个导航项高亮
  function updateActive() {
    var scrollY = window.scrollY + 120;  // 加 120px 偏移量，提前高亮
    var current = sections[0];
    sections.forEach(function (item) {
      if (item.section.offsetTop <= scrollY) current = item;
    });
    navLinks.forEach(function (a) { a.classList.remove('active-link'); });  // 先全部清除
    if (current) current.link.classList.add('active-link');                 // 再加当前
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  window.addEventListener('load', updateActive);
})();


// === 辅助：顶部滚动进度条 ===
/* ============================================================
   顶部滚动进度条
   宽度 = 已滚动距离 / (文档总高 - 视口高) × 100%
   ============================================================ */
(function () {
  var bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  function update() {
    var docH = document.documentElement.scrollHeight - window.innerHeight;  // 可滚动总高度
    var pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;                  // 已滚动百分比
    bar.style.width = pct.toFixed(2) + '%';  // 保留两位小数，让过渡更丝滑
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);  // 窗口尺寸变化时也更新
  update();
})();


// === 2. 首屏区内：文字轮播（走马灯） ===
/* ============================================================
   首屏文字轮播（从左滑入 → 停 3 秒 → 滑出 → 换句）
   ↓↓↓ 改下面 phrases 数组里的文字就能换轮播内容 ↓↓↓
   ============================================================ */
(function () {
  var track = document.getElementById('marquee-track');
  if (!track) return;

  // ↓↓↓ 改这里的文字就能换轮播内容 ↓↓↓
  var phrases = [
    '人工智能技术应用学生',
    '大模型开发学习者'
  ];

  // 初始显示第一条
  var idx = 0;
  track.textContent = phrases[0];
  track.classList.add('marquee-in');  // 加上滑入动画类

  // 动画顺序：滑入 → 停 3 秒 → 滑出 → 换句 → 滑入
  function next() {
    // 先加滑出动画
    track.classList.remove('marquee-in');
    track.classList.add('marquee-out');

    // 等滑出结束（0.7 秒），换文字，再滑入
    setTimeout(function () {
      idx = (idx + 1) % phrases.length;  // 循环取索引
      track.textContent = phrases[idx];
      track.classList.remove('marquee-out');
      track.classList.add('marquee-in');
    }, 700);
  }

  // 首次延迟 3 秒后开始，之后每 3.7 秒一轮（3 秒停留 + 0.7 秒滑出）
  setTimeout(function () {
    next();
    setInterval(next, 3700);
  }, 3000);
})();


// === 独立：访客计数器（浏览器本地存储持久化） ===
/* ============================================================
   访问计数器（用浏览器本地存储持久化）
   每次页面加载 +1，换浏览器/清缓存会重新开始计数
   ============================================================ */
(function () {
  var el = document.getElementById('visitor-num');
  if (!el) return;

  var key = 'p1_lesson03_visitor_count';       // 本地存储的键名
  var count = parseInt(localStorage.getItem(key) || '0', 10);  // 读取旧值，没有就从 0 开始
  count++;                                      // 本次访问 +1
  localStorage.setItem(key, String(count));     // 存回去

  // 数字跳动动画效果：不是瞬间跳到目标值，而是慢慢加上去
  var display = 0;
  var step = Math.max(1, Math.floor(count / 20));  // 每次加多少，越多跳得越快

  function animate() {
    if (display < count) {
      display = Math.min(display + step, count);
      el.textContent = display;
      requestAnimationFrame(animate);  // 用动画帧保证流畅
    }
  }
  animate();
})();


// === 0. 基础设施层：页面加载动画 ===
/* ============================================================
   页面加载动画
   页面加载完成后 1.2 秒淡出加载遮罩
   ============================================================ */
(function () {
  var loader = document.getElementById('page-loader');
  if (!loader) return;

  function hideLoader() {
    loader.classList.add('loader-done');   // 加上淡出类，触发样式过渡
    // 动画结束后彻底从文档里移除这个元素（省内存）
    setTimeout(function () {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 900);
  }

  // 判断页面加载状态，决定何时开始隐藏
  if (document.readyState === 'complete') {
    // 如果所有资源（图片、字体等）已加载完 → 800ms 后隐藏
    setTimeout(hideLoader, 800);
  } else {
    // 否则监听页面加载完成事件 → 等加载完再隐藏
    window.addEventListener('load', function () {
      setTimeout(hideLoader, 800);
    });
    // 保险机制：最多等 3 秒也自动消失，防止卡死在加载画面
    setTimeout(hideLoader, 3000);
  }
})();


// === 0. 基础设施层：鼠标粒子拖尾画布 ===
/* ============================================================
   鼠标跟随粒子拖尾（用画布 Canvas 绘制）
   原理：
   1. 监听鼠标移动事件，记录鼠标轨迹点（环形数组，最多 18 个）
   2. 每一帧把轨迹点连成一条渐变彩色线条（6 种颜色交替）
   3. 鼠标停住 1.5 秒后自动淡出，粒子慢慢散去
   注：触屏设备不启用（性能考虑）
   ============================================================ */
(function () {
  var canvas = document.getElementById('particle-canvas');  // 拿到画布元素
  if (!canvas) return;
  var ctx = canvas.getContext('2d');  // 拿到 2D 绘图上下文

  // 调整画布分辨率（适配高分屏，否则会糊）
  function resize() {
    var dpr = window.devicePixelRatio || 1;  // 设备像素比
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);  // 缩放绘图上下文
  }
  resize();
  window.addEventListener('resize', resize);  // 窗口尺寸变化时重调

  // 轨迹点数组（环形队列）
  var points = [];
  var MAX = 18;              // 最多记录多少个轨迹点
  var mouseActive = false;   // 鼠标是否还在移动
  var idleTimer = null;      // 空闲定时器

  // 根据当前主题选粒子颜色（6 色柔和渐变）
  function getColor(index) {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var colors = isDark
      ? ['#63b3ed', '#9f7aea', '#4fd1c5', '#f6ad55', '#f687b3', '#68d391']  // 暗色主题色
      : ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];  // 亮色主题色
    return colors[index % colors.length];
  }

  // 动画主循环（空闲时暂停，省电）
  var rafId = null;
  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);  // 清空整屏

    // 没有轨迹点了 → 停掉动画帧（等下一次鼠标移动再重启）
    if (points.length === 0) {
      rafId = null;
      return;
    }

    // 把所有轨迹点连成彩色线条
    for (var i = 1; i < points.length; i++) {
      var prev = points[i - 1];
      var curr = points[i];
      var alpha = i / points.length;       // 越新的点越亮
      var colorIdx = i % 6;

      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(curr.x, curr.y);
      ctx.strokeStyle = getColor(colorIdx);
      ctx.globalAlpha = alpha * 0.75;
      ctx.lineWidth = 2 + alpha * 2.5;     // 越新的线越粗
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // 在最新点画一个发光小圆
      if (i === points.length - 1) {
        // 实心小圆点
        ctx.beginPath();
        ctx.arc(curr.x, curr.y, 4 + alpha * 4, 0, Math.PI * 2);
        ctx.fillStyle = getColor(colorIdx);
        ctx.globalAlpha = alpha;
        ctx.fill();

        // 外层光晕（径向渐变）
        ctx.beginPath();
        ctx.arc(curr.x, curr.y, 10 + alpha * 6, 0, Math.PI * 2);
        var grd = ctx.createRadialGradient(curr.x, curr.y, 2, curr.x, curr.y, 16);
        grd.addColorStop(0, getColor(colorIdx));
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.globalAlpha = alpha * 0.4;
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;  // 恢复透明度，不影响后续绘制

    // 鼠标停住时：自动慢慢散去轨迹点
    if (!mouseActive && points.length > 0) {
      points.shift();
    }

    rafId = requestAnimationFrame(draw);  // 继续下一帧
  }

  // 监听鼠标移动事件 → 启动动画
  window.addEventListener('mousemove', function (e) {
    // 触屏设备不启用（性能考虑）
    if ('ontouchstart' in window) return;

    mouseActive = true;
    points.push({ x: e.clientX, y: e.clientY, t: Date.now() });  // 记录新点
    if (points.length > MAX) points.shift();                       // 超出上限 → 淘汰最旧的

    // 停住 1.5 秒后开始淡出
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { mouseActive = false; }, 1500);

    // 第一次触发或已空闲时 → 重启动画帧
    if (!rafId) rafId = requestAnimationFrame(draw);
  });
})();


// === 辅助：卡片 3D 倾斜 ===
/* ============================================================
   卡片 3D 倾斜效果
   鼠标在卡片上移动 → 根据相对位置计算倾斜角度
   只对 .work-card / .project-card / .skill-col 生效
   注：触屏设备不启用（没意义 + 避免触摸时卡顿）
   ============================================================ */
(function () {
  // 触屏设备不启用
  if ('ontouchstart' in window) return;

  var cards = document.querySelectorAll('.work-card, .project-card, .skill-col');
  if (cards.length === 0) return;

  cards.forEach(function (card) {
    // 鼠标在卡片上移动 → 实时计算倾斜角度
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();  // 拿到卡片在屏幕上的位置
      var x = e.clientX - rect.left;             // 鼠标在卡片内的 X 坐标
      var y = e.clientY - rect.top;              // 鼠标在卡片内的 Y 坐标
      var cx = rect.width / 2;                   // 卡片中心 X
      var cy = rect.height / 2;                  // 卡片中心 Y

      // 归一化到 -1 ~ 1 范围（鼠标在中心时是 0）
      var nx = (x - cx) / cx;
      var ny = (y - cy) / cy;

      // 最大倾斜角度 8 度
      var rx = -ny * 8;
      var ry = nx * 8;

      // 用透视变换实现 3D 倾斜
      card.style.transform =
        'perspective(600px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateZ(4px)';

      // 高光效果：记录鼠标相对位置，供样式表后续使用
      card.style.setProperty('--mx', (x / rect.width * 100).toFixed(1) + '%');
      card.style.setProperty('--my', (y / rect.height * 100).toFixed(1) + '%');
    });

    // 鼠标离开卡片 → 恢复平直
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();


// === 2. 首屏区内：实时时钟 ===
/* ============================================================
   首屏实时时钟
   每秒更新一次，显示 日期 + 时分秒 + 星期几
   ============================================================ */
(function () {
  var dateEl = document.getElementById('clock-date');
  var timeEl = document.getElementById('clock-time');
  if (!dateEl || !timeEl) return;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }  // 补零函数：1 → 01
  var weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  function tick() {
    var now = new Date();
    // 日期部分：2026年09月28日 周一
    dateEl.textContent = now.getFullYear() + '年' +
      pad(now.getMonth() + 1) + '月' + pad(now.getDate()) + '日 ' +
      weekdays[now.getDay()];
    // 时间部分：14:30:59
    timeEl.textContent = pad(now.getHours()) + ':' +
      pad(now.getMinutes()) + ':' + pad(now.getSeconds());
  }
  tick();                                // 页面加载时立刻显示一次
  setInterval(tick, 1000);               // 之后每秒更新
})();


// === 辅助：点击爱心爆发彩蛋 ===
/* ============================================================
   点击爱心爆发彩蛋
   每次点击非按钮/链接区域 → 随机飞出 3-5 个爱心/星星/✨
   ============================================================ */
(function () {
  var emojis = ['💖', '✨', '⭐', '🎉', '🌈', '💫', '🎈'];  // 随机选的表情池

  document.addEventListener('click', function (e) {
    // 不影响按钮/链接正常点击功能
    var tag = e.target.tagName;
    if (tag === 'BUTTON' || tag === 'A') return;

    var count = 3 + Math.floor(Math.random() * 3);  // 每次随机飞 3~5 个
    for (var i = 0; i < count; i++) {
      var span = document.createElement('span');        // 创建一个空元素
      span.className = 'click-heart';                   // 加样式类（飞散动画）
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];  // 随机表情
      span.style.left = e.clientX + 'px';               // 起始位置 = 鼠标点击点
      span.style.top = e.clientY + 'px';

      // 随机散开方向（向上偏移一点，视觉更好看）
      var angle = Math.random() * Math.PI * 2;          // 随机角度 0~360°
      var dist = 50 + Math.random() * 80;               // 随机飞出距离 50~130px
      span.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      span.style.setProperty('--ty', Math.sin(angle) * dist - 60 + 'px');  // 稍微往上飞

      document.body.appendChild(span);                  // 加到页面上
      // 1.3 秒后从文档里移除（清理内存）
      setTimeout(function (el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 1300, span);
    }
  });
})();
