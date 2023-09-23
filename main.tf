# Extract the repository name from the ECR URL
data "aws_ecr_repository" "dynamic_ecr_repo" {
  name = element(split("/", var.ecr_repo_url), length(split("/", var.ecr_repo_url)) - 1)
}

/* VPC RELATED RESOURCES 
    VPC
    Subnet
    Internet Gateway
    Route Table
    Route Table Association
    Security Group
    Load Balancer
*/

# Define AWS Provider
provider "aws" {
  region = "ap-southeast-1" # region where the resources will be created
}

# Create a VPC
resource "aws_vpc" "ticket_slave_VPC" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "ticket_slave_VPC"
  }
}

# Create a Subnet (1 in each availibility zone)
resource "aws_subnet" "ticket_slave_subnet_1" {
  vpc_id                  = aws_vpc.ticket_slave_VPC.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-southeast-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "ticket_slave_subnet_1"
  }
}

# Create a second Subnet in a different Availability Zone
resource "aws_subnet" "ticket_slave_subnet_2" {
  vpc_id                  = aws_vpc.ticket_slave_VPC.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-southeast-1b"
  map_public_ip_on_launch = true

  tags = {
    Name = "ticket_slave_subnet_2"
  }
}

# Create an Internet Gateway
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.ticket_slave_VPC.id
}

# Create a Route Table
# Route Table
resource "aws_route_table" "ticket_slave_route_table" {
  vpc_id = aws_vpc.ticket_slave_VPC.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.gw.id
  }
  tags = {
    Name = "ticket_slave_route_table"
  }
}

# Route Table Association for first subnet
resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.ticket_slave_subnet_1.id
  route_table_id = aws_route_table.ticket_slave_route_table.id
}

# Route Table Association for Second Subnet
resource "aws_route_table_association" "b" {
  subnet_id      = aws_subnet.ticket_slave_subnet_2.id
  route_table_id = aws_route_table.ticket_slave_route_table.id
}

# Create a Security Group
resource "aws_security_group" "ticket_slave_security_group" {
  name        = "ticket_slave_security_group"
  description = "allow web traffic HTTP & HTTPS - no ssh"
  vpc_id      = aws_vpc.ticket_slave_VPC.id

  # define ingress and egress rules
  # define ingress using SSH
  ingress {
    description = "SSH from VPC"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Database Access from VPC"
    from_port   = 22
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP from VPC"
    from_port   = 80
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS from VPC"
    from_port   = 443
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0 # to allow all outbound traffic
    to_port     = 0
    protocol    = "-1" # -1 means all protocols are allowed
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow web"
  }

}

# Create a Load Balancer
resource "aws_lb" "ticket_lb" {
  name               = "ticket-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.ticket_slave_security_group.id]
  subnets            = [aws_subnet.ticket_slave_subnet_1.id, aws_subnet.ticket_slave_subnet_2.id]

  enable_deletion_protection = false

  enable_cross_zone_load_balancing = true
  idle_timeout                     = 400
}

# Target group for the load balancer
resource "aws_lb_target_group" "my_target_group" {
  name        = "my-targetgroup"
  port        = 8080
  protocol    = "HTTP"
  vpc_id      = aws_vpc.ticket_slave_VPC.id
  target_type = "ip"

  # Health check settings
  health_check {
    enabled             = true
    interval            = 90
    path                = "/health"
    port                = "8080"
    protocol            = "HTTP"
    timeout             = 10
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
}

# HTTP Listener for the load balancer (redirect HTTP traffic to HTTPS)
resource "aws_lb_listener" "my_listener" {
  load_balancer_arn = aws_lb.ticket_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# HTTPS Listener for the load balancer
resource "aws_lb_listener" "my_https_listener" {
  load_balancer_arn = aws_lb.ticket_lb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"

  # certificate ARN for HTTPS
  certificate_arn = "${var.aws_certificate_arn}"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.my_target_group.arn
  }
}

# Health check for the load balancer to application
resource "aws_security_group_rule" "allow_health_check" {
  type              = "ingress"
  from_port         = 8080
  to_port           = 8080
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ticket_slave_security_group.id
}


/* ECS RELATED RESOURCES 
    ECS Task Definition
    ECS Cluster
    ECS Service
    ECS Execution Role
*/

# ECS Task Definition
resource "aws_ecs_task_definition" "my_task" {
  family                   = "my_task_family"                    # name of the task definition
  network_mode             = "awsvpc"                            # awsvpc is the only supported network mode for FARGATE (allow each task to have its own elastic network interface)
  requires_compatibilities = ["FARGATE"]                         # FARGATE is a serverless compute engine for containers that works with both Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS)
  cpu                      = "256"                               # cpu units to reserve for the container
  memory                   = "512"                               # memory to reserve for the container
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn # IAM role that allows ECS to pull images from ECR

  container_definitions = jsonencode([{
    name  = "home" # name of the container in ECS
    image = "${var.ecr_repo_url}:${var.image_version}"
    portMappings = [{
      containerPort = 8080
    }]

    environment = [
      { "name" : "MYSQL_ROOT_PASSWORD", "value" : "${var.my_sql_root_password}" },
      { "name" : "MYSQL_DATABASE", "value" : "${var.my_sql_database}" },
      { "name" : "SPRING_DATASOURCE_URL", "value" : "jdbc:mysql://${aws_db_instance.ticket_slave_db.endpoint}/${var.my_sql_database}" },
      { "name" : "SPRING_DATASOURCE_USERNAME", "value" : "${var.spring_datasource_username}" },
      { "name" : "SPRING_DATASOURCE_PASSWORD", "value" : "${var.spring_datasource_password}" }
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.ticket_slave_log_group.name
        "awslogs-region"        = "ap-southeast-1" # region where the resources will be created
        "awslogs-stream-prefix" = "ecs"
      }
    }

  }])

  runtime_platform {
    #Valid Values: WINDOWS_SERVER_2019_FULL | WINDOWS_SERVER_2019_CORE | WINDOWS_SERVER_2016_FULL | WINDOWS_SERVER_2004_CORE | WINDOWS_SERVER_2022_CORE | WINDOWS_SERVER_2022_FULL | WINDOWS_SERVER_20H2_CORE | LINUX
    operating_system_family = "LINUX"

    #Valid Values: X86_64 | ARM64
    cpu_architecture = "ARM64"
  }

}

# Attach the AmazonECSTaskExecutionRolePolicy to ecs_execution_role
resource "aws_iam_role_policy_attachment" "ecs_execution_role_attachment" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Define IAM role for ECS execution
resource "aws_iam_role" "ecs_execution_role" {
  name = "ecs_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# Define inline policy for ECS execution role
resource "aws_iam_role_policy" "ecs_execution_inline_policy" {
  name = "ecs_execution_inline_policy"
  role = aws_iam_role.ecs_execution_role.name

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "ecs:CreateCluster",
          "ecs:DeregisterContainerInstance",
          "ecs:DiscoverPollEndpoint",
          "ecs:Poll",
          "ecs:RegisterContainerInstance",
          "ecs:StartTelemetrySession",
          "ecs:Submit*",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchCheckLayerAvailability",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}

# Define CloudWatch Log
resource "aws_cloudwatch_log_group" "ticket_slave_log_group" {
  name = "/ecs/ticket_slave_log_group"
}

# Define ECS Cluster
resource "aws_ecs_cluster" "ticket_slave_cluster" {
  name = "ticket_slave_cluster"
}

# ECS Service
resource "aws_ecs_service" "ticket_slave_service" {
  name            = "ticket_slave_service"
  cluster         = aws_ecs_cluster.ticket_slave_cluster.id
  task_definition = aws_ecs_task_definition.my_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = [aws_subnet.ticket_slave_subnet_1.id, aws_subnet.ticket_slave_subnet_2.id]
    security_groups  = [aws_security_group.ticket_slave_security_group.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.my_target_group.arn
    container_name   = "home"
    container_port   = 8080
  }

  depends_on = [aws_lb_listener.my_listener]
}

# Configure an RDS database instance to host the data
resource "aws_db_instance" "ticket_slave_db" {
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "mysql"
  engine_version         = "5.7"
  instance_class         = "db.t2.micro"
  identifier             = "ticket-slave-db"
  username               = "root"
  password               = var.my_sql_root_password
  parameter_group_name   = "default.mysql5.7"
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.ticket_slave_security_group.id]
  publicly_accessible    = true
  db_subnet_group_name   = aws_db_subnet_group.ticket_slave_db_subnet_group.name
  depends_on             = [aws_db_subnet_group.ticket_slave_db_subnet_group]
}

# Create a DB subnet group
resource "aws_db_subnet_group" "ticket_slave_db_subnet_group" {
  name       = "ticket_slave_db_subnet_group"
  subnet_ids = [aws_subnet.ticket_slave_subnet_1.id, aws_subnet.ticket_slave_subnet_2.id]

  tags = {
    Name = "My DB subnet group"
  }
}

# Update Security Group to allow MySQL traffic from ECS
resource "aws_security_group_rule" "allow_mysql_from_ecs" {
  type              = "ingress"
  from_port         = 3306
  to_port           = 3306
  protocol          = "tcp"
  security_group_id = aws_security_group.ticket_slave_security_group.id
  self              = true
}

# Create cognito user pool
resource "aws_cognito_user_pool" "ticket_slave_user_pool" {
  name = "ticket_slave_user_pool"
}

# Identity pool with google as the provider
resource "aws_cognito_identity_pool" "ticket_slave_identity_pool" {
  identity_pool_name               = "ticket_slave_identity_pool"
  allow_unauthenticated_identities = false

  cognito_identity_providers {
    client_id               = aws_cognito_user_pool_client.client.id
    provider_name           = aws_cognito_user_pool.ticket_slave_user_pool.endpoint
    server_side_token_check = false # required for Google
  }
}

# Define identity pool roles attachment
resource "aws_cognito_identity_pool_roles_attachment" "ticket_slave_identity_pool_roles" {
  identity_pool_id = aws_cognito_identity_pool.ticket_slave_identity_pool.id

  # Roles to be attached to authenticated and unauthenticated users
  roles = {
    "authenticated" = "arn:aws:iam::${var.aws_account_id}:role/authenticated"
    "unauthenticated" = "arn:aws:iam::${var.aws_account_id}:role/unauthenticated"
  }
}

# Define user pool client
resource "aws_cognito_user_pool_client" "client" {
  name = "ticket_slave_user_pool_client"

  # callback to application home page
  callback_urls = ["https://www.ticketslave.org/cognito-callback"]

  user_pool_id = aws_cognito_user_pool.ticket_slave_user_pool.id

  generate_secret = true

}

# Configure google as identity provider in user pool
resource "aws_cognito_identity_provider" "google" {
  user_pool_id  = aws_cognito_user_pool.ticket_slave_user_pool.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    client_id     = "${var.google_client_id}"
    client_secret = "${var.google_client_secret}"
    authorize_scopes = "profile email openid"
  }

  attribute_mapping = {
    email    = "email"
    username = "sub"
  }
}

# define the domain name for cognito authentication
# temporary (would configure custom domain change once SSL is available)
resource "aws_cognito_user_pool_domain" "ticket_slave_domain" {
  domain       = "ticketslave"
  user_pool_id = aws_cognito_user_pool.ticket_slave_user_pool.id
}

# commented out since it's easier to use the UI version to customise
# # UI customization for cognito authentication
# resource "aws_cognito_user_pool_ui_customization" "ticket_slave_ui_customization" {
#   client_id = aws_cognito_user_pool_client.client.id

#   # css        = ".label-customizable {font-weight: 400;}"
#   # image_file = filebase64("logo.png")

#   # Refer to the aws_cognito_user_pool's id attribute for the user pool
#   user_pool_id = aws_cognito_user_pool.ticket_slave_user_pool.id
# }