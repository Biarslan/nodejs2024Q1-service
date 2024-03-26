import { IsNumber, IsString, ValidateIf } from 'class-validator';
export class CreateTrackDto {
  @IsString()
  name: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;

  @IsNumber()
  duration: number;
}
