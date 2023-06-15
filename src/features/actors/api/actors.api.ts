import * as endpointDefinitions from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Actor } from '../types/actors.interface';
import { ACTORS_BASE_URL } from '../constants/actors.const';

// ActorApi object with endpoints for actors (getActors, getActorById, createActor, updateActor, deleteActor)
export const actorApi = createApi({
  reducerPath: 'actorApi',
  baseQuery: fetchBaseQuery({ baseUrl: ACTORS_BASE_URL }),
  endpoints: (builder: endpointDefinitions.EndpointBuilder<BaseQueryFn, string, string>) => ({
    // getActors endpoint (query)
    getActors: builder.query<Actor[], void>({
      query: () => ({ url: 'actors' }),

      providesTags: ['actors'],
    }),

    // getActorById endpoint (query)
    getActorById: builder.query<Actor, number>({
      query: (id) => `actors/${id}`,
    }),

    // createActor endpoint (mutation)
    createActor: builder.mutation({
      query: (actor) => ({
        url: '/actors',
        method: 'POST',
        body: actor,
      }),
      invalidatesTags: ['actors'],
    }),

    // updateActor endpoint (mutation)
    updateActor: builder.mutation({
      query: ({ id, actor }) => ({
        url: `/actors/${id}`,
        method: 'put',
        body: actor,
      }),

      invalidatesTags: ['actors'],
    }),

    // deleteActor endpoint (mutation)
    deleteActor: builder.mutation({
      query: (id) => ({
        url: `/actors/${id}`,
        method: 'delete',
      }),

      invalidatesTags: ['actors'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetActorsQuery,
  useGetActorByIdQuery,
  useCreateActorMutation,
  useUpdateActorMutation,
  useDeleteActorMutation,
} = actorApi;
