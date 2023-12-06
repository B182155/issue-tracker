import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import LinkComp from '../components/Link';
import StatusBadge from '../components/StatusBadge';
import { Issue, Status } from '@prisma/client';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const headings: { label: string; value: keyof Issue; classnames?: string }[] = [
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

export const columnHeadings = headings.map((column) => column.value);

const IssueTable = ({ issues, searchParams }: Props) => {
  return (
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
  );
};

export default IssueTable;
