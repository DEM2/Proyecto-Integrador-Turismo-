import { getSenderClient } from './openPaymentsClient.service.js'
import { getSenderWallet } from './wallet.service.js'
import { createSenderQuoteGrant } from './senderQuoteGrant.service.js'

export async function createQuote(
    incomingPaymentId,
    amount
) {

    const client = await getSenderClient()

    const wallet = await getSenderWallet()

    const grant = await createSenderQuoteGrant()

    const quote = await client.quote.create(
        {
            url: wallet.resourceServer,
            accessToken: grant.access_token.value
        },
        {
            method: 'ilp',

            walletAddress: wallet.id,

            receiver: incomingPaymentId
        }
    )

    return quote

}