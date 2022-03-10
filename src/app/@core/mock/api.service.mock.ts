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
                    "acronym": "default",
                    "uid": "inst_admin@dev.tesla-ce.eu",
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
            default:
                return {};
        }
    }
}