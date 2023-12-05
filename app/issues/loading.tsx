import { Button, Table } from '@radix-ui/themes';
import React from 'react';
import Skeleton from '@/app/components/Skeleton';

const IssueLoadingPage = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="max-w-5xl">
      <Button mb="3">New Issue</Button>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>CreatedAt</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>{<Skeleton width="10rem" />}</Table.Cell>
              <Table.Cell>{<Skeleton width="8rem" />}</Table.Cell>
              <Table.Cell>{<Skeleton width="20rem" />}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssueLoadingPage;
