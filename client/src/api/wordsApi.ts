import { IWords, WordsState } from './../store/ducks/words/types/state'
import axios from 'axios'

interface Response<T> {
    data: T
}

const url = 'http://localhost:5000/api/words/'
const url2 = 'http://localhost:5000/api/words/search/'

export const wordsApi = {
    async fetchWords(): Promise<Response<WordsState['items']>> {
        const data = await axios.get<Response<WordsState['items']>>(url)
        return data.data
    },
    async addWords(payload: {
        rus_word: string
        dig_word: string
    }): Promise<IWords[]> {
        const { data } = await axios.post<Response<IWords[]>>(url, payload)
        return data.data
    },
    async searchWords(searchString: string): Promise<WordsState['items']> {
        const data  = await axios.get<Response<WordsState['items']>>(url2 + searchString)
        //@ts-ignore
        return data.data
    },
    async deleteWord(id: string): Promise<IWords[]> {
        const { data } = await axios.delete<Response<IWords[]>>(url + id)

        return data.data
    },
}
