import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/prisma/Client';
import { IssueSchema } from '../../validationSchema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = IssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.stack, { status: 500 });
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const issues = await prisma.issue.findMany();
    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.stack, { status: 500 });
    }
  }
}
