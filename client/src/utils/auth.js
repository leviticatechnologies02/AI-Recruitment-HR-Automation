// Authentication and Authorization Utilities

export const getUserRole = () => {
  return localStorage.getItem('userRole');
};

export const getUserEmail = () => {
  return localStorage.getItem('userEmail');
};

export const isAuthenticated = () => {
  return localStorage.getItem('userRole') !== null;
};

export const isSuperAdmin = () => {
  return localStorage.getItem('userRole') === 'superadmin';
};

export const isRegularUser = () => {
  return localStorage.getItem('userRole') === 'user';
};

export const logout = () => {
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');
};

export const checkSuperAdminAccess = (navigate) => {
  const role = getUserRole();
  if (role !== 'superadmin') {
    alert('Access denied. Super Admin only.');
    navigate('/login');
    return false;
  }
  return true;
};

export const checkUserAccess = (navigate) => {
  const role = getUserRole();
  if (!role || (role !== 'user' && role !== 'superadmin')) {
    alert('Access denied. Please login.');
    navigate('/login');
    return false;
  }
  return true;
};
