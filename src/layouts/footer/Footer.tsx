export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="space-y-2 px-12 py-6 text-white font-semibold bg-slate-800">
      <p>React Gift-Finder-App by OzzoDev</p>
      <p className="text-slate-400">&copy; OzzoDev {currentYear}</p>
    </footer>
  );
}
