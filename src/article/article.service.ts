// import { Injectable } from "@nestjs/common";
// import { CreateArticleDto } from "./dto/createArticle.dto";
// import { ArticleEntity } from "./article.entity";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";


// @Injectable()
// export class ArticleService{
    
//     constructor(
//         @InjectRepository(ArticleEntity) 
//         private readonly articleRpository: Repository<ArticleEntity>,
//     ){}

//     async createArticle(
//         currentUserId: number, 
//         createArticleDto: CreateArticleDto
//     ): Promise<ArticleEntity> {
//         const article = new ArticleEntity()
//         Object.assign(article, createArticleDTO)
//         // return 'createArticle from service';
//         if (!article.tagList){
//             article.taglist = [];
//         }
//     }
// }