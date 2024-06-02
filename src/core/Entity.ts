export abstract class Entity<EntityProps> {
  protected props: EntityProps;
  private readonly _id: string;

  protected constructor(props: EntityProps, id?: string) {
    this.props = props;
    if (id) {
      this._id = id;
    }
  }

  public get id(): string {
    return this._id;
  }
}
