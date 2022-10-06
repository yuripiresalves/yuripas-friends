import express, { json } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(json());

const prisma = new PrismaClient();

app.post('/friends', async (req, res) => {
  const { id, name, imageUrl, createdAt } = req.body;

  let friend;

  try {
    friend = await prisma.friend.create({
      data: {
        id,
        name,
        imageUrl,
        createdAt,
      },
    });
  } catch (error) {
    return res.status(400).json(error);
  }

  return res.status(201).json(friend);
});

app.get('/friends', async (req, res) => {
  const friends = await prisma.friend.findMany();

  return res.status(200).json(friends);
});

app.listen(3333);
