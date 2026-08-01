import { Router } from 'express'

import {
    createIncomingPayment,
    createQuote,
    getInteractLink,
    createOutgoingPayment
} from '../controllers/payment.controller.js'

const router = Router()

router.post('/incoming', createIncomingPayment)

router.post('/quote', createQuote)

router.post('/interact', getInteractLink)

router.post('/outgoing', createOutgoingPayment)

export default router