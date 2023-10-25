# ECS Task Definitions (ECS blueprints)
resource "aws_ecs_task_definition" "feed_task" {
  family                   = "feed-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn
  container_definitions = jsonencode([{
    name  = "feed"
    image = "${var.ecr_repo_url}:${var.image_version}"
    portMappings = [{ containerPort = 8080 }]
    environment = [
      { "name" : "MYSQL_ROOT_PASSWORD", "value" : "${var.my_sql_root_password}" },
      { "name" : "MYSQL_DATABASE", "value" : "${var.my_sql_database}" },
      { "name" : "SPRING_DATASOURCE_URL", "value" : "jdbc:mysql://${var.rds_url}/${var.my_sql_database}" },
      { "name" : "SPRING_DATASOURCE_USERNAME", "value" : "${var.spring_datasource_username}" },
      { "name" : "SPRING_DATASOURCE_PASSWORD", "value" : "${var.spring_datasource_password}" }
    ]
    # ... (logConfiguration, etc.)
  }])

  runtime_platform {
    #Valid Values: WINDOWS_SERVER_2019_FULL | WINDOWS_SERVER_2019_CORE | WINDOWS_SERVER_2016_FULL | WINDOWS_SERVER_2004_CORE | WINDOWS_SERVER_2022_CORE | WINDOWS_SERVER_2022_FULL | WINDOWS_SERVER_20H2_CORE | LINUX
    operating_system_family = "LINUX"

    #Valid Values: X86_64 | ARM64
    cpu_architecture = "ARM64"
  }
}

resource "aws_ecs_task_definition" "queue_task" {
  family                   = "queue-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn
  container_definitions = jsonencode([{
    name  = "queue"
    image = "${var.ecr_repo_url}:${var.image_version}"
    portMappings = [{
      containerPort = 8081
    }]
    # No RDS related environment variables for queue
    # ... (logging and other configurations)
  }])

  runtime_platform {
    #Valid Values: WINDOWS_SERVER_2019_FULL | WINDOWS_SERVER_2019_CORE | WINDOWS_SERVER_2016_FULL | WINDOWS_SERVER_2004_CORE | WINDOWS_SERVER_2022_CORE | WINDOWS_SERVER_2022_FULL | WINDOWS_SERVER_20H2_CORE | LINUX
    operating_system_family = "LINUX"

    #Valid Values: X86_64 | ARM64
    cpu_architecture = "ARM64"
  }
}

resource "aws_ecs_task_definition" "buffer_task" {
  family                   = "buffer-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn
  container_definitions = jsonencode([{
    name  = "buffer"
    image = "${var.ecr_repo_url}:${var.image_version}"
    portMappings = [{
      containerPort = 8082
    }]
    environment = [
      { "name" : "SPRING_KAFKA_BOOTSTRAP_SERVERS", "value" : "your-msk-endpoint:9092" },
      { "name" : "SPRING_KAFKA_CONSUMER_GROUP_ID", "value" : "my-group" }
    ]
    # ... (logging and other configurations)
  }])

  runtime_platform {
    #Valid Values: WINDOWS_SERVER_2019_FULL | WINDOWS_SERVER_2019_CORE | WINDOWS_SERVER_2016_FULL | WINDOWS_SERVER_2004_CORE | WINDOWS_SERVER_2022_CORE | WINDOWS_SERVER_2022_FULL | WINDOWS_SERVER_20H2_CORE | LINUX
    operating_system_family = "LINUX"

    #Valid Values: X86_64 | ARM64
    cpu_architecture = "ARM64"
  }
}