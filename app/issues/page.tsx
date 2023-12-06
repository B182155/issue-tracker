// 'use client';
import prisma from '@/prisma/Client';
import { Button, Table } from '@radix-ui/themes';
import StatusBadge from '../components/StatusBadge';

import Link from 'next/link';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import LinkComp from '../components/Link';
import { FaArrowUp } from 'react-icons/fa6';

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const Issuespage = async ({ searchParams }: Props) => {
  const headings: { label: string; value: keyof Issue; classnames?: string }[] =
    [
      {
        label: 'Title',
        value: 'title',
      },
      {
        label: 'Status',
        value: 'status',
      },
      {
        label: 'CreatedAt',
        value: 'createdAt',
        classnames: 'hidden md:table-cell',
      },
    ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const columnHeadings = headings.map((column) => column.value);

  const orderBy = columnHeadings.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
  });

  return (
    <div className="max-w-5xl">
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {headings.map((heading) => {
              return (
                <Table.ColumnHeaderCell
                  key={heading.label}
                  className={heading.classnames}
                >
                  <Link
                    href={{
                      query: { ...searchParams, orderBy: heading.value },
                    }}
                    className="inline"
                  >
                    {heading.label}{' '}
                    {heading.value == searchParams.orderBy && (
                      <div className="inline-block">
                        <FaArrowUp />
                      </div>
                    )}
                  </Link>
                </Table.ColumnHeaderCell>
              );
            })}
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
