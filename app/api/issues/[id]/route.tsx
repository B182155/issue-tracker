import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/Client';
import { IssueSchema } from '@/app/validationSchema';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validation = IssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!issue) {
      return NextResponse.json({ error: 'Invalid Issue' }, { status: 400 });
    }

    const updatedUser = await prisma.issue.update({
      where: {
        id: issue.id,
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.stack, { status: 500 });
    }
  }
}
