import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("id_user_pk", ["idUser"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_user" })
  idUser: number;

  @Column("character varying", {
    name: "username",
    nullable: true,
    length: 255,
  })
  username: string | null;

  @Column("text", { name: "password", nullable: true })
  password: string | null;
}
