export interface IFormProps<T> {
  data: T;

  onSubmit: (data: T) => void;
  isSubmitting: boolean;

  onDelete: () => void;
  isDeleting: boolean;
}
