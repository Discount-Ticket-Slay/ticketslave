# ECS Services for Microservices

# Feed Service
resource "aws_ecs_service" "feed_service" {
  name            = "feed-service"
  cluster         = aws_ecs_cluster.my_cluster.id
  task_definition = aws_ecs_task_definition.feed_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = [var.subnet_1_id, var.subnet_2_id]
    security_groups  = [var.app_security_group_id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.feed_target_group_arn
    container_name   = "feed"
    container_port   = 8080
  }
}

# Queue Service
resource "aws_ecs_service" "queue_service" {
  name            = "queue-service"
  cluster         = aws_ecs_cluster.my_cluster.id
  task_definition = aws_ecs_task_definition.queue_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = [var.subnet_1_id, var.subnet_2_id]
    security_groups  = [var.app_security_group_id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.queue_target_group_arn
    container_name   = "queue"
    container_port   = 8081
  }
}

# Buffer Service
resource "aws_ecs_service" "buffer_service" {
  name            = "buffer-service"
  cluster         = aws_ecs_cluster.my_cluster.id
  task_definition = aws_ecs_task_definition.buffer_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = [var.subnet_1_id, var.subnet_2_id]
    security_groups  = [var.app_security_group_id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.buffer_target_group_arn
    container_name   = "buffer"
    container_port   = 8082
  }
}
