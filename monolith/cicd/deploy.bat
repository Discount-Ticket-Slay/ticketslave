@echo off
setlocal enabledelayedexpansion

:: Prompt for service to deploy
set /p SERVICE=Enter the service to deploy (e.g., buyticketapp): 

:: Prompt for version number
set /p VERSION=Enter the version number (e.g., 1.1): 

:: Load .env file
for /f "tokens=1* delims== " %%i in (.env) do (
    set "temp=%%j"
    set "temp=!temp:"=!"
    set "%%i=!temp!"
)

:: Export the container URL as a Terraform variable
set TF_VAR_image_version=%VERSION%
set TF_VAR_ecr_repo_url=%ECR_REPO_URL%%SERVICE%

:: Export the database information to AWS as a Terraform variable
set TF_VAR_my_sql_root_password=%MYSQL_ROOT_PASSWORD%
set TF_VAR_my_sql_database=%MYSQL_DATABASE%
set TF_VAR_spring_datasource_url=%SPRING_DATASOURCE_URL%
set TF_VAR_spring_datasource_username=%SPRING_DATASOURCE_USERNAME%
set TF_VAR_spring_datasource_password=%SPRING_DATASOURCE_PASSWORD%

:: Export the AWS credentials as Terraform variables
set TF_VAR_aws_account_id=%AWS_ACCOUNT_ID%
set TF_VAR_aws_access_key_id=%AWS_ACCESS_KEY_ID%
set TF_VAR_aws_secret_access_key=%AWS_SECRET_ACCESS_KEY%

:: Export the Google credentials as Terraform variables
set TF_VAR_google_client_id=%GOOGLE_CLIENT_ID%
set TF_VAR_google_client_secret=%GOOGLE_CLIENT_SECRET%

:: Export AWS Certificate Manager ARN as Terraform variable
set TF_VAR_aws_certificate_arn=%AWS_CERTIFICATE_ARN%

:: Echo the image version for validation (tmp debugging tool)
echo Using image version: %TF_VAR_image_version%
echo Using ECR repo URL: %TF_VAR_ecr_repo_url%

:: Initialize Terraform (downloads providers and modules, etc.)
terraform init

:: Apply Terraform changes
terraform apply

:: Optionally: Unset the image version environment variable for security
set TF_VAR_image_version=

endlocal