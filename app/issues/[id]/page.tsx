import prisma from '@/prisma/Client';
import { Box, Flex, Grid } from '@radix-ui/themes';

import delay from 'delay';
import EditIssueButton from './EditIssueButton';

import dynamic from 'next/dynamic';

import IssueFormSkeleton from '../components/IssueFormSkeleton';
import DeleteIssueButton from './DeleteIssueButton';

const IssueDetails = dynamic(() => import('./IssueDetails'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  delay(2000);
  return (
    <Grid
      columns={{ initial: '1', sm: '5' }}
      gap="4"
      className="mt-14 ml-8"
    >
      <Box className="md:col-span-4">
        <IssueDetails issue={issue!} />
      </Box>
      <Flex
        direction="column"
        gap="4"
      >
        <EditIssueButton issueId={issue?.id!} />
        <DeleteIssueButton issueId={issue?.id!} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailsPage;
