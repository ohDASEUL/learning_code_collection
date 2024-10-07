import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePostQuery } from "./hooks/usePosts";

const NormalPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState(null);
  // const fetchPost = async () => {
  //   setIsLoading(true);
  //   const url = "http://localhost:3004/posts";
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   setIsLoading(false);
  //   setData(data);
  // };
  // useEffect(() => {
  //   fetchPost();
  // }, []);
  const {data, isLoading, isError, error} = usePostQuery();
  if (isLoading) {
    return <h1>Loading...</h1>;
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
      {data?.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
      
    </div>
  );
};

export default NormalPage;
