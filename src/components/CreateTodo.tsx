import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, toDoState } from '../atoms';

interface IForm {
	toDo: string;
}

const Form = styled.form`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const Input = styled.input`
	flex-grow: 1;
`;

const CreateTodo = () => {
	const setToDos = useSetRecoilState(toDoState);
	const category = useRecoilValue(categoryState);
	const { register, handleSubmit, setValue } = useForm<IForm>();

	const onValid = ({toDo}: IForm) => {
		setToDos(oldToDos => {
			const newTodos = [...oldToDos, { id: Date.now(), text: toDo, category: category }];

			localStorage.setItem("todo", JSON.stringify(newTodos));
			
			return newTodos;
		});
		setValue('toDo', '');
	}
	return (
		<Form onSubmit={handleSubmit(onValid)} id="form">
			<Input {...register("toDo")} type="text" placeholder="To Do" id="input"/>
			<button>추가</button>
		</Form>
	);
};

export default CreateTodo;