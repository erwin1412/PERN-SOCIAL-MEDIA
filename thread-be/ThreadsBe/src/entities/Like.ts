import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne } from "typeorm"
import { User } from "./User"
import { Threads } from "./Thread"

@Entity({name : "likes"})
export class Like {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> User, (user)=> user.likes)
    user: User

    @ManyToOne(()=> Threads, (thread)=> thread.likes)
    threads: Threads

}
