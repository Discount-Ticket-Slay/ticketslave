output "elb_security_group_id" {
  value = aws_security_group.elb_security_group.id
}

output "feed_target_group_arn" {
  value = aws_lb_target_group.feed_target_group.arn
}

output "queue_target_group_arn" {
  value = aws_lb_target_group.queue_target_group.arn
}

output "buffer_target_group_arn" {
  value = aws_lb_target_group.buffer_target_group.arn
}

output "ticket_micro_lb_arn" {
  value = aws_lb.ticket_micro_lb.arn
}

output "load_balancer_dns_name" {
  value = aws_lb.ticket_micro_lb.dns_name
}