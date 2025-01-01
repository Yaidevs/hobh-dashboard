import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import TransactionTable from "./Table";

const Transactions = () => {
  return (
    <>
      <Breadcrumb pageName="Transactions" />

      <div className="flex flex-col gap-10">
        <TransactionTable />
      </div>
    </>
  );
};

export default Transactions;
