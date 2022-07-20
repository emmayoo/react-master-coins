import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ITodo, toDoState } from '../atoms';
import DragabbleCard from './DragabbleCard';

interface IBoardProps {
	toDos: ITodo[];
	boardId: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IForm {
	toDo: string;
}

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Board = ({toDos, boardId}: IBoardProps) => {
	const { register, setValue, handleSubmit } = useForm<IForm>();
	const setTodos = useSetRecoilState(toDoState);
	const onValid = ({toDo}: IForm) => {
		const newTodo = {
			id: Date.now(),
			text: toDo
		}

		const copy = [...toDos]
		copy.push(newTodo);
		setTodos(allBoard => ({ ...allBoard, [boardId]: copy }));
		setValue("toDo", "");
	}
	return (
		<Wrapper>
			<Title>{boardId}</Title>
			<Form onSubmit={handleSubmit(onValid)}>
				<input {...register("toDo", {required: true})} type="text" placeholder={`Add task on ${boardId}`}/>
			</Form>
			<Droppable droppableId={boardId}>
			{(magic, snapshot) => (
				<Area isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
					{toDos.map((toDo, index) => (<DragabbleCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index} />))}
					{magic.placeholder}
				</Area>
			)}
		</Droppable>
	</Wrapper>
	);
};

export default Board;