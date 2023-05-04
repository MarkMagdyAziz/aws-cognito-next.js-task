This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### AWS Cognito Next.js

This is a Next.js application that uses AWS Cognito for user authentication and authorization.

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

[http://localhost:3000/api/hello](http://localhost:3000/api/hello) is an endpoint that uses [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers). This endpoint can be edited in `app/api/hello/route.js`.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
