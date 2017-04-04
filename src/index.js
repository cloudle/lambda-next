import { graphql as runGraphQl } from 'graphql';
import schema from './graphql';

export function greeting (event, context, callback) {
	const clientId = event.headers['clientId'];

	const response = {
		statusCode: 200,
		body: JSON.stringify({
			message: 'Go Serverless v1.1! Your function executed successfully!',
			root: { clientId },
			input: event,
		}),
	};

	callback(null, response);
}

export function graphql (event, context, callback) {
	const body = JSON.parse(event.body),
		clientId = event.headers['clientid'] || event.headers['clientId'];

	execute(body.query, body.variables, { clientId, })
		.then(response => {
			console.log("Success", response);
			callback(null, createResponse(200, response))
		})
		.catch(error => {
			const statusCode = error.responseStatusCode || 500,
				errorMessage = error.message || 'Internal server error';

			console.log("Error", error);
			callback(null, createResponse(statusCode, { message: errorMessage }));
		});
}

export function execute (query, variables = {}, rootValues = {}) {
	//schema, query, root, ctx, variables
	return runGraphQl(schema, query, rootValues, {}, variables);
}

export function createResponse (statusCode, body) {
	return {
		statusCode,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
		},
		body: JSON.stringify(body),
	}
}