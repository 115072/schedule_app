import "@/styles/Header.css";

const Header = () => {
  const toggleTheme = () => {
    const rootEl: HTMLElement = document.getElementById("root")!;
    if (rootEl.classList.contains("dark")) rootEl.classList.remove("dark");
    else rootEl.classList.add("dark");
  };

  return (
    <header>
      <button
        onClick={toggleTheme}
        className="bg-brand-600 text-neutral-900 m-4"
      >
        Toggle Theme
      </button>
      <h1>Our Schedule App</h1>
    </header>
  );
};

export default Header;
