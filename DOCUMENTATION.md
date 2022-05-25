# Eagles Documentation

## Configuration

**Vault Vision Configuration [Visit Vault Vision](https://manage.vaultvision.com/register)**

1. Create a [new user account at Vault Vision](https://manage.vaultvision.com/register) then complete the 'Getting Started' Wizard.  Accepting all the defaults will allow you to run this boilerplate locally.  Make sure you select a 'Single Page Application' as the type of application during setup

2. At the end of the 'Getting Started' Wizard you will be shown the proper environment variables, copy-paste or download and save them into the .env file at the root of this project.  These environment variables should match the same structure shown in the .env-example file at the root of this project.

## Installation

How to install boilerplate

  ```bash
   git clone https://github.com/vaultvision/react-boilerplate-vv.git
   # change directory
   cd react-boilerplate-vv
   # install dependencies
   npm install --legacy-peer-deps
   
   # start application
   npm start
   ```


**React Configuration**
1. create a new .env file using the .env-example with the [values from Vault Vision](https://manage.vaultvision.com/go#applications)
2. Replace each variable with necessary values

```bash
#.env example
# VV_AUTHORITY : tenant url
VV_AUTHORITY = 
# VV_CLIENT_ID: application client id
VV_CLIENT_ID =
# VV_CALLBACK_URI: specified callback uri after authentication 
# make sure to add url in your application callback url field
VV_CALLBACK_URI =
# VV_POST_LOGOUT_URI: specified redirect uri after logout
VV_POST_LOGOUT_URI =
```

In **app.js**
wrap the pages and/or routes with the PrivateRoute Component

**Example**

```bash
        {/** gets all request to /dashboard and renders the dashboardPage, and requires auth */}
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        {/** gets all request to /profile and renders the profilePage, and requires auth */}
        <PrivateRoute path="/profile" component={Profile} />
        {/** The /oidc/callback route is what will receive the 
```

## How to see your new React application now with user authentication from Vault Vision
1. visit https://localhost:3000
2. Click on login and get redirected to vault vision authentication page
3. After successful authentication you would be redirected to specified **Callback URI**



