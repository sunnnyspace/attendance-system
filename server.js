const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.urlencoded({ extended: true }));

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: '://supabase.com', // ⬅️ 이렇게 길고 정확한 전체 경로로 바꿔줍니다!
    user: 'postgres',                 
    password: 'rkdtnsgml1!', // ⬅️ 직접 정하신 비밀번호 입력
    database: 'postgres',             
    port: 6543                                       // ⬅️ 포트를 다시 6543으로 세팅합니다.
});


// 웹페이지 화면 보여주기
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// [제출하기] 버튼을 눌렀을 때 DB에 저장하는 규칙
app.post('/submit', (req, res) => {
    const { name, student_id, attendance_date, status } = req.body;
    const sql = 'INSERT INTO attendance (name, student_id, attendance_date, status) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [name, student_id, attendance_date, status], (err, result) => {
        if (err) throw err;
        res.send('<script>alert("저장되었습니다!"); location.href="/";</script>');
    });
});

app.listen(3000, () => console.log('서버가 http://localhost:3000 에서 실행 중입니다!'));