# MSK Cluster
resource "aws_msk_cluster" "ticketslave_msk_cluster" {
  cluster_name = "ticketslave-msk-cluster"
  kafka_version = "3.5.1"
  number_of_broker_nodes = 3

  broker_node_group_info {
    instance_type   = "kafka.t3.small"
    client_subnets  = [var.ticket_micro_subnet_1_id, var.ticket_micro_subnet_2_id]
    security_groups = [var.ticket_micro_security_group_id]

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