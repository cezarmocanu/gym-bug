import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne(req.user.email);
    delete user.password;
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('visits')
  async getVisits(@Request() req) {
    return (await this.usersService.findOne(req.user.email)).visits;
  }

  @UseGuards(AuthGuard)
  @Put('visits')
  async updateVisits(@Request() req) {
    return (await this.usersService.updateVisit(req.user)).visits;
  }
}
