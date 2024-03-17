import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test1@email.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin"],
      todos: {
        create: [
          {
            description: "Soul Stone",
            completed: true,
          },
          {
            description: "Time Stone",
            completed: true,
          },
          {
            description: "Space Stone",
          },
          {
            description: "Power Stone",
            completed: true,
          },
          {
            description: "Mind Stone",
          },
          {
            description: "Reality Stone",
          },
        ],
      },
    },
  });
  return NextResponse.json({ message: "Seed executed!" });
}
