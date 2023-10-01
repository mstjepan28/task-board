import { faker } from "@faker-js/faker";
import { TaskStatus } from "../enums/taskStatus";
import { TTask } from "../types/task";
import { TTaskGroup } from "../types/taskGroup";

faker.seed(12345);

// -------------------------------------------- //

export const generateMockTasks = (count: number, parentId: string): TTask[] => {
  return Array.from({ length: count }).map((_, order: number) => {
    const userId = faker.string.uuid();
    const createdAt = faker.date.past().toISOString();
    const updatedAt = faker.helpers.arrayElement([createdAt, faker.date.recent().toISOString()]);

    return {
      id: faker.string.uuid(),
      title: faker.lorem.words(5),
      description: faker.lorem.sentences(),
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

// -------------------------------------------- //

export const generateMockTaskGroups = () => {
  const taskGroupList = Object.values(TaskStatus);

  return taskGroupList.map((taskGroup, order: number) => {
    const taskGroupId = faker.string.uuid();
    const numOfTasks = faker.number.int({ min: 1, max: 10 });

    return {
      id: taskGroupId,
      title: taskGroup,
      order: order,
      taskList: generateMockTasks(numOfTasks, taskGroupId),
    } satisfies TTaskGroup;
  });
};
