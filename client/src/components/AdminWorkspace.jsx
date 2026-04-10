import SectionHeader from "./SectionHeader";

function AdminWorkspace({
  signupForm,
  signinForm,
  createForm,
  updateForm,
  onSignupChange,
  onSigninChange,
  onCreateChange,
  onUpdateChange,
  onSignupSubmit,
  onSigninSubmit,
  onCreateSubmit,
  onUpdateSubmit,
  onLoadCourses,
  onLogout,
  signedIn,
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8" id="admin-panel">
      <SectionHeader
        eyebrow="Operator"
        title="Admin workspace"
        note="Manage supply-side actions without leaving the primary product surface."
        action={
          <button className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors" onClick={onLoadCourses}>
            Load Active Courses
          </button>
        }
      />

      <div className="flex items-center gap-1.5 mb-8 bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200 w-fit">
        <span className={`w-2 h-2 rounded-full ${signedIn ? 'bg-secondary' : 'bg-gray-400'}`}></span>
        <p className="text-sm font-medium text-gray-700">{signedIn ? "Admin session active" : "Admin session inactive"}</p>
        {signedIn && (
          <button className="ml-4 text-sm font-medium hover:text-red-600 text-gray-500 transition-colors" onClick={onLogout}>Logout</button>
        )}
      </div>

      {!signedIn ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form className="space-y-4" onSubmit={onSignupSubmit}>
            <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Create Admin</h4>
            <div className="grid grid-cols-2 gap-3">
              <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" value={signupForm.fname} onChange={(e) => onSignupChange("fname", e.target.value)} placeholder="First" required />
              <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" value={signupForm.lname} onChange={(e) => onSignupChange("lname", e.target.value)} placeholder="Last" required />
            </div>
            <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="email" value={signupForm.email} onChange={(e) => onSignupChange("email", e.target.value)} placeholder="Email" required />
            <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="password" value={signupForm.password} onChange={(e) => onSignupChange("password", e.target.value)} placeholder="Password" required />
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-medium shadow-lg hover:bg-indigo-600 transition-colors">Register Admin</button>
          </form>

          <form className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100" onSubmit={onSigninSubmit}>
            <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-2">Admin Sign In</h4>
            <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" type="email" value={signinForm.email} onChange={(e) => onSigninChange("email", e.target.value)} placeholder="Email" required />
            <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" type="password" value={signinForm.password} onChange={(e) => onSigninChange("password", e.target.value)} placeholder="Password" required />
            <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium shadow-md hover:bg-gray-800 transition-colors mt-2">Sign In As Admin</button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          <form className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100" onSubmit={onCreateSubmit}>
            <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-2">Create New Course</h4>
            <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" value={createForm.title} onChange={(e) => onCreateChange("title", e.target.value)} placeholder="Course title" required />
            <textarea className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" rows="3" value={createForm.description} onChange={(e) => onCreateChange("description", e.target.value)} placeholder="Course description" required />
            <div className="grid grid-cols-2 gap-3">
              <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" type="number" min="0" step="0.01" value={createForm.price} onChange={(e) => onCreateChange("price", e.target.value)} placeholder="Price" required />
              <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" type="url" value={createForm.imageUrl} onChange={(e) => onCreateChange("imageUrl", e.target.value)} placeholder="Image URL" required />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-medium shadow-md hover:bg-indigo-600 transition-colors">Publish Course</button>
          </form>

          <form className="space-y-4 rounded-2xl border border-gray-200 p-6" onSubmit={onUpdateSubmit}>
            <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Update Course</h4>
            <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" value={updateForm.id} onChange={(e) => onUpdateChange("id", e.target.value)} placeholder="Course ID" required />
            <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" value={updateForm.title} onChange={(e) => onUpdateChange("title", e.target.value)} placeholder="Updated title" />
            <textarea className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" rows="2" value={updateForm.description} onChange={(e) => onUpdateChange("description", e.target.value)} placeholder="Updated description" />
            <div className="grid grid-cols-2 gap-3">
              <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" type="number" min="0" step="0.01" value={updateForm.price} onChange={(e) => onUpdateChange("price", e.target.value)} placeholder="Updated price" />
              <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" type="url" value={updateForm.imageUrl} onChange={(e) => onUpdateChange("imageUrl", e.target.value)} placeholder="Updated image URL" />
            </div>
            <button type="submit" className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors border border-gray-200 mt-2">Save Changes</button>
          </form>
        </div>
      )}
    </section>
  );
}

export default AdminWorkspace;
