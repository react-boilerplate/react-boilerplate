#!/bin/bash

# Deploys the website to s3 
#
# arguments: TYPE (clean-deploy) URL (example.com), REGION (us-west-1) PROFILE [optional] (aws_cli_profile_name)
# 
# TYPE options:
# - create-deploy: creates and configures a new bucket
# - clean-deploy: removes all files before uploading new files
# - upload-files: adds files, does not clean existing files
#
# Requires aws cli v2 to be installed and configured with an active IAM role
# https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
# https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html
# https://docs.aws.amazon.com/IAM/latest/UserGuide/id.html
#
#  Actions:
#  - Creates a bucket named $URL ($TYPE create-build) or removes all files from bucket ($TYPE clean-build)
#  - Sets bucket policy to allow public access
#  - uploads all files from ../build
#  - configures s3 website
# 
# (BucketAlreadyOwnedByYou) error can be ignored if there are no other errors
# 
# Adapted from: https://blog.eq8.eu/til/create-aws-s3-bucket-as-static-website-with-cli.html
#
# To remove the website and delete the bucket, see:
# Emptying a bucket: https://docs.aws.amazon.com/AmazonS3/latest/userguide/empty-bucket.html
# Deleting a bucket: https://docs.aws.amazon.com/AmazonS3/latest/userguide/delete-bucket.html

TYPE=$1
URL=$2
REGION=$3
PROFILE=$4

AWS_DIRECTORY=`dirname $0`;
cd $AWS_DIRECTORY;

echo "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
        {
            \"Sid\": \"PublicReadGetObject\",
            \"Effect\": \"Allow\",
            \"Principal\": \"*\",
            \"Action\": \"s3:GetObject\",
            \"Resource\": \"arn:aws:s3:::${URL}/*\"
        }
    ]
}" > s3_bucket_policy.json;

if [ -z "$URL" ] & [ -z "$REGION" ]; then
  echo "ERROR: \$1 URL and \$2 REGION are required.";
  exit 1;
fi

BUILD_CONTENTS=$(ls ../build)

if [ -z "$BUILD_CONTENTS" ]; then
  echo "ERROR: npm run build first";
  exit 1;
fi

if [ -z "$PROFILE" ]; then
  if [[ "$TYPE" == "create-build" ]]; then  # see https://stackoverflow.com/questions/4277665/how-do-i-compare-two-string-variables-in-an-if-statement-in-bash
    aws s3api create-bucket --bucket $URL --region $REGION  --create-bucket-configuration LocationConstraint=$REGION
  elif [[ "$TYPE" == "clean-build" ]]; then
    aws s3 rm s3://$URL --recursive
  fi
  aws s3api put-bucket-policy --bucket $URL --policy file://s3_bucket_policy.json \
  && aws s3 sync ../build/ s3://$URL/ \
  && aws s3 website s3://$URL --index-document index.html --error-document error.html;
else 
  if [[ "$TYPE" == "create-build" ]]; then
    aws s3api create-bucket --bucket $URL --region $REGION  --create-bucket-configuration LocationConstraint=$REGION --profile $PROFILE
  elif [[ "$TYPE" == "clean-build" ]]; then
    aws s3 rm s3://$URL --recursive --profile $PROFILE
  fi
  aws s3api put-bucket-policy --bucket $URL --policy file://s3_bucket_policy.json --profile $PROFILE \
  && aws s3 sync ../build/ s3://$URL/ --profile $PROFILE \
  && aws s3 website s3://$URL --index-document index.html --error-document error.html --profile $PROFILE;
fi

echo "Finished attempted deploy to: http://$URL.s3-website-$REGION.amazonaws.com"
echo "If there are no error messages, this has succeeded. (BucketAlreadyOwnedByYou) can be ignored if the bucket already existed."
