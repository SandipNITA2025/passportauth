import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });

        if (response.status === 200) {
          const resObject = await response.json();
          setUser(resObject.user);
        } else {
          throw new Error("Authentication has failed!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  const logout = () => {
    window.open("http://localhost:8080/auth/logout", "_self");
    localStorage.removeItem("user");
  };

  return (
    <div>
      <h2>Home Page</h2>
      {user && (
        <div>
          <img src={user.photoURL} alt="User Avatar" />
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;
