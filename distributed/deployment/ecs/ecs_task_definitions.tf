# define configuration for each service
locals {
  services = {
    "feed" : {
      port : 8080,
      image_url : module.ecr.feed_service_repository_url,
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
      image_url : module.ecr.queue_service_repository_url,
      additional_env : []
    },
    "buffer" : {
      port : 8082,
      image_url : module.ecr.buffer_service_repository_url,
      additional_env : []
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
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn

  container_definitions = jsonencode([{
    name  = each.key
    image = each.value.image_url
    portMappings = [{ containerPort = each.value.port }]
    environment = concat([
      { "name" : "SPRING_KAFKA_BOOTSTRAP_SERVERS", "value" : var.bootstrap_brokers },
      { "name" : "SPRING_KAFKA_CONSUMER_GROUP_ID", "value" : "my-group" }
    ], each.value.additional_env)
    # ... (logConfiguration, etc.)
  }])

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture = "ARM64"
  }
}
