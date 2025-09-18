export default function FunLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Fun and Games</h1>
      {children}
    </div>
  );
}
