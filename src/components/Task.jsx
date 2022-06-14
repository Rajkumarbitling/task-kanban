import React, { useState } from 'react'
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import LongMenu from './LongMenu';

const Container = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  transition: all 0.2s ease;
  background-color: ${(props) => (props.isDragging ? "#57c2a6" : "#fff")};
  color: ${(props) => (props.isDragging ? "#fff" : "inherit")};
  overflow: auto;
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

const Task = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTask, setEditTask] = useState(props?.task?.content);
  const { columnId, handleDelete, handleEdit , color } = props;
  // console.log(props)

  const renderComponent = (provided, snapshot) => {
    if(!isEditing) {
      return (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props?.task?.content}
          <LongMenu
            taskId={props.task.id}
            columnId={columnId}
            handleDelete={handleDelete}
            setIsEditing={setIsEditing}
          />
        </Container>
      );
    } else {
      return (
        <InputHolder
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <TextInput
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
          ></TextInput>
          <AddButton
            style={{ backgroundColor: color }}
            type="button"
            onClick={(e) => {
              handleEdit(props.task.id, editTask);
              setIsEditing(false);
            }}
          >
            Edit
          </AddButton>
        </InputHolder>
      );
    };
  };
  return (
    <Draggable
      key={props.task.id}
      draggableId={props.task.id}
      index={props.index}
    >
      {(provided, snapshot) => {
        return (
          <div>
            {renderComponent(provided, snapshot)}
          </div>
        );
      }}
    </Draggable>
  );
}

export default Task