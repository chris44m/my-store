const express = require('express');

const customerServices = require('../services/customerServices')
const validationHandler = require('../middlewares/validatorHandler')

const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customerSchema')

const router = express.Router()
const service = new customerServices();


router.get('/', async (req, res) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  })

router.get('/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);

    }

  })



router.patch('/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body
      res.status(201).json(await service.update(id, body))
    } catch (error) {
      next(error);
    }

  })

router.delete('/:id', async (req, res) => {
  validationHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        res.status(200).json(await service.delete(id));
      } catch (error) {
        next(error)
      }
    }
})

module.exports = router;
