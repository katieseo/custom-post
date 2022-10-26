import Nav from "./Nav";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="container">
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
