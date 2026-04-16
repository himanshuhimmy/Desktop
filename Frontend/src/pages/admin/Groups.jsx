import { useEffect, useState } from "react";
import { Header } from "../../components/layout/Header";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Avatar } from "../../components/ui/Avatar";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { conversationService } from "../../services/conversation.service";
import { adminService } from "../../services/admin.service";
import { PageSpinner } from "../../components/ui/Spinner";
import { cn } from "../../utils/cn";

export default function Groups() {
  const [groups, setGroups]     = useState([]);
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm]         = useState({ name: "", memberIds: [], groupManagerId: "" });
  const [saving, setSaving]     = useState(false);

  // detail modal state
  const [selected, setSelected] = useState(null); // the group being managed
  const [detailLoading, setDetailLoading] = useState(false);

  const load = async () => {
    const [convRes, userRes] = await Promise.all([
      conversationService.getAll(),
      adminService.getUsers(),
    ]);
    setGroups(convRes.conversations.filter((c) => c.isGroup));
    setUsers(userRes.users);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  // reload the selected group after a change
  const refreshSelected = async (id) => {
    setDetailLoading(true);
    const res = await conversationService.getById(id);
    setSelected(res.conversation);
    setDetailLoading(false);
    load(); // also refresh the list
  };

  const handleRemoveMember = async (memberId) => {
    setSaving(true);
    await conversationService.updateMembers(selected._id, "remove", memberId);
    await refreshSelected(selected._id);
    setSaving(false);
  };

  const handleAddMember = async (memberId) => {
    setSaving(true);
    await conversationService.updateMembers(selected._id, "add", memberId);
    await refreshSelected(selected._id);
    setSaving(false);
  };

  const handlePromote = async (memberId) => {
    setSaving(true);
    await conversationService.updateManagers(selected._id, "add", memberId);
    await refreshSelected(selected._id);
    setSaving(false);
  };

  const handleDemote = async (managerId) => {
    setSaving(true);
    await conversationService.updateManagers(selected._id, "remove", managerId);
    await refreshSelected(selected._id);
    setSaving(false);
  };

  const toggleMember = (id) =>
    setForm((f) => ({
      ...f,
      memberIds: f.memberIds.includes(id) ? f.memberIds.filter((m) => m !== id) : [...f.memberIds, id],
    }));

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await conversationService.create({ isGroup: true, ...form });
      setShowCreate(false);
      setForm({ name: "", memberIds: [], groupManagerId: "" });
      load();
    } finally { setSaving(false); }
  };

  if (loading) return <><Header title="Groups" /><PageSpinner /></>;

  const managerIds  = selected?.groupManagers?.map((m) => m._id) || [];
  const memberIds   = selected?.members?.map((m) => m._id) || [];
  const nonMembers  = users.filter((u) => !memberIds.includes(u._id));
  const regularUsers = users.filter((u) => u.userType === "user");

  return (
    <>
      <Header title="Groups" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setShowCreate(true)}>+ Create Group</Button>
        </div>

        <div className="grid gap-3">
          {groups.map((g) => (
            <div key={g._id} className="card flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex -space-x-2 shrink-0">
                  {g.members.slice(0, 4).map((m) => <Avatar key={m._id} name={m.name} size="sm" />)}
                  {g.members.length > 4 && (
                    <span className="w-7 h-7 rounded-full bg-primary-50 border-2 border-white flex items-center justify-center text-[10px] text-primary font-bold">
                      +{g.members.length - 4}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-neutral-800 truncate">{g.name}</p>
                  <p className="text-xs text-neutral-400">{g.members.length} members · {g.groupManagers?.length} manager{g.groupManagers?.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {g.groupManagers?.map((m) => (
                  <Badge key={m._id} variant="blue">{m.name}</Badge>
                ))}
                <Button
                  variant="secondary"
                  className="!py-1.5 !text-xs"
                  onClick={async () => {
                    const res = await conversationService.getById(g._id);
                    setSelected(res.conversation);
                  }}
                >
                  Manage
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Create group modal ───────────────────────────── */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Group" size="lg">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input label="Group Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          <div>
            <label className="text-sm font-medium text-neutral-700 block mb-2">Select Members</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {regularUsers.map((u) => (
                <label key={u._id} className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-neutral-50">
                  <input type="checkbox" checked={form.memberIds.includes(u._id)} onChange={() => toggleMember(u._id)} />
                  <Avatar name={u.name} size="sm" />
                  <span className="text-sm truncate">{u.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-neutral-700">Initial Manager</label>
            <select className="input-base" value={form.groupManagerId} onChange={(e) => setForm((f) => ({ ...f, groupManagerId: e.target.value }))} required>
              <option value="">Select a manager</option>
              {regularUsers.filter((u) => form.memberIds.includes(u._id)).map((u) => (
                <option key={u._id} value={u._id}>{u.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" type="button" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>Create Group</Button>
          </div>
        </form>
      </Modal>

      {/* ── Group detail / manage modal ──────────────────── */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `Manage — ${selected.name}` : ""}
        size="lg"
      >
        {detailLoading ? (
          <div className="flex justify-center py-8"><PageSpinner /></div>
        ) : selected ? (
          <div className="flex flex-col gap-5">

            {/* members list */}
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Members ({selected.members.length})
              </p>
              <div className="flex flex-col divide-y divide-neutral-100">
                {selected.members.map((member) => {
                  const isMgr = managerIds.includes(member._id);
                  return (
                    <div key={member._id} className="flex items-center gap-3 py-2.5">
                      <Avatar name={member.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-800">{member.name}</p>
                        <p className="text-xs text-neutral-400">{member.email}</p>
                      </div>

                      {/* manager badge */}
                      {isMgr && <Badge variant="blue">Manager</Badge>}

                      {/* actions */}
                      <div className="flex gap-1.5 shrink-0">
                        {isMgr ? (
                          <Button
                            variant="secondary"
                            className="!py-1 !text-xs"
                            disabled={saving || managerIds.length <= 1}
                            onClick={() => handleDemote(member._id)}
                          >
                            Demote
                          </Button>
                        ) : (
                          <Button
                            variant="secondary"
                            className="!py-1 !text-xs !text-secondary !border-secondary"
                            disabled={saving}
                            onClick={() => handlePromote(member._id)}
                          >
                            Make Manager
                          </Button>
                        )}

                        {!isMgr && (
                          <Button
                            variant="danger"
                            className="!py-1 !text-xs"
                            disabled={saving}
                            onClick={() => handleRemoveMember(member._id)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* add member */}
            {nonMembers.length > 0 && (
              <div className="border-t border-neutral-100 pt-4">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Add Member</p>
                <div className="flex gap-2">
                  <select
                    className="input-base flex-1"
                    id="addMemberSelect"
                    defaultValue=""
                  >
                    <option value="">Select user to add…</option>
                    {nonMembers.map((u) => (
                      <option key={u._id} value={u._id}>{u.name} — {u.email}</option>
                    ))}
                  </select>
                  <Button
                    className="shrink-0"
                    disabled={saving}
                    onClick={() => {
                      const sel = document.getElementById("addMemberSelect").value;
                      if (sel) handleAddMember(sel);
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-end border-t border-neutral-100 pt-3">
              <Button variant="secondary" onClick={() => setSelected(null)}>Done</Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
