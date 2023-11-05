# ECR Repositories (store docker microservice images)
resource "aws_ecr_repository" "feed_service" {
  name = "feed-service"
}

resource "aws_ecr_repository" "queue_service" {
  name = "queue-service"
}

resource "aws_ecr_repository" "buffer_service" {
  name = "buffer-service"
}

resource "aws_ecr_repository" "purchase_service" {
  name = "purchase-service"
}

resource "aws_ecr_repository" "payment_service" {
  name = "payment-service"
}