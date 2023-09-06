import appConstants from "../constants/appConstants";
import {TravelEntryModel} from "../models/travelEntry";

const getTravelEntriesByUserId = (userId: number, onEntryList: (entryList: TravelEntryModel[]) => void) => {
    fetch(`${appConstants.baseUrl}/travelEntries?userId=${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
    }).then(onEntryList)
}

const getTravelEntryById = (id: number, onEntry: (entry: TravelEntryModel) => void) => {
    fetch(`${appConstants.baseUrl}/travelEntries/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
    }).then(onEntry)
}

const createTravelEntry = (entry: TravelEntryModel, onEntry: (entry: TravelEntryModel) => void) => {
    fetch(`${appConstants.baseUrl}/travelEntries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
    }).then(onEntry)
}

const travelEntryService = {
    getTravelEntriesByUserId: getTravelEntriesByUserId,
    getTravelEntryById: getTravelEntryById,
    createTravelEntry: createTravelEntry
}

export default travelEntryService