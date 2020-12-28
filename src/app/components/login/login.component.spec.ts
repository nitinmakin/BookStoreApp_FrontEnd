import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
    
      imports: [
        ReactiveFormsModule,
         FormsModule,
         HttpClientTestingModule,
         MatSnackBarModule,
         RouterTestingModule
      ],
      providers: [ FormBuilder],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[Email-Check] - shuld check when user entered incorrect email address', () => {
    let email = component.form.controls['Email']
    email.setValue('deed');
    expect(email.errors['email']).toBeTruthy();
  })

  it('[Email-Check] - shuld check when  user entered correct email address', () => {
    let email = component.form.controls['Email']
    email.setValue('nitinmakin124@gmail.com');
    expect(email.errors).toBeNull();
  })
  
});
