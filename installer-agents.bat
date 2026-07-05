@echo off
chcp 65001 >nul
title Installation de l'armee d'agents - Ebrange Creation Digital
echo ==================================================
echo   Armee d'agents - Ebrange Creation Digital
echo   Installation sur ce PC
echo ==================================================
echo.

REM --- 1/3 : mettre a jour le depot si possible -----------------
where git >nul 2>nul
if errorlevel 1 (
    echo [1/3] Git n'est pas installe : etape de mise a jour ignoree.
) else (
    if exist "%~dp0.git" (
        echo [1/3] Mise a jour du depot depuis GitHub...
        git -C "%~dp0." pull origin main
    ) else (
        echo [1/3] Ce dossier n'est pas relie a git : etape ignoree.
    )
)
echo.

REM --- 2/3 : installer les agents pour tout l'ordinateur --------
echo [2/3] Installation des agents dans %USERPROFILE%\.claude\agents ...
if not exist "%USERPROFILE%\.claude\agents" mkdir "%USERPROFILE%\.claude\agents"
xcopy /Y /I "%~dp0.claude\agents\*.md" "%USERPROFILE%\.claude\agents\" >nul
if errorlevel 1 (
    echo        ERREUR : la copie a echoue. Verifiez que le dossier .claude\agents existe ici.
    pause
    exit /b 1
)
echo        16 agents installes : chef-de-projet, cartographe et les 14 specialistes.
echo        Ils sont maintenant disponibles dans TOUS vos dossiers.
echo.

REM --- 3/3 : verifier que Claude Code est installe ---------------
where claude >nul 2>nul
if errorlevel 1 (
    echo [3/3] ATTENTION : Claude Code n'est pas encore installe sur ce PC.
    echo        Pour l'installer :
    echo          1. Installez Node.js : https://nodejs.org
    echo          2. Ouvrez PowerShell et tapez :
    echo             npm install -g @anthropic-ai/claude-code
    echo        Aucun autre plugin n'est necessaire : les agents utilisent
    echo        uniquement les outils integres de Claude Code.
) else (
    echo [3/3] Claude Code est installe : tout est pret, aucun plugin supplementaire requis.
)
echo.
echo ==================================================
echo   Termine !
echo   Ouvrez un terminal dans n'importe quel dossier,
echo   tapez : claude
echo   puis parlez au chef-de-projet ou au cartographe.
echo   (verification possible avec la commande /agents)
echo ==================================================
echo.
pause
