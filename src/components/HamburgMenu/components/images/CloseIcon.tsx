import CustomIcon, { IconType } from "@/components/Footer/components/CustomIcon";

const CloseIcon = (props: IconType) => {
  return (
    <CustomIcon
      {...props}
      svg={({ stroke, color, width, height, className }) => (
        <svg
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="md:w-[42px] md:h-[42px] w-[30px] h-[30px] transition-all duration-500 ease-in-out group-hover:rotate-[-90deg]"
        >
          <path
            d="M13.5747 28.4248L28.4239 13.5756"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className}`}
            stroke={stroke}
          />
          <path
            d="M28.4239 28.4244L13.5747 13.5752"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke={stroke}
            className={`${className}`}
          />
        </svg>
      )}
    ></CustomIcon>
  );
};

export default CloseIcon;
