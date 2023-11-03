# ECR repository URL
variable "feed_service_repository_url" {
  description = "ECR repository URL for feed service"
  type        = string
}

variable "queue_service_repository_url" {
  description = "ECR repository URL for queue service"
  type        = string
}

variable "buffer_service_repository_url" {
  description = "ECR repository URL for buffer service"
  type        = string
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

variable "user_pool_client_clientid" {
  description = "User pool client ID"
  type        = string 
}

variable "user_pool_client_secret" {
  description = "User pool secret"
  type        = string
}

# Network related variables
variable "subnet_1_id" {
  description = "subnet 1 ID"
  type        = string
}

variable "subnet_2_id" {
  description = "subnet 2 ID"
  type        = string
}

variable "app_security_group_id" {
  description = "security group ID"
  type        = string
}

# ELB related variables
variable "feed_target_group_arn" {
  description = "ARN of the feed target group"
  type        = string
}

variable "queue_target_group_arn" {
  description = "ARN of the queue target group"
  type        = string
}

variable "buffer_target_group_arn" {
  description = "ARN of the buffer target group"
  type        = string
}

# MSK related variables
variable "bootstrap_brokers" {
  description = "Bootstrap brokers"
  type        = string
}