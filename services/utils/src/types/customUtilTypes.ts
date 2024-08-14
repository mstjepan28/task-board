export type TypeFromEnum<T extends Readonly<object>> = T[keyof T];
