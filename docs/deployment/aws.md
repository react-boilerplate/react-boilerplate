# Deploying to AWS S3 - Cloudfront

### Deploying to S3 with 7 steps

_Step 1:_ Run `npm install` to install dependencies, then `npm run build` to create the `./build` folder.

_Step 2:_ Navigate to [AWS S3](https://aws.amazon.com/s3) and login (or sign up if you don't have an account). Click on `Services` followed by `S3` in the dropdown.

_Step 3:_ Click on `Create Bucket` and fill out both your `Bucket Name` and `Region` (for the USA we recommend `US Standard`). Click `Next` till the `Set Permissions` section and remove the tick from `Block all public access` (in order to make objects public). Click `Create` to create your bucket.

_Step 4:_ To make the bucket objects publicly viewable, go into the bucket, then `Permissions` (on the top bar) -> `Bucket Policy`. Copy paste this (change `[BUCKET_NAME]` with your own bucket name)

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::[BUCKET_NAME]/*"
        }
    ]
}
```

_Step 5:_ Go to `Properties`. Click on the `Static Website Hosting` accordion where you should see the URL (or _endpoint_) of your website (ie. example.s3-website-us-east-1.amazonaws.com). Click `Enable website hosting` and fill in both the `Index document` and `Error document` input fields with `index.html`. Click `Save`.

_Step 6:_ Click on your new S3 bucket on the left to open the bucket. Click `Upload` and select all the files within your `./build` folder. Click `Start Upload`. You can easily automate the deployment with a single [helper script](https://gist.github.com/Can-Sahin/d7de7e2ff5c1a39b82ced2d9bd7c60ae) that uses `aws-cli`. Running the shell script with necessary permissions on `AWS` will take care of all the issues mentioned in `IMPORTANT ⚠️` below

_Step 7:_ Click on the `Properties` tab, open `Static Website Hosting`, and click on the _Endpoint_ link. The app should be running on that URL.

> IMPORTANT ⚠️
>
> S3 objects' `Cache-Control` metadata can cause problems on deployments, such like not serving the new `index.html` file but returning the cached one. This might result in users not getting the recently deployed web app. Since the `index.html` and `sw.js` files are the initially loaded files (all the js bundles and chunks comes later depending on these two files) adjusting the `Cache-Control` metadata is suggested after deployments for these two files. To do so, go to the file, then `Properties` -> `Metadata`. Add `max-age=0,no-cache,no-store,must-revalidate` to the key `Cache-Control`

### Cloudfront for HTTPS and GZIP

_HTTPS_: `S3` serves only `HTTP`, so for `HTTPS` you can use `Cloudfront`. Setting up `Cloudfront` is a bit longer than `S3 Static Website Hosting`. Therefore follow [AWS Instructions](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/) - follow the second configuration steps (Using a website endpoint as the origin with anonymous (public) access allowed) -
to set a `Cloudfront` distribution using your `S3 Website`.

> Note: SPA applications handles routing inside the client, so, pages like `/about` is unknown to the `Cloudfront` (its configured as always returning `index.html` file in `S3 Bucket`). To prevent `404 Not Found` responses, after setting up your Cloudfront Distribution, go to the `Error Pages` then `Create Custom Error Response` which you will map `404` code to `200`.

_GZIP Compression_: Enabling gzip can reduce chunk sizes dramatically and improve loading performance greatly. To enable gzip with `Cloudfront` navigate to your distribution then `Behaviors` -> `Edit` -> `Compress Objects Automatically`. Mark `Yes`. This alone **isn't enough**. You must update your `S3 Bucket CORS Configuration` to send `Content-Length` header by adding `<AllowedHeader>Content-Length</AllowedHeader>` in a [CORSRule](https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html).
