# Create a Subnet (1 in each availibility zone)
resource "aws_subnet" "ticket_micro_subnet_1" {
  vpc_id                  = aws_vpc.ticket_micro_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-southeast-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "ticket-micro-subnet-1"
  }
}

# Create a second Subnet in a different Availability Zone
resource "aws_subnet" "ticket_micro_subnet_2" {
  vpc_id                  = aws_vpc.ticket_micro_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-southeast-1b"
  map_public_ip_on_launch = true

  tags = {
    Name = "ticket-micro-subnet-2"
  }
}

# Private subnets for RDS
resource "aws_subnet" "ticket_micro_private_subnet_1" {
  vpc_id = aws_vpc.ticket_micro_vpc.id
  cidr_block              = "10.0.3.0/24"
  availability_zone       = "ap-southeast-1a"
  map_public_ip_on_launch = true # temporary

  tags = {
    Name = "ticket-micro-private-subnet-1"
  }
}

resource "aws_subnet" "ticket_micro_private_subnet_2" {
  vpc_id = aws_vpc.ticket_micro_vpc.id
  cidr_block              = "10.0.4.0/24"
  availability_zone       = "ap-southeast-1b"
  map_public_ip_on_launch = true # temporary

  tags = {
    Name = "ticket-micro-private-subnet-2"
  }
}

resource "aws_subnet" "ticket_micro_private_subnet_3" {
  vpc_id = aws_vpc.ticket_micro_vpc.id
  cidr_block              = "10.0.4.0/24"
  availability_zone       = "ap-southeast-1c"
  map_public_ip_on_launch = true # temporary

  tags = {
    Name = "ticket-micro-private-subnet-3"
  }
}

# RDS DB Subnet Group
resource "aws_db_subnet_group" "ticket_micro_private_db_subnet_group" {
  name       = "ticket-micro-private-db-subnet-group"
  subnet_ids = [
    aws_subnet.ticket_micro_private_subnet_1.id,
    aws_subnet.ticket_micro_private_subnet_2.id,
    aws_subnet.ticket_micro_private_subnet_3.id
  ]

  tags = {
    Name = "ticket-micro-private-db-subnet-group"
  }
}
