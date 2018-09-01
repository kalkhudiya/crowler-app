const express = require('express');
const { formClient } = require('../helpers/validation');
const { client } = require('../controllers/client');

const router = express.Router();
router.get('/', client.getClients);
router.get('/:id', client.getClient);
router.post('/', formClient, client.addClient);
router.put('/:id', formClient, client.editClient);
router.delete('/:id', client.deleteClient);

module.exports = router;
