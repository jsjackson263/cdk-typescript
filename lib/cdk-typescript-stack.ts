import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import { HitCounter } from './hitcounter';

export class CdkTypescriptStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //define an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHander', {
      runtime: lambda.Runtime.NODEJS_10_X,  //execution environment
      code: lambda.Code.fromAsset('lambda'), //code loaded from "lambda" directory
      handler: 'hello.handler'  //file name is "hello", function name is "handler"
    });
 
    // the hitcounter
    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    });

    //define an API Gateway REST API resource backed by our "hello" function
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler
    });

  }
}
