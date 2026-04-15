import { cn } from "../../utils/cn";

// generates a deterministic color from the name
function colorFromName(name = "") {
  const colors = ["bg-indigo-500","bg-sky-500","bg-emerald-500","bg-amber-500","bg-rose-500","bg-purple-500","bg-teal-500"];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

const sizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-12 h-12 text-base" };

export function Avatar({ name = "", size = "md", className }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={cn("rounded-full flex items-center justify-center text-white font-semibold shrink-0", colorFromName(name), sizes[size], className)}>
      {initials}
    </div>
  );
}
