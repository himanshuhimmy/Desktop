import { cn } from "../../utils/cn";

const variants = {
  primary:   "btn-primary",
  secondary: "btn-secondary",
  inverted:  "btn-inverted",
  outlined:  "btn-outlined",
  danger:    "btn-danger",
};

export function Button({ children, variant = "primary", className, loading, ...props }) {
  return (
    <button
      className={cn(variants[variant], className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading
        ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        : children}
    </button>
  );
}
