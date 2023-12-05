import React from 'react';
import prisma from '@/prisma/Client';
import StatusBadge from '@/app/components/StatusBadge';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';

import Markdown from 'react-markdown';
import delay from 'delay';
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

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
      columns={{ initial: '1', md: '2' }}
      gap="4"
      className="mt-14 ml-8"
    >
      <Box>
        <IssueDetails issue={issue!} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue?.id!} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
