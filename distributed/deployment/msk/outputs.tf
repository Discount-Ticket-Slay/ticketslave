output "bootstrap_brokers" {
  value = aws_msk_cluster.ticketslave_msk_cluster.bootstrap_brokers_tls
}