import { useEffect, useState } from "react";
import { Header } from "../../components/layout/Header";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Avatar } from "../../components/ui/Avatar";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { adminService } from "../../services/admin.service";
import { PageSpinner } from "../../components/ui/Spinner";

export default function Users() {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]         = useState({ name: "", email: "", password: "", userType: "user" });
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  const load = () => adminService.getUsers().then((d) => setUsers(d.users)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleToggle = async (id) => {
    await adminService.toggleUserStatus(id);
    load();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      await adminService.createUser(form);
      setShowModal(false);
      setForm({ name: "", email: "", password: "", userType: "user" });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <><Header title="Users" /><PageSpinner /></>;

  return (
    <>
      <Header title="Users" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setShowModal(true)}>+ Add User</Button>
        </div>

        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["User", "Email", "Role", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Avatar name={u.name} size="sm" />
                    <span className="font-medium text-gray-800">{u.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={u.userType === "admin" ? "blue" : "gray"}>{u.userType}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={u.isActive ? "green" : "red"}>{u.isActive ? "Active" : "Inactive"}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant={u.isActive ? "danger" : "secondary"} className="!py-1 !text-xs" onClick={() => handleToggle(u._id)}>
                      {u.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add New User">
        <form onSubmit={handleCreate} className="flex flex-col gap-3">
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Input label="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select className="input-base" value={form.userType} onChange={(e) => setForm((f) => ({ ...f, userType: e.target.value }))}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <Button variant="secondary" type="button" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>Create</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
