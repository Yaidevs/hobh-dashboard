import { Draggable } from "react-beautiful-dnd";
import { Avatar, AvatarFallback } from "./Avatar";
import { Badge } from "./Badge";
import { Card, CardContent, CardHeader } from "./Card";

export function TaskCard({ task, index }) {
  const urgencyColors = {
    Low: "bg-green-100 border-green-200",
    Medium: "bg-yellow-100 border-yellow-200",
    High: "bg-red-100 border-red-200",
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-4 ${
            urgencyColors[task.urgency]
          } border-2 shadow-md transition-all duration-200 hover:shadow-lg`}
        >
          <CardHeader className="p-3 pb-0">
            <Badge
              variant="secondary"
              className="w-fit bg-pink-200 text-pink-700"
            >
              {task.department}
            </Badge>
          </CardHeader>
          <CardContent className="p-3 pt-2">
            <p className="mb-4 text-sm text-gray-600">{task.description}</p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">Due: {task.dueDate}</div>
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  {task.assignees.slice(0, 2).map((assignee, i) => (
                    <Avatar key={i} className="h-6 w-6 border-2 border-white">
                      <AvatarFallback>{assignee[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                {task.assignees.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{task.assignees.length - 2} more
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
