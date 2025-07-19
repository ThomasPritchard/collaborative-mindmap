export default function Toolbar() {
  return (
    <div id="ui-toolbar" className="absolute top-20 left-1/2 z-10 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-lg bg-blue-600/60 p-2 text-white shadow-lg backdrop-blur-sm">
        <button className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold hover:bg-blue-500">
          Add Node
        </button>
        <button className="rounded bg-red-600 px-3 py-1.5 text-sm font-semibold hover:bg-blue-500">
          Remove Node
        </button>
        <div className="h-6 w-px bg-white/20"></div>
        {/* Add other UI controls here */}
      </div>
    </div>
  );
};