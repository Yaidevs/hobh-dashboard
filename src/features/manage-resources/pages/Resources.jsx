import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ResourceTable from "./Table";


const Resources = () => {
  return (
    <>
      <Breadcrumb pageName="Resources" />

      <div className="flex flex-col gap-10">
        <ResourceTable />
      </div>
    </>
  );
};

export default Resources;
