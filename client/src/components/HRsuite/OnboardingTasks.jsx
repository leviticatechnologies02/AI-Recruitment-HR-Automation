import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../recruiterDashboard/RecruiterDashboardLayout';

// Mock API functions - replace with actual API calls
const mockAPI = {
  fetchTasks: async (filters) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      tasks: [
        {
          id: 1,
          title: "Complete I-9 Form",
          description: "Fill out employment eligibility verification form",
          assignee: { id: 1, name: "John Doe" },
          dueDate: "2025-10-20",
          status: "pending",
          priority: "high",
          createdDate: "2025-10-10"
        },
        {
          id: 2,
          title: "IT Equipment Setup",
          description: "Request laptop and necessary equipment",
          assignee: { id: 2, name: "Jane Smith" },
          dueDate: "2025-10-18",
          status: "in_progress",
          priority: "medium",
          createdDate: "2025-10-11"
        },
        {
          id: 3,
          title: "Company Policies Training",
          description: "Complete mandatory training modules",
          assignee: { id: 3, name: "Mike Johnson" },
          dueDate: "2025-10-15",
          status: "completed",
          priority: "high",
          createdDate: "2025-10-08"
        },
        {
          id: 4,
          title: "Benefits Enrollment",
          description: "Select health insurance and retirement plans",
          assignee: { id: 4, name: "Sarah Williams" },
          dueDate: "2025-10-12",
          status: "pending",
          priority: "high",
          createdDate: "2025-10-09"
        }
      ],
      total: 4,
      page: 1,
      pageSize: 10
    };
  },
  createTask: async (taskData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...taskData, id: Date.now(), createdDate: new Date().toISOString() };
  },
  updateTask: async (id, taskData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...taskData, id };
  },
  deleteTask: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

const OnboardingTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  });

  useEffect(() => {
    loadTasks();
  }, [filterStatus, currentPage]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await mockAPI.fetchTasks({ status: filterStatus, page: currentPage });
      setTasks(data.tasks);
    } catch (error) {
      showNotification('Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateTask = async () => {
    if (!taskForm.title || !taskForm.assignee || !taskForm.dueDate) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    try {
      const newTask = await mockAPI.createTask({
        ...taskForm,
        assignee: { id: Date.now(), name: taskForm.assignee }
      });
      setTasks([newTask, ...tasks]);
      setShowTaskModal(false);
      resetForm();
      showNotification('Task created successfully');
    } catch (error) {
      showNotification('Failed to create task', 'error');
    }
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTask = await mockAPI.updateTask(selectedTask.id, {
        ...selectedTask,
        ...taskForm,
        assignee: { ...selectedTask.assignee, name: taskForm.assignee }
      });
      setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
      setShowTaskModal(false);
      setSelectedTask(null);
      resetForm();
      showNotification('Task updated successfully');
    } catch (error) {
      showNotification('Failed to update task', 'error');
    }
  };

  const handleDeleteTask = async () => {
    try {
      await mockAPI.deleteTask(selectedTask.id);
      setTasks(tasks.filter(t => t.id !== selectedTask.id));
      setShowDeleteModal(false);
      setSelectedTask(null);
      showNotification('Task deleted successfully');
    } catch (error) {
      showNotification('Failed to delete task', 'error');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const updatedTask = await mockAPI.updateTask(taskId, { ...task, status: newStatus });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
      showNotification('Task status updated');
    } catch (error) {
      showNotification('Failed to update status', 'error');
    }
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      assignee: task.assignee.name,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status
    });
    setShowTaskModal(true);
  };

  const resetForm = () => {
    setTaskForm({
      title: '',
      description: '',
      assignee: '',
      dueDate: '',
      priority: 'medium',
      status: 'pending'
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-warning-subtle text-warning',
      in_progress: 'bg-info-subtle text-info',
      completed: 'bg-success-subtle text-success'
    };
    const icons = {
      pending: 'heroicons:clock',
      in_progress: 'heroicons:arrow-path',
      completed: 'heroicons:check-circle'
    };
    return (
      <span className={`badge d-flex align-items-center ${styles[status]}`}>
        <Icon icon={icons[status]} className="me-1" />
        {status.replace('', ' ').charAt(0).toUpperCase() + status.replace('', ' ').slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-danger-subtle text-danger',
      medium: 'bg-warning-subtle text-warning',
      low: 'bg-success-subtle text-success'
    };
    return (
      <span className={`badge ${styles[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectTask = (taskId) => {
    setSelectedTasks(prev =>
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredTasks.map(t => t.id));
    }
  };

  return (
      <div>
      <div className="container-fluid">
        {/* Notification */}
        {notification && (
          <div className={`position-fixed top-0 end-0 m-3 z-50 alert alert-${notification.type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`} role="alert">
            {notification.message}
            <button type="button" className="btn-close" onClick={() => setNotification(null)}></button>
          </div>
        )}

        {/* Header */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="text-3xl fw-bold text-dark mb-2 mt-3 d-flex align-items-center gap-2">
                <Icon icon="heroicons:clipboard-document-check"/>
                Onboarding Tasks
              </h5>
              <p className="text-muted">Manage and track onboarding tasks for new hires</p>
            </div>
            <button
              onClick={() => {
                setSelectedTask(null);
                resetForm();
                setShowTaskModal(true);
              }}
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <Icon icon="heroicons:plus" className="me-2" />
              Add New Task
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="d-flex flex-column flex-md-row gap-3 mb-4">
            <div className="position-relative flex-fill">
              <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
              <input
                type="text"
                placeholder="Search by task name or assignee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control ps-5"
              />
            </div>
            <div className="d-flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-select"
                style={{ minWidth: '150px' }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
              >
                <Icon icon="heroicons:funnel" className="me-1" />
                Filters
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedTasks.length > 0 && (
            <div className="alert alert-info d-flex align-items-center justify-content-between mb-4">
              <span className="fw-medium">
                {selectedTasks.length} task(s) selected
              </span>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-primary">
                  Mark Complete
                </button>
                <button className="btn btn-sm btn-outline-primary">
                  Assign To
                </button>
                <button className="btn btn-sm btn-outline-danger">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Task List Table */}
        <div className="card border shadow-none">
          <div className="card-body p-0">
            {loading ? (
              <div className="d-flex align-items-center justify-content-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                          onChange={handleSelectAll}
                          className="form-check-input"
                        />
                      </th>
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Task Name</th>
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Assigned To</th>
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Due Date</th>
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Status</th>
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Priority</th>
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr
                        key={task.id}
                        className={`${isOverdue(task.dueDate) && task.status !== 'completed' ? 'bg-danger-subtle' : ''}`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task.id)}
                            onChange={() => handleSelectTask(task.id)}
                            className="form-check-input"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="fw-medium text-dark">{task.title}</div>
                            <div className="text-muted small mt-1">{task.description}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-dark">{task.assignee.name}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center gap-2">
                            <Icon icon="heroicons:calendar" className="text-muted" />
                            <span className={`${isOverdue(task.dueDate) && task.status !== 'completed' ? 'text-danger fw-medium' : 'text-dark'}`}>
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3" style={{width:"40px"}}>
                          {getStatusBadge(task.status)}
                        </td>
                        <td className="px-4 py-3">
                          {getPriorityBadge(task.priority)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center gap-2">
                            <button
                              onClick={() => openEditModal(task)}
                              className="btn btn-sm btn-outline-primary"
                              title="Edit"
                            >
                              <Icon icon="heroicons:pencil" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedTask(task);
                                setShowDeleteModal(true);
                              }}
                              className="btn btn-sm btn-outline-danger"
                              title="Delete"
                            >
                              <Icon icon="heroicons:trash" />
                            </button>
                            {task.status !== 'completed' && (
                              <button
                                onClick={() => handleStatusChange(task.id, 'completed')}
                                className="btn btn-sm btn-outline-success"
                                title="Mark Complete"
                              >
                                <Icon icon="heroicons:check-circle" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {filteredTasks.length === 0 && !loading && (
              <div className="text-center py-5 text-muted">
                No tasks found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Task Modal */}
      {showTaskModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedTask ? 'Edit Task' : 'Create New Task'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowTaskModal(false);
                    setSelectedTask(null);
                    resetForm();
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Task Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={taskForm.title}
                      onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                      className="form-control"
                      placeholder="Enter task title"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      value={taskForm.description}
                      onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                      rows={3}
                      className="form-control"
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Assignee <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={taskForm.assignee}
                      onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })}
                      className="form-control"
                      placeholder="Employee name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Due Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      value={taskForm.dueDate}
                      onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Priority</label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                      className="form-select"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Status</label>
                    <select
                      value={taskForm.status}
                      onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                      className="form-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => {
                    setShowTaskModal(false);
                    setSelectedTask(null);
                    resetForm();
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={selectedTask ? handleUpdateTask : handleCreateTask}
                  className="btn btn-primary"
                >
                  {selectedTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedTask(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  Are you sure you want to delete "{selectedTask?.title}"? This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedTask(null);
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteTask}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
     </div>
       );
};

export default OnboardingTasks;