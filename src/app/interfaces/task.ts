export interface Task {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: number;
  assignees: any;
}

export interface Option {
  value: string | number | boolean;
  viewValue: string;
}

export enum StatusValue {
  ALL = 'all',
  NEW = 'new',
  IN_DEVELOPMENT = 'in-development',
  COMPLETED = 'completed',
}

export enum StatusViewValue {
  ALL = 'All',
  NEW = 'New',
  IN_DEVELOPMENT = 'In-development',
  COMPLETED = 'Completed',
}

export const MappedStatus: Record<string, string> = {
  [StatusValue.NEW]: StatusViewValue.NEW,
  [StatusValue.IN_DEVELOPMENT]: StatusViewValue.IN_DEVELOPMENT,
  [StatusValue.COMPLETED]: StatusViewValue.COMPLETED,
};

export const StatusOptions: Option[] = [
  { value: StatusValue.NEW, viewValue: StatusViewValue.NEW },
  {
    value: StatusValue.IN_DEVELOPMENT,
    viewValue: StatusViewValue.IN_DEVELOPMENT,
  },
  { value: StatusValue.COMPLETED, viewValue: StatusViewValue.COMPLETED },
];

export const FilterStatusOptions: Option[] = [
  { value: StatusValue.ALL, viewValue: StatusViewValue.ALL },
  ...StatusOptions,
];
export enum PriorityValue {
  LOW = 2,
  MEDIUM = 1,
  HIGH = 0,
}

export enum PriorityViewValue {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export const MappedPriority: Record<string, string> = {
  [PriorityValue.LOW]: PriorityViewValue.LOW,
  [PriorityValue.MEDIUM]: PriorityViewValue.MEDIUM,
  [PriorityValue.HIGH]: PriorityViewValue.HIGH,
};

export const PriorityOptions: Option[] = [
  { value: PriorityValue.LOW, viewValue: PriorityViewValue.LOW },
  { value: PriorityValue.MEDIUM, viewValue: PriorityViewValue.MEDIUM },
  { value: PriorityValue.HIGH, viewValue: PriorityViewValue.HIGH },
];

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}
