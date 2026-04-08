export type FetchJsonError = {
  ok: false;
  status: number;
  body: unknown;
};

export type FetchJsonOk<T> = {
  ok: true;
  data: T;
};

export async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<FetchJsonOk<T> | FetchJsonError> {
  const hasBody = init?.body !== undefined && init?.body !== null;
  const res = await fetch(input, {
    ...init,
    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  const text = await res.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!res.ok) {
    return { ok: false, status: res.status, body };
  }

  return { ok: true, data: body as T };
}
