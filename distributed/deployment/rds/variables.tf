variable "ticket_micro_security_group_id" {
  description = "Security Group ID of the ticket microservice"
  type        = string
  
}

variable "ticket_micro_private_subnet_1_id" {
  description = "ID of the first private subnet for the ticket microservice"
  type        = string
}

variable "ticket_micro_private_subnet_2_id" {
  description = "ID of the second private subnet for the ticket microservice"
  type        = string
}

variable "ticket_micro_private_subnet_3_id" {
  description = "ID of the third private subnet for the ticket microservice"
  type        = string
}

variable "ticket_micro_vpc_id" {
  description = "ID of the VPC for the ticket microservice"
}

variable "my_sql_root_password" {
  description = "Password for the root user of the MySQL database"
  type        = string
}