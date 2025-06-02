import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { RegisterDto } from '../auth/dto/register.dto' // Reuse DTO for creation

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(registerDto: RegisterDto): Promise<UserDocument> {
    const newUser = new this.userModel({
      username: registerDto.username,
      password: registerDto.password, // Hashing is handled by pre-save hook in schema
    })
    return newUser.save()
  }

  async findOneByUsername(username: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ username }).select('+passwordHash').exec() // Include passwordHash for comparison
  }

  async findById(id: string): Promise<UserDocument | undefined> {
    return this.userModel.findById(id).exec()
  }
}
