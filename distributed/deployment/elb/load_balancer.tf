# Create a Load Balancer
resource "aws_lb" "ticket_micro_lb" {
  name               = "ticket-micro-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.ticket_micro_security_group.id]
  subnets            = [aws_subnet.ticket_micro_subnet_1.id, aws_subnet.ticket_micro_subnet_2.id]

  enable_deletion_protection = false

  enable_cross_zone_load_balancing = true
  idle_timeout                     = 400
}