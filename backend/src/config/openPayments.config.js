export const OPEN_PAYMENTS = {

    sender: {

        walletAddress:
            process.env.SENDER_WALLET,

        privateKey:
            process.env.SENDER_PRIVATE_KEY,

        keyId:
            process.env.SENDER_KEY_ID

    },

    receiver: {

        walletAddress:
            process.env.RECEIVER_WALLET,

        privateKey:
            process.env.RECEIVER_PRIVATE_KEY,

        keyId:
            process.env.RECEIVER_KEY_ID

    },

    authServer:
        process.env.OPEN_PAYMENTS_AUTH_SERVER,

    resourceServer:
        process.env.OPEN_PAYMENTS_RESOURCE_SERVER,

    callbackUrl:
        process.env.OPEN_PAYMENTS_CALLBACK

}