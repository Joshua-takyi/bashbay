"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function VenueNav() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("#overview");

  const links = [
    {
      name: "Overview",
      href: "#overview",
    },
    {
      name: "Amenities",
      href: "#amenities",
    },
    {
      name: "Availability",
      href: "#availability",
    },
    {
      name: "Reviews",
      href: "#reviews",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for sticky header

      // Get all sections
      const sections = links
        .map((link) => {
          const sectionId = link.href.replace("#", "");
          const element = document.getElementById(sectionId);
          return {
            id: link.href,
            element,
            offsetTop: element?.offsetTop || 0,
          };
        })
        .filter((section) => section.element);

      // Find the current section
      let currentSection = sections[0]?.id || "#overview";

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offsetTop) {
          currentSection = sections[i].id;
          break;
        }
      }

      setActiveSection(currentSection);
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav>
        <div className="relative transition-all flex my-2 items-center justify-center sm:justify-start gap-2 border-b border-default-200">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setActiveSection(link.href)}
              className={`${
                activeSection === link.href
                  ? "text-primary font-medium"
                  : "text-gray-700 dark:text-gray-300"
              } p-2 pb-3 text-sm relative transition-colors hover:text-primary`}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.name}
              {/* Active/Hover indicator */}
              {(activeSection === link.href ||
                (hoveredLink === link.name && activeSection !== link.href)) && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary ${
                    activeSection === link.href ? "" : "opacity-50"
                  }`}
                />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
