import { Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany } from "typeorm"
import { Threads } from "./Thread"
import { Like } from "./Like"
import { Reply } from "./Reply"

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
    @OneToMany(() => Like, (likes)=> likes.user)
    @OneToMany(() => Reply, (replies)=> replies.user)
    
    
    // kalau dia ubah manual id di user maka otomatis di table relation ke ikut ubah juga
    //contoh di thread klw di id user ubah id nya manual maka di thread natni iduser keubah juga otomatis
    // @OneToMany(() => Threads, (threads)=> threads.user, {
    //     onUpdate : "CASCADE"
    // }) 

    // kalau mau hapus user klw terhubung/relasi ke table lain
    // @OneToMany(() => Threads, (threads)=> threads.user , {
    //     onDelete:"CASCADE"
    // }) 

    threadses: Threads[];
    likes: Like[];
    replies: Reply[];
}
