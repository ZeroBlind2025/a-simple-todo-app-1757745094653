```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb';
import { ObjectId } from 'mongodb';
import { Logger } from '../../utils/logger';

interface Task {
  _id: ObjectId;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  priority?: string;
}

const toggleTaskCompletion = async (req: NextApiRequest, res: NextApiResponse) => {
  const logger = new Logger();
  if (req.method !== 'PATCH') {
    logger.error('Invalid request method');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { taskId } = req.query;

  if (!taskId || typeof taskId !== 'string') {
    logger.error('Invalid task ID');
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    const { db } = await connectToDatabase();
    const taskCollection = db.collection<Task>('tasks');

    const task = await taskCollection.findOne({ _id: new ObjectId(taskId) });

    if (!task) {
      logger.error(`Task not found: ${taskId}`);
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await taskCollection.findOneAndUpdate(
      { _id: new ObjectId(taskId) },
      { $set: { completed: !task.completed } },
      { returnDocument: 'after' }
    );

    if (!updatedTask.value) {
      logger.error(`Failed to update task: ${taskId}`);
      return res.status(500).json({ error: 'Failed to update task' });
    }

    logger.info(`Task completion toggled: ${taskId}`);
    return res.status(200).json(updatedTask.value);
  } catch (error) {
    logger.error(`Error toggling task completion: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default toggleTaskCompletion;
```

```typescript
// utils/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || '';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
```

```typescript
// utils/logger.ts
export class Logger {
  info(message: string) {
    console.log(`INFO: ${message}`);
  }

  error(message: string) {
    console.error(`ERROR: ${message}`);
  }
}
```