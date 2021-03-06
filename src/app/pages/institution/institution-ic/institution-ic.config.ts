export const InstitutionIcConfig = {
  validator: null,
  fields: {
    version: {
      key: 'version',
      creable: true,
      showable: true,
      editable: true,
      dataType: 'string',
      label: 'ENTITIES.IC.VERSION',
      inputType: 'text',
      inputName: 'version-input-name',
      formControlName: 'version-form-control-name',
      placeholder: '0.1.2',
      required: true,
    },
    valid_from: {
      creable: true,
      showable: true,
      editable: true,
      key: 'valid_from',
      dataType: 'dateTime',
      withTime: false,
      label: 'ENTITIES.IC.VALID_FROM',
      inputType: 'dateTime',
      inputName: 'valid-from-input-name',
      formControlName: 'valid-from-form-control-name',
      // placeholder: 'Doe',
    },
    file: {
      creable: false,
      showable: true,
      editable: true,
      key: 'file',
      dataType: 'string',
      label: 'ENTITIES.IC.UPLOAD PDF FILE',
      inputType: 'file',
      inputName: 'upload-pdf-input-name',
      formControlName: 'upload-pdf-form-control-name',
      placeholder: 'Doe',
    },
    html: {
      creable: false,
      showable: true,
      editable: true,
      key: 'html',
      dataType: 'string',
      label: 'ENTITIES.IC.HTML',
      inputType: 'html',
      inputName: 'html-input-name',
      formControlName: 'html-form-control-name',
      placeholder: 'joedoe@example.com',
      validator: 'html',
      required: true,
    },
  },
};
