import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Plus, Search, Edit2, Trash2, Eye, X, Save, Bold, Italic, Underline, List, ListOrdered } from 'lucide-react';

const OfferTemplates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Frontend Developer Offer',
      createdBy: 'Nagendra',
      lastUsed: '5 Oct 2025',
      content: `Dear {{CandidateName}},

We are pleased to offer you the position of {{JobTitle}} at {{CompanyName}}.
Your expected start date will be {{StartDate}}, with a salary of ₹{{Salary}} per annum.

We are excited to have you on our team!

Sincerely,
{{HRName}}
{{CompanyName}}`
    },
    {
      id: 2,
      name: 'Senior UI Designer',
      createdBy: 'HR Admin',
      lastUsed: '28 Sep 2025',
      content: `Dear {{CandidateName}},

We are thrilled to extend an offer for the Senior UI Designer position at {{CompanyName}}.

Your joining date: {{StartDate}}
Annual Package: ₹{{Salary}}

Looking forward to your contributions.

Best Regards,
{{HRName}}`
    },
    {
      id: 3,
      name: 'Python Developer Offer',
      createdBy: 'Ravi',
      lastUsed: '10 Sep 2025',
      content: `Dear {{CandidateName}},

Congratulations! We are delighted to offer you the Python Developer role at {{CompanyName}}.

Start Date: {{StartDate}}
Compensation: ₹{{Salary}} per annum

We're excited to have you join our team!

Warm regards,
{{HRName}}`
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    content: ''
  });
  const [toast, setToast] = useState(null);
  const [sortBy, setSortBy] = useState('lastUsed');

  const placeholders = [
    '{{CandidateName}}',
    '{{JobTitle}}',
    '{{CompanyName}}',
    '{{StartDate}}',
    '{{Salary}}',
    '{{HRName}}'
  ];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateNew = () => {
    setCurrentTemplate(null);
    setFormData({ name: '', content: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (template) => {
    setCurrentTemplate(template);
    setFormData({ name: template.name, content: template.content });
    setIsModalOpen(true);
  };

  const handlePreview = (template) => {
    setCurrentTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== id));
      showToast('Template deleted successfully!', 'success');
    }
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.content.trim()) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (currentTemplate) {
      setTemplates(templates.map(t =>
        t.id === currentTemplate.id
          ? { ...t, name: formData.name, content: formData.content }
          : t
      ));
      showToast(`Template "${formData.name}" updated successfully!`);
    } else {
      const newTemplate = {
        id: Date.now(),
        name: formData.name,
        createdBy: 'Nagendra',
        lastUsed: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        content: formData.content
      };
      setTemplates([newTemplate, ...templates]);
      showToast(`Template "${formData.name}" created successfully!`);
    }

    setIsModalOpen(false);
  };

  const insertPlaceholder = (placeholder) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content + placeholder
    }));
  };

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === 'lastUsed') {
      return new Date(b.lastUsed) - new Date(a.lastUsed);
    }
    return a.createdBy.localeCompare(b.createdBy);
  });

  return (
    <div className="container-fluid">
      {/* Toast Notification */}
      {toast && (
        <div className={`position-fixed top-0 end-0 m-4 p-3 rounded shadow-lg ${
          toast.type === 'success' ? 'bg-success' : 'bg-danger'
        } text-white`} style={{zIndex: 1050}}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="card border shadow-none mb-4 mt-3">
        <div className="card-body">
          <div className="d-flex align-items-start justify-content-between mb-3">
            <div>
              <h5 className="mb-1">
                <Icon icon="heroicons:document-text"/> Offer Templates</h5>
              <p className="text-muted mb-0">Manage all your offer letter templates in one place.</p>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleCreateNew}
            >
              <Plus size={18} className="me-2" />
              Create New Template
            </button>
          </div>

          {/* Search Bar */}
          <div className="input-group">
            <span className="input-group-text">
              <Search size={18} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search templates by name or creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Templates Table */}
      <div className="card border shadow-none">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 text-start">Template Name</th>
                  <th 
                    className="px-4 py-3 text-start" 
                    style={{cursor: 'pointer'}}
                    onClick={() => setSortBy('createdBy')}
                  >
                    Created By {sortBy === 'createdBy' && '↓'}
                  </th>
                  <th 
                    className="px-4 py-3 text-start" 
                    style={{cursor: 'pointer'}}
                    onClick={() => setSortBy('lastUsed')}
                  >
                    Last Used {sortBy === 'lastUsed' && '↓'}
                  </th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedTemplates.map((template) => (
                  <tr key={template.id}>
                    <td className="px-4 py-3 text-start">
                      <div className="fw-medium">{template.name}</div>
                    </td>
                    <td className="px-4 py-3 text-start">
                      <div className="text-muted small">{template.createdBy}</div>
                    </td>
                    <td className="px-4 py-3 text-start">
                      <div className="text-muted small">{template.lastUsed}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handlePreview(template)}
                          title="Preview"
                        >
                          <Eye size={14} className="me-1" />
                          Preview
                        </button>
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleEdit(template)}
                          title="Edit"
                        >
                          <Edit2 size={14} className="me-1" />
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(template.id)}
                          title="Delete"
                        >
                          <Trash2 size={14} className="me-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedTemplates.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">No templates found. Create your first template!</p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {currentTemplate ? 'Edit Template' : 'Create New Template'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>

              <div className="modal-body">
                {/* Template Name */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Template Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Frontend Developer Offer"
                  />
                </div>

                {/* Placeholders */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Insert Placeholder</label>
                  <div className="d-flex flex-wrap gap-2 align-items-center">
                    {placeholders.map((placeholder) => (
                      <button
                        key={placeholder}
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => insertPlaceholder(placeholder)}
                        style={{marginBottom: '4px'}}
                      >
                        {placeholder}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rich Text Editor */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Template Content</label>
                  <div className="border rounded">
                    {/* Toolbar */}
                    <div className="bg-light border-bottom p-2 d-flex align-items-center gap-2 flex-wrap">
                      <button type="button" className="btn btn-sm btn-light" title="Bold">
                        <Bold size={14} />
                      </button>
                      <button type="button" className="btn btn-sm btn-light" title="Italic">
                        <Italic size={14} />
                      </button>
                      <button type="button" className="btn btn-sm btn-light" title="Underline">
                        <Underline size={14} />
                      </button>
                      <div className="vr"></div>
                      <button type="button" className="btn btn-sm btn-light" title="Bullet List">
                        <List size={14} />
                      </button>
                      <button type="button" className="btn btn-sm btn-light" title="Numbered List">
                        <ListOrdered size={14} />
                      </button>
                    </div>
                    
                    {/* Editor Area */}
                    <textarea
                      className="form-control border-0"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your offer letter template here..."
                      rows="12"
                      style={{resize: 'none'}}
                    />
                  </div>
                  <p className="small text-muted mt-2">
                    Use placeholders like {placeholders.join(', ')} for dynamic content
                  </p>
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  <Save size={16} className="me-2" />
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && currentTemplate && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Preview: {currentTemplate.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsPreviewOpen(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="bg-light p-4 rounded border">
                  <pre className="mb-0" style={{whiteSpace: 'pre-wrap', fontFamily: 'inherit'}}>
                    {currentTemplate.content}
                  </pre>
                </div>
                <p className="small text-muted mt-3">
                  Note: Placeholders will be replaced with actual values when generating the offer letter.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferTemplates;