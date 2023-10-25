# MSK Cluster
resource "aws_msk_cluster" "ticketslave_msk_cluster" {
  cluster_name = "ticketslave-msk-cluster"
  kafka_version = "2.4.1"
  number_of_broker_nodes = 3

  broker_node_group_info {
    instance_type   = "kafka.t3.small"
    client_subnets  = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id, aws_subnet.subnet_c.id]
    security_groups = [aws_security_group.sg.id]

    storage_info {
      ebs_storage_info {
        volume_size = 1000
      }
    }
  }

  configuration_info {
    arn = aws_msk_configuration.kafka_configuration.arn
    revision = aws_msk_configuration.kafka_configuration.latest_revision
  }
}