import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column("varchar", {})
   firstname: string;

   @Column("varchar", {})
   lastname: string;

   @Column("varchar", { unique: true })
   email: string;

   @Column("varchar", { unique: true, select: false })
   password: string;

   @Column("varchar", {})
   avatar: string;

   @Column("varchar", {})
   passwordResetToken: string;

   @Column()
   passwordChangedAt: Date;

   @Column()
   updatedAt: Date;

   @Column({ default: Date.now })
   createdAt: Date;
}
