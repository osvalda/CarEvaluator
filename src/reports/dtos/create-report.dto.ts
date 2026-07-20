import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude, MAX } from 'class-validator';

export class CreateReportDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2026)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(10000000)
    milage: number;

    @IsLongitude()
    long: number;

    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;
}