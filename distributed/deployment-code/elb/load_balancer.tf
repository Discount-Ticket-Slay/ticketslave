# application load balancer
resource "aws_lb" "ticket_micro_app_lb" {
  name               = "ticket-micro-app-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.ticket_micro_security_group_id]
  subnets            = [var.ticket_micro_subnet_1_id, var.ticket_micro_subnet_2_id]

  enable_deletion_protection = false

  enable_cross_zone_load_balancing = true
  idle_timeout                     = 400
}

# network load balancer
resource "aws_lb" "ticket_micro_network_lb" {
  name = "ticket-micro-network-lb"
  internal = false
  load_balancer_type = "network"
  subnets = [var.ticket_micro_subnet_1_id, var.ticket_micro_subnet_2_id]

  enable_deletion_protection = false
  tags = {
    Name = "ticket-micro-network-lb"
  }
}