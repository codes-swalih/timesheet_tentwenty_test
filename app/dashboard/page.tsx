import TimeSheetTable from "./components/TimeSheetTable";

function page() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen w-full flex justify-center">
      <div className=" w-4/5">
        <TimeSheetTable />
      </div>
    </div>
  );
}

export default page;
