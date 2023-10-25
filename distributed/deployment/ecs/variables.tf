# ECR repository URL
variable "ecr_repo_url" {
  description = "ECR repository URL"
  type        = string
}

# Docker image version
variable "image_version" {
  description = "Docker image version from ECR"
  default     = "latest"
}

# RDS related variables (only used by feed service)
variable "my_sql_root_password" {
  description = "MySQL root password"
  type        = string
}

variable "my_sql_database" {
  description = "MySQL database name"
  type        = string
}

variable "rds_url" {
  description = "value of RDS URL"
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
