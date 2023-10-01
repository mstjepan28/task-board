export type TTask = {
  id: string;

  title: string;
  description: string;

  taskSubGroup: string;
  taskGroupId: string;

  order: number;
  active: boolean;
  dueDate: string;

  createdByUser: string;
  assignedToUser: string;

  createdAt: string;
  updatedAt: string;
};
