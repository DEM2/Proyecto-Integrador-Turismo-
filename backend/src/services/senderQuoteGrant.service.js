import { getSenderClient } from './openPaymentsClient.service.js'
import { OPEN_PAYMENTS } from '../config/openPayments.config.js'

export async function createSenderQuoteGrant() {

    const client = await getSenderClient()

    const grant = await client.grant.request(
        {
            url: OPEN_PAYMENTS.authServer
        },
        {
            access_token: {
                access: [
                    {
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