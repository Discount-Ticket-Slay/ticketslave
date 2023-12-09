variable "network_load_balancer_dns_name" {
  description = "The DNS name of the network load balancer"
  type        = string
}

variable "ticket_micro_network_lb_arn" {
  description = "The ARN of the network load balancer"
  type        = string
}

variable "ticket_micro_network_lb_listener_arn" {
  description = "The ARN of the network load balancer listener"
  type        = string
}

variable "ticket_micro_vpc_id" {
  description = "The ID of the VPC for the Ticket Microservice"
  type        = string
}

variable "ticket_micro_subnet_1_id" {
  description = "The ID of the first subnet for the Ticket Microservice"
  type        = string
}

variable "ticket_micro_subnet_2_id" {
  description = "The ID of the second subnet for the Ticket Microservice"
  type        = string
}