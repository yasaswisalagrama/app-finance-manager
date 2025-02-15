import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor]
    });
    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header if token exists', (done) => {
    // Set a test token in localStorage
    localStorage.setItem('jwt_token', 'test-token');

    // Create a dummy HTTP request
    const req = new HttpRequest('GET', '/test');
    
    // Create a dummy HttpHandler that expects the header to be set
    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('Authorization')).toBeTruthy();
        expect(request.headers.get('Authorization')).toBe('Bearer test-token');
        return of({} as HttpEvent<any>);
      }
    };

    // Call intercept and subscribe to the result to trigger the expectation
    interceptor.intercept(req, next).subscribe({
      next: () => {
        // Clean up the token after the test
        localStorage.removeItem('jwt_token');
        done();
      }
    });
  });

  it('should not add Authorization header if token does not exist', (done) => {
    // Ensure no token exists
    localStorage.removeItem('jwt_token');

    const req = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('Authorization')).toBeFalsy();
        return of({} as HttpEvent<any>);
      }
    };

    interceptor.intercept(req, next).subscribe({
      next: () => done()
    });
  });
});
