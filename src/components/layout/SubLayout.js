import { useSelector } from 'react-redux';
import AdminSubLayout from './AdminSubLayout';
import UserSubLayout from './UserSubLayout';
import { useRouter } from 'next/router';

export default function SubLayout({ children }) {
  const router = useRouter();
  const isAdmin = useSelector((state) => state.auth.isAdminAuthenticated);

  let content =
    !isAdmin && !router.pathname.includes('admin') ? (
      <UserSubLayout>{children}</UserSubLayout>
    ) : (
      <AdminSubLayout>{children}</AdminSubLayout>
    );
  return <>{content}</>;
}
