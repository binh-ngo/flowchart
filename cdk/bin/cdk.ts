#!/usr/bin/env node
import { App, Environment, Stack, StackProps } from 'aws-cdk-lib';
import { FrontendStack } from '../lib/frontend-stack';
import { CognitoStack } from '../lib/cognito-stack';
import { BackendStack } from '../lib/backend-stack';
require("dotenv").config({ path: '.env' });

const app = new App();

class FlowChartStack extends Stack {
  constructor(parent: App, name: string, props: StackProps) {
    super(parent, name, props);

    new FrontendStack(this, 'FrontendStack', {
      env: props.env as Environment,
    });

    const cognito = new CognitoStack(this, "CognitoStack", {
      env: props.env as Environment,
    });

    new BackendStack(this, "FlowChartBackendStack", {
      env: props.env as Environment,
      userPool: cognito.userPool,
    });
  }
}

new FlowChartStack(app, 'FlowChart', {
  env: {
    region: process.env.REGION,
    account: process.env.AWS_ACCOUNT,
  },
});