import { RESTDataSource } from "@apollo/datasource-rest";

interface Post {
    userId: number
    id: number
    title: string
    body: string
}
export class PostService extends RESTDataSource {
    override baseURL = `https://jsonplaceholder.typicode.com`
    //api
    public async getPosts(): Promise<Post[]> {
        return this.get<Post[]>(`posts`)
    }
    public async getPostById(id: number): Promise<Post> {
        return this.get<Post>(`posts/${id}`)
    }
    //save
    public async createPost(post: Post): Promise<Post> {
        return await this.post<Post>(`posts`, { body: post })
    }
    //update
    public async updatePost(id: number, post: Post): Promise<Post> {
        return await this.put<Post>(`posts/${id}`, { body: post })
    }
    //DELETE 
    public async removePost(id: number) {
        console.log(id)
        return await this.delete(`posts/${id}`) 
    }
}