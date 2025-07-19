//import "@/styles/Header.css";

const Header = () => {
  const toggleTheme = () => {
    const rootEl: HTMLElement = document.getElementById("root")!;
    if (rootEl.classList.contains("dark")) rootEl.classList.remove("dark");
    else rootEl.classList.add("dark");
  };

  return (
    <header className="bg-neutral-300 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 sticky top-0 flex items-center mb-8">
      <h1 className="font-bold text-4xl m-4 w-full">Our Schedule App</h1>
      <button
        onClick={toggleTheme}
        className="bg-brand-600 text-brand-900 m-4 p-2 rounded-sm cursor-pointer"
      >
        Theme
      </button>
    </header>
  );
};

export default Header;
