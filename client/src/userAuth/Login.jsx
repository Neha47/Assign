import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

export default function Login() {

    const navigate = useNavigate();

    const [user , setUser] = useState({
        email: '',
        password: ''
    })
    
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
  
    useEffect(() => {
      const validation = loginSchema.safeParse(user);
      if (!validation.success) {
        setErrors(validation.error.format());
      }
        setErrors({});
    }, [user]);
  
    useEffect(() => { 
      if (submit) {
        const fetchData = async () => {
          try {
            console.log(user);
            
            const response = await axios.post("http://localhost:5000/u/login", {email: user.email, password: user.password});
            console.log(response.data);
            setApiResponse(response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            navigate("/home");
          } catch (err) {
            console.error(err);
            setErrors({ api: "Failed to log in. Please try again." });
         } finally {
            setSubmit(false);
          }
        };
  
        fetchData();
      }
    }, [submit]);
  
    const handle = (e) => {
      e.preventDefault();
      const validation = loginSchema.safeParse(user);
      if (!validation.success) {
        setErrors(validation.error.format());
        return;
      }
      setErrors({});
      setSubmit(true);
    };
    
    
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={user.email}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setUser({...user , email: e.target.value})}
                />
                {errors.email && <p className="text-red-600">{errors.email._errors[0]}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={user.password}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => setUser({...user , password: e.target.value})}
                />
                {errors.password && <p className="text-red-600">{errors.password._password[0]}</p>}
              </div>
            </div>

            {errors.api && <p className="text-red-500">{errors.api}</p>}
            {apiResponse && <p className="text-green-500">Login successful!</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handle}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            New User??{" "}
            <a
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
