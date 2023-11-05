output "feed_service_repository_url" {
  value = aws_ecr_repository.feed_service.repository_url
}

output "queue_service_repository_url" {
  value = aws_ecr_repository.queue_service.repository_url
}

output "buffer_service_repository_url" {
  value = aws_ecr_repository.buffer_service.repository_url
}