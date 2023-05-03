import { Web3Button } from '@web3modal/react'
import { Flex, Button, Box, useColorMode } from '@chakra-ui/react'
import { Web3Modal } from '@web3modal/react'
import { useState } from 'react'

function connectWallet({ setSigner }) {

    const connectMetaMask = async () => {
        const { ethereum } = window

        if (!ethereum) {
            alert('Can not detect MetaMask')

        } else {
            const accounts = ethereum.request({ method: 'eth_requestAccounts' })
            // ethereum.request({ method: 'wallet_switchEthereumChain' })
            setSigner(accounts[0])
        }
    }

    return (
        <Button onClick={connectMetaMask}>Connect Wallet</Button>
    )
}

export default connectWallet
