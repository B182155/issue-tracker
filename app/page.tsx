import Image from 'next/image';
import Navbar from './Navbar';
import Pagination from './components/Pagination';

interface Props {
  searchParams: { page: string };
}

export default function Home({ searchParams }: Props) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <>
      <Pagination
        currentPage={page}
        itemCount={100}
        pageSize={10}
      />
    </>
  );
}
