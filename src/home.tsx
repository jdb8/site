import * as React from 'react';

function VisibleElement({
  children,
  Element,
  outside = false,
}: {
  Element: React.ElementType;
  children: React.ReactNode;
  outside?: boolean;
}) {
  const tagName =
    typeof Element === "string"
      ? Element
      : (Element.displayName || Element.name || "Component");
  const openingTag = <span className="tag">&lt;{tagName}&gt;</span>;
  const closingTag = <span className="tag">&lt;/{tagName}&gt;</span>;
  return (
    <>
      {outside && openingTag}
      <Element>
        {!outside && openingTag} {children} {!outside && closingTag}
      </Element>
      {outside && closingTag}
    </>
  );
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <>
      <span className="tag">&lt;a</span> <span className="keyword">href</span>=
      <span className="values" contentEditable="false">
        <a href={href}>&quot;{href}&quot;</a>
      </span>
      <span className="tag">&gt;</span>
      <span contentEditable="false">
        <a href={href}>{children}</a>
      </span>
      <span className="tag">&lt;/a&gt;</span>
    </>
  );
}

export function Main() {
  return (
    <main role="main">
      <VisibleElement Element="h2">
        This is the website of Joe Bateson, a software engineer/developer/tinkerer from the UK (but now in
        🇺🇸).
      </VisibleElement>

      <VisibleElement Element="p">
        I currently work at Yelp as a full-stack software engineer, previously studying computer science at
        the University of Cambridge. Building things is fun.
      </VisibleElement>

      <VisibleElement Element="p">You can find me in various places across the internet:</VisibleElement>

      <VisibleElement Element="ul" outside={true}>
        <VisibleElement Element="li">
          <Link href="https://github.com/jdb8">Github</Link>
        </VisibleElement>

        <VisibleElement Element="li">
          <Link href="https://twitter.com/joebateson">Twitter</Link>
        </VisibleElement>

        <VisibleElement Element="li">
          <Link href="https://uk.linkedin.com/pub/joe-bateson/42/72a/374">LinkedIn</Link>
        </VisibleElement>

        <VisibleElement Element="li">
          <Link href="mailto:joe@joebateson.com">Email</Link>
        </VisibleElement>
      </VisibleElement>
    </main>
  );
}

export function Header() {
  return (
    <header role="banner">
      <VisibleElement Element="h1">Joe Bateson</VisibleElement>
    </header>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}
