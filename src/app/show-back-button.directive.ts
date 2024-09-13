import { Directive, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[appShowBackButton]'
})
export class ShowBackButtonDirective implements OnInit {
  private currentUrl: string = '';

  constructor(
    private el: ElementRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentUrl = this.router.url;
      this.toggleVisibility();
    });

    // Initial visibility check
    this.toggleVisibility();
  }

  private toggleVisibility() {
    // lista de paginas en las que el boton back es visible
    const routesWithBackButton = ['/home', '/recoverpass', '/register']; // rutas donde se ve
    if (routesWithBackButton.some(route => this.currentUrl.startsWith(route))) {
      this.el.nativeElement.style.display = 'block';
    } else {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
