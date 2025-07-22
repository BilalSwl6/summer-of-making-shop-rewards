import GuestLayout from "@/layouts/GuestLayout";
import { Link } from "react-router-dom";


function Home() {
  return (
    <GuestLayout>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">I just make only Shop Page</h1>
      <Link to="/shop" className="text-lg">Click Here!</Link>
    </div>
    </GuestLayout>
  );
}

export default Home;
