import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'menuFilter', pure: false })
export class MenuFilterPipe implements PipeTransform {
  transform(users, filter) {
    if (users) {
      return users.filter(user => !(
        !filter.woman && user.sex === 'F'
        || !filter.man && user.sex === 'M'
        || filter.age.min > user.age
        || filter.age.max < user.age)
      )
    }
  }
}