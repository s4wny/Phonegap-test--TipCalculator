@echo off
rem download zip.exe from http://gnuwin32.sourceforge.net/packages/zip.htm

del package.zip
"C:\Program Files (x86)\GnuWin32\bin\zip" -r package.zip * --exclude .htaccess description.txt web.config TipCalculator.sln TipCalculator.dxjsproj TipCalculator.v11.suo bin/* %~nx0