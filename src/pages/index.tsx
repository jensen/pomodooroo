import { Outlet, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="h-full flex flex-col">
      <header
        className="px-4 py-2 text-2xl text-white font-black bg-red-400 border-b border-red-200"
        onClick={() => navigate("/")}
      >
        pomodooroo.
      </header>
      <section className="px-4 py-4 flex-grow bg-gray-100 flex flex-col justify-center items-center">
        <div className="m-auto">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default Index;
