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

   @Column("varchar", { select: false })
   password: string;

   @Column("varchar", { nullable: true })
   avatar: string;

   @Column("varchar", { nullable: true, select: false })
   passwordResetToken: string;

   @Column({ type: "timestamp", nullable: true, select: false })
   passwordChangedAt: Date;

   @Column("varchar", { nullable: true, select: false })
   refreshToken: string;

   @Column({ type: "timestamp", nullable: true, select: false })
   tokenExp: Date;

   @Column({ type: "timestamp", nullable: true })
   updatedAt: Date;

   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
   createdAt: Date;
}
