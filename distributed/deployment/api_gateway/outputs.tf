output "api_gateway_domain_name" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
  description = "The domain name of the API Gateway"
}