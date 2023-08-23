import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { Like } from "./Like"
import { Reply } from "./Reply"

@Entity({name : "follows"})
export class Follow {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> User, (users)=> users.followersList)
    follower: User

    @ManyToOne(()=> User, (users)=> users.followingList)
    followed: User


}
