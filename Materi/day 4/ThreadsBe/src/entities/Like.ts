import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne } from "typeorm"
import { User } from "./User"
import { Threads } from "./Thread"

@Entity({name : "likes"})
export class Like {

    @PrimaryGeneratedColumn()
    id: number

    @Column('boolean', {default: false})
    isLike: boolean = false;

    @ManyToOne(()=> User, (user)=> user.likes)
    user: User

    @ManyToOne(()=> Threads, (thread)=> thread.likes)
    threads: Threads

}
