import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryColumn()
  public username: string;

  @Column()
  public password: string;
}

export default User;
