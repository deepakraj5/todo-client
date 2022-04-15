import { IconButton, ListIcon, ListItem, useToast } from "@chakra-ui/react";
import { MdCheckCircle, MdClose, MdDelete } from 'react-icons/md'
import '../styles/Home.css'
import axios from 'axios'

const Todo = ({ todo, getData }) => {

    const toast = useToast()

    const handleDeleteBtn = async (id) => {

        const res = await axios.delete(`http://20.232.134.244:8080/api/v1/todo/${id}`)

        if(res.data === 'Todo Deleted') {

            toast({
                title: res.data,
                description: "Your Todo deleted to the list",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            })

            getData()

        } else {

            toast({
                title: res.data,
                description: "No such todo",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            })

            getData()

        }

    }

    const handleActionBtn = async () => {

        todo.completed = !todo.completed

        const res = await axios.patch(`http://20.232.134.244:8080/api/v1/todo`, todo)

        if(res.data) {

            toast({
                title: 'Todo Updated',
                description: "Your Todo Updated to the list",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            })
    
            getData()

        } else {

            toast({
                title: 'No Todo Found',
                description: "No such todo",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            })

            getData()

        }

    }

    return (
        <div>
            <ListItem className="todo-text">
                <ListIcon as={todo?.completed ? MdCheckCircle : MdClose } color={`${todo?.completed ? 'green' : 'red'}`} size={50} />
                {todo?.todo}

                <div className="todo-icon-container">

                    <div className="todo-icon-btn">
                        <IconButton
                            colorScheme={`${todo?.completed ? 'red' : 'green'}`}
                            icon={todo?.completed ? <MdClose /> : <MdCheckCircle />}
                            onClick={e => handleActionBtn()}
                        />
                    </div>

                    <div className="todo-icon-btn">
                        <IconButton
                            colorScheme='red'
                            icon={<MdDelete />}
                            onClick={e => handleDeleteBtn(todo?.id)}
                        />
                    </div>

                </div>
                
            </ListItem>
        </div>
    );
}

export default Todo