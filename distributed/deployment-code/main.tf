provider "aws" {
  region = "" # specify your region
}

# ECR Module
module "ecr" {
  source = "./ecr"
}

# ECS Module
module "ecs" {
  source = "./ecs"

  # secret variables
  my_sql_root_password       = var.my_sql_root_password
  my_sql_database            = var.my_sql_database
  spring_datasource_username = var.spring_datasource_username
  spring_datasource_password = var.spring_datasource_password
  user_pool_client_clientid  = var.user_pool_client_clientid
  user_pool_client_secret    = var.user_pool_client_secret
  admin_email                = var.admin_email

  # rds module output
  rds_url = module.rds.db_instance_endpoint

  # ecr module output
  feed_service_repository_url   = module.ecr.feed_service_repository_url
  queue_service_repository_url  = module.ecr.queue_service_repository_url
  buffer_service_repository_url = module.ecr.buffer_service_repository_url

  # elb module output
  feed_target_group_arn   = module.elb.feed_target_group_arn
  queue_target_group_arn  = module.elb.queue_target_group_arn
  buffer_target_group_arn = module.elb.buffer_target_group_arn

  # network module output
  subnet_1_id           = module.network.ticket_micro_subnet_1_id
  subnet_2_id           = module.network.ticket_micro_subnet_2_id
  app_security_group_id = module.network.ticket_micro_security_group_id

  # msk module output
  bootstrap_brokers = module.msk.bootstrap_brokers

}

# ELB Module
module "elb" {
  source = "./elb"

  # secret variable
  aws_certificate_arn = var.aws_certificate_arn

  # network module output
  ticket_micro_vpc_id            = module.network.ticket_micro_vpc_id
  ticket_micro_subnet_1_id       = module.network.ticket_micro_subnet_1_id
  ticket_micro_subnet_2_id       = module.network.ticket_micro_subnet_2_id
  ticket_micro_security_group_id = module.network.ticket_micro_security_group_id

}

# API Gateway Module
module "api_gateway" {
  source = "./api_gateway"

  # elb module output
  network_load_balancer_dns_name       = module.elb.network_load_balancer_dns_name
  ticket_micro_network_lb_arn          = module.elb.network_load_balancer_arn
  ticket_micro_network_lb_listener_arn = module.elb.ticket_micro_network_lb_listener_arn

  # network module output
  ticket_micro_vpc_id      = module.network.ticket_micro_vpc_id
  ticket_micro_subnet_1_id = module.network.ticket_micro_subnet_1_id
  ticket_micro_subnet_2_id = module.network.ticket_micro_subnet_2_id

}

# Network Module
module "network" {
  source = "./network"

  # secret variables
  local_cidr_block = var.local_cidr_block

}

# MSK Module
module "msk" {
  source = "./msk"

  # network module output
  ticket_micro_subnet_1_id       = module.network.ticket_micro_subnet_1_id
  ticket_micro_subnet_2_id       = module.network.ticket_micro_subnet_2_id
  ticket_micro_security_group_id = module.network.ticket_micro_vpc_security_group_id

}

# RDS Module
module "rds" {
  source = "./rds"

  # secret variables
  my_sql_root_password = var.my_sql_root_password

  # network module output
  ticket_micro_vpc_id            = module.network.ticket_micro_vpc_id
  ticket_micro_security_group_id = module.network.ticket_micro_vpc_security_group_id

  ticket_micro_private_subnet_1_id          = module.network.ticket_micro_private_subnet_1_id
  ticket_micro_private_subnet_2_id          = module.network.ticket_micro_private_subnet_2_id
  ticket_micro_private_subnet_3_id          = module.network.ticket_micro_private_subnet_3_id
  ticket_micro_private_db_subnet_group_name = module.network.ticket_micro_private_db_subnet_group_name

}

# CloudFront Module
module "cloudfront" {
  source = "./cloudfront"

  # api gateway module output
  api_gateway_domain_name = element(split("://", module.api_gateway.api_gateway_domain_endpoint), 1)


}
