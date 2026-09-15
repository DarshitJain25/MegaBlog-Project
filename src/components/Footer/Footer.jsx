import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="border-t border-(--line) bg-(--paper)">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Logo width="100px" />

            <p className="mt-2 text-sm text-(--muted)">
              Thoughtful stories, ideas, and perspectives.
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm text-(--muted)">
            <Link
              to="/"
              className="transition-colors duration-200 hover:text-(--accent)"
            >
              Home
            </Link>

            <Link
              to="/all-posts"
              className="transition-colors duration-200 hover:text-(--accent)"
            >
              Stories
            </Link>
          </div>
        </div>

        <div className="mt-7 border-t border-var(--line) pt-5">
          <p className="text-xs text-var(--muted)">
            &copy; 2026 MegaBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
