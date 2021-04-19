import { doublePasswordCheck, checkEmail } from '../../../@core/utils/validators';

export const AdminUserConfig = {
  validator: doublePasswordCheck,
  paths: {
    editRedirect: '/system/admin-user/update/',
    readRedirect: '/system/admin-user/read/',
  },
  fields: {
    username: {
      creable: true,
      showable: true,
      editable: true,
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
      creable: true,
      showable: true,
      editable: true,
      key: 'email',
      dataType: 'string',
      label: 'Email',
      inputType: 'email',
      inputName: 'email-input-name',
      formControlName: 'email-form-control-name',
      placeholder: 'joedoe@example.com',
      validator: checkEmail,
      required: true,
    },
    password: {
      creable: true,
      showable: false,
      editable: false,
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
      creable: true,
      showable: false,
      editable: false,
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
      creable: true,
      showable: true,
      editable: true,
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
      creable: true,
      showable: true,
      editable: true,
      key: 'last_name',
      dataType: 'string',
      label: 'Last name',
      inputType: 'text',
      inputName: 'last-name-input-name',
      formControlName: 'last-name-form-control-name',
      placeholder: 'Doe',
    },
    institution: {
      creable: true,
      showable: true,
      editable: false,
      key: 'institution',
      dataType: 'object',
      label: 'Institution',
      inputType: 'select-remote',
      search: 'search',
      optionLabelAccessor: 'name',
      optionValueAccessor: 'id',
      // apiService: ApiInstitutionService,
      inputName: 'institution-input-name',
      formControlName: 'institution-form-control-name',
      placeholder: 'uoc',
      // validator: () => Validators.required,
    },
    locale: {
      creable: true,
      showable: true,
      editable: false,
      key: 'locale',
      dataType: 'string',
      label: 'Language',
      inputType: 'select',
      options: [
        {
          value: 'en',
          key: 'en',
        },
        {
          value: 'es',
          key: 'es',
        },
        {
          value: 'ca',
          key: 'ca',
        },
        {
          value: 'bg',
          key: 'bg',
        },
        {
          value: 'fi',
          key: 'fi',
        },
        {
          value: 'tr',
          key: 'tr',
        },
      ],
      inputName: 'locale-input-name',
      formControlName: 'locale-form-control-name',
      placeholder: 'en',
      // required: true,
    },
    roles: {
      creable: true,
      showable: true,
      editable: false,
      key: 'roles',
      dataType: 'string',
      label: 'Roles',
      inputType: 'select-multiple',
      options: [
        {
          value: 'GLOBAL_ADMIN',
          key: 'GLOBAL_ADMIN',
        },
        {
          value: 'ADMIN',
          key: 'ADMIN',
        },
        {
          value: 'SEND',
          key: 'SEND',
        },
        {
          value: 'DATA_MANAGEMENT',
          key: 'DATA_MANAGEMENT',
        },
        {
          value: 'IC_MANAGEMENT',
          key: 'IC_MANAGEMENT',
        },
        {
          value: 'ACADEMIC_MANAGEMENT',
          key: 'ACADEMIC_MANAGEMENT',
        },
      ],
      inputName: 'roles-input-name',
      formControlName: 'roles-form-control-name',
      placeholder: 'en',
      // required: false,
    },
  },
};
