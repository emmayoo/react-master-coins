import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { categoryState, Categories, toDoSelector, categoriesSelector, customCategoryState } from "../atoms";
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

const Modal = styled.div<{flag: boolean}>`
	display: none;
	${props => props.flag && css`
		display: block;
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		padding-top: 100px; /* Location of the box */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: auto; /* Enable scroll if needed */
		background-color: rgb(0,0,0); /* Fallback color */
		background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	`};
`;

const ModalContent = styled.form`
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 300px;
`;

const Close = styled.span`
	color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
	
	&:hover, &:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
`;

const ModalAddButton = styled.button`
	margin-left: 3px;
`;

const ToDoList = () => {
	const selector = useRecoilValue(toDoSelector);
	const categories = useRecoilValue(categoriesSelector);
	const setCustomCategories = useSetRecoilState(customCategoryState);
	const [category, setCategory] = useRecoilState(categoryState); // value + modifier

	const [modalShow, setModalShow] = useState(false);
	const [categoryName, setCategoryName] = useState('');

	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		if(event.currentTarget.value === "none") {
			setModalShow(!modalShow);
			return;
		}
		setCategory(event.currentTarget.value as Categories);
	}

	const onClick = () => {
		if (!categoryName) {
			alert('카테고리 명을 입력하세요.');
			return
		} else {
			setCustomCategories(old => {
				const newCats = [...old, categoryName];
				localStorage.setItem("custom", JSON.stringify(newCats));
				return newCats;
			});
			
			setModalShow(false);
			setCategoryName('');
		}
	}

	const onClose = () => {
		setModalShow(false);
		setCategoryName('');
	}

	return (
		<Wrapper>
			<Title>To Do List</Title>
			<Container>
				<Select value={category} onInput={onInput}>
					{categories.map((c, index) => <option value={c} key={index}>{c}</option>)}
					<option value="none">+(추가)</option>
				</Select>
				<CreateTodo />
			</Container>
			<Ul>
				{selector.map(t => <ToDo key={t.id} {...t}/>)}
			</Ul>

		<Modal flag={modalShow}>
			<ModalContent onSubmit={(e) => { e.preventDefault(); }}>
				<Close onClick={onClose}>X</Close>
				<p>
					<input type="text" placeholder="카테고리 명을 적어주세요." value={categoryName} onChange={(e) => setCategoryName(e.currentTarget.value)}/>
					<ModalAddButton onClick={onClick}>추가</ModalAddButton>
				</p>
			</ModalContent>
		</Modal>

		</Wrapper>
	)
};

export default ToDoList;