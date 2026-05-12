import prisma from "../utils/prisma.js";

async function main() {

  await prisma.community.create({
    data: {
      name: "JavaScript",
      slug: "javascript",
    },
  });

  await prisma.community.create({
    data: {
      name: "ReactJS",
      slug: "reactjs",
    },
  });

  console.log("Seed Data Added");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });