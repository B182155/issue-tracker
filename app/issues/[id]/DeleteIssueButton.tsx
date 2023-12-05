'use client';
import {
  Button,
  Dialog,
  Flex,
  TextField,
  Text,
  AlertDialog,
} from '@radix-ui/themes';
import axios from 'axios';
import { error } from 'console';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { MdOutlineDeleteForever } from 'react-icons/md';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [isError, setError] = useState(false);
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="red">
            <MdOutlineDeleteForever />
            Delete Issue
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Delete Issue</Dialog.Title>
          <Dialog.Description
            size="2"
            mb="4"
          >
            Are you sure you want to delete this issue?
          </Dialog.Description>

          <Flex
            gap="3"
            mt="4"
            justify="start"
          >
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                onClick={async () => {
                  try {
                    throw new Error();
                    await axios.delete('/api/issues/' + issueId);
                    router.push('/issues');
                    router.refresh();
                  } catch (error) {
                    setError(true);
                  }
                }}
              >
                Delete
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <Dialog.Root open={isError}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Description
            size="2"
            mb="4"
          >
            An Unexpected Error Occurred
          </Dialog.Description>
          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
              onClick={() => setError(false)}
            >
              Ok
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default DeleteIssueButton;
