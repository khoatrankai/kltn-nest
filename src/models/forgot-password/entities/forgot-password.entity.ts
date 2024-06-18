import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'forgot_password' })
export class ForgotPassword {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'email' })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'token' })
  token!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'ip' })
  ip!: string;

  @Column({ type: 'datetime', nullable: false, name: 'expires_at' })
  expiresAt!: Date;

  @Column({ type: 'tinyint', nullable: false, default: 0, name: 'status' })
  status!:number;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt!: Date;
}
