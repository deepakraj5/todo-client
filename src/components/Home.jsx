import { Button, Input, useToast } from "@chakra-ui/react";
import TodoList from "./TodoList";
import '../styles/Home.css'
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

const Home = () => {

    let [todo, setTodo] = useState("")
    let [todoList, setTodoList] = useState("")
    const toast = useToast()

    let getData = async () => {

        let res = await axios.get('http://20.232.134.244:8080/api/v1/todo')
        setTodoList(res.data)

    }

    useEffect(() => {

        getData()

    }, [])

    const handleAddBtn = async () => {

        await axios.post('http://20.232.134.244:8080/api/v1/todo', { todo })

        toast({
            title: 'Todo Added',
            description: "Your Todo added to the list",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right'
        })

        getData()

        setTodo("")

    }

    return (
        <div className="container">

            <div>

                <div className="todo-input">
                    <Input placeholder='Todo' size='lg' onChange={e => setTodo(e.target.value)} value={todo} />
                    <div className="add-btn">
                        <Button colorScheme="blue" size="lg" onClick={() => handleAddBtn()}>Add Todo</Button>
                    </div>
                    
                </div>

                { todoList ? <TodoList todoList={todoList} getData={getData} /> : '' }

            </div>

        </div>
    );
}

export default Home