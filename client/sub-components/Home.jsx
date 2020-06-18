import React from "react";

const Home = (props) => {
  React.useEffect(() => {
    const token = localStorage.getItem("userId");
    console.log(token);
    if (!token) {
      props.history.push("/login");
    } else {
      props.history.push("/dashboard");
    }
  }, [0]);
  return <div></div>;
};

export default Home;