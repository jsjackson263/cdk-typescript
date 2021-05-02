#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkTypescriptStack } from '../lib/cdk-typescript-stack';

const app = new cdk.App();
new CdkTypescriptStack(app, 'CdkTypescriptStack');
