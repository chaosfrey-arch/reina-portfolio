@echo off
chcp 65001 >nul
echo.
echo  [Reina Portfolio] 正在推送更新...
echo  ─────────────────────────────────────

cd /d "%~dp0"

:: 时间戳作为 commit 信息
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set DATE=%%a/%%b/%%c
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set TIME=%%a:%%b
set MSG=update: %DATE% %TIME%

:: Git 提交推送
git add -A
git commit -m "%MSG%"
git push

:: Cloudflare Pages 直接部署（不依赖 Git 集成）
echo.
echo  正在部署到 Cloudflare Pages...
set CLOUDFLARE_API_TOKEN=jxaqYeuIAx3s12ScotG7Mxiv0cjhH3yrmDi-csvfIk8.gBS_VETt91qSDW7jhnr4Bj8VstL001ogswhIseI7TXM
npx wrangler pages deploy . --project-name reina-portfolio --branch main

echo.
echo  ✓ 完成！约 10 秒后访问 https://reina-portfolio.pages.dev
echo.
pause
