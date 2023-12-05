'use client';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { FaBug } from 'react-icons/fa';

import { Box, Flex } from '@radix-ui/themes';
import classnames from 'classnames';
import Link from 'next/link';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';

const NavLinks = () => {
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
  );
};

const Navbar = () => {
  return (
    // <Container>
    <nav className="border-b p-2">
      <Flex
        direction="row"
        gap="4"
        justify="between"
        align="center"
        height="auto"
      >
        <Flex align="center">
          <Link href="/">
            <FaBug />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
    // </Container>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  {
    status === 'loading' && null;
  }

  {
    status === 'unauthenticated' && <Link href="api/auth/signin">Login</Link>;
  }

  return (
    <Box>
      {status === 'authenticated' && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar.Root>
              <Avatar.AvatarImage
                src={session.user?.image!}
                className="h-8 w-8 rounded-full"
              />
              <Avatar.AvatarFallback delayMs={600}>?</Avatar.AvatarFallback>
            </Avatar.Root>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.DropdownMenuContent
              sideOffset={5}
              className="px-4 py-2 bg-gray-200 shadow-lg rounded-lg"
            >
              <DropdownMenu.Label>{session.user?.name}</DropdownMenu.Label>

              <DropdownMenu.Item className="mt-1 p-1 hover:bg-purple-700 hover:text-white">
                <Link href="/api/auth/signout">Sign Out</Link>
              </DropdownMenu.Item>
              <DropdownMenu.DropdownMenuArrow />
            </DropdownMenu.DropdownMenuContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default Navbar;
