export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/issues/newissue', '/issues/edit/:id+'],
};
