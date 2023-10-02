@echo off
setlocal

:: Prompt the user for a version of the image
set /p version="Please enter the version of the image: "

:: Build frontend
cd ..\frontend && npm run build && cd ..\backend

:: Attempt to run docker-compose down (errors are ignored)
docker-compose down || echo Failed to bring down containers, but continuing...

:: Remove the previous image
docker rmi "backend:%version%" || echo Failed to remove image backend:%version%, but continuing...

:: Run docker-compose up
docker-compose up

endlocal
