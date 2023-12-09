# resource "aws_s3_bucket" "lb_access_logs" {
#   bucket = "my-loadbalancer-logs-bucket" # Replace with your desired bucket name

#   # AWS now recommends using policies instead of ACLs for new buckets
#   # You can remove the ACL line if you're working with new S3 bucket settings

#   lifecycle {
#     prevent_destroy = true
#   }
# }

# # As of newer AWS updates, this might be no longer necessary.
# # If you're still required to use it, make sure you have the proper permissions.
# # Otherwise, if you receive an error regarding ACLs being unsupported, you can safely remove this resource.
# resource "aws_s3_bucket_acl" "lb_access_logs_acl" {
#   count  = length(contains(tolist(local.s3_bucket_expected_features), "acl") ? [1] : [])
#   bucket = aws_s3_bucket.lb_access_logs.id
#   acl    = "private"
# }

# resource "aws_s3_bucket_policy" "lb_access_logs_policy" {
#   bucket = aws_s3_bucket.lb_access_logs.id
#   policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [
#       {
#         Effect = "Allow",
#         Action = "s3:PutObject",
#         Resource = "${aws_s3_bucket.lb_access_logs.arn}/*",
#         Principal = {
#           Service = "elasticloadbalancing.amazonaws.com"
#         },
#         # Include a condition to ensure the source is the ALB
#         Condition = {
#           StringEquals = {
#             "s3:x-amz-acl" = "bucket-owner-full-control"
#           }
#         }
#       },
#       {
#         Effect = "Allow",
#         Action = "s3:GetBucketAcl",
#         Resource = aws_s3_bucket.lb_access_logs.arn,
#         Principal = {
#           Service = "elasticloadbalancing.amazonaws.com"
#         }
#       }
#     ]
#   })
# }