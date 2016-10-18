f:
cd F:\MyTsdFiles\tsXL
rd e:\gz /s/q 
rem rm -r e:\gz
md e:\gz
 
node r.js -o build.js
 
copy gzout\*.js e:\gz\ /y

cd xml
1.bat

cd F:\MyTsdFiles\tsXL\build.bat