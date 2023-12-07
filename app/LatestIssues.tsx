import { Card, Flex, Heading, Table } from '@radix-ui/themes';
import React from 'react';
import LinkComp from './components/Link';
import StatusBadge from './components/StatusBadge';
import prisma from '@/prisma/Client';
import AvatarImage from './AvatarImage';
// import Link from 'next/link';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      assignedToUser: true,
    },
    take: 5,
  });
  return (
    <Card>
      <Heading m="2">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row
              key={issue.id}
              align="center"
            >
              <Table.Cell>
                <Flex
                  direction="column"
                  gap="2"
                >
                  <LinkComp href={`/issues/${issue.id}`}>
                    {issue.title}
                  </LinkComp>
                  <StatusBadge status={issue.status} />
                </Flex>
              </Table.Cell>
              <Table.Cell>
                {issue.assignedToUser && (
                  <AvatarImage user={issue.assignedToUser} />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
