# Create a Load Balancer
resource "aws_lb" "ticket_micro_lb" {
  name               = "ticket-micro-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.elb_security_group.id]
  subnets            = [var.ticket_micro_subnet_1_id, var.ticket_micro_subnet_2_id]

  enable_deletion_protection = false

  enable_cross_zone_load_balancing = true
  idle_timeout                     = 400
}