import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IUpdateOrder } from 'modules/database/interfaces/updateOrder';

export class UpdateValidator implements IUpdateOrder {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ required: true, type: 'integer' })
  public id: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, type: 'string' })
  public name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, type: 'string' })
  public description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, type: 'number' })
  public quantity?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, type: 'number' })
  public value?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, type: 'number' })
  public userId?: number;
}
