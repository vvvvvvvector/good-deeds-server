import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ThingEntity } from 'src/things/thing.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ThingEntity, (thing) => thing.user)
  things: ThingEntity[];
}
