export class Recipe {
    constructor(
        public id: string,
        public title: string,
        public ingredients: string[],
        public preptime: number,
        public instructions: string,
        public imageUrl: string,
        public userId: string
    ) {}
}