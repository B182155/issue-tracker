/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { Box, Button, Callout, Flex, TextFieldInput } from '@radix-ui/themes';
import React, { useState } from 'react';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { InfoCircledIcon } from '@radix-ui/react-icons';

import { zodResolver } from '@hookform/resolvers/zod';

import z from 'zod';

import dynamic from 'next/dynamic';
import { IssueSchema } from '@/app/validationSchema';
import ErrorMessageComp from '@/app/components/ErrorMessageComp';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';

type IsssueForm = z.infer<typeof IssueSchema>;

const IssueFormPage = ({ issue }: { issue?: Issue }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IsssueForm>({
    resolver: zodResolver(IssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch<Issue>(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post<Issue>('/api/issues', data);
      }
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setErrorMessage('An Unexpected error occurred');
    }
  });

  return (
    <div className="w-1/2">
      {errorMessage && (
        <Callout.Root
          color="red"
          className="mb-2"
        >
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit}>
        <Flex
          gap="2"
          direction="column"
        >
          <TextFieldInput
            placeholder="Title"
            defaultValue={issue?.title}
            {...register('title')}
          />
          <ErrorMessageComp>{errors.title?.message}</ErrorMessageComp>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE
                defaultValue={issue?.description}
                placeholder="Description"
                {...field}
              />
            )}
          />
          <ErrorMessageComp>{errors.description?.message}</ErrorMessageComp>
        </Flex>
        <Button>
          {issue ? 'Update Issue' : 'Submit Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueFormPage;
