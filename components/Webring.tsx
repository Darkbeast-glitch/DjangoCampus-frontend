"use client";

import Script from "next/script";

export default function Webring() {
  return (
    <>
      {/* Insert the custom element via innerHTML to avoid TypeScript JSX intrinsic element errors */}
      <div dangerouslySetInnerHTML={{ __html: `<webring-css site="https://djangocampus.tech/"></webring-css>` }} />
      <Script src="https://djangowebring.com/static/webring.js" strategy="afterInteractive" />
    </>
  );
}
