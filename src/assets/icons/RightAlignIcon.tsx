import classNames from 'classnames';
import React from 'react';

const RightAlignIcon = ({ right }: any) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(right ? 'stroke-white' : 'stroke-[#444444]')}
    >
      <path
        d="M15.7498 16.0418H5.9165C4.6665 16.0418 4.1665 15.5085 4.1665 14.1835V13.3168C4.1665 11.9918 4.6665 11.4585 5.9165 11.4585H15.7498"
        // stroke="#444444"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7502 4.375H10.0835C8.8335 4.375 8.3335 4.90833 8.3335 6.23333V7.1C8.3335 8.425 8.8335 8.95833 10.0835 8.95833H15.7502"
        // stroke="#444444"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8335 1.65869V18.3254"
        // stroke="#444444"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RightAlignIcon;
