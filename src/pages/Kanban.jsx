import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { KanbanBoard } from "../components/Kanban/KanbanBoard";

export default function Kanban() {
  return (
    <>
      <Breadcrumb pageName="new" />
      <KanbanBoard />
    </>
  );
}
