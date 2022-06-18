import React, { useState } from 'react'
import styled from 'styled-components';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { notifyError } from '../App';
import { MaindataContext } from '../contexts/MaindataContext';
import { Delete } from '@material-ui/icons';

const Container = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isDragging ? "#57c2a6" : "#fff")};
`;
const Title = styled.div`
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #eee;
  color: #fff;
  overflow: auto;
`;
const TaskList = styled.div`
    padding: 10px;
    flex-grow: 1;
    min-height: 100px;
    transition: all 0.2s ease;
    background-color: ${(props) => (props.isDraggingOver ? '#7dadf8' : 'inherit')}
`;

const InputHolder = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 10px;
`;
const TextInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 5px;
  padding-right: 50px;
`;
const AddButton = styled.button`
  padding: 8px;
  color: #fff;
  border: none;
  position: absolute;
  right: 0;
  margin: 3px;
  border-radius: 5px;
`;

const Column = (props) => {
  
const [input, setInput] = useState("");

const handleChange = (e, columnId) => {
  e.preventDefault();
  if (!input){
    notifyError("Please add Task Name");
    return;
  }
  
  const newTasks = Object.assign({}, props.data.tasks);
  const objLen = Object.keys(newTasks).length;
  const obj = { id: `task-${objLen + 1}`, content: input };
  newTasks[`task-${objLen + 1}`] = obj;

  // set taskid in column taskids
  const end = props.data.columns[columnId];

  const endTaskIds = Array.from(end.taskIds);
  endTaskIds.push(`task-${objLen + 1}`);
  const newEnd = {
    ...end,
    taskIds: endTaskIds,
  };

  const newState = {
    ...props.data,
    tasks: newTasks,
    columns: {
      ...props.data.columns,
      [newEnd.id]: newEnd,
    },
  };
  props.setData(newState);
  setInput("");
  return;
};



const handleDelete = (taskId, columnId) => {
  const newTasks = Object.assign({}, props.data.tasks);
  delete newTasks.taskId;

  // for column taskid remove
  const end = props.data.columns[columnId];

  const endTaskIds = Array.from(end.taskIds);
  endTaskIds.splice(endTaskIds.indexOf(taskId), 1);
  const newEnd = {
    ...end,
    taskIds: endTaskIds,
  };

  const newState = {
    ...props.data,
    tasks: newTasks,
    columns: {
      ...props.data.columns,
      [newEnd.id]: newEnd,
    },
  };
  props.setData(newState);
  return;
};

const handleEdit = (taskId, input) => {
  const newTasks = Object.assign({}, props.data.tasks);
  newTasks[taskId]["content"] = input;
  
  const newState = {
    ...props.data,
    tasks: newTasks,
  };
  props.setData(newState);
  return;

}

const handleColumnDelete = (e, columnId) => {
  e.preventDefault();
  
  // delete from tasks
  const taskArr = props.data.columns[columnId].taskIds;
  const newTasks = Object.assign({}, props.data.tasks);
  taskArr.forEach((object) => {
    delete newTasks[object];
  });

  // delete from columns
  const newColumns = Object.assign({}, props.data.columns);
  delete newColumns[columnId];

  // delete from ordered columnIds
  const columnOrder = Array.from(props.data.columnOrder);
  columnOrder.splice(columnOrder.indexOf(columnId), 1);

  const newState = {
    ...props.data,
    tasks: newTasks,
    columns: newColumns,
    columnOrder: columnOrder,
  };
  props.setData(newState);
  return;
}

  return (
    <MaindataContext.Provider value={{ handleDelete }}>
      <Draggable
        key={props.column.id}
        draggableId={props.column.id}
        index={props.index}
      >
        {(provided, snapshot) => {
          return (
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <Title
                style={{ backgroundColor: props.column.bgcolor }}
                {...provided.dragHandleProps}
              >
                {props?.column?.title}
                <Delete
                  className="float-end cursor-pointer"
                  onClick={(e) => handleColumnDelete(e, props.column.id)}
                />
              </Title>
              <Droppable droppableId={props.column.id} type="task">
                {(provided, snapshot) => {
                  return (
                    <TaskList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      {props?.tasks?.map((task, index) => (
                        <Task
                          key={task.id}
                          task={task}
                          index={index}
                          columnId={props.column.id}
                          color={props.column.bgcolor}
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                        />
                      ))}
                      {provided.placeholder}
                      <InputHolder>
                        <TextInput
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Add Task"
                        ></TextInput>
                        <AddButton
                          style={{ backgroundColor: props.column.bgcolor }}
                          type="button"
                          onClick={(e) => handleChange(e, props.column.id)}
                        >
                          Add
                        </AddButton>
                      </InputHolder>
                    </TaskList>
                  );
                }}
              </Droppable>
            </Container>
          );
        }}
      </Draggable>
    </MaindataContext.Provider>
  );
}

export default Column