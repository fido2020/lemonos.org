import Header from "./header";

const Layout: React.FunctionComponent<{ hideLogo?: boolean }> = ({
  children,
  hideLogo = false
}) => (
  <div className="min-h-screen flex flex-col">
    <Header hideLogo={hideLogo} />
    <main className="flex-1">{children}</main>
  </div>
);

export default Layout;
