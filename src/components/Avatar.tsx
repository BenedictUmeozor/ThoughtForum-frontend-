type PropTypes = {
  name: string;
};

const Avatar = ({ name }: PropTypes) => {
  const letter = name[0].toUpperCase();
  return (
    <div className="avatar">
      <p>{letter}</p>
    </div>
  );
};

export default Avatar;
