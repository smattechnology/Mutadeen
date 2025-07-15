import React from "react";
import { Search } from "lucide-react";

const Header = () => {
  // ✓ হোম
  // ✓ গ্যালারি
  // ✓ ব্লগ (নিচে লাইক কমেন্ট অপসন দিয়েন)
  // ✓ কুইজ (এটা বিশাল বড় প্ল্যান, আপাতত এমনি হবে)
  // ✓ পিডিএফ
  // ✓ ভিডিও
  // ✓ ডোনেশন
  // ✓ স্বেচ্ছাসেবক রেজিস্ট্রেশন ফরম

  const navLinks = [
    { name: "হোম", href: "/" },
    { name: "গ্যালারি", href: "/gallery" },
    { name: "ব্লগ", href: "/blog" },
    { name: "কুইজ", href: "/quiz" },
    { name: "পিডিএফ", href: "/pdf" },
    { name: "ভিডিও", href: "/video" },
    { name: "ডোনেশন", href: "/donation" },
    { name: "স্বেচ্ছাসেবক রেজিস্ট্রেশন", href: "/volunteer-registration" },
  ];

  return (
    <header className="w-full py-4 bg-gray-100 border-b border-gray-200 space-y-4">
      <div className="lg:max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Mutadeen</h1>

        <div className="flex justify-center items-center gap-3">
          <button className="px-4 py-2 text-white rounded-sm bg-brand">
            Login
          </button>
          <button className="px-4 py-2 text-white rounded-sm bg-brand">
            Register
          </button>
        </div>
      </div>

      <nav className="bg-2">
        <ul className="lg:max-w-7xl mx-auto flex space-x-2 px-4 py-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-white hover:text-blue-500 px-4 py-2"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-full flex justify-center items-center">
        <div className="flex lg:w-4xl mx-auto border border-gray-300 rounded-md p-2 bg-white">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search here..."
            className="w-full px-2 outline-none"
          />
          <button className="p-2 rounded-md text-black cursor-pointer hover:text-blue-500">
            <Search size={15} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
