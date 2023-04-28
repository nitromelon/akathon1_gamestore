import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const app = express();
const port = process.env.PORT;

app.disable('x-powered-by');

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!').json();
});

app.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
	console.log('Press Ctrl+C to quit.');
});
