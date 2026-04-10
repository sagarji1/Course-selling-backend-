import { formatPrice } from "../utils/format";

function CourseCard({ course, onPurchase }) {
  const imageUrl =
    course.imageUrl ||
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={imageUrl} alt={course.title || "Course"} />
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm uppercase tracking-wider backdrop-saturate-200">
          #{course._id?.slice(-6) || "course"}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs font-bold tracking-widest text-primary uppercase mb-2">Premium Track</p>
        <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{course.title || "Untitled Course"}</h4>
        <p className="text-sm text-gray-500 mb-6 line-clamp-2 flex-1">
          {course.description || "No description available yet."}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <strong className="text-2xl font-black text-gray-900">{formatPrice(course.price)}</strong>
          <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-primary shadow-sm transition-colors" onClick={() => onPurchase(course._id)}>
            Purchase
          </button>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
