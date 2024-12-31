import { useState } from "react";
import { Plus } from "lucide-react";
import { DragDropContext } from "react-beautiful-dnd";
import { KanbanColumn } from "./KanbaColumn";

const initialTasks = [
  {
    id: "1",
    description:
      "This is the description of the task for the thing that needs to be done.",
    status: "Backlog",
    urgency: "High",
    dueDate: "15 Aug",
    assignees: ["John D", "Jane S"],
    department: "Development",
  },
  {
    id: "2",
    description:
      "This is the description of the task for the thing that needs to be done.",
    status: "List",
    urgency: "Medium",
    dueDate: "15 Aug",
    assignees: ["John D", "Jane S"],
    department: "Development",
  },
  {
    id: "3",
    description:
      "This is the description of the task for the thing that needs to be done.",
    status: "Doing",
    urgency: "Low",
    dueDate: "15 Aug",
    assignees: ["John D", "Jane S"],
    department: "Development",
  },
];

const columns = ["Backlog", "List", "Doing", "Done", "Canceled"];

export function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTasks = Array.from(tasks);
    const [reorderedItem] = newTasks.splice(source.index, 1);
    reorderedItem.status = destination.droppableId;
    newTasks.splice(destination.index, 0, reorderedItem);

    setTasks(newTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4">
        <button className="mb-6">
          <Plus className="mr-2 h-4 w-4" />
          Add new task
        </button>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {columns.map((status) => (
            <KanbanColumn
              key={status}
              id={status}
              title={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}
