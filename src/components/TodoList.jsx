import { List } from "@chakra-ui/react";
import Todo from "./Todo";

const TodoList = ({ todoList, getData }) => {
    return (
        <div>

            <List spacing={5}>

                { todoList?.map(todo => (
                    <Todo key={todo?.id} todo={todo} getData={getData} />
                )) }

            </List>

        </div>
    );
}

export default TodoList