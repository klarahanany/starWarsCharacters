import axios from 'axios';

export const fetchData = async (url: string) => {
  try {
    let all: any[] = [];
    let nextUrl = url;

    while (nextUrl) {
      const response = await axios.get(nextUrl);
      const data = response.data;
      all = [...all, ...data.results];
      nextUrl = data.next;
    }
    return all;
  } catch (error) {
    console.error("Error fetching:", error);
  }
};