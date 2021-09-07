export interface Report {
    id: number;
    learner: any;
    detail: any[];
    start: Date;
    end: Date;
    identity_level: number;
    content_level: number;
    integrity_level: number;
}

export interface GenericAuditData {
    providers: any;
    requests: any;
    enrolment_samples?: any;
}

export interface ReportAudit {
    confidence: number;
    content_level: number;
    created_at: Date;
    enrolment: number;
    id: number;
    identity_level: number;
    instrument: number;
    integrity_level: number;
    report: number;
    result: number;
    updated_at: Date;
    audit_data: string;
    audit?: GenericAuditData;
}
