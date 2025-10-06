"use client";

import Link from "next/link";
import Wrapper from "./wrapper";
import { useAuthSession } from "@/hooks/useAuthSession";
import { useEffect } from "react";
import BodyWrapper from "./body-Wrapper";

export default function Navbar() {
  const { isLoggedIn, isLoading } = useAuthSession();
  useEffect(() => {
    const initailHeight = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > initailHeight) {
        document.querySelector("header")?.classList.add("shadow-md");
      } else {
        document.querySelector("header")?.classList.remove("shadow-md");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navigationLinks = [
    {
      id: 1,
      title: "Events",
      href: "/events",
    },
    {
      id: 2,
      title: "Venues",
      href: "/venues",
    },
  ];

  // Don't render navigation links until we know authentication status
  if (!isLoading) {
    if (isLoggedIn) {
      navigationLinks.push({
        id: 3,
        title: "Profile",
        href: "/profile",
      });
    } else {
      navigationLinks.push(
        {
          id: 4,
          title: "Login",
          href: "/auth/signin",
        },
        {
          id: 5,
          title: "Register",
          href: "/auth/signup",
        }
      );
    }
  }
  return (
    <header className="  ">
      <BodyWrapper className="flex items-center justify-between">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold">Bashbay</h1>
          </Link>
        </div>
        <nav className="flex gap-5 items-center">
          {navigationLinks.map((link) => (
            <Link key={link.id} href={link.href}>
              {link.title}
            </Link>
          ))}
        </nav>
      </BodyWrapper>
    </header>
  );
}
