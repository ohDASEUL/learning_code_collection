import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const ReactQueryPage = () => {
  const fetchPost = () => {
    return axios.get("http://localhost:3004/posts");
  };
  const { isLoading, data, isError, error,refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
    retry: 1,
    select: (data) => {
      return data.data;
    },
    enabled:false
    // 초기에 호출 안 함(기본값 true)
    // refetchOnWindowFocus:true
    // 알아서 api를 호출해줘서 항상 최신 데이터를 볼 수 있음
    // refetchOnMount:true,
    // compont를 다시 들어갈때 api를 호출 할거냐 말거냐(기본값 true)
    // refetchInterval:3000
    // 3초마다 api 호출
    // staleTime:60000, 
    // 기본값 0
    // gcTime:10000,
    // staleTime < gctime
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
      {data?.map((item) => (
        <div>{item.title}</div>
      ))}
      <button onClick={refetch}>post리스트 다시 들고오기</button>
      
    </div>
  );
};

export default ReactQueryPage;
