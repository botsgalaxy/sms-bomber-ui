import { Container } from "react-bootstrap";
import "./index.css";

export const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 fixed-bottom">
      <Container>
        <p className="mb-0">
          Crafted with ❤️ by &nbsp;
          <a href="https://t.me/primeakash" className="primeakash">
            𝐏𝐫𝐢𝐦𝐞 𝐀𝐤𝐚𝐬𝐡 🇧🇩
          </a>
        </p>
      </Container>
    </footer>
  );
};
