@echo off
set /p version="Please enter the version of the image: "

docker-compose down
if errorlevel 1 echo Failed to bring down containers, but continuing...

docker rmi "backend:%version%"
if errorlevel 1 echo Failed to remove image backend:%version%, but continuing...

docker-compose up