import { EnvService } from "../env/env.service";

export class ApiServiceTesting  {

    apiUrl = '';
    constructor (envService: EnvService)
    {
        this.apiUrl = envService.apiUrl;
    }

    getUrl(endpoint) {
        return this.apiUrl + endpoint;
    }

    getData(endpoint) {
        switch (endpoint) {
            case '/admin/user?offset=0&limit=10':
                return {
                    "count": 9,
                    "next": null,
                    "previous": null,
                    "results": [
                      {
                        "id": 1,
                        "username": "global_admin@dev.tesla-ce.eu",
                        "last_login": null,
                        "first_name": "",
                        "last_name": "",
                        "email": "global_admin@dev.tesla-ce.eu",
                        "institution": null,
                        "roles": [
                          "GLOBAL_ADMIN"
                        ],
                        "login_allowed": true,
                        "is_staff": true,
                        "inst_admin": false,
                        "legal_admin": false,
                        "send_admin": false,
                        "data_admin": false,
                        "is_superuser": true,
                        "is_active": true,
                        "date_joined": "2021-10-07T10:24:48.717256Z",
                        "groups": [],
                        "user_permissions": []
                      },
                      {
                        "id": 2,
                        "username": "inst_admin@dev.tesla-ce.eu",
                        "last_login": null,
                        "first_name": "Institution",
                        "last_name": "Admin",
                        "email": "inst_admin@dev.tesla-ce.eu",
                        "institution": {
                          "id": 1,
                          "acronym": "default",
                          "uid": "inst_admin@dev.tesla-ce.eu",
                          "roles": [
                            "ADMIN",
                            "SEND",
                            "LEGAL",
                            "DATA"
                          ],
                          "locale": "en"
                        },
                        "roles": [
                          "ADMIN",
                          "SEND",
                          "LEGAL",
                          "DATA"
                        ],
                        "login_allowed": true,
                        "is_staff": false,
                        "inst_admin": false,
                        "legal_admin": false,
                        "send_admin": false,
                        "data_admin": false,
                        "is_superuser": false,
                        "is_active": true,
                        "date_joined": "2021-10-10T09:46:05.516606Z",
                        "groups": [],
                        "user_permissions": []
                      },
                      {
                        "id": 3,
                        "username": "admin@dev.tesla-ce.eu",
                        "last_login": null,
                        "first_name": "Admin",
                        "last_name": "User",
                        "email": "admin@dev.tesla-ce.eu",
                        "institution": {
                          "id": 1,
                          "acronym": "default",
                          "uid": "admin@dev.tesla-ce.eu",
                          "roles": [
                            "INSTRUCTOR",
                            "ADMIN"
                          ],
                          "locale": null
                        },
                        "roles": [
                          "INSTRUCTOR",
                          "ADMIN"
                        ],
                        "login_allowed": true,
                        "is_staff": false,
                        "inst_admin": false,
                        "legal_admin": false,
                        "send_admin": false,
                        "data_admin": false,
                        "is_superuser": false,
                        "is_active": true,
                        "date_joined": "2021-10-14T09:11:17.101882Z",
                        "groups": [],
                        "user_permissions": []
                      },
                      {
                        "id": 4,
                        "username": "student100@tesla-ce.eu",
                        "last_login": null,
                        "first_name": "student",
                        "last_name": "100",
                        "email": "student100@tesla-ce.eu",
                        "institution": {
                          "id": 1,
                          "acronym": "default",
                          "uid": "student100@tesla-ce.eu",
                          "roles": [
                            "LEARNER"
                          ],
                          "locale": "fr"
                        },
                        "roles": [
                          "LEARNER"
                        ],
                        "login_allowed": true,
                        "is_staff": false,
                        "inst_admin": false,
                        "legal_admin": false,
                        "send_admin": false,
                        "data_admin": false,
                        "is_superuser": false,
                        "is_active": true,
                        "date_joined": "2021-10-14T09:11:39.098308Z",
                        "groups": [],
                        "user_permissions": []
                      },
                      {
                        "id": 5,
                        "username": "test-institution-admin",
                        "last_login": null,
                        "first_name": "test-institution",
                        "last_name": "admin",
                        "email": "test-institution-admin@dev.tesla-ce.eu",
                        "institution": {
                          "id": 1,
                          "acronym": "default",
                          "uid": "test-institution-admin@dev.tesla-ce.eu",
                          "roles": [
                            "ADMIN"
                          ],
                          "locale": null
                        },
                        "roles": [
                          "ADMIN"
                        ],
                        "login_allowed": true,
                        "is_staff": false,
                        "inst_admin": false,
                        "legal_admin": false,
                        "send_admin": false,
                        "data_admin": false,
                        "is_superuser": false,
                        "is_active": true,
                        "date_joined": "2021-10-21T16:17:45.885546Z",
                        "groups": [],
                        "user_permissions": []
                      },
                      {
                        "id": 8,
                        "username": "student500@dev.tesla-ce.eu",
                        "last_login": null,
                        "first_name": "Student",
                        "last_name": "500",
                        "email": "student500@dev.tesla-ce.eu",
                        "institution": {
                          "id": 1,
                          "acronym": "default",
                          "uid": "student500@dev.tesla-ce.eu",
                          "roles": [
                            "LEARNER"
                          ],
                          "locale": null
                        },
                        "roles": [
                          "LEARNER"
                        ],
                        "login_allowed": true,
                        "is_staff": false,
                        "inst_admin": false,
                        "legal_admin": false,
                        "send_admin": false,
                        "data_admin": false,
                        "is_superuser": false,
                        "is_active": true,
                        "date_joined": "2021-10-28T19:55:45.401196Z",
                        "groups": [],
                        "user_permissions": []
                      },
                      {
                        "id": 11,
                        "username": "test@tesla-ce.org",
                        "last_login": null,
                        "first_name": "Admin",
                        "last_name": "User",
                        "email": "test@tesla-ce.org",
                        "institution": {
                          "id": 1,
                          "acronym": "default",
                          "uid": "test@tesla-ce.org",
                          "roles": [
                            "INSTRUCTOR"
                          ],
                          "locale": null
                        },
                        "roles": [
                          "INSTRUCTOR"
                        ],
                        "login_allowed": true,
                        "is_staff": false,
                        "inst_admin": false,
                        "legal_admin": false,
                        "send_admin": false,
                        "data_admin": false,
                        "is_superuser": false,
                        "is_active": true,
                        "date_joined": "2021-12-01T15:12:14.617429Z",
                        "groups": [],
                        "user_permissions": []
                      },
                      {
                        "id": 12,
                        "username": "student101@tesla-ce.eu",
                        "last_login": null,
                        "first_name": "Student",
                        "last_name": "101",
                        "email": "student101@tesla-ce.eu",
                        "institution": {
                          "id": 1,
                          "acronym": "default",
                          "uid": "student101@tesla-ce.eu",
                          "roles": [
                            "LEARNER"
                          ],
                          "locale": null
                        },
                        "roles": [
                          "LEARNER"
                        ],
                        "login_allowed": true,
                        "is_staff": false,
                        "inst_admin": false,
                        "legal_admin": false,
                        "send_admin": false,
                        "data_admin": false,
                        "is_superuser": false,
                        "is_active": true,
                        "date_joined": "2021-12-01T15:22:32.565469Z",
                        "groups": [],
                        "user_permissions": []
                      },
                      {
                        "id": 13,
                        "username": "mireia_test@tesla-ce.eu",
                        "last_login": null,
                        "first_name": "Mireia",
                        "last_name": "Test",
                        "email": "mireia_test@tesla-ce.eu",
                        "institution": {
                          "id": 1,
                          "acronym": "default",
                          "uid": "mireia_test@tesla-ce.eu",
                          "roles": [
                            "INSTRUCTOR",
                            "ADMIN",
                            "SEND",
                            "LEGAL",
                            "DATA"
                          ],
                          "locale": null
                        },
                        "roles": [
                          "INSTRUCTOR",
                          "ADMIN",
                          "SEND",
                          "LEGAL",
                          "DATA"
                        ],
                        "login_allowed": true,
                        "is_staff": false,
                        "inst_admin": false,
                        "legal_admin": false,
                        "send_admin": false,
                        "data_admin": false,
                        "is_superuser": false,
                        "is_active": true,
                        "date_joined": "2021-12-10T09:10:25.500403Z",
                        "groups": [],
                        "user_permissions": []
                      }
                    ]
                  }
                  case '/admin/user' :
                    return {
                      "id": 1,
                      "username": "global_admin@dev.tesla-ce.eu",
                      "last_login": null,
                      "first_name": "",
                      "last_name": "",
                      "email": "global_admin@dev.tesla-ce.eu",
                      "institution": null,
                      "roles": [
                        "GLOBAL_ADMIN"
                      ],
                      "login_allowed": true,
                      "is_staff": true,
                      "inst_admin": false,
                      "legal_admin": false,
                      "send_admin": false,
                      "data_admin": false,
                      "is_superuser": true,
                      "is_active": true,
                      "date_joined": "2021-10-07T10:24:48.717256Z",
                      "groups": [],
                      "user_permissions": []
                    }
                    case '/admin/user/1/' :
                      return {
                        "id": 1,
                        "username": "global_admin@dev.tesla-ce.eu",
                        "last_login": null,
                        "first_name": "",
                        "last_name": "",
                        "email": "global_admin@dev.tesla-ce.eu",
                        "institution": {
                          "id": 1,
                          "acronym": "default",
                          "uid": "test-institution-admin@dev.tesla-ce.eu",
                          "roles": [
                            "ADMIN"
                          ],
                          "locale": null
                        },
                        "roles": [
                          "GLOBAL_ADMIN"
                        ],
                        "login_allowed": true,
                        "is_staff": true,
                        "inst_admin": false,
                        "legal_admin": false,
                        "send_admin": false,
                        "data_admin": false,
                        "is_superuser": true,
                        "is_active": true,
                        "date_joined": "2021-10-07T10:24:48.717256Z",
                        "groups": [],
                        "user_permissions": []
                      }
                  case '/institution/1/user?offset=0&limit=10':
                    return {
                        "count": 9,
                        "next": null,
                        "previous": null,
                        "results": [
                          {
                            "id": 1,
                            "username": "global_admin@dev.tesla-ce.eu",
                            "last_login": null,
                            "first_name": "",
                            "last_name": "",
                            "email": "global_admin@dev.tesla-ce.eu",
                            "institution": null,
                            "roles": [
                              "GLOBAL_ADMIN"
                            ],
                            "login_allowed": true,
                            "is_staff": true,
                            "inst_admin": false,
                            "legal_admin": false,
                            "send_admin": false,
                            "data_admin": false,
                            "is_superuser": true,
                            "is_active": true,
                            "date_joined": "2021-10-07T10:24:48.717256Z",
                            "groups": [],
                            "user_permissions": []
                          },
                          {
                            "id": 2,
                            "username": "inst_admin@dev.tesla-ce.eu",
                            "last_login": null,
                            "first_name": "Institution",
                            "last_name": "Admin",
                            "email": "inst_admin@dev.tesla-ce.eu",
                            "institution": {
                              "id": 1,
                              "acronym": "default",
                              "uid": "inst_admin@dev.tesla-ce.eu",
                              "roles": [
                                "ADMIN",
                                "SEND",
                                "LEGAL",
                                "DATA"
                              ],
                              "locale": "en"
                            },
                            "roles": [
                              "ADMIN",
                              "SEND",
                              "LEGAL",
                              "DATA"
                            ],
                            "login_allowed": true,
                            "is_staff": false,
                            "inst_admin": false,
                            "legal_admin": false,
                            "send_admin": false,
                            "data_admin": false,
                            "is_superuser": false,
                            "is_active": true,
                            "date_joined": "2021-10-10T09:46:05.516606Z",
                            "groups": [],
                            "user_permissions": []
                          },
                          {
                            "id": 3,
                            "username": "admin@dev.tesla-ce.eu",
                            "last_login": null,
                            "first_name": "Admin",
                            "last_name": "User",
                            "email": "admin@dev.tesla-ce.eu",
                            "institution": {
                              "id": 1,
                              "acronym": "default",
                              "uid": "admin@dev.tesla-ce.eu",
                              "roles": [
                                "INSTRUCTOR",
                                "ADMIN"
                              ],
                              "locale": null
                            },
                            "roles": [
                              "INSTRUCTOR",
                              "ADMIN"
                            ],
                            "login_allowed": true,
                            "is_staff": false,
                            "inst_admin": false,
                            "legal_admin": false,
                            "send_admin": false,
                            "data_admin": false,
                            "is_superuser": false,
                            "is_active": true,
                            "date_joined": "2021-10-14T09:11:17.101882Z",
                            "groups": [],
                            "user_permissions": []
                          },
                          {
                            "id": 4,
                            "username": "student100@tesla-ce.eu",
                            "last_login": null,
                            "first_name": "student",
                            "last_name": "100",
                            "email": "student100@tesla-ce.eu",
                            "institution": {
                              "id": 1,
                              "acronym": "default",
                              "uid": "student100@tesla-ce.eu",
                              "roles": [
                                "LEARNER"
                              ],
                              "locale": "fr"
                            },
                            "roles": [
                              "LEARNER"
                            ],
                            "login_allowed": true,
                            "is_staff": false,
                            "inst_admin": false,
                            "legal_admin": false,
                            "send_admin": false,
                            "data_admin": false,
                            "is_superuser": false,
                            "is_active": true,
                            "date_joined": "2021-10-14T09:11:39.098308Z",
                            "groups": [],
                            "user_permissions": []
                          },
                          {
                            "id": 5,
                            "username": "test-institution-admin",
                            "last_login": null,
                            "first_name": "test-institution",
                            "last_name": "admin",
                            "email": "test-institution-admin@dev.tesla-ce.eu",
                            "institution": {
                              "id": 1,
                              "acronym": "default",
                              "uid": "test-institution-admin@dev.tesla-ce.eu",
                              "roles": [
                                "ADMIN"
                              ],
                              "locale": null
                            },
                            "roles": [
                              "ADMIN"
                            ],
                            "login_allowed": true,
                            "is_staff": false,
                            "inst_admin": false,
                            "legal_admin": false,
                            "send_admin": false,
                            "data_admin": false,
                            "is_superuser": false,
                            "is_active": true,
                            "date_joined": "2021-10-21T16:17:45.885546Z",
                            "groups": [],
                            "user_permissions": []
                          },
                          {
                            "id": 8,
                            "username": "student500@dev.tesla-ce.eu",
                            "last_login": null,
                            "first_name": "Student",
                            "last_name": "500",
                            "email": "student500@dev.tesla-ce.eu",
                            "institution": {
                              "id": 1,
                              "acronym": "default",
                              "uid": "student500@dev.tesla-ce.eu",
                              "roles": [
                                "LEARNER"
                              ],
                              "locale": null
                            },
                            "roles": [
                              "LEARNER"
                            ],
                            "login_allowed": true,
                            "is_staff": false,
                            "inst_admin": false,
                            "legal_admin": false,
                            "send_admin": false,
                            "data_admin": false,
                            "is_superuser": false,
                            "is_active": true,
                            "date_joined": "2021-10-28T19:55:45.401196Z",
                            "groups": [],
                            "user_permissions": []
                          },
                          {
                            "id": 11,
                            "username": "test@tesla-ce.org",
                            "last_login": null,
                            "first_name": "Admin",
                            "last_name": "User",
                            "email": "test@tesla-ce.org",
                            "institution": {
                              "id": 1,
                              "acronym": "default",
                              "uid": "test@tesla-ce.org",
                              "roles": [
                                "INSTRUCTOR"
                              ],
                              "locale": null
                            },
                            "roles": [
                              "INSTRUCTOR"
                            ],
                            "login_allowed": true,
                            "is_staff": false,
                            "inst_admin": false,
                            "legal_admin": false,
                            "send_admin": false,
                            "data_admin": false,
                            "is_superuser": false,
                            "is_active": true,
                            "date_joined": "2021-12-01T15:12:14.617429Z",
                            "groups": [],
                            "user_permissions": []
                          },
                          {
                            "id": 12,
                            "username": "student101@tesla-ce.eu",
                            "last_login": null,
                            "first_name": "Student",
                            "last_name": "101",
                            "email": "student101@tesla-ce.eu",
                            "institution": {
                              "id": 1,
                              "acronym": "default",
                              "uid": "student101@tesla-ce.eu",
                              "roles": [
                                "LEARNER"
                              ],
                              "locale": null
                            },
                            "roles": [
                              "LEARNER"
                            ],
                            "login_allowed": true,
                            "is_staff": false,
                            "inst_admin": false,
                            "legal_admin": false,
                            "send_admin": false,
                            "data_admin": false,
                            "is_superuser": false,
                            "is_active": true,
                            "date_joined": "2021-12-01T15:22:32.565469Z",
                            "groups": [],
                            "user_permissions": []
                          },
                          {
                            "id": 13,
                            "username": "mireia_test@tesla-ce.eu",
                            "last_login": null,
                            "first_name": "Mireia",
                            "last_name": "Test",
                            "email": "mireia_test@tesla-ce.eu",
                            "institution": {
                              "id": 1,
                              "acronym": "default",
                              "uid": "mireia_test@tesla-ce.eu",
                              "roles": [
                                "INSTRUCTOR",
                                "ADMIN",
                                "SEND",
                                "LEGAL",
                                "DATA"
                              ],
                              "locale": null
                            },
                            "roles": [
                              "INSTRUCTOR",
                              "ADMIN",
                              "SEND",
                              "LEGAL",
                              "DATA"
                            ],
                            "login_allowed": true,
                            "is_staff": false,
                            "inst_admin": false,
                            "legal_admin": false,
                            "send_admin": false,
                            "data_admin": false,
                            "is_superuser": false,
                            "is_active": true,
                            "date_joined": "2021-12-10T09:10:25.500403Z",
                            "groups": [],
                            "user_permissions": []
                          }
                        ]
                      }
            case '/institution/?search=test' : 
                  return {
                    "count": 9,
                    "next": null,
                    "previous": null,
                    "results": [{id: 1, name: 'test-initial-value'},{id: 2, name: 'test-changed-value'}]
                  };
            case '/institution/1/' :
                  return {
                    "id": 1,
                    "acronym": "test",
                    "uid": "test@dev.tesla-ce.eu",
                    "roles": [
                        "ADMIN",
                        "SEND",
                        "LEGAL",
                        "DATA"
                    ],
                    "locale": "en",
                    "learner_id": null
            }
          case '/institution/1/user' :
              return {
                "id": 1,
                "username": "global_admin@dev.tesla-ce.eu",
                "last_login": null,
                "first_name": "",
                "last_name": "",
                "email": "global_admin@dev.tesla-ce.eu",
                "institution": null,
                "roles": [
                  "GLOBAL_ADMIN"
                ],
                "login_allowed": true,
                "is_staff": true,
                "inst_admin": false,
                "legal_admin": false,
                "send_admin": false,
                "data_admin": false,
                "is_superuser": true,
                "is_active": true,
                "date_joined": "2021-10-07T10:24:48.717256Z",
                "groups": [],
                "user_permissions": []
              }
            case '/institution/1/user/1/' :
              return {
                "id": 1,
                "username": "inst_admin@dev.tesla-ce.eu",
                "last_login": null,
                "first_name": "",
                "last_name": "",
                "email": "inst_admin@dev.tesla-ce.eu",
                "institution": {
                  "id": 1,
                  "acronym": "default",
                  "uid": "inst_admin@dev.tesla-ce.eu",
                  "roles": [
                    "ADMIN",
                    "SEND",
                    "LEGAL",
                    "DATA"
                  ],
                  "locale": "en"
                },
                "roles": [
                  "GLOBAL_ADMIN"
                ],
                "login_allowed": true,
                "is_staff": true,
                "inst_admin": false,
                "legal_admin": false,
                "send_admin": false,
                "data_admin": false,
                "is_superuser": true,
                "is_active": true,
                "date_joined": "2021-10-07T10:24:48.717256Z",
                "groups": [],
                "user_permissions": []
              }
            case '/institution/1/ic/':
              return {
                "id": 1,
                "institution": {
                  "id": 1,
                  "acronym": "default",
                  "uid": "inst_admin@dev.tesla-ce.eu",
                  "roles": [
                    "ADMIN",
                    "SEND",
                    "LEGAL",
                    "DATA"
                  ],
                  "locale": "en"
                },
                "version": "1.0.1",
                "valid_from":  "2021-10-07T10:24:48.717256Z",
                "created_at":  "2021-10-07T10:24:48.717256Z",
                "updated_at":  "2021-10-07T10:24:48.717256Z",
              }
              case '/institution/1/ic/1/':
                return {
                  "id": 1,
                  "institution": {
                    "id": 1,
                    "acronym": "default",
                    "uid": "inst_admin@dev.tesla-ce.eu",
                    "roles": [
                      "ADMIN",
                      "SEND",
                      "LEGAL",
                      "DATA"
                    ],
                    "locale": "en"
                  },
                  "version": "1.0.1",
                  "valid_from":  "2021-10-07T10:24:48.717256Z",
                  "created_at":  "2021-10-07T10:24:48.717256Z",
                  "updated_at":  "2021-10-07T10:24:48.717256Z",
                }
                case '/institution/1/ic/1/document/':
                  return {
                    "count": 1,
                    "next": null,
                    "previous": null,
                    "results": [
                        {
                            "id": 1,
                            "consent": {
                                "id": 1,
                                "institution": {
                                    "id": 1,
                                    "acronym": "default",
                                    "name": "Default Institution",
                                    "external_ic": false,
                                    "mail_domain": null,
                                    "disable_vle_learner_creation": false,
                                    "disable_vle_instructor_creation": false,
                                    "disable_vle_user_creation": false,
                                    "allow_learner_report": false,
                                    "allow_learner_audit": false,
                                    "allow_valid_audit": false,
                                    "allowed_domains": "moodle.dev.tesla-ce.eu",
                                    "created_at": "2021-10-07T10:14:53.717742Z",
                                    "updated_at": "2021-12-30T09:42:24.102241Z"
                                },
                                "version": "1.0.0",
                                "valid_from": "2021-09-30T22:00:00Z",
                                "created_at": "2021-10-14T09:14:54.587534Z",
                                "updated_at": "2021-10-14T09:14:54.587553Z"
                            },
                            "language": "en",
                            "html": null,
                            "pdf": "test.pdf",
                            "created_at": "2021-10-14T09:15:01.209517Z",
                            "updated_at": "2021-10-14T09:15:01.209565Z"
                        },
                        {
                          "id": 2,
                          "consent": {
                              "id": 1,
                              "institution": {
                                  "id": 1,
                                  "acronym": "default",
                                  "name": "Default Institution",
                                  "external_ic": false,
                                  "mail_domain": null,
                                  "disable_vle_learner_creation": false,
                                  "disable_vle_instructor_creation": false,
                                  "disable_vle_user_creation": false,
                                  "allow_learner_report": false,
                                  "allow_learner_audit": false,
                                  "allow_valid_audit": false,
                                  "allowed_domains": "moodle.dev.tesla-ce.eu",
                                  "created_at": "2021-10-07T10:14:53.717742Z",
                                  "updated_at": "2021-12-30T09:42:24.102241Z"
                              },
                              "version": "1.0.0",
                              "valid_from": "2021-09-30T22:00:00Z",
                              "created_at": "2021-10-14T09:14:54.587534Z",
                              "updated_at": "2021-10-14T09:14:54.587553Z"
                          },
                          "language": "en",
                          "html":null,
                          "pdf": "/test/test.pdf",
                          "created_at": "2021-10-14T09:15:01.209517Z",
                          "updated_at": "2021-10-14T09:15:01.209565Z"
                      }
                    ]
                };
              case '/institution/1/ic?offset=0&limit=10':
                return {
                    "count": 2,
                    "next": null,
                    "previous": null,
                    "results": [
                      {
                        "id": 1,
                        "institution": {
                          "id": 1,
                          "acronym": "default",
                          "uid": "inst_admin@dev.tesla-ce.eu",
                          "roles": [
                            "ADMIN",
                            "SEND",
                            "LEGAL",
                            "DATA"
                          ],
                          "locale": "en"
                        },
                        "version": "1.0.1",
                        "valid_from":  "2021-10-07T10:24:48.717256Z",
                        "created_at":  "2021-10-07T10:24:48.717256Z",
                        "updated_at":  "2021-10-07T10:24:48.717256Z",
                      },
                      {
                        "id": 2,
                        "institution": {
                          "id": 1,
                          "acronym": "default",
                          "uid": "inst_admin@dev.tesla-ce.eu",
                          "roles": [
                            "ADMIN",
                            "SEND",
                            "LEGAL",
                            "DATA"
                          ],
                          "locale": "en"
                        },
                        "version": "1.0.1",
                        "valid_from":  "2021-10-07T10:24:48.717256Z",
                        "created_at":  "2021-10-07T10:24:48.717256Z",
                        "updated_at":  "2021-10-07T10:24:48.717256Z",
                      }
                    ],
                  };
            case '/institution/1/instrument/':
              return {
                "count": 2,
                "next": null,
                "previous": null,
                "results": [
                  {
                    "id": 1,
                    "name": "test-instrument-1",
                    "acronym": "tst-1",
                    "options_schema": "{}",
                  },
                  {
                    "id": 2,
                    "name": "test-instrument-2",
                    "acronym": "tst-2",
                    "options_schema": "{}",
                  },
                  {
                    "id": 3,
                    "name": "test-instrument-3",
                    "acronym": "tst-3",
                    "options_schema": "{}",
                  },
                ],
              };
              case '/institution/1/send/':
                return {
                      "id": 1,
                      "name": "test-instrument-1",
                      "description": "test-description"
                    };
              case '/institution/1/send/1/':
                  return {
                    "data":{
                      "disabled_instruments": ['test-1'],
                      "enabled_options": ['test-2'],
                  }};
              case '/institution/1/send?offset=0&limit=10':
                return {
                  "count": 2,
                  "next": null,
                  "previous": null,
                  "results": [
                    {
                      "id": 1,
                      "name": "test-send-1"
                    },
                    {
                      "id": 1,
                      "name": "test-send-2"
                    },
                  ],
                };
              case '/institution/1/learner/1/':
                  return {
                    "id": 1,
                    "institution": {
                        "id": 1,
                        "acronym": "default",
                        "name": "Default Institution",
                        "external_ic": false,
                        "mail_domain": null,
                        "disable_vle_learner_creation": false,
                        "disable_vle_instructor_creation": false,
                        "disable_vle_user_creation": false,
                        "allow_learner_report": false,
                        "allow_learner_audit": false,
                        "allow_valid_audit": false,
                        "allowed_domains": "moodle.dev.tesla-ce.eu",
                        "created_at": "2021-10-07T10:14:53.717742Z",
                        "updated_at": "2021-12-30T09:42:24.102241Z"
                    },
                    "username": "student100@tesla-ce.eu",
                    "consent": {
                        "version": "1.2.2",
                        "status": "VALID"
                    },
                    "consent_accepted": "2021-12-10T09:28:56.166138Z",
                    "consent_rejected": null,
                    "learner_id": "f8cf6b21-a5ba-4f9e-976a-9fdfebf3719f",
                    "last_login": null,
                    "send": {
                        "is_send": false,
                        "send": {
                            "enabled_options": [],
                            "disabled_instruments": []
                        }
                    },
                    "email": "student100@tesla-ce.eu",
                    "ic_status": "VALID",
                    "login_allowed": true,
                    "enrolment_status": [
                        {
                            "instrument_id": 1,
                            "percentage__min": 1.0,
                            "percentage__max": 1.0,
                            "can_analyse__min": true,
                            "can_analyse__max": true,
                            "pending": [],
                            "not_validated": [
                                {
                                    "provider_id": 4,
                                    "instrument_id": 2,
                                    "count": 2
                                }
                            ],
                            "pending_contributions": 0.0,
                            "not_validated_count": 0
                        },
                        {
                            "instrument_id": 2,
                            "percentage__min": 1.0,
                            "percentage__max": 1.0,
                            "can_analyse__min": true,
                            "can_analyse__max": true,
                            "pending": [],
                            "not_validated": [
                                {
                                    "provider_id": 4,
                                    "instrument_id": 2,
                                    "count": 2
                                }
                            ],
                            "pending_contributions": 0.0,
                            "not_validated_count": 2
                        }
                    ],
                    "first_name": "student",
                    "last_name": "100",
                    "locale": "fr",
                    "created_at": "2021-10-14T09:11:39.099438Z",
                    "updated_at": "2022-02-03T09:09:46.564980Z",
                    "uid": "student100@tesla-ce.eu",
                    "inst_admin": false,
                    "legal_admin": false,
                    "send_admin": false,
                    "data_admin": false,
                    "joined_at": "2021-10-14T09:11:39.105001Z"
                };
            case '/institution/1/learner/1/send/': 
              return {
                "count": 1,
                "next": null,
                "previous": null,
                "results": [
                    {
                        "id": 12,
                        "expires_at": "2021-12-21T23:00:00Z",
                        "category": 7,
                        "info": {
                            "id": 7,
                            "institution": {
                                "id": 1,
                                "acronym": "default",
                                "name": "Default Institution",
                                "external_ic": false,
                                "mail_domain": null,
                                "disable_vle_learner_creation": false,
                                "disable_vle_instructor_creation": false,
                                "disable_vle_user_creation": false,
                                "allow_learner_report": false,
                                "allow_learner_audit": false,
                                "allow_valid_audit": false,
                                "allowed_domains": "moodle.test.tesla-ce.eu",
                                "created_at": "2021-10-07T10:14:53.717742Z",
                                "updated_at": "2021-12-30T09:42:24.102241Z"
                            },
                            "data": {
                                "enabled_options": [],
                                "disabled_instruments": [
                                    1
                                ]
                            },
                            "description": "test_no_FR",
                            "created_at": "2021-12-21T16:11:26.758499Z",
                            "updated_at": "2021-12-21T16:11:26.758550Z"
                        }
                    }
                ]
            };
            case '/admin/instrument?offset=0&limit=10':
                return {
                    "count": 9,
                    "next": null,
                    "previous": null,
                    "results": []
                };
            case '/admin/instrument/':
                  return {
                    "count": 2,
                    "next": null,
                    "previous": null,
                    "results": [
                      {
                        "id": 1,
                        "name": "test-instrument-1"
                      },
                      {
                        "id": 1,
                        "name": "test-instrument-2"
                      },
                    ],
                  };
            case '/admin/instrument/1/':
                return {
                      "id": 1,
                      "name": "test-instrument-1"
                    };
            case '/admin/instrument/1/provider/':
                return {
                      "service_port": "1",
                      "options_schema": "{}",
                      "options": "{}",
                    };
            case '/admin/instrument/1/provider/1/':
              return {
                    "service_port": "1",
                    "options_schema": "{}",
                    "options": "{}",
                  };
            case '/admin/institution?offset=0&limit=10':
              return {
                "count": 1,
                "next": null,
                "previous": null,
                "results": [{
                  "id": 1,
                  "acronym": "test",
                  "uid": "test@dev.tesla-ce.eu",
                  "roles": [
                    "ADMIN",
                    "SEND",
                    "LEGAL",
                    "DATA"
                  ],
                  "locale": "en"
                }]
            };
            case '/admin/institution/1/':
              return {
                  "id": 1,
                  "acronym": "test",
                  "uid": "test@dev.tesla-ce.eu",
                  "roles": [
                    "ADMIN",
                    "SEND",
                    "LEGAL",
                    "DATA"
                  ],
                  "locale": "en"
            };
            case '/institution/1/course/1/activity/1/instrument/1/':
              return {
                "id": 1,
                "name": "test-instrument-1"
            };
            case '/institution/1/course/1/activity/1/': 
              return {
                name: 'test',
            };
            case '/institution/1/course/1/activity/1/instrument/':
              return {
                "count": 1,
                "next": null,
                "previous": null,
                "results": [{
                  "id": 1,
                  "name": "test-instrument-1",
                  "alternative_to" : null, 
                  "acronym": "tst-1",
                  "options_schema": "{}",
                  "instrument": {
                    "id": 1,
                    "name": "test-instrument-1",
                    "acronym": "tst-1",
                    "options_schema": "{}",
                  },
                },
                {
                  "id": 2,
                  "name": "test-instrument-2",
                  "alternative_to" :1, 
                  "acronym": "tst-2",
                  "options_schema": "{}",
                  "instrument": {
                    "id": 2,
                    "name": "test-instrument-2",
                    "acronym": "tst-2",
                    "options_schema": "{}",
                  },
                },
                {
                  "id": 3,
                  "name": "test-instrument-3",
                  "alternative_to" :1, 
                  "acronym": "tst-3",
                  "options_schema": "{}",
                  "instrument": {
                    "id": 3,
                    "name": "test-instrument-3",
                    "acronym": "tst-3",
                    "options_schema": "{}",
                  }
                }]
            };
            case '/institution/1/course/1/':
              return {
                "id": 1,
                "vle": {
                    "id": 1,
                    "type": "MOODLE",
                    "institution": {
                        "id": 1,
                        "acronym": "default",
                        "name": "Default Institution",
                        "external_ic": false,
                        "mail_domain": null,
                        "disable_vle_learner_creation": false,
                        "disable_vle_instructor_creation": false,
                        "disable_vle_user_creation": false,
                        "allow_learner_report": false,
                        "allow_learner_audit": false,
                        "allow_valid_audit": false,
                        "allowed_domains": "moodle.dev.tesla-ce.eu",
                        "created_at": "2021-10-07T10:14:53.717742Z",
                        "updated_at": "2021-12-30T09:42:24.102241Z"
                    },
                    "name": "default_moodle",
                    "url": "https://moodle.test.tesla-ce.eu",
                    "client_id": null
                },
                "vle_course_id": "2",
                "code": "test dev course",
                "description": "test dev course",
                "start": "2021-10-14T23:00:00Z",
                "end": "2022-10-14T23:00:00Z",
                "user_roles": [],
                "enabled": true,
                "created_at": "2021-10-14T09:10:35.571228Z",
                "updated_at": "2022-01-13T16:21:03.269697Z"
            };
            case '/institution/1/course/1/activity/1/report/1/': 
              return {
                "id": 2,
                "learner": {
                  "id": 4,
                  "uid": "student100@tesla-ce.eu",
                  "first_name": "student",
                  "last_name": "100",
                  "email": "student100@tesla-ce.eu",
                  "learner_id": "f8cf6b21-a5ba-4f9e-976a-9fdfebf3719f"
                },
                "detail": [
                  {
                    "instrument": "Keystroke Dynamics Recognition",
                    "enrolment": 100,
                    "confidence": 100,
                    "result": 40,
                    "identity_level": 2,
                    "instrument_acronym": "ks",
                    "content_level": 1,
                    "integrity_level": 1,
                    "learner_histogram": [
                      2,
                      0,
                      2,
                      0,
                      2,
                      0,
                      0,
                      0,
                      0,
                      2
                    ],
                    "activity_histogram": [
                      2,
                      0,
                      2,
                      0,
                      2,
                      0,
                      0,
                      0,
                      0,
                      2
                    ],
                    "instrument_id": 2,
                    "instrument_polarity": 1,
                    "result_bean": 4,
                    "thresholds": {
                      "warning_below": 0.6,
                      "alert_below": 0.3
                    },
                    "prob_learner": 0.25,
                    "prob_context": 0.25,
                    "h_prob_learner": 0.25,
                    "h_prob_context": 0.25,
                    "facts": {
                      "positive": [
                        "POSITIVE_CONFIDENCE_HIGH",
                        "POSITIVE_LEARNER_RESULT_ABOVE_THRESHOLD",
                        "POSITIVE_LEARNER_RESULT_GOOD_INSTRUMENT",
                        "POSITIVE_LEARNER_RESULT_GOOD_ACTIVITY"
                      ],
                      "negative": []
                    }
                  }
                ],
                "identity_level": 2,
                "content_level": 1,
                "integrity_level": 1,
                "data": "https://test.mock.dev.tesla-ce.eu/report.json"
              }
            case 'https://test.mock.dev.tesla-ce.eu/report.json':
              return {
                "sessions": [
                    {
                        "id": 3,
                        "pending_requests": 0,
                        "valid_requests": 2,
                        "processed_requests": 2,
                        "total_requests": 2,
                        "created_at": "2021-12-02T16:24:38.560743+00:00",
                        "closed_at": null,
                        "identity_level": 0,
                        "integrity_level": 0,
                        "content_level": 0,
                        "data": {
                            "instruments": [
                                2
                            ],
                            "alerts": "[]",
                            "data": {
                                "2": {
                                    "total": 2,
                                    "valid": 2,
                                    "confidence": 1,
                                    "result": 0.6999999999999997,
                                    "code": 2,
                                    "requests": "[[\"2021-12-02T16:24:37.740Z\", 0.4599999999999995], [\"2021-12-02T16:25:27.365Z\", 0.94]]"
                                }
                            }
                        }
                    },
                    {
                        "id": 4,
                        "pending_requests": 0,
                        "valid_requests": 2,
                        "processed_requests": 2,
                        "total_requests": 2,
                        "created_at": "2021-12-02T16:28:06.522209+00:00",
                        "closed_at": null,
                        "identity_level": 0,
                        "integrity_level": 0,
                        "content_level": 0,
                        "data": {
                            "instruments": [
                                2
                            ],
                            "alerts": "[]",
                            "data": {
                                "2": {
                                    "total": 2,
                                    "valid": 2,
                                    "confidence": 1,
                                    "result": 0.11000000000000006,
                                    "code": 2,
                                    "requests": "[[\"2021-12-02T16:28:05.782Z\", 0.0], [\"2021-12-02T16:28:25.562Z\", 0.2200000000000001]]"
                                }
                            }
                        }
                    }
                ],
                "documents": []
            };
            case '/institution/1/ic/current/':
              return {
                "id": 1,
                "institution": {
                  "id": 1,
                  "acronym": "default",
                  "name": "Default Institution",
                  "external_ic": false,
                  "mail_domain": null,
                  "disable_vle_learner_creation": false,
                  "disable_vle_instructor_creation": false,
                  "disable_vle_user_creation": false,
                  "allow_learner_report": false,
                  "allow_learner_audit": false,
                  "allow_valid_audit": false,
                  "allowed_domains": "moodle.dev.tesla-ce.eu",
                  "created_at": "2021-10-07T10:14:53.717742Z",
                  "updated_at": "2021-12-30T09:42:24.102241Z"
                },
                "version": "1.2.2",
                "valid_from": "2021-12-08T23:00:00Z",
                "created_at": "2021-12-10T09:00:42.151322Z",
                "updated_at": "2021-12-10T09:25:56.866224Z"
              }
            case '/institution/1/learner/1/ic/':
              return {
                "id": 1,
                "institution": {
                    "id": 1,
                    "acronym": "default",
                    "name": "Default Institution",
                    "external_ic": false,
                    "mail_domain": null,
                    "disable_vle_learner_creation": false,
                    "disable_vle_instructor_creation": false,
                    "disable_vle_user_creation": false,
                    "allow_learner_report": false,
                    "allow_learner_audit": false,
                    "allow_valid_audit": false,
                    "allowed_domains": "moodle.dev.tesla-ce.eu",
                    "created_at": "2021-10-07T10:14:53.717742Z",
                    "updated_at": "2021-12-30T09:42:24.102241Z"
                },
                "username": "student100@tesla-ce.eu",
                "consent": {
                    "version": "1.2.2",
                    "status": "VALID"
                },
                "consent_accepted": "2022-04-28T08:12:12.988999Z",
                "consent_rejected": null,
                "learner_id": "test-f9e-976a-9fdfebf3719f",
                "last_login": null,
                "send": {
                    "is_send": false,
                    "send": {
                        "enabled_options": [],
                        "disabled_instruments": []
                    }
                },
                "email": "student100@tesla-ce.eu",
                "ic_status": "VALID",
                "login_allowed": true,
                "enrolment_status": [
                    {
                        "instrument_id": 1,
                        "percentage__min": 1,
                        "percentage__max": 1,
                        "can_analyse__min": true,
                        "can_analyse__max": true,
                        "pending": [],
                        "not_validated": [
                            {
                                "provider_id": 4,
                                "instrument_id": 2,
                                "count": 2
                            }
                        ],
                        "pending_contributions": 0,
                        "not_validated_count": 0
                    },
                    {
                        "instrument_id": 2,
                        "percentage__min": 1,
                        "percentage__max": 1,
                        "can_analyse__min": true,
                        "can_analyse__max": true,
                        "pending": [],
                        "not_validated": [
                            {
                                "provider_id": 4,
                                "instrument_id": 2,
                                "count": 2
                            }
                        ],
                        "pending_contributions": 0,
                        "not_validated_count": 2
                    }
                ],
                "first_name": "student",
                "last_name": "100",
                "locale": "fr",
                "created_at": "2021-10-14T09:11:39.099438Z",
                "updated_at": "2022-04-28T08:12:12.989938Z",
                "uid": "test@tesla-ce.eu",
                "inst_admin": false,
                "legal_admin": false,
                "send_admin": false,
                "data_admin": false,
                "joined_at": "2021-10-14T09:11:39.105001Z"
            };
            default:
                return {};
        }
    }
}