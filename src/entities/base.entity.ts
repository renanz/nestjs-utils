import { Field, ObjectType } from '@nestjs/graphql';
import { UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export abstract class BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;
}
