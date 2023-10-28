# Create a Security Group for the application
resource "aws_security_group" "ticket_micro_security_group" {
  name        = "ticket-micro-security-group"
  description = "Security group for the application"
  vpc_id      = aws_vpc.ticket_micro_vpc.id

  # HTTP Access from ELB
  dynamic "ingress" {
    for_each = [8080, 8081, 8082]
    content {
      description      = "HTTP from ELB to port ${ingress.value}"
      from_port        = 80
      to_port          = ingress.value
      protocol         = "tcp"
    }
  }

  # HTTPS Access from ELB
  dynamic "ingress" {
    for_each = [8080, 8081, 8082]
    content {
      description      = "HTTPS from ELB to port ${ingress.value}"
      from_port        = 443
      to_port          = ingress.value
      protocol         = "tcp"
    }
  }

  # Health Check from ELB
  dynamic "ingress" {
    for_each = [8080, 8081, 8082]
    content {
      description      = "Health check from ELB to port ${ingress.value}"
      from_port        = ingress.value
      to_port          = ingress.value
      protocol         = "tcp"
    }
  }

  # Network Access
  ingress {
    description = "HTTP Access from VPC"
    from_port   = 80
    to_port     = 8080
    protocol    = "tcp"
  }

  ingress {
    description = "HTTPS Access from VPC"
    from_port   = 443
    to_port     = 8080
    protocol    = "tcp"
  }

  # Network access from anywhere to ALB
  ingress {
    description = "HTTP Access from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS Access from anywhere"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Database Access
  ingress {
    description = "Database Access from VPC"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.ticket_micro_vpc.cidr_block]
  }

  # Egress rule
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ticket-micro-security-group"
  }
}
