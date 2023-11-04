// import { Calendar } from "@shared/calendar";
import { Cryptogram } from "@shared/cryptogram";

export const App = () => {
  return (
    <div className="w-screen min-h-[100svh] flex md:p-8 bg-slate-400 dark:bg-slate-800">
      {/* <Calendar /> */}
      <Cryptogram />
    </div>
  );
};
