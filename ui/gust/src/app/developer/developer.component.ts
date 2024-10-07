import { Component } from '@angular/core';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {
  tabs = [
    { title: 'Gustavo Smart Contracts', content: 'about Gustavo lang and smart contracts' },
    { title: 'Deploy your first Contract', content: 'Deploying contracts' },
    { title: 'Interact with Your Contract', content: 'in Web Terminal' }
  ];

  selectedTab: number = 0;

  selectTab(index: number) {
    this.selectedTab = index;
  }
}
