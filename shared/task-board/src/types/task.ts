export type TTask = {
  id: string;

  title: string;
  description: string;
  taskGroup: string;

  status: string;
  active: boolean;
  dueDate: string;

  createdByUser: string;
  assignedToUser: string;

  createdAt: string;
  updatedAt: string;
};
