output "feed_service_repository_url" {
  value = aws_ecr_repository.feed_service.repository_url
}

output "queue_service_repository_url" {
  value = aws_ecr_repository.queue_service.repository_url
}

output "buffer_service_repository_url" {
  value = aws_ecr_repository.buffer_service.repository_url
}

output "purchase_service_repository_url" {
  value = aws_ecr_repository.purchase_service.repository_url
}

output "payment_service_repository_url" {
  value = aws_ecr_repository.payment_service.repository_url
}