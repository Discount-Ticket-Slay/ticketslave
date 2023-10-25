provider "aws" {
  region = "us-west-2"  # specify your region
}

# Network Module
module "network" {
  source = "./network"
  # Pass any variables if needed
}

# ECR Module
module "ecr" {
  source = "./ecr"
}

# ECS Module
module "ecs" {
  source = "./ecs"

  ecr_repo_url             = var.ecr_repo_url
  image_version            = var.image_version
  my_sql_root_password     = var.my_sql_root_password
  my_sql_database          = var.my_sql_database
  rds_url                  = var.rds_url
  spring_datasource_username = var.spring_datasource_username
  spring_datasource_password = var.spring_datasource_password
}

# ELB Module
module "elb" {
  source = "./elb"
  aws_certificate_arn = var.aws_certificate_arn
  vpc_id = module.network.vpc_id  # Assuming network module outputs vpc_id
}

# API Gateway Module
module "api_gateway" {
  source = "./api_gateway"
  vpc_link_id = module.elb.vpc_link_id  # Assuming elb module outputs vpc_link_id
}

# Others (Providers and Variables)
module "others" {
  source = "./others"
  aws_certificate_arn = var.aws_certificate_arn
}
