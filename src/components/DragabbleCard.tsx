import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface IDraggableCardProps {
	toDoId: number;
	toDoText: string;
	index: number;
}

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

const DragabbleCard = ({ toDoId, toDoText, index }: IDraggableCardProps) => {
	return (
		<Draggable draggableId={toDoId+""} index={index}>
			{(magic, snapshot) => (
				<Card
					ref={magic.innerRef}
					isDragging={snapshot.isDragging}
					{...magic.dragHandleProps}
					{...magic.draggableProps}
				>
					{toDoText}
				</Card>
			)}
		</Draggable>
	);
};

export default React.memo(DragabbleCard);