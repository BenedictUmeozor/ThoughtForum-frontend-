import image from "../assets/images/construction.svg";

const Construction = () => {
  return (
    <div className="construction-page">
      <div className="construction">
        <img className="w-10/12 max-w-md" src={image} alt="" />
      </div>
      <p className="mt-5 text-center text-lg">Site under construction</p>
    </div>
  );
};

export default Construction;
