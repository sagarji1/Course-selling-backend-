function HeroSection({ courseCount, userSignedIn, adminSignedIn, onRefreshCourses }) {
  return (
    <header className="bg-dark text-white border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg">SF</div>
          <div>
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Course Commerce Suite</p>
            <h1 className="text-xl font-bold tracking-tight">SkillForge</h1>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="#catalog" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Catalog</a>
          <a href="#workspace" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Workspace</a>
          <button className="text-sm font-medium px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors" onClick={onRefreshCourses}>
            Refresh Data
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <section className="space-y-8">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            React SaaS Frontend
          </p>
          <h2 className="text-5xl font-extrabold tracking-tight leading-tight">
            Sell premium courses with the feel of a modern software company.
          </h2>
          <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
            A sharper storefront, stronger admin workspace, and smoother user purchase flow built on top of your existing Express backend.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#catalog" className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 transition-all">View Catalog</a>
            <a href="#admin-panel" className="px-6 py-3 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 shadow-lg transition-all">Manage Courses</a>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500 font-medium pt-4">
            <span className="flex items-center gap-2">✓ Trusted by indie educators</span>
            <span className="flex items-center gap-2">✓ Built for conversion</span>
          </div>
        </section>

        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl -z-10"></div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-6">
            <article className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-sm font-medium text-gray-400">Live catalog</span>
              <div className="text-4xl font-bold mt-2 text-white">{courseCount}</div>
              <p className="text-sm text-gray-500 mt-2">Courses currently available through your API.</p>
            </article>
            <div className="grid grid-cols-2 gap-6">
              <article className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <span className="text-sm font-medium text-gray-400">User session</span>
                <div className="text-2xl font-bold mt-1 text-white flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${userSignedIn ? "bg-secondary" : "bg-red-500"}`}></span>
                  {userSignedIn ? "Active" : "Idle"}
                </div>
              </article>
              <article className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <span className="text-sm font-medium text-gray-400">Admin access</span>
                <div className="text-2xl font-bold mt-1 text-white flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${adminSignedIn ? "bg-secondary" : "bg-red-500"}`}></span>
                  {adminSignedIn ? "Active" : "Idle"}
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}

export default HeroSection;
