// 'use client';
import prisma from '@/prisma/Client';
import { Button, Flex, Table } from '@radix-ui/themes';
import StatusBadge from '../components/StatusBadge';

import Link from 'next/link';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import LinkComp from '../components/Link';
import { FaArrowUp } from 'react-icons/fa6';
import Pagination from '../components/Pagination';
import IssueTable from './IssueTable';

import { columnHeadings, IssueQuery } from './IssueTable';

interface Props {
  searchParams: IssueQuery;
}

const Issuespage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnHeadings.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,

    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex
      className="max-w-5xl"
      direction="column"
      gap="2"
    >
      <IssueActions />
      <IssueTable
        issues={issues}
        searchParams={searchParams}
      />

      <Pagination
        itemCount={issuesCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default Issuespage;
