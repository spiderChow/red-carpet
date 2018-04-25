import {School} from './school.model';
import {Type} from './Type.model';

export class Nominee {
  name: string;
  introduction: string;
  story: string;
  school: School;
  type: Type;
  id: string;
  votesNumber: number;
  remark: string;
  photo: string;

  referee: string;
  refereeContactInfo: string;

  passed: boolean;


  constructor() {
    this.name = '';
    this.introduction = '';
    this.story = '';
    this.votesNumber = 0;
    this.school = new School();
    this.type = new Type();
  }

}
