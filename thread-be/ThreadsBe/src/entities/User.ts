import { Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany } from "typeorm"
import { Threads } from "./Thread"
import { Like } from "./Like"
import { Reply } from "./Reply"
import { Follow } from "./Follow"

@Entity({name : "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column()
    username: string
    
    @Column()
    email: string
    
    @Column({select : false})
    password: string
        
    @Column({nullable : true})
    picture: string

    @Column({nullable : true})
    description: string
    
    @Column({ type : "timestamp" , default: () => "CURRENT_TIMESTAMP" })
    created_at: Date 
    
    @Column({ type : "timestamp" , default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date 


    @OneToMany(() => Threads, (threads)=> threads.user)
    threadses: Threads[];
    @OneToMany(() => Like, (likes)=> likes.user)
    
    likes: Like[];
    @OneToMany(() => Reply, (replies)=> replies.user)

    replies: Reply[];
    
    
    // kalau dia ubah manual id di user maka otomatis di table relation ke ikut ubah juga
    // contoh di thread klw di id user ubah id nya manual maka di thread natni iduser keubah juga otomatis
    // @OneToMany(() => Threads, (threads)=> threads.user, {
    //     onUpdate : "CASCADE"
    // }) 

    // kalau mau hapus user klw terhubung/relasi ke table lain
    // @OneToMany(() => Threads, (threads)=> threads.user , {
    //     onDelete:"CASCADE"
    // }) 




    @OneToMany(() => Follow, (follows) => follows.follower)
    followersList: Follow[];
    
    @OneToMany(() => Follow, (follows) => follows.followed)
    followingList: Follow[];


}
