export default function Loader({ className }: { className: string }) {
	return <div className={`animate-spin rounded-full border-1 border-r-0 border-sky-300 ${className}`}></div>;
}
