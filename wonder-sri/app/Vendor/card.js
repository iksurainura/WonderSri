// components/ui/card.js
export const Card = ({ children, className }) => (
  <div
    className={`rounded-2xl shadow-lg bg-white overflow-hidden ${className}`}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
