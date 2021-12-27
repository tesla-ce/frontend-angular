export const InstitutionCourseConfig = {
  validator: null,
  fields: {
    // institution: {
    //   creable: true,
    //   showable: true,
    //   editable: true,
    //   key: 'institution',
    //   dataType: 'object',
    //   label: 'Institution',
    //   inputType: 'select-remote',
    //   search: 'search',
    //   optionLabelAccessor: 'name',
    //   optionValueAccessor: 'id',
    //   // apiService: ApiInstitutionService,
    //   inputName: 'institution-input-name',
    //   formControlName: 'institution-form-control-name',
    //   placeholder: 'uoc',
    //   validator: () => Validators.required,
    // },
    code: {
      key: 'code',
      creable: true,
      showable: true,
      editable: false,
      dataType: 'string',
      label: 'Code',
      inputType: 'text',
      inputName: 'code-input-name',
      formControlName: 'code-form-control-name',
      // placeholder: '0.1.2',
      required: true,
    },
    description: {
      key: 'description',
      creable: true,
      showable: true,
      editable: false,
      dataType: 'string',
      label: 'Description',
      inputType: 'text',
      inputName: 'description-input-name',
      formControlName: 'description-form-control-name',
      // placeholder: '0.1.2',
      required: true,
    },
    start: {
      creable: true,
      showable: true,
      editable: false,
      key: 'start',
      dataType: 'dateTime',
      withTime: false,
      label: 'Start',
      inputType: 'dateTime',
      inputName: 'start-input-name',
      formControlName: 'start-form-control-name',
      // placeholder: 'Doe',
    },
    end: {
      creable: true,
      showable: true,
      editable: false,
      key: 'end',
      dataType: 'dateTime',
      withTime: false,
      label: 'End',
      inputType: 'dateTime',
      inputName: 'end-input-name',
      formControlName: 'end-form-control-name',
      // placeholder: 'Doe',
    },
  },
};
