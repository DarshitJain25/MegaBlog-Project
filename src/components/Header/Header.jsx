import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HeaderComponent() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: "true" },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-(--line) bg-(--paper)/95 backdrop-blur-sm">
      <Container>
        <nav className="flex min-h-18 items-center gap-5 py-3">
          <div className="mr-auto shrink-0">
            <Link to="/">
              <Logo width="116px" />
            </Link>
          </div>

          <ul className="flex flex-wrap items-center justify-end gap-x-1 gap-y-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="
                    px-2.5 py-2
                    text-sm font-medium
                    text-(--muted)
                    transition-colors duration-200
                    hover:text-(--accent)
                    sm:px-3
                  "
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default HeaderComponent;
