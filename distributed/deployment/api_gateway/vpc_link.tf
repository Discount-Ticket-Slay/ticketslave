# Create a VPC Link
resource "aws_apigatewayv2_vpc_link" "ticket_micro_vpc_link" {
  name        = "ticket-micro-vpc-link"
  security_group_ids = [aws_security_group.vpc_link_sg.id]
  subnet_ids         = [var.ticket_micro_subnet_1_id, var.ticket_micro_subnet_2_id]

  tags = {
    Name = "ticket-micro-vpc-link to NLB"
  }
}

# create a security group just for the vpc link >:(
resource "aws_security_group" "vpc_link_sg" {
  name        = "vpc-link-sg"
  description = "Security Group for API Gateway VPC Link"
  vpc_id      = var.ticket_micro_vpc_id

  # Allow HTTP traffic on port 80
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow HTTPS traffic on port 443
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow MySQL traffic on port 3306
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Default egress to allow all outgoing traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "vpc-link-sg"
  }
}
