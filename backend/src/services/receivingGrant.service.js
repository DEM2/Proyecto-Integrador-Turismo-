import { getReceiverClient } from './openPaymentsClient.service.js'
import { getReceiverWallet } from './wallet.service.js'

export async function createReceivingGrant() {

    const client = await getReceiverClient()

    const wallet = await getReceiverWallet()

    const grant = await client.grant.request(
        {
            url: wallet.authServer
        },
        {
            access_token: {
                access: [
                    {
                        type: 'incoming-payment',
                        actions: [
                            'list',
                            'read',
                            'read-all',
                            'complete',
                            'create'
                        ]
                    }
                ]
            }
        }
    )

    return grant

}