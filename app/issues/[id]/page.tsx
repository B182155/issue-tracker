// 'use client';
import prisma from '@/prisma/Client';
import { Box, Flex, Grid } from '@radix-ui/themes';

import EditIssueButton from './EditIssueButton';

import dynamic from 'next/dynamic';

import IssueFormSkeleton from '../components/IssueFormSkeleton';
import DeleteIssueButton from './DeleteIssueButton';

import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import Assignee from './Assignee';

const IssueDetails = dynamic(() => import('./IssueDetails'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  // delay(2000);
  return (
    <Grid
      columns={{ initial: '1', sm: '5' }}
      gap="4"
      className="mt-6 ml-8"
    >
      <Box className="md:col-span-4">
        <IssueDetails issue={issue!} />
      </Box>
      {session && (
        <Box>
          <Flex
            direction="column"
            gap="4"
          >
            <Assignee issue={issue!} />
            <EditIssueButton issueId={issue?.id!} />
            <DeleteIssueButton issueId={issue?.id!} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailsPage;
