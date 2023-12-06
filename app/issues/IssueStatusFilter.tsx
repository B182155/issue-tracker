'use client';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { SelectItem } from '@radix-ui/themes';
import React from 'react';
import * as Select from '@radix-ui/react-select';
import { Issue, Status } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

import URLSearchParams from 'url-search-params';
// import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statuses: { label: string; value?: Status }[] = [
    {
      label: 'All',
    },
    {
      value: 'OPEN',
      label: 'Open',
    },
    {
      value: 'IN_PROGRESS',
      label: 'In Progress',
    },
    {
      value: 'CLOSED',
      label: 'Closed',
    },
  ];
  return (
    <Select.Root
      onValueChange={(status) => {
        const params = new URLSearchParams();

        if (status) params.set('status', status);

        if (searchParams.get('orderBy')) {
          params.set('orderBy', searchParams.get('orderBy')!);
        }

        const query = params ? `?${params.toString()}` : '';
        router.push('/issues' + query);
      }}
    >
      <Select.Trigger
        style={{ backgroundColor: 'var(--purple-9)' }}
        className="inline-flex  items-center justify-center rounded px-[15px] text-[15px] text-white leading-none h-[31px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
      >
        <Select.Value placeholder="Filter  " />
        <Select.Icon className="text-violet11">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          //   sideOffset={5}
          className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              {statuses.map((status) => {
                return (
                  <SelectItem
                    key={status.label}
                    value={status.value!}
                  >
                    {status.label}
                  </SelectItem>
                );
              })}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default IssueStatusFilter;
