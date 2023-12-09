#!/bin/bash

# Load environment variables from .env file
cd deployment-code
source .env

# Map environment variables to Terraform variables
export TF_VAR_ecr_repo_url=$ECR_REPO_URL
export TF_VAR_my_sql_root_password=$MYSQL_ROOT_PASSWORD
export TF_VAR_my_sql_database=$MYSQL_DATABASE
export TF_VAR_my_sql_purchase_database=$MYSQL_PURCHASE_DATABASE
export TF_VAR_spring_datasource_username=$SPRING_DATASOURCE_USERNAME
export TF_VAR_spring_datasource_password=$SPRING_DATASOURCE_PASSWORD
export TF_VAR_aws_account_id=$AWS_ACCOUNT_ID
export TF_VAR_google_client_id=$GOOGLE_CLIENT_ID
export TF_VAR_google_client_secret=$GOOGLE_CLIENT_SECRET
export TF_VAR_aws_certificate_arn=$AWS_CERTIFICATE_ARN
export TF_VAR_local_cidr_block=$LOCAL_CIDR_BLOCK
export TF_VAR_user_pool_client_clientid=$user_pool_client_clientid
export TF_VAR_user_pool_client_secret=$user_pool_client_secret
export TF_VAR_admin_email=$ADMIN_EMAIL
export TF_VAR_stripe_key_public=$STRIPE_KEY_PUBLIC
export TF_VAR_stripe_key_secret=$STRIPE_KEY_SECRET

echo "Debug: TF_VAR_ecr_repo_url is $TF_VAR_ecr_repo_url"
echo "Debug: TF_VAR_my_sql_root_password is $TF_VAR_my_sql_root_password"
echo "Debug: TF_VAR_my_sql_database is $TF_VAR_my_sql_database"
echo "Debug: TF_VAR_my_sql_purchase_database is $TF_VAR_my_sql_purchase_database"
echo "Debug: TF_VAR_spring_datasource_username is $TF_VAR_spring_datasource_username"
echo "Debug: TF_VAR_spring_datasource_password is $TF_VAR_spring_datasource_password"
echo "Debug: TF_VAR_aws_account_id is $TF_VAR_aws_account_id"
echo "Debug: TF_VAR_google_client_id is $TF_VAR_google_client_id"
echo "Debug: TF_VAR_google_client_secret is $TF_VAR_google_client_secret"
echo "Debug: TF_VAR_aws_certificate_arn is $TF_VAR_aws_certificate_arn"
echo "Debug: TF_VAR_local_cidr_block is $TF_VAR_local_cidr_block"
echo "Debug: TF_VAR_user_pool_client_clientid is $TF_VAR_user_pool_client_clientid"
echo "Debug: TF_VAR_user_pool_client_secret is $TF_VAR_user_pool_client_secret"
echo "Debug: TF_VAR_ADMIN_EMAIL is $TF_VAR_admin_email"
echo "Debug: TF_VAR_stripe_key_public is $TF_VAR_stripe_key_public"
echo "Debug: TF_VAR_stripe_key_secret is $TF_VAR_stripe_key_secret"

# Run Terraform commands
terraform init
terraform plan > plan.txt
terraform apply -auto-approve
# terraform destroy -auto-approve

# Unset exported variables
unset TF_VAR_image_version
unset TF_VAR_ecr_repo_url
unset TF_VAR_my_sql_root_password
unset TF_VAR_my_sql_database
unset TF_VAR_my_sql_purchase_database
unset TF_VAR_spring_datasource_username
unset TF_VAR_spring_datasource_password
unset TF_VAR_aws_account_id
unset TF_VAR_google_client_id
unset TF_VAR_google_client_secret
unset TF_VAR_aws_certificate_arn
unset TF_VAR_local_cidr_block
unset TF_VAR_user_pool_client_clientid
unset TF_VAR_user_pool_client_secret
unset TF_VAR_admin_email
unset TF_VAR_stripe_key_public
unset TF_VAR_stripe_key_secret