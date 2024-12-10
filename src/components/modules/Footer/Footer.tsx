const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className="fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-300 text-center py-2 text-sm text-gray-600">
      <p>&copy; {currentYear} JH. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
