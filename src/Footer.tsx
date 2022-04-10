import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 mt-20 py-10 flex justify-around">
      <div>
        <Link to="/">searchovie</Link>
      </div>
      <div>
        <a href="https://github.com/fotijr/searchovie" target="_blank">
          github
        </a>
      </div>
      <div>
        <a href="https://fotijr.com/blog/2022/searchovie/" target="_blank">
          why
        </a>
      </div>
      <div>
        <a href="https://fotijr.com" target="_blank">
          fotijr
        </a>
      </div>
    </footer>
  );
}

export default Footer;
