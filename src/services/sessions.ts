import supabase from "services";

export const fetchSessions = () =>
  supabase
    .from<ISessionResource>("sessions")
    .select()
    .then((response) => response.data);

export const fetchSession = (id: string) => () =>
  supabase
    .from<ISessionResource>("sessions")
    .select("*, events(*)")
    .match({ id })
    .then((response) => (response.data?.length ? response.data[0] : null));

export const createSession = (session: ICreateSessionResource) =>
  supabase
    .from<ISessionResource>("sessions")
    .insert(session)
    .then((response) => (response.data?.length ? response.data[0] : null));

export const createEvent = (type: string, event: ICreateEventResource) =>
  supabase
    .from<IEventResource>("events")
    .insert({
      type,
      started: event.startedTime,
      paused: event.pausedTime,
      duration: event.duration,
      session_id: event.sessionId,
    })
    .then((response) => (response.data?.length ? response.data[0] : null));

export const startSession = (event: ICreateEventResource) =>
  createEvent("START", event);

export const pauseSession = (event: ICreateEventResource) =>
  createEvent("PAUSE", event);

export const resumeSession = (event: ICreateEventResource) =>
  createEvent("RESUME", event);

export const enterActiveSession = (event: ICreateEventResource) =>
  createEvent("ACTIVE", event);

export const enterBreakSession = (event: ICreateEventResource) =>
  createEvent("BREAK", event);

export const resetSession = (event: ICreateEventResource) =>
  createEvent("RESET", event);
