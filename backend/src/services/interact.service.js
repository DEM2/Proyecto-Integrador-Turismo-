import { createSenderOutgoingGrant } from './senderOutgoingGrant.service.js'

export async function createInteractGrant(quoteId, transactionId) {

    const grant = await createSenderOutgoingGrant(quoteId, transactionId)

    return grant

}