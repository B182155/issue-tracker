import Image from 'next/image';
import Navbar from './Navbar';
import Pagination from './components/Pagination';
import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';
import { Flex, Grid, Card } from '@radix-ui/themes';
import prisma from '@/prisma/Client';
import IssuesChart from './IssuesChart';

// interface Props {
//   searchParams: { page: string };
// }

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: 'OPEN',
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS',
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: 'CLOSED',
    },
  });

  return (
    <Grid
      columns={{ initial: '1', md: '2' }}
      gap="3"
    >
      <Flex
        gap="2"
        direction="column"
      >
        <IssueSummary
          open={open}
          inProgress={inProgress}
          closed={closed}
        />

        <IssuesChart
          open={open}
          inProgress={inProgress}
          closed={closed}
        />
      </Flex>

      <LatestIssues />
    </Grid>
  );
}
