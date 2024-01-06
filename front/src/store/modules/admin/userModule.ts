import {defineStore} from "pinia";
import type User from "../../types/user"
import axios from "axios";
import type LinkSidebar from "@/store/types/linkSidebar";
import util from "../../../mixins/util"

interface State {
    userList: User[],
    totalPages: 0,
    page: 0,
    links: LinkSidebar[]
}

export const useUserStore = defineStore('user', {
    state: (): State => {
        return {
            userList: [],
            totalPages: 0,
            page: 0,
            links: [
                {
                    img: "/icons/list.svg",
                    description: "list",
                    link: "/admin/users"
                },
                {
                    img: "/icons/add.svg",
                    description: "add",
                    link: "/admin/user"
                }
            ]
        }
    },
    actions: {
        async get(index: number) {
            await axios(`${import.meta.env.VITE_ADMIN_URL}admin/users?page=${index}&sort=dateCreated,asc`).then(e => {
                this.userList = e.data.content
                this.totalPages = e.data.totalPages
                this.page = e.data.number
            })
        },
        async delete(id: string) {
            try {
                await axios.delete(`${import.meta.env.VITE_ADMIN_URL}admin/user/${id}`)

                util.methods.showToastSuccess(null);
                await this.get(0);
            } catch (e) {
                util.methods.showToastError();
            }
        },
        async getOne(id: string) {
            try {
                let response = await axios(`${import.meta.env.VITE_ADMIN_URL}admin/user/${id}`)
                return response.data
            } catch (ex) {
                util.methods.showToastError();
            }
        },
        async save(user: User) {
            try {
                if (user.id != undefined && user.id.trim() != "") {
                    await axios.put(`${import.meta.env.VITE_ADMIN_URL}admin/user/${user.id}`, user)
                } else {
                    await axios.post(`${import.meta.env.VITE_ADMIN_URL}admin/users`, user)
                }
                util.methods.showToastSuccess(() => window.location.href = "/admin/users");
            } catch (e) {
                util.methods.showToastError();
            }
        },

    },

})
