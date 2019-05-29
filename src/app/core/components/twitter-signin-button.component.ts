import { Component, OnInit, NgZone } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "etdb-twitter-signin-button",
    templateUrl: "twitter-signin-button.component.html"
})
export class TwitterSigninButtonComponent implements OnInit {
    public constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        public ngZone: NgZone
    ) {}

    public ngOnInit(): void {
        this.iconRegistry.addSvgIcon(
            "t-icon",
            this.sanitizer.bypassSecurityTrustResourceUrl(
                "assets/icons/twitter.svg"
            )
        );

        const twitter = window["twttr"];

        twitter.ready(() => console.log("TWITTER READY!"));
    }
}
