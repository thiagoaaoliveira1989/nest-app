import { PartialType } from '@nestjs/swagger';
import { CreateUSerDto } from './create-user.dto';

export class UpdateUSerDto extends PartialType(CreateUSerDto) {}
