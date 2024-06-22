import { IsString } from 'class-validator'

export class UpdateCategoryDto {
    @IsString()
    title: string

    @IsString()
    icon: string
}