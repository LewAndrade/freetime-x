export const Root = ({
  title,
  children,
}: {
  title?: string;
  children: JSX.Element;
}) => (
  <html lang="en">
    <head>
      <title>{title ?? "Lew's Freetime"}</title>
      <link rel="stylesheet" href="/styles" />
      <script src="/htmx"/>
      <script src="/js"/>
    </head>
    <body>{children}</body>
  </html>
);
