import { Web3Button } from '@web3modal/react'
import { Flex, Button, Box, useColorMode } from '@chakra-ui/react'
import { Web3Modal } from '@web3modal/react'
import { useState, useEffect } from 'react'

function Wallet({ setSigner }) {

    useEffect(() => {
        const handleAccountsChanged = (accounts) => {
            console.log('Connected accounts: ', accounts);
            location.reload()
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);

        // Clean up the event listener when the component unmounts
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);

    const connectMetaMask = async () => {
        const { ethereum } = window

        if (!ethereum) {
            alert('Can not detect MetaMask')

        } else {
            const accounts = ethereum.request({ method: 'eth_requestAccounts' })
            // ethereum.request({ method: 'wallet_switchEthereumChain' })

            setSigner(accounts[0])
            // location.reload()
        }
    }

    return (
        <Button onClick={connectMetaMask}>Connect Wallet</Button>
    )
}

export default Wallet
