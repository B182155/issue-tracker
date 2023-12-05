import React from 'react';
// import IssueFormPage from '../components/IssueFormPage';
import dynamic from 'next/dynamic';
import delay from 'delay';
import IssueFormSkeleton from './loading';

const IssueFormPage = dynamic(() => import('../components/IssueFormPage'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const page = () => {
  return <IssueFormPage />;
};

export default page;
