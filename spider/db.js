const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

class DB {
	constructor() {
		this.dbUrl = config.dbUrl;
		this.dbName = config.dbName;
	}

	async insertToDb(records, cb) {
		const client = await MongoClient.connect(this.dbUrl, { useNewUrlParser: true });
		const collection = client.db(this.dbName).collection('clients');
		try {
			const res = await collection.insertMany(records);
			cb(null, res);
		} catch(e) {
			cb(e, null);
		} finally {
			client.close();
		}
	}
	async addIndex () {
		const client = await MongoClient.connect(this.dbUrl, { useNewUrlParser: true });
		const collection = client.db(this.dbName).collection('clients');
		collection.createIndex({
			name: "text",
			phone: "text",
			email: "text",
			company: "text",
			zip: "text"
		});
		client.close();
	}
}

module.exports = DB;