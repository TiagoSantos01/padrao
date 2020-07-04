const Express = require("express"),
    app = Express();
app.use("/", require("./src/routes"));

app.listen(8000, () => {});
