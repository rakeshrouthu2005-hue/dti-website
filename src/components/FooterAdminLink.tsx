
import React from 'react';
import { Link } from 'react-router-dom';

const FooterAdminLink = () => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  const adminPath = isAuthenticated ? '/admin/dashboard' : '/admin';
  const adminLabel = isAuthenticated ? 'Admin Dashboard' : 'Admin Login';

  return (
    <div className="text-sm text-center text-muted-foreground mt-6">
      <Link to={adminPath} className="hover:text-foreground transition-colors">
        {adminLabel}
      </Link>
    </div>
  );
};

export default FooterAdminLink;

