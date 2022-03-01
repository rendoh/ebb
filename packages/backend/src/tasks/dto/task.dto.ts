export class TaskDto {
  readonly id!: string;
  readonly title!: string;
  readonly content!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly archived!: boolean;
}
