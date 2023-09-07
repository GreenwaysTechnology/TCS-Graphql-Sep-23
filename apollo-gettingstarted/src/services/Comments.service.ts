import { COMMENTS } from "../mock-data/comments.js";

//DataSource class//Service class 
export class CommentService {
    constructor() { }
    //all biz apis : CURD operations
    findAll() {
        return COMMENTS
    }
    findById(id: number) {
        return COMMENTS.find(comment => {
            console.log(comment.id, id)
            return comment.id === id
        })
    }
    //save
    save(comment) {
        //save logic
        return comment
    }
    //update
    update(id: number, comment) {
        //write update logic
        return comment;
    }
    //delete
    remove(id: number) {
        //write delete logic       
        return true;
    }
}