output "db_instance_endpoint" {
  value = aws_db_instance.ticket_micro_db.endpoint
}

output "db_purchase_instance_endpoint" {
  value = aws_db_instance.ticket_micro_purchase_db.endpoint
}