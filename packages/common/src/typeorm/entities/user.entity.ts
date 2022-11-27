import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "../../constants/enums";
import { BaseEntity } from "./base.entity";
import { PostEntity } from "./post.entity";

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "사용자 id" })
  id?: number;

  @Column({ length: 60, unique: true })
  @ApiProperty({ description: "사용자 이메일" })
  email: string;

  @Column({ length: 30 })
  @ApiProperty({ description: "사용자 이름" })
  username: string;

  @Column({ length: 120 })
  @ApiProperty({ description: "사용자 비밀번호" })
  password: string;

  @Column({ type: "enum", enum: RoleEnum })
  @ApiProperty({ description: "사용자 타입" })
  type: RoleEnum;

  @OneToMany((type) => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
