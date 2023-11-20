#!/bin/bash


# Remove S3
aws s3 rb s3://NOME_DO_BUCKET --force

# API Gateway
 aws apigatewayv2 get-apis | grep -E '"ApiEndpoint"|"Name"|"ApiId"'
 aws apigatewayv2 delete-api \
  --api-id SEU-API-ID

# Lambda
aws lambda list-functions | grep FunctionName
aws lambda delete-function --function-name NOME_DA_FUNCAO
