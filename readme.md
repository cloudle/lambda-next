# Basic idea:
Aws lambda targeted's graphql endpoint which write on Es6+ and could be locally emulate/test on lighting fast speed.

## Scripts:
- "npm start" for watch and build lambda bundle (which executed by aws lambda).
- "npm run client" to run client app (browser) locally.
- "npm test" for testing schema offline (run essential '{ greeting }' query)
- "npm run test-live" watched version of "npm test"

## Features
- [x] It should support Es2015 stuffs on Node.js runtime (transpiled).
- [x] It should be able to test locally *\*need more work**.
- [x] It support advanced Graphiql endpoint which allow multiple session. 
- [ ] It could emulate DynamoDB locally. 
- [x] It could emulate Graphql execution context locally. 
- [ ] It could do publish/subscribe stuff.

## For web Clients (React.js)
Run following command to get it run..
* `npm run vendor` make the rebuild lighting fast (under 200ms).
 
```
  npm install 
  npm run vendor
  npm run client
```

## ElastiCache check list:
- Create elasticCache (Redis)
- Configure VPC group for serverless (Lambda need this to connect to ElastiCache)

## Referenced articles
- http://dev.classmethod.jp/cloud/aws/aws-iot-mqtt-over-websocket/
- https://github.com/robzhu/graphql/blob/62ea0d48beef1fca6707ec4b49a975dc700273ac/rfcs/Subscriptions.md
- https://dev-blog.apollodata.com/a-proposal-for-graphql-subscriptions-1d89b1934c18
