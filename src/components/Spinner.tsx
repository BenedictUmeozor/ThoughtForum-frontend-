import { BarLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="spinner">
      <BarLoader
        color={"#18298d"}
        loading={true}
        width={200}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
