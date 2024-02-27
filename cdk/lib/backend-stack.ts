import {
    CfnOutput,
    Duration,
    Expiration,
    Stack,
    StackProps,
  } from "aws-cdk-lib";
  import { IUserPool } from "aws-cdk-lib/aws-cognito";
  import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
  import {
    AuthorizationType,
    FieldLogLevel,
    GraphqlApi,
    Schema,
    UserPoolDefaultAction,
  } from "@aws-cdk/aws-appsync-alpha";
  import {
    Code,
    Function as LambdaFunction,
    Runtime,
  } from "aws-cdk-lib/aws-lambda";
import { Effect, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
  
  interface BackendStackProps extends StackProps {
    readonly userPool: IUserPool;
  }
  
  export class BackendStack extends Stack {
    constructor(parent: Stack, id: string, props: BackendStackProps) {
      super(parent, id, props);
  
      const flowchartSiteTable = new Table(this, "FlowChartSiteTable", {
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: {
          name: "PK",
          type: AttributeType.STRING,
        },
        sortKey: {
          name: "SK",
          type: AttributeType.STRING,
        },
      });
      new CfnOutput(this, "FlowChartSiteTableName", {
        value: flowchartSiteTable.tableName,
      });
  
      const flowchartSiteLambda = new LambdaFunction(this, "FlowChartSiteLambda", {
        runtime: Runtime.NODEJS_18_X,
        handler: "main.handler",
        code: Code.fromAsset("lambda"),
        memorySize: 512,
        environment: {
          // FlowChart Table
          FLOWCHART_TABLE: flowchartSiteTable.tableName,
        },
      });
      flowchartSiteTable.grantFullAccess(flowchartSiteLambda);
  
      // const snsLambda = new LambdaFunction(this, "PreSignupLambda", {
      //   runtime: Runtime.NODEJS_18_X,
      //   handler: "presignupTrigger.handler",
      //   code: Code.fromAsset("lambda"),
      //   memorySize: 512,
      // });

      const api = new GraphqlApi(this, "FlowchartSiteGraphQL", {
        name: "flowchart-site",
        schema: Schema.fromAsset("./graphql/schema.graphql"),
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: AuthorizationType.API_KEY,
            apiKeyConfig: {
              expires: Expiration.after(Duration.days(365)),
            },
          },
          additionalAuthorizationModes: [
            {
              authorizationType: AuthorizationType.USER_POOL,
              userPoolConfig: {
                userPool: props.userPool,
                appIdClientRegex: ".*",
                defaultAction: UserPoolDefaultAction.ALLOW,
              },
            },
          ],
        },
        logConfig: {
          fieldLogLevel: FieldLogLevel.ERROR,
        },
        xrayEnabled: false,
      });
  
      // Prints out the AppSync GraphQL endpoint to the terminal
      new CfnOutput(this, "FlowChartSiteGraphQLAPIURL", {
        value: api.graphqlUrl,
      });
  
      // Prints out the AppSync GraphQL API key to the terminal
      new CfnOutput(this, "FlowChartSiteGraphQLAPIKey", {
        value: api.apiKey || "",
      });
  
      // Prints out the stack region to the terminal
      new CfnOutput(this, "Stack Region", {
        value: this.region,
      });

      // Define the IAM role for the AppSync DataSource
      const appSyncDataSourceRole = new Role(this, 'AppSyncDataSourceRole', {
        assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
      });
  
      // Attach the necessary policy statement to the role
      appSyncDataSourceRole.addToPolicy(new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['lambda:InvokeFunction'], 
        resources: [flowchartSiteLambda.functionArn],
      }));
      
      appSyncDataSourceRole.addToPolicy(new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['dynamodb:UpdateItem'], 
        resources: [flowchartSiteTable.tableArn],
      }));

      const flowchartSiteDataSource = api.addLambdaDataSource(
        "FlowchartSiteDataSource",
        flowchartSiteLambda
      );

      // Resolvers
    
    }
  }