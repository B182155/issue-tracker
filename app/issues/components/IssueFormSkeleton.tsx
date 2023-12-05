import { Box } from '@radix-ui/themes';
import React from 'react';
import Skeleton from '@/app/components/Skeleton';

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-2xl">
      <Skeleton />
      <Skeleton height="20rem" />

      <Skeleton width="10rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
