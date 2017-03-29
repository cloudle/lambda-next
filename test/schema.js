const { execute } = require('../service/src');

execute(`{greeting}`)
	.then(response => console.log(response))
	.catch(error => console.log(error));