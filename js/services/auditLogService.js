/* BudgetWise Security & Audit Trail Service */
import { Storage } from '../storage.js';

class AuditLogService {
  constructor() {
    this.key = 'budgetwise_audit_logs';
  }

  getLogs() {
    return Storage.getItem(this.key, []);
  }

  logEvent(action, details, category = 'SYSTEM') {
    const logs = this.getLogs();
    const entry = {
      id: 'audit_' + Math.random().toString(36).substring(2, 9),
      action,
      details,
      category,
      timestamp: new Date().toISOString()
    };
    logs.unshift(entry);
    Storage.setItem(this.key, logs.slice(0, 200)); // Retain last 200 security events
    return entry;
  }

  clearLogs() {
    Storage.setItem(this.key, []);
  }
}

export const AuditLog = new AuditLogService();
