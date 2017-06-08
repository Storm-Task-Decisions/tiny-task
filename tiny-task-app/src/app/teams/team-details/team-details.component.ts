import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Import Observable Class Extensions
import 'rxjs/add/observable/of';

// Import Observable Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { TeamService } from '../../services/team-service/team.service';

import { User } from '../../projects/project-details/project-user/User';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  private teamId: number;
  private users: any; // placeholder

  private memberSearchTerms = new Subject<string>();

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private location: Location
  ) { }



  ngOnInit() {
    // Get Current Team Id
    this.route.params.subscribe(params => this.teamId = +params['id']);

    // Get Team Info
    this.route.params.subscribe(params => this.teamService.getTeamInfo(+params['id']));

    // Set Up Member Search Observable
    this.users = this.memberSearchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(user => user ? this.teamService.findAllUsers(user) : Observable.of<any>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<any>([]);
      });
  }

  removeFromTeam(): any {
    return (userId: number) => {
      return this.teamService.removeFromTeam(userId)
    };
  }

  searchMembers(name: string): void {
    this.memberSearchTerms.next(name);
  }

  addTeamUser(): void {

  }
}
