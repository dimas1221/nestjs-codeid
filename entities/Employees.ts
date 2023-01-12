import { Column, Entity, Index } from "typeorm";

@Index("employee_id_pk", ["employeeId"], { unique: true })
@Entity("employees", { schema: "public" })
export class Employees {
  @Column("integer", { primary: true, name: "employee_id" })
  employeeId: number;
}
