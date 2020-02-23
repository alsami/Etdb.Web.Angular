import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthenticationLog, AuthenticationLogType } from '@etdb/models';

export var single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ];

@Component({
  selector: 'etdb-authentication-log-piechartview',
  templateUrl: './authentication-log-piechartview.component.html',
  styleUrls: ['./authentication-log-piechartview.component.scss']
})
export class AuthenticationLogPiechartviewComponent implements OnChanges {
    @Input() authenticationLogs: AuthenticationLog[] = [];

    public authenticationLogsByType: any[] = [];
    public authenticationLogsByIpAddress: any[] = [];
    colorScheme = {
        domain: ['#5AA454', '#A10A28']
      };

    public ngOnChanges(changes: SimpleChanges): void {
        if (!changes.authenticationLogs || !this.authenticationLogs || !this.authenticationLogs.length) {
            return;
        }

        console.log(this.authenticationLogs);

        const successfulLogs = this.authenticationLogs.filter(log => log.authenticationLogType === AuthenticationLogType.Succeeded);
        const failedLogs = this.authenticationLogs.filter(log => log.authenticationLogType === AuthenticationLogType.Failed);

        this.authenticationLogsByType.push({
            name: AuthenticationLogType.Succeeded,
            value: successfulLogs.length
        });

        this.authenticationLogsByType.push({
            name: AuthenticationLogType.Failed,
            value: failedLogs.length
        });

        const ipAddresses = this.authenticationLogs.map(log => log.ipAddress);

        const distinct = [...new Set(ipAddresses)];

        distinct.forEach(ipAddress => this.authenticationLogsByIpAddress.push({
            name: ipAddress,
            value: this.authenticationLogs.filter(s => s.ipAddress === ipAddress).length
        }));

        console.log(this.authenticationLogsByIpAddress);
    }
}
