import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["get-all-users", "get-history"],
  endpoints: (builder) => ({
    //user signup
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
    }),
    //user login
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["get-all-users"],
    }),
    //user login
    getAllUsers: builder.mutation({
      query: (data) => ({
        url: "/user/get/all/users",
        method: "POST",
        body: data,
      }),
      providesTags: ["get-all-users"],
    }),
    //send email
    sendEmail: builder.mutation({
      query: (data) => ({
        url: "/user/send/email",
        method: "POST",
        body: data,
      }),
    }),
    //chat
    chatGetAllUsers: builder.query({
      query: () => "/get/all/users",
      providesTags: ["allUsers"],
    }),
    chatGetAllGroups: builder.query({
      query: () => "/get/group/data",
      providesTags: ["allGroups"],
    }),
    chatDeleteUsers: builder.mutation({
      query: (id) => ({
        url: `/delete/single/users?ids=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allUsers"],
    }),
    chatDeleteGroups: builder.mutation({
      query: (id) => ({
        url: `/delete/groups?ids=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allGroups"],
    }),
    chatCreateGroup: builder.mutation({
      query: (data) => ({
        url: "/post/group",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allGroups"],
    }),
    getPrivateChat: builder.mutation({
      query: (data) => ({
        url: "/get/private/chat/special",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useSendEmailMutation,
  useGetAllUsersMutation,
  useChatGetAllUsersQuery,
  useChatCreateGroupMutation,
  useChatDeleteGroupsMutation,
  useChatDeleteUsersMutation,
  useChatGetAllGroupsQuery,
  useGetPrivateChatMutation,
} = apiSlice;
