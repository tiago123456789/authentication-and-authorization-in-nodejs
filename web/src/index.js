const app = require("./config/Server");

app.listen(process.env.PORT, () => {
    console.log(`Server is running in address: http://localhost:${process.env.PORT}`);
});