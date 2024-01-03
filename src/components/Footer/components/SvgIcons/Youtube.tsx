import CustomIcon, { IconType } from '../CustomIcon';

const Youtube = (props: IconType) => {
  return (
    <CustomIcon
      {...props}
      svg={({ stroke, color, width, height, className }) => (
        <svg
          width={width}
          height={height}
          className={className}
          viewBox="0 0 32 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5309 15.2693V6.33051C15.656 7.8237 18.0763 9.26616 20.9388 10.8213C18.5778 12.1509 15.656 13.6427 12.5309 15.2693ZM29.9468 1.88481C29.4077 1.16362 28.4889 0.602243 27.5108 0.416388C24.6358 -0.138007 6.6996 -0.139584 3.82613 0.416388C3.04175 0.565703 2.34328 0.926618 1.74327 1.48737C-0.784884 3.87013 0.00731952 16.6481 0.616703 18.718C0.872955 19.6139 1.20422 20.26 1.62142 20.6841C2.15892 21.2449 2.89486 21.631 3.74018 21.8041C6.1074 22.3013 18.3029 22.5793 27.4608 21.8788C28.3045 21.7295 29.0514 21.3309 29.6405 20.7464C31.978 18.3731 31.8187 4.87755 29.9468 1.88481Z"
            fill={stroke}
          />
        </svg>
      )}
    ></CustomIcon>
  );
};

export default Youtube;
