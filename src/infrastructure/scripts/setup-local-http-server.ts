import { AppFactory } from "../http/AppFactory";

const appFactory = new AppFactory();
const app = appFactory.create();

const port = 3000;
app.listen(port, (): void => console.log(`Listing on port ${port}`));
