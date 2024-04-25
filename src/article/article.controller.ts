// import { Controller, Post, UseGuards } from "@nestjs/common";
// import { ArticleService } from "./article.service";
// import { AuthGuard} from "@app/user/guards/auth.guard";
// import { CreateArticleDto } from "./dto/createArticle.dto";

// @Controller('articles')
// export class ArticleController{
    
//     constructor(private readonly articleService: ArticleService) {}
    
//     @Post()
//     @UseGuards(AuthGuard)
//     async create(@User('id') currentUserId: number, @Body('article') createArticleDto){
//         return await this.articleService.createArticle(currentUserId,createArticleDto);
//     }
// }

// //when we're creating an article we on need to extract the ID from the user