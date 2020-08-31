import bcrypt from 'bcrypt';

export class UserAuth {
  /**
   * @description hash user password
   * @param  {variable} password The password to be hashed
   * @param hashedPassword This function return the hashed password
   */
  static hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * @description compare hashed password and actual password
   * @param  {variable} hashedPass The hashed password
   * @param  {variable} compare The actual user password
   * @param hashedPassword This function return true if password equals
   */
  // static unhashPassword(hashedPass: string, compare: string) {
  //   return bcrypt.compareSync(hashedPass, compare);
  // }
}
