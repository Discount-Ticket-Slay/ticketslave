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
    interval            = 120
    path                = "/feed/health"
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
    interval            = 120
    path                = "/queue/health"
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

  # to enable sticky session for websocket
  stickiness {
    type            = "lb_cookie" 
    cookie_duration = 86400 
    enabled         = true
  }

  health_check {
    enabled             = true
    interval            = 120
    path                = "/buffer/health"
    port                = "8082"
    protocol            = "HTTP"
    timeout             = 10
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
}

resource "aws_lb_target_group" "purchase_target_group" {
  name        = "purchase-target-group"
  port        = 8083
  protocol    = "HTTP"
  vpc_id      = var.ticket_micro_vpc_id
  target_type = "ip"

  # to enable sticky session for websocket
  stickiness {
    type            = "lb_cookie" 
    cookie_duration = 86400 
    enabled         = true
  }

  health_check {
    enabled             = true
    interval            = 120
    path                = "/purchase/health"
    port                = "8083"
    protocol            = "HTTP"
    timeout             = 10
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
}

resource "aws_lb_target_group" "payment_target_group" {
  name        = "payment-target-group"
  port        = 8084
  protocol    = "HTTP"
  vpc_id      = var.ticket_micro_vpc_id
  target_type = "ip"

  # Health check settings
  health_check {
    enabled             = true
    interval            = 120
    path                = "/payment/health"
    port                = "8084"
    protocol            = "HTTP"
    timeout             = 10
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
}


# Target group for the NLB that forwards to the ALB
resource "aws_lb_target_group" "nlb_to_alb_target_group" {
  name        = "nlb-to-alb-target-group"
  port        = 80  # ALB's listening port
  protocol    = "TCP"
  vpc_id      = var.ticket_micro_vpc_id
  target_type = "ip"  # Forwarding to ALB's IP

  health_check {
    protocol = "TCP"
  }
}

