# Internet Gateway
resource "aws_internet_gateway" "ticket_gw" {
  vpc_id = aws_vpc.ticket_micro_vpc.id
}

# Route Table
resource "aws_route_table" "ticket_micro_route_table" {
  vpc_id = aws_vpc.ticket_micro_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ticket_gw.id
  }
  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.ticket_gw.id
  }
  tags = {
    Name = "ticket-micro-route-table"
  }
}

# Route Table Association for first subnet
resource "aws_route_table_association" "ticket_micro_subnet_1_association" {
  subnet_id      = aws_subnet.ticket_micro_subnet_1.id
  route_table_id = aws_route_table.ticket_micro_route_table.id
}

# Route Table Association for second Subnet
resource "aws_route_table_association" "ticket_micro_subnet_2_association" {
  subnet_id      = aws_subnet.ticket_micro_subnet_2.id
  route_table_id = aws_route_table.ticket_micro_route_table.id
}
