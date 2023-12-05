// 'use client';
import prisma from '@/prisma/Client';
import { Button, Table } from '@radix-ui/themes';
import StatusBadge from '../components/StatusBadge';

import Link from 'next/link';

import LinkComp from '../components/Link';

const Issuespage = async () => {
  const issues = await prisma.issue.findMany();

  // delay(5000);

  return (
    <div className="max-w-5xl">
      <Button mb="3">Filter</Button>

      <Button
        mb="3"
        ml="4"
      >
        <Link href="/issues/newissue">New Issue</Link>
      </Button>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              CreatedAt
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <LinkComp href={`/issues/${issue.id}`}>{issue.title}</LinkComp>
              </Table.Cell>
              <Table.Cell>{<StatusBadge status={issue.status} />}</Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue?.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default Issuespage;
