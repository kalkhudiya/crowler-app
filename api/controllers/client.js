const mongo = require('mongodb');
const { MongoClient } = require('mongodb');
const { validationResult } = require('express-validator/check');
const config = require('../../config');

let db;
MongoClient.connect(config.dbUrl, { useNewUrlParser: true }, (err, client) => {
  if (!err && client) {
    db = client.db(config.dbName);
  }
});

class Client {
  async getClients(req, res) {
    try {
      const output = [];
      let resp = [], total = null;
      if (req.query.q) {
        resp = await db.collection('clients').find({
          $text: { $search: req.query.q },
        });
      } else if (req.query.page) {
        const skip = (parseInt(req.query.page) - 1) * 100;
        resp = await db.collection('clients').find().skip(skip).limit(100);
      } else {
        total = await db.collection('clients').count({});
        resp = await db.collection('clients').find({}).limit(100);
      }
      resp.each((err, doc) => {
        if (doc) {
          output.push(doc);
        } else {
          res.json({
            result: output,
            total,
          });
        }
      });
    } catch (e) {
      res.json({
        error: true,
        message: e.message,
      });
    }
  }

  async addClient(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const addRec = await db.collection('clients').insertOne({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        company: req.body.company,
        zip: req.body.zip,
      });
      res.json({
        done: true,
        id: addRec.insertedId
      });
    } catch (e) {
      res.json({
        error: true,
      });
    }
  }

  async getClient(req, res) {
    const id = new mongo.ObjectID(req.params.id);
    try {
      const resp = await db.collection('clients').findOne({
        _id: id,
      });
      res.json(resp);
    } catch (e) {
      res.json({
        error: true,
      });
    }
  }

  async editClient(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const id = new mongo.ObjectID(req.params.id);
    try {
      await db.collection('clients').findOneAndReplace(
        { _id: id },
        {
          $set: {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            company: req.body.company,
            zip: req.body.zip,
          },
        },
      );
      res.json({
        success: true,
      });
    } catch (e) {
      res.json({
        error: true,
      });
    }
  }

  async deleteClient(req, res) {
    const id = new mongo.ObjectID(req.params.id);
    try {
      await db.collection('clients').remove({
        _id: id,
      });
      res.json({
        deleted: true,
      });
    } catch (e) {
      res.json({
        error: true,
      });
    }
  }
}

module.exports = {
  client: new Client(),
};
