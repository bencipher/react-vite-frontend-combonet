import navData from "../config/menu.json";
import { NavigationLink } from "../models/menuModel";

const { footer }: { footer: NavigationLink[] } = navData;

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="https://combonettechnology.com/" className="hover:underline">
            JobFindr™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          {footer.map((item) => (
            <li key={item.label}>
              <a href={item.to} className="hover:underline me-4 md:me-6">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
