import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if the email and password match the expected values
    if (email === "ramyabharathi1765@gmail.com" && password === "Ramya@1765") {
      // Navigate to the home page if credentials are correct
      navigate("/home");
    } else {
      // Show error message if credentials don't match
      setIsError(true);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      {/* Left Half */}
      <div className="flex-1 bg-[#040b20] text-white p-10 flex justify-center items-center">
        <div>
          <h1 className="text-4xl font-bold text-center mb-4">
            Employee Management
          </h1>
          <p className="text-xl text-center italic">"Manage your colleague"</p>
        </div>
      </div>

      {/* Right Half */}
      <div className="flex-1 flex justify-center items-center bg-[#fff]">
        <div className="bg-[#fff] p-8 rounded-lg border-[0.25px] border-black shadow-lg w-[50%]">
          <h2 className="text-2xl text-black font-semibold text-center mb-6">
            <strong>Login</strong>
          </h2>
          {isError && (
            <p className="text-red-500 text-center mb-4">
              Please fill in all fields!
            </p>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border  bg-[#fff] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white-500 transition duration-300"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border  bg-[#fff] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white-500 transition duration-300"
              />
            </div>
            <div className="mb-4 text-center">
              <Button variant="outline" type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-white-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
