import { Validators,ValidatorFn,AbstractControl, ValidationErrors } from '@angular/forms';

function customValidator() : ValidatorFn{
  return (group: AbstractControl): ValidationErrors => {
     const pass = group.get('password');
     const confirmPass = group.get('confirm_password');
    //  const username = group.get("username")
    //  const email = group.get("email")

    console.log(group)


    //  if (username?.value?.length < 5) {
    //    username?.setErrors({wrongLength: "Username too short"})
    //  }

    //  if (email?.value) {
    //   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   if (!re.test(String(email?.value).toLowerCase())) email?.setErrors({wrongFormat: "Wrong email format"})
    // }

     if (pass?.value !== confirmPass?.value) {
      confirmPass?.setErrors({notEquivalent: 'password does not match'});
     } else {
      confirmPass?.setErrors(null);
     }
     return null;
}}

export const AdminUserConfig = {
  validation: customValidator,
  fields: {
    username: {
      key: 'username',
      dataType: 'string',
      label: 'Username',
      inputType: 'text',
      inputName: 'username-input-name',
      formControlName: 'username-form-control-name',
      placeholder: 'joedoe',
      required: true,
    },
    email: {
      key: 'email',
      dataType: 'string',
      label: 'Email',
      inputType: 'email',
      inputName: 'email-input-name',
      formControlName: 'email-form-control-name',
      placeholder: 'joedoe@example.com',
      // validator: 'email',
      required: true,
    },
    password: {
      key: 'password',
      dataType: 'string',
      label: 'Password',
      inputType: 'password',
      inputName: 'pasword-input-name',
      formControlName: 'pasword-form-control-name',
      placeholder: 'password',
      required: true,
    },
    confirm_password: {
      key: 'confirm_password',
      dataType: 'string',
      label: 'Confirm Password',
      inputType: 'password',
      inputName: 'confirm-pasword-input-name',
      formControlName: 'confirm-pasword-form-control-name',
      placeholder: 'confirm password',
      required: true,
    },
    first_name: {
      key: 'first_name',
      dataType: 'string',
      label: 'First name',
      inputType: 'text',
      inputName: 'first-name-input-name',
      formControlName: 'first-name-form-control-name',
      placeholder: 'Joe',
      required: true,
    },
    last_name: {
      key: 'last_name',
      dataType: 'string',
      label: 'Last name',
      inputType: 'text',
      inputName: 'last-name-input-name',
      formControlName: 'last-name-form-control-name',
      placeholder: 'Doe',
    },
    // institution: {
    //   key: 'institution',
    //   dataType: 'object',
    //   keyAccessor: 'acronym',
    //   valueAccessor: 'id',
    //   options: [
    //     {
    //       key: 'uoc',
    //       value: 1,
    //     },
    //     {
    //       key: 'test',
    //       value: 2,
    //     },
    //   ],
    //   label: 'Institution',
    //   inputType: 'select-multiple-remote',
    //   remoteUrl: '',
    //   inputName: 'institution-input-name',
    //   formControlName: 'institution-form-control-name',
    //   placeholder: 'uoc',
    //   validator: 'institution',
    //   required: false,
    // },
    // locale: {
    //   key: 'locale',
    //   dataType: 'string',
    //   label: 'Language',
    //   inputType: 'select',
    //   options: [
    //     {
    //       value: 'en',
    //       key: 'en',
    //     },
    //     {
    //       value: 'es',
    //       key: 'es',
    //     },
    //     {
    //       value: 'ca',
    //       key: 'ca',
    //     },
    //     {
    //       value: 'bg',
    //       key: 'bg',
    //     },
    //     {
    //       value: 'fi',
    //       key: 'fi',
    //     },
    //     {
    //       value: 'tr',
    //       key: 'tr',
    //     },
    //   ],
    //   inputName: 'locale-input-name',
    //   formControlName: 'locale-form-control-name',
    //   placeholder: 'en',
    //   validator: 'locale',
    //   // required: true,
    // },
    // roles: {
    //   key: 'roles',
    //   dataType: 'string',
    //   label: 'Roles',
    //   inputType: 'select-multiple',
    //   options: [
    //     {
    //       value: 'GLOBAL_ADMIN',
    //       key: 'GLOBAL_ADMIN',
    //     },
    //     {
    //       value: 'ADMIN',
    //       key: 'ADMIN',
    //     },
    //     {
    //       value: 'SEND',
    //       key: 'SEND',
    //     },
    //     {
    //       value: 'DATA_MANAGEMENT',
    //       key: 'DATA_MANAGEMENT',
    //     },
    //     {
    //       value: 'IC_MANAGEMENT',
    //       key: 'IC_MANAGEMENT',
    //     },
    //     {
    //       value: 'INSTRUCTOR',
    //       key: 'INSTRUCTOR',
    //     },
    //     {
    //       value: 'LEARNER',
    //       key: 'LEARNER',
    //     },
    //     {
    //       value: 'ACADEMIC_MANAGEMENT',
    //       key: 'ACADEMIC_MANAGEMENT',
    //     },
    //   ],
    //   inputName: 'roles-input-name',
    //   formControlName: 'roles-form-control-name',
    //   placeholder: 'en',
    //   validator: 'roles',
    //   required: true,
    // },
  },
};
