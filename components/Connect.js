import { useEffect, useState } from 'react'
import { Flex, Button, Box, useColorMode, Heading } from '@chakra-ui/react'
import { ToDoAbi } from './utils/Abi'
import { ToDoAddress } from './utils/Adress'
import ToDoList from './ToDoList'

export default function Connect() {
    const [sepolia, setSepolia] = useState(false)
    const [signer, setSigner] = useState('')

    useEffect(() => {
        correctNetwork()
    }, [])

    const correctNetwork = async () => {
        try {
            const { ethereum } = window
            if (!ethereum) {
                alert("Can not detect MetaMask")
            } else {
                const sepoliaChainId = 'aa36a7'
                const chainId = await ethereum.request({ method: 'eth_chainId' })
                if (chainId == sepoliaChainId)
                    setSepolia(true)
                const accounts = await ethereum.request({ method: 'eth_accounts' })
                setSigner(accounts[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddTasks = async (e) => {
        if (sepolia) {
            e.preventDefalut()

        } else {
            // console.log(ToDoAddress);
        }
        console.log(signer);
    }

    return (
        <div style={{ marginTop: 20 }}>
            {signer ? <ToDoList></ToDoList> : <Heading style={{ textAlign: 'center' }}>Please Login to use the app</Heading>}
        </div>
    )
}
