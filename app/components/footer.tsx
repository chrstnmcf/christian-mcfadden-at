import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <nav className="container py-6 flex flex-wrap flex-col sm:flex-row justify-between items-center">
        <Link to="/legalnotice">Legal Notice</Link>
      </nav>
    </footer>
  );
}
