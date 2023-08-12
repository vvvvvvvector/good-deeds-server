import { UserEntity } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('friendships')
export class FriendshipEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  requester: UserEntity;

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  addressee: UserEntity;
}
