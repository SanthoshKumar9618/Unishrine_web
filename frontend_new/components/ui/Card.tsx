export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
    hover:bg-white/10 hover:scale-[1.02] transition-all duration-300">
      {children}
    </div>
  );
}