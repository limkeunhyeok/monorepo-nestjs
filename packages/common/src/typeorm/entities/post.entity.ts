import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "게시글 id" })
  id?: number;

  @Column()
  @ApiProperty({ description: "게시글 제목" })
  title: string;

  @Column("text")
  @ApiProperty({ description: "게시글 내용" })
  text: string;

  @ManyToOne((type) => UserEntity, (user) => user.posts)
  user: UserEntity;
}
