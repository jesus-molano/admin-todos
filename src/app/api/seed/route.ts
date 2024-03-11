import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.todo.createMany({
    data: [
      { description: "Soul Stone", completed: true },
      { description: "Time Stone", completed: true },
      { description: "Space Stone" },
      { description: "Mind Stone" },
      { description: "Power Stone" },
      { description: "Reality Stone" },
    ],
  });
  return NextResponse.json({ message: "Seed executed!" });
}
