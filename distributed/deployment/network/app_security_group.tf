# Create a Security Group for the application
resource "aws_security_group" "ticket_micro_security_group" {
  name        = "ticket-micro-security-group"
  description = "Security group for the application"
  vpc_id      = aws_vpc.ticket_micro_vpc.id

  # HTTP Access from ELB
  ingress {
    description      = "HTTP from ELB"
    from_port        = 80
    to_port          = 8080
    protocol         = "tcp"
    security_groups  = [aws_security_group.elb_security_group.id]
  }

  # HTTPS Access from ELB
  ingress {
    description      = "HTTPS from ELB"
    from_port        = 443
    to_port          = 8080
    protocol         = "tcp"
    security_groups  = [aws_security_group.elb_security_group.id]
  }

  # Database Access
  ingress {
    description = "Database Access from VPC"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.ticket_micro_vpc.cidr_block]
  }

  # Health Check from ELB
  ingress {
    description      = "Health check from ELB"
    from_port        = 8080
    to_port          = 8080
    protocol         = "tcp"
    security_groups  = [aws_security_group.elb_security_group.id]
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
