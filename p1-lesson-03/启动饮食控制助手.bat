@echo off
chcp 65001 >nul
echo ============================================
echo   正在启动本地网页服务器...
echo   浏览器将自动打开 饮食控制助手
echo   关闭此窗口即可停止服务器
echo ============================================
start "" http://127.0.0.1:9001/diet-control/index.html
python -m http.server 9001 --bind 127.0.0.1
pause
