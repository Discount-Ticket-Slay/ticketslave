@echo off

:: Prompt for service to push
set /p SERVICE="Enter the service to push (e.g., buyticketapp): "

:: Check if service directory exists
if not exist "%SERVICE%\" (
    echo Error: The directory '%SERVICE%' does not exist.
    exit /b 1
)

:: Change directory to service
cd %SERVICE%

:: Prompt for version number
set /p VERSION="Enter the version number (e.g., 1.1): "

:: Build the Docker image
docker build -t "%SERVICE%:%VERSION%" .

:: Load .env file
for /f "delims=" %%i in (.env) do set "%%i"

:: Authenticate Docker with ECR
for /f "delims=" %%i in ('aws ecr get-login-password --region ap-southeast-1') do set ECR_PASSWORD=%%i
echo|set /p="%ECR_PASSWORD%" | docker login --username AWS --password-stdin %ECR_REPO_URL%

:: Tag the image
set LOCAL_IMAGE_NAME=%SERVICE%
docker tag "%LOCAL_IMAGE_NAME%:%VERSION%" "%ECR_REPO_URL%%SERVICE%:%VERSION%"

:: Push the image to ECR
docker push "%ECR_REPO_URL%%SERVICE%:%VERSION%"

:: Clean up (clear the password for security)
set ECR_PASSWORD=