import classNames from 'classnames';
import React from 'react';

const LeftAlignIcon = ({ left }: any) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(left ? 'stroke-white' : 'stroke-[#444444]')}
    >
      <path
        d="M4.25 16.0418H14.0833C15.3333 16.0418 15.8333 15.5085 15.8333 14.1835V13.3168C15.8333 11.9918 15.3333 11.4585 14.0833 11.4585H4.25"
        // stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.25 4.375H9.91667C11.1667 4.375 11.6667 4.90833 11.6667 6.23333V7.1C11.6667 8.425 11.1667 8.95833 9.91667 8.95833H4.25"
        // stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.1665 1.65869V18.3254"
        // stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LeftAlignIcon;
