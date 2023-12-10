// 'use client';
import prisma from '@/prisma/Client';
import { Box, Card, Flex, Grid } from '@radix-ui/themes';

import EditIssueButton from './EditIssueButton';

import dynamic from 'next/dynamic';

import IssueFormSkeleton from '../components/IssueFormSkeleton';
import DeleteIssueButton from './DeleteIssueButton';

import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import Assignee from './Assignee';
import { cache } from 'react';

const IssueDetails = dynamic(() => import('./IssueDetails'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const fetchIssueDetails = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssueDetails(params.id);
  // console.log(issue);

  // delay(2000);
  return (
    <Grid
      columns={{ initial: '1', sm: '5' }}
      gap="4"
      className="mt-6 "
    >
      <Box className="md:col-span-4">
        <Card
          size="2"
          variant="surface"
        >
          <IssueDetails issue={issue!} />
        </Card>
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

export async function generateMetadata<generateMetadata>({ params }: Props) {
  const issue = await fetchIssueDetails(params.id);

  return {
    title: issue?.title,
    description: `Details of the issue : ${issue?.title}`,
  };
}
