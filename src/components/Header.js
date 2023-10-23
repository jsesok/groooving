import { useState } from "react";

function Header() {
  const [headerColor, setHeaderColor] = useState(false);

  const changeHeaderColor = () => {
    if (window.scrollY > 55) {
      setHeaderColor(true);
    } else {
      setHeaderColor(false);
    }
  };

  window.addEventListener("scroll", changeHeaderColor);

  return (
    <h1
      className={
        headerColor
          ? "text-center fixed-top p-1 pb-3 header-scrolled bg-opacity-75 header"
          : "text-center fixed-top p-1 pb-2 header"
      }
    >
      gr<span className="text-primary">ooo</span>ving
    </h1>
  );
}

export default Header;
