# Define ecr repository we are going to use
variable "ecr_repo_url" {
  description = "ECR repository URL"
  type        = string
}

# Define ecr repository we are going to use
data "aws_ecr_repository" "ecr_repo_url" {
  name = "backend" # name of ECR repository
}

# Define variables to be populated for the container
variable "my_sql_root_password" {
  description = "MySQL root password"
  type        = string
}

variable "my_sql_database" {
  description = "MySQL database name"
  type        = string
}

variable "spring_datasource_username" {
  description = "spring datasource username"
  type        = string
}

variable "spring_datasource_password" {
  description = "spring datasource password"
  type        = string
}

variable "aws_account_id" {
  description = "AWS account ID"
  type        = string
}

variable "google_client_id" {
  description = "Google client ID"
  type        = string
}

variable "google_client_secret" {
  description = "Google client secret"
  type        = string
}

variable "aws_certificate_arn" {
  description = "AWS certificate ARN"
  type        = string
}

variable "local_cidr_block" {
  description = "CIDR block of the local network"
  type        = string
}

variable "user_pool_client_clientid" {
  description = "User pool client ID"
  type        = string
}

variable "user_pool_client_secret" {
  description = "User pool secret"
  type        = string
}