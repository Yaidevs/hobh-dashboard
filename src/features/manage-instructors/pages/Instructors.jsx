import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import InstructorTable from "./Table";


const Instructors = () => {
  return (
    <>
      <Breadcrumb pageName="Instructors" />

      <div className="flex flex-col gap-10">
        <InstructorTable />
      </div>
    </>
  );
};

export default Instructors;
