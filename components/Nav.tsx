import Link from "next/link";
import { useState } from "react";
import {
  IconNavNewsAndArticles,
  IconNavLawyers,
  IconNavWebinars,
  IconNavInvestments,
  IconNavClosedInvestments,
  IconArrow,
  IconHoomanStudio,
  IconLogout,
} from "./Icons";

const Nav = () => {
  const [navMini, setNavMini] = useState(false);
  const [active, setActive] = useState("News and articles");
  const navList = [
    {
      icon: <IconNavNewsAndArticles />,
      title: "News and articles",
      href: "/",
    },
    { icon: <IconNavLawyers />, title: "Lawyers", href: "/" },
    { icon: <IconNavWebinars />, title: "Webinars", href: "/" },
    { icon: <IconNavInvestments />, title: "Investments", href: "/" },
    {
      icon: <IconNavClosedInvestments />,
      title: "Closed investments",
      href: "/",
    },
  ];

  return (
    <nav className={navMini ? "mini" : ""}>
      <div className="nav-toggle">
        <span
          onClick={() => {
            setNavMini(!navMini);
          }}
        >
          <IconArrow />
        </span>
      </div>

      <ul>
        {navList.map((nav) => (
          <li key={nav.title} className={active === nav.title ? "active" : ""}>
            <Link href={nav.href}>
              <a>
                {nav.icon}
                <span className="nav-title">{nav.title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <div className="nav-footer">
        <IconHoomanStudio />
        <Link href="/">
          <a>
            <IconLogout />
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
