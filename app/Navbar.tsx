'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaBug } from 'react-icons/fa';

import classnames from 'classnames';

const Navbar = () => {
  const currentpath = usePathname();
  const navItems = [
    {
      name: 'Dashboard',
      link: '/',
    },
    {
      name: 'issues',
      link: '/issues',
    },
  ];
  return (
    <nav className="flex gap-4 h-10 border-b items-center px-4">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex gap-4 items-center px-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.link}
              className={classnames({
                'text-gray-600': currentpath !== item.link,
                'hover:text-gray-900': true,
                'active:text-gray-900': currentpath === item.link,
              })}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
