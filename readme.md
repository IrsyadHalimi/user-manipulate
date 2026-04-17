# Technical Test - Express.js TypeScript API

Proyek ini dibangun menggunakan Express.js dan TypeScript.

- **API Manipulation:** Transformasi data dinamis dari `randomuser.me`.

---

## 🛠 Instalasi & Menjalankan

### 1. Prasyarat
- **Node.js:** v20.17.0 (LTS) atau lebih baru.
- **npm:** v10 atau lebih baru.

### 2. Setup Project
```bash
# Install dependencies
npm install

# Build TypeScript ke JavaScript
npm run build

# Mode Pengembangan (Hot Reload)
npm run dev

# Mode Produksi
npm start

Manipulasi API Eksternal
Mengambil data dari randomuser.me dan mengubah strukturnya menjadi format yang lebih ringkas.

Endpoint: GET /api/manipulate/external-users

Query Params: results (jumlah data), page (halaman).

Contoh Fetching (JavaScript/Axios):

```bash
async function getUsers(total = 10, page = 1) {
  const response = await axios.get('http://localhost:3000/api/manipulate/external-users', {
    params: { results: total, page: page }
  });
  return response.data;
}

# Menjalankan semua test suite
npm test
