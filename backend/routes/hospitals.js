const express = require('express')
const {getHospitals , getHospital , createHospital ,updateHospital , deleteHospital, getVaccenters} = require('../controllers/hospitals')
const {protect,authorize}  = require('../middleware/auth')
const appointmentRouter = require('./appointments')

router = express.Router()
router.use('/:hospitalId/appointments',appointmentRouter)
router.route('/vacCenters').get(getVaccenters);
router.route('/').get(getHospitals).post(protect,authorize("admin"),createHospital)
router.route('/:id').put(protect,authorize('admin'),updateHospital).delete(protect,authorize('admin'),deleteHospital).get(getHospital)

module.exports = router