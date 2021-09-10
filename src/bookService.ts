import axios, { AxiosResponse } from "axios";
import { Book, BookSubject } from "./models/Book";

const pageSize = 24;

export default {
  async getBooks(topic: string, page = 0): Promise<AxiosResponse<BookSubject>> {
    return axios.get<BookSubject>(`https://openlibrary.org/subjects/${topic}.json?limit=${pageSize}&offset=${page * pageSize}`);
  }
}