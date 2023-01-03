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

  @Column({ length: 2, nullable: false })
  public cca2: string;

  @Column({ nullable: false })
  public capital: string;

  @Column({ nullable: false })
  public region: string;

  @Column({ nullable: false })
  public flag: string;

  @Column({ type: 'boolean', default: true })
  public isLiveData: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
