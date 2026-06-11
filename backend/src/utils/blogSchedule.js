const DEFAULT_TZ = process.env.BLOG_TIMEZONE || "Asia/Yerevan";
const DEFAULT_PUBLISH_HOUR = Number(process.env.BLOG_PUBLISH_HOUR || 18);
const DEFAULT_PUBLISH_MINUTE = Number(process.env.BLOG_PUBLISH_MINUTE || 0);

function getDatePartsInTz(date, timeZone) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(date).filter((p) => p.type !== "literal").map((p) => [p.type, p.value])
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  };
}

/** Convert local date/time in a timezone to UTC ISO string. */
export function localTimeToIso({ year, month, day, hour, minute }, timeZone = DEFAULT_TZ) {
  let guess = Date.UTC(year, month - 1, day, hour, minute);
  for (let i = 0; i < 6; i++) {
    const parts = getDatePartsInTz(new Date(guess), timeZone);
    const targetMin = hour * 60 + minute;
    const actualMin = parts.hour * 60 + parts.minute;
    let dayDiff = day - parts.day;
    if (parts.month !== month) dayDiff = day - parts.day;
    const diffMin = dayDiff * 24 * 60 + (targetMin - actualMin);
    if (diffMin === 0 && parts.year === year && parts.month === month && parts.day === day) {
      return new Date(guess).toISOString();
    }
    guess += diffMin * 60 * 1000;
  }
  return new Date(guess).toISOString();
}

function addDaysYmd(year, month, day, days) {
  const d = new Date(Date.UTC(year, month - 1, day + days));
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

/**
 * Next publish slot at configured hour (default 18:00 Asia/Yerevan).
 * If today's slot has passed, returns tomorrow at that hour.
 */
export function getNextPublishSlot({
  hour = DEFAULT_PUBLISH_HOUR,
  minute = DEFAULT_PUBLISH_MINUTE,
  timeZone = DEFAULT_TZ,
  fromDate = new Date(),
} = {}) {
  const local = getDatePartsInTz(fromDate, timeZone);
  const pastSlot =
    local.hour > hour || (local.hour === hour && local.minute >= minute);

  let { year, month, day } = local;
  if (pastSlot) {
    ({ year, month, day } = addDaysYmd(year, month, day, 1));
  }

  return localTimeToIso({ year, month, day, hour, minute }, timeZone);
}

export function getScheduleConfig() {
  return {
    timezone: DEFAULT_TZ,
    publishHour: DEFAULT_PUBLISH_HOUR,
    publishMinute: DEFAULT_PUBLISH_MINUTE,
    generateHour: Number(process.env.BLOG_GENERATE_HOUR || 10),
    nextPublishSlot: getNextPublishSlot(),
  };
}

export function parseScheduledPublishAt(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  if (d.getTime() <= Date.now()) return null;
  return d.toISOString();
}
