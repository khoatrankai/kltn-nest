import { Controller, Get, Post, Body, Req, Res, UseGuards, HttpStatus, BadRequestException } from '@nestjs/common';
// import { VnpayModelsService } from './vnpay-models.service';
import { CreateVnpayModelDto } from './dto/create-vnpay-model.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import moment from 'moment';
import { CreateVnpayPaymentConfig } from './config/create-vnpay-payment.config';
import { sortObject } from './function/sort-object.function';
import qs from 'qs';
import crypto from 'crypto';
import { UserPointHistoriesService } from 'src/models/point-models/user-point-histories/user-point-histories.service';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ProfilesService } from 'src/models/profile-models/profiles/profiles.service';

@ApiTags('Vnpay Models')
@Controller('vnpay-models')
export class VnpayModelsController {
  // constructor(private readonly vnpayModelsService: VnpayModelsService) { }
  constructor(
    private readonly userPointHistoriesService: UserPointHistoriesService,
    private readonly profilesService:ProfilesService
  ) { }


  @Post('/create_payment_url')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createVnpayModelDto: CreateVnpayModelDto, @Req() req: any, @Res() res: any, @Req() reqUser: CustomRequest) {
    try {
      const accountId = reqUser?.user?.id;

      if (!accountId) {
        return res.status(403).json({
          statusCode: 403,
          message: 'Permission denied'
        });
      }
      let date = new Date();

      let createDate = moment(date).format('YYYYMMDDHHmmss');

      let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      let tmnCode = CreateVnpayPaymentConfig.vnp_TmnCode;
      let secretKey = CreateVnpayPaymentConfig.vnp_HashSecret
      let vnpUrl = CreateVnpayPaymentConfig.vnp_Url;
      let returnUrl = CreateVnpayPaymentConfig.vnp_ReturnUrl;

      let orderId = moment(date).format('DDHHmmss');

      let amount = createVnpayModelDto.amount;

      let bankCode = createVnpayModelDto.bankCode;

      let locale = createVnpayModelDto.language;

      if (locale === null || locale === '') {
        locale = 'vn';
      }

      let currCode = 'VND';

      let vnp_Params = {} as any;

      vnp_Params['vnp_Version'] = '2.1.0';
      vnp_Params['vnp_Command'] = 'pay';
      vnp_Params['vnp_TmnCode'] = tmnCode;
      vnp_Params['vnp_Locale'] = locale;
      vnp_Params['vnp_CurrCode'] = currCode;
      vnp_Params['vnp_TxnRef'] = orderId;
      vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
      vnp_Params['vnp_OrderType'] = 'other';
      vnp_Params['vnp_Amount'] = amount * 100;
      vnp_Params['vnp_ReturnUrl'] = returnUrl;
      vnp_Params['vnp_IpAddr'] = ipAddr;
      vnp_Params['vnp_CreateDate'] = createDate;
      if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
      }
      vnp_Params = sortObject(vnp_Params);

      let signData = qs.stringify(vnp_Params, { encode: false });

      let hmac = crypto.createHmac('sha512', secretKey);
      let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
      vnp_Params['vnp_SecureHash'] = signed;

      vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

      let createUserHistory = await this.userPointHistoriesService.create({
        userId: accountId,
        amount: createVnpayModelDto.amount,
        orderId: orderId,
        description: 'Nạp tiền VNPAY',
        // status: 0 chua nhap ma pin
        status: 0
      });

      if (!createUserHistory) {
        return res.status(500).json({
          statusCode: 500,
          message: 'Server error'
        });
      }


      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: {
          url: vnpUrl
        }
      });
    } catch (error) {
      throw error;
    }
  }

  @Get('vnpay_return')
  findAll(@Req() req: any, @Res() res: any) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    // let tmnCode = CreateVnpayPaymentConfig.vnp_TmnCode;
    let secretKey = CreateVnpayPaymentConfig.vnp_HashSecret;

    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', secretKey);

    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      // res.render('success', { code: vnp_Params['vnp_ResponseCode'] });
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        code: vnp_Params['vnp_ResponseCode'],
        message: 'Success'
      });
    } else {
      // res.render('success', { code: '97' });
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        code: '97',
        message: 'Server error'
      });
    }
  }

  @Get('vnpay_ipn')
  async vnpay_ipn(@Req() req: any, @Res() res: any) {
    let vnp_Params = req.query;

    let orderId = vnp_Params['vnp_TxnRef'];

    let secureHash = vnp_Params['vnp_SecureHash'];

    let rspCode = vnp_Params['vnp_ResponseCode'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let secretKey = CreateVnpayPaymentConfig.vnp_HashSecret;
    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    let paymentStatus = '00';
    // let paymentStatus = '1';
    // let paymentStatus = '2';

    let checkOrderId = true;
    let checkAmount = true;

    let checkOrderIdDB = await this.userPointHistoriesService.findOne(orderId, undefined, 'orderId');

    if (!checkOrderIdDB) {
      checkOrderId = false;
      res.status(HttpStatus.OK).json({RspCode: '01', Message: 'Order not found'})
    }

    let checkAmountDB = await this.userPointHistoriesService.findOne(undefined, vnp_Params['vnp_Amount'], 'amount');

    if (!checkAmountDB) {
      checkAmount = false;
      res.status(HttpStatus.OK).json({RspCode: '04', Message: 'Amount invalid'})
    }

    if (secureHash === signed) {
      if (checkOrderId && checkAmount) {
        if (paymentStatus === '00') {
          if (rspCode === '00') {
            //Thanh toan thanh cong
            //Cap nhat trang thai don hang thanh cong
            paymentStatus = '1';

            const checkOrderId = await this.userPointHistoriesService.findOneByStatus(orderId, 1)

            if (checkOrderId) {
              throw new BadRequestException('Order is already paid');
            }

            else {

              await this.userPointHistoriesService.update(orderId, +paymentStatus);

              await this.profilesService.updatePoint(checkOrderIdDB.userId, +vnp_Params['vnp_Amount'] / 100);
            }
            res.status(HttpStatus.OK).json({
              statusCode: HttpStatus.OK,
              RspCode: '00',
              message: 'Success'
            });
          }
          else {
            //Thanh toan khong thanh cong
            //Cap nhat trang thai don hang that bai
            paymentStatus = '2';
            await this.userPointHistoriesService.update(orderId, +paymentStatus);
            res.status(HttpStatus.OK).json({
              statusCode: HttpStatus.OK,
              RspCode: '00',
              message: 'Success'
            });
          }
        }
        else {
          res.status(HttpStatus.OK).json({RspCode: '04', Message: 'Amount invalid'})
        }
      }
      else {
        res.status(HttpStatus.OK).json({RspCode: '01', Message: 'Order not found'})
      }
    }
    else {
      res.status(HttpStatus.OK).json({RspCode: '97', Message: 'Checksum failed'})
    }
  }
}
