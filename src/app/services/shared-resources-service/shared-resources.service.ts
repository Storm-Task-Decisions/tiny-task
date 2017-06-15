import { Headers, Http } from "@angular/http";
import { Injectable } from "@angular/core";

// Import ReactiveJS toPromise
import "rxjs/add/operator/toPromise";

import { Resource } from "../../shared-resources/shared-resources";
import { User } from "../../projects/project-details/project-user/User";

@Injectable()
export class SharedResourceService {
  private headers = new Headers({ "Content-type": "application/JSON" });
  private baseUrl: string = "http://localhost:8080";

  public resources: Resource[];

  constructor(private http: Http) {}

  private handleError(error: any): Promise<any> {
    console.error("An error occured", error);
    return Promise.reject(error.message || error);
  }

  // Fetch Information
  getResources(teamId: number): void {
    this.http
      .get(`${this.baseUrl}/api/resources/1`)
      .toPromise()
      .then(response => {
        console.log(response.json());
        this.resources = response.json();
      })
      .catch(this.handleError);
  }

  // Post Information
  createResource(
    teamId: number,
    userId: number,
    URL: string,
    notes: string
  ): void {
    this.http
      .post(
        `${this.baseUrl}/api/resources`,
        JSON.stringify({
          URL: URL,
          notes: notes,
          user_id: userId,
          team_id: teamId
        }),
        { headers: this.headers }
      )
      .toPromise()
      .then(response => {
        this.resources.push(response.json());
      })
      .catch(this.handleError);
  }

  // Edit Information
  editResource(
    resourceId: number,
    resource: string,
    resourceNote: string
  ): void {
    this.http
      .put(
        `${this.baseUrl}/api/resources/${resourceId}`,
        JSON.stringify({
          resourceId: resourceId,
          resourceChanges: { resource: resource, resourseNote: resourceNote }
        }),
        { headers: this.headers }
      )
      .toPromise()
      .then(response => {
        this.resources.find(resource => resourceId === resourceId);
      })
      .catch(this.handleError);
  }

  // Delete Information
  deleteResource(resourceId: number): void {
    this.http
      .delete(`${this.baseUrl}/api/resources/${resourceId}`)
      .toPromise()
      .then(response => {
        let resourceToRemove = this.resources.findIndex(
          resource => resource.id === resourceId
        );
        this.resources.splice(resourceToRemove, 1);
      })
      .catch(this.handleError);
  }
}
