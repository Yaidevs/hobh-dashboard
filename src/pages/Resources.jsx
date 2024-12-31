import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import TableThree from "../components/Tables/TableThree";

const Resources = () => {
  return (
    <>
      <Breadcrumb pageName="Resources" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default Resources;
