export function Card({ children, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className={`bg-indigo-100 border border-indigo-200 p-6 rounded-xl cursor-pointer hover:scale-105 hover:bg-indigo-200 transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="mt-3 text-sm text-gray-700">{children}</div>;
}
