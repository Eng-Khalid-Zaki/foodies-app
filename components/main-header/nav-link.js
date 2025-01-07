"use client";
import Link from "next/link";
import classes from "./main-header.module.css";
import { usePathname } from "next/navigation";
import React from "react";

function NavLink({ href, children }) {
  const pathName = usePathname();
  return (
    <Link
      href={href}
      className={
        pathName.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}

export default NavLink;
