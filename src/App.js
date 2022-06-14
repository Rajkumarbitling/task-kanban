import { useState } from 'react';
import './App.css';
import dataSet from './dataset.js'
import styled from 'styled-components';
import Column from './components/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import ColorPicker from './components/ColorPicker';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Store } from "react-notifications-component";

const Container = styled.div`
  display: flex;
  height: 97vh;
  flex-wrap: no-wrap;
  overflow-x: auto;
  padding: 10px;
  background-color: ${(props) => (props.isDraggingOver ? '#7dadf8' : 'inherit')}
`;

const InputHolder = styled.div`
  display: flex;
  position: relative;
  margin: 10px;
  flex-direction: column;
`;
const TextInput = styled.input`
  padding: 11px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: fit-content;
  padding-right: 50px;
`;
const AddButton = styled.button`
  padding: 8px;
  color: #fff;
  border: none;
  position: absolute;
  right: 0;
  margin: 4px;
  border-radius: 5px;
  background-color: #15B5B0;
`;

export const notifyError = (msg) => {
  return Store.addNotification({
    title: "Failed!",
    message: msg,
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

function App() {
  const [data, setData] = useState(dataSet);
  const [input, setInput] = useState("");
  const [color, setColor] = useState("#15B5B0");

  const handleClick = (e) => {
    e.preventDefault();
    if (!input) {
      notifyError("Please add List Name");
      return;
    }
    
    const newColumn = Object.assign({}, data.columns);
    const objLen = Object.keys(newColumn).length;
    const obj = { id: `column-${objLen + 1}`, bgcolor: color, title: input, taskIds: [] };
    newColumn[`column-${objLen + 1}`] = obj;

    // set column order

    const newColumnOrder = Array.from(data.columnOrder);
    newColumnOrder.push(`column-${objLen + 1}`);

    const newState = {
      ...data,
      columnOrder: newColumnOrder,
      columns: newColumn,
    };
    setData(newState);
    setInput("");
    return;
  }

  const onDragEnd = (result) => {
    const {destination, source, draggableId, type} = result;
    // console.log(result)
    if(!destination){
      return;
    }

    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }

    if(type === 'column'){
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newOrder = {
        ...data,
        columnOrder: newColumnOrder,
      }
      setData(newOrder);
      return;
    }

    const start = data.columns[source.droppableId];
    const end = data.columns[destination.droppableId];
    // console.log(column)
    // if task dragged in same column
    if(start === end){
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      }
      setData(newState)
      return;
    }

    // if task dragged between columns
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const endTaskIds = Array.from(end.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      taskIds: endTaskIds,
    }

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd,
      }
    }
    setData(newState);
    return;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided, snapshot) => (
          <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <ReactNotifications />
        {data?.columnOrder?.map((columnId, index) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} index={index} setData={setData} data={data} />;
        })}
        {provided.placeholder}
            <InputHolder>
              <TextInput
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add List"
              ></TextInput>
              <AddButton
                type="button"
                onClick={(e) => handleClick(e)}
              >
                Add
              </AddButton>
              <ColorPicker setColor={setColor} color={color} />
            </InputHolder>
      </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;