import { Column, Entity, Index, OneToMany } from "typeorm";
import { Products } from "./Products";

@Index("supr_id_pk", ["suprId"], { unique: true })
@Entity("suppliers", { schema: "public" })
export class Suppliers {
  @Column("integer", { primary: true, name: "supr_id" })
  suprId: number;

  @Column("character varying", {
    name: "supr_name",
    nullable: true,
    length: 40,
  })
  suprName: string | null;

  @Column("character varying", {
    name: "supr_contact_name",
    nullable: true,
    length: 30,
  })
  suprContactName: string | null;

  @Column("character varying", {
    name: "supr_city",
    nullable: true,
    length: 15,
  })
  suprCity: string | null;

  @OneToMany(() => Products, (products) => products.prodSupr)
  products: Products[];
}
