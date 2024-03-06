import { HealthCheckProblem } from "../HealthCheckProblem";
import { HealthCheckStatus } from "../HealthCheckStatus";

export type HealthCheckResponse = {
    status: HealthCheckStatus;
    problems: HealthCheckProblem[];
}