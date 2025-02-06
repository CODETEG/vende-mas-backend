import { Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { PrismaService } from 'src/global/prisma/prisma.service'
import { BaseService } from 'src/common/services/base.service'

@Injectable()
export class CommentsService extends BaseService<
  Comment,
  CreateCommentDto,
  UpdateCommentDto
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'comment')
  }

  async remove(id: number) {
    const comment = await this.findOne(id)

    await this.prismaService.comment.delete({
      where: { id },
    })

    return comment
  }
}
