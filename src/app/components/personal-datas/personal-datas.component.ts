import { UserService } from './../../modules/login/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/login/user.interface';

@Component({
  selector: 'app-personal-datas',
  templateUrl: './personal-datas.component.html',
  styleUrls: ['./personal-datas.component.scss'],
})
export class PersonalDatasComponent implements OnInit {
  user: User;
  userImageSrc = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getUserLogged();
    this.userImageSrc = `../../../assets/users/${this.user.name}.jpeg`;
  }

  getUserAge() {
    const birthDate = new Date(this.user.birthDate);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
