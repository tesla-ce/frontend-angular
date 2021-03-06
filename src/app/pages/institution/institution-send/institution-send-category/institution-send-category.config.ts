export const InstitutionSendCategoryConfig = {
  validator: null,
  paths: {
    editRedirect: '/institution/send/update/',
    readRedirect: '/institution/send/read/',
  },
  fields: {
    description: {
      creable: true,
      showable: true,
      editable: true,
      key: 'description',
      dataType: 'string',
      label: 'ENTITIES.SEND_CATEGORY.DESCRIPTION',
      inputType: 'text',
      inputName: 'description-input-name',
      formControlName: 'description-form-control-name',
      placeholder: 'Description',
      required: true,
    },
    enabled_options: {
      creable: true,
      showable: true,
      editable: true,
      key: 'enabled_options',
      dataType: 'string',
      label: 'ENTITIES.SEND_CATEGORY.ENABLED_OPTIONS',
      inputType: 'select-multiple',
      options: [
        {
          value: 'big_fonts',
          key: 'Big fonts',
        },
        {
          value: 'high_contrast',
          key: 'High contrast',
        },
        {
          value: 'text_to_speech',
          key: 'Text to speech',
        },
      ],
      inputName: 'enabled-options-input-name',
      formControlName: 'enabled-options-form-control-name',
      placeholder: '',
      // required: true,
  },
  disabled_instruments: {
      creable: true,
      showable: true,
      editable: true,
      key: 'disabled_instruments',
      dataType: 'string',
      label: 'ENTITIES.SEND_CATEGORY.DISABLED_INSTRUMENTS',
      inputType: 'select-multiple',
      options: [],
      inputName: 'enabled-options-input-name',
      formControlName: 'enabled-options-form-control-name',
      placeholder: '',
      // required: true,
    },
  },
};
