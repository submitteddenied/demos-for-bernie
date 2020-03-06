#!/bin/bash

tf apply -auto-approve

cd .. #up to workspace dir

rm -rf dist

npm run build

cd dist/frontend

aws s3 sync . s3://demos.submitteddenied.com/ --delete