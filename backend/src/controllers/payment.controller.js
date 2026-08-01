import { createIncomingPayment as createIncomingPaymentService } from '../services/incomingPayment.service.js'
import { createQuote as createQuoteService } from '../services/quote.service.js'
import { createOutgoingPayment as createOutgoingPaymentService } from '../services/outgoingPayment.service.js'
import { createInteractGrant } from '../services/interact.service.js'

export async function createIncomingPayment(req, res) {

    try {

        const { amount } = req.body

        const incomingPayment =
            await createIncomingPaymentService(amount)

        return res.status(201).json(incomingPayment)

    }

    catch (error) {

        console.error(error)

        return res.status(500).json({
            message: error.message
        })

    }

}

export async function createQuote(req, res) {

    try {

        const {

            incomingPaymentId,

            amount

        } = req.body

        const quote =
            await createQuoteService(
                incomingPaymentId,
                amount
            )

        return res.status(201).json(quote)

    }

    catch (error) {

        console.error(error)

        return res.status(500).json({
            message: error.message
        })

    }

}

export async function getInteractLink(req, res) {

    try {

        const { quoteId } = req.body

        const interactGrant =
            await createInteractGrant(
                quoteId
            )

        return res.status(200).json(interactGrant)

    }

    catch (error) {

        console.error(error)

        return res.status(500).json({
            message: error.message
        })

    }

}

export async function createOutgoingPayment(req, res) {

    try {

        const {

            quoteId,

            accessToken,

            continueUrl,

            interactRef

        } = req.body

        const outgoingPayment =
            await createOutgoingPaymentService(

                quoteId,

                accessToken,

                continueUrl,

                interactRef

            )

        return res.status(201).json(outgoingPayment)

    }

    catch (error) {

        console.error(error)

        return res.status(500).json({
            message: error.message
        })

    }

}