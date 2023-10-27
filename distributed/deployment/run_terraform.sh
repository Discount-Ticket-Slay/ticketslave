#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Map environment variables to Terraform variables
export TF_VAR_image_version=$image_version
export TF_VAR_ecr_repo_url=$ecr_repo_url
export TF_VAR_my_sql_root_password=$my_sql_root_password
export TF_VAR_my_sql_database=$my_sql_database
export TF_VAR_spring_datasource_username=$spring_datasource_username
export TF_VAR_spring_datasource_password=$spring_datasource_password
export TF_VAR_aws_account_id=$aws_account_id
export TF_VAR_google_client_id=$google_client_id
export TF_VAR_google_client_secret=$google_client_secret
export TF_VAR_aws_certificate_arn=$aws_certificate_arn

# Run Terraform commands
terraform init
terraform plan

# Unset exported variables
unset TF_VAR_image_version
unset TF_VAR_ecr_repo_url
unset TF_VAR_my_sql_root_password
unset TF_VAR_my_sql_database
unset TF_VAR_spring_datasource_username
unset TF_VAR_spring_datasource_password
unset TF_VAR_aws_account_id
unset TF_VAR_google_client_id
unset TF_VAR_google_client_secret
unset TF_VAR_aws_certificate_arn