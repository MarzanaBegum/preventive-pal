import classNames from 'classnames';

const Clouds = ({ isHBigThanW }: { isHBigThanW: boolean }) => {
  return (
    <svg
      className={classNames(
        'absolute left-1/2 -translate-x-1/2 w-full px-[60px]  top-[10%] z-[6] 2xl:top-[120px] xl:top-[110px] lg:top-[180px] md:top-[250px] md:block hidden _clouds',
        isHBigThanW && '!top-1/2'
      )}
      viewBox="0 0 1323 163"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M301.176 118H456C456 118 454.21 87.9516 420.23 85.1503C386.249 82.3491 378.585 99.3981 378.585 99.3981C378.585 99.3981 377.08 73.6881 350.768 74.0029C328.425 74.2704 325.004 94.7765 328.509 104.744C319.598 94.4146 298.881 97.8296 301.176 118Z"
        fill="white"
        stroke="#1A1A1A"
        strokeWidth="1.12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1065.29 118.021H1322.02C1322.02 118.021 1319.05 68.1537 1262.7 63.5048C1206.36 58.8558 1193.65 87.1499 1193.65 87.1499C1193.65 87.1499 1191.15 44.4824 1147.52 45.0048C1110.48 45.4488 1104.8 79.48 1110.62 96.0212C1095.84 78.8793 1061.49 84.5469 1065.29 118.021Z"
        fill="white"
        stroke="#1A1A1A"
        strokeWidth="1.12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M847.176 45H1002C1002 45 1000.21 14.9516 966.23 12.1503C932.249 9.34905 924.585 26.3981 924.585 26.3981C924.585 26.3981 923.08 0.688114 896.768 1.00287C874.425 1.27041 871.004 21.7765 874.509 31.7437C865.598 21.4146 844.881 24.8296 847.176 45Z"
        fill="white"
        stroke="#1A1A1A"
        strokeWidth="1.12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.17622 162H156C156 162 154.21 131.952 120.23 129.15C86.249 126.349 78.5855 143.398 78.5855 143.398C78.5855 143.398 77.0801 117.688 50.7683 118.003C28.425 118.27 25.0038 138.777 28.5092 148.744C19.5982 138.415 -1.11863 141.83 1.17622 162Z"
        fill="white"
        stroke="#1A1A1A"
        strokeWidth="1.12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Clouds;
