#!/bin/bash
    
# Parameters
project_name=xpto
table_name=$project_name
lambda_function_name="$project_name"
bucket_name="worker.$lambda_function_name"
apigateway_name="$project_name"

# Configs
region=us-east-1
account=806119673741

# Create DynamoDB Table
# db_output=$(aws dynamodb create-table \
#     --table-name $table_name \
#     --attribute-definitions AttributeName=id,AttributeType=S \
#     --key-schema AttributeName=id,KeyType=HASH  \
#     --billing-mode PAY_PER_REQUEST )
# echo "DynamoDB Table $table_name created with success."

# Create a S3 Bucket to store Lambda function code and Uploading
aws s3 mb --region $region s3://$bucket_name
aws s3 cp --region $region index.zip s3://$bucket_name/index.zip

# Create AWS Lambda Function with Permissions
lambda_output=$(aws lambda create-function \
--region $region  \
--function-name $lambda_function_name \
 --runtime nodejs18.x  \
 --handler index.handler \
 --role arn:aws:iam::$account:role/lambda \
 --code S3Bucket=$bucket_name,S3Key=index.zip)
lambda_arn=$(echo "$lambda_output" | jq -r '.FunctionArn')
echo "Lambda Funtion created with success."

# Create AWS Lambda URL and Cors Configurations
lambdaURLCors_output=$(aws lambda create-function-url-config \
--function-name $lambda_function_name \
--auth-type 'NONE' \
--region $region \
--cors '{
  "AllowCredentials": false,
  "AllowHeaders": ["*"],
  "AllowMethods": ["*"],
  "AllowOrigins": ["*"],
  "ExposeHeaders": ["*"]
}')
echo "Lambda Funtion URL created with success."

# Add URL Permition
lambdaURLPermition_output=$(aws lambda add-permission \
--function-name $lambda_function_name \
--region $region \
--statement-id FunctionURLAllowPublicAccess \
--action lambda:InvokeFunction \
--principal '*' \
--source-arn "arn:aws:execute-api:$region:$account:*")
echo "Lambda Funtion URL Permition setup success."


# Create API Gateway
# apigateway_output=$(aws apigatewayv2 create-api \
#   --name $apigateway_name \
#   --protocol-type HTTP)
# api_id=$(echo "$apigateway_output" | jq -r '.ApiId')
# integration_output=$(aws apigatewayv2 create-integration \
#     --api-id $api_id \
#     --integration-type AWS_PROXY \
#     --integration-uri $lambda_arn \
#     --payload-format-version 2.0)
# integration_id=$(echo "$integration_output" | jq -r '.IntegrationId')
# echo "Api Gateway Integration $integration_id created with success."
# route_output=$(aws apigatewayv2 create-route \
#     --api-id $api_id \
#     --route-key 'ANY /{proxy+}' \
#     --target "integrations/$integration_id")
# echo "Api Gateway Route created with success."
# cors_output=$(aws apigatewayv2 update-api \
#   --api-id $api_id \
#   --cors-configuration AllowOrigins="*",AllowMethods="*",AllowHeaders="origin,x-requested-with,content-type,accept",ExposeHeaders="" )
# echo "Api Gateway Cors created with success."
# stage_output=$(aws apigatewayv2 create-stage \
#   --api-id $api_id \
#   --stage-name '$default' \
#   --auto-deploy)
# api_endpoint=$(echo "$cors_output" | jq -r '.ApiEndpoint')
# echo "Api Gateway $api_endpoint created with success."