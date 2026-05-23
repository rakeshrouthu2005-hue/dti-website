
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const NavbarAdminLink = () => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  const adminPath = isAuthenticated ? '/admin/dashboard' : '/admin';
  const adminLabel = isAuthenticated ? 'Dashboard' : 'Admin';

  return (
    <Link
      to={adminPath}
      className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
      aria-label={adminLabel}
    >
      <Shield className="h-4 w-4" />
      <span className="hidden md:inline">{adminLabel}</span>
    </Link>
  );
};

export default NavbarAdminLink;

