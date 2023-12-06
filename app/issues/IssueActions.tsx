import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <Button
        mb="3"
        ml="4"
      >
        <Link href="/issues/newissue">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;