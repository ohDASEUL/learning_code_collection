"use client";

import { useState } from "react";

export default function EmptyNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="w-2/3 p-2 flex flex-col items-center justify-center  font-bold tex-xl gap-2 absolute top-0 bottom-0 right-0">
      새로운 노트를 만들어 보세요 😄
    </div>
  );
}
