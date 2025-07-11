const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        
        {/* Footer content */}
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Copyright */}
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Complify®. All Rights Reserved.
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">About</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Licensing</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;