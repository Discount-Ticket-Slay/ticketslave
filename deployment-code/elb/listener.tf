# HTTP Listener for the load balancer (redirect HTTP traffic to HTTPS)
resource "aws_lb_listener" "my_listener" {
  load_balancer_arn = aws_lb.ticket_micro_app_lb.arn
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
  load_balancer_arn = aws_lb.ticket_micro_app_lb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"

  # certificate ARN for HTTPS
  certificate_arn = var.aws_certificate_arn

  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "404: Not Found"
      status_code  = "404"
    }
  }
}

# Listener rules for different services
resource "aws_lb_listener_rule" "feed_service_rule" {
  listener_arn = aws_lb_listener.ticket_micro_https_listener.arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.feed_target_group.arn
  }

  condition {
    path_pattern {
      values = ["/feed*"]
    }
  }
}

resource "aws_lb_listener_rule" "queue_service_rule" {
  listener_arn = aws_lb_listener.ticket_micro_https_listener.arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.queue_target_group.arn
  }

  condition {
    path_pattern {
      values = ["/queue*"]
    }
  }
}

resource "aws_lb_listener_rule" "buffer_service_rule" {
  listener_arn = aws_lb_listener.ticket_micro_https_listener.arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.buffer_target_group.arn
  }

  condition {
    path_pattern {
      values = ["/buffer*"]
    }
  }
}

resource "aws_lb_listener_rule" "purchase_service_rule" {
  listener_arn = aws_lb_listener.ticket_micro_https_listener.arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.purchase_target_group.arn
  }

  condition {
    path_pattern {
      values = ["/purchase*"]
    }
  }
}

resource "aws_lb_listener_rule" "payment_service_rule" {
  listener_arn = aws_lb_listener.ticket_micro_https_listener.arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.payment_target_group.arn
  }

  condition {
    path_pattern {
      values = ["/payment*"]
    }
  }
}

# Listener for NLB
resource "aws_lb_listener" "ticket_micro_nlb_listener" {
  load_balancer_arn = aws_lb.ticket_micro_network_lb.arn
  port              = 80
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.nlb_to_alb_target_group.arn
  }
}
