```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import { z } from 'zod';

const mongoUri = process.env.MONGODB_URI || 'your_mongodb_uri';
let cachedDb: Db | null = null;

const taskFilterSchema = z.object({
  completed: z.boolean().optional(),
  priority: z.string().optional(),
  dueDate: z.string().optional().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
});

async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedDb = client.db();
  return cachedDb;
}

async function filterTasks(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const query = req.query;
    const { completed, priority, dueDate } = taskFilterSchema.parse(query);

    const db = await connectToDatabase();
    const collection = db.collection('tasks');

    const filter: any = {};
    if (completed !== undefined) filter.completed = completed;
    if (priority) filter.priority = priority;
    if (dueDate) filter.dueDate = new Date(dueDate);

    const tasks = await collection.find(filter).toArray();

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error filtering tasks:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default filterTasks;
```