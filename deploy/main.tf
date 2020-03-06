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

resource "aws_route53_record" "dns" {
  zone_id = "${data.aws_route53_zone.submitteddenied.zone_id}"
  name    = "demos.submitteddenied.com"
  type    = "CNAME"
  ttl     = "300"
  records = ["${aws_s3_bucket.static-hosting.website_domain}"]
}

data "aws_route53_zone" "submitteddenied" {
  name         = "submitteddenied.com."
}