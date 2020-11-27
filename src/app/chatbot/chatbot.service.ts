import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {  BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../store/app.reducers';
import { ChatbotResponse, ChatbotResponseRaw } from './ChatbotResponse.model';
import { ChatMessage } from './ChatMessage.model';
import * as chatbotActions from './store/chatbot.actions';


@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  conversation = new Subject<ChatMessage>();
  messagesRefreshed = new BehaviorSubject<boolean>(false);
  sender_id = '';

  refreshSender_id () {
    this.sender_id = +(new Date().getTime()) + '1211';
  }

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    this.refreshSender_id();
  }

  update(msg: ChatMessage) {
    this.conversation.next(msg);
  }

  converse(answer: string[]): Observable<ChatbotResponse> {
    answer.forEach(ans => {
      this.store.dispatch(chatbotActions.pushMessage({
        message: new ChatMessage(ans, 'user')
      }));
    })
    const joinedAnswer = answer.join(';');

    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // const url = "https://e35a380ef6e4.ngrok.io/conversations/deepcarelivechat";
    const url = "https://12f1e5286d7b.ngrok.io/conversations/deepcarelivechat";

    return this.http.post<ChatbotResponseRaw>(
      url,
      {
        text: joinedAnswer,
        sender_id: this.sender_id
      }
    ).pipe(
      map(
        response => {
          // response.disease = tung; 
          const options = response.hasOwnProperty('options') ? response.options.map(option => ({ text: option, isChecked: false })) : [];

          const diseases = response.hasOwnProperty('disease') ? response.disease.result.map(d => {
            const label = d.label.replace(/_/g, ' ');
            const iri = d.iri.replace(/[\<\>]/g, '');

            return ({
              ...d, 
              label,
              iri
            });
          }) : [];

          const chatbotResponse: ChatbotResponse = {
            messages: response.text,
            type: response.type,
            options,
            diseases
          }

          return chatbotResponse;
        }
      )
    );
  }
}

var tung = {
  'result': [
    {
      'disease_group': 'Bệnh_khác',
      'disease_score': 0, 'faculty_code': ['DCCK13'],
      'faculty_name': ['Răng hàm mặt'],
      'icd10': 'K05',
      'iri': '<http://deepcare.io/R7gLmdSNFVTgkmL3UKLqwdu>',
      'lab_test': [],
      'label': 'Bệnh_về_nướu',
      'level': 1,
      'ranking_score': 0,
      'recommend': 'DAISA cho rằng bạn đang gặp vấn đề về sức khỏe và có thể dẫn đến tình trạng bệnh nặng hơn. DAISA khuyên bạn nên đặt hẹn ngay với bác sĩ để được tư vấn khám bệnh tốt nhất. DAISA đang hợp tác với mạng lưới phòng khám, bệnh viện uy tín với các chuyên gia hàng đầu, trong bước tiếp theo DAISA sẽ giúp bạn đặt hẹn đến bệnh viện, phòng khám, bác sĩ phù hợp nhất cho bạn.',
      'severity_score': 5.1
    },
    {
      'disease_group': 'Bệnh hệ cơ, xương khớp và mô liên kết', 'disease_score': 0, 'faculty_code': ['DCCK13'], 'faculty_name': ['Răng hàm mặt'], 'icd10': 'K07.6', 'iri': '<http://deepcare.io/R8vbonXCqn4jeTgdDq2OfUk>', 'lab_test': [], 'label': 'Hội_chứng_khớp_thái_dương_hàm', 'level': 2, 'ranking_score': 0, 'recommend': 'DAISA cho rằng bạn đang gặp vấn đề về sức khỏe và có thể dẫn đến tình trạng bệnh nặng hơn. DAISA khuyênbạn nên đặt hẹn ngay với bác sĩ để được tư vấn khám bệnh tốt nhất.DAISA đang hợp tác với mạng lưới phòng khám, bệnh viện uy tín với các chuyên gia hàng đầu, trong bước tiếp theo DAISA sẽ giúp bạn đặt hẹn đến bệnh viện, phòng khám, bác sĩ phù hợp nhất cho bạn.', 'severity_score': 5.083333333333334
    },
    {
      'disease_group': 'Bệnh hệ cơ, xương khớp và mô liên kết', 'disease_score': 0, 'faculty_code': ['DCCK13'], 'faculty_name': ['Răng hàm mặt'], 'icd10': 'K07.6', 'iri': '<http://deepcare.io/R8vbonXCqn4jeTgdDq2OfUk>', 'lab_test': [], 'label': 'Hội_chứng_khớp_thái_dương_hàm', 'level': 3, 'ranking_score': 0, 'recommend': 'DAISA cho rằng bạn đang gặp vấn đề về sức khỏe và có thể dẫn đến tình trạng bệnh nặng hơn. DAISA khuyênbạn nên đặt hẹn ngay với bác sĩ để được tư vấn khám bệnh tốt nhất.DAISA đang hợp tác với mạng lưới phòng khám, bệnh viện uy tín với các chuyên gia hàng đầu, trong bước tiếp theo DAISA sẽ giúp bạn đặt hẹn đến bệnh viện, phòng khám, bác sĩ phù hợp nhất cho bạn.', 'severity_score': 5.083333333333334
    },
    {
      'disease_group': 'Bệnh hệ cơ, xương khớp và mô liên kết', 'disease_score': 0, 'faculty_code': ['DCCK13'], 'faculty_name': ['Răng hàm mặt'], 'icd10': 'K07.6', 'iri': '<http://deepcare.io/R8vbonXCqn4jeTgdDq2OfUk>', 'lab_test': [], 'label': 'Hội_chứng_khớp_thái_dương_hàm', 'level': 2, 'ranking_score': 0, 'recommend': 'DAISA cho rằng bạn đang gặp vấn đề về sức khỏe và có thể dẫn đến tình trạng bệnh nặng hơn. DAISA khuyênbạn nên đặt hẹn ngay với bác sĩ để được tư vấn khám bệnh tốt nhất.DAISA đang hợp tác với mạng lưới phòng khám, bệnh viện uy tín với các chuyên gia hàng đầu, trong bước tiếp theo DAISA sẽ giúp bạn đặt hẹn đến bệnh viện, phòng khám, bác sĩ phù hợp nhất cho bạn.', 'severity_score': 5.083333333333334
    },
  ],
  'token': 'a2a661e8 - e276 - 46e8 - ae3f - 8056cb867325'
}