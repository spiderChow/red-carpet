import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Nominee} from '../models/nominee.model';
import * as $ from 'jquery';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class UserService {
  modifyNominee: Nominee;
  private nominees: Observable<Nominee[]>;

  GET_PASSED_NOMINATIONS_LIST = '/hongtan/vote/api/user/nominations/isPassed';
  GET_NOMINATION_BY_ID = '/hongtan/vote/api/user/nominations/nomination/';
  GET_NOMINEE_TYPES = '/hongtan/vote/api/user/nominee-types/';
  GET_SCHOOLS = '/hongtan/vote/api/user/schools/';
  GET_NOMINATION_VOTE = '/hongtan/vote/api/user/votes/nominations';
  GET_VOTE_RULES = '/hongtan/vote/api/user/vote-rules/';
  POST_NOMINATION = '/hongtan/vote/api/user/nominations/';
  POST_VOTE = '/hongtan/vote/api/user/votes/';
  LOGIN_URL = '/hongtan/vote/login';
  GET_SHARE_CONTENTS = '/hongtan/vote/api/user/we-chat/share-contents/';
  GET_SHARE_CONFIG = '/hongtan/vote/api/user/we-chat/share-config';

  POST_IMG = '/hongtan/vote/api/user/nominations/photo';


  constructor(private http: HttpClient) { }


  getPassedNomineeList() {
    return this.http.get(this.GET_PASSED_NOMINATIONS_LIST);
  }

  getNomineeById(nominee: Nominee) {
    return this.http.get(this.GET_NOMINATION_BY_ID + nominee.id);
  }


  getSchools() {
    return this.http.get(this.GET_SCHOOLS);
  }

  getTypes() {
    return this.http.get(this.GET_NOMINEE_TYPES);

  }

  getNominationVote() {
    return this.http.get(this.GET_NOMINATION_VOTE);
  }

  getVoteRules() {
    return this.http.get(this.GET_VOTE_RULES);
  }

  postNomination(nominee: Nominee) {
    return this.http.post(this.POST_NOMINATION, nominee);
  }

  postVotes(valueObject) {
    // TODO: change the ip address
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Forwarded-For': '127.0.0.2'});

    const ids = [];
    $.each(valueObject, function (name, value) {
      if (value === true) {
        ids.push(name);
      }
    });
    return this.http.post(this.POST_VOTE, ids, {
      headers: headers
    });
  }

  postPhoto(file: File) {
    var formdata = new FormData();

    formdata.append('file', file);

    console.log(formdata);
    console.log(file);
    return this.http.post(this.POST_IMG, formdata);
  }

  loadPhoto(photo: string) {
    return this.http.get( this.POST_IMG +'/'+ photo );
  }

}
