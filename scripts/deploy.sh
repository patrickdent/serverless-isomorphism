#!/usr/bin/env bash
cd dist

echo "Deploying assets ..."
echo ""
gsutil cp "./browser.js" gs://todo-assets/browser.js
gsutil acl ch -u AllUsers:R gs://todo-assets/browser.js

echo "Deploying functions ..."
echo ""
gcloud beta functions deploy todo --runtime nodejs8 --trigger-http

cd ..
