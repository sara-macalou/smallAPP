export class EventAction {
  name: string;
  type: EActionType;
  date: Date;
}

export enum EActionType {
  CREATE ='Create',
  DELETE = 'Delete'
}