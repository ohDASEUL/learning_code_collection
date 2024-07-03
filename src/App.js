import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleCreate = () => {
    if (name.trim() === "" || phoneNumber.trim() === "") {
      console.log("이름과 전화번호를 입력하세요.");
      return;
    }
    console.log(`이름: ${name}, 전화번호: ${phoneNumber}`);
  };

  const handleSearch = () => {
    if(searchTerm.trim()===name){
      setSearchResult({name,phoneNumber})
    }else{
      setSearchResult(null)
    }
  }
  return (
    <div className="main">
      <h1>연락처</h1>
      <div className="phone-book-main">
        <div className="phone-book-create-main">
          <div className="phone-book-create-group">
            <label>이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="phone-book-create-group">
            <label>전화번호</label>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button onClick={handleCreate}>생성</button>
        </div>
        <div className="divider"></div> {/* 세로 구분선 */}
        <div className="phone-book-search-main">
          <label>검색</label>
          <input type="text" placeholder="이름을 입력하세요" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
          {searchResult && (
            <div className="search-result">
              <p>이름: {searchResult.name}</p>
              <p>전화번호: {searchResult.phoneNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
