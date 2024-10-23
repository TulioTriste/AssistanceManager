import { ShowBackButtonDirective } from './show-back-button.directive';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';

describe('ShowBackButtonDirective', () => {
  let directive: ShowBackButtonDirective;
  let elementRef: ElementRef;
  let router: Router;

  beforeEach(() => {
    // Crear un mock de ElementRef
    elementRef = new ElementRef(document.createElement('div'));

    // Crear un mock de Router
    router = jasmine.createSpyObj('Router', ['navigate']);

    // Crear la instancia de la directiva con los mocks
    directive = new ShowBackButtonDirective(elementRef, router);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
