'use client';
import * as Select from '@radix-ui/react-select';
// import classnames from 'classnames';
import { User } from '.prisma/client';
import { Issue } from '@prisma/client';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { SelectItem } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import * as Toast from '@radix-ui/react-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Skeleton from '@/app/components/Skeleton';

const Assignee = ({ issue }: { issue: Issue }) => {
  const [isError, setError] = useState(false);

  const router = useRouter();

  const getUsersData = async () => {
    try {
      const { data } = await axios.get<User[]>('/api/users');
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsersData,

    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const assignIssue = async (UserId: string) => {
    try {
      await axios.patch('/api/issues/' + issue.id, {
        assignedToUserId: UserId === 'unassigned' ? null : UserId,
      });
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue?.assignedToUserId || 'unassigned'}
        onValueChange={assignIssue}
      >
        <Select.Trigger
          className="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
          // aria-label="Food"
          placeholder="Assign..."
        >
          <Select.Value placeholder="Assign..." />
          <Select.Icon className="text-violet11">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={5}
            className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          >
            <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-[5px]">
              <Select.Group>
                <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                  Suggestions
                </Select.Label>

                <SelectItem value="unassigned">Unassigned</SelectItem>

                {users?.map((user) => {
                  return (
                    <SelectItem
                      key={user.id}
                      value={user.id}
                    >
                      {user.name}
                    </SelectItem>
                  );
                })}
                {/* <SelectItem value="apple">Apple</SelectItem> */}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <Toast.Provider>
        <Toast.Root open={isError}>
          <Toast.Title>Error</Toast.Title>
          <Toast.Description> Changes could not be saved</Toast.Description>

          <Toast.Close
            onClick={() => {
              setError(false);
            }}
          >
            Close
          </Toast.Close>
        </Toast.Root>
      </Toast.Provider>
    </>
  );
};

export default Assignee;
