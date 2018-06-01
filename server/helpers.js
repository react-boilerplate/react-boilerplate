const extractNameFromUrl = (url) => {
  const split = url.split('/');
  return split[split.length - 1];
};

const generateAwsParams = (name, bucket, data) => {
  const params = {
    Key: name,
    Bucket: bucket,
  };
  if (data) {
    params.Body = data;
    params.ACL = 'public-read';
  }
  return params;
};

module.exports = {
  extractNameFromUrl,
  generateAwsParams,
};
