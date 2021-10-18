import { VoteDirection } from './vote-direction.type';

export interface Vote {
  imageId: string;
  isCurrentUser: boolean;
  direction: VoteDirection;
  id?: number;
  toDelete?: boolean;
}
