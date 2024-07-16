import React from "react";
import { Link } from "react-router-dom";
import { usePostQuery } from "./hooks/usePosts";

const ReactQueryPage = () => {
  const  {data, isLoading, isError, error, refetch} = usePostQuery()
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
      {data?.map((item) => (
        <div>{item.title}</div>
      ))}
      <button onClick={refetch}>post리스트 다시 들고오기</button>
    </div>
  );
};

export default ReactQueryPage;
