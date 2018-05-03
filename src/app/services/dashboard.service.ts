import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Nominee} from '../models/nominee.model';
import {School} from '../models/school.model';
import {Type} from '../models/Type.model';

@Injectable()
export class DashboardService {

  context = '';

  loadNominationUrl = '/hongtan/vote/api/admin/nominations/';
  passNomineeUrl = '/hongtan/vote/api/admin/nominations/nomination/';
  modalNominee: Nominee;


  GET_ALL_NOMINATIONS_LIST = '/hongtan/vote/api/admin/nominations/';
  GET_AMENDMENTS_BY_ID = '/hongtan/vote/api/admin/nominations/amendments/';
  PUT_NOMINATION = '/hongtan/vote/api/admin/nominations/';
  PUT_NOMINATION_PASSED = '/hongtan/vote/api/admin/nominations/nomination/';
  DELETE_NOMINATION_BY_ID = '/hongtan/vote/api/admin/nominations/nomination/';

  GET_USERS = '/hongtan/vote/api/admin/users/';
  POST_USER = '/hongtan/vote/api/admin/users/';
  DELETE_USER_BY_ID = '/hongtan/vote/api/admin/users/user/';

  POST_NOMINEE_TYPE = '/hongtan/vote/api/admin/nominee-types/';
  DELETE_NOMINEE_TYPE_BY_ID = '/hongtan/vote/api/admin/nominee-types/nominee-type/';

  POST_SCHOOL = '/hongtan/vote/api/admin/schools/';
  DELETE_SCHOOL_BY_ID = '/hongtan/vote/api/admin/schools/school/';

  POST_VOTE_RULE = '/hongtan/vote/api/admin/vote-rules/';
  DELETE_VOTE_RULE_BY_ID = '/hongtan/vote/api/admin/vote-rules/vote-rule/';

  POST_SHARE_CONTENT = '/hongtan/vote/api/admin/we-chat/share-contents/';
  DELETE_SHARE_CONTENT_BY_ID = '/hongtan/vote/api/admin/we-chat/share-contents/share-content/';

  constructor(private http: HttpClient) {
  }

  getAllNominations() {
    return this.http.get(this.context + this.GET_ALL_NOMINATIONS_LIST);
    // body 里面是object的 list
  }

  passNominee(nominee: Nominee) {
    return this.http.put(this.context + this.PUT_NOMINATION_PASSED + nominee.id, nominee);
  }

  updateNominee(nominee: Nominee) {
    return this.http.put(this.context + this.PUT_NOMINATION, nominee);
  }

  deleteNominee(nominee: Nominee) {
    return this.http.delete(this.context + this.DELETE_NOMINATION_BY_ID + nominee.id);
  }


  addSchool(school: School) {
    return this.http.post(this.context + this.POST_SCHOOL, school);
  }

  deleteSchool(school: School) {
    return this.http.delete(this.context + this.DELETE_SCHOOL_BY_ID + school.id);
  }

  addType(t: Type) {
    return this.http.post(this.context + this.POST_NOMINEE_TYPE, t);
  }

  deleteType(t: Type) {
    return this.http.delete(this.context + this.DELETE_NOMINATION_BY_ID + t.id);
  }

}
