import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {hash} from "bcrypt";
import { ArticleEntity } from "@app/article/article.entity";

@Entity({name: 'users'})
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({default: ""})
    bio: string;

    @Column({default: ""})
    image: string;

    @Column()
    username: string;

    @Column()
    pronouns: string;

    @Column({default:""})
    password: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await hash(this.password, 10)
    }

    @OneToMany(()=>ArticleEntity, (article) => article.author) 
    articles: ArticleEntity[];

}

// @OneToMany(()=>ArticleEntity) says our user can have multiple articleEntities
//(article) => article.author allows us to pull out the author property from every article