import { Status } from '@prisma/client';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import React from 'react';
import StatusBadge from './components/StatusBadge';
import LinkComp from './components/Link';

// import * as Flex from '@radix-ui/themes'

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const Containers: { label: string; value: number; status: Status }[] = [
    {
      label: 'Open Issues',
      value: open,
      status: 'OPEN',
    },
    {
      label: 'InProgress Issues',
      value: inProgress,
      status: 'IN_PROGRESS',
    },
    {
      label: 'Closed Issues',
      value: closed,
      status: 'CLOSED',
    },
  ];
  return (
    <Card>
      <Flex gap="2">
        {Containers.map((container) => (
          <Card
            key={container.label}
            className="w-1/3"
          >
            <Flex
              direction="column"
              gap="3"
            >
              <Box>
                <LinkComp href={`/issues?status=${container.status}`}>
                  {container.label}
                </LinkComp>
              </Box>
              <Flex gap="5">
                <StatusBadge status={container.status} />
                <Text className="font-bold">{container.value}</Text>
              </Flex>

              {/* <Box className="font-bold"></Box> */}
            </Flex>
          </Card>
        ))}
      </Flex>
    </Card>
  );
};

export default IssueSummary;
