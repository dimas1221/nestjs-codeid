import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("regions_pkey", ["regionId"], { unique: true })
@Entity("regions", { schema: "public" })
export class Regions {
  @PrimaryGeneratedColumn({ type: "integer", name: "region_id" })
  regionId: number;

  @Column("character varying", {
    name: "region_name",
    nullable: true,
    length: 255,
  })
  regionName: string | null;

  @Column("character varying", {
    name: "region_pic",
    nullable: true,
    length: 255,
  })
  regionPic: string | null;
}
