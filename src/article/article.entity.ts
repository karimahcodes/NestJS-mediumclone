import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    // whenever we update the record, we must update the updatedAt field. This doesn't occur automatically so we use @BeforeUpdate decorator to create a new Date object.

}
