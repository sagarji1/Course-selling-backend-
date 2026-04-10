import { useEffect, useState } from "react";
import AdminWorkspace from "./components/AdminWorkspace";
import CourseCatalog from "./components/CourseCatalog";
import HeroSection from "./components/HeroSection";
import UserWorkspace from "./components/UserWorkspace";
import { emptyCourseForm, emptySigninForm, emptyUpdateForm, emptyUserForm } from "./constants/forms";
import { useAuth } from "./hooks/useAuth";
import { apiFetch } from "./utils/api";

function App() {
  const [courses, setCourses] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });

  const [createCourseForm, setCreateCourseForm] = useState(emptyCourseForm);
  const [updateCourseForm, setUpdateCourseForm] = useState(emptyUpdateForm);

  const pushStatus = (type, message) => setStatus({ type, message });

  const userAuth = useAuth({
    role: "User",
    initialSignup: emptyUserForm,
    initialSignin: emptySigninForm,
    pushStatus,
  });

  const adminAuth = useAuth({
    role: "Admin",
    initialSignup: emptyUserForm,
    initialSignin: emptySigninForm,
    pushStatus,
  });

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const data = await apiFetch("/api/v1/course/allCourses");
      setCourses(data.courses || []);
    } catch (error) {
      setCourses([]);
      pushStatus("error", error.message || "Could not load courses.");
    }
  }

  async function loadPurchases() {
    if (!userAuth.token) {
      pushStatus("error", "Sign in as a user first to view purchases.");
      return;
    }
    try {
      const response = await apiFetch("/api/v1/user/purchase", {
        headers: { Authorization: `Bearer ${userAuth.token}` },
      });
      setPurchases(response.purchasedCourses || []);
      pushStatus("success", "Purchased courses synced.");
    } catch (error) {
      pushStatus("error", error.message);
    }
  }

  async function handlePurchase(courseId) {
    if (!userAuth.token) {
      pushStatus("error", "Sign in as a user before purchasing a course.");
      return;
    }
    try {
      const response = await apiFetch(`/api/v1/user/purchase/${courseId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${userAuth.token}` },
      });
      setPurchases(response.purchasedCourses || []);
      pushStatus("success", response.msg || "Course purchased successfully.");
    } catch (error) {
      pushStatus("error", error.message);
    }
  }

  async function handleCreateCourse(event) {
    event.preventDefault();
    if (!adminAuth.token) {
      pushStatus("error", "Sign in as admin before creating courses.");
      return;
    }
    try {
      const data = await apiFetch("/api/v1/admin/courses", {
        method: "POST",
        headers: { token: adminAuth.token },
        body: JSON.stringify({ ...createCourseForm, price: Number(createCourseForm.price) }),
      });
      setCreateCourseForm(emptyCourseForm);
      pushStatus("success", data.msg || "Course created.");
      await loadCourses();
    } catch (error) {
      pushStatus("error", error.message);
    }
  }

  async function handleUpdateCourse(event) {
    event.preventDefault();
    if (!adminAuth.token) {
      pushStatus("error", "Sign in as admin before updating courses.");
      return;
    }

    const payload = { ...updateCourseForm };
    const courseId = payload.id;
    delete payload.id;
    Object.keys(payload).forEach((key) => { if (payload[key] === "") delete payload[key]; });
    if (payload.price !== undefined) payload.price = Number(payload.price);

    try {
      const data = await apiFetch(`/api/v1/admin/courses/${courseId}`, {
        method: "PUT",
        headers: { token: adminAuth.token },
        body: JSON.stringify(payload),
      });
      setUpdateCourseForm(emptyUpdateForm);
      pushStatus("success", data.msg || "Course updated.");
      await loadCourses();
    } catch (error) {
      pushStatus("error", error.message);
    }
  }

  async function loadAdminCourses() {
    if (!adminAuth.token) {
      pushStatus("error", "Sign in as admin first to use the admin course view.");
      return;
    }
    try {
      const data = await apiFetch("/api/v1/admin/courses/bulk", {
        headers: { token: adminAuth.token },
      });
      setCourses(data.courses || []);
      pushStatus("success", "Admin course list loaded.");
    } catch (error) {
      pushStatus("error", error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <HeroSection
        courseCount={courses.length}
        userSignedIn={Boolean(userAuth.token)}
        adminSignedIn={Boolean(adminAuth.token)}
        onRefreshCourses={loadCourses}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="workspace">
        <div className="mb-12">
          <CourseCatalog courses={courses} status={status} onPurchase={handlePurchase} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <UserWorkspace
            signupForm={userAuth.signupForm}
            signinForm={userAuth.signinForm}
            purchases={purchases}
            onSignupChange={userAuth.updateSignupForm}
            onSigninChange={userAuth.updateSigninForm}
            onSignupSubmit={userAuth.handleSignup}
            onSigninSubmit={userAuth.handleSignin}
            onLoadPurchases={loadPurchases}
            onLogout={userAuth.logout}
            signedIn={Boolean(userAuth.token)}
          />

          <AdminWorkspace
            signupForm={adminAuth.signupForm}
            signinForm={adminAuth.signinForm}
            createForm={createCourseForm}
            updateForm={updateCourseForm}
            onSignupChange={adminAuth.updateSignupForm}
            onSigninChange={adminAuth.updateSigninForm}
            onCreateChange={(field, value) => setCreateCourseForm(prev => ({ ...prev, [field]: value }))}
            onUpdateChange={(field, value) => setUpdateCourseForm(prev => ({ ...prev, [field]: value }))}
            onSignupSubmit={adminAuth.handleSignup}
            onSigninSubmit={adminAuth.handleSignin}
            onCreateSubmit={handleCreateCourse}
            onUpdateSubmit={handleUpdateCourse}
            onLoadCourses={loadAdminCourses}
            onLogout={adminAuth.logout}
            signedIn={Boolean(adminAuth.token)}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
