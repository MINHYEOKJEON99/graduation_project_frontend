import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import Header from './Header';
import AdminHeader from './AdminHeader';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const router = useRouter();
  const isAdmin = useSelector((state) => state.auth.isAdminAuthenticated);

  useEffect(() => {
    if (!isAdmin && router.pathname.includes('admin')) {
      router.push('/login');
    }
  }, [router, isAdmin]);

  let content =
    !isAdmin && !router.pathname.includes('admin') ? (
      <Header>{children}</Header>
    ) : (
      <AdminHeader>{children}</AdminHeader>
    );

  return <>{content}</>;
}
