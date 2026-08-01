import { getSenderClient } from './openPaymentsClient.service.js'

export async function continueGrant(
    accessToken,
    continueUrl,
    interactRef
) {

    const client = await getSenderClient()

    return await client.grant.continue(
        {
            accessToken,
            url: continueUrl
        },
        {
            interact_ref: interactRef
        }
    )

}