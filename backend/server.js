import app from "./app.js";
import { connctDB } from "./config/db.js";

connctDB();

app.listen(7000, () => console.log(`Server running on port 7000`));