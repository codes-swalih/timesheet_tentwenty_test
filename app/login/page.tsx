import { Suspense } from "react";
import LeftScreen from "./components/LeftScreen";
import RightScreen from "./components/RightScreen";

function page() {
  return (
    <div className=" w-full h-screen md:flex justify-between">
      <Suspense fallback={<div>Loading...</div>}>
        <LeftScreen />
      </Suspense>
      <RightScreen />
    </div>
  );
}

export default page;
