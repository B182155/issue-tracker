"use client";
import Spinner from "@/app/components/Spinner";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { MdOutlineDeleteForever } from "react-icons/md";

const DeleteIssueButton = ({ issueId }: { issueId: String }) => {
  // console.log(`Delete Issue ${issueId}`);
  const router = useRouter();
  const [isError, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError(true);
      setDeleting(false);
    }
  };
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button
            color="red"
            className=" text-slate-300 dark:bg-white dark:text-red-800"
            disabled={isDeleting}
          >
            <MdOutlineDeleteForever />
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Delete Issue</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Are you sure you want to delete this issue?
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="start">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={deleteIssue}>Delete</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <Dialog.Root open={isError}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            An Unexpected Error Occurred
          </Dialog.Description>
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={() => setError(false)}>
              Ok
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default DeleteIssueButton;
