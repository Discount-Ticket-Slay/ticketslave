# define configuration for each service
locals {
  services = {
    "feed" : {
      port : 8080,
      image_url : var.feed_service_repository_url,
      additional_env : [
        { "name" : "MYSQL_ROOT_PASSWORD", "value" : var.my_sql_root_password },
        { "name" : "MYSQL_DATABASE", "value" : var.my_sql_database },
        { "name" : "SPRING_DATASOURCE_URL", "value" : "jdbc:mysql://${var.rds_url}/${var.my_sql_database}" },
        { "name" : "SPRING_DATASOURCE_USERNAME", "value" : var.spring_datasource_username },
        { "name" : "SPRING_DATASOURCE_PASSWORD", "value" : var.spring_datasource_password }
      ]
    },
    "queue" : {
      port : 8081,
      image_url : var.queue_service_repository_url,
      additional_env : []
    },
    "buffer" : {
      port : 8082,
      image_url : var.buffer_service_repository_url,
      additional_env : []
    },
    "purchase" : {
      port : 8083,
      image_url : var.purchase_service_repository_url,
      additional_env : [
        { "name" : "MYSQL_ROOT_PASSWORD", "value" : var.my_sql_root_password },
        { "name" : "MYSQL_DATABASE", "value" : var.my_sql_purchase_database },
        { "name" : "SPRING_DATASOURCE_URL", "value" : "jdbc:mysql://${var.rds_purchase_url}/${var.my_sql_purchase_database}" },
        { "name" : "SPRING_DATASOURCE_USERNAME", "value" : var.spring_datasource_username },
        { "name" : "SPRING_DATASOURCE_PASSWORD", "value" : var.spring_datasource_password }
      ]
    },
    "payment" : {
      port : 8084,
      image_url : var.payment_service_repository_url,
      additional_env : [
        { "name" : "STRIPE_KEY_PUBLIC", "value" : var.stripe_key_public },
        { "name" : "STRIPE_KEY_SECRET", "value" : var.stripe_key_secret }
      ]
    }
  }
}

resource "aws_ecs_task_definition" "task" {
  for_each = local.services

  family                   = "${each.key}-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_micro_execution_role.arn

  container_definitions = jsonencode([{
    name  = each.key
    image = each.value.image_url
    portMappings = [{ containerPort = each.value.port }]
    environment = concat([
      { "name" : "SPRING_KAFKA_BOOTSTRAP_SERVERS", "value" : var.bootstrap_brokers },
      { "name" : "SPRING_KAFKA_CONSUMER_GROUP_ID", "value" : "my-group" },
      { "name" : "USER_POOL_CLIENT_CLIENTID", "value" : var.user_pool_client_clientid },
      { "name" : "USER_POOL_CLIENT_SECRET", "value" : var.user_pool_client_secret },
      { "name" : "ADMIN_EMAIL", "value" : var.admin_email }
    ], each.value.additional_env)
   
  logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group" = aws_cloudwatch_log_group.ecs_log_group.name
        "awslogs-region" = "ap-southeast-1"
        "awslogs-stream-prefix" = each.key
      }
    }

  }])

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture = "ARM64"
  }
}

# cloudwatch log group for ecs logs
resource "aws_cloudwatch_log_group" "ecs_log_group" {
  name = "/ecs/micro-services"
  retention_in_days = 14
}