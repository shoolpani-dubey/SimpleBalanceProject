import { Transform } from "class-transformer";
import { IsDate } from "class-validator";

export class FindByDateInputDTO {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  public date: Date;
}
