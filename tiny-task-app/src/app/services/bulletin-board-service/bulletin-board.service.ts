import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

// Import ReactiveJS toPromise
import 'rxjs/add/operator/toPromise';

import { Announcement } from '../../bulletin-board/announcement';
import { User } from '../../projects/project-details/project-user/User';

@Injectable()
export class BulletinBoardService {
  private headers = new Headers({'Content-type': 'application/JSON'});
  private baseUrl: string = 'http://localhost:8080';

  public announcements: Announcement[] = [];
  public announcementUser: Array<User> = [];


  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  // Fetch Information
  getAnnouncements(teamId: number): void {
    this.http.get(`${this.baseUrl}/api/announcements/${teamId}`)
      .toPromise()
      .then( (response) => {
        this.announcements = response.json().announcements;
      })
      .catch(this.handleError);
  }

  // Post Information
  createAnnouncement(teamId: number, userId: number, announcement: string): void {
    this.http.post(
      `${this.baseUrl}/api/announcements`,
      JSON.stringify({announcement: announcement, user_id: userId, team_id: teamId}),
      {headers: this.headers})
      .toPromise()
      .then( (response) => {
        this.announcements.push(response.json().announcement);
        this.announcementUser.push(response.json().user_id);
      })
      .catch(this.handleError);
  }

  // Edit Information
  editAnnouncement(announcementId: number, announcement: string): void {
    this.http.put(
      `${this.baseUrl}/api/announcements/${announcementId}`,
      JSON.stringify({announcementId: announcementId, announcementChanges: {announcement: announcement}}),
      {headers: this.headers})
      .toPromise()
      .then( (response) => {
        console.log(response, 'after put request');
        this.announcements.find(announcement => announcementId === announcementId)
      })
      .catch(this.handleError);
  }

  // Delete Information
  deleteAnnouncement(announcementId: number): void {
    this.http.delete(`${this.baseUrl}/api/announcements/${announcementId}`)
      .toPromise()
      .then( (response) => {
        let announcementToRemove = this.announcements.findIndex(announcement => announcement.id === announcementId);
        this.announcements.splice(announcementToRemove, 1);
      })
      .catch(this.handleError);
  }
}
