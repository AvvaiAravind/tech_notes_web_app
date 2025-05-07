import Header from "./components/header/Header";

function App() {
  return (
    <div className="bg-background scrollbar-thin flex flex-grow flex-col items-center">
      <Header />
      <div className="text-primary h-[200vh] p-4 text-center text-5xl">
        Vite Template
      </div>
    </div>
  );
}

export default App;
