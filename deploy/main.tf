variable "cred_file_path" {
  default = "../firebase-auth.json"
}

provider "aws" {
  version = "~> 2.0"
  region  = "us-east-1"
}

resource "aws_s3_bucket" "static-hosting" {
  bucket = "demos.submitteddenied.com"
  acl    = "public-read"
  policy = file("policy.json")

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "demo-api"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

locals {
  cred_file = "creds.json"
}

resource "aws_lambda_function" "api_lambda" {
  filename      = data.archive_file.lambda-code.output_path
  function_name = "demo-counter-api"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "main.handler"

  source_code_hash = data.archive_file.lambda-code.output_base64sha256

  runtime = "nodejs12.x"
  timeout = 10 #seconds

  environment {
    variables = {
      CRED_FILE = "./${local.cred_file}"
    }
  }
}

data "archive_file" "lambda-code" {
  type = "zip"
  output_path = "../dist/backend/lambda.zip"

  source {
    content = file("../dist/backend/main.js")
    filename = "main.js"
  }

  source {
    content = file(var.cred_file_path)
    filename = local.cred_file
  }
}