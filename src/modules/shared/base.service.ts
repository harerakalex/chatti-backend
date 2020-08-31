import { Repository } from 'sequelize-typescript';
import { Includeable } from 'sequelize/types';
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

  add = async (model: Object) => {
    const result = await this.model.create(model);
    return result.get() as T;
  };

  private createWhereOptions = (option: IPropOption<T>) => ({
    [String(option.prop)]: option.value,
  });
}

export interface IPropOption<T> {
  prop: keyof T | Symbol;
  value: any;
}
