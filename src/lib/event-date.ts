// Stored event dates are UTC. Older records may be missing the Z suffix.
export function parseEventDate(stored: string) {
	return new Date(stored.endsWith('Z') ? stored : `${stored}Z`);
}

export function toStoredDate(value: Date) {
	return `${value.toISOString().slice(0, 19)}Z`;
}

export function toDateInput(stored: string) {
	const local = parseEventDate(stored);
	const pad = (part: number) => String(part).padStart(2, '0');
	return `${local.getFullYear()}-${pad(local.getMonth() + 1)}-${pad(local.getDate())}T${pad(local.getHours())}:${pad(local.getMinutes())}`;
}

export function formatEventDate(stored: string) {
	return parseEventDate(stored).toLocaleString();
}
