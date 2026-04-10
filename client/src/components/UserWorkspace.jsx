import PurchaseList from "./PurchaseList";

function UserWorkspace({
  signupForm,
  signinForm,
  purchases,
  onSignupChange,
  onSigninChange,
  onSignupSubmit,
  onSigninSubmit,
  onLoadPurchases,
  onLogout,
  signedIn,
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-start justify-between border-b border-gray-100 pb-6 mb-8">
        <div>
          <p className="text-xs font-bold tracking-wider text-primary uppercase mb-1">Learner Room</p>
          <h2 className="text-2xl font-bold text-gray-900">User Workspace</h2>
          <p className="text-sm text-gray-500 mt-1">Manage signin, accounts, and your bought courses.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${signedIn ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            <span className={`w-2 h-2 rounded-full ${signedIn ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            {signedIn ? "Active Session" : "Offline"}
          </span>
          {signedIn && (
            <button className="text-sm font-medium hover:text-red-600 text-gray-500 transition-colors" onClick={onLogout}>Logout</button>
          )}
        </div>
      </div>

      {!signedIn ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <form className="space-y-4" onSubmit={onSignupSubmit}>
            <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Create Account</h4>
            <div className="grid grid-cols-2 gap-3">
              <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" value={signupForm.fname} onChange={(e) => onSignupChange("fname", e.target.value)} placeholder="First" required />
              <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" value={signupForm.lname} onChange={(e) => onSignupChange("lname", e.target.value)} placeholder="Last" required />
            </div>
            <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="email" value={signupForm.email} onChange={(e) => onSignupChange("email", e.target.value)} placeholder="Email" required />
            <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="password" value={signupForm.password} onChange={(e) => onSignupChange("password", e.target.value)} placeholder="Password" required />
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-medium shadow-lg shadow-primary/25 hover:bg-indigo-600 transition-colors">Register</button>
          </form>
          <form className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100" onSubmit={onSigninSubmit}>
            <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-2">Sign In</h4>
            <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" type="email" value={signinForm.email} onChange={(e) => onSigninChange("email", e.target.value)} placeholder="Email" required />
            <input className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white" type="password" value={signinForm.password} onChange={(e) => onSigninChange("password", e.target.value)} placeholder="Password" required />
            <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium shadow-md hover:bg-gray-800 transition-colors mt-2">Enter Workspace</button>
          </form>
        </div>
      ) : null}

      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-bold text-gray-900">Your Library</h4>
          {signedIn && <button className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors" onClick={onLoadPurchases}>Refresh List</button>}
        </div>
        {!signedIn ? (
          <div className="py-8 text-center bg-white rounded-xl border border-gray-200 border-dashed">
            <p className="text-gray-500 font-medium">Sign in to view your purchases.</p>
          </div>
        ) : (
          <PurchaseList purchases={purchases} />
        )}
      </div>
    </section>
  );
}

export default UserWorkspace;
