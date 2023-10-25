# Create a Security Group for the ELB
resource "aws_security_group" "elb_security_group" {
  name        = "elb-security-group"
  description = "Security group for the ELB"
  vpc_id      = aws_vpc.ticket_micro_vpc.id

  # HTTP Access from API Gateway
  ingress {
    description = "HTTP from API Gateway"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    security_groups = [aws_apigatewayv2_api.http_api.execution_arn]  # Reference the security group of the API Gateway
  }

  # HTTPS Access from API Gateway
  ingress {
    description = "HTTPS from API Gateway"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    security_groups = [aws_apigatewayv2_api.http_api.execution_arn]  # Reference the security group of the API Gateway
  }

  # Egress rule
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "elb-security-group"
  }
}
