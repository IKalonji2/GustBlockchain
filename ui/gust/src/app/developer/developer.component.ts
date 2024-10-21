import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionRelayerService } from '../services/relayer.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {
  selectedTab: number = 0;
  isDeploy: boolean = false;
  deploymentLog: string = '';
  recipient_address:string = '';
  amount: number = 0;

  tabs = [
    { title: 'Gustavo Smart Contracts' },
    { title: 'Deploy Your First Contract'},
    { title: 'Write Your Contract' }
  ];

  constructor(private txnRelayerService: TransactionRelayerService) {}

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

  selectTab(index: number) {
    this.selectedTab = index;
  }

  runDeployment() {
    const logPrefix = '    ';
    const currentTime = new Date().toLocaleTimeString();
    this.isDeploy = true;
    this.deploymentLog += `${logPrefix}[${currentTime}] Starting deployment...\n`;

    let reqBody = {
      recipient_address: this.recipient_address,
      amount: this.amount
    }
    this.txnRelayerService.sendAndSign(reqBody)
      .subscribe({
        next: (response) => {
          this.deploymentLog += response.message + '\n';
          if (response.logs) {
            response.logs.forEach((log: string) => {
              this.deploymentLog += log + '\n';
            });
          }
        },
        error: (err) => {
          this.deploymentLog += 'Error occurred during deployment: ' +'\n'+ err.message + '\n';
        },
        complete: () => {
          this.deploymentLog += 'Deployment process completed.\n';
        }
      });
}

}
