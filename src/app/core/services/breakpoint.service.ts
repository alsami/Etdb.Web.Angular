import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BreakpointService {
    private readonly breakpoints: string[] = Object.values(Breakpoints);

    public constructor(private breakpointObserver: BreakpointObserver) { }

    public hasBreakpointChanged(): Observable<boolean> {
        return this.breakpointObserver
            .observe(this.breakpoints)
            .pipe(map(breakpointState => breakpointState.matches));
    }

    public isExtraSmallDevice(): boolean {
        return this.breakpointObserver.isMatched(Breakpoints.XSmall);
    }

    public isSmallDevice(): boolean {
        return this.breakpointObserver.isMatched(Breakpoints.Small);
    }

    public isMediumDevice(): boolean {
        return this.breakpointObserver.isMatched(Breakpoints.Medium);
    }

    public isLargeDevice(): boolean {
        return this.breakpointObserver.isMatched(Breakpoints.Large);
    }

    public isExtraLargeDevice(): boolean {
        return this.breakpointObserver.isMatched(Breakpoints.XLarge);
    }
}
