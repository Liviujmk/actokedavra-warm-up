import * as endpointDefinitions from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Actor } from '../types/actors.interface';
import { ACTORS_BASE_URL } from '../constants/actors.const';

export const actorApi = createApi({
    reducerPath: 'actorApi',
    baseQuery: fetchBaseQuery({ baseUrl: ACTORS_BASE_URL }),
    endpoints: (builder: endpointDefinitions.EndpointBuilder<BaseQueryFn, string, string>) => ({
        getActors: builder.query<Actor[], void>({
            query: () => ({ url: 'actors' }),

            providesTags: ['actors'],
        }),

        getActorById: builder.query<Actor, number>({
            query: (id) => `actors/${id}`,
        }),

        createActor: builder.mutation({
            query: (actor) => ({
                url: '/actors',
                method: 'POST',
                body: actor,
            }),
            invalidatesTags: ['actors'],
        }),

        updateActor: builder.mutation({
            query: ({ id, actor }) => ({
                url: `/actors/${id}`,
                method: 'put',
                body: actor,
            }),

            invalidatesTags: ['actors'],
        }),

        deleteActor: builder.mutation({
            query: (id) => ({
                url: `/actors/${id}`,
                method: 'delete',
            }),

            invalidatesTags: ['actors'],
        }),
    }),
});

export const {
    useGetActorsQuery,
    useGetActorByIdQuery,
    useCreateActorMutation,
    useUpdateActorMutation,
    useDeleteActorMutation,
} = actorApi;
