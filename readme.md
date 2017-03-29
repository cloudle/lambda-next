# Basic idea:
Aws lambda targeted's graphql endpoint which write on Es6+ and could be locally emulate/ tested on lighting fast speed.

## Scripts:
- "npm start" for watch and build lambda bundle (which executed by aws lambda).
- "npm test" for testing schema offline (run essential '{ greeting }' query)
- "npm run test-live" watched version of "npm test"

## Features
- [x] It should support Es2015 stuffs on Node.js runtime (transpiled).
- [x] It should be able to test locally *\*need more work**.
- [ ] It support advanced Graphiql endpoint which support multiple session. 
- [ ] It could emulate DynamoDB locally. 
- [ ] It could emulate Graphql execution context locally. 
- [ ] It could do publish/subscribe stuff.