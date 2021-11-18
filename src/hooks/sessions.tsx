import { useQuery, useQueryClient, useMutation } from "react-query";
import { fetchSessions, fetchSession, createSession } from "services/sessions";

export const useSessions = () => {
  const query = useQuery<ISessionResource[], Error>(
    "sessions",
    fetchSessions as any
  );

  return query.data || [];
};

export const useSession = (id: string | undefined) => {
  if (!id) throw new Error("Must include session id");

  const query = useQuery<ISessionResource | null, Error>(
    ["session", id],
    fetchSession(id) as any
  );

  return query.data;
};

export const useCreateSession = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ISessionResource, Error, ICreateSessionResource>(
    createSession as any,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("sessions");
      },
    }
  );

  return (session: ICreateSessionResource) => mutation.mutateAsync(session);
};

export const useUpdateSession = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ISessionResource[],
    Error,
    ICreateSessionResource
  >(createSession as any, {
    onSuccess: () => {
      queryClient.invalidateQueries("sessions");
    },
  });

  return (session: ICreateSessionResource) => mutation.mutateAsync(session);
};
