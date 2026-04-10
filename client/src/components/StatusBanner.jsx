function StatusBanner({ status }) {
  if (!status?.message) {
    return null;
  }

  const isError = status.type === "error";

  return (
    <div className={`px-4 py-3 rounded-lg mb-6 text-sm font-medium shadow-sm border ${isError ? 'bg-red-50 text-red-800 border-red-200' : 'bg-green-50 text-green-800 border-green-200'}`}>
      {status.message}
    </div>
  );
}

export default StatusBanner;
