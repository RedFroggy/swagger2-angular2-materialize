import {OperationObject} from './api-operation';

export class ApiResult {
    message: string;
    status: number;
    date: Date;
    endDate: Date;
    operation: OperationObject;
    constructor() {
        this.date = new Date();
        this.operation = new OperationObject();
    }
    getRequestTime(): number {
        if (this.date && this.endDate) {
            return this.endDate.getTime() - this.date.getTime();
        }
    }
}
