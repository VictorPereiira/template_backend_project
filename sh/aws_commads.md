# S3
aws s3 ls
aws s3 rb s3://NOME_DO_BUCKET --force

# API Gateway
aws apigatewayv2 get-apis --query "Items[*].[ApiId,Name]" --output table
 aws apigatewayv2 delete-api \
  --api-id SEU-API-ID

# Lambda
aws lambda list-functions | grep FunctionName
aws lambda delete-function --function-name NOME_DA_FUNCAO


# DyanomoDb
aws dynamodb list-tables
aws dynamodb delete-table --table-name TABLE_NAME