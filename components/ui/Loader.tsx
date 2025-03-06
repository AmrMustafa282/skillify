"use client";

import { PulseLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={"flex items-center justify-center "}>
      <PulseLoader color="#3498db" size={10} />
    </div>
  );
}
