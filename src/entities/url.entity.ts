import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("urls")
export class UrlEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column("varchar", {})
   originalUrl: string;

   @Column("varchar", {})
   shortUrl: string;

   @Column("varchar", { nullable: false })
   urlAlias: string;

   @Column("varchar")
   qrcode: string;

   @Column("varchar", { select: false, nullable: true })
   password: string;

   @Column({ type: "timestamp" })
   expiresAt: Date;

   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
   createdAt: Date;
}