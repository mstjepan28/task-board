import { LoadingIndicator } from "../components/LoadingIndicator";

export const ValidatingLoginMsg = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="h-fit">
        <LoadingIndicator />
        <span>Validating login...</span>
      </div>
    </div>
  );
};
