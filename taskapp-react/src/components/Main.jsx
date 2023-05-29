import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import mocData from "../mocData";
import Card from "./Card";

const Main = () => {
  const [data, setData] = useState(mocData);
  const onDragEnd = (result) => {
    const { source, destination } = result;
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                className="task-section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="task-section-title">{section.title}</div>
                <div className="task-section-content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.3" : "1",
                            color: snapshot.isDragging ? "red" : "white",
                          }}
                        >
                          <Card>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Main;
