
import { Droppable } from "react-beautiful-dnd"
import { TaskCard } from "./TaskCard"

export function KanbanColumn({ title, tasks, id }) {
  const columnColors = {
    Backlog: "bg-gray-100",
    List: "bg-blue-100",
    Doing: "bg-yellow-100",
    Done: "bg-green-100",
    Canceled: "bg-red-100"
  }

  return (
    <div className={`w-full rounded-lg p-4 ${columnColors[title]}`}>
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

