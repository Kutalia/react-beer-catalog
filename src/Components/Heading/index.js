import './Heading.css';

const Heading = ({ isFooter }) => {
  const text = isFooter ? 'Footer' : 'Header';

  return (
    <div className="heading">
      {text}
    </div>
  );
};

export default Heading;
