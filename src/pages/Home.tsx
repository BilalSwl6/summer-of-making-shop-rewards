import GuestLayout from "@/layouts/GuestLayout";


function Home() {
  return (
    <GuestLayout>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
      <p className="text-lg">This is the home page.</p>
    </div>
    </GuestLayout>
  );
}

export default Home;
