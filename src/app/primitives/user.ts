import {Book} from './book';

export class User {
    constructor(public name: string, public email: string, public bio: string, public password: string, public books: Book[]) {}
}