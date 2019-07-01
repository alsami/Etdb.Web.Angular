import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthenticationLog } from '@etdb/models';
import { AuthenticationLogType } from '@etdb/models/user.models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'etdb-authentication-log-overview',
    templateUrl: 'authentication-log-overview.component.html',
})
export class AuthenticationLogOverviewComponent implements OnChanges {
    AuthenticationLogType = AuthenticationLogType;
    public dataSource: MatTableDataSource<AuthenticationLog> = new MatTableDataSource([]);
    public displayColumns: string[] = ['authenticationLogType', 'loggedAt', 'ipAddress'];

    @Input() authenticationLogs: AuthenticationLog[];

    public ngOnChanges(changes: SimpleChanges): void {
        if (!changes['authenticationLogs'] || !this.authenticationLogs) {
            return;
        }

        this.authenticationLogs.forEach(authLog => authLog.loggedAt = new Date(authLog.loggedAt));

        this.dataSource.data = this.authenticationLogs;
    }

    public isSuccessType(authenticationLog: AuthenticationLog): boolean {
        return authenticationLog.authenticationLogType === this.AuthenticationLogType.Succeeded;
    }
}
