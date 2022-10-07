import express, { json } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

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
  const friends = await prisma.friend.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.status(200).json(friends);
});

app.delete('/friends', async (req, res) => {
  const { id } = req.body;
  const friend = await prisma.friend.delete({
    where: {
      id,
    },
  });

  return res.status(200).json({ message: 'Amigo deletado com sucesso!' });
});

app.listen(process.env.PORT || 3333);
