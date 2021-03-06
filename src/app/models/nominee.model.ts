import {School} from './school.model';
import {Type} from './Type.model';
import {FormGroup, NgForm} from '@angular/forms';

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
  refereeId: string;
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

  converFromForm(form: FormGroup) {
    this.introduction = form.value.introduction as string;
    this.name = form.value.name as string;
    this.referee = form.value.referee as string;
    this.refereeContactInfo = form.value.refereeContactInfo as string;
    this.remark = form.value.remark as string;
    this.story = form.value.story as string;
    this.school.id =  form.value.school as number;
    this.type.id = form.value.type as number;

  }

  converFromNominee(n: Nominee) {
    this.id = n.id;
    this.introduction = n.introduction;
    this.name = n.name;
    this.referee = n.referee;
    this.refereeId = n.refereeId;
    this.refereeContactInfo = n.refereeContactInfo;
    this.remark = n.remark;
    this.story = n.story;
    this.school =  n.school;
    this.type = n.type;
    this.photo = n.photo;
    this.passed = n.passed;
    this.votesNumber = n.votesNumber;
  }

}
