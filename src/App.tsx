import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';

import styled from "styled-components";
import { toDoState } from './atoms';
import Board from './components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info
    // 제자리에 두는 경우
    if (!destination) return;
    setToDos(oldToDos => {
      // 같은 droppableId
      if (source.droppableId === destination.droppableId) {
        const board = [...oldToDos[source.droppableId]];
        const task = board.splice(source.index, 1);
        board.splice(destination?.index, 0, task[0]);
        return {
          ...oldToDos,
          [source.droppableId]: board,
        };
      } 
       // 다른 droppableId
      else {
        const sourceBoard = [...oldToDos[source.droppableId]];
        const destinationBoard = [...oldToDos[destination.droppableId]];
        const task = sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, task[0]);
        return {
          ...oldToDos,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard
        };
      }
    })
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map(boardId => <Board toDos={toDos[boardId]} boardId={boardId} key={boardId}/>)}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
export default App;