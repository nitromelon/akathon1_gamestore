import { Client } from 'cassandra-driver';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
	const client = new Client({
		cloud: {
			secureConnectBundle: './private/secure-connect-akathon.zip'
		},
		credentials: {
			username: process.env.SERVER_USERNAME,
			password: process.env.SERVER_PASSWORD
		}
	});

	await client.connect();

	// Execute a query
	const rs = await client.execute('SELECT * FROM system.local');
	console.log(`${rs}`);

	await client.shutdown();
}

// Run the async function
run();
