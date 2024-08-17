export interface IFormProps<T> {
  initData?: T;

  onSubmit: (data: T) => void;
  isSubmitting: boolean;

  onDelete?: () => void;
  isDeleting?: boolean;
}
