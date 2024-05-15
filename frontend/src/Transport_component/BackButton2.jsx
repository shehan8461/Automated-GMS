import {Link} from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton2 = ({ destination = '/vehicles' }) => {
  return (
    <div className='flex'>
      <Link to={destination} className='back-link'>
        <BsArrowLeft className='back-icon' />
      </Link>
    </div>
  );
};



export default BackButton2
