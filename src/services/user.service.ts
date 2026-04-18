/** Service to fetch and transform data from RandomUser API */
import axios from 'axios';
import { ManipulatedUser } from '../interfaces/user.interface';
import https from 'https';

export const fetchAndTransformUsers = async (results: number, page: number): Promise<ManipulatedUser[]> => {
  try {
    const url = `https://randomuser.me/api/?results=${results}&page=${page}`;
    const response = await axios.get(url, {
      // Menambahkan User-Agent agar tidak dianggap bot oleh firewall
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      },
      // Jika masih gagal karena SSL di camp/kantor, gunakan agent ini:
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    });

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