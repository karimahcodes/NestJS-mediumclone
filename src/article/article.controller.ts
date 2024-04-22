import { Controller } from "@nestjs/common";
import { Post } from "@nestjs/common";

@Controller('articles')
export class ArticleController{
    @Post()
    async create(){
        return 'Create article;'
    }
}