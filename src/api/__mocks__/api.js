import { promises } from 'dns'

export const getUser = jest.fn(() => Promise.resolve([]))
export const putUser = jest.fn(() => Promise.resolve([]))

export const postLogin = jest.fn(() => Promise.resolve([]))
export const postSignup = jest.fn(() => Promise.resolve([]))

export const getChecklists = jest.fn(() => promises.resolve([]))
export const getChecklist = jest.fn(() => Promise.resolve([]))
export const postChecklist = jest.fn(() => Promise.resolve([]))
export const putChecklist = jest.fn(() => Promise.resolve([]))
export const deleteChecklist = jest.fn(() => Promise.resolve([]))

export const getContacts = jest.fn(() => Promise.resolve([]))
export const getContact = jest.fn(() => Promise.resolve([]))
export const postContact = jest.fn(() => Promise.resolve([]))
export const putContact = jest.fn(() => Promise.resolve([]))
export const deleteContact = jest.fn(() => Promise.resolve([]))

export const getItems = jest.fn(() => Promise.resolve([]))
export const getItem = jest.fn(() => Promise.resolve([]))
export const postItem = jest.fn(() => Promise.resolve([]))
export const putItem = jest.fn(() => Promise.resolve([]))
export const deleteItem = jest.fn(() => Promise.resolve([]))

export const getLocations = jest.fn(() => Promise.resolve([]))
export const getLocation = jest.fn(() => Promise.resolve([]))
export const postLocation = jest.fn(() => Promise.resolve([]))
export const putLocation = jest.fn(() => Promise.resolve([]))
export const deleteLocation = jest.fn(() => Promise.resolve([]))

export const postSetRelationship = jest.fn(() => Promise.resolve([]))

export const getAppData = jest.fn(() => Promise.resolve([]))
export const putAppData = jest.fn(() => Promise.resolve([]))
