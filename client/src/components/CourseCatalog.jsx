import CourseCard from "./CourseCard";
import SectionHeader from "./SectionHeader";
import StatusBanner from "./StatusBanner";

function CourseCatalog({ courses, status, onPurchase }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8" id="catalog">
      <div className="mb-8">
        <SectionHeader
          eyebrow="Catalog"
          title="Course marketplace"
          note="A storefront-style catalog designed to feel more product-led and less tutorial-like."
        />
      </div>
      <StatusBanner status={status} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {courses.length ? (
          courses.map((course) => (
            <CourseCard key={course._id} course={course} onPurchase={onPurchase} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-gray-50 border border-gray-200 border-dashed rounded-xl">
            <p className="text-gray-500 font-medium">No courses are live yet. Use the admin workspace to publish the first offer.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CourseCatalog;
