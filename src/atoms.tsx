import { atom, selector } from "recoil";

export enum Categories {
	"TODO" = "To Do",
	"DOING" = "Doing",
	"DONE" = "Done"
}

export interface IToDo {
	id: number;
	text: string;
	category: Categories | string;
};

export const categoryState = atom<Categories>({
	key: "category",
	default: Categories.TODO
});

export const customCategoryState = atom<string[]>({
	key: "customCategory",
	default: localStorage.getItem("custom")? JSON.parse(localStorage.getItem("custom")!) : []
});

export const toDoState = atom<IToDo[]>({
	key: "toDo",
	default: localStorage.getItem("todo")? JSON.parse(localStorage.getItem("todo")!) : []
});

export const toDoSelector = selector({
	key: "toDoSelector",
	get: ({ get }) => {
		const toDos = get(toDoState);
		const category = get(categoryState);
		return toDos.filter(todo => todo.category === category);
	}
});

export const categoriesSelector = selector({
	key: "categoriesSelector",
	get: ({ get }) => {
		const customs = get(customCategoryState)
		return [Categories.TODO, Categories.DOING, Categories.DONE, ...customs];
	}
});