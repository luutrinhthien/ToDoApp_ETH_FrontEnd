import { Flex, Button, Box, useColorMode, Spacer } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { ethers } from "ethers";
import ToDoList from './Connect'
import ConnectWallet from './connectWallet'
import { sign } from 'crypto';

export default function index() {

    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = async () => {
        const { ethereum } = window
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        setSigner(accounts[0])
    }

    const [signer, setSigner] = useState()

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <div style={{ margin: "50px auto", maxWidth: "75%" }}>
            <Flex>
                <Box>
                    <p style={{ fontSize: 30, fontWeight: 600 }}>To Do App</p>
                </Box>
                <Spacer />
                <Box>
                    <Flex>
                        <Button variant={'unstyled'} onClick={toggleColorMode}>
                            {colorMode === 'light' ? <FaMoon /> : <FaSun />}
                        </Button>
                        {!signer ? <ConnectWallet setSigner={setSigner} /> :
                            <Button >
                                {signer.slice(0, 4)}...{signer.slice(signer.length - 4, signer.length)}
                            </Button>}
                    </Flex>
                </Box>
            </Flex >
            <ToDoList signer={signer}></ToDoList>

        </div >
    )
}
