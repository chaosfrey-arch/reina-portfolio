@echo off
chcp 65001 >nul
echo.
echo  [Reina Portfolio] 正在推送更新...
echo  ─────────────────────────────────────

cd /d "%~dp0"

:: 检查是否有改动
git diff --quiet --cached && git diff --quiet
if %errorlevel% == 0 (
  echo  没有检测到文件改动，无需更新。
  pause
  exit /b
)

:: 自动用当前时间作为 commit 信息
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set DATE=%%a/%%b/%%c
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set TIME=%%a:%%b

set MSG=update: %DATE% %TIME%

git add -A
git commit -m "%MSG%"
git push

echo.
echo  ✓ 已推送！Cloudflare Pages 正在自动部署...
echo  ✓ 约 30 秒后访问 https://reina-portfolio.pages.dev 查看效果
echo.
pause
