export type Program = {
  id: string;
  name: string;
  description: string;
  image: string; // Assuming 'image' is a URL string
  startDate: string; // Using string, often ISO 8601 format (e.g., "YYYY-MM-DD")
  endDate: string; // Using string, often ISO 8601 format (e.g., "YYYY-MM-DD")
};

export type Cohort = {
  id: string;
  program: string;
  name: string;
  description: string;
  image: string; // Assuming 'image' is a URL string
  startDate: string; // Using string, often ISO 8601 format (e.g., "YYYY-MM-DD")
  endDate: string; // Using string, often ISO 8601 format (e.g., "YYYY-MM-DD")
};

export type Company = {
  id: string;
  cohort: string;
  name: string;
  image: string;
};

export type Form = {
  id: string;
  name: string;
  description: string;
  schema: string;
  uiSchema: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Profile = {
  id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

export type User = {
  id: string;
  company: string;
  email: string;
  name?: string;
  phone?: string;
  location?: string;
  avatar?: string;
  bio?: string;
  access: "READ" | "WRITE";
  createdAt?: string;
  updatedAt?: string;
};

export type Response = {
  id: string;
  form: string;
  company: string;
  data: string;
  createdAt?: string;
  updatedAt?: string;
};
