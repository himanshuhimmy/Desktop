import AdminLogin from "./AdminLogin";

const AdminLoginPage = () => {
  return (
    <div>
      <header className="flex shadow-2xl justify-around py-3">
        <div className="flex mx-4">
          img
          <h1 className="text-3xl font-bold">Luxe</h1>
        </div>
        <div></div>
        <div className="flex gap-4 mx-4 font-semibold">
          <p className="bg-[rgb(228,238,246)] px-2 py-4 border border-[rgb(228,238,248)] text-[rgb(24,73,177)] rounded-2xl">
            Enterprise Security Active
          </p>
        </div>
      </header>
      <AdminLogin />
    </div>
  );
};

export default AdminLoginPage;
