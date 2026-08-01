import { createSenderOutgoingGrant } from './senderOutgoingGrant.service.js'

export async function createInteractGrant(quoteId) {

    const grant = await createSenderOutgoingGrant(
        quoteId
    )

    return grant

}