#!/bin/bash

# Update S3 Code
aws s3 cp index.zip s3://workerfunc1/index.zip

# Update Lambda
aws lambda update-function-code \
    --region us-east-1 \
    --function-name func1 \
    --s3-bucket workerfunc1 \
    --s3-key index.zip
