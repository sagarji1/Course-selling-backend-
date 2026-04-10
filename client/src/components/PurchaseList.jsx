import { formatPrice } from "../utils/format";

function PurchaseList({ purchases }) {
  if (!purchases.length) {
    return <div className="py-8 text-center bg-gray-50 rounded-xl border border-gray-200 border-dashed"><p className="text-gray-500 font-medium">No purchased courses yet.</p></div>;
  }

  return (
    <div className="space-y-4">
      {purchases.map((course) => (
        <article className="flex max-sm:flex-col sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow" key={course._id || course.title}>
          <div>
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Owned course</p>
            <h5 className="text-lg font-bold text-gray-900 leading-tight">{course.title || "Untitled Course"}</h5>
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{course.description || "No description available."}</p>
          </div>
          <strong className="text-xl font-black text-gray-900 whitespace-nowrap bg-gray-50 px-3 py-1 rounded-lg">{formatPrice(course.price)}</strong>
        </article>
      ))}
    </div>
  );
}

export default PurchaseList;
