import { getSenderClient } from './openPaymentsClient.service.js'
import { continueGrant } from './continueGrant.service.js'
import { getSenderWallet } from './wallet.service.js'

export async function completeOutgoingPayment({ quoteId, accessToken, continueUrl, interactRef }) {

    const client = await getSenderClient()

    const wallet = await getSenderWallet()

    const grant = await continueGrant(accessToken, continueUrl, interactRef)

    return await client.outgoingPayment.create(
        {
            url: wallet.resourceServer,
            accessToken: grant.access_token.value
        },
        {
            walletAddress: wallet.id,
            quoteId
        }
    )

}