import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SuperAdminHeader = ({ title }) => {
  return (
    <div className='d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24'>
      <h6 className='fw-semibold mb-0'>Super Admin Panel</h6>
      <ul className='d-flex align-items-center gap-2'>
        <li className='fw-medium'>
          <Link
            to='/super-admin'
            className='d-flex align-items-center gap-1 hover-text-primary'
          >
            <Icon
              icon='heroicons:shield-check'
              className='icon text-lg'
            />
            Super Admin
          </Link>
        </li>
        <li> - </li>
        <li className='fw-medium'>{title}</li>
      </ul>
    </div>
  );
};

export default SuperAdminHeader;
