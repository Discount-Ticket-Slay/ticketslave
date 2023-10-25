# Target group for the load balancer
resource "aws_lb_target_group" "ticket-micro-target-group" {
  name        = "ticket-micro-target-group"
  port        = 8080
  protocol    = "HTTP"
  vpc_id      = aws_vpc.ticket_micro_vpc.id
  target_type = "ip"

  # Health check settings
  health_check {
    enabled             = true
    interval            = 90
    path                = "/health"
    port                = "8080"
    protocol            = "HTTP"
    timeout             = 10
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
  
}