# Deploy the API
resource "aws_apigatewayv2_deployment" "ticket_micro_http_api_deployment" {
  api_id = aws_apigatewayv2_api.http_api.id

  # Trigger a new deployment on any change to the API routes or integrations
  triggers = {
    redeployment = sha1(join(",", tolist([
      jsonencode(aws_apigatewayv2_route.feed_route),
      jsonencode(aws_apigatewayv2_route.queue_route),
      jsonencode(aws_apigatewayv2_route.buffer_route),
      jsonencode(aws_apigatewayv2_integration.feed_integration),
      jsonencode(aws_apigatewayv2_integration.queue_integration),
      jsonencode(aws_apigatewayv2_integration.buffer_integration)
    ])))
  }

  depends_on = [
    aws_apigatewayv2_route.feed_route,
    aws_apigatewayv2_route.queue_route,
    aws_apigatewayv2_route.buffer_route,
    aws_apigatewayv2_integration.feed_integration,
    aws_apigatewayv2_integration.queue_integration,
    aws_apigatewayv2_integration.buffer_integration
  ]
}