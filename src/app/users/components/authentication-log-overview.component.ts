import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationLog } from '@etdb/models';
import { AuthenticationLogType } from '@etdb/models/user.models';

@Component({
    selector: 'etdb-authentication-log-overview',
    templateUrl: 'authentication-log-overview.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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

        this.dataSource.data = this.authenticationLogs;
    }

    public isSuccessType(authenticationLog: AuthenticationLog): boolean {
        return authenticationLog.authenticationLogType === this.AuthenticationLogType.Succeeded;
    }
}
