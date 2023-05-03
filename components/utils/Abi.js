export const ToDoAbi =
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "AddTasks",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "DeleteTasks",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "text",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "isDeleted",
                    "type": "bool"
                }
            ],
            "name": "addTasks",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "deleteTasks",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getTasks",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "Text",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "isDeleted",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct ToDoList.Task[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]