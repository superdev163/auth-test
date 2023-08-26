"use client";

import { Spinner } from "@/components/spinner";
import { userDetail } from "@/services/auth";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { error, data } = useQuery(userDetail, {
    variables: {
      userId: Cookies.get("userId"),
    },
  });

  const logOut = () => {
    Cookies.remove("userId");
    Cookies.remove("token");
    router.push("/login");
  };

  useEffect(() => {
    if (error) {
      alert("There is error occured, please log in again");
      logOut();
    }
  }, [error]);

  return (
    <>
      {data ? (
        <>
          <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
            User Details
          </p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 ">
                First Name: {data.user.firstName}
              </p>
            </div>
            <div className="relative">
              <p
                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    "
              >
                Last Name: {data.user.lastName}
              </p>
            </div>
            <div className="relative">
              <button
                onClick={logOut}
                className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-red-500
                    rounded-lg transition duration-200 hover:bg-red-600 ease"
              >
                Log out
              </button>
            </div>
          </div>{" "}
        </>
      ) : (
        <div className="m-auto">
          <Spinner />
        </div>
      )}
    </>
  );
}
