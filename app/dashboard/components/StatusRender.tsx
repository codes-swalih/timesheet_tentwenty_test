export const renderStatus = (val: string) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500/20 text-green-900 font-medium px-3 py-1 rounded-lg";
      case "INCOMPLETE":
        return "bg-yellow-100/90 text-yellow-900 px-3 font-medium py-1 rounded-lg";
      case "MISSING":
        return "bg-rose-500/10 text-red-900 px-3 font-medium py-1 rounded-lg";
      case "PENDING":
        return "bg-blue-500 text-white px-3 font-medium py-1 rounded-lg";
      default:
        return "bg-gray-500 text-white px-3 font-medium py-1 rounded-lg";
    }
  };
  return (
    <span className={getStatusClass(val || "PENDING")}>{val ?? "PENDING"}</span>
  );
};
