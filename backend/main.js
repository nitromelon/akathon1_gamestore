import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const app = express();
const port = process.env.PORT || '3000';

app.disable('x-powered-by');

app.use(express.json());

app.get('/', (_req, res) => {
	res.status(403).json({
		message: 'Invalid route'
	});
});

// get all route start after /api. Then console log the route
app.get('/api/*', (req, res) => {
	console.log(req.originalUrl);
	res.status(200).json({
		message: 'Hello from the API',
		answer: req.originalUrl,
	});
});

app.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
	console.log('Press Ctrl+C to quit.');
});
