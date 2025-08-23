import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const linkStyle = {
  padding: "10px 20px",
  borderRadius: "25px",
  backgroundColor: "#0070f3",
  color: "white",
  fontWeight: "600",
  textDecoration: "none",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  userSelect: "none",
  display: "inline-block",
};

const linkHoverStyle = {
  backgroundColor: "#005bb5",
  transform: "translateY(-3px)",
  boxShadow: "0 8px 15px rgba(0,91,181,0.3)",
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  // Pour gérer le hover on va utiliser un state local par lien (simple ici)
  const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);

 const links: { href: string; label: string }[] = [];

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: 900,
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header
        style={{
          borderBottom: "2px solid #333",
          paddingBottom: "10px",
          marginBottom: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              ...linkStyle,
              ...(hoveredLink === href ? linkHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredLink(href)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {label}
          </Link>
        ))}
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;