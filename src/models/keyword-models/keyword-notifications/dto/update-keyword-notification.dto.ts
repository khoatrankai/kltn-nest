import { PartialType } from "@nestjs/swagger";
import { CreateKeywordNotificationDto } from "./create-keyword-notification.dto";

export class UpdateKeywordNotificationDto extends PartialType(CreateKeywordNotificationDto) {
    id!: number;
}
