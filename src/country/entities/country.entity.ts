import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public capital: string;

  @Column({ type: 'boolean', default: false })
  public isTest: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
