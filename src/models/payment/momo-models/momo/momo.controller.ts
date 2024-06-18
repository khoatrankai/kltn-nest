import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
// import { MomoService } from './momo.service';
import { CreateMomoDto } from './dto/create-momo.dto';
import * as crypto from 'crypto';
import * as https from 'https';
import { createPaymentConfig } from '../config/create-payment.config';
// import { CreatePaymentInterface } from './interface/create-payment.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { UserPointHistoriesService } from 'src/models/point-models/user-point-histories/user-point-histories.service';
import { ProfilesService } from 'src/models/profile-models/profiles/profiles.service';

@ApiTags('Momo')
@Controller('momo')
export class MomoController {
  // constructor(private readonly momoService: MomoService) { }
  constructor(
    private readonly userPointHistoriesService: UserPointHistoriesService,
    private readonly profilesService: ProfilesService
  ) { }

  @Post('createPayment')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  create(@Body() createMomoDto: CreateMomoDto, @Res() res: any, @Req() req: CustomRequest) {

    const accountId = req?.user?.id;

    if (!accountId) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Permission denied'
      });
    }
    const partnerCode = createPaymentConfig.partnerCode;
    const accessKey = createPaymentConfig.accessKey;
    const secretKey = createPaymentConfig.secretKey;
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = createPaymentConfig.orderInfo;
    const redirectUrl = createPaymentConfig.redirectUrl;
    const ipnUrl = createPaymentConfig.ipnUrl;
    const amount = createMomoDto.amount ? createMomoDto.amount : '10000';
    const requestType = createPaymentConfig.requestType;
    const extraData = createPaymentConfig.extraData;

    const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    // Encode base64 with extraData

    const requestBody = ({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: 'en'
    });

    const options = {
      hostname: 'test-payment.momo.vn',
      port: 443,
      path: '/v2/gateway/api/create',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Length': Buffer.byteLength(requestBody)
      }
    }

    const moMoReq = https.request(options, async (moMoRes) => {
      let responseData = '';

      await this.userPointHistoriesService.create({
        userId: accountId,
        amount: createMomoDto.amount,
        orderId: orderId,
        description: createMomoDto.extraData ? createMomoDto.extraData : 'Nạp tiền MOMO',
        // status: 0 chua nhap ma pin
        status: 0
      });

      moMoRes.on('data', (chunk) => {
        responseData += chunk;
      });


      moMoRes.on('end', async () => {
        console.log('MoMo response:');
        console.log(responseData);

        let checkOrderId = await this.userPointHistoriesService.findOne(orderId, 0, 'orderId');

        if (checkOrderId) {
          return res.status(400).json({
            statusCode: 400,
            message: 'Order id already exists'
          });
        }
        else {
          await this.userPointHistoriesService.update(orderId, 1);
          await this.profilesService.updatePoint(accountId, +createMomoDto.amount);
        }

        // Send the MoMo response to the client
        res.json({ moMoResponse: JSON.parse(responseData) });
      });
    });

    moMoReq.on('error', (e) => {
      console.error(`Problem with MoMo request: ${e.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    moMoReq.write(JSON.stringify(requestBody));
    moMoReq.end();

  }
}
