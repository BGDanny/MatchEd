#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { FrontEndStage } from "./stage"

const app = new App();

new FrontEndStage(app, "Matched", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1"
  },
})
