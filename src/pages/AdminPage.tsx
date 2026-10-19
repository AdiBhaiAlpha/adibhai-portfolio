import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project, ProjectState } from '../types';
import { Plus, Edit2, Trash2, RotateCcw, LogOut, CheckCircle2, MessageSquare, FolderGit2, ExternalLink } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    resetProjects,
    isAdminAuthenticated,
    logoutAdmin,
    setCurrentPage,
    contactInquiries,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries'>('projects');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    repo: '',
    tags: '',
    state: 'active' as ProjectState,
    category: 'Web Application'
  });

  if (!isAdminAuthenticated) {
    return (
      <div className="site-section py-24 text-center">
        <div className="site-container max-w-md mx-auto">
          <div className="soft-card p-8">
            <h2 className="font-display text-2xl font-bold text-[var(--text)]">Admin Access Required</h2>
            <p className="mt-2 text-sm text-[var(--text-soft)]">
              Please log in to manage portfolio projects and view inquiries.
            </p>
            <button
              onClick={() => setCurrentPage('login')}
              className="btn-primary mt-6 !px-6 !py-2.5 text-sm"
            >
              Go to Login (Pass: 2448766)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = (p: Project) => {
    setEditingId(p.id);
    setFormData({
      title: p.title || '',
      description: p.description || '',
      image: p.image || '',
      link: p.link || '',
      repo: p.repo || '',
      tags: p.techStack ? p.techStack.join(', ') : '',
      state: p.state || 'active',
      category: p.category || 'Web Application'
    });
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      link: '',
      repo: '',
      tags: '',
      state: 'active',
      category: 'Web Application'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const techStack = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const defaultImage =
      formData.image.trim() ||
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';

    if (editingId) {
      updateProject(editingId, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: defaultImage,
        link: formData.link.trim() || undefined,
        repo: formData.repo.trim() || undefined,
        techStack: techStack.length > 0 ? techStack : ['PHP', 'Laravel', 'React'],
        state: formData.state,
        category: formData.category
      });
      setEditingId(null);
    } else {
      addProject({
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: defaultImage,
        link: formData.link.trim() || undefined,
        repo: formData.repo.trim() || undefined,
        techStack: techStack.length > 0 ? techStack : ['PHP', 'Laravel', 'React'],
        state: formData.state,
        category: formData.category,
        selectedWork: true
      });
    }

    handleCancel();
  };

  return (
    <div className="site-section py-12 sm:py-16">
      <div className="site-container max-w-5xl">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="eyebrow !mb-0">Admin Workspace</p>
            </div>
            <h1 className="font-display text-3xl font-extrabold text-[var(--text)] mt-1">
              Portfolio &amp; Projects Manager
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                logoutAdmin();
                setCurrentPage('home');
              }}
              className="btn-secondary !px-4 !py-2 text-xs flex items-center gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex items-center gap-2 border-b border-[var(--line)] pb-3">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${
              activeTab === 'projects'
                ? 'bg-[#7130cf] text-white shadow-md'
                : 'text-[var(--text-soft)] hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${
              activeTab === 'inquiries'
                ? 'bg-[#7130cf] text-white shadow-md'
                : 'text-[var(--text-soft)] hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Inquiries ({contactInquiries.length})</span>
          </button>
        </div>

        {/* Tab 1: Project Management */}
        {activeTab === 'projects' && (
          <div className="mt-8 space-y-10">
            {/* Project Form */}
            <div className="glass-card rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                <h3 className="font-display text-lg font-bold text-[var(--text)]">
                  {editingId ? 'Edit Project' : 'Add New Project'}
                </h3>
                {editingId && (
                  <button
                    onClick={handleCancel}
                    className="text-xs text-rose-500 font-semibold hover:underline"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Next-Gen Inventory Dashboard"
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition"
                    >
                      <option value="Web Application">Web Application</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Workforce / ERP">Workforce / ERP</option>
                      <option value="Fintech & Tools">Fintech &amp; Tools</option>
                      <option value="Management System">Management System</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the product and its purpose..."
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-3 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">
                      Image URL (Unsplash or direct)
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={e => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">
                      Live Site URL
                    </label>
                    <input
                      type="url"
                      value={formData.link}
                      onChange={e => setFormData({ ...formData, link: e.target.value })}
                      placeholder="https://..."
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={formData.repo}
                      onChange={e => setFormData({ ...formData, repo: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">
                      Tags / Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={e => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="Laravel, PHP, React, MySQL, Tailwind"
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">
                      Project State
                    </label>
                    <select
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value as ProjectState })}
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition"
                    >
                      <option value="active">Active (Production)</option>
                      <option value="building">In building</option>
                      <option value="planned">Planned</option>
                      <option value="paused">Paused</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button type="submit" className="btn-primary !px-6 !py-2.5 text-sm font-bold">
                    {editingId ? 'Update Project' : 'Save New Project'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn-secondary !px-4 !py-2 text-xs"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={resetProjects}
                    className="btn-secondary !px-4 !py-2 text-xs ml-auto flex items-center gap-1.5 text-[var(--text-soft)]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset Default Projects</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Projects List */}
            <div>
              <h3 className="font-display text-xl font-bold text-[var(--text)] mb-4">
                Existing Projects ({projects.length})
              </h3>
              <div className="space-y-3">
                {projects.map(proj => (
                  <div
                    key={proj.id}
                    className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="h-14 w-14 shrink-0 rounded-xl object-cover border border-[var(--line)]"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-base font-bold text-[var(--text)] truncate">
                            {proj.title}
                          </h4>
                          <span className="rounded-full bg-purple-100 dark:bg-purple-950 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:text-purple-300">
                            {proj.state}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-soft)] line-clamp-1 mt-0.5">
                          {proj.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {proj.techStack.map(t => (
                            <span
                              key={t}
                              className="rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[9px] text-[var(--text-soft)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleEdit(proj)}
                        className="btn-secondary !px-3 !py-1.5 !text-xs flex items-center gap-1 text-[#7130cf]"
                      >
                        <Edit2 className="h-3 w-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${proj.title}"?`)) {
                            deleteProject(proj.id);
                          }
                        }}
                        className="rounded-full border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Contact Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="mt-8">
            <h3 className="font-display text-xl font-bold text-[var(--text)] mb-4">
              Received Contact Inquiries
            </h3>
            {contactInquiries.length === 0 ? (
              <div className="soft-card p-12 text-center text-sm text-[var(--text-soft)]">
                No inquiries submitted yet. When visitors fill out the Contact form, their messages will appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {contactInquiries.map(inq => (
                  <div key={inq.id} className="glass-card rounded-2xl p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
                      <div>
                        <h4 className="font-display font-bold text-base text-[var(--text)]">
                          {inq.name}
                        </h4>
                        <a
                          href={`mailto:${inq.email}`}
                          className="text-xs text-[#7130cf] hover:underline"
                        >
                          {inq.email}
                        </a>
                      </div>
                      <span className="text-[11px] text-[var(--text-soft)] font-medium">
                        {inq.createdAt}
                      </span>
                    </div>

                    {inq.subject && (
                      <p className="mt-3 text-xs font-bold text-[var(--text)]">
                        Subject: <span className="font-normal text-[var(--text-soft)]">{inq.subject}</span>
                      </p>
                    )}

                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--text-soft)] bg-[var(--surface-soft)] p-3 rounded-xl">
                      {inq.message}
                    </p>

                    <div className="mt-3 flex justify-end">
                      <a
                        href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject || 'Portfolio Inquiry')}`}
                        className="btn-primary !px-3.5 !py-1.5 !text-xs inline-flex items-center gap-1.5"
                      >
                        <span>Reply via Email</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
