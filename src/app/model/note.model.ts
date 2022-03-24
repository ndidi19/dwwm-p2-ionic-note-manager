import { Category } from "./category.model";

export interface Note {
    id?: string;
    noteTitle: string;
    noteContent: string;
    date: string;
    category: Category
}