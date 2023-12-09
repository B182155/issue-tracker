import React from 'react';
import IssueFormPage from '../../components/IssueFormPage';
import prisma from '@/prisma/Client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  return <IssueFormPage issue={issue!} />;
};

export const metadata: Metadata = {
  title: 'Issues Tracker -Edit Issues page ',
  description: 'Edit Issue ',
};

export default EditIssuePage;
