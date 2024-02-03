README

# TODO APP PROJECT
Penjelasan : Sebuah project untuk memenuhi tugas dari kelas Introduction to Web Development Pacmann Ai

# INSTRUKSI
1. Jalankan aplikasi dengan membuka file document yang ada dengan Visual Studio Code
2. Pada kolom terminal, Inisiasikan db terlebih dahulu : Flask db init
3. Kemudian Flask db migrate -m "First Commit"
4. lalu Flask db upgrade
5. Setelah itu Flask run --debug
6. Akan muncul link pada kolom terminal. klik link tersebut bersamaan dengan hold tombol command (macbook) or CTRL (Windows) pada keyboard anda.
7. Program akan berjalan sebagaimana mestinya

# LATAR BELAKANG
Project dibangun atas dasar kebutuhan seorang Project Manager bernama Ridwan yang ingin memantau kinerja karyawan dan mengetahui progress dari pekerjaan yang karyawannya lakukan. 

# FITUR
Aplikasi web ini memiliki beberapa fitur seperti:
1. Authentikasi login pengguna
2. Pengguna dapat meninjau pekerjaan-pekerjaan yang dilakukan seperti:
   - menambah Task baru,
   - mengedit task yang sudah ada,
   - menghapus task jika memang tidak relevan,
   - menambah project baru yang akan dikerjakan,
   - dan memisahkan pekerjaan-pekerjaaan yang sudah diselesaikan.

# TOOLS
- Visual Studio Code
- Python 3.11.4
- Flask 2.3.2
- Werkzeug 2.3.7
- Browser

# REQUIREMENTS
1. Database
2. Register page
3. Login page
4. Homepage
5. Penyajian data berdasarkan project yang dipilih
6. Penyajian data berdasarkan progress task (exists and done)
7. Pembuatan project baru
8. pembuatan task berdasarkan project yang dipilih
9. Delete task

# FLOWCHART 
![Todoapp FC](https://github.com/kiolaksono/KioTodoApp/assets/103632483/13294e88-fe3e-43d6-a665-1a1e067b0316)

# PENJELASAN PROGRAM
1. Program dapat berjalan dengan meletakkan semua file dalam satu direktori lokal yang sama.
2. User diharuskan untuk membuat akun terlebih dahulu sebelum menggunakan fitur-fitur yanga ada.
3. Halaman pertama yang terbuka ketika login adalah homepage, dimana semua project dan task yang user miliki akan tampil di page tersebut
4. User dapat membuat project
5. User dapat memanipulasi task dari project yang ada

# HASIL TEST
1. Login page
<img width="1710" alt="image" src="https://github.com/kiolaksono/KioTodoApp/assets/103632483/0f3a8576-09ee-435d-b493-6719650e3e41">

2. Register page
<img width="1710" alt="image" src="https://github.com/kiolaksono/KioTodoApp/assets/103632483/3db349c3-70d8-40ac-bbd0-a76c6e781ccf">

3. Homepage
<img width="1710" alt="image" src="https://github.com/kiolaksono/KioTodoApp/assets/103632483/85e5f5da-cb79-43f7-b50b-0127df54b626">

4. Create New Project
<img width="578" alt="image" src="https://github.com/kiolaksono/KioTodoApp/assets/103632483/a8ef53cf-98df-49f3-b2b6-b91cbccb962c">

5. Create New Task
<img width="552" alt="image" src="https://github.com/kiolaksono/KioTodoApp/assets/103632483/5df9e531-92d4-467a-9220-d6b517cecda7">

6. Homepage dengan tugas yang sudah selesai
<img width="1710" alt="image" src="https://github.com/kiolaksono/KioTodoApp/assets/103632483/b753f287-22c8-42fa-8e90-a70aacb90e12">


