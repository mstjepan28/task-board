import { TaskStatus } from "../enums/taskStatus";
import { TTask } from "../types/task";
import { faker } from "@faker-js/faker";

const createTask = (): TTask => {
  const userId = faker.string.uuid();
  const createdAt = faker.date.past().toISOString();
  const updatedAt = faker.helpers.arrayElement([createdAt, faker.date.recent().toISOString()]);

  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    description: faker.lorem.sentences(),
    taskGroup: faker.lorem.word(),
    status: faker.helpers.enumValue(TaskStatus),
    active: faker.helpers.arrayElement([true, false]),
    dueDate: faker.date.future().toISOString(),
    createdByUser: userId,
    assignedToUser: userId,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };
};

export const generateMockTasks = (count: number): TTask[] => {
  return faker.helpers.multiple(createTask, { count });
};
