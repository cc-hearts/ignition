import {
  Entity,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  ObjectId,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

export enum PAGE_TYPE {
  'pc' = 0,
  'mobile' = 1,
  'weapp' = 2,
}

export enum STATUS_TYPE {
  'activated' = 0, // 未激活
  'inactive' = 1, // 激活
  'deleted' = 2, // 删除
}

export enum API_TYPE {
  'swagger' = 0,
}

@Entity()
export class Site {
  @ObjectIdColumn({ name: '_id' })
  id: ObjectId;

  @Column()
  name: string;

  @Column({ default: null })
  description: string;

  @Column({ default: null })
  url: string;

  @Column({ default: null })
  apiType: API_TYPE;

  @Column({ default: null })
  currentVersion: string;

  @Column({ default: null })
  deployVersion: string;

  // 设备类型
  @Column()
  type: PAGE_TYPE;

  // site 状态
  @Column({ default: STATUS_TYPE.activated })
  status: number = STATUS_TYPE.activated;

  @CreateDateColumn()
  createDate: string;

  @UpdateDateColumn()
  updateDate: string;

  @UpdateDateColumn({ default: null })
  appointmentUp: string;

  @UpdateDateColumn({ default: null })
  appointmentDown: string;
}
