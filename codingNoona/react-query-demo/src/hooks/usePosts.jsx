import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPost = () => {
//   const id = queryData.queryKey[1];
//   console.log("qqq", queryData);
  return axios.get(`http://localhost:3004/posts`);
};
export const usePostQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    // 보내고 싶은 값을 queryKey에 삽입
    // {id:1} 도 가능
    queryFn: ()=>fetchPost(),
    retry: 1,
    select: (data) => {
      return data.data;
    },
  });
};

// enabled:false
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
