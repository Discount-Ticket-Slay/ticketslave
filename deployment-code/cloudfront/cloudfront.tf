# Create CloudFront Distribution
resource "aws_cloudfront_distribution" "ticket_micro_cloudfront" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront for ticket-micro-http-api"
  default_root_object = "index.html"

  # the origin of the info which is being cached
  origin {
    domain_name = var.api_gateway_domain_name
    origin_id   = "ticketMicroAPIGateway"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "ticketMicroAPIGateway"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Create CloudFront Distribution
resource "aws_cloudfront_distribution" "ticket_micro_lb_cloudfront" {
  enabled         = true
  is_ipv6_enabled = true
  comment         = "CloudFront for ticket-microservice"
  default_root_object = "feed"  # Assuming 'feed' is the path your application serves content from

  origin {
    domain_name = var.ticket_application_lb_dns_name  # This should be the DNS name of the ALB
    origin_id   = "ticketMicroALB"
    origin_path = "/feed"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "ticketMicroALB"

    forwarded_values {
      query_string = true  # Forwarding query strings to ALB

      cookies {
        forward = "all"  # Forwarding all cookies to ALB
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
