import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Categories, IToDo } from '../atoms';
import { toDoState } from "../atoms";

const Content = styled.span`
	margin-right: 5px;
	flex-grow: 1;
`;

const Button = styled.button`
	background: inherit;
	border:none; box-shadow:none;
	border-radius:0;
	padding:0;
	overflow:visible;
	cursor:pointer;
	color: #ecf0f1;
	margin-left: 8px;
	&:before {
		content: "| "
	}
	&:hover {
		color: #1abc9c;
	}
`;

const Li = styled.li`
	display: flex;
`;

const ToDo = ({ text, category, id }: IToDo) => {
	const setTodos = useSetRecoilState(toDoState);
	const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
		const { currentTarget: { name } } = event;
		setTodos((oldTodos) => {
			// const idx = oldTodos.findIndex(todo => todo.id === id);
			// // const oldTodo = oldTodos[idx];
			// const newTodo = { text, id, category: name as IToDo["category"] };
			// return [...oldTodos.slice(0, idx), newTodo, ...oldTodos.slice(idx+ 1)];
			const newTodos = oldTodos.map(todo => {
				if(todo.id === id) return { text, id, category: name as Categories}
				return todo
			})

			localStorage.setItem("todo", JSON.stringify(newTodos));
			
			return newTodos;
		})
	}

	const onDelete = (id: number) => {
		setTodos((oldTodos) => {
			const newTodos = oldTodos.filter(todo => todo.id !== id)
			localStorage.setItem("todo", JSON.stringify(newTodos));
			return newTodos;
		})
	}
	return (
		<Li>
			<Content>{ text }</Content>
			{category !== Categories.TODO && <Button name={Categories.TODO} onClick={onClick}>To Do</Button>}
			{category !== Categories.DOING && <Button name={Categories.DOING} onClick={onClick}>Doing</Button>}
			{category !== Categories.DONE && <Button name={Categories.DONE} onClick={onClick}>Done</Button>}
			<Button onClick={() => onDelete(id)}>삭제</Button>
		</Li> 
	);
};

export default ToDo;