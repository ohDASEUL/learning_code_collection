import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const ReactQueryPage = () => {
  const fetchPost = () => {
    return axios.get("http://localhost:3004/posts");
  };
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
    retry: 1,
    select: (data) => {
      return data.data;
    },
    gcTime:5000
  });
  console.log("ddd", data, isLoading);
  console.log("error", isError, error);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
        <nav>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
          </li>
          <li>
            <Link to="/normalpage">Normal Fetch</Link>
          </li>
          <li>
            <Link to="/reactquery">React Query</Link>
          </li>
        </ul>
      </nav>
      {data.map((item) => (
        <div>{item.title}</div>
      ))}
      
    </div>
  );
};

export default ReactQueryPage;
