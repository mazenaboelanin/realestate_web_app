import { Container } from "@mui/material";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
  <>
    <Header />
    <Container maxWidth="sm" style={{ minHeight: '70vh'}}>
      {/* <Outlet /> */}
      <div className="not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, that page doesn't exist</p>
      </div>
    </Container>
    <Footer />
  </>
  );
}