import { Menu } from "../shared/Menu";
import { LeftSideBar } from "../shared/LeftSideBar";
import { TaskListComponent } from "../shared/TaskListComponent";
import { NewList } from "../components/NewList";
import { useAuth } from "../Context/AuthContext";
import React, { useEffect, useState } from "react";
import { TaskList } from "../models/models";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

export const TaskPage = () => {
  const { getAllListTasks, tasksList, setTasksList } = useAuth();

  useEffect(() => {
    if (getAllListTasks) getAllListTasks();
  }, []);

  useEffect(() => {
    console.log("TaskPage tasksList updated");
  }, [tasksList]);
  const onDragEnd = (
    result: DropResult,
    columns: TaskList[] | null,
    setColumns: (columns: TaskList[] | null) => void
  ) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (columns) {
      const sourceListIndex = columns.findIndex(
        (list) => list._id === source.droppableId
      );

      if (sourceListIndex !== -1) {
        const sourceList = columns[sourceListIndex];
        const sourceItems = [...sourceList.Tasks];

        if (source.droppableId === destination.droppableId) {
          // If dragging within the same list, re-order the tasks
          const [removed] = sourceItems.splice(source.index, 1);
          sourceItems.splice(destination.index, 0, removed);

          columns[sourceListIndex] = {
            ...sourceList,
            Tasks: sourceItems,
          };
        } else {
          // If dragging to a different list, move the task
          const destListIndex = columns.findIndex(
            (list) => list._id === destination.droppableId
          );

          if (destListIndex !== -1) {
            const destList = columns[destListIndex];
            const destItems = [...destList.Tasks];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            columns[sourceListIndex] = {
              ...sourceList,
              Tasks: sourceItems,
            };

            columns[destListIndex] = {
              ...destList,
              Tasks: destItems,
            };
          }
        }

        // Ensure the index is updated for each task
        columns.forEach((list, index) => {
          list.Tasks.forEach((task, taskIndex) => {
            task.index = taskIndex;
          });
        });

        setColumns([...columns]);
      }
    }
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, tasksList, setTasksList)}
    >
      <Menu />
      <div className="w-full flex flex-row">
        <div className="w-1/12 flex flex-col">
          <LeftSideBar />
        </div>
        <div className="w-11/12 flex flex-row gap-2">
          {tasksList?.map((singleTaskList, index) => (
            <Droppable
              droppableId={singleTaskList._id}
              key={singleTaskList._id}
            >
              {(provided, snapshot) => (
                <div
                  className="w-1/4 flex flex-col items-center bg-gray-300 rounded-3xl pt-2"
                  key={singleTaskList._id}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <TaskListComponent
                    index={index}
                    currentList={singleTaskList}
                  />
                </div>
              )}
            </Droppable>
          ))}
          <div className="w-1/4 flex flex-col justify-start items-start">
            <NewList />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};
