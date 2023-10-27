variable "ticket_micro_security_group_id" {
  description = "Security Group ID of the Ticket Microservice"
  type        = string
}

variable "ticket_micro_vpc_id" {
  description = "ID of the VPC for the Ticket Microservice"
  type        = string
}

variable "ticket_micro_subnet_1_id" {
  description = "id value of the first subnet"
  type        = string
}

variable "ticket_micro_subnet_2_id" {
  description = "id value of the second subnet"
  type        = string
}

variable "aws_certificate_arn" {
  description = "ARN of the ACM certificate"
  type        = string
}