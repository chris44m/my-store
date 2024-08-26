const express = require('express');

const OrderServices = require('../services/orderServices')
const validatorHandler = require('./../middlewares/validatorHandler')
const { getOrderSchema, createOrderSchema, addItemSchema } = require('./../schemas/orderSchema')


const router = express.Router();
const service = new OrderServices();

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res) => {
    const body = req.body
    const newOrder = await service.create(body)
    res.status(201).json(newOrder);
  })

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  })

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res) => {
    const body = req.body
    const newItem = await service.addItem(body)
    res.status(201).json(newItem);
  })

module.exports = router;
