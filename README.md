This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### AWS Cognito Next.js

This is a Next.js application that uses AWS Cognito for user authentication and authorization.
## Check out the live deployment

<a href="https://deploy-preview-5--remarkable-chimera-37a6a8.netlify.app/signup">https://deploy-preview-5--remarkable-chimera-37a6a8.netlify.app/signup</a>

<a href="https://aws-cognito-next-js-task-7h5c-markmagdyaziz.vercel.app/">https://aws-cognito-next-js-task-7h5c-markmagdyaziz.vercel.app/</a>
## Overview
This application includes the following pages:
* /: The main page of the application.
* /login: The login page of the application.
* /signup: The signup page of the application.
* /verify: The email verification page of the application.
* /forgot-password: The forgot password page of the application.
* /reset-password: The reset password page of the application.
* /change-password: The change password page of the application.

## Getting Started
To get started with this application, you will need to set up an AWS Cognito user pool and client in your AWS account. Once you have done this, you will need to configure the following environment variables

```shell
AWS_REGION=<your_aws_region>
AWS_COGNITO_USER_POOL_ID=<your_aws_cognito_user_pool_id>
AWS_COGNITO_CLIENT_ID=<your_aws_cognito_client_id>
```
### Install npm packages
Install the npm packages described in the package.json and verify that it works:

```shell
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

