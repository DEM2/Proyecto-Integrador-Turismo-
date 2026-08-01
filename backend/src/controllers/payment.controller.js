import { v4 as uuidv4 } from 'uuid'
import { createIncomingPayment as createIncomingPaymentService } from '../services/incomingPayment.service.js'
import { createQuote as createQuoteService } from '../services/quote.service.js'
import { createInteractGrant } from '../services/interact.service.js'
import { completeOutgoingPayment } from '../services/outgoingPayment.service.js'
import {
    createPaymentTransaction,
    updatePaymentTransaction,
    getPaymentTransaction
} from '../querys/payments.query.js'

// POST /api/payments/start
// Crea incoming payment + quote en un solo paso y arranca la transacción en BD
export async function startPayment(req, res) {
    try {
        const { amount } = req.body

        const incomingPayment = await createIncomingPaymentService(amount)
        const quote = await createQuoteService(incomingPayment.id, amount)

        const transactionId = uuidv4()

        await createPaymentTransaction({
            id: transactionId,
            amount,
            incomingPaymentId: incomingPayment.id,
            quoteId: quote.id
        })

        return res.status(201).json({
            transactionId,
            quoteId: quote.id,
            amount: quote.debitAmount
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message })
    }
}

// GET /api/payments/:transactionId/authorize
// Pide el grant que requiere aprobación humana y devuelve el link de Accept
export async function authorizePayment(req, res) {
    try {
        const { transactionId } = req.params

        const tx = await getPaymentTransaction(transactionId)

        if (!tx) {
            return res.status(404).json({ message: 'Transacción no encontrada' })
        }

        const grant = await createInteractGrant(tx.quote_id, transactionId)

        await updatePaymentTransaction(transactionId, {
            status: 'pending_authorization',
            continueAccessToken: grant.continue.access_token.value,
            continueUri: grant.continue.uri
        })

        return res.status(200).json({
            redirectUrl: grant.interact.redirect
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message })
    }
}

// GET /api/payments/callback
// A esta ruta la llama el navegador del usuario (no tu frontend directamente),
// redirigido por el auth server después de que el usuario aprueba el pago.
export async function paymentCallback(req, res) {
    try {
        const { interact_ref, tx } = req.query

        const transaction = await getPaymentTransaction(tx)

        if (!transaction) {
            return res.status(404).send('Transacción no encontrada')
        }

        const outgoingPayment = await completeOutgoingPayment({
            quoteId: transaction.quote_id,
            accessToken: transaction.continue_access_token,
            continueUrl: transaction.continue_uri,
            interactRef: interact_ref
        })

        await updatePaymentTransaction(tx, {
            status: 'completed',
            outgoingPaymentId: outgoingPayment.id
        })

        return res.redirect(`${process.env.FRONTEND_URL}/pago-exitoso?tx=${tx}`)

    } catch (error) {
        console.error(error)
        return res.redirect(`${process.env.FRONTEND_URL}/pago-fallido`)
    }
}

// GET /api/payments/:transactionId/status
export async function getPaymentStatus(req, res) {
    try {
        const { transactionId } = req.params

        const tx = await getPaymentTransaction(transactionId)

        if (!tx) {
            return res.status(404).json({ message: 'Transacción no encontrada' })
        }

        return res.status(200).json({
            status: tx.status,
            outgoingPaymentId: tx.outgoing_payment_id
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message })
    }
}