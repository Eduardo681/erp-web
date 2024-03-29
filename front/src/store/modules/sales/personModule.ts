import type City from "@/store/types/city";
import type LinkSidebar from "@/store/types/linkSidebar";
import type Person from "@/store/types/person";
import { defineStore } from "pinia";
import util from "../../../mixins/util";
import { axiosSalesInstance } from "../../config/axios.config";

interface State {
    clientList: Person[],
    sellersList: Person[],
    totalPages: 0,
    page: 0,
    links: LinkSidebar[],
    linksSeller: LinkSidebar[],
    cities: Array<City>
}

export const usePersonStore = defineStore('client', {
    state: (): State => {
        return {
            clientList: [],
            sellersList: [],
            totalPages: 0,
            page: 0,
            cities: [],
            links: [
                {
                    img: "/icons/list.svg",
                    description: "list",
                    link: "/sales/persons/clients"
                },
                {
                    img: "/icons/add.svg",
                    description: "add",
                    link: "/sales/persons"
                }
            ],
            linksSeller: [
                {
                    img: "/icons/list.svg",
                    description: "list",
                    link: "/sales/persons/sellers"
                },
            ]
        }
    },
    actions: {
        async get(index: number) {
            try {
                const response = await axiosSalesInstance(`sales/persons/clients?page=${index}&sort=dateCreated,asc`)
                this.clientList = response.data.content
                this.totalPages = response.data.totalPages
                this.page = response.data.number
            } catch (e) {
                util.methods.showToastError();
            }
        },
        async getSellers(index: number) {
            try {
                const response = await axiosSalesInstance(`sales/persons/sellers?page=${index}&sort=dateCreated,asc`)
                this.sellersList = response.data.content
                this.totalPages = response.data.totalPages
                this.page = response.data.number
            } catch (e) {
                util.methods.showToastError();
            }
        },
        async getCities(city: string) {
            try {
                const response = await axiosSalesInstance(`sales/cities?name=${city}`)
                this.cities = response.data.content
            } catch (e) {
                util.methods.showToastError();
            }
        },
        async delete(id: string) {
            try {
                await axiosSalesInstance.delete(`sales/persons/${id}`)

                util.methods.showToastSuccess(null);
                await this.get(0);
            } catch (e) {
                util.methods.showToastError();
            }
        },
        async getOne(id: string) {
            try {
                const response = await axiosSalesInstance(`sales/persons/${id}`)
                return response.data
            } catch (ex) {
                util.methods.showToastError();
            }
        },
        async save(person: Person) {
            try {
                if (person.id != undefined && person.id.trim() != "") {
                    await axiosSalesInstance.put(`sales/persons/${person.id}`, person)
                } else {
                    person.status = "ACTIVE";
                    await axiosSalesInstance.post(`sales/persons`, person)
                }
                util.methods.showToastSuccess(() => window.location.href = "/sales/persons/clients");
            } catch (e) {
                util.methods.showToastError();
            }
        },

    },

})

