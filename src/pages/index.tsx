import { Outlet, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="h-full flex flex-col">
      <header className="px-4 py-2 text-2xl text-white bg-red-400 border-b border-red-200">
        <button className="font-black" onClick={() => navigate("/")}>
          pomodooroo.
        </button>
      </header>
      <section className="px-4 py-4 flex-grow bg-gray-100 flex flex-col">
        <div className="mx-auto">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default Index;
