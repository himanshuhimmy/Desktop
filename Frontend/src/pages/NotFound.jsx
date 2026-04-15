import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen gap-4 bg-neutral">
      <p className="text-8xl font-extrabold text-primary/10 font-headline select-none">404</p>
      <h1 className="!text-2xl text-neutral-800">Page not found</h1>
      <p className="text-neutral-400 text-sm">The page you're looking for doesn't exist or was moved.</p>
      <div className="flex gap-2 mt-2">
        <button onClick={() => navigate(-1)} className="btn-secondary">Go Back</button>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    </div>
  );
}
