import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { Like } from "./Like"
import { Reply } from "./Reply"

@Entity({name : "follows"})
export class Follow {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({nullable : true})
    image: string


    @Column({ type : "timestamp" , default: () => "CURRENT_TIMESTAMP" })
    posted_at: Date 

    @ManyToOne(()=> User, (users)=> users.follows)
    user: User

    @ManyToOne(()=> User, (users)=> users.follows)
    follower: User

    @ManyToOne(()=> User, (users)=> users.follows)
    followed: User


}
