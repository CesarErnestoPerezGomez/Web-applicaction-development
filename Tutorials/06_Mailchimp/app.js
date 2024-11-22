const express = require("express");
const https = require("https");

const app = express();

app.use(express.static("public")); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("view engine", "ejs");
app.set("views", __dirname);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName,
                },
            },
        ],
    };

    const jsonData = JSON.stringify(data);
    const listId = "1556e62296";
    const apiKey = "7e8d9289fb8874caa49351151f5a376d-us2";
    const url = "https://us2.api.mailchimp.com/3.0/lists/" + listId;
    const options = {
        method: "POST",
        auth: "gcastillo56:" + apiKey,
    };

    const mailRequest = https.request(url, options, (response) => {
        const name = "<li>item 1</li><li>item 2</li>";
        if (response.statusCode === 200) {
            response.on("data", (data) => {
                const jsonResp = JSON.parse(data);
                if (jsonResp.error_count === 0) {
                    res.render(__dirname + "/success.html", { name: name });
                } else {
                    console.error(jsonResp.errors[0].error_code);
                    console.error(jsonResp.errors[0].error);
                    res.render(__dirname + "/failure.html", { name: name });
                }
            });
        } else {
            res.render(__dirname + "/failure.html", { name: name });
        }
    });

    mailRequest.on("error", (e) => {
        console.error("Error en la solicitud: ", e.message);
        res.render(__dirname + "/failure.html", { name: name });
    });

    mailRequest.write(jsonData);
    mailRequest.end();
});

app.get("/failure", (req, res) => {
    res.redirect("/");
});

app.get("/success", (req, res) => {
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});


