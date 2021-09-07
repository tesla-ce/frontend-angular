import { doublePasswordCheck, checkEmail } from '../../../@core/utils/validators';

export const AdminInstitutionConfig = {
  validator: doublePasswordCheck,
  paths: {
    editRedirect: '/system/admin-institution/update/',
    readRedirect: '/system/admin-institution/read/',
  },
  fields: {
    name: {
      creable: true,
      showable: true,
      editable: true,
      key: 'name',
      dataType: 'string',
      label: 'Name',
      inputType: 'text',
      inputName: 'name-input-name',
      formControlName: 'name-form-control-name',
      placeholder: 'instititution name',
      required: true,
    },
    acronym: {
      creable: true,
      showable: true,
      editable: true,
      key: 'acronym',
      dataType: 'string',
      label: 'Acronym',
      inputType: 'text',
      inputName: 'acronym-input-name',
      formControlName: 'acronym-form-control-name',
      placeholder: 'instititution acronym',
      required: true,
    },
  },
};
