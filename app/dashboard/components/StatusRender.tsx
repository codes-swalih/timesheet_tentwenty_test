export const renderStatus = (val: string) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500 text-white px-3 py-1 rounded-md";
      case "INCOMPLETE":
        return "bg-yellow-500 text-white px-3 py-1 rounded-md";
      case "MISSING":
        return "bg-red-500 text-white px-3 py-1 rounded-md";
      case "PENDING":
        return "bg-blue-500 text-white px-3 py-1 rounded-md";
      default:
        return "bg-gray-500 text-white px-3 py-1 rounded-md";
    }
  };
  return (
    <span className={getStatusClass(val || "PENDING")}>{val ?? "PENDING"}</span>
  );
};
