import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, Categories, toDoSelector } from "../atoms";
import CreateTodo from "./CreateTodo";
import ToDo from "./ToDo";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Container = styled.div`
	display: flex;
	margin-bottom: 10px;
	width: 600px;
`;

const Title = styled.div`
	font-size: 30px;
	margin: 20px 0;
`;

const Select = styled.select`
	width: 70px;
	margin-right: 5px;
`;

const Ul = styled.ul`
	width: 600px;
`;

const ToDoList = () => {
	const selector = useRecoilValue(toDoSelector);
	const [category, setCategory] = useRecoilState(categoryState); // value + modifier
	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		setCategory(event.currentTarget.value as Categories);
	}

	return (
		<Wrapper>
			<Title>To Do List</Title>
			<Container>
				<Select value={category} onInput={onInput}>
					<option value={Categories.TODO}>To Do</option>
					<option value={Categories.DOING}>Doing</option>
					<option value={Categories.DONE}>Done</option>
				</Select>
				<CreateTodo />
			</Container>
			<Ul>
				{selector.map(t => <ToDo key={t.id} {...t}/>)}
			</Ul>
		</Wrapper>
	)
};

export default ToDoList;