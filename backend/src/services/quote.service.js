import { getSenderClient } from './openPaymentsClient.service.js'
import { getSenderWallet } from './wallet.service.js'
import { createSenderQuoteGrant } from './senderQuoteGrant.service.js'
import { OPEN_PAYMENTS } from '../config/openPayments.config.js'

export async function createQuote(
    incomingPaymentId,
    amount
) {

    const client = await getSenderClient()

    const wallet = await getSenderWallet()

    const grant = await createSenderQuoteGrant()

    const quote = await client.quote.create(
        {
            url: OPEN_PAYMENTS.resourceServer,
            accessToken: grant.access_token.value
        },
        {
            walletAddress: wallet.id,

            receiver: incomingPaymentId,

            receiveAmount: {
                assetCode: wallet.assetCode,
                assetScale: wallet.assetScale,
                value: amount.toString()
            }
        }
    )

    return quote

}