import { coreApi } from "@/http-client";
import axios from "axios";

const RESOURCE_NAME = "https://cameo-api.app.sthings-pve.labul.sva.de/names";
const RESOURCE_NAME_FOR_GET_REQUEST = "/name"
const getAllNames = () => coreApi.get(`${RESOURCE_NAME}`);
const getName = (countOfNames: number) => coreApi.get(`${RESOURCE_NAME}/${countOfNames}`);
const createName = (newName: String) => coreApi.post(`${RESOURCE_NAME}`, { name: newName });
const deleteName = (name) =>
    coreApi.delete(`${RESOURCE_NAME}`, { data: name });

const updateName = (oldName: String, newName) =>
    coreApi.put(`${RESOURCE_NAME}`, { OldName: oldName, NewName: newName });
export { getName, deleteName, createName, updateName, getAllNames };