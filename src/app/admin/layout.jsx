export const metadata = {
  title: "Admin | PreciousWrites",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
