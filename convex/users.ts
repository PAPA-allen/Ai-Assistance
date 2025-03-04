import { mutation, query } from "./_generated/server";
import {v} from "convex/values";

export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string(),  
    },
    handler: async (ctx, args) => {
        //if user already exists in the table
        const user = await ctx.db.query("users").filter(q => q.eq(q.field('email'), args.email)).collect();

        if (user?.length == 0) {
            //if ther is no user
            const data = {
                name: args.name,
                email: args.email,
                picture: args.picture,
                credits:10000
            }
            const result = await ctx.db.insert('users', data);
            return data;
        }
        return user[0];

    }
})

export const GetUser = query({
    args: {
        email:v.string()
    },
    handler: async (ctx, args) => { 
        const user = await ctx.db.query("users").filter(q => q.eq(q.field('email'), args.email)).collect();
        
        return user[0];
    }
})