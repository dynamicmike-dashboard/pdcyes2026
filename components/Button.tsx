"use client";
export function Button({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  onClick,
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "medium" | "lg";
  type?: "submit" | "button";
  onClick?: () => void;
}) {
  const base = "px-4 py-2 rounded font-medium transition-colors";
  const variants: Record<string, string> = {
    primary: `bg-primary text-white hover:bg-opacity-90`,
    secondary: `bg-secondary text-white hover:bg-opacity-90`,
    danger: `bg-red-500 text-white hover:bg-red-600`,
    outline: `border border-primary text-primary hover:bg-primary/10`,
  };
  const sizes: Record<string, string> = {
    sm: `px-2 py-1 text-sm`,
    medium: `px-4 py-2`,
    lg: `px-6 py-3 text-lg`,
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}