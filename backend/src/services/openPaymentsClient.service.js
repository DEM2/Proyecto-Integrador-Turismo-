import { createAuthenticatedClient } from '@interledger/open-payments'
import { OPEN_PAYMENTS } from '../config/openPayments.config.js'

let senderClient = null
let receiverClient = null

export async function getSenderClient() {

    if (senderClient) {

        return senderClient

    }

    senderClient =
        await createAuthenticatedClient({

            walletAddressUrl:
                OPEN_PAYMENTS.sender.walletAddress,

            privateKey:
                OPEN_PAYMENTS.sender.privateKey,

            keyId:
                OPEN_PAYMENTS.sender.keyId

        })

    return senderClient

}

export async function getReceiverClient() {

    if (receiverClient) {

        return receiverClient

    }

    receiverClient =
        await createAuthenticatedClient({

            walletAddressUrl:
                OPEN_PAYMENTS.receiver.walletAddress,

            privateKey:
                OPEN_PAYMENTS.receiver.privateKey,

            keyId:
                OPEN_PAYMENTS.receiver.keyId

        })

    return receiverClient

}