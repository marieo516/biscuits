import { Component } from '@angular/core';
import { ServiceBiscuit } from '../services/service-biscuit';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-biscuit',
  imports: [RouterModule],
  templateUrl: './single-biscuit.html',
  styleUrl: './single-biscuit.scss',
})
export class SingleBiscuit {
  name: string = 'Biscuit';
  status: string = 'Statut';
  bakingTime: number = 0;

  constructor(private service: ServiceBiscuit, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.name = this.service.getBiscuitById(+id)?.name!;
    this.status = this.service.getBiscuitById(+id)?.status!;
    this.bakingTime = this.service.getBiscuitById(+id)?.bakingtime!;
  }

  getColor(): string {
    if (this.status === 'Cru') {
      return 'red';
    } else if (this.status === 'Dans le four') {
      return 'orange';
    } else if (this.status === 'Cuit') {
      return 'green';
    } else {
      return 'black';
    }
  }
}
