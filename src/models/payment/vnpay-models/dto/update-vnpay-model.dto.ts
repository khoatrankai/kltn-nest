import { PartialType } from '@nestjs/mapped-types';
import { CreateVnpayModelDto } from './create-vnpay-model.dto';

export class UpdateVnpayModelDto extends PartialType(CreateVnpayModelDto) {}
