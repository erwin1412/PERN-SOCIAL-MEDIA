import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { Like } from "./Like"
import { Reply } from "./Reply"

@Entity({name : "threads"})
export class Threads {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({nullable : true})
    image: string


    @Column({ type : "timestamp" , default: () => "CURRENT_TIMESTAMP" })
    posted_at: Date 

    @ManyToOne(()=> User, (user)=> user.threadses)
    user: User

    @OneToMany(() => Like, (likes)=> likes.threads)
    likes: Like[];
    
    @OneToMany(() => Reply, (replies)=> replies.threads)
    replies: Reply[];
}
