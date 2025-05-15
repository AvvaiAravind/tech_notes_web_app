import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "../apiSlice";

export type RolesType = ("Employee" | "Manager" | "Admin")[];

export type UsersType = {
  id?: string; // added manually in transform
  _id: string;
  userId: string;
  username: string;
  roles: RolesType;
  active: boolean;
  __v: number;
};

const usersAdapter = createEntityAdapter<UsersType>({});

const initialState = usersAdapter.getInitialState();

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query()
    })
})