import React from 'react';
// import IssueFormPage from '../components/IssueFormPage';
import dynamic from 'next/dynamic';
import delay from 'delay';
import IssueFormSkeleton from './loading';
import { Metadata } from 'next';

const IssueFormPage = dynamic(() => import('../components/IssueFormPage'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const page = () => {
  return <IssueFormPage />;
};

export const metadata: Metadata = {
  title: 'Issues Tracker -New Issue page ',
  description: 'Creat a new issue',
};

export default page;
