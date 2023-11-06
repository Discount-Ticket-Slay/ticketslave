# # Auto Scaling for Queue Service
# resource "aws_appautoscaling_target" "queue_service_target" {
#   service_namespace  = "ecs"
#   resource_id        = "service/${aws_ecs_cluster.ticket_micro_cluster.name}/${aws_ecs_service.queue_service.name}"
#   scalable_dimension = "ecs:service:DesiredCount"
#   min_capacity       = 1
#   max_capacity       = 5
# }

# resource "aws_appautoscaling_policy" "queue_service_scale_up" {
#   name               = "queue-service-scale-up"
#   service_namespace  = "ecs"
#   resource_id        = aws_appautoscaling_target.queue_service_target.resource_id
#   scalable_dimension = aws_appautoscaling_target.queue_service_target.scalable_dimension
#   policy_type        = "TargetTrackingScaling"

#   target_tracking_scaling_policy_configuration {
#     target_value       = 70.0
#     predefined_metric_specification {
#       predefined_metric_type = "ECSServiceAverageCPUUtilization"
#     }
#     scale_in_cooldown  = 300
#     scale_out_cooldown = 300
#   }
# }

# resource "aws_appautoscaling_policy" "queue_service_scale_down" {
#   name               = "queue-service-scale-down"
#   service_namespace  = "ecs"
#   resource_id        = aws_appautoscaling_target.queue_service_target.resource_id
#   scalable_dimension = aws_appautoscaling_target.queue_service_target.scalable_dimension
#   policy_type        = "TargetTrackingScaling"

#   target_tracking_scaling_policy_configuration {
#     target_value       = 30.0
#     predefined_metric_specification {
#       predefined_metric_type = "ECSServiceAverageCPUUtilization"
#     }
#     scale_in_cooldown  = 300
#     scale_out_cooldown = 300
#   }
# }

# # Auto Scaling for Buffer Service
# resource "aws_appautoscaling_target" "buffer_service_target" {
#   service_namespace  = "ecs"
#   resource_id        = "service/${aws_ecs_cluster.ticket_micro_cluster.name}/${aws_ecs_service.buffer_service.name}"
#   scalable_dimension = "ecs:service:DesiredCount"
#   min_capacity       = 1
#   max_capacity       = 5
# }

# resource "aws_appautoscaling_policy" "buffer_service_scale_up" {
#   name               = "buffer-service-scale-up"
#   service_namespace  = "ecs"
#   resource_id        = aws_appautoscaling_target.buffer_service_target.resource_id
#   scalable_dimension = aws_appautoscaling_target.buffer_service_target.scalable_dimension
#   policy_type        = "TargetTrackingScaling"

#   target_tracking_scaling_policy_configuration {
#     target_value       = 70.0
#     predefined_metric_specification {
#       predefined_metric_type = "ECSServiceAverageCPUUtilization"
#     }
#     scale_in_cooldown  = 300
#     scale_out_cooldown = 300
#   }
# }

# resource "aws_appautoscaling_policy" "buffer_service_scale_down" {
#   name               = "buffer-service-scale-down"
#   service_namespace  = "ecs"
#   resource_id        = aws_appautoscaling_target.buffer_service_target.resource_id
#   scalable_dimension = aws_appautoscaling_target.buffer_service_target.scalable_dimension
#   policy_type        = "TargetTrackingScaling"

#   target_tracking_scaling_policy_configuration {
#     target_value       = 30.0
#     predefined_metric_specification {
#       predefined_metric_type = "ECSServiceAverageCPUUtilization"
#     }
#     scale_in_cooldown  = 300
#     scale_out_cooldown = 300
#   }
# }

# # Auto Scaling for Purchase Service
# resource "aws_appautoscaling_target" "purchase_service_target" {
#   service_namespace  = "ecs"
#   resource_id        = "service/${aws_ecs_cluster.ticket_micro_cluster.name}/${aws_ecs_service.purchase_service.name}"
#   scalable_dimension = "ecs:service:DesiredCount"
#   min_capacity       = 1
#   max_capacity       = 5
# }

# resource "aws_appautoscaling_policy" "purchase_service_scale_up" {
#   name               = "purchase-service-scale-up"
#   service_namespace  = "ecs"
#   resource_id        = aws_appautoscaling_target.purchase_service_target.resource_id
#   scalable_dimension = aws_appautoscaling_target.purchase_service_target.scalable_dimension
#   policy_type        = "TargetTrackingScaling"

#   target_tracking_scaling_policy_configuration {
#     target_value       = 70.0
#     predefined_metric_specification {
#       predefined_metric_type = "ECSServiceAverageCPUUtilization"
#     }
#     scale_in_cooldown  = 300
#     scale_out_cooldown = 300
#   }
# }

# resource "aws_appautoscaling_policy" "purchase_service_scale_down" {
#   name               = "purchase-service-scale-down"
#   service_namespace  = "ecs"
#   resource_id        = aws_appautoscaling_target.purchase_service_target.resource_id
#   scalable_dimension = aws_appautoscaling_target.purchase_service_target.scalable_dimension
#   policy_type        = "TargetTrackingScaling"

#   target_tracking_scaling_policy_configuration {
#     target_value       = 30.0
#     predefined_metric_specification {
#       predefined_metric_type = "ECSServiceAverageCPUUtilization"
#     }
#     scale_in_cooldown  = 300
#     scale_out_cooldown = 300
#   }
# }