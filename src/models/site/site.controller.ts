import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Language } from "src/common/enum";
import * as fs from 'fs';
// import path from 'path'; 
import { CustomRequest } from "src/common/interfaces/customRequest.interface";
import { SiteService } from "./site.service";

@ApiTags('Site')
@Controller('site')
export class SiteController {
    constructor(
        private readonly siteService: SiteService
    ) {}

    @Get('jobs')
    async getJobs() {
        return {
            data: {
                total: await this.siteService.countAllPosts(),
            }
        };
    }

    // get languages

    @Get('languages')
    getLanguages(@Req() req: CustomRequest) {

        // get language
        const lang = req.lang

        const languagePaths = {
            [Language.EN]: 'src/config/languages/en.json',
            [Language.VI]: 'src/config/languages/vi.json',
            [Language.KO]: 'src/config/languages/ko.json'
        };

        // const filePath = path.join(__dirname,  (languagePaths[lang]));

        const filePath = languagePaths[lang];

        try {
            const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
            const jsonData = JSON.parse(data);
            
            return {
                statusCode: HttpStatus.OK,
                data: jsonData
            };
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Error reading language file');
        }
    }

    @Post()
    updateLanguage(@Req() req: any, @Body() data: any) {
      try {
        const link =
          req.lang === 'vi'
            ? 'src/config/languages/vi.json'
            : 'src/config/languages/en.json';
        if (fs.existsSync(link)) {
          fs.unlinkSync(link);
        }
        fs.writeFileSync(link, JSON.stringify(data, null, 2));

        return {
          status: HttpStatus.OK,
          message: 'Updated language successfully'
        }
      } catch (error) {
        console.log(error);
        throw new BadRequestException('Error update language');
      }
    }
}
