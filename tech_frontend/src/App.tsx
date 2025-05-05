import Header from "./components/header/Header";

function App() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center bg-[var(--color-background)]">
      <Header />
      <p className="p-4 text-center text-5xl text-[var(--color-text)]">
        Vite Template
      </p>
    </div>
  );
}

export default App;
