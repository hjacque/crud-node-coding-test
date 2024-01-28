import { BSON, Collection } from "mongodb";
import { MemberRepositoryPort } from "repositories/ports/member.repository.port";
import { MemberModel } from "./models/member.model.mongo";
import { MemberMapper } from "./mappers/member.mapper.mongo";
import { MemberEntity } from "../../entities/member.entity";

export class MemberRepositoryMongo implements MemberRepositoryPort {
  private memberMapper: MemberMapper;

  constructor(private readonly memberCollection: Collection<MemberModel>) {
    this.memberMapper = new MemberMapper();
  }

  async getMember(memberId: string): Promise<MemberEntity | null> {
    const res = await this.memberCollection.findOne({
      _id: new BSON.ObjectId(memberId),
    });
    return res ? this.memberMapper.toEntity(res) : null;
  }
}
