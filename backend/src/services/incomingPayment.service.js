import { getReceiverClient } from './openPaymentsClient.service.js'
import { createReceivingGrant } from './receivingGrant.service.js'
import { getReceiverWallet } from './wallet.service.js'

export async function createIncomingPayment(amount) {

    const client = await getReceiverClient()

    const grant = await createReceivingGrant()

    const wallet = await getReceiverWallet()

    const incomingPayment = await client.incomingPayment.create(
        {
            url: wallet.resourceServer,
            accessToken: grant.access_token.value
        },
        {
            walletAddress: wallet.id,

            incomingAmount: {
                assetCode: wallet.assetCode,
                assetScale: wallet.assetScale,
                value: amount.toString()
            }
        }
    )

    return incomingPayment

}