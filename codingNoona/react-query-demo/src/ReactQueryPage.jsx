import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const ReactQueryPage = () => {
  const ids = [1,2,3,4]

  const fetchPostDetail=(id)=>{
    return axios.get(`http://localhost:3004/posts/${id}`)
  }
  const results = useQueries({
    queries:ids.map((id)=>{
      return {
        queryKey:["posts",id],
        queryFn: ()=>fetchPostDetail(id)
      }
    }),
    combine:(results)=>{
      return{
        data:results.map((result)=>result.data.data)
      }
    }
  })
  console.log("rrr",results)
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
    </div>
  );
};

export default ReactQueryPage;
