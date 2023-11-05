# Create a Security Group for the application
resource "aws_security_group" "ticket_micro_security_group" {
  name        = "ticket-micro-security-group"
  description = "Security group for the application"
  vpc_id      = aws_vpc.ticket_micro_vpc.id

  # ELB health checks
  ingress {
    description      = "Health check from ELB to port 8080"
    from_port        = 8080
    to_port          = 8080
    protocol         = "tcp"
  }

  ingress {
    description      = "Health check from ELB to port 8081"
    from_port        = 8081
    to_port          = 8081
    protocol         = "tcp"
  }

  ingress {
    description      = "Health check from ELB to port 8082"
    from_port        = 8082
    to_port          = 8082
    protocol         = "tcp"
  }

  ingress {
    description      = "Health check from ELB to port 8083"
    from_port        = 8083
    to_port          = 8083
    protocol         = "tcp"
  }

  ingress {
    description      = "Health check from ELB to port 8084"
    from_port        = 8084
    to_port          = 8084
    protocol         = "tcp"
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

  # Kafka Access
  ingress {
    description = "Kafka Access from VPC"
    from_port   = 9092
    to_port     = 9092
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.ticket_micro_vpc.cidr_block]
  }


  # Local Database Access
  ingress {
    description = "Local DB Access"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [var.local_cidr_block]
  }

  ingress {
    description      = "Access from VPC Link"
    from_port        = 0
    to_port          = 3306
    protocol         = "tcp"
    security_groups  = ["sg-056d94b32b4edb1de"]
  }

  ingress {
    description      = "Access from VPC Security Group"
    from_port        = 0
    to_port          = 3306
    protocol         = "tcp"
    self             = true
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

# Health check for the load balancer to application
resource "aws_security_group_rule" "allow_health_check_feed" {
  type              = "ingress"
  from_port         = 8080
  to_port           = 8080
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ticket_micro_security_group.id
}

# Health check for the load balancer to application
resource "aws_security_group_rule" "allow_health_check_queue" {
  type              = "ingress"
  from_port         = 8081
  to_port           = 8081
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ticket_micro_security_group.id
}

# Health check for the load balancer to application
resource "aws_security_group_rule" "allow_health_check_buffer" {
  type              = "ingress"
  from_port         = 8082
  to_port           = 8082
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ticket_micro_security_group.id
}

# Health check for the load balancer to application
resource "aws_security_group_rule" "allow_health_check_purchase" {
  type              = "ingress"
  from_port         = 8083
  to_port           = 8083
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ticket_micro_security_group.id
}

# Health check for the load balancer to application
resource "aws_security_group_rule" "allow_health_check_payment" {
  type              = "ingress"
  from_port         = 8084
  to_port           = 8084
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ticket_micro_security_group.id
}