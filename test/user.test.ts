import request from 'supertest';
import app from '../src/app';
import axios from 'axios';

// 1. Instruksikan Jest untuk memalsukan axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('User Manipulation API', () => {
  it('should fetch and format data from external API correctly', async () => {
    // 2. Tentukan data palsu yang akan dikembalikan axios
    mockedAxios.get.mockResolvedValue({
      data: {
        results: [
          {
            name: { title: 'Mr', first: 'Irsyad', last: 'Halimi' },
            location: {
              street: { number: 123, name: 'Sudirman' },
              city: 'Purwakarta',
              state: 'Jawa Barat',
              country: 'Indonesia'
            },
            email: 'irsyad@example.com',
            registered: { age: 23 },
            phone: '0812-3456-7890',
            cell: '0812-3456-7890',
            picture: {
              large: 'https://link.com/large.jpg',
              medium: 'https://link.com/medium.jpg',
              thumbnail: 'https://link.com/thumb.jpg'
            }
          }
        ]
      }
    });

    const res = await request(app)
      .get('/api/manipulate/external-users')
      .query({ results: 1, page: 1 });

    // 3. Sekarang ekspektasinya harusnya 200 karena tidak perlu internet lagi
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toContain('Irsyad');
    expect(res.body[0].picture).toHaveLength(3);
  });
});