# ECS Services
resource "aws_ecs_service" "feed_service" {
  name            = "feed-service"
  cluster         = aws_ecs_cluster.my_cluster.id
  task_definition = aws_ecs_task_definition.feed_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1
}

resource "aws_ecs_service" "queue_service" {
  name            = "queue-service"
  cluster         = aws_ecs_cluster.my_cluster.id
  task_definition = aws_ecs_task_definition.queue_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1
}

resource "aws_ecs_service" "buffer_service" {
  name            = "buffer-service"
  cluster         = aws_ecs_cluster.my_cluster.id
  task_definition = aws_ecs_task_definition.buffer_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1
}