"use client";
import { login } from "@/services/auth";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [handleLogin, { loading, error, data }] = useMutation(login, {
    variables: {
      email,
      password,
    },
  });

  useEffect(() => {
    if (data && data?.login) {
      const { jwt, user } = data.login;
      Cookies.set("token", jwt);
      Cookies.set("userId", user._id || "");
      router.push("/");
    }
  }, [data]);

  useEffect(() => {
    if (error && error?.message) {
      alert(error?.message);
    }
  }, [error]);

  const submit = () => {
    if (password && email) {
      const regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      const isValidEmail = regex.test(email);
      if (isValidEmail) {
        handleLogin();
      } else {
        alert("Email is not valid");
      }
    } else {
      alert("Please fill in the form");
    }
  };

  return (
    <>
      <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
        Sign in
      </p>
      <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
        <div className="relative">
          <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
            Email
          </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="123@ex.com"
            type="text"
            className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
          />
        </div>
        <div className="relative">
          <p
            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
          >
            Password
          </p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
          />
        </div>
        <div className="relative">
          <button
            type="submit"
            onClick={submit}
            className={`w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium cursor-pointer text-center text-white ${
              loading ? "bg-gray-100" : "bg-indigo-500"
            }
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease`}
          >
            {loading ? "Loading" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}
