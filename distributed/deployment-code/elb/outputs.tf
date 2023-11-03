output "feed_target_group_arn" {
  value = aws_lb_target_group.feed_target_group.arn
}

output "queue_target_group_arn" {
  value = aws_lb_target_group.queue_target_group.arn
}

output "buffer_target_group_arn" {
  value = aws_lb_target_group.buffer_target_group.arn
}

output "ticket_micro_app_lb_arn" {
  value = aws_lb.ticket_micro_app_lb.arn
}

output "app_load_balancer_dns_name" {
  value = aws_lb.ticket_micro_app_lb.dns_name
}

output "network_load_balancer_dns_name" {
  value = aws_lb.ticket_micro_network_lb.dns_name
}

output "network_load_balancer_arn" {
  value = aws_lb.ticket_micro_network_lb.arn
}

output "ticket_micro_network_lb_listener_arn" {
  value = aws_lb_listener.ticket_micro_nlb_listener.arn
}