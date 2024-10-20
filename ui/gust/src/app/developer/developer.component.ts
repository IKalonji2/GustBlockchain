import { Component } from '@angular/core';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {
  tabs = [
    { title: 'Gustavo Smart Contracts', content: 'about Gustavo lang and smart contracts' },
    { title: 'Deploy Your First Contract', content: 'Deploying contracts' },
    { title: 'Write Your Contract', content: 'in Web Terminal' }
  ];

  smartContractCode:string = `
          Contract SimpleTransaction accepts 0xTokenAddress:
          State:
          address sender;
          address receiver;
          uint amount;

          initState(address senderAddress, address receiverAddress, uint initialAmount):
          sender = senderAddress;
          receiver = receiverAddress;
          amount = initialAmount;

          transferFunds(uint transferAmount) public:
          // This function transfers an amount from the sender to the receiver if the amount is valid.
          if transferAmount <= amount:
            amount -= transferAmount;
            // Logic to send \`transferAmount\` to the receiver
            // Assume \`send(receiver, transferAmount)\` as a placeholder
            send(receiver, transferAmount);
          else:
            // Logic to handle insufficient funds
            revert("Insufficient funds for the transaction");
  `;

  selectedTab: number = 0;

  selectTab(index: number) {
    this.selectedTab = index;
  }
}
