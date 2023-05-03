import { Box, Button, Heading, Input, Flex, Spacer, List, ListItem, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { ethers } from 'ethers'
import { ToDoAbi } from './utils/Abi'
import { ToDoAddress } from './utils/Adress'

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'

export default function ToDoList({ signer }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [input, setInput] = useState("")
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getTasks()
    }, [])

    const addTasks = async (e) => {
        e.preventDefault()
        try {
            console.log(signer);
            const { ethereum } = window
            const provider = new ethers.providers.Web3Provider(ethereum)
            signer = provider.getSigner()
            const contract = new ethers.Contract(
                ToDoAddress, ToDoAbi, signer
            )
            const txPromise = contract.addTasks(input, false)
                .then(res => {
                    let taskAdded = {
                        Text: input,
                        isDeleted: false,
                    }
                    onOpen()
                    setInput('')
                    console.log('Transaction hash:', res.hash);
                    const receiptPromise = provider.waitForTransaction(res.hash);

                    receiptPromise.then((receipt) => {
                        setTasks([...tasks, taskAdded])
                        console.log('Transaction receipt:', receipt);
                        onClose()
                    })

                }).catch(error => console.log(error))

        }
        catch (error) {
            console.log(error);
        }
    }
    const getTasks = async () => {
        try {
            const { ethereum } = window
            const provider = new ethers.providers.Web3Provider(ethereum)
            signer = provider.getSigner()
            const contract = new ethers.Contract(
                ToDoAddress, ToDoAbi, signer
            )
            const alltasks = await contract.getTasks()
            setTasks(alltasks)
            // console.log("See all task here", tasks);
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteTasks = async (id) => {
        try {
            const { ethereum } = window
            const provider = new ethers.providers.Web3Provider(ethereum)
            signer = provider.getSigner()
            const contract = new ethers.Contract(
                ToDoAddress, ToDoAbi, signer
            )
            await contract.deleteTasks(id).then((res) => {
                onOpen()
                const receiptPromise = provider.waitForTransaction(res.hash)
                console.log("Transaction hash: ", res.hash);
                receiptPromise.then((receipt) => {
                    getTasks()
                    console.log('Transaction receipt: ', receipt);
                    onClose()
                })

            }).catch(error => console.log(error))


            console.log("See all task here", tasks);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ textAlign: 'center' }} >
            <Box>
                <Heading p={10}>To Do App</Heading>
                <Flex>
                    <Input value={input} onChange={(e) => { setInput(e.target.value); }}></Input>
                    <Button onClick={addTasks} ml={5} backgroundColor={'facebook.400'}><FaPlus /></Button>
                </Flex>
                <List>
                    {tasks.map((ele, index) => {
                        return (<ListItem p={2} key={ele.id}><Flex><Button width={'full'}>{ele.Text}</Button>
                            <Button onClick={() => deleteTasks(ele.id)} backgroundColor={'facebook.400'}><FaTrash /></Button>
                        </Flex>
                        </ListItem>)
                    })}
                </List>
            </Box>

            <Modal style={{ marginTop: 20 }} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Wait for your transaction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    </ModalBody>
                    <Box p={30}> When the transaction is done, this modal will be closed</Box>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}
