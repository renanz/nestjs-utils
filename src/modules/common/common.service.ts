import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Repository, FindOneOptions, DeleteResult, FindManyOptions, FindConditions } from 'typeorm';

@Injectable()
export class CommonService<TEntity> {
  constructor(@InjectEntityManager() private readonly repository: Repository<TEntity>) {}

  public async find(options?: FindConditions<TEntity> | FindManyOptions<TEntity>): Promise<TEntity[]> {
    return await this.repository.find(options);
  }

  public async findOne(
    ...[paramOne, options]: [id: number, options?: FindOneOptions<TEntity>] | [options?: FindOneOptions<TEntity>]
  ): Promise<TEntity | undefined> {
    if (typeof paramOne === 'number') {
      return await this.repository.findOne(paramOne, options);
    }
    return await this.repository.findOne(paramOne);
  }

  public async findOneOrFail(
    ...[paramOne, options]: [id: number, options?: FindOneOptions<TEntity>] | [options?: FindOneOptions<TEntity>]
  ): Promise<TEntity> {
    if (typeof paramOne === 'number') {
      return await this.repository.findOneOrFail(paramOne, options);
    }
    return await this.repository.findOneOrFail(paramOne);
  }

  public async count(options?: FindManyOptions<TEntity>) {
    return await this.repository.count(options);
  }

  public async save(entity: TEntity): Promise<TEntity> {
    return await this.repository.save(entity);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
