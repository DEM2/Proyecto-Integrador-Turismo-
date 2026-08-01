import { getSenderClient } from './openPaymentsClient.service.js'
import { getSenderWallet } from './wallet.service.js'
import { v4 as uuidv4 } from 'uuid'

export async function createSenderOutgoingGrant(quoteId, transactionId) {

    const client = await getSenderClient()

    const wallet = await getSenderWallet()

    // el transactionId viaja en la URL para que el callback sepa a qué pago pertenece
    const callbackUrl = `${process.env.BACKEND_URL}/api/payments/callback?tx=${transactionId}`

    const grant = await client.grant.request(
        {
            url: wallet.authServer
        },
        {
            access_token: {
                access: [
                    {
                        identifier: wallet.id,
                        type: 'outgoing-payment',
                        actions: ['list', 'list-all', 'read', 'read-all', 'create'],
                        limits: { quoteId }
                    }
                ]
            },
            interact: {
                start: ['redirect'],
                finish: {
                    method: 'redirect',
                    uri: callbackUrl,
                    nonce: uuidv4()
                }
            }
        }
    )

    return grant

}