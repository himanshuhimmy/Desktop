import { cn } from "../../utils/cn";

export function Spinner({ className }) {
  return (
    <div className={cn("w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin", className)} />
  );
}

export function PageSpinner() {
  return (
    <div className="flex items-center justify-center h-full min-h-[200px]">
      <Spinner className="w-8 h-8" />
    </div>
  );
}
