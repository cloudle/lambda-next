import express from 'express';
import bodyParser from 'body-parser';
import { execute } from '../src/index';
import cors from 'cors';

const router = express.Router();

router.use('/api', cors(), bodyParser.json(), (req, res) => {
	const { query, variables } = req.body;

	return execute(query, variables, {})
		.then(result => {
			res.json(result);
		}).catch(error => {
			res.json(error);
		});
});

module.exports = router;