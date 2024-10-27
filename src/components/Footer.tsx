import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white py-4 w-full fixed bottom-0">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm">
          © 2024 <span className="font-semibold">Viateur</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
