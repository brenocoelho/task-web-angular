import { SubTask } from './subtask';

export interface Task {
    id: string;
    name: string;
    notes: string;
    tags: string[];
    due_date: string;
    frequency: string;
    status: string;
    subtasks: SubTask[];
}