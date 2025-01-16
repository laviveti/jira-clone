import React from "react";
import { Task, TaskStatus } from "../types";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { KanbanColumnHeader } from "./kanban-column-header";
import { KanbanCard } from "./kanban-card";

const boards: TaskStatus[] = [TaskStatus.BACKLOG, TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.IN_REVIEW, TaskStatus.DONE];

type TasksState = {
  [key in TaskStatus]: Task[];
};

interface DataKanbanProps {
  data: Task[];
}

export const DataKanban = ({ data }: DataKanbanProps) => {
  const [tasks, setTasks] = React.useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });
    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
    });

    return initialTasks;
  });

  const onDragEnd = React.useCallback((result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;

    let updatesPayload: { $id: string; status: TaskStatus; position: number }[];

    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      // Safely remove the task from the source column || Remove de forma segura a tarefa da coluna de origem
      const sourceColumn = [...newTasks[sourceStatus]];
      const [movedTask] = sourceColumn.splice(source.index, 1);
      // If there's no moved task (shouldn't happen, just in case), return the previous state || Se não houver tarefa movida (não deve acontecer, apenas para segurança), retorne o estado anterior
      if (!movedTask) {
        console.error("No task found at the source index");
        return prevTasks;
      }
      // Create a new task object with the potentially updated status || Crie um novo objeto de tarefa com o status atualizado, se necessário
      const updatedMovedTask = sourceStatus !== destStatus ? { ...movedTask, status: destStatus } : movedTask;
      // Update the source column || Atualize a coluna de origem
      newTasks[sourceStatus] = sourceColumn;
      // Add the task to the destination column || Adicione a tarefa à coluna de destino
      const destColumn = [...newTasks[destStatus]];
      destColumn.splice(destination.index, 0, updatedMovedTask);
      newTasks[destStatus] = destColumn;
      // Prepare minimal update payloads || Prepare payloads mínimos de atualização
      updatesPayload = [];
      // Always update the moved task || Sempre atualize a tarefa movida
      updatesPayload.push({
        $id: updatedMovedTask.$id,
        status: destStatus,
        position: Math.min((destination.index + 1) * 1000, 1_000_000),
      });
      // Update postitions for affected tasks in the destination column || Atualize as posicoes das tarefas afetadas na coluna de destino
      newTasks[destStatus].forEach((task, index) => {
        if (task && task.$id !== updatedMovedTask.$id) {
          const newPosition = Math.min((index + 1) * 1000, 1_000_000);
          if (task.position !== newPosition) {
            updatesPayload.push({
              $id: task.$id,
              status: destStatus,
              position: newPosition,
            });
          }
        }
      });
      // If the task moved between columns, update positions in the source column || Se a tarefa foi movida entre colunas, atualize as posicoes na coluna de origem
      if (sourceStatus !== destStatus) {
        newTasks[sourceStatus].forEach((task, index) => {
          if (task) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (task.position !== newPosition) {
              updatesPayload.push({
                $id: task.$id,
                status: sourceStatus,
                position: newPosition,
              });
            }
          }
        });
      }
      return newTasks;
    });
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex overflow-x-auto'>
        {boards.map((board) => (
          <div key={board} className='flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]'>
            <KanbanColumnHeader board={board} taskCount={tasks[board].length} />
            <Droppable droppableId={board}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className='min-h-[200px] py-1.5'>
                  {tasks[board].map((task, index) => (
                    <Draggable key={task.$id} draggableId={task.$id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <KanbanCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};
