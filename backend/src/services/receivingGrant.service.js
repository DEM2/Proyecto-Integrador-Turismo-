import { getReceiverClient } from './openPaymentsClient.service.js'
import { OPEN_PAYMENTS } from '../config/openPayments.config.js'

export async function createReceivingGrant() {

    const client = await getReceiverClient()

    const grant = await client.grant.request(
        {
            url: OPEN_PAYMENTS.authServer
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