# Create a VPC Link
resource "aws_api_gateway_vpc_link" "ticket_micro_vpc_link" {
  name        = "ticket-micro-vpc-link"
  description = "VPC link for my API Gateway"
  target_arns = [aws_lb.ticket_micro_lb.arn]
}