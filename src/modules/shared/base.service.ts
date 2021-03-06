import { Repository } from 'sequelize-typescript';
import { Includeable, WhereOptions, Order } from 'sequelize/types';
import { Base } from '../../database/base';

export class BaseService<T extends Base<T>, TId extends string | number> {
  constructor(protected readonly model: Repository<T>) {}

  // findById = async (
  //   id: TId,
  //   include?: Includeable[],
  //   attributes?: string[]
  // ): Promise<T> => {
  //   const result = await this.model.findByPk(id, { include, attributes });
  //   return result ? (result.get() as T) : null;
  // };

  findOneByProp = async (option: IPropOption<T>, include?: Includeable[]) => {
    const result = await this.model.findOne({
      include,
      where: this.createWhereOptions(option),
    });
    return result ? (result.get() as T) : null;
  };

  // findManyByProp = async (option: IPropOption<T>, include?: Includeable[]) => {
  //   const result = await this.model.findAll({
  //     include,
  //     where: this.createWhereOptions(option),
  //   });
  //   return result.map((item) => item.get()) as T[];
  // };

  findAll = async (options: IFindOptions): Promise<T[]> => {
    const result = await this.model.findAll(options);
    return result.map((e) => e.get({ plain: true })) as T[];
  };

  add = async (model: Object) => {
    const result = await this.model.create(model);
    return result.get() as T;
  };

  async update(id: TId, data: any, returning?: IReturningOptions) {
    const [, [result]] = await this.model.update(
      { ...data },
      {
        where: { id },
        returning: true,
      }
    );
    return result.get() as T;
  }

  private createWhereOptions = (option: IPropOption<T>) => ({
    [String(option.prop)]: option.value,
  });
}

export interface IPropOption<T> {
  prop: keyof T | Symbol;
  value: any;
}

export interface IReturningOptions {
  returning: boolean;
  include?: Includeable[];
}

export interface IFindOptions {
  where?: WhereOptions;
  include?: Includeable[];
  order?: Order;
  attributes?: string[];
  group?: string[];
  subQuery?: boolean;
  limit?: number;
}
