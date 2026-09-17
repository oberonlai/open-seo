/**
 * Kill-switch for automatic DataForSEO spend (cron rank checks, dashboard
 * visit-triggered backlink snapshots, add-keyword auto-check/metrics).
 *
 * OPENSEO_DATAFORSEO_AUTO_SPEND_DISABLED semantics match telemetry opt-out:
 * any value except an explicit "off" string ("0"/"false"/"no"/"off") disables
 * auto spend. Unset → auto spend stays enabled (hosted default).
 *
 * Manual user-triggered checks (Run Now, research, backlinks page, audits)
 * are not gated here.
 */
import { isTelemetryOptOutValue } from "@/shared/selfhost-checks";

export function isDataforseoAutoSpendDisabled(
  value: string | undefined | null,
): boolean {
  return isTelemetryOptOutValue(value);
}
