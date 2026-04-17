/** Service to fetch and transform data from RandomUser API */
import axios from 'axios';
import { ManipulatedUser } from '../interfaces/user.interface';

export const fetchAndTransformUsers = async (results: number, page: number): Promise<ManipulatedUser[]> => {
  try {
    const url = `https://randomuser.me/api/?results=${results}&page=${page}`;
    const response = await axios.get(url);

    // Pastikan data ada sebelum di-map
    if (!response.data || !response.data.results) {
        return [];
    }

    return response.data.results.map((user: any) => ({
      name: `${user.name.title}, ${user.name.first} ${user.name.last}`,
      location: `${user.location.street.number}, ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
      email: user.email,
      age: user.registered.age,
      phone: user.phone,
      cell: user.cell,
      picture: [user.picture.large, user.picture.medium, user.picture.thumbnail]
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    // Lempar error agar controller bisa menangkap dan mengirim respons yang sesuai
    throw new Error('Failed to fetch data from RandomUser API');
  }
};