import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

export const app = express();
const port = process.env.PORT | '9000';

app.disable('x-powered-by');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello World!').json();
});

app.post('/product/search', (req, res) => {
	console.log(req.body);
	const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone = req.body.phonenumber;
    const address = req.body.address;
    const username = req.body.username;
	console.log(firstname, lastname, phone, address, username);
	res.send({ tjay: 'sup' }).json();
});

app.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
	console.log('Press Ctrl+C to quit.');
});
