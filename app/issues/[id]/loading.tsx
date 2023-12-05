import StatusBadge from '@/app/components/StatusBadge';
import { Flex, Heading, Card, Box } from '@radix-ui/themes';
import React from 'react';

import Skeleton from '@/app/components/Skeleton';

const IssueDetailLoadingPage = () => {
  return (
    <div className="max-w-3xl">
      <Flex
        gap="4"
        direction="column"
      >
        <Skeleton
          height="2rem"
          width="20rem"
        />

        <Flex
          my="2"
          direction="row"
          gap="4"
        >
          <Skeleton width="2rem" />
          <Skeleton width="5rem" />
        </Flex>
        <Card
          size="2"
          variant="surface"
        >
          <Skeleton
            height="3"
            count={3}
          />
        </Card>
      </Flex>
    </div>
  );
};

export default IssueDetailLoadingPage;
