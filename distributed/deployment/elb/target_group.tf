# Target group for the load balancer
resource "aws_lb_target_group" "feed_target_group" {
  name        = "feed-target-group"
  port        = 8080
  protocol    = "HTTP"
  vpc_id      = var.ticket_micro_vpc_id
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

resource "aws_lb_target_group" "queue_target_group" {
  name        = "queue-target-group"
  port        = 8081
  protocol    = "HTTP"
  vpc_id      = var.ticket_micro_vpc_id
  target_type = "ip"

  # Health check settings
  health_check {
    enabled             = true
    interval            = 90
    path                = "/health"
    port                = "8081"
    protocol            = "HTTP"
    timeout             = 10
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
  
}

resource "aws_lb_target_group" "buffer_target_group" {
  name        = "buffer-target-group"
  port        = 8082
  protocol    = "HTTP"
  vpc_id      = var.ticket_micro_vpc_id
  target_type = "ip"

  # Health check settings
  health_check {
    enabled             = true
    interval            = 90
    path                = "/health"
    port                = "8082"
    protocol            = "HTTP"
    timeout             = 10
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
  
}