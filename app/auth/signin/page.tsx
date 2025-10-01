import ClientSessionGuard from '@/app/components/clientSessionGuard';
import LoginForm from '@/app/components/signin-form';
import { Session } from '@/hooks/session';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const data = await Session();
  if (data) {
    redirect('/dashboard');
  }
  return (
    <ClientSessionGuard>
      <LoginForm />
    </ClientSessionGuard>
  );
}
