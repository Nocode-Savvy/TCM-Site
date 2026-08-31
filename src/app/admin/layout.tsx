// Admin layout — suppresses the public navbar/footer for admin routes
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
