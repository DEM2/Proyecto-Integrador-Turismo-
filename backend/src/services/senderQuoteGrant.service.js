import { getSenderClient } from './openPaymentsClient.service.js'
import { getSenderWallet } from './wallet.service.js'

export async function createSenderQuoteGrant() {

    const client = await getSenderClient()

    const wallet = await getSenderWallet()

    const grant = await client.grant.request(
        {
            url: wallet.authServer
        },
        {
            access_token: {
                access: [
                    {
                        identifier: wallet.id,
                        type: 'quote',
                        actions: [
                            'create',
                            'read'
                        ]
                    }
                ]
            }
        }
    )

    return grant

}