# HTTP Listener for the load balancer (redirect HTTP traffic to HTTPS)
resource "aws_lb_listener" "my_listener" {
  load_balancer_arn = aws_lb.ticket_micro_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# HTTPS Listener for the load balancer
resource "aws_lb_listener" "ticket_micro_https_listener" {
  load_balancer_arn = aws_lb.ticket_micro_lb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"

  # certificate ARN for HTTPS
  certificate_arn = var.aws_certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ticket-micro-target-group.arn
  }
}