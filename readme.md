# Basic idea:
Aws lambda targeted's graphql endpoint which write on Es6+ and could be locally emulate/test on lighting fast speed.

## Scripts:
- "npm start" for watch and build lambda bundle (which executed by aws lambda).
- "npm run emulate" for hot emulating lambda locally.
- "npm run client" to run client app (browser) locally.
- "npm test" for testing schema offline (run essential '{ greeting }' query)
- "npm run test-live" watched version of "npm test"

## Features
- [x] It should support Es2015 stuffs on Node.js runtime (transpiled).
- [x] It should be able to test locally! (emulate Lambda, Graphql execution)
- [x] It support advanced GraphiQl endpoint which allow multiple session.  
- [x] It could hot inject code updates to local server (no need restart).
- [x] It could emulate Redis (ElastiCache) locally using production lambda code.
- [x] It could emulate Aws IOT pub/sub from local run!
- [ ] It could emulate DynamoDB locally using lambda production code.
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
- http://docs.aws.amazon.com/lambda/latest/dg/vpc-ec.html
- http://docs.aws.amazon.com/AmazonElastiCache/latest/UserGuide/GettingStarted.AuthorizeAccess.html#GettingStarted.AuthorizeAccess.VPC

## Referenced articles
- http://dev.classmethod.jp/cloud/aws/aws-iot-mqtt-over-websocket/
- https://github.com/robzhu/graphql/blob/62ea0d48beef1fca6707ec4b49a975dc700273ac/rfcs/Subscriptions.md
- https://dev-blog.apollodata.com/a-proposal-for-graphql-subscriptions-1d89b1934c18

#Configures VPC for internet connection! (first link work for me)
- https://gist.github.com/reggi/dc5f2620b7b4f515e68e46255ac042a7
- https://medium.com/@philippholly/aws-lambda-enable-outgoing-internet-access-within-vpc-8dd250e11e12
- https://www.youtube.com/watch?v=TlHZBlRpXyU