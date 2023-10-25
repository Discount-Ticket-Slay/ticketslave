@echo off
setlocal

:: Prompt the user for a version of the image
set /p version="Please enter the version of the image: "

:: Build frontend
cd ..\frontend && npm run build && cd ..\backend && (docker-compose down || echo "Failed to bring down containers, but continuing...") && (docker rmi "backend:%version%" || echo "Failed to remove image backend:%version%, but continuing...") && docker-compose up


:: Attempt to run docker-compose down (errors are ignored)
@REM docker-compose down || echo "Failed to bring down containers, but continuing..."

:: Remove the previous image
@REM docker rmi "backend:%version%" || echo "Failed to remove image backend:%version%, but continuing..."

:: Run docker-compose up
@REM docker-compose up

endlocal
