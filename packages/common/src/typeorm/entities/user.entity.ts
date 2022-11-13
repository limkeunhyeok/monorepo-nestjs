import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "../../constants/enums";
import { BaseEntity } from "./base.entity";
import { PostEntity } from "./post.entity";

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 120 })
  password: string;

  @Column({ type: "enum", enum: RoleEnum })
  type: RoleEnum;

  @OneToMany((type) => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
