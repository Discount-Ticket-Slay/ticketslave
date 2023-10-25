# Create a Subnet (1 in each availibility zone)
resource "aws_subnet" "ticket_micro_subnet_1" {
  vpc_id                  = aws_vpc.ticket_slave_VPC.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-southeast-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "ticket-micro-subnet-1"
  }
}

# Create a second Subnet in a different Availability Zone
resource "aws_subnet" "ticket_micro_subnet_2" {
  vpc_id                  = aws_vpc.ticket_slave_VPC.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-southeast-1b"
  map_public_ip_on_launch = true

  tags = {
    Name = "ticket-micro-subnet-2"
  }
}