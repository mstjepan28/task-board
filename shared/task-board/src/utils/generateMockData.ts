import { faker } from "@faker-js/faker";
import { TaskStatus } from "../enums/taskStatus";
import { TTask } from "../types/task";
import { TTaskGroup } from "../types/taskGroup";

faker.seed(12345);

// -------------------------------------------- //

const generateMockTasks = (count: number, parentId: string): TTask[] => {
  return Array.from({ length: count }).map((_, order: number) => {
    const userId = faker.string.uuid();
    const createdAt = faker.date.past().toISOString();
    const updatedAt = faker.helpers.arrayElement([createdAt, faker.date.recent().toISOString()]);

    return {
      id: faker.string.uuid(),
      title: faker.lorem.words(5),
      description: faker.lorem.sentences(),
      backgroundColor: faker.internet.color(),
      taskSubGroup: faker.lorem.word(),
      order: order,
      taskGroupId: parentId,
      active: faker.helpers.arrayElement([true, false]),
      dueDate: faker.date.future().toISOString(),
      createdByUser: userId,
      assignedToUser: userId,
      createdAt: createdAt,
      updatedAt: updatedAt,
    } satisfies TTask;
  });
};

export const generateMockTasksForGroups = () => {
  return Array.from({ length: 4 })
    .map((_, order: number) => {
      return generateMockTasks(5, String(order));
    })
    .flat();
};

// -------------------------------------------- //

export const generateMockTaskGroups = () => {
  const taskGroupList = Object.values(TaskStatus);

  return taskGroupList.map((taskGroup, order: number) => {
    return {
      id: String(order),
      title: taskGroup,
      order: order,
      taskList: [] as TTask[],
    } satisfies TTaskGroup;
  });
};
