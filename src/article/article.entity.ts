import { UserEntity } from "@app/user/user.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'articles' })
export class ArticleEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column({ default: "" })
    description: string;

    @Column({ default: "" })
    body: string;

    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;
    
    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column('simple-array')
    tagList: string[];
    // stores any tags applied to an article in an array

    @Column({ default: 0 })
    favoritesCount: number;

    @BeforeUpdate()
    updateTimestamp(){
        this.updatedAt = new Date();
    }

    @ManyToOne( ()=> UserEntity, (user) => user.articles)
    author: UserEntity;
    
}

// @BeforeUpdate()  updateTimestamp(){ this.updatedAt = new Date();  } says
// whenever we update the record, we must update the updatedAt field. This doesn't occur automatically so we use @BeforeUpdate decorator to create a new Date object.

//The author column will be of type UserEntity and will run the ManyToOne method that returns a user entity and the articles associated with them (from the user entity)