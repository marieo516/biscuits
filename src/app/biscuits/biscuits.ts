import { Component, Input, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceBiscuit } from '../services/service-biscuit';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-biscuits',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './biscuits.html',
  styleUrl: './biscuits.scss',
})
export class Biscuits implements OnInit {
  @Input() biscuitName: string = 'Biscuit';
  @Input() biscuitStatus: string = 'Status';
  @Input() indexBiscuit: number = 0;
  @Input() id: number = 0;

  constructor(private service: ServiceBiscuit, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  getStatus(): string {
    return this.biscuitStatus;
  }

  getColor(): string {
    if (this.biscuitStatus === 'Cru') {
      return '#A0A0A0';
    } else if (this.biscuitStatus === 'Dans le four') {
      return '#C87941';
    } else if (this.biscuitStatus === 'Cuit') {
      return '#8B9E6B';
    } else {
      return 'black';
    }
  }

  onSwitchOn() {
    this.service.switchOnOne(this.indexBiscuit);
  }

  onSwitchOff() {
    this.service.switchOffOne(this.indexBiscuit);
  }

  onDelete() {
    if (confirm(`Êtes-vous sûr de vouloir supprimer : "${this.biscuitName}" ?`)) {
      console.log('Deleting biscuit with id:', this.id);
      this.service.deleteBiscuit(this.id).subscribe({
        next: () => {
          this.service.getBiscuitsFromServer();
          console.log(`Biscuit ${this.id} deleted successfully`);
        },
        error: (err) => console.error('Error:', err)
      });
    } else {
        return;
    }
  }
}
