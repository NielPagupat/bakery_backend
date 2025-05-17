const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http').Server(app);
const db = require('./config/dbConnection')
const socketServer = require('socket.io')(http, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:3100",
            "http://192.168.1.4:5173"
        ]
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('user_profile_picture'))
app.use(cookieParser()); 
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ["http://localhost:5173", "http://localhost:3100", "http://192.168.1.4:5173"];
        // const allowedOrigins = ["http://192.168.1.2:3000"];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204
}));
require('./routes/routerManager')(app);
socketServer.on('connection', (socket) => {

    socket.on('triggerNewNotification', () => {
        socketServer.emit('openNewNotification');
    });

    socket.on("trigger_query", (data) => {
        const { id } = data;
        db.query('UPDATE tbllogin SET notification_unread = "0" WHERE LoginID = ?',
            [id],
            (err, result) => {
                if (err) throw err;
                socket.to(id).emit("unread_notification", data);
            }
        );
    });
    

});
http.listen(8000, "0.0.0.0");
// http.listen(8100, "192.168.1.70");
