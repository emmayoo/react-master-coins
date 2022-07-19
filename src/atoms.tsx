import { atom, selector } from "recoil";

export enum Categories {
	"TODO" = "TODO",
	"DOING" = "DOING",
	"DONE" = "DONE"
}

export interface IToDo {
	id: number;
	text: string;
	category: Categories
};

export const categoryState = atom<Categories>({
	key: "category",
	default: Categories.TODO
})

export const toDoState = atom<IToDo[]>({
	key: 'toDo',
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