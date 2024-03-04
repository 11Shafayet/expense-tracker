import PropTypes from 'prop-types';
import { GridLoader, ScaleLoader } from 'react-spinners';

const Loader = ({ size = 50, type }) => {
  return (
    <div
      className={`flex justify-center items-center text-center !w-full ${
        !type && 'my-20'
      }`}
    >
      {!type ? (
        <GridLoader className="" color="#fff" size={size} />
      ) : (
        <ScaleLoader color="#fff" size={size} />
      )}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.any,
  type: PropTypes.any,
};

export default Loader;
