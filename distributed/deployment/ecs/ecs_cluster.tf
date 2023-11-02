# ECS Cluster
resource "aws_ecs_cluster" "ticket_micro_cluster" {
  name = "ticket-micro-cluster"
}