f:
cd F:\MyTsdFiles\tsXL
rem rm -r e:\gz
rd /s /q e:\gz
mkdir  e:\gz\lib\css



f:
cd F:\MyTsdFiles\tsXL
 
rem node r.js -o build.js
 
copy gz\*.js e:\gz\ /y
copy gz\lib\*.js e:\gz\lib\ /y
copy gz\lib\css\*.css e:\gz\lib\css\ /y
del e:\gz\1.js 
del e:\gz\2.js 
del e:\gz\*test*.js 
del e:\gz\lib\*test*.js

xcopy e:\gz  D:\work\公众国际业务操作系统\GongZhong\js\gz /s/e/y
