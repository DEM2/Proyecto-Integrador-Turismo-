import { Router } from 'express'

import {
    startPayment,
    authorizePayment,
    paymentCallback,
    getPaymentStatus
} from '../controllers/payment.controller.js'

const router = Router()

router.post('/start', startPayment)
router.get('/:transactionId/authorize', authorizePayment)
router.get('/callback', paymentCallback)
router.get('/:transactionId/status', getPaymentStatus)

export default router