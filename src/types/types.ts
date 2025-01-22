import { NavigateFunction } from "react-router"

export type NavigateProp = {
    navigate: NavigateFunction
}

export type UserInfo = {
    username: string,
    email: string,
    uid: string
  }

export type Thread = {
    uid: string,
    title: string,
    content: string,
    category: string
    appUser: string
}

export type ThreadForm = {
    title: string,
    content: string,
    category: string
    appUser: string
}
