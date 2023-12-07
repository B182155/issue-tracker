'use client';

import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { User } from '@prisma/client';

const AvatarImage = ({ user }: { user: User }) => {
  return (
    <Avatar.Root>
      <Avatar.AvatarImage
        src={user.image!}
        className="h-8 w-8 rounded-full"
      />
      <Avatar.AvatarFallback delayMs={600}>?</Avatar.AvatarFallback>
    </Avatar.Root>
  );
};

export default AvatarImage;
