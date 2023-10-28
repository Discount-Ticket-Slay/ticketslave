output "ticket_micro_vpc_security_group_id" {
  value = aws_security_group.ticket_micro_security_group.id
}

output "ticket_micro_subnet_1_id" {
  value = aws_subnet.ticket_micro_subnet_1.id
}

output "ticket_micro_subnet_2_id" {
  value = aws_subnet.ticket_micro_subnet_2.id
}

output "ticket_micro_private_subnet_1_id" {
  value = aws_subnet.ticket_micro_private_subnet_1.id
}

output "ticket_micro_private_subnet_2_id" {
  value = aws_subnet.ticket_micro_private_subnet_2.id
}

output "ticket_micro_private_subnet_3_id" {
  value = aws_subnet.ticket_micro_private_subnet_3.id
}

output "ticket_micro_private_db_subnet_group_name" {
  value = aws_db_subnet_group.ticket_micro_private_db_subnet_group.name
}

output "ticket_micro_vpc_id" {
  value = aws_vpc.ticket_micro_vpc.id
}

output "ticket_micro_security_group_id" {
  value = aws_security_group.ticket_micro_security_group.id
}