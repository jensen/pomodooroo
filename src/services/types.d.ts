interface ISessionResource {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  events: IEventResource[];
}

interface ICreateSessionResource
  extends Omit<
    ISessionResource,
    "id" | "created_at" | "updated_at" | "events"
  > {}

interface IEventResource {
  id: string;
  created_at: string;
  updated_at: string;

  type: string;

  started: number;
  paused: number;
  duration: number;

  session_id: string;
}

interface ICreateEventResource {
  startedTime: number;
  pausedTime: number;
  duration: number;
  sessionId: string;
}
