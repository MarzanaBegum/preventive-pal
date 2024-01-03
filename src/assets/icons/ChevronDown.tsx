const ChevronDown = ({ stroke }: { stroke: string }) => {
  return (
    <svg
      width="25"
      height="33"
      viewBox="0 0 25 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // className={stroke}
    >
      <path
        d="M6.5 9L12.5 15L18.5 9"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronDown;
