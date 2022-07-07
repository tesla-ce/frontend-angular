import { of } from "rxjs";

export class AuthServiceTesting  {
    getUser() {
        return of({
        "id": 1,
        "first_name": "Institution",
        "last_name": "Admin",
        "username": "inst_admin@dev.tesla-ce.eu",
        "email": "inst_admin@dev.tesla-ce.eu",
        "is_admin": false,
        "full_name": "Institution Admin",
        "uid": "inst_admin@dev.tesla-ce.eu",
        "locale": "en",
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
            "locale": "en",
            "learner_id": null
        },
        "institutions": [
            {
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
        ],
        "roles": [
            "ADMIN",
            "SEND",
            "LEGAL",
            "DATA"
        ],
        "routes": [
            "dashboard",
            "administration-ic",
            "administration",
            "administration-send",
            "administration-send-users",
            "course",
            "administration-settings",
            "administration-users",
            "administration-send-categories"
        ]
    });
    }
}