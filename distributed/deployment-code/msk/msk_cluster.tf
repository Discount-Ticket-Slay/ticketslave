resource "aws_cloudwatch_log_group" "ticketslave_msk_log_group" {
  name = "/aws/msk/ticketslave-msk-cluster"
  retention_in_days = 30
}

resource "aws_msk_cluster" "ticketslave_msk_cluster" {
  cluster_name           = "ticketslave-msk-cluster"
  kafka_version          = "3.5.1"
  number_of_broker_nodes = 2

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

  encryption_info {
    encryption_in_transit {
      client_broker = "PLAINTEXT"
    }
  }

  logging_info {
    broker_logs {
      cloudwatch_logs {
        enabled   = true
        log_group = aws_cloudwatch_log_group.ticketslave_msk_log_group.name
      }
    }
  }

  configuration_info {
    arn      = aws_msk_configuration.ticketslave_msk_configuration.arn
    revision = aws_msk_configuration.ticketslave_msk_configuration.latest_revision
  }
}

resource "aws_msk_configuration" "ticketslave_msk_configuration" {
  kafka_versions    = ["3.5.1"]
  name              = "ticketslave-msk-configuration"
  server_properties = <<PROPERTIES
auto.create.topics.enable=true
PROPERTIES
}
