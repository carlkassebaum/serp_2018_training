import { Directive, Input } from '@angular/core';

// export for convenience.
export { RouterLink } from '@angular/router';

/*
--- Explanatory comment --
  This code allows for users to stub out "RouterLink" components in their templates! 
*/

/* tslint:disable:directive-class-suffix */

//This attaches the following class to the routerLink DOM element!
@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  //This defines all behaviours for all events of the DOM element!
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

/// Dummy module to satisfy Angular Language service. Never used.
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    RouterLinkDirectiveStub
  ]
})
export class RouterStubsModule {}
