import { Link } from "react-router";

export default function Header() {
  return (
    <header>
      <div className="container mx-auto flex items-center">
        <nav>
          <Link to="/" className="hover:underline">
            홈
          </Link>

          <Link to="/login" className="hover:underline">
            로그인
          </Link>
        </nav>
      </div>
    </header>
  );
}
