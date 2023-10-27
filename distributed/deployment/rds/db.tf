resource "aws_db_instance" "ticket_micro_db" {
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "mysql"
  engine_version         = "5.7"
  instance_class         = "db.t2.micro"
  identifier             = "ticket-micro-db"
  username               = "root"
  password               = var.my_sql_root_password
  parameter_group_name   = "default.mysql5.7"
  skip_final_snapshot    = true
  vpc_security_group_ids = [var.ticket_micro_security_group_id]
  publicly_accessible    = true
  db_subnet_group_name   = aws_db_subnet_group.ticket_micro_db_subnet_group.name
  multi_az               = true
}
