# Deploy to Azure

### Easy 3-Step Deployment Process

_Step 1:_ Within Azure Portal, add a 'Web App' resource to your resource group. Select the appropriate version of Node (i.e. 10.14) and verify that the operating system is set to Linux to ensure that Node is being run natively and not via IIS (iisnode). Note that several of the quick start guides (such as https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-nodejs) result in a Windows + IIS Node configuration that is incompatible with react-boilerplate.

_Step 2:_ When the resource has finished deploying, go to its deployment center and select Local Git (other methods will work as well but the rest of these steps assume this approach) and 'App Service' for the build provider. Note the Git Clone Uri that is presented when the wizard is finished.

_Step 3:_ Within the root of your react-boilerplate source folder, execute the following commands to publish to Azure:

1.  `git remote add azure https://YOUR_RESOURCE_NAME.scm.azurewebsites.net:443/YOUR_RESOURCE_NAME.git`
2.  `git add .`
3.  `git commit -m 'Made some epic changes as per usual'`
4.  `git push azure master`
