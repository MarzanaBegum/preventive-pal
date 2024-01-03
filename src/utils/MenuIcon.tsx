type IconType = {
  groupClassName?: string;
  className?: string;
};

function MenuIcon({ groupClassName, className }: IconType) {
  return (
    <svg
      width="24"
      className={className}
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={groupClassName}
        d="M3 10.5H21"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className={groupClassName}
        d="M3 15.5H21"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default MenuIcon;
