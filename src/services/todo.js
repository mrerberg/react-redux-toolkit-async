import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DATA_TAG = { type: "Todos", id: "LIST" };

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://629470d963b5d108c18b87da.mockapi.io",
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => "todos",
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: DATA_TAG.type, id })),
        DATA_TAG,
      ],
    }),

    addTodo: builder.mutation({
      query: (body) => ({
        url: "todos",
        method: "POST",
        body,
      }),
      invalidatesTags: [DATA_TAG],
    }),

    updateTodo: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `todos/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (post) => [{ type: DATA_TAG.type, id: post?.id }],
    }),
  }),
});


export const { useAddTodoMutation, useGetAllTodosQuery, useUpdateTodoMutation } = todoApi;