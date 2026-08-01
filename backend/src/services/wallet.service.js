import {
    getSenderClient,
    getReceiverClient
} from './openPaymentsClient.service.js'

import { OPEN_PAYMENTS } from '../config/openPayments.config.js'

export async function getSenderWallet() {

    const client = await getSenderClient()

    const wallet = await client.walletAddress.get({

        url: OPEN_PAYMENTS.sender.walletAddress

    })

    return wallet

}

export async function getReceiverWallet() {

    const client = await getReceiverClient()

    const wallet = await client.walletAddress.get({

        url: OPEN_PAYMENTS.receiver.walletAddress

    })

    return wallet

}