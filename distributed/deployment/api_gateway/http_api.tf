resource "aws_apigatewayv2_api" "http_api" {
  name          = "ticket-micro-http-api"
  protocol_type = "HTTP"
}

# feed
resource "aws_apigatewayv2_route" "feed_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /feed"
  target    = "integrations/${aws_apigatewayv2_integration.feed_integration.id}"
}

resource "aws_apigatewayv2_integration" "feed_integration" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "HTTP_PROXY"

  connection_type = "VPC_LINK"
  connection_id   = aws_api_gateway_vpc_link.ticket_micro_vpc_link.id
  integration_method = "GET"
  integration_uri  = "http://feed-service-url/"
}

# queue
resource "aws_apigatewayv2_route" "queue_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /queue"
  target    = "integrations/${aws_apigatewayv2_integration.queue_integration.id}"
}

resource "aws_apigatewayv2_integration" "queue_integration" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "HTTP_PROXY"

  connection_type = "VPC_LINK"
  connection_id   = aws_api_gateway_vpc_link.ticket_micro_vpc_link.id
  integration_method = "GET"
  integration_uri  = "http://queue-service-url/"
}

# buffer
resource "aws_apigatewayv2_route" "buffer_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /buffer"
  target    = "integrations/${aws_apigatewayv2_integration.buffer_integration.id}"
}

resource "aws_apigatewayv2_integration" "buffer_integration" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "HTTP_PROXY"

  connection_type = "VPC_LINK"
  connection_id   = aws_api_gateway_vpc_link.ticket_micro_vpc_link.id
  integration_method = "GET"
  integration_uri  = "http://buffer-service-url/"
}