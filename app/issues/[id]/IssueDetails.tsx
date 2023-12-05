import StatusBadge from '@/app/components/StatusBadge';
import { Issue } from '@prisma/client';
import { Flex, Heading, Card, Text } from '@radix-ui/themes';
import React from 'react';
import Markdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <Flex
      direction="column"
      mt="9"
      gap="4"
      width="auto"
    >
      <Heading>{issue?.title}</Heading>
      <Flex
        direction="row"
        gap="4"
      >
        <StatusBadge status={issue?.status!} />
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card
        size="2"
        variant="surface"
      >
        <div>
          <Markdown className="prose">{issue?.description}</Markdown>
        </div>
      </Card>
    </Flex>
  );
};

export default IssueDetails;
