import { PrimaryGeneratedColumn ,Column, Entity, Index, OneToMany } from "typeorm";
import { Orders } from "./Orders";


@Index("customers_cust_city", ["custCity"], {})
@Index("cust_id_pk", ["custId"], { unique: true })
@Entity("customers", { schema: "public" })
export class Customers {
  @Column("character", { primary: true, name: "cust_id", length: 100 })
  custId: string;

  @Column("character varying", {
    name: "cust_name",
    nullable: true,
    length: 40,
  })
  custName: string | null;

  @Column("character varying", {
    name: "cust_city",
    nullable: true,
    length: 15,
  })
  custCity: string | null;

  @OneToMany(() => Orders, (orders) => orders.orderCust)
  orders: Orders[];
}
